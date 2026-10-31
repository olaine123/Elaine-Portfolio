(() => {
  const $ = (id) => document.getElementById(id);
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const repairMojibake = value => {
    if (typeof value === 'string') {
      if (!/[ÃÂâåæçèé]/.test(value)) return value;
      try {
        const repaired = new TextDecoder().decode(Uint8Array.from(value, char => char.charCodeAt(0)));
        return repaired.includes('�') ? value : repaired;
      } catch { return value; }
    }
    if (Array.isArray(value)) return value.map(repairMojibake);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, repairMojibake(item)]));
    return value;
  };
  const state = { projects: clone(repairMojibake(window.PORTFOLIO_PROJECTS || [])), playground: clone(window.PLAYGROUND_ITEMS || []), selected: 0, sha: null, playgroundSha: null, mode: 'projects' };
  let previewTimer;
  const groupData = new WeakMap();
  const itemData = new WeakMap();
  let previewDevice = 'desktop';
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
    const query = $('project-search').value.trim().toLowerCase();
    $('projects-list').innerHTML = state.projects.map((project, index) => ({ project, index })).filter(({ project }) => `${project.title} ${project.type} ${project.category}`.toLowerCase().includes(query)).map(({ project, index }) => `
      <button class="project-item${index === state.selected ? ' active' : ''}" data-project="${index}">
        <span class="project-thumb">${projectPreview(project) ? previewMedia(projectPreview(project)) : '<span>＋</span>'}</span>
        <span class="project-item-copy">${escapeHtml(project.title || 'Untitled project')}<small>${escapeHtml(project.type || project.category || '')}</small></span>
      </button>`).join('');
    $('projects-list').querySelectorAll('[data-project]').forEach(button => {
      button.addEventListener('click', () => { flushEditor(); state.mode = 'projects'; state.selected = Number(button.dataset.project); renderList(); renderEditor(); });
    });
    $('projects-list').querySelectorAll('.project-thumb img, .project-thumb video').forEach(media => {
      media.addEventListener('error', () => { media.parentElement.textContent = '◇'; }, { once: true });
    });
    if (!$('projects-list').children.length) $('projects-list').innerHTML = '<p class="hint">沒有符合的作品。</p>';
  }

  function renderEditor() {
    $('playground-editor').hidden = state.mode !== 'playground';
    $('project-form').hidden = state.mode !== 'projects';
    if (state.mode === 'playground') {
      document.querySelector('.live-preview').hidden = true;
      document.querySelector('.admin-layout').classList.remove('with-preview');
      $('toggle-preview').setAttribute('aria-expanded', 'false');
      $('toggle-preview').textContent = '即時預覽';
    }
    $('toggle-preview').disabled = state.mode !== 'projects';
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
    $('thumb').value = project.thumb || '';
    $('desc').value = project.desc || '';
    renderCover();
    $('concept-editor').replaceChildren(createRichEditor(project.desc || '', '作品概念'));
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
      const source = decodeBase64Utf8(file.content);
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
    if (state.mode !== 'projects') return;
    const project = fromForm ? readForm() : state.projects[state.selected];
    if (!project) return;
    localStorage.setItem('portfolio-preview-projects', JSON.stringify(publishableProjects()));
    const frame = $('live-preview-frame');
    if (document.querySelector('.live-preview').hidden) { $('preview-status').textContent = '草稿已更新'; return; }
    const nextUrl = previewUrl(project);
    if (frame.src !== nextUrl) frame.src = nextUrl;
    else if (frame.contentWindow) frame.contentWindow.location.reload();
    $('preview-status').textContent = '草稿同步中';
  }

  function publishableProjects() {
    const clean = value => {
      if (Array.isArray(value)) return value.map(clean);
      if (!value || typeof value !== 'object') return value;
      const copy = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, clean(item)]));
      if (Array.isArray(copy.items)) copy.items = copy.items.filter(item => item.src?.trim());
      return copy;
    };
    return state.projects.map(clean);
  }

  function bindLivePreviewFields() {
    // Delegate below so new media rows and nested groups stay in sync.
  }

  function scheduleLivePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(() => updateLivePreview(true), 250);
  }

  function flushEditor() {
    clearTimeout(previewTimer);
    if (state.mode === 'projects' && !$('project-form').hidden) readForm();
  }

  function renderCover() {
    $('cover-preview').innerHTML = previewMedia($('thumb').value.trim());
  }

  function cleanRichHtml(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    const allowed = new Set(['P', 'DIV', 'BR', 'STRONG', 'B', 'EM', 'I', 'U', 'UL', 'OL', 'LI', 'A', 'H3', 'BLOCKQUOTE']);
    const clean = parent => [...parent.children].forEach(el => {
      if (['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'SVG', 'MATH'].includes(el.tagName)) { el.remove(); return; }
      clean(el);
      if (!allowed.has(el.tagName)) { el.replaceWith(...el.childNodes); return; }
      const href = el.getAttribute('href') || '';
      [...el.attributes].forEach(attr => el.removeAttribute(attr.name));
      if (el.tagName === 'A' && /^(https?:\/\/|mailto:|\/|#)/i.test(href) && !href.startsWith('//')) {
        el.setAttribute('href', href); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener noreferrer');
      }
    });
    clean(template.content);
    return template.innerHTML;
  }

  function createRichEditor(value, name) {
    const wrapper = document.createElement('div');
    wrapper.className = 'rich-editor';
    wrapper.innerHTML = `<div class="rich-toolbar" role="toolbar" aria-label="文字格式">
      <button type="button" data-command="formatBlock" data-value="p">段落</button><button type="button" data-command="formatBlock" data-value="h3">標題</button>
      <button type="button" data-command="bold" aria-label="粗體"><b>B</b></button><button type="button" data-command="italic" aria-label="斜體"><i>I</i></button>
      <button type="button" data-command="insertUnorderedList" aria-label="項目清單">• 清單</button><button type="button" data-command="createLink">連結</button>
    </div><div class="rich-body" contenteditable="true" role="textbox" aria-multiline="true" aria-label="${escapeHtml(name)}" data-placeholder="輸入文字內容…"></div>`;
    const body = wrapper.querySelector('.rich-body');
    body.innerHTML = cleanRichHtml(value);
    wrapper.originalValue = value;
    wrapper.originalHtml = body.innerHTML;
    wrapper.querySelectorAll('[data-command]').forEach(button => {
      button.addEventListener('mousedown', event => event.preventDefault());
      button.addEventListener('click', () => {
        const selection = window.getSelection();
        if (!selection.rangeCount || !body.contains(selection.anchorNode)) body.focus();
        let value = button.dataset.value || null;
        if (button.dataset.command === 'createLink') {
          value = prompt('輸入連結網址（https://…）');
          if (!value) return;
          if (!/^(https?:\/\/|mailto:)/i.test(value)) { setStatus('請使用 https://、http:// 或 mailto: 開頭的連結。', true); return; }
        }
        document.execCommand(button.dataset.command, false, value);
        scheduleLivePreview();
      });
    });
    body.addEventListener('paste', event => {
      event.preventDefault();
      document.execCommand('insertText', false, event.clipboardData.getData('text/plain'));
    });
    body.addEventListener('drop', event => event.preventDefault());
    return wrapper;
  }

  function readRichEditor(wrapper) {
    const html = wrapper.querySelector('.rich-body').innerHTML;
    return html === wrapper.originalHtml ? wrapper.originalValue : cleanRichHtml(html);
  }

  function previewMedia(src) {
    if (!src) return '<span class="preview-empty">尚未選擇圖片</span>';
    const safe = escapeHtml(src);
    return /\.(mp4|webm|mov)(?:[?#]|$)/i.test(src) ? `<video src="${safe}" muted playsinline preload="metadata"></video>` : `<img src="${safe}" alt="">`;
  }

  function columnOptions(value = 1, preserveExisting = false) {
    const options = [1, 2, 3, 4];
    if (preserveExisting && Number.isInteger(Number(value)) && Number(value) > 4) options.push(Number(value));
    return options.map(n => `<option value="${n}" ${Number(value) === n ? 'selected' : ''}>${n} 欄${n > 4 ? '（原有設定）' : ''}</option>`).join('');
  }

  function selectOptions(values, value) {
    const options = [...values];
    if (!options.some(([key]) => key === value)) options.push([value, `原有設定（${value}）`]);
    return options.map(([key, label]) => `<option value="${escapeHtml(key)}" ${key === value ? 'selected' : ''}>${escapeHtml(label)}</option>`).join('');
  }

  function isEditableGroup(group) {
    return !group.layout && (!group.type || group.type === 'text');
  }

  function createMediaCard(item = {}) {
    const row = document.createElement('div');
    row.className = 'block-item';
    itemData.set(row, clone(item));
    row.innerHTML = `<div class="item-preview">${previewMedia(item.src)}</div>
      <label class="asset-path">圖片／影片路徑<input class="item-src" value="${escapeHtml(item.src || '')}" placeholder="貼上網址或選擇檔案"></label>
      <label>說明<input class="item-caption" value="${escapeHtml(item.caption || '')}" placeholder="可留白"></label>
      <div class="item-controls"><label class="upload-button">更換<input class="file-upload" type="file" accept="image/*,video/*"></label>
      <button type="button" class="text-button item-prev" aria-label="將媒體前移">←</button><button type="button" class="text-button item-next" aria-label="將媒體後移">→</button>
      <button type="button" class="remove-item" aria-label="移除此媒體">移除</button></div>`;
    row.querySelector('.item-src').addEventListener('input', event => { row.querySelector('.item-preview').innerHTML = previewMedia(event.target.value.trim()); });
    row.querySelector('.remove-item').addEventListener('click', () => { row.remove(); scheduleLivePreview(); });
    row.querySelector('.item-prev').addEventListener('click', () => { moveBlock(row, -1); scheduleLivePreview(); });
    row.querySelector('.item-next').addEventListener('click', () => { moveBlock(row, 1); scheduleLivePreview(); });
    bindUpload(row);
    return row;
  }

  function createGroupEditor(group = {}) {
    const el = document.createElement('div');
    el.className = 'group-editor';
    groupData.set(el, clone(group));
    if (!isEditableGroup(group)) {
      el.classList.add('preserved-group');
      el.innerHTML = `<p class="preserved-title">${escapeHtml(group.group || '特殊內容')}</p><p class="hint">此區塊使用專屬版型，儲存時會保留原有內容。</p>`;
      return el;
    }
    const isText = group.type === 'text';
    el.innerHTML = `<label class="cms-row"><span>區塊標題</span><input class="block-group" value="${escapeHtml(group.group || '')}" placeholder="例如 Style Frames、製作過程"></label>`;
    if (isText) {
      const row = document.createElement('div');
      row.className = 'cms-row text-content-row';
      row.innerHTML = '<span class="field-name">文字內容</span>';
      row.append(createRichEditor(group.body || '', '區塊文字內容'));
      el.append(row);
    } else {
      const settings = document.createElement('div');
      settings.className = 'group-settings';
      settings.innerHTML = `<label>桌面欄數<select class="block-cols">${columnOptions(group.cols || ((group.items || []).length === 1 ? 1 : (group.items || []).length === 2 ? 2 : 3), true)}</select></label>
        <label>手機欄數<select class="block-mobile-cols">${columnOptions(group.mobileCols || 1)}</select></label>
        <label>內容寬度<select class="block-width">${selectOptions([['100%', '滿版'], ['75%', '75%'], ['50%', '50%'], ['30%', '30%']], group.maxWidth || '100%')}</select></label>`;
      el.append(settings);
      const list = document.createElement('div');
      list.className = 'block-items';
      (group.items || []).forEach(item => list.append(createMediaCard(item)));
      el.append(list);
      const actions = document.createElement('div');
      actions.className = 'gallery-actions';
      actions.innerHTML = '<label class="upload-button">＋ 上傳圖片／影片<input class="gallery-upload" type="file" multiple accept="image/*,video/*"></label><button type="button" class="text-button add-item">＋ 貼上媒體路徑</button>';
      actions.querySelector('.add-item').addEventListener('click', () => { list.append(createMediaCard()); scheduleLivePreview(); });
      actions.querySelector('.gallery-upload').addEventListener('change', async event => {
        const files = [...event.target.files];
        event.target.disabled = true;
        try {
          for (const file of files) {
            const path = await uploadAsset(file);
            list.append(createMediaCard({ src: path }));
          }
          setStatus('媒體已上傳，發布作品後會顯示在網站。');
        } catch (error) { setStatus(error.message, true); }
        finally { event.target.disabled = false; event.target.value = ''; scheduleLivePreview(); }
      });
      el.append(actions);
    }
    return el;
  }

  function readGroupEditor(el) {
    const original = groupData.get(el) || {};
    if (el.classList.contains('preserved-group')) return clone(original);
    const group = clone(original);
    const title = el.querySelector('.block-group').value.trim();
    if (title || 'group' in group) group.group = title;
    if (group.type === 'text') {
      group.body = readRichEditor(el.querySelector('.rich-editor'));
    } else {
      const cols = Number(el.querySelector('.block-cols').value);
      const defaultCols = original.cols || (original.items?.length === 1 ? 1 : original.items?.length === 2 ? 2 : 3);
      if (cols !== defaultCols || 'cols' in group) group.cols = cols;
      const mobileCols = Number(el.querySelector('.block-mobile-cols').value);
      if (mobileCols !== (original.mobileCols || 1) || 'mobileCols' in group) group.mobileCols = mobileCols;
      const width = el.querySelector('.block-width').value;
      if (width !== (original.maxWidth || '100%') || 'maxWidth' in group) group.maxWidth = width;
      group.items = [...el.querySelector('.block-items').children].map(row => {
        const item = { ...(itemData.get(row) || {}), src: row.querySelector('.item-src').value.trim() };
        const caption = row.querySelector('.item-caption').value.trim();
        if (caption || 'caption' in item) item.caption = caption;
        return item;
      });
      if (group.items.length !== (original.items || []).length) group.cols = cols;
    }
    return group;
  }

  function createSplitEditor(block) {
    const el = document.createElement('div');
    el.className = 'split-editor';
    el.innerHTML = `<div class="split-settings"><label>左右寬度<select class="split-ratio">${selectOptions([['1fr 1fr', '左右各半'], ['2fr 1fr', '左寬、右窄'], ['1fr 2fr', '左窄、右寬']], block.ratio || '1fr 2fr')}</select></label><p class="hint">手機版依序顯示左欄、右欄。影片可在左欄設定為 1 欄上下排列，或 2 欄並排。</p></div><div class="split-columns"><section class="split-left"><h4>左欄</h4><div class="split-left-content"></div></section><section class="split-right"><h4>右欄</h4><div class="split-right-content"></div><div class="gallery-actions"><button type="button" class="text-button add-right-text">＋ 文字</button><button type="button" class="text-button add-right-media">＋ 媒體</button></div></section></div>`;
    el.querySelector('.split-left-content').append(createGroupEditor(block.left || { items: [] }));
    const right = el.querySelector('.split-right-content');
    const addRight = group => {
      const card = document.createElement('div');
      card.className = 'nested-group';
      card.innerHTML = '<div class="nested-actions"><button type="button" class="text-button nested-up">上移</button><button type="button" class="text-button nested-down">下移</button><button type="button" class="remove-item nested-remove">移除</button></div>';
      card.append(createGroupEditor(group));
      card.querySelector('.nested-up').addEventListener('click', () => { moveBlock(card, -1); scheduleLivePreview(); });
      card.querySelector('.nested-down').addEventListener('click', () => { moveBlock(card, 1); scheduleLivePreview(); });
      card.querySelector('.nested-remove').addEventListener('click', () => { card.remove(); scheduleLivePreview(); });
      right.append(card);
    };
    (block.right || []).forEach(addRight);
    el.querySelector('.add-right-text').addEventListener('click', () => { addRight({ type: 'text', group: '', body: '' }); scheduleLivePreview(); });
    el.querySelector('.add-right-media').addEventListener('click', () => { addRight({ group: '', cols: 1, items: [] }); scheduleLivePreview(); });
    return el;
  }

  function readBlock(blockEl) {
    const original = groupData.get(blockEl);
    if (original.layout === 'two-col') {
      const group = clone(original);
      const ratio = blockEl.querySelector('.split-ratio').value;
      if (ratio !== (original.ratio || '1fr 2fr') || 'ratio' in group) group.ratio = ratio;
      group.left = readGroupEditor(blockEl.querySelector('.split-left-content > .group-editor'));
      group.right = [...blockEl.querySelector('.split-right-content').children].map(card => readGroupEditor(card.querySelector('.group-editor')));
      return group;
    }
    return readGroupEditor(blockEl.querySelector('.block-content > .group-editor'));
  }

  function renderBlocks(blocks) {
    $('blocks').replaceChildren();
    if (!blocks.length) $('blocks').innerHTML = '<div class="blocks-empty">還沒有作品流程。從上方新增文字、媒體或雙欄圖文。</div>';
    blocks.forEach((block, index) => {
      const el = document.createElement('details');
      el.className = 'block';
      el.dataset.block = index;
      groupData.set(el, clone(block));
      const kind = block.layout === 'two-col' ? '雙欄圖文' : block.type === 'text' ? '文字' : isEditableGroup(block) ? '圖片／影片' : '專屬版型';
      el.open = index === 0;
      el.innerHTML = `<summary class="block-toolbar"><span class="block-number">${String(index + 1).padStart(2, '0')}</span><span class="block-card-title">${escapeHtml(block.group || block.left?.group || kind)}</span><span class="block-kind">${kind}</span><span class="expand-indicator">＋</span></summary><div class="block-content"></div><div class="block-actions"><button type="button" class="text-button move-up">↑ 上移</button><button type="button" class="text-button move-down">↓ 下移</button><button type="button" class="text-button duplicate-block">複製</button><button type="button" class="danger-button remove-block">移除區塊</button></div>`;
      el.querySelector('.block-content').append(block.layout === 'two-col' ? createSplitEditor(block) : createGroupEditor(block));
      el.querySelector('.remove-block').addEventListener('click', () => {
        if (!confirm('確定移除此區塊？發布前不會影響線上網站。')) return;
        el.remove(); renumberBlocks(); scheduleLivePreview();
      });
      el.querySelector('.move-up').addEventListener('click', () => { moveBlock(el, -1); renumberBlocks(); scheduleLivePreview(); });
      el.querySelector('.move-down').addEventListener('click', () => { moveBlock(el, 1); renumberBlocks(); scheduleLivePreview(); });
      el.querySelector('.duplicate-block').addEventListener('click', () => {
        const index = [...$('blocks').children].indexOf(el);
        flushEditor();
        const groups = state.projects[state.selected].processGroups;
        groups.splice(index + 1, 0, clone(groups[index]));
        renderBlocks(groups); $('blocks').children[index + 1].open = true; scheduleLivePreview();
      });
      el.addEventListener('input', () => {
        const field = el.querySelector('.block-group');
        if (field) el.querySelector('.block-card-title').textContent = field.value || kind;
      });
      $('blocks').append(el);
    });
  }

  function bindUpload(row) {
    row?.querySelector('.file-upload')?.addEventListener('change', async event => {
      const file = event.target.files[0]; if (!file) return;
      try {
        const path = await uploadAsset(file);
        row.querySelector('.item-src').value = path;
        row.querySelector('.item-preview').innerHTML = previewMedia(path);
        setStatus('媒體已上傳，發布作品後會顯示在網站。'); scheduleLivePreview();
      } catch (error) { setStatus(error.message, true); }
    });
  }

  async function uploadAsset(file) {
    if (!$('token').value.trim()) throw new Error('請先在 GitHub 設定中連接，再上傳檔案。');
    setStatus(`正在上傳 ${file.name}…`);
    const folder = ($('title').value || 'New Project').replace(/[^a-z0-9 -]/gi, '').trim() || 'New Project';
    const path = `Project file/${folder}/${Date.now()}-${file.name}`;
    const content = await fileToBase64(file);
    await github(`/contents/${encodePath(path)}`, { method: 'PUT', body: JSON.stringify({ message: `Add ${file.name}`, content, branch: $('branch').value.trim() }) });
    return path;
  }

  const encodePath = path => path.split('/').map(encodeURIComponent).join('/');
  const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const decodeBase64Utf8 = value => {
    const binary = atob(value.replace(/\n/g, ''));
    return new TextDecoder().decode(Uint8Array.from(binary, char => char.charCodeAt(0)));
  };
  async function github(path, options = {}) {
    const token = $('token').value.trim();
    const response = await fetch(`https://api.github.com/${repoPath()}/${path.replace(/^\//, '')}`, { ...options, headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json', ...(options.headers || {}) } });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || `GitHub request failed (${response.status})`);
    return data;
  }

  function readForm() {
    const project = state.projects[state.selected];
    if (!project || state.mode !== 'projects' || $('project-form').hidden) return project;
    project.title = $('title').value.trim(); project.label = $('label').value.trim(); project.category = $('category').value.trim(); project.type = $('type').value.trim(); project.thumb = $('thumb').value.trim();
    project.desc = readRichEditor($('concept-editor').querySelector('.rich-editor'));
    $('desc').value = project.desc;
    const vimeoIds = [...document.querySelectorAll('.vimeo-field')].map(input => input.value.trim()).filter(Boolean);
    if (vimeoIds.length > 1) { project.vimeoIds = vimeoIds; delete project.vimeoId; }
    else { project.vimeoId = vimeoIds[0] || ''; delete project.vimeoIds; }
    const loopVideos = [...document.querySelectorAll('.loop-video-src')].map(input => input.value.trim()).filter(Boolean);
    if (loopVideos.length) project.loopVideos = loopVideos; else delete project.loopVideos;
    project.specs = project.specs || [];
    [['Year', 'year'], ['Location', 'location']].forEach(([key, id]) => {
      const value = $(id).value.trim();
      const index = project.specs.findIndex(spec => spec.k === key);
      if (index >= 0) {
        if (value) project.specs[index].v = value;
        else project.specs.splice(index, 1);
      } else if (value) project.specs.push({ k: key, v: value });
    });
    project.processGroups = [...$('blocks').querySelectorAll(':scope > .block')].map(readBlock);
    return project;
  }

  function moveBlock(element, direction) {
    const sibling = direction < 0 ? element.previousElementSibling : element.nextElementSibling;
    if (sibling) direction < 0 ? element.parentNode.insertBefore(element, sibling) : element.parentNode.insertBefore(sibling, element);
  }
  function renumberBlocks() { $('blocks').querySelectorAll('.block').forEach((el, i) => { el.dataset.block = i; el.querySelector('.block-number').textContent = String(i + 1).padStart(2, '0'); }); }

  $('connect').addEventListener('click', async () => {
    try {
      localStorage.setItem(tokenKey, $('token').value.trim()); sessionStorage.setItem(tokenKey, $('token').value.trim()); setStatus('Connecting…');
      const file = await github('/contents/content/projects.js?ref=' + encodeURIComponent($('branch').value.trim()));
      state.sha = file.sha;
      const source = decodeBase64Utf8(file.content);
      const match = source.match(/window\.PORTFOLIO_PROJECTS\s*=\s*([\s\S]*);\s*$/);
      if (!match) throw new Error('Could not read portfolio content.');
      const remoteProjects = repairMojibake(JSON.parse(match[1]));
      state.projects = remoteProjects; state.selected = 0; await loadPlaygroundFromGithub(); state.mode = 'projects'; renderList(); renderEditor(); setStatus(JSON.stringify(remoteProjects) === JSON.stringify(window.PORTFOLIO_PROJECTS) ? '已連接 GitHub' : 'GitHub 有較新內容，建議同步到本機。', JSON.stringify(remoteProjects) !== JSON.stringify(window.PORTFOLIO_PROJECTS)); $('connection-summary').textContent = '已連接';
    } catch (error) { setStatus(error.message, true); }
  });
  $('sync-local').addEventListener('click', async () => {
    if (!isLocalAdmin) { setStatus('請從 localhost 編輯器使用同步到本機。', true); return; }
    if (!confirm('同步前會先備份目前本機內容。確定要用 GitHub 最新版本更新本機嗎？')) return;
    try {
      setStatus('正在同步到本機…');
      const file = await github('/contents/content/projects.js?ref=' + encodeURIComponent($('branch').value.trim()));
      const source = decodeBase64Utf8(file.content);
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
      const source = `window.PORTFOLIO_PROJECTS = ${JSON.stringify(publishableProjects(), null, 2)};\n`;
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
    flushEditor(); state.mode = 'projects'; const nextNum = String(state.projects.length + 1).padStart(2, '0');
    $('project-search').value = '';
    const slug = `project-${Date.now()}`;
    state.projects.push({ slug, num: nextNum, category: 'works', label: 'Motion Graphics', title: 'NEW PROJECT', type: 'Motion Graphics · 2026', desc: '', specs: [{ k: 'Year', v: '2026' }, { k: 'Type', v: 'Motion Graphics' }, { k: 'Location', v: 'USA' }], thumb: '', processGroups: [], page: `work-template.html?project=${slug}` });
    state.selected = state.projects.length - 1; renderList(); renderEditor();
  });
  const addBlock = (block) => {
    flushEditor();
    const groups = state.projects[state.selected].processGroups;
    groups.push(block); renderBlocks(groups);
    const last = $('blocks').lastElementChild; last.open = true; last.scrollIntoView({ behavior: 'smooth', block: 'center' });
    scheduleLivePreview();
  };
  $('add-text-block').addEventListener('click', () => addBlock({ type: 'text', group: 'New Text Section', body: '' }));
  $('add-gallery-block').addEventListener('click', () => addBlock({ group: 'New Image Gallery', cols: 2, items: [{ src: '' }] }));
  $('add-image-block').addEventListener('click', () => addBlock({ group: 'New Full-width Image', maxWidth: '100%', cols: 1, items: [{ src: '' }] }));
  $('add-split-block').addEventListener('click', () => addBlock({ layout: 'two-col', ratio: '1fr 1fr', left: { group: '影片', cols: 1, mobileCols: 1, items: [{ src: '' }, { src: '' }] }, right: [{ type: 'text', group: '作品說明', body: '' }] }));
  $('preview-project').addEventListener('click', () => {
    const project = readForm();
    updateLivePreview(false);
    const preview = window.open(previewUrl(project), '_blank', 'noopener,noreferrer');
    if (!preview) setStatus('瀏覽器阻擋了新視窗，請允許本站開啟預覽。', true);
  });
  $('add-vimeo').addEventListener('click', () => { $('vimeo-fields').insertAdjacentHTML('beforeend', '<div class="media-row"><span class="media-icon">V</span><input class="vimeo-field" placeholder="Vimeo ID"><button type="button" class="remove-media">移除</button></div>'); const row = $('vimeo-fields').lastElementChild; row.querySelector('.remove-media').addEventListener('click', () => { row.remove(); scheduleLivePreview(); }); row.querySelector('.vimeo-field').addEventListener('input', scheduleLivePreview); });
  $('add-loop-video').addEventListener('click', () => { $('loop-video-fields').insertAdjacentHTML('beforeend', mediaRow()); bindMediaRow($('loop-video-fields').lastElementChild); scheduleLivePreview(); });
  $('delete-project').addEventListener('click', () => { if (!confirm('Delete this project from the content file?')) return; state.projects.splice(state.selected, 1); state.selected = Math.max(0, state.selected - 1); renderList(); renderEditor(); });
  $('project-form').addEventListener('submit', event => event.preventDefault());
  $('project-form').addEventListener('input', event => {
    if (event.target === $('title')) {
      $('editor-title').textContent = $('title').value || '未命名作品';
      const selected = $('projects-list').querySelector(`[data-project="${state.selected}"] .project-item-copy`);
      if (selected?.firstChild) selected.firstChild.textContent = $('title').value || '未命名作品';
    }
    scheduleLivePreview();
  });
  $('project-form').addEventListener('change', event => { if (event.target.type !== 'file') scheduleLivePreview(); });
  $('project-search').addEventListener('input', renderList);
  $('thumb').addEventListener('input', renderCover);
  $('cover-upload').addEventListener('change', async event => {
    const file = event.target.files[0]; if (!file) return;
    try { $('thumb').value = await uploadAsset(file); renderCover(); scheduleLivePreview(); setStatus('封面已上傳，請發布作品。'); }
    catch (error) { setStatus(error.message, true); }
    event.target.value = '';
  });
  function sizePreview() {
    const wrap = document.querySelector('.preview-frame-wrap');
    const width = previewDevice === 'mobile' ? 390 : 1280;
    const scale = Math.min(wrap.clientWidth / width, 1);
    if (!scale) return;
    const frame = $('live-preview-frame');
    frame.style.width = `${width}px`;
    frame.style.height = `${wrap.clientHeight / scale}px`;
    frame.style.transform = `scale(${scale})`;
  }
  $('toggle-preview').addEventListener('click', () => {
    const pane = document.querySelector('.live-preview');
    pane.hidden = !pane.hidden;
    document.querySelector('.admin-layout').classList.toggle('with-preview', !pane.hidden);
    $('toggle-preview').setAttribute('aria-expanded', String(!pane.hidden));
    $('toggle-preview').textContent = pane.hidden ? '即時預覽' : '關閉預覽';
    if (!pane.hidden) { updateLivePreview(); sizePreview(); }
  });
  document.querySelectorAll('[data-device]').forEach(button => button.addEventListener('click', () => {
    previewDevice = button.dataset.device;
    document.querySelectorAll('[data-device]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    sizePreview();
  }));
  new ResizeObserver(sizePreview).observe(document.querySelector('.preview-frame-wrap'));
  $('live-preview-frame').addEventListener('load', () => { $('preview-status').textContent = '草稿預覽'; });
  renderList(); renderEditor();
})();
