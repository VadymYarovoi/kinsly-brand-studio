let halfScreenWidth = document.documentElement.clientWidth / 2;
halfScreenWidth = Math.floor(halfScreenWidth);

let halfScreenHeight = document.documentElement.clientHeight / 2;
halfScreenHeight = Math.floor(halfScreenHeight);

let triangles = document.querySelectorAll('.triangle');

let parallaxDot = document.querySelector('.parallax');
parallaxDot.style.top = `${halfScreenHeight}px`;
parallaxDot.style.left = `${halfScreenWidth}px`;

document.onmousemove = e => {
  let mouseX = e.clientX,
      mouseY = e.clientY;

  for(let i = 0; i < 9; i++) {
    if (mouseX > halfScreenWidth && mouseY > halfScreenHeight) {
      triangles[i].style.transform = 'translate(-15px, -15px)';
    }
    if (mouseX > halfScreenWidth && mouseY < halfScreenHeight) {
      triangles[i].style.transform = 'translate(-15px, 15px)';
    }
    if (mouseX < halfScreenWidth && mouseY > halfScreenHeight) {
      triangles[i].style.transform = 'translate(15px, -15px)';
    }
    if (mouseX < halfScreenWidth && mouseY < halfScreenHeight) {
      triangles[i].style.transform = 'translate(15px, 15px)';
    }
  }
}