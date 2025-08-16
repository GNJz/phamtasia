document.addEventListener('DOMContentLoaded', () => {
  const body        = document.body;
  const sideMenu    = document.getElementById('sideMenu');
  const menuBtn     = document.getElementById('menuBtn');
  const menuContent = document.getElementById('menuContent');

  // 메뉴 폭을 CSS 변수로 반영(모바일 로고 이동에 사용 가능)
  function setMenuWidthVar() {
    const w = parseInt(getComputedStyle(sideMenu).width, 10) || 250;
    document.documentElement.style.setProperty('--menu-width', w + 'px');
  }
  setMenuWidthVar();
  window.addEventListener('resize', setMenuWidthVar);

  // 햄버거 토글
  menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    const open = sideMenu.classList.contains('active');
    menuBtn.setAttribute('aria-expanded', String(open));
    body.classList.toggle('menu-open', open);
  });

  // 서브메뉴 토글
  document.querySelectorAll('.submenu-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      if (!sub || !sub.classList.contains('submenu')) return;
      sub.classList.toggle('show');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
    });
  });

  // 섹션 전환 (필요 시)
  function showSection(id) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(s => s.classList.remove('active'));
    const el = id && document.getElementById(id);
    if (el) el.classList.add('active');

    // 메뉴 닫기
    sideMenu.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  }

  // 메뉴 내 링크 클릭
  menuContent.addEventListener('click', (e) => {
    const link = e.target.closest('[data-section]');
    if (!link) return;
    e.preventDefault();
    showSection(link.getAttribute('data-section'));
  });

  // 해시 진입 처리
  const hash = decodeURIComponent(location.hash.replace('#',''));
  if (hash) showSection(hash);
});
