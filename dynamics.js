const dynamicsCategories = [
{ key: “understanding”, title: “Сөйлеуді түсіну” },
{ key: “naming”, title: “Заттарды атау” },
{ key: “repetition”, title: “Қайталап айту” },
{ key: “vocabulary”, title: “Сөздік қор” },
{ key: “reading”, title: “Оқу дағдысы” },
{ key: “writing”, title: “Жазу дағдысы” }
];

function loadDynamics() {
const content = document.getElementById(“patientContent”);
if (!content) return;

let results = [];

try {
results = JSON.parse(
localStorage.getItem(“aphasiaDiagnosticResults”) || “[]”
);

if (!Array.isArray(results)) results = [];

} catch (error) {
results = [];
}

const initialResults = results.filter(
item => item.assessmentType === “initial”
);

const repeatResults = results.filter(
item => item.assessmentType === “repeat”
);

const rows = dynamicsCategories.map(category => {
const initial = getLatestCategoryResult(
initialResults,
category.key
);

const repeat = getLatestCategoryResult(
  repeatResults,
  category.key
);
const initialPercent = initial
  ? Number(initial.percentage) || 0
  : null;
const repeatPercent = repeat
  ? Number(repeat.percentage) || 0
  : null;
const change =
  initialPercent !== null && repeatPercent !== null
    ? repeatPercent - initialPercent
    : null;
return {
  ...category,
  initialPercent,
  repeatPercent,
  change
};

});

const completedRows = rows.filter(
row => row.initialPercent !== null &&
row.repeatPercent !== null
);

const initialAverage = completedRows.length
? completedRows.reduce(
(sum, row) => sum + row.initialPercent, 0
) / completedRows.length
: null;

const repeatAverage = completedRows.length
? completedRows.reduce(
(sum, row) => sum + row.repeatPercent, 0
) / completedRows.length
: null;

const overallChange =
initialAverage !== null && repeatAverage !== null
? repeatAverage - initialAverage
: null;

content.innerHTML = `
← АРТҚА
<h2 style="color:#a77c36;margin-bottom:12px;">
  ДАМУ ДИНАМИКАСЫ
</h2>
<p style="color:#887963;line-height:1.6;margin-bottom:22px;">
  Бастапқы және кейінгі диагностика нәтижелерін салыстырмалы талдау.
</p>
<div class="dynamics-summary">
  <div class="dynamics-stat">
    <span>Бастапқы орташа көрсеткіш</span>
    <strong>
      ${initialAverage === null
        ? "—"
        : initialAverage.toFixed(1) + "%"}
    </strong>
  </div>
  <div class="dynamics-stat">
    <span>Кейінгі орташа көрсеткіш</span>
    <strong>
      ${repeatAverage === null
        ? "—"
        : repeatAverage.toFixed(1) + "%"}
    </strong>
  </div>
  <div class="dynamics-stat">
    <span>Жалпы өзгеріс</span>
    <strong>
      ${overallChange === null
        ? "—"
        : (overallChange > 0 ? "+" : "") +
          overallChange.toFixed(1) + "%"}
    </strong>
  </div>
</div>
<h3 style="color:#98703a;margin:25px 0 15px;">
  БӨЛІМДЕР БОЙЫНША САЛЫСТЫРУ
</h3>
<div class="dynamics-table-wrap">
  <table class="dynamics-table">
    <thead>
      <tr>
        <th>Бағалау бөлімі</th>
        <th>Бастапқы</th>
        <th>Кейінгі</th>
        <th>Өзгеріс</th>
      </tr>
    </thead>
    <tbody>
      ${rows.map(row => `
        <tr>
          <td>${row.title}</td>
          <td>
            ${row.initialPercent === null
              ? "Өткізілмеген"
              : row.initialPercent + "%"}
          </td>
          <td>
            ${row.repeatPercent === null
              ? "Өткізілмеген"
              : row.repeatPercent + "%"}
          </td>
          <td>
            ${row.change === null
              ? "—"
              : (row.change > 0 ? "+" : "") +
                row.change.toFixed(1) + "%"}
          </td>
        </tr>
      `).join("")}
    </tbody>
  </table>
</div>
<h3 style="color:#98703a;margin:28px 0 18px;">
  ДАМУ ДИАГРАММАСЫ
</h3>
<div class="dynamics-chart">
  ${rows.map(row => `
    <div class="chart-item">
      <div class="chart-label">${row.title}</div>
      <div class="chart-line">
        <span>Бастапқы</span>
        <div class="chart-track">
          <div class="chart-bar initial-bar"
            style="width:${row.initialPercent ?? 0}%">
          </div>
        </div>
        <b>${row.initialPercent === null
          ? "—"
          : row.initialPercent + "%"}</b>
      </div>
      <div class="chart-line">
        <span>Кейінгі</span>
        <div class="chart-track">
          <div class="chart-bar repeat-bar"
            style="width:${row.repeatPercent ?? 0}%">
          </div>
        </div>
        <b>${row.repeatPercent === null
          ? "—"
          : row.repeatPercent + "%"}</b>
      </div>
    </div>
  `).join("")}
</div>
<div class="dynamics-conclusion">
  <h3>ЛОГОПЕД ҚОРЫТЫНДЫСЫ</h3>
  ${
    overallChange === null
      ? "<p>Даму динамикасын анықтау үшін бастапқы және кейінгі диагностика нәтижелерін енгізу қажет.</p>"
      : overallChange > 0
        ? `<p>Салыстырылған бөлімдер бойынша орташа көрсеткіш ${overallChange.toFixed(1)} пайыздық тармаққа жоғарылаған.</p>`
        : overallChange < 0
          ? `<p>Салыстырылған бөлімдер бойынша орташа көрсеткіш ${Math.abs(overallChange).toFixed(1)} пайыздық тармаққа төмендеген. Қайта бағалау және түзету жұмысын талдау ұсынылады.</p>`
          : "<p>Салыстырылған бөлімдер бойынша орташа көрсеткіш өзгермеген.</p>"
  }
  <p style="font-size:13px;color:#897b67;margin-top:10px;">
    Бұл есеп диагностикада тіркелген ұпайларға негізделеді.
    Қорытындыны логопед кәсіби бақылаумен нақтылайды.
  </p>
</div>

`;

addDynamicsStyles();
}

