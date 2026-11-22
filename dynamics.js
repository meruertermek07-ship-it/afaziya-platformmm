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

let patient = {};

try {
patient = JSON.parse(
localStorage.getItem(“aphasiaPatient”) || “{}”
);
} catch (error) {
patient = {};
}

if (!patient.fullName || !patient.birthDate) {
content.innerHTML = <button class="content-back" onclick="backToCabinetMenu()"> ← АРТҚА </button> <h2>ДАМУ ДИНАМИКАСЫ</h2> <p>Алдымен пациенттің мәліметтерін сақтаңыз.</p>;
return;
}

const patientId =
patient.fullName.trim().toLowerCase() +
“_” +
patient.birthDate;

let allResults = [];

try {
allResults = JSON.parse(
localStorage.getItem(“aphasiaDiagnosticResults”) || “[]”
);

if (!Array.isArray(allResults)) allResults = [];

} catch (error) {
allResults = [];
}

const patientResults = allResults.filter(
result => result.patientId === patientId
);

const initialResults = patientResults.filter(
result => result.assessmentType === “initial”
);

const repeatResults = patientResults.filter(
result => result.assessmentType === “repeat”
);

const rows = dynamicsCategories.map(category => {
const initial = getDynamicsLatest(
initialResults,
category.key
);

const repeat = getDynamicsLatest(
  repeatResults,
  category.key
);
const initialPercent = initial
  ? Number(initial.percentage)
  : null;
const repeatPercent = repeat
  ? Number(repeat.percentage)
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

const completed = rows.filter(
row =>
row.initialPercent !== null &&
row.repeatPercent !== null
);

const initialAverage = completed.length
? completed.reduce(
(sum, row) => sum + row.initialPercent, 0
) / completed.length
: null;

const repeatAverage = completed.length
? completed.reduce(
(sum, row) => sum + row.repeatPercent, 0
) / completed.length
: null;

const totalChange =
initialAverage !== null && repeatAverage !== null
? repeatAverage - initialAverage
: null;

renderDynamics(
content,
patient,
rows,
initialAverage,
repeatAverage,
totalChange,
completed.length
);
}

function getDynamicsLatest(results, categoryKey) {
const matching = results.filter(
result => result.categoryKey === categoryKey
);

if (!matching.length) return null;

matching.sort(
(a, b) => Number(b.timestamp || 0) -
Number(a.timestamp || 0)
);

return matching[0];
}

function renderDynamics(
content,
patient,
rows,
initialAverage,
repeatAverage,
totalChange,
completedCount
) {
content.innerHTML = `
← АРТҚА
<h2 class="dyn-title">ДАМУ ДИНАМИКАСЫ</h2>
<div class="dyn-patient">
  <strong>Пациент:</strong>
  ${escapeHTML(patient.fullName)}
  <br>
  <strong>Диагноз:</strong>
  ${escapeHTML(patient.diagnosis || "Көрсетілмеген")}
</div>
<div class="dyn-summary">
  <div class="dyn-stat">
    <span>Бастапқы көрсеткіш</span>
    <strong>
      ${initialAverage === null
        ? "—"
        : initialAverage.toFixed(1) + "%"}
    </strong>
  </div>
  <div class="dyn-stat">
    <span>Кейінгі көрсеткіш</span>
    <strong>
      ${repeatAverage === null
        ? "—"
        : repeatAverage.toFixed(1) + "%"}
    </strong>
  </div>
  <div class="dyn-stat">
    <span>Жалпы өзгеріс</span>
    <strong>
      ${totalChange === null
        ? "—"
        : (totalChange > 0 ? "+" : "") +
          totalChange.toFixed(1) + "%"}
    </strong>
  </div>
</div>
<h3 class="dyn-heading">
  ДИАГНОСТИКА НӘТИЖЕЛЕРІН САЛЫСТЫРУ
</h3>
<div class="dyn-table-wrap">
  <table class="dyn-table">
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
              ? "—"
              : row.initialPercent + "%"}
          </td>
          <td>
            ${row.repeatPercent === null
              ? "—"
              : row.repeatPercent + "%"}
          </td>
          <td class="${
            row.change === null
              ? ""
              : row.change > 0
                ? "dyn-positive"
                : row.change < 0
                  ? "dyn-negative"
                  : ""
          }">
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
<h3 class="dyn-heading">
  НӘТИЖЕЛЕРДІҢ ГРАФИКАЛЫҚ КӨРІНІСІ
</h3>
<div class="dyn-chart">
  ${rows.map(row => `
    <div class="dyn-chart-card">
      <h4>${row.title}</h4>
      <div class="dyn-bar-row">
        <span>Бастапқы</span>
        <div class="dyn-track">
          <div class="dyn-bar dyn-initial"
            style="width:${row.initialPercent ?? 0}%">
          </div>
        </div>
        <b>${row.initialPercent === null
          ? "—"
          : row.initialPercent + "%"}</b>
      </div>
      <div class="dyn-bar-row">
        <span>Кейінгі</span>
        <div class="dyn-track">
          <div class="dyn-bar dyn-repeat"
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
<div class="dyn-conclusion">
  <h3>ЛОГОПЕД ҚОРЫТЫНДЫСЫ</h3>
  ${
    completedCount === 0
      ? "<p>Салыстыру үшін бастапқы және кейінгі диагностика нәтижелері қажет.</p>"
      : `
        <p>Салыстыруға ${completedCount} бағалау бөлімі енгізілді.</p>
        <p>${
          totalChange > 0
            ? "Салыстырылған көрсеткіштер бойынша оң өзгеріс байқалады."
            : totalChange < 0
              ? "Салыстырылған көрсеткіштер бойынша төмендеу байқалады. Түзету жұмысын қайта қарау қажет."
              : "Салыстырылған көрсеткіштер өзгеріссіз қалған."
        }</p>
        <p>Жалпы өзгеріс: ${
          totalChange > 0 ? "+" : ""
        }${totalChange.toFixed(1)} пайыздық тармақ.</p>
      `
  }
  <small>
    Есеп диагностика кезінде тіркелген ұпайлар негізінде жасалады.
    Соңғы қорытындыны логопед тексереді.
  </small>
</div>

`;

addDynamicsDesign();
}

function addDynamicsDesign() {
if (document.getElementById(“dynStyles”)) return;

const style = document.createElement(“style”);
style.id = “dynStyles”;

style.textContent = `
.dyn-title {
color:#a77c36;
margin:20px 0;
font-size:25px;
}

.dyn-patient {
  background:#fffaf2;
  border:1px solid #eadcc3;
  border-radius:13px;
  padding:17px;
  line-height:1.9;
  margin-bottom:20px;
}
.dyn-summary {
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:12px;
}
.dyn-stat {
  background:#fffaf2;
  border:1px solid #eadcc3;
  border-radius:15px;
  padding:17px;
}
.dyn-stat span {
  color:#887963;
  font-size:13px;
}
.dyn-stat strong {
  display:block;
  color:#a77c36;
  font-size:25px;
  margin-top:10px;
}
.dyn-heading {
  color:#98703a;
  margin:27px 0 15px;
}
.dyn-table-wrap {
  overflow-x:auto;
}
.dyn-table {
  width:100%;
  min-width:520px;
  border-collapse:collapse;
}
.dyn-table th,
.dyn-table td {
  padding:13px 10px;
  border:1px solid #eadcc3;
  text-align:left;
  font-size:13px;
}
.dyn-table th {
  background:#fbf3e5;
  color:#896a39;
}
.dyn-positive {
  color:#42835b;
  font-weight:bold;
}
.dyn-negative {
  color:#b35e52;
  font-weight:bold;
}
.dyn-chart-card {
  background:#fffaf2;
  border:1px solid #eadcc3;
  border-radius:15px;
  padding:16px;
  margin-bottom:13px;
}
.dyn-chart-card h4 {
  color:#705b3c;
  margin-bottom:14px;
}
.dyn-bar-row {
  display:grid;
  grid-template-columns:75px minmax(0,1fr) 45px;
  gap:8px;
  align-items:center;
  margin:10px 0;
  font-size:12px;
}
.dyn-track {
  height:13px;
  background:#eee8dd;
  border-radius:20px;
  overflow:hidden;
}
.dyn-bar {
  height:100%;
  border-radius:20px;
}
.dyn-initial {
  background:#c7a66d;
}
.dyn-repeat {
  background:#83ad91;
}
.dyn-conclusion {
  background:#fffaf2;
  border:1px solid #eadcc3;
  padding:20px;
  border-radius:15px;
  margin-top:25px;
  line-height:1.8;
}
.dyn-conclusion h3 {
  color:#98703a;
  margin-bottom:12px;
}
.dyn-conclusion small {
  display:block;
  color:#887963;
  margin-top:12px;
}
@media(max-width:600px) {
  .dyn-summary {
    grid-template-columns:1fr;
  }
  .dyn-bar-row {
    grid-template-columns:65px minmax(0,1fr) 40px;
    gap:5px;
  }
}

`;

document.head.appendChild(style);
}
