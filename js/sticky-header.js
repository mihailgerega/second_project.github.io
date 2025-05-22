const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
let heroHeight;

function updateHeroHeight() {
  heroHeight = hero.offsetHeight;
}

updateHeroHeight();
window.addEventListener('resize', updateHeroHeight);
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition > heroHeight) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
});
