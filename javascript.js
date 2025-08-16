document.addEventListener('DOMContentLoaded', () => {
  const body        = document.body;
  const sideMenu    = document.getElementById('sideMenu');
  const menuBtn     = document.getElementById('menuBtn');
  const menuContent = document.getElementById('menuContent');
  const logoCenter  = document.querySelector('.logo-center');

  // 메뉴 폭을 CSS 변수로 반영 (메뉴 열릴 때/리사이즈 때)
  function setMenuWidthVar() {
    const w = sideMenu.offsetWidth || 300;
    document.documentElement.style.setProperty('--menu-width', w + 'px');
  }

  function updateMenuState() {
    const open = sideMenu.classList.contains('active');
    body.classList.toggle('menu-open', open);
    setMenuWidthVar();
  }

  // 햄버거 토글
  menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', String(sideMenu.classList.contains('active')));
    updateMenuState();
  });

  // 리사이즈 시 반영
  window.addEventListener('resize', () => {
    if (sideMenu.classList.contains('active')) setMenuWidthVar();
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

  // 섹션 전환(필요 시)
  function showSection(id) {
    document.querySelectorAll('.content').forEach(sec => sec.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) el.classList.add('active');

    // home이면 로고 표시, 아니면 숨김(원래 동작 유지)
    if (id === 'home' || !id) {
      logoCenter.style.display = 'block';
    } else {
      logoCenter.style.display = 'none';
    }

    // 메뉴 닫기
    sideMenu.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    updateMenuState();
  }

  // 메뉴 클릭으로 섹션 이동
  menuContent.addEventListener('click', (e) => {
    const link = e.target.closest('[data-section]');
    if (!link) return;
    e.preventDefault();
    showSection(link.getAttribute('data-section'));
  });

  // 초기 상태
  setMenuWidthVar();
  const hash = decodeURIComponent(location.hash.replace('#',''));
  showSection(hash || 'home');
});
