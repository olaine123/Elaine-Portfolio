// Keep the background still, including on mobile browsers, while a preview is open.
window.lightboxScroll = (() => {
  let saved = null;
  const bodyProperties = ['position', 'top', 'left', 'right', 'width', 'overflow', 'paddingRight'];

  function lock() {
    if (saved) return;
    const body = document.body;
    const root = document.documentElement;
    const gap = Math.max(0, window.innerWidth - root.clientWidth);
    const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
    saved = {
      x: window.scrollX, y: window.scrollY,
      body: Object.fromEntries(bodyProperties.map(key => [key, body.style[key]])),
      rootOverflow: root.style.overflow,
    };
    root.style.overflow = 'hidden';
    Object.assign(body.style, {
      position: 'fixed', top: `-${saved.y}px`, left: `-${saved.x}px`,
      right: '0', width: '100%', overflow: 'hidden',
      paddingRight: `${padding + gap}px`,
    });
  }

  function unlock() {
    if (!saved) return;
    const previous = saved;
    saved = null;
    Object.assign(document.body.style, previous.body);
    document.documentElement.style.overflow = previous.rootOverflow;
    window.scrollTo({ left: previous.x, top: previous.y, behavior: 'instant' });
  }

  return { lock, unlock, getScrollY: () => saved ? saved.y : window.scrollY };
})();
