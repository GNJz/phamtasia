<script>
document.addEventListener('DOMContentLoaded', () => {
  const sideMenu    = document.getElementById('sideMenu');
  const menuBtn     = document.getElementById('menuBtn');
  const menuContent = document.getElementById('menuContent');
  const logoCenter  = document.querySelector('.logo-center');

  function setMenuWidthVar() {
    // 메뉴가 열려 있어야 정확한 폭이 나와요. 열려 있지 않다면, style.width 또는 기본값을 사용.
    const opened = sideMenu.classList.contains('active');
    let w = opened ? sideMenu.offsetWidth : parseInt(getComputedStyle(sideMenu).width, 10) || 250;
    document.documentElement.style.setProperty('--menu-width', w + 'px');
  }

  function updateMenuState(){
    // body.menu-open 클래스로 로고 위치를 제어
    const isOpen = sideMenu.classList.contains('active');
    document.body.classList.toggle('menu-open', isOpen);
    setMenuWidthVar();
  }

  // 햄버거 버튼 토글
  menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', String(sideMenu.classList.contains('active')));
    updateMenuState();
  });

  // 창 크기 변경시 재계산
  window.addEventListener('resize', () => {
    if (sideMenu.classList.contains('active')) setMenuWidthVar();
  });

  // 서브메뉴 토글
  document.querySelectorAll('.submenu-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sub = btn.nextElementSibling;
      if (sub && sub.classList.contains('submenu')) {
        sub.classList.toggle('show');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
      }
    });
  });

  // 섹션 전환 (홈=로고 보임 / 나머지=로고 숨김)
  function showSection(id) {
    const sections = document.querySelectorAll('section');
    if (id === 'home' || !id) {
      logoCenter.style.display = 'block';
      sections.forEach(sec => sec.classList.remove('active'));
    } else {
      logoCenter.style.display = 'none';
      sections.forEach(sec => sec.classList.remove('active'));
      const el = document.getElementById(id);
      if (el) el.classList.add('active');
    }
    // 메뉴 닫기
    sideMenu.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    updateMenuState();function updateMenuState(){
      const w = sideMenu.getBoundingClientRect().width || 250;
      document.documentElement.style.setProperty('--menu-width', w + 'px');
      document.body.classList.toggle('menu-open', sideMenu.classList.contains('active'));
    }
  }

  // 메뉴 클릭(위임)
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
</script>
