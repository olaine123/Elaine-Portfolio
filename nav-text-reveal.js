// Use the homepage's letter-by-letter rollover on every page's navigation.
(() => {
  document.querySelectorAll('.nav-links a, .foot-nav a').forEach(el => {
    if (el.dataset.textReveal === 'ready') return;
    const text = el.textContent.trim();
    if (!text) return;
    el.dataset.textReveal = 'ready';
    el.setAttribute('aria-label', text);
    el.innerHTML = '';

    const wrap = document.createElement('span');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.style.cssText = 'display:inline-block;overflow:hidden;height:1em;line-height:1;white-space:nowrap;vertical-align:middle;';
    const letters = [...text].map((char, i) => {
      const letter = document.createElement('span');
      letter.textContent = char === ' ' ? '\u00a0' : char;
      letter.style.cssText = `display:inline-block;line-height:1;text-shadow:0 1em currentColor;transition:transform 280ms ease ${i * 25}ms;`;
      wrap.appendChild(letter);
      return letter;
    });
    el.appendChild(wrap);

    let hovered = false;
    let focused = false;
    const update = () => letters.forEach(letter => {
      letter.style.transform = hovered || focused ? 'translateY(-1em)' : '';
    });
    el.addEventListener('mouseenter', () => { hovered = true; update(); });
    el.addEventListener('mouseleave', () => { hovered = false; update(); });
    el.addEventListener('focus', () => { focused = true; update(); });
    el.addEventListener('blur', () => { focused = false; update(); });
  });
})();
