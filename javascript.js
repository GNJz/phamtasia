document.addEventListener('DOMContentLoaded', () => {
  const sideMenu = document.getElementById('sideMenu');
  const menuBtn = document.getElementById('menuBtn');

  // 햄버거 버튼 클릭 → 메뉴 열기/닫기
  menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', sideMenu.classList.contains('active'));
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
});
