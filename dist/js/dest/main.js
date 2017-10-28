'use strict';

var halfScreenWidth = document.documentElement.clientWidth / 2;
halfScreenWidth = Math.floor(halfScreenWidth);

var halfScreenHeight = document.documentElement.clientHeight / 2;
halfScreenHeight = Math.floor(halfScreenHeight);

var triangles = document.querySelectorAll('.triangle');

var parallaxDot = document.querySelector('.parallax');
parallaxDot.style.top = halfScreenHeight + 'px';
parallaxDot.style.left = halfScreenWidth + 'px';

document.onmousemove = function (e) {
  var mouseX = e.clientX,
      mouseY = e.clientY;

  for (var i = 0; i < 9; i++) {
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
};