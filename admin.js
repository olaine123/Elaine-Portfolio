(() => {
  const $ = (id) => document.getElementById(id);
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const state = { projects: clone(window.PORTFOLIO_PROJECTS || []), playground: clone(window.PLAYGROUND_ITEMS || []), selected: 0, sha: null, playgroundSha: null, mode: 'projects' };
  let previewTimer;
  const tokenKey = 'elaine-portfolio-github-token';
  const savedToken = localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey) || '';
  $('token').value = savedToken;
  if (savedToken && !localStorage.getItem(tokenKey)) localStorage.setItem(tokenKey, savedToken);
  const isLocalAdmin = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  if (!isLocalAdmin) {
    $('sync-local').disabled = true;
    $('sync-local').title = '只有在本機編輯器中可以同步回電腦';
  }

  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
  const repoPath = () => `repos/${$('owner').value.trim()}/${$('repo').value.trim()}`;
  const setStatus = (text, error = false) => { $('status').textContent = text; $('status').style.color = error ? '#ef7777' : ''; };
  const projectPreview = project => {
    if (project.thumb) return project.thumb;
    const firstGroup = (project.processGroups || []).find(group => group.items?.length || group.left?.items?.length);
    return firstGroup?.items?.[0]?.src || firstGroup?.left?.items?.[0]?.src || '';
  };

  function renderList() {
    $('projects-list').innerHTML = state.projects.map((project, index) => `
      <button class="project-item${index === state.selected ? ' active' : ''}" data-project="${index}">
        <span class="project-thumb">${projectPreview(project) ? `<img src="${escapeHtml(projectPreview(project))}" alt="">` : '<span>＋</span>'}</span>
        <span class="project-item-copy">${escapeHtml(project.title || 'Untitled project')}<small>${escapeHtml(project.type || project.category || '')}</small></span>
      </button>`).join('');
    $('projects-list').querySelectorAll('[data-project]').forEach(button => {
      button.addEventListener('click', () => { state.mode = 'projects'; state.selected = Number(button.dataset.project); renderList(); renderEditor(); });
    });
  }

  function renderEditor() {
    $('playground-editor').hidden = state.mode !== 'playground';
    $('project-form').hidden = state.mode !== 'projects';
    $('empty-state').hidden = state.mode !== 'projects';
    if (state.mode === 'playground') { renderPlayground(); return; }
    const project = state.projects[state.selected];
    if (!project) { $('project-form').hidden = true; $('empty-state').hidden = false; return; }
    $('empty-state').hidden = true; $('project-form').hidden = false;
    $('editor-title').textContent = project.title || 'Edit project';
    $('title').value = project.title || '';
    $('label').value = project.label || '';
    $('category').value = project.category || '';
    $('type').value = project.type || '';
    $('year').value = project.specs?.find(spec => spec.k === 'Year')?.v || '';
    $('location').value = project.specs?.find(spec => spec.k === 'Location')?.v || '';
    $('vimeo').value = project.vimeoId || '';
    $('thumb').value = project.thumb || '';
    $('desc').value = project.desc || '';
    renderMedia(project);
    renderBlocks(project.processGroups || []);
    bindLivePreviewFields();
    updateLivePreview(false);
  }

  function renderPlayground() {
    $('playground-items').innerHTML = state.playground.map((item, index) => `
      <article class="playground-editor-card" draggable="true" data-playground-index="${index}">
        <span class="drag-handle">⠿</span>
        <div class="playground-editor-preview">${item.src ? (item.type === 'video' ? `<video src="${escapeHtml(item.src)}" muted loop autoplay playsinline></video>` : `<img src="${escapeHtml(item.src)}" alt="">`) : '<span>尚未選擇檔案</span>'}</div>
        <div class="playground-editor-fields">
          <label>標題<input class="playground-title" value="${escapeHtml(item.title || '')}" placeholder="例如 Memory"></label>
          <label>類型<select class="playground-type"><option value="image" ${item.type === 'image' ? 'selected' : ''}>圖片</option><option value="video" ${item.type === 'video' ? 'selected' : ''}>影片</option></select></label>
          <label>檔案路徑<input class="playground-src" value="${escapeHtml(item.src || '')}" placeholder="Project file/Playground/..."></label>
          <div class="item-controls"><label class="upload-button">選擇檔案<input class="playground-upload" type="file" accept="image/*,video/*"></label><button type="button" class="danger-button remove-playground">移除</button></div>
        </div>
      </article>`).join('');
    $('playground-items').querySelectorAll('.playground-editor-card').forEach(card => {
      const index = Number(card.dataset.playgroundIndex);
      card.querySelector('.playground-title').addEventListener('input', event => { state.playground[index].title = event.target.value; });
      card.querySelector('.playground-type').addEventListener('change', event => { state.playground[index].type = event.target.value; renderPlayground(); });
      card.querySelector('.playground-src').addEventListener('change', event => { state.playground[index].src = event.target.value.trim(); renderPlayground(); });
      card.querySelector('.remove-playground').addEventListener('click', () => { state.playground.splice(index, 1); renderPlayground(); });
      card.querySelector('.playground-upload').addEventListener('change', event => uploadPlaygroundFile(index, event.target.files[0]));
      card.addEventListener('dragstart', event => { event.dataTransfer.setData('text/plain', String(index)); card.classList.add('dragging'); });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
      card.addEventListener('dragover', event => event.preventDefault());
      card.addEventListener('drop', event => {
        event.preventDefault();
        const from = Number(event.dataTransfer.getData('text/plain'));
        if (from === index || Number.isNaN(from)) return;
        const [moved] = state.playground.splice(from, 1);
        state.playground.splice(index, 0, moved);
        renderPlayground();
      });
    });
  }

  async function uploadPlaygroundFile(index, file) {
    if (!file) return;
    if (!$('token').value.trim()) { setStatus('請先連接 GitHub 再上傳檔案。', true); return; }
    try {
      setStatus(`Uploading ${file.name}…`);
      const path = `Project file/Playground/${file.name}`;
      const content = await fileToBase64(file);
      await github(`/contents/${encodePath(path)}`, { method: 'PUT', body: JSON.stringify({ message: `Add Playground ${file.name}`, content, branch: $('branch').value.trim() }) });
      state.playground[index].src = path;
      state.playground[index].type = file.type.startsWith('video/') ? 'video' : 'image';
      renderPlayground();
      setStatus('檔案已上傳，請再儲存 Playground。');
    } catch (error) { setStatus(error.message, true); }
  }

  async function loadPlaygroundFromGithub() {
    try {
      const file = await github('/contents/content/playground.js?ref=' + encodeURIComponent($('branch').value.trim()));
      state.playgroundSha = file.sha;
      const source = atob(file.content.replace(/\n/g, ''));
      const match = source.match(/window\.PLAYGROUND_ITEMS\s*=\s*([\s\S]*);\s*$/);
      if (match) state.playground = JSON.parse(match[1]);
    } catch (error) {
      if (!String(error.message).includes('(404)')) throw error;
      state.playgroundSha = null;
    }
  }

  async function savePlayground() {
    const current = await (async () => { try { return await github('/contents/content/playground.js?ref=' + encodeURIComponent($('branch').value.trim())); } catch (error) { if (String(error.message).includes('(404)')) return null; throw error; } })();
    const source = `window.PLAYGROUND_ITEMS = ${JSON.stringify(state.playground, null, 2)};\n`;
    const content = btoa(unescape(encodeURIComponent(source)));
    const body = { message: 'Update Playground content', content, branch: $('branch').value.trim() };
    if (current?.sha || state.playgroundSha) body.sha = current?.sha || state.playgroundSha;
    const saved = await github('/contents/content/playground.js', { method: 'PUT', body: JSON.stringify(body) });
    state.playgroundSha = saved.content.sha;
    setStatus('Playground 已儲存，網站會從 GitHub 更新。');
  }

  function renderMedia(project) {
    const vimeoIds = project.vimeoIds || (project.vimeoId ? [project.vimeoId] : []);
    $('vimeo-fields').innerHTML = vimeoIds.map((id, index) => `<div class="media-row"><span class="media-icon">V</span><input class="vimeo-field" value="${escapeHtml(id)}" placeholder="Vimeo ID"><button type="button" class="remove-media">移除</button></div>`).join('');
    $('loop-video-fields').innerHTML = (project.loopVideos || []).map(src => mediaRow(src)).join('');
    $('vimeo-fields').querySelectorAll('.remove-media').forEach(button => button.addEventListener('click', () => { button.parentElement.remove(); scheduleLivePreview(); }));
    $('loop-video-fields').querySelectorAll('.media-row').forEach(bindMediaRow);
  }

  function mediaRow(src = '') {
    return `<div class="media-row"><span class="media-icon">▶</span><div class="media-preview">${src ? `<video src="${escapeHtml(src)}" muted></video>` : '<span>尚未選擇影片</span>'}</div><input class="loop-video-src" value="${escapeHtml(src)}" placeholder="Project file/.../video.mp4"><label class="upload-button">選擇影片<input class="media-upload" type="file" accept="video/*"></label><button type="button" class="remove-media">移除</button></div>`;
  }

  function bindMediaRow(row) {
    row.querySelector('.remove-media')?.addEventListener('click', () => { row.remove(); scheduleLivePreview(); });
    row.querySelector('.loop-video-src')?.addEventListener('change', () => { row.querySelector('.media-preview').innerHTML = row.querySelector('.loop-video-src').value ? `<video src="${escapeHtml(row.querySelector('.loop-video-src').value)}" muted></video>` : '<span>尚未選擇影片</span>'; scheduleLivePreview(); });
    row.querySelector('.media-upload')?.addEventListener('change', async event => {
      const file = event.target.files[0]; if (!file) return;
      if (!$('token').value.trim()) { setStatus('請先連接 GitHub 再上傳影片。', true); return; }
      try {
        setStatus(`Uploading ${file.name}…`);
        const projectFolder = ($('title').value || 'New Project').replace(/[^a-z0-9 -]/gi, '').trim() || 'New Project';
        const path = `Project file/${projectFolder}/${file.name}`;
        const content = await fileToBase64(file);
        await github(`/contents/${encodePath(path)}`, { method: 'PUT', body: JSON.stringify({ message: `Add ${file.name}`, content, branch: $('branch').value.trim() }) });
        row.querySelector('.loop-video-src').value = path;
        row.querySelector('.media-preview').innerHTML = `<video src="${escapeHtml(path)}" muted></video>`;
        setStatus('影片已上傳，請再儲存作品內容。'); scheduleLivePreview();
      } catch (error) { setStatus(error.message, true); }
    });
  }

  function previewUrl(project) {
    if (!project?.page) return '';
    const url = new URL(project.page, window.location.href);
    url.searchParams.set('preview', '1');
    return url.href;
  }

  function updateLivePreview(fromForm = true) {
    const project = fromForm ? readForm() : state.projects[state.selected];
    if (!project) return;
    localStorage.setItem('portfolio-preview-projects', JSON.stringify(state.projects));
    const frame = $('live-preview-frame');
    const nextUrl = previewUrl(project);
    if (frame.src !== nextUrl) frame.src = nextUrl;
    else if (frame.contentWindow) frame.contentWindow.location.reload();
    $('preview-status').textContent = '草稿同步中';
  }

  function bindLivePreviewFields() {
    document.querySelectorAll('#project-form input:not(.file-upload), #project-form textarea, #project-form select').forEach(field => {
      field.addEventListener('input', scheduleLivePreview);
      field.addEventListener('change', scheduleLivePreview);
    });
  }

  function scheduleLivePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(() => updateLivePreview(true), 250);
  }

  function previewMedia(src) {
    if (!src) return '<span class="preview-empty">尚未選擇圖片</span>';
    const safe = escapeHtml(src);
    return /\.(mp4|webm|mov)$/i.test(src) ? `<video src="${safe}" muted></video>` : `<img src="${safe}" alt="">`;
  }

  function blockKind(block) {
    if (block.type === 'text') return 'text';
    if ((block.cols || 1) === 1 && (block.items || []).length <= 1) return 'full';
    return 'gallery';
  }

  function blockSpan(block) {
    if (block.maxWidth === '30%') return 4;
    if (block.maxWidth === '50%') return 6;
    if (block.maxWidth === '75%') return 9;
    if (block.cols === 4) return 9;
    if (block.cols === 3) return 8;
    if (block.cols === 2) return 6;
    return 12;
  }

  function imageItem(item = {}) {
    return `<div class="block-item">
      <div class="item-preview">${previewMedia(item.src)}</div>
      <input class="item-src" value="${escapeHtml(item.src || '')}" placeholder="上傳後會自動填入檔案路徑">
      <input class="item-caption" value="${escapeHtml(item.caption || '')}" placeholder="圖片標題（可留白）">
      <div class="item-controls"><label class="upload-button">選擇檔案<input class="file-upload" type="file" accept="image/*,video/*"></label><button type="button" class="remove-item">移除這張</button></div>
    </div>`;
  }

  function advancedPreview(block) {
    const groupPreview = group => `<div class="mini-group"><span>${escapeHtml(group.group || '未命名區塊')}</span>${(group.items || []).slice(0, 3).map(item => `<div class="mini-image">${previewMedia(item.src)}</div>`).join('')}${group.type === 'text' ? '<p class="mini-text">文字內容</p>' : ''}</div>`;
    if (block.layout === 'two-col') {
      return `<div class="advanced-visual"><div class="advanced-title"><span class="layout-icon">▥</span><strong>雙欄版面</strong><small>左欄＋右欄</small></div><div class="advanced-columns"><div><em>左欄</em>${groupPreview(block.left || {})}</div><div><em>右欄</em>${(block.right || []).map(groupPreview).join('')}</div></div><textarea class="advanced-json" hidden>${escapeHtml(JSON.stringify(block))}</textarea></div>`;
    }
    return `<div class="advanced-visual"><div class="advanced-title"><span class="layout-icon">✦</span><strong>特殊內容區塊</strong><small>${escapeHtml(block.group || block.type || '')}</small></div><textarea class="advanced-json" hidden>${escapeHtml(JSON.stringify(block))}</textarea></div>`;
  }

  function renderBlocks(blocks) {
    $('blocks').innerHTML = blocks.map((block, index) => {
      if (block.layout === 'two-col' || ['transcripts', 'youtube-lyrics', 'vimeo-stack'].includes(block.type)) {
        return `<div class="block advanced-block" draggable="true" style="--block-span:${blockSpan(block)}" data-block="${index}">
          ${advancedPreview(block)}
          <div class="block-actions"><button type="button" class="text-button move-up">上移</button><button type="button" class="text-button move-down">下移</button><button type="button" class="danger-button remove-block">移除</button></div>
        </div>`;
      }
      const isText = block.type === 'text';
      const kind = blockKind(block);
      const items = block.items || [];
      return `<div class="block" draggable="true" style="--block-span:${blockSpan(block)}" data-block="${index}">
        <div class="block-toolbar"><span class="drag-handle">⠿</span><strong class="block-card-title">${escapeHtml(block.group || '未命名區塊')}</strong><div class="layout-pills"><button type="button" class="layout-pill${kind === 'text' ? ' active' : ''}" data-kind="text">T 文字</button><button type="button" class="layout-pill${kind === 'full' ? ' active' : ''}" data-kind="full">▰ 單張大圖</button><button type="button" class="layout-pill${kind === 'gallery' ? ' active' : ''}" data-kind="gallery">▦ 圖片畫廊</button></div></div>
        <div class="block-top">
          <label>區塊標題<input class="block-group" value="${escapeHtml(block.group || '')}"></label>
          <label>圖片欄數<select class="block-cols"><option value="1" ${block.cols === 1 ? 'selected' : ''}>單欄</option><option value="2" ${block.cols === 2 || !block.cols ? 'selected' : ''}>兩欄</option><option value="3" ${block.cols === 3 ? 'selected' : ''}>三欄</option><option value="4" ${block.cols === 4 ? 'selected' : ''}>四欄</option></select></label>
          <label>手機欄數<select class="block-mobile-cols"><option value="1" ${block.mobileCols !== 2 ? 'selected' : ''}>單欄</option><option value="2" ${block.mobileCols === 2 ? 'selected' : ''}>兩欄</option></select></label>
          <label>圖片寬度<select class="block-width"><option value="100%" ${!block.maxWidth || block.maxWidth === '100%' ? 'selected' : ''}>滿版</option><option value="75%" ${block.maxWidth === '75%' ? 'selected' : ''}>75%</option><option value="50%" ${block.maxWidth === '50%' ? 'selected' : ''}>50%</option><option value="30%" ${block.maxWidth === '30%' ? 'selected' : ''}>30%</option></select></label>
          <button type="button" class="text-button move-up">上移</button><button type="button" class="text-button move-down">下移</button><button type="button" class="danger-button remove-block">移除</button>
        </div>
        ${isText ? `<label>文字內容<textarea class="block-body" rows="5">${escapeHtml(block.body || '')}</textarea></label>` : `<div class="block-items">${items.map(imageItem).join('')}</div><div class="block-actions"><button type="button" class="text-button add-item">＋ 再加一張圖片／影片</button></div>`}
      </div>`;
    }).join('');
    $('blocks').querySelectorAll('.block').forEach(blockEl => {
      blockEl.querySelector('.remove-block')?.addEventListener('click', () => { blockEl.remove(); renumberBlocks(); scheduleLivePreview(); });
      blockEl.querySelector('.move-up')?.addEventListener('click', () => { moveBlock(blockEl, -1); scheduleLivePreview(); });
      blockEl.querySelector('.move-down')?.addEventListener('click', () => { moveBlock(blockEl, 1); scheduleLivePreview(); });
      blockEl.querySelectorAll('.layout-pill').forEach(button => button.addEventListener('click', () => switchBlockType(Number(blockEl.dataset.block), button.dataset.kind)));
      blockEl.addEventListener('click', event => {
        if (event.target.closest('button, input, textarea, select, label')) return;
        $('blocks').querySelectorAll('.block').forEach(other => { other.classList.remove('selected'); other.style.removeProperty('grid-column'); });
        blockEl.classList.add('selected'); blockEl.style.gridColumn = '1 / -1';
      });
      blockEl.querySelector('.add-item')?.addEventListener('click', () => {
        const items = blockEl.querySelector('.block-items');
        items.insertAdjacentHTML('beforeend', imageItem());
        bindUpload(items.lastElementChild);
        items.lastElementChild.querySelector('.remove-item').addEventListener('click', () => { items.lastElementChild.remove(); scheduleLivePreview(); });
        scheduleLivePreview();
      });
      blockEl.querySelectorAll('.remove-item').forEach(button => button.addEventListener('click', () => { button.closest('.block-item').remove(); scheduleLivePreview(); }));
      blockEl.querySelectorAll('.item-src').forEach(input => input.addEventListener('change', () => {
        input.closest('.block-item').querySelector('.item-preview').innerHTML = previewMedia(input.value.trim());
      }));
      blockEl.querySelectorAll('.file-upload').forEach(input => bindUpload(input.closest('.block-item')));
      blockEl.addEventListener('dragstart', event => { event.dataTransfer.setData('text/plain', blockEl.dataset.block); blockEl.classList.add('dragging'); });
      blockEl.addEventListener('dragend', () => { blockEl.classList.remove('dragging'); renumberBlocks(); });
      blockEl.addEventListener('dragover', event => event.preventDefault());
      blockEl.addEventListener('drop', event => {
        event.preventDefault();
        const from = $('blocks').querySelector(`[data-block="${event.dataTransfer.getData('text/plain')}"]`);
        if (from && from !== blockEl) blockEl.parentNode.insertBefore(from, blockEl);
        renumberBlocks();
        scheduleLivePreview();
      });
    });
  }

  function switchBlockType(index, kind) {
    readForm();
    const current = state.projects[state.selected].processGroups[index] || {};
    const group = current.group || 'New Section';
    const items = current.items?.length ? current.items : [{ src: '' }];
    state.projects[state.selected].processGroups[index] = kind === 'text'
      ? { type: 'text', group, body: current.body || '' }
      : { group, ...(kind === 'full' ? { maxWidth: '100%', cols: 1, items: [items[0]] } : { cols: 2, items }) };
    renderEditor();
    scheduleLivePreview();
  }

  function bindUpload(row) {
    row?.querySelector('.file-upload')?.addEventListener('change', async event => {
      const file = event.target.files[0]; if (!file) return;
      if (!$('token').value.trim()) { setStatus('Connect GitHub before uploading.', true); return; }
      try {
        setStatus(`Uploading ${file.name}…`);
        const projectFolder = ($('title').value || 'New Project').replace(/[^a-z0-9 -]/gi, '').trim() || 'New Project';
        const path = `Project file/${projectFolder}/${file.name}`;
        const content = await fileToBase64(file);
        await github(`/contents/${encodePath(path)}`, { method: 'PUT', body: JSON.stringify({ message: `Add ${file.name}`, content, branch: $('branch').value.trim() }) });
        row.querySelector('.item-src').value = path;
        row.querySelector('.item-preview').innerHTML = previewMedia(path);
        setStatus('Upload complete. Save the project to commit the content update.');
      } catch (error) { setStatus(error.message, true); }
    });
  }

  const encodePath = path => path.split('/').map(encodeURIComponent).join('/');
  const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  async function github(path, options = {}) {
    const token = $('token').value.trim();
    const response = await fetch(`https://api.github.com/${repoPath()}/${path.replace(/^\//, '')}`, { ...options, headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json', ...(options.headers || {}) } });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || `GitHub request failed (${response.status})`);
    return data;
  }

  function readForm() {
    const project = state.projects[state.selected];
    project.title = $('title').value.trim(); project.label = $('label').value.trim(); project.category = $('category').value.trim(); project.type = $('type').value.trim(); project.vimeoId = $('vimeo').value.trim(); project.thumb = $('thumb').value.trim(); project.desc = $('desc').value;
    const vimeoIds = [...document.querySelectorAll('.vimeo-field')].map(input => input.value.trim()).filter(Boolean);
    if (vimeoIds.length > 1) { project.vimeoIds = vimeoIds; delete project.vimeoId; }
    else { project.vimeoId = vimeoIds[0] || ''; delete project.vimeoIds; }
    const loopVideos = [...document.querySelectorAll('.loop-video-src')].map(input => input.value.trim()).filter(Boolean);
    if (loopVideos.length) project.loopVideos = loopVideos; else delete project.loopVideos;
    project.specs = (project.specs || []).filter(spec => !['Year', 'Location'].includes(spec.k));
    if ($('year').value.trim()) project.specs.unshift({ k: 'Year', v: $('year').value.trim() });
    if ($('location').value.trim()) project.specs.push({ k: 'Location', v: $('location').value.trim() });
    project.processGroups = [...$('blocks').querySelectorAll('.block')].map(blockEl => {
      if (blockEl.classList.contains('advanced-block')) return JSON.parse(blockEl.querySelector('.advanced-json').value);
      const group = { group: blockEl.querySelector('.block-group').value.trim() };
      const width = blockEl.querySelector('.block-width').value; if (width !== '100%') group.maxWidth = width;
      const cols = Number(blockEl.querySelector('.block-cols').value); if (cols > 1) group.cols = cols;
      const mobileCols = Number(blockEl.querySelector('.block-mobile-cols').value); if (mobileCols > 1) group.mobileCols = mobileCols;
      const body = blockEl.querySelector('.block-body');
      if (body) { group.type = 'text'; group.body = body.value; }
      else group.items = [...blockEl.querySelectorAll('.block-item')].map(row => ({ src: row.querySelector('.item-src').value.trim(), ...(row.querySelector('.item-caption').value.trim() ? { caption: row.querySelector('.item-caption').value.trim() } : {}) })).filter(item => item.src);
      return group;
    });
    return project;
  }

  function moveBlock(element, direction) {
    const sibling = direction < 0 ? element.previousElementSibling : element.nextElementSibling;
    if (sibling) direction < 0 ? element.parentNode.insertBefore(element, sibling) : element.parentNode.insertBefore(sibling, element);
  }
  function renumberBlocks() { $('blocks').querySelectorAll('.block').forEach((el, i) => { el.dataset.block = i; }); }

  $('connect').addEventListener('click', async () => {
    try {
      localStorage.setItem(tokenKey, $('token').value.trim()); sessionStorage.setItem(tokenKey, $('token').value.trim()); setStatus('Connecting…');
      const file = await github('/contents/content/projects.js?ref=' + encodeURIComponent($('branch').value.trim()));
      state.sha = file.sha;
      const source = atob(file.content.replace(/\n/g, ''));
      const match = source.match(/window\.PORTFOLIO_PROJECTS\s*=\s*([\s\S]*);\s*$/);
      if (!match) throw new Error('Could not read portfolio content.');
      const remoteProjects = JSON.parse(match[1]);
      state.projects = remoteProjects; state.selected = 0; await loadPlaygroundFromGithub(); state.mode = 'projects'; renderList(); renderEditor(); setStatus(JSON.stringify(remoteProjects) === JSON.stringify(window.PORTFOLIO_PROJECTS) ? '已連接 GitHub' : 'GitHub 有較新內容，建議同步到本機。', JSON.stringify(remoteProjects) !== JSON.stringify(window.PORTFOLIO_PROJECTS)); $('connection-summary').textContent = '已連接';
    } catch (error) { setStatus(error.message, true); }
  });
  $('sync-local').addEventListener('click', async () => {
    if (!isLocalAdmin) { setStatus('請從 localhost 編輯器使用同步到本機。', true); return; }
    if (!confirm('同步前會先備份目前本機內容。確定要用 GitHub 最新版本更新本機嗎？')) return;
    try {
      setStatus('正在同步到本機…');
      const file = await github('/contents/content/projects.js?ref=' + encodeURIComponent($('branch').value.trim()));
      const source = atob(file.content.replace(/\n/g, ''));
      const result = await fetch('/api/sync-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ source }) });
      const data = await result.json();
      if (!result.ok || !data.ok) throw new Error(data.error || '本機同步失敗');
      setStatus('同步完成，正在重新載入本機內容。');
      setTimeout(() => window.location.reload(), 500);
    } catch (error) { setStatus(error.message, true); }
  });
  $('save').addEventListener('click', async () => {
    try {
      if (state.mode === 'playground') { setStatus('Saving…'); await savePlayground(); return; }
      readForm(); setStatus('Saving…');
      const current = await github('/contents/content/projects.js?ref=' + encodeURIComponent($('branch').value.trim()));
      const source = `window.PORTFOLIO_PROJECTS = ${JSON.stringify(state.projects, null, 2)};\n`;
      const content = btoa(unescape(encodeURIComponent(source)));
      const saved = await github('/contents/content/projects.js', { method: 'PUT', body: JSON.stringify({ message: 'Update portfolio content', content, sha: current.sha, branch: $('branch').value.trim() }) });
      state.sha = saved.content.sha; setStatus('Saved. The website will redeploy from GitHub.');
    } catch (error) { setStatus(error.message, true); }
  });
  $('show-playground').addEventListener('click', () => { readForm(); state.mode = 'playground'; renderEditor(); });
  $('back-to-projects').addEventListener('click', () => { state.mode = 'projects'; renderList(); renderEditor(); });
  $('add-playground-image').addEventListener('click', () => { state.playground.push({ type: 'image', title: 'New Image', src: '' }); renderPlayground(); });
  $('add-playground-video').addEventListener('click', () => { state.playground.push({ type: 'video', title: 'New Video', src: '' }); renderPlayground(); });
  $('new-project').addEventListener('click', () => {
    readForm(); const nextNum = String(state.projects.length + 1).padStart(2, '0');
    const slug = `project-${Date.now()}`;
    state.projects.push({ slug, num: nextNum, category: 'works', label: 'Motion Graphics', title: 'NEW PROJECT', type: 'Motion Graphics · 2026', desc: '', specs: [{ k: 'Year', v: '2026' }, { k: 'Type', v: 'Motion Graphics' }, { k: 'Location', v: 'USA' }], thumb: '', processGroups: [], page: `work-template.html?project=${slug}` });
    state.selected = state.projects.length - 1; renderList(); renderEditor();
  });
  const addBlock = (block) => { readForm(); state.projects[state.selected].processGroups.push(block); renderEditor(); scheduleLivePreview(); };
  $('add-text-block').addEventListener('click', () => addBlock({ type: 'text', group: 'New Text Section', body: '' }));
  $('add-gallery-block').addEventListener('click', () => addBlock({ group: 'New Image Gallery', cols: 2, items: [{ src: '' }] }));
  $('add-image-block').addEventListener('click', () => addBlock({ group: 'New Full-width Image', maxWidth: '100%', cols: 1, items: [{ src: '' }] }));
  $('preview-project').addEventListener('click', () => {
    const project = readForm();
    updateLivePreview(false);
    const preview = window.open(previewUrl(project), '_blank', 'noopener,noreferrer');
    if (!preview) setStatus('瀏覽器阻擋了新視窗，請允許本站開啟預覽。', true);
  });
  $('add-vimeo').addEventListener('click', () => { $('vimeo-fields').insertAdjacentHTML('beforeend', '<div class="media-row"><span class="media-icon">V</span><input class="vimeo-field" placeholder="Vimeo ID"><button type="button" class="remove-media">移除</button></div>'); const row = $('vimeo-fields').lastElementChild; row.querySelector('.remove-media').addEventListener('click', () => { row.remove(); scheduleLivePreview(); }); row.querySelector('.vimeo-field').addEventListener('input', scheduleLivePreview); });
  $('add-loop-video').addEventListener('click', () => { $('loop-video-fields').insertAdjacentHTML('beforeend', mediaRow()); bindMediaRow($('loop-video-fields').lastElementChild); scheduleLivePreview(); });
  $('delete-project').addEventListener('click', () => { if (!confirm('Delete this project from the content file?')) return; state.projects.splice(state.selected, 1); state.selected = Math.max(0, state.selected - 1); renderList(); renderEditor(); });
  renderList(); renderEditor();
})();
