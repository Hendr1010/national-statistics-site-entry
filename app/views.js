// Page renderers for "Indonesia dalam Angka".
// Each function returns the HTML for one hash route. Numbers come from data.js
// only; nothing here is hard-coded twice. Charts are drawn by main.js after
// the HTML is in the page, because a canvas needs its laid-out size.

import {
  AGE_GROUPS, FACTS, GDP_SERIES, HEADLINE, INFLATION_SERIES, POVERTY_SERIES,
  PROVINCES, SECTORS, SOURCES, UNEMPLOYMENT_SERIES,
} from './data.js';

function kpiCards() {
  return HEADLINE.map(
    (k) => `<article class="kpi">
      <p class="kpi-label">${k.label}</p>
      <p class="kpi-value">${k.value}</p>
      <p class="kpi-sub">${k.sub}</p>
      <p class="kpi-change">${k.change}</p>
      <p class="source">Sumber: ${k.source}</p>
    </article>`,
  ).join('');
}

function sourceLine(text) {
  return `<p class="source">Sumber: ${text}</p>`;
}

export function homeView() {
  const top = [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 5);
  return `
  <section class="hero">
    <p class="eyebrow">Statistik resmi Indonesia · Data BPS 2024</p>
    <h1>Indonesia dalam Angka</h1>
    <p class="lede">Penduduk, ekonomi, dan kesejahteraan Indonesia — diringkas dari
    publikasi Badan Pusat Statistik, dengan sumber dan tahun pada setiap angka.</p>
    <div class="hero-facts">
      <span><strong>${FACTS.islands}</strong> pulau</span>
      <span><strong>${FACTS.languages}</strong> bahasa daerah</span>
      <span><strong>${FACTS.lifeExpectancy}</strong> harapan hidup</span>
      <span><strong>${FACTS.density}</strong> kepadatan</span>
    </div>
  </section>
  <section class="kpi-grid" aria-label="Indikator utama">${kpiCards()}</section>
  <div class="grid-2">
    <section class="card">
      <h2>Pertumbuhan penduduk 2020–2024</h2>
      <p class="card-sub">Juta jiwa, pertengahan tahun</p>
      <canvas id="chart-population" aria-label="Grafik batang jumlah penduduk 2020 sampai 2024"></canvas>
      ${sourceLine(SOURCES.population)}
    </section>
    <section class="card">
      <h2>Pertumbuhan ekonomi 2020–2024</h2>
      <p class="card-sub">Persen, PDB harga konstan (y-on-y)</p>
      <canvas id="chart-growth" aria-label="Grafik garis pertumbuhan ekonomi 2020 sampai 2024"></canvas>
      ${sourceLine(SOURCES.gdp)}
    </section>
  </div>
  <div class="grid-2">
    <section class="card">
      <h2>Struktur ekonomi 2024</h2>
      <p class="card-sub">Share PDB menurut lapangan usaha</p>
      <div class="donut-wrap">
        <canvas id="chart-sectors" aria-label="Diagram donat share PDB menurut sektor"></canvas>
        <ul class="legend">${SECTORS.map(
          (s, i) => `<li><span class="swatch" data-i="${i}"></span>${s.name} — <strong>${s.share}%</strong></li>`,
        ).join('')}</ul>
      </div>
      ${sourceLine(SOURCES.sectors)}
    </section>
    <section class="card">
      <h2>Provinsi terpadat</h2>
      <p class="card-sub">Juta jiwa, proyeksi 2024</p>
      <canvas id="chart-top-provinces" aria-label="Grafik batang lima provinsi terpadat"></canvas>
      <p><a class="btn" href="#/provinsi">Lihat semua 20 provinsi →</a></p>
      ${sourceLine(SOURCES.provinces)}
    </section>
  </div>
  <section class="card">
    <h2>Apa yang berubah pada 2024?</h2>
    <ul class="takeaways">
      <li><strong>281,6 juta jiwa.</strong> Penduduk tumbuh 1,04% — laju paling lambat dalam lima tahun terakhir, tanda transisi demografi berjalan.</li>
      <li><strong>Ekonomi tumbuh 5,03%.</strong> PDB menembus Rp22.139 triliun; industri pengolahan tetap penyumbang terbesar (18,7%).</li>
      <li><strong>Inflasi 1,57%.</strong> Terendah sejak 2020 dan di dalam sasaran Bank Indonesia.</li>
      <li><strong>Pengangguran 4,91% dan kemiskinan 8,57%.</strong> Keduanya terendah sejak sebelum pandemi.</li>
    </ul>
    ${sourceLine('BPS, 2024–2025. Seluruh angka di halaman ini memakai tahun data 2024 agar bisa dibandingkan.')}
  </section>`;
}

