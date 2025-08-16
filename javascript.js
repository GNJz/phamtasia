// 메뉴/서브메뉴 토글 + 로고 위치 제어
document.addEventListener('DOMContentLoaded', () => {
  const body        = document.body;
  const sideMenu    = document.getElementById('sideMenu');
  const menuBtn     = document.getElementById('menuBtn');
  const menuContent = document.getElementById('menuContent');

  // 메뉴 폭을 CSS 변수에 반영
  const setMenuWidthVar = () => {
    // 열린 상태면 offsetWidth, 아니면 계산된 width 사용
    const opened = sideMenu.classList.contains('active');
    const w = opened
      ? sideMenu.offsetWidth
      : parseInt(getComputedStyle(sideMenu).width, 10) || 300;
    document.documentElement.style.setProperty('--menu-width', w + 'px');
  };

  // 메뉴 상태 반영(body.menu-open 토글)
  const updateMenuState = () => {
    const isOpen = sideMenu.classList.contains('active');
    body.classList.toggle('menu-open', isOpen);
    setMenuWidthVar();
  };

  // 햄버거 버튼
  menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', String(sideMenu.classList.contains('active')));
    updateMenuState();
  });

  // 창 리사이즈 시 변수 재계산(열려 있을 때만)
  window.addEventListener('resize', () => {
    if (sideMenu.classList.contains('active')) setMenuWidthVar();
  });

  // 서브메뉴 토글
  menuContent.addEventListener('click', (e) => {
    const btn = e.target.closest('.submenu-toggle');
    if (btn) {
      e.preventDefault();
      const sub = btn.nextElementSibling;
      if (sub && sub.classList.contains('submenu')) {
        sub.classList.toggle('show');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
      }
      return;
    }
  });

  // 초기 상태
  setMenuWidthVar();
});
