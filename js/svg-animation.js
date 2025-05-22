const animatedPath = document.querySelector('.animated-path');
const originalPath = animatedPath.getAttribute('d');

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  const newPath = `M20,${50 + mouseY * 20} Q${50 + mouseX * 20},${20 + mouseY * 10} ${80 - mouseX * 10},${50 + mouseY * 10} Q${50 - mouseX * 20},${80 - mouseY * 10} ${20 + mouseX * 10},${50 - mouseY * 10}`;
  animatedPath.setAttribute('d', newPath);
});

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollPercentage = scrollPosition / maxScroll;
  const hue = Math.floor(scrollPercentage * 360);
  const strokeWidth = 2 + scrollPercentage * 3;
  animatedPath.style.stroke = `hsl(${hue}, 80%, 60%)`;
  animatedPath.style.strokeWidth = `${strokeWidth}px`;
});

document.addEventListener('mouseleave', () => {
  animatedPath.setAttribute('d', originalPath);
});
