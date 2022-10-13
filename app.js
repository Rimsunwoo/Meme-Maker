const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const button = document.querySelector("#paintBtn");
const lineWidth = document.querySelector("#lineWidth");
const colorInput = document.querySelector("#color-input");
const modeBtn = document.querySelector("#mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const clearBtn = document.querySelector("#clear-btn");
const eraserBtn = document.querySelector("#eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save-btn");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
  ctx.moveTo(event.offsetX, event.offsetY);
  return;
}

function onMouseDown() {
  isPainting = true;
}
function onMouseUp() {
  isPainting = false;
  ctx.beginPath();
}

function changeLineWidth(event) {
  const lineValue = event.target.value;
  ctx.lineWidth = lineValue;
}

function colorChange(value) {
  ctx.strokeStyle = value;
  ctx.fillStyle = value;
}

function onColorChange(event) {
  colorChange(event.target.value);
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  colorChange(colorValue);
  colorInput.value = colorValue;
}

function modeChange() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillStyle = colorInput.value;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function onClear() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onErase() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function fileUpload(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image(); // document.createElement("img")
  image.src = url;

  //eventListener의 다른방식
  // == image.addEventListener("load", function)
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}
function ondbClick(event) {
  const text = textInput.value;
  ctx.save();
  ctx.font = "60px solid";
  ctx.lineWidth = 2;
  ctx.strokeText(text, event.offsetX, event.offsetY);
  ctx.restore();
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png"; //a의 attribute 저장 이름 설정
  a.click();
}

canvas.addEventListener("dblclick", ondbClick);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mouseleave", onMouseUp);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", changeLineWidth);
colorInput.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", modeChange);
clearBtn.addEventListener("click", onClear);
eraserBtn.addEventListener("click", onErase);
fileInput.addEventListener("change", fileUpload);
saveBtn.addEventListener("click", onSaveClick);
