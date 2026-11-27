# Indonesia dalam Angka

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Hendr1010/national-statistics-site-entry/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Hendr1010/national-statistics-site-entry/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Entry for the make.fun bounty **best-national-statistics-site-20261126-0539**:
the best national statistics site — Indonesia, from published BPS 2024 figures.

A static site (no build step, no network) with five linked pages: a dashboard of
six headline indicators (population 281.6 million, GDP Rp22,139 trillion,
GDP per capita US$4,960, inflation 1.57%, unemployment 4.91%, poverty 8.57%),
population, economy, a searchable and sortable province table, and labour &
welfare. Charts are hand-drawn on canvas — no library — and every figure names
its BPS source and year. Year picker, province search/sort/detail, copy-summary
and CSV-download controls all work.

## How it runs

Serve `app/` with any static server and open `index.html`, or run the hand-in
program (Node 22, standard library only), which copies `app/` and
`screenshots/` to `/output` and writes `/output/dossier.json`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
