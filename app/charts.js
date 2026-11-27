// Canvas chart helpers for "Indonesia dalam Angka".
// No library: every chart is drawn with the canvas 2D API so the first load
// stays tiny. Each helper takes a canvas element, a series and labels, and
// draws axes, values and a title-free plot (titles live in HTML).

const INK = '#17324f';
const MUTED = '#5d7288';
const GRID = '#e3e9ef';
const TEAL = '#0e7c6b';
const TEAL_LIGHT = '#7fc9bb';
const AMBER = '#d98a1f';
const BLUE = '#2f6fb2';
const RED = '#b3402e';

function setup(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.font = '12px system-ui, sans-serif';
  return { ctx, width, height };
}

function axes(ctx, x0, y0, x1, y1) {
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0, y1);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

// Vertical bars with a value label above each bar.
export function barChart(canvas, points, format) {
  const { ctx, width, height } = setup(canvas, 210);
  const padL = 44, padR = 10, padT = 22, padB = 26;
  const max = Math.max(...points.map((p) => p.value)) * 1.08;
  const min = Math.min(0, ...points.map((p) => p.value));
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const zeroY = padT + ((max - 0) / (max - min)) * plotH;
  axes(ctx, padL, padT, width - padR, padT + plotH);
  const slot = plotW / points.length;
  const barW = Math.min(46, slot * 0.58);
  points.forEach((p, i) => {
    const x = padL + slot * i + (slot - barW) / 2;
    const h = (Math.abs(p.value) / (max - min)) * plotH;
    const y = p.value >= 0 ? zeroY - h : zeroY;
    ctx.fillStyle = p.value >= 0 ? TEAL : RED;
    ctx.fillRect(x, y, barW, Math.max(h, 2));
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.fillText(format(p.value), x + barW / 2, y - 6);
    ctx.fillStyle = MUTED;
    ctx.fillText(String(p.label), x + barW / 2, padT + plotH + 16);
  });
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'left';
  ctx.fillText(format(max / 1.08), 4, padT + 10);
}

// Line chart with dots and value labels.
export function lineChart(canvas, points, format) {
  const { ctx, width, height } = setup(canvas, 210);
  const padL = 44, padR = 16, padT = 22, padB = 26;
  const max = Math.max(...points.map((p) => p.value)) * 1.15;
  const min = Math.min(0, ...points.map((p) => p.value)) * 1.15;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  axes(ctx, padL, padT, width - padR, padT + plotH);
  const x = (i) => padL + (plotW * i) / (points.length - 1);
  const y = (v) => padT + ((max - v) / (max - min)) * plotH;
  ctx.strokeStyle = GRID;
  [0.25, 0.5, 0.75].forEach((f) => {
    ctx.beginPath();
    ctx.moveTo(padL, padT + plotH * f);
    ctx.lineTo(width - padR, padT + plotH * f);
    ctx.stroke();
  });
  ctx.strokeStyle = BLUE;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  points.forEach((p, i) => (i === 0 ? ctx.moveTo(x(i), y(p.value)) : ctx.lineTo(x(i), y(p.value))));
  ctx.stroke();
  points.forEach((p, i) => {
    ctx.fillStyle = BLUE;
    ctx.beginPath();
    ctx.arc(x(i), y(p.value), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.fillText(format(p.value), x(i), y(p.value) - 10);
    ctx.fillStyle = MUTED;
    ctx.fillText(String(p.label), x(i), padT + plotH + 16);
  });
}

// Donut with a legend drawn beside it in HTML; the canvas only draws slices.
export function donutChart(canvas, slices) {
  const { ctx, width, height } = setup(canvas, 190);
  const cx = 95, cy = height / 2, r = 72, inner = 46;
  const total = slices.reduce((s, p) => s + p.value, 0);
  const colors = [TEAL, BLUE, AMBER, '#7a5fb0', '#c25e7a', MUTED];
  let a = -Math.PI / 2;
  slices.forEach((s, i) => {
    const span = (s.value / total) * Math.PI * 2;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a, a + span);
    ctx.closePath();
    ctx.fill();
    a += span;
  });
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.textAlign = 'center';
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.fillText('100%', cx, cy - 2);
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.fillText('share PDB', cx, cy + 14);
  return colors;
}

// Horizontal bars, best for ranked lists such as provinces.
export function hbarChart(canvas, rows, format) {
  const rowH = 30;
  const { ctx, width, height } = setup(canvas, rows.length * rowH + 8);
  const max = Math.max(...rows.map((r) => r.value));
  const labelW = 150;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    ctx.fillStyle = INK;
    ctx.textAlign = 'left';
    ctx.fillText(r.label, 0, y + 13);
    const barX = labelW;
    const barW = ((width - labelW - 64) * r.value) / max;
    ctx.fillStyle = i % 2 === 0 ? TEAL : TEAL_LIGHT;
    ctx.fillRect(barX, y + 2, Math.max(barW, 2), 16);
    ctx.fillStyle = INK;
    ctx.fillText(format(r.value), barX + barW + 6, y + 14);
  });
}