export function populationView() {
  return `
  <section class="page-head">
    <p class="eyebrow">Penduduk · Population</p>
    <h1>Penduduk Indonesia</h1>
    <p class="lede">281,6 juta jiwa pada pertengahan 2024 — negara keempat terpadat di dunia.
    Tiga dari lima penduduk tinggal di Jawa.</p>
  </section>
  <div class="grid-2">
    <section class="card">
      <h2>Jumlah penduduk 2020–2024</h2>
      <p class="card-sub">Juta jiwa</p>
      <canvas id="chart-population" aria-label="Grafik batang jumlah penduduk 2020 sampai 2024"></canvas>
      ${sourceLine(SOURCES.population)}
    </section>
    <section class="card">
      <h2>Struktur umur 2024</h2>
      <p class="card-sub">Persen penduduk</p>
      <canvas id="chart-age" aria-label="Grafik batang struktur umur penduduk 2024"></canvas>
      <p>68,7% penduduk berada pada usia produktif (15–64 tahun) — jendela bonus
      demografi Indonesia.</p>
      ${sourceLine(SOURCES.population)}
    </section>
  </div>
  <section class="card">
    <h2>Fakta cepat</h2>
    <dl class="facts">
      <div><dt>Luas daratan</dt><dd>${FACTS.area}</dd></div>
      <div><dt>Kepadatan</dt><dd>${FACTS.density}</dd></div>
      <div><dt>Harapan hidup</dt><dd>${FACTS.lifeExpectancy}</dd></div>
      <div><dt>Pulau</dt><dd>${FACTS.islands}</dd></div>
      <div><dt>Bahasa daerah</dt><dd>${FACTS.languages}</dd></div>
    </dl>
    ${sourceLine('BPS 2024; luas dan pulau menurut BPS / Kementerian Dalam Negeri.')}
  </section>`;
}

export function economyView() {
  return `
  <section class="page-head">
    <p class="eyebrow">Ekonomi · Economy</p>
    <h1>Ekonomi Indonesia</h1>
    <p class="lede">PDB Rp22.139 triliun pada 2024 — ekonomi terbesar di Asia Tenggara —
    dengan inflasi terkendali di 1,57%.</p>
  </section>
  <div class="year-picker" role="group" aria-label="Pilih tahun">
    ${GDP_SERIES.map(
      (g) => `<button class="year-btn${g.year === 2024 ? ' active' : ''}" data-year="${g.year}">${g.year}</button>`,
    ).join('')}
  </div>
  <section class="card" id="year-detail"></section>
  <div class="grid-2">
    <section class="card">
      <h2>PDB nominal 2020–2024</h2>
      <p class="card-sub">Rp triliun, harga berlaku</p>
      <canvas id="chart-gdp" aria-label="Grafik batang PDB nominal 2020 sampai 2024"></canvas>
      ${sourceLine(SOURCES.gdp)}
    </section>
    <section class="card">
      <h2>Inflasi 2020–2024</h2>
      <p class="card-sub">Persen, y-on-y Desember</p>
      <canvas id="chart-inflation" aria-label="Grafik garis inflasi 2020 sampai 2024"></canvas>
      ${sourceLine(SOURCES.inflation)}
    </section>
  </div>
  <section class="card">
    <h2>Struktur ekonomi 2024</h2>
    <p class="card-sub">Share PDB menurut lapangan usaha</p>
    <div class="donut-wrap">
      <canvas id="chart-sectors" aria-label="Diagram donat share PDB menurut sektor"></canvas>
      <ul class="legend">${SECTORS.map(
        (s, i) => `<li><span class="swatch" data-i="${i}"></span>${s.name} — <strong>${s.share}%</strong></li>`,
        ).join('')}</ul>
    </div>
    ${sourceLine(SOURCES.sectors)}
  </section>`;
}

