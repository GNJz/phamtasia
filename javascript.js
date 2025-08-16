document.addEventListener('DOMContentLoaded', () => {
  const body        = document.body;
  const sideMenu    = document.getElementById('sideMenu');
  const menuBtn     = document.getElementById('menuBtn');
  const menuContent = document.getElementById('menuContent');
  const logoCenter  = document.querySelector('.logo-center');

  // 메뉴 상태 업데이트
  function updateMenuState() {
    const w = sideMenu.getBoundingClientRect().width || 250;
    document.documentElement.style.setProperty('--menu-width', w + 'px');
    body.classList.toggle('menu-open', sideMenu.classList.contains('active'));
  }

  // 햄버거 버튼
  menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', String(sideMenu.classList.contains('active')));
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
  function showSection(id) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) el.classList.add('active');

    if (id === 'home' || !id) {
      logoCenter.style.display = 'block';
    } else {
      logoCenter.style.display = 'none';
    }

    sideMenu.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    updateMenuState();
  }

  // 메뉴 클릭 이벤트
  menuContent.addEventListener('click', e => {
    const link = e.target.closest('[data-section]');
    if (!link) return;
    e.preventDefault();
    showSection(link.getAttribute('data-section'));
  });

  // 초기 로딩
  updateMenuState();
  const hash = decodeURIComponent(location.hash.replace('#', ''));
  if (hash && document.getElementById(hash)) {
    showSection(hash);
  } else {
    showSection('home');
  }
});
