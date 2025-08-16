document.addEventListener('DOMContentLoaded', () => {
  const sideMenu    = document.getElementById('sideMenu');
  const menuBtn     = document.getElementById('menuBtn');
  const menuContent = document.getElementById('menuContent');
  const logoCenter  = document.querySelector('.logo-center');

  // 메뉴 상태 업데이트
  function updateMenuState() {
    const isOpen = sideMenu.classList.contains('active');
    document.body.classList.toggle('menu-open', isOpen);
  }

  // 햄버거 버튼 토글 (메뉴 열고 닫기)
  menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    menuBtn.setAttribute(
      'aria-expanded',
      String(sideMenu.classList.contains('active'))
    );
    updateMenuState();
  });

  // 서브메뉴 토글
  document.querySelectorAll('.submenu-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
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
    document.querySelectorAll('section').forEach(sec =>
      sec.classList.remove('active')
    );
    const el = document.getElementById(id);
    if (el) el.classList.add('active');

    // 로고 보이기/숨기기
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

  // 메뉴 클릭 이벤트 (내비게이션)
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