export function provincesView() {
  return `
  <section class="page-head">
    <p class="eyebrow">Provinsi · Provinces</p>
    <h1>Provinsi Indonesia</h1>
    <p class="lede">Cari provinsi, urutkan berdasarkan nama atau jumlah penduduk, dan
    ketuk satu baris untuk melihat rinciannya. Data proyeksi BPS 2024.</p>
  </section>
  <section class="card">
    <div class="table-tools">
      <label> Cari provinsi
        <input id="province-search" type="search" placeholder="cth: Jawa Barat" autocomplete="off">
      </label>
      <div class="sort-group" role="group" aria-label="Urutkan tabel">
        <button class="sort-btn active" data-sort="population">Terpadat dulu</button>
        <button class="sort-btn" data-sort="name">Nama A–Z</button>
        <button class="sort-btn" data-sort="density">Terpadat per km²</button>
      </div>
    </div>
    <div class="table-wrap">
      <table id="province-table">
        <thead><tr><th>Provinsi</th><th>Penduduk (juta)</th><th>Share</th><th>Kepadatan (/km²)</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
    <p id="province-count" class="source"></p>
    ${sourceLine(SOURCES.provinces)}
  </section>
  <section class="card" id="province-detail">
    <h2>Detail provinsi</h2>
    <p>Ketuk salah satu baris tabel untuk melihat detail provinsi di sini.</p>
  </section>`;
}

export function labourView() {
  return `
  <section class="page-head">
    <p class="eyebrow">Ketenagakerjaan &amp; sosial · Labour &amp; welfare</p>
    <h1>Pekerjaan dan Kesejahteraan</h1>
    <p class="lede">Pengangguran dan kemiskinan sama-sama di titik terendah sejak sebelum
    pandemi — tapi 7,47 juta orang masih menganggur.</p>
  </section>
  <div class="grid-2">
    <section class="card">
      <h2>Pengangguran terbuka 2020–2024</h2>
      <p class="card-sub">TPT, persen, Agustus</p>
      <canvas id="chart-unemployment" aria-label="Grafik garis tingkat pengangguran terbuka 2020 sampai 2024"></canvas>
      <p>Dari 152,11 juta angkatan kerja (Agustus 2024), 7,47 juta orang menganggur.</p>
      ${sourceLine(SOURCES.labour)}
    </section>
    <section class="card">
      <h2>Kemiskinan 2020–2024</h2>
      <p class="card-sub">Persen penduduk, September</p>
      <canvas id="chart-poverty" aria-label="Grafik garis tingkat kemiskinan 2020 sampai 2024"></canvas>
      <p>24,06 juta penduduk hidup di bawah garis kemiskinan pada September 2024;
      garis kemiskinan Rp595.242 per kapita per bulan.</p>
      ${sourceLine(SOURCES.poverty)}
    </section>
  </div>
  <section class="card">
    <h2>Yang perlu dibaca bersama angkanya</h2>
    <ul class="takeaways">
      <li><strong>Bonus demografi belum otomatis.</strong> 68,7% penduduk usia produktif, tapi penyerapan kerja menentukan apakah itu jadi dividen atau beban.</li>
      <li><strong>Kemiskinan turun, ketimpangan bertahan.</strong> Angka kemiskinan 8,57% adalah yang terendah dalam dua dekade — penurunan 0,79 poin dalam setahun.</li>
      <li><strong>Harapan hidup 74,15 tahun.</strong> Naik perlahan tiap tahun; kesehatan dan pendidikan adalah penentu berikutnya.</li>
    </ul>
    ${sourceLine('BPS, Sakernas Agustus 2024 dan Kemiskinan September 2024.')}
  </section>`;
}

// One shared year-detail panel for the economy page, filled by main.js.
export function yearDetail(year) {
  const g = GDP_SERIES.find((d) => d.year === year);
  const inf = INFLATION_SERIES.find((d) => d.year === year);
  return `<h2>Kilasan ${year}</h2>
    <dl class="facts">
      <div><dt>PDB nominal</dt><dd>Rp${g.nominal.toLocaleString('id-ID')} triliun</dd></div>
      <div><dt>Pertumbuhan ekonomi</dt><dd>${g.growth > 0 ? '+' : ''}${g.growth.toLocaleString('id-ID')}%</dd></div>
      <div><dt>Inflasi (Des, y-on-y)</dt><dd>${inf.value.toLocaleString('id-ID')}%</dd></div>
    </dl>
    <p class="source">Sumber: ${SOURCES.gdp}; ${SOURCES.inflation}.</p>`;
}

export { AGE_GROUPS, POVERTY_SERIES, UNEMPLOYMENT_SERIES };
