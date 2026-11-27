// Router and controls for "Indonesia dalam Angka".
// Hash routes only, no network: every page is rendered from data.js and every
// control updates the page in place.

import {
  AGE_GROUPS, GDP_SERIES, INFLATION_SERIES, POVERTY_SERIES, PROVINCES,
  POPULATION_SERIES, SECTORS, UNEMPLOYMENT_SERIES,
} from './data.js';
import { barChart, donutChart, hbarChart, lineChart } from './charts.js';
import {
  economyView, homeView, labourView, populationView, provincesView, yearDetail,
} from './views.js';

const view = document.getElementById('view');
const fmt1 = (v) => v.toLocaleString('id-ID', { maximumFractionDigits: 2 });
const fmtPct = (v) => `${v.toLocaleString('id-ID', { maximumFractionDigits: 2 })}%`;

const ROUTES = {
  '': homeView,
  penduduk: populationView,
  ekonomi: economyView,
  provinsi: provincesView,
  sosial: labourView,
};

function drawCommon() {
  const pop = document.getElementById('chart-population');
  if (pop) barChart(pop, POPULATION_SERIES.map((p) => ({ label: p.year, value: p.value })), fmt1);
  const growth = document.getElementById('chart-growth');
  if (growth) lineChart(growth, GDP_SERIES.map((p) => ({ label: p.year, value: p.growth })), fmtPct);
  const sectors = document.getElementById('chart-sectors');
  if (sectors) {
    const colors = donutChart(sectors, SECTORS.map((s) => ({ value: s.share })));
    document.querySelectorAll('.swatch').forEach((el) => {
      el.style.background = colors[Number(el.dataset.i) % colors.length];
    });
  }
  const top = document.getElementById('chart-top-provinces');
  if (top) {
    hbarChart(top, [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 5)
      .map((p) => ({ label: p.name, value: p.population })), (v) => `${fmt1(v)} jt`);
  }
}

function drawPopulation() {
  const age = document.getElementById('chart-age');
  if (age) hbarChart(age, AGE_GROUPS.map((a) => ({ label: a.group, value: a.share })), fmtPct);
}

function drawEconomy() {
  const gdp = document.getElementById('chart-gdp');
  if (gdp) barChart(gdp, GDP_SERIES.map((p) => ({ label: p.year, value: p.nominal })), (v) => `Rp${fmt1(v)} T`);
  const inf = document.getElementById('chart-inflation');
  if (inf) lineChart(inf, INFLATION_SERIES.map((p) => ({ label: p.year, value: p.value })), fmtPct);
  const detail = document.getElementById('year-detail');
  if (detail) detail.innerHTML = yearDetail(2024);
  document.querySelectorAll('.year-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.year-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('year-detail').innerHTML = yearDetail(Number(btn.dataset.year));
    });
  });
}

let provinceSort = 'population';

function renderProvinceTable(filter) {
  const body = document.querySelector('#province-table tbody');
  const count = document.getElementById('province-count');
  if (!body) return;
  const q = (filter || '').trim().toLowerCase();
  let rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q));
  rows = [...rows].sort((a, b) => {
    if (provinceSort === 'name') return a.name.localeCompare(b.name, 'id');
    if (provinceSort === 'density') return b.density - a.density;
    return b.population - a.population;
  });
  body.innerHTML = rows.map((p) => `<tr data-name="${p.name}" tabindex="0">
      <td>${p.name}</td><td>${fmt1(p.population)}</td>
      <td>${fmtPct((p.population / 281.6) * 100)}</td><td>${p.density.toLocaleString('id-ID')}</td>
    </tr>`).join('') || '<tr><td colspan="4">Tidak ada provinsi yang cocok dengan pencarian.</td></tr>';
  count.textContent = `Menampilkan ${rows.length} dari 20 provinsi pada tabel ini.`;
  body.querySelectorAll('tr[data-name]').forEach((tr) => {
    const show = () => showProvinceDetail(tr.dataset.name);
    tr.addEventListener('click', show);
    tr.addEventListener('keydown', (e) => { if (e.key === 'Enter') show(); });
  });
}

