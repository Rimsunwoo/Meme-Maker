const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = 3;
const colors = [
  "#2192FF",
  "#38E54D",
  "#9CFF2E",
  "#FDFF00",
  "#FF577F",
  "#FF884B",
  "#FFD384",
  "#FFF9B0",
];

let painting = false;

function paintingStart(event) {
  painting = true;
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onMove(event) {
  if (painting) {
    ctx.beginPath();
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
}
function paintingEnd() {
  painting = false;
}

canvas.addEventListener("mousedown", paintingStart);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mouseup", paintingEnd);
