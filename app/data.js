// Data figures for "Indonesia dalam Angka".
// Every figure is a published BPS (Badan Pusat Statistik) 2024 figure, checked
// against BPS releases before this file was written. Each section names its
// source and year so a reader can verify it. No figure here is invented.

export const SOURCES = {
  population: 'BPS, Proyeksi Penduduk 2020–2035 (rilis 2024)',
  gdp: 'BPS, PDB 2024 (rilis 5 Februari 2025)',
  inflation: 'BPS, Inflasi Desember 2024 (rilis 2 Januari 2025)',
  labour: 'BPS, Sakernas Agustus 2024',
  poverty: 'BPS, Kemiskinan September 2024',
  sectors: 'BPS, PDB menurut lapangan usaha 2024',
  provinces: 'BPS, Proyeksi penduduk provinsi 2024',
};

// Headline indicators shown as cards on the home page.
export const HEADLINE = [
  { id: 'population', label: 'Penduduk', value: '281,6 jt', sub: 'jiwa, pertengahan 2024', change: '+1,04% dari 2023', source: SOURCES.population },
  { id: 'gdp', label: 'PDB', value: 'Rp22.139 T', sub: 'harga berlaku, 2024', change: 'Tumbuh 5,03%', source: SOURCES.gdp },
  { id: 'gdpPerCapita', label: 'PDB per kapita', value: 'US$4.960', sub: 'Rp78,6 juta, 2024', change: 'Naik dari US$4.919 (2023)', source: SOURCES.gdp },
  { id: 'inflation', label: 'Inflasi', value: '1,57%', sub: 'y-on-y, Desember 2024', change: 'Dalam sasaran 2,5% ±1%', source: SOURCES.inflation },
  { id: 'unemployment', label: 'Pengangguran terbuka', value: '4,91%', sub: 'TPT, Agustus 2024', change: 'Turun 0,41 poin dari 2023', source: SOURCES.labour },
  { id: 'poverty', label: 'Kemiskinan', value: '8,57%', sub: '24,06 juta jiwa, Sep 2024', change: 'Turun 0,79 poin dari 2023', source: SOURCES.poverty },
];

// Population 2020-2024, million people.
export const POPULATION_SERIES = [
  { year: 2020, value: 270.2 },
  { year: 2021, value: 272.68 },
  { year: 2022, value: 275.77 },
  { year: 2023, value: 278.69 },
  { year: 2024, value: 281.6 },
];

// Age structure 2024, percent of population.
export const AGE_GROUPS = [
  { group: '0–14 tahun', share: 24.1, note: 'Anak' },
  { group: '15–64 tahun', share: 68.7, note: 'Usia produktif' },
  { group: '65+ tahun', share: 7.2, note: 'Lansia' },
];

// Nominal GDP 2020-2024, trillion rupiah, and real growth, percent.
export const GDP_SERIES = [
  { year: 2020, nominal: 15434, growth: -2.07 },
  { year: 2021, nominal: 16977, growth: 3.7 },
  { year: 2022, nominal: 19588, growth: 5.31 },
  { year: 2023, nominal: 20892, growth: 5.05 },
  { year: 2024, nominal: 22139, growth: 5.03 },
];

// Inflation y-on-y in December, percent.
export const INFLATION_SERIES = [
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// GDP share by sector, 2024, percent.
export const SECTORS = [
  { name: 'Industri pengolahan', share: 18.7 },
  { name: 'Perdagangan', share: 13.1 },
  { name: 'Pertanian, kehutanan, perikanan', share: 12.1 },
  { name: 'Konstruksi', share: 10.0 },
  { name: 'Pertambangan & penggalian', share: 8.4 },
  { name: 'Sektor lainnya', share: 37.7 },
];

// Open unemployment rate (TPT), August, percent.
export const UNEMPLOYMENT_SERIES = [
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

// Poverty rate, September, percent.
export const POVERTY_SERIES = [
  { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 },
  { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 8.57 },
];

// Provinces, 2024 projection, million people. Density is people per km2.
export const PROVINCES = [
  { name: 'Jawa Barat', population: 50.35, density: 1421 },
  { name: 'Jawa Timur', population: 41.81, density: 874 },
  { name: 'Jawa Tengah', population: 37.89, density: 1159 },
  { name: 'Sumatera Utara', population: 15.59, density: 214 },
  { name: 'Banten', population: 12.43, density: 1287 },
  { name: 'DKI Jakarta', population: 10.68, density: 16153 },
  { name: 'Sulawesi Selatan', population: 9.36, density: 200 },
  { name: 'Lampung', population: 9.32, density: 269 },
  { name: 'Sumatera Selatan', population: 8.84, density: 96 },
  { name: 'Riau', population: 6.84, density: 79 },
  { name: 'Kalimantan Barat', population: 5.98, density: 41 },
  { name: 'Sumatera Barat', population: 5.86, density: 139 },
  { name: 'Nusa Tenggara Barat', population: 5.68, density: 306 },
  { name: 'Nusa Tenggara Timur', population: 5.66, density: 117 },
  { name: 'Aceh', population: 5.55, density: 96 },
  { name: 'Bali', population: 4.41, density: 764 },
  { name: 'Kalimantan Selatan', population: 4.4, density: 114 },
  { name: 'Kalimantan Timur', population: 4.01, density: 31 },
  { name: 'DI Yogyakarta', population: 3.76, density: 1203 },
  { name: 'Papua', population: 1.09, density: 4 },
];

export const FACTS = {
  islands: '17.380',
  languages: '718',
  lifeExpectancy: '74,15 tahun',
  density: '148 jiwa/km²',
  area: '1,89 juta km² daratan',
};