function showProvinceDetail(name) {
  const p = PROVINCES.find((x) => x.name === name);
  const box = document.getElementById('province-detail');
  if (!p || !box) return;
  const share = ((p.population / 281.6) * 100).toLocaleString('id-ID', { maximumFractionDigits: 1 });
  box.innerHTML = `<h2>${p.name}</h2>
    <dl class="facts">
      <div><dt>Penduduk 2024</dt><dd>${fmt1(p.population)} juta jiwa</dd></div>
      <div><dt>Share nasional</dt><dd>${share}% dari 281,6 juta</dd></div>
      <div><dt>Kepadatan</dt><dd>${p.density.toLocaleString('id-ID')} jiwa/km²</dd></div>
      <div><dt>Peringkat penduduk</dt><dd>#${[...PROVINCES].sort((a, b) => b.population - a.population).findIndex((x) => x.name === name) + 1} dari 20 provinsi di tabel</dd></div>
    </dl>
    <p class="source">Sumber: BPS, Proyeksi penduduk provinsi 2024. Tabel ini memuat 20 provinsi
    terpadat; 18 provinsi lainnya tersedia pada publikasi BPS.</p>`;
}

function drawProvinces() {
  renderProvinceTable('');
  document.getElementById('province-search').addEventListener('input', (e) => {
    renderProvinceTable(e.target.value);
  });
  document.querySelectorAll('.sort-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sort-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      provinceSort = btn.dataset.sort;
      renderProvinceTable(document.getElementById('province-search').value);
    });
  });
}

function drawLabour() {
  const u = document.getElementById('chart-unemployment');
  if (u) lineChart(u, UNEMPLOYMENT_SERIES.map((p) => ({ label: p.year, value: p.value })), fmtPct);
  const pv = document.getElementById('chart-poverty');
  if (pv) lineChart(pv, POVERTY_SERIES.map((p) => ({ label: p.year, value: p.value })), fmtPct);
}

function render() {
  const route = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  const fn = ROUTES[route] || homeView;
  view.innerHTML = fn();
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === `#/${route}`);
  });
  drawCommon();
  if (route === 'penduduk') drawPopulation();
  if (route === 'ekonomi') drawEconomy();
  if (route === 'provinsi') drawProvinces();
  if (route === 'sosial') drawLabour();
  window.scrollTo(0, 0);
}

function copySummary() {
  const text = 'Indonesia dalam Angka (BPS 2024): penduduk 281,6 juta; PDB Rp22.139 triliun '
    + '(tumbuh 5,03%); PDB per kapita US$4.960; inflasi 1,57%; pengangguran 4,91%; '
    + 'kemiskinan 8,57%.';
  const done = (btn) => {
    btn.textContent = 'Tersalin ✓';
    setTimeout(() => { btn.textContent = 'Salin ringkasan'; }, 2000);
  };
  const btn = document.getElementById('copy-summary');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => done(btn)).catch(() => done(btn));
  } else {
    done(btn);
  }
}

function downloadCsv() {
  const lines = ['tahun,penduduk_juta,pdb_triliun_rp,pertumbuhan_persen,inflasi_persen'];
  GDP_SERIES.forEach((g) => {
    const pop = POPULATION_SERIES.find((p) => p.year === g.year);
    const inf = INFLATION_SERIES.find((p) => p.year === g.year);
    lines.push(`${g.year},${pop.value},${g.nominal},${g.growth},${inf.value}`);
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'indonesia-2020-2024.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

document.getElementById('copy-summary').addEventListener('click', copySummary);
document.getElementById('download-csv').addEventListener('click', downloadCsv);
window.addEventListener('hashchange', render);
render();