function getLatestCategoryResult(results, categoryKey) {
const matching = results.filter(
item => item.categoryKey === categoryKey
);

if (!matching.length) return null;

matching.sort((a, b) => {
return (Number(b.timestamp) || 0) -
(Number(a.timestamp) || 0);
});

return matching[0];
}

function addDynamicsStyles() {
if (document.getElementById(“dynamicsStyles”)) return;

const style = document.createElement(“style”);
style.id = “dynamicsStyles”;

style.textContent = `
.dynamics-summary {
display:grid;
grid-template-columns:repeat(3,minmax(0,1fr));
gap:12px;
margin:20px 0;
}

.dynamics-stat {
  background:#fffaf0;
  border:1px solid #eadcc3;
  padding:17px;
  border-radius:14px;
}
.dynamics-stat span {
  display:block;
  font-size:13px;
  color:#887963;
  line-height:1.5;
}
.dynamics-stat strong {
  display:block;
  color:#a77c36;
  font-size:24px;
  margin-top:10px;
}
.dynamics-table-wrap {
  width:100%;
  overflow-x:auto;
}
.dynamics-table {
  width:100%;
  border-collapse:collapse;
  min-width:520px;
  background:white;
}
.dynamics-table th,
.dynamics-table td {
  padding:13px 10px;
  border:1px solid #eadcc3;
  text-align:left;
  font-size:14px;
}
.dynamics-table th {
  background:#fbf3e5;
  color:#8e6c36;
}
.chart-item {
  border:1px solid #eadcc3;
  border-radius:14px;
  padding:15px;
  margin-bottom:13px;
}
.chart-label {
  font-weight:bold;
  color:#705b3c;
  margin-bottom:12px;
}
.chart-line {
  display:grid;
  grid-template-columns:75px minmax(0,1fr) 48px;
  gap:8px;
  align-items:center;
  margin:9px 0;
  font-size:12px;
}
.chart-track {
  height:13px;
  background:#f2eee7;
  border-radius:20px;
  overflow:hidden;
}
.chart-bar {
  height:100%;
  border-radius:20px;
}
.initial-bar {
  background:#c7a66d;
}
.repeat-bar {
  background:#83ad91;
}
.chart-line b {
  color:#705b3c;
}
.dynamics-conclusion {
  background:#fffaf0;
  border:1px solid #eadcc3;
  padding:20px;
  border-radius:15px;
  margin-top:22px;
  line-height:1.7;
}
.dynamics-conclusion h3 {
  color:#98703a;
  margin-bottom:10px;
}
@media(max-width:600px) {
  .dynamics-summary {
    grid-template-columns:1fr;
  }
  .chart-line {
    grid-template-columns:65px minmax(0,1fr) 42px;
    gap:5px;
  }
}

`;

document.head.appendChild(style);
}
