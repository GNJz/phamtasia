document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const sideMenu = document.getElementById('sideMenu');
  const menuBtn = document.getElementById('menuBtn');
  const menuContent = document.getElementById('menuContent');

  // 메뉴 상태 업데이트
  function updateMenuState() {
    body.classList.toggle('menu-open', sideMenu.classList.contains('active'));
  }

  // 햄버거 버튼 토글
  menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    updateMenuState();
  });

  // 서브메뉴 토글
  document.querySelectorAll('.submenu-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      if (sub && sub.classList.contains('submenu')) {
        sub.classList.toggle('show');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
      }
    });
  });

  // 섹션 전환
  menuContent.addEventListener('click', e => {
    const link = e.target.closest('[data-section]');
    if (!link) return;
    e.preventDefault();

    const id = link.getAttribute('data-section');
    document.querySelectorAll('.content').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) el.classList.add('active');

    sideMenu.classList.remove('active');
    updateMenuState();
  });
});
