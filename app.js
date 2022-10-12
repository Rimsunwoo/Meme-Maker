const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const button = document.querySelector("#paintBtn");
const lineWidth = document.querySelector("#lineWidth");
const lineColor = document.querySelector("#color-input");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);

let isPainting = false;

canvas.width = 800;
canvas.height = 800;

function onMove(event) {
  if (isPainting) {
    if (button.classList.contains("pen")) {
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
    } else if (button.classList.contains("fill")) {
      ctx.fill();
      ctx.stroke;
    }

    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown() {
  isPainting = true;
}
function onMouseUp() {
  isPainting = false;
}

function changeBtn() {
  if (button.classList.contains("pen")) {
    button.classList.remove("pen");
    button.classList.add("fill");
    button.innerText = "fill";
  } else {
    button.classList.remove("fill");
    button.classList.add("pen");
    button.innerText = "pen";
  }
}

function changeLineWidth(event) {
  const lineValue = event.target.value;
  ctx.lineWidth = lineValue;
}

function onColorChange(event) {
  const pickedColor = event.target.value;
  ctx.strokeStyle = pickedColor;
}

function onColorClick(event) {
  const colorInfo = event.target.dataset.color;
  ctx.strokeStyle = colorInfo;
}

console.log(colorOptions);

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mouseleave", onMouseUp);
button.addEventListener("click", changeBtn);
lineWidth.addEventListener("change", changeLineWidth);
lineColor.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
