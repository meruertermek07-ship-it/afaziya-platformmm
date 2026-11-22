const dynamicsCategories = [
{ key: “understanding”, title: “Сөйлеуді түсіну” },
{ key: “naming”, title: “Заттарды атау” },
{ key: “repetition”, title: “Қайталап айту” },
{ key: “vocabulary”, title: “Сөздік қор” },
{ key: “reading”, title: “Оқу” },
{ key: “writing”, title: “Жазу” }
];

function loadDynamics() {
const content = document.getElementById(“patientContent”);

if (!content) return;
const savedPatient = localStorage.getItem("aphasiaPatient");
if (!savedPatient) {
    content.innerHTML = `
        <h2>ДАМУ ДИНАМИКАСЫ</h2>
        <p>Алдымен пациент мәліметтерін енгізіңіз.</p>
        <button onclick="backToCabinetMenu()">АРТҚА</button>
    `;
    return;
}
let patient;
try {
    patient = JSON.parse(savedPatient);
} catch (error) {
    content.innerHTML = "<p>Пациент мәліметтерін оқу мүмкін болмады.</p>";
    return;
}
if (!patient.fullName || !patient.birthDate) {
    content.innerHTML = `
        <p>Пациенттің аты-жөні мен туған күні қажет.</p>
        <button onclick="backToCabinetMenu()">АРТҚА</button>
    `;
    return;
}
const patientId =
    patient.fullName.trim().toLowerCase() + "_" + patient.birthDate;
const allResults = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
const patientResults = allResults.filter(result =>
    result.patientId === patientId &&
    result.completed === true
);
const initialResults = patientResults.filter(result =>
    result.assessmentType === "initial"
);
const repeatResults = patientResults.filter(result =>
    result.assessmentType === "repeat"
);
renderDynamics(
    content,
    patient,
    initialResults,
    repeatResults
);

}

function getLatestResult(results, categoryKey) {
const matching = results.filter(result =>
result.categoryKey === categoryKey
);

if (matching.length === 0) return null;
return matching.sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
)[0];

}

function renderDynamics(content, patient, initialResults, repeatResults) {
const comparisons = dynamicsCategories.map(category => {
const initial = getLatestResult(initialResults, category.key);
const repeat = getLatestResult(repeatResults, category.key);

    let difference = null;
    if (initial && repeat) {
        difference =
            Number(repeat.percentage) -
            Number(initial.percentage);
    }
    return {
        ...category,
        initial,
        repeat,
        difference
    };
});
const comparable = comparisons.filter(item =>
    item.initial && item.repeat
);
let averageInitial = 0;
let averageRepeat = 0;
let averageDifference = 0;
if (comparable.length > 0) {
    averageInitial = Math.round(
        comparable.reduce(
            (sum, item) => sum + Number(item.initial.percentage), 0
        ) / comparable.length
    );
    averageRepeat = Math.round(
        comparable.reduce(
            (sum, item) => sum + Number(item.repeat.percentage), 0
        ) / comparable.length
    );
    averageDifference = averageRepeat - averageInitial;
}
content.innerHTML = `
    <div class="dynamics-container">
        <div class="dynamics-heading">
            <h2>ДАМУ ДИНАМИКАСЫ</h2>
            <h3>${escapeHTML(patient.fullName)}</h3>
            <p>Афазия кезіндегі сөйлеу дағдыларының өзгеруін бақылау</p>
        </div>
        <div class="dynamics-summary">
            <div class="dynamics-card">
                <span>Бастапқы көрсеткіш</span>
                <strong>${comparable.length ? averageInitial + "%" : "—"}</strong>
            </div>
            <div class="dynamics-card">
                <span>Қайталама көрсеткіш</span>
                <strong>${comparable.length ? averageRepeat + "%" : "—"}</strong>
            </div>
            <div class="dynamics-card">
                <span>Өзгеріс</span>
                <strong>
                    ${comparable.length
                        ? (averageDifference > 0 ? "+" : "") + averageDifference + " п.т."
                        : "—"}
                </strong>
            </div>
        </div>
        <h3>Бағыттар бойынша салыстыру</h3>
        <div class="dynamics-table-wrapper">
            <table class="dynamics-table">
                <thead>
                    <tr>
                        <th>Бағыт</th>
                        <th>Бастапқы</th>
                        <th>Қайталама</th>
                        <th>Өзгеріс</th>
                    </tr>
                </thead>
                <tbody>
                    ${comparisons.map(item => `
                        <tr>
                            <td>${item.title}</td>
                            <td>
                                ${item.initial
                                    ? item.initial.percentage + "%"
                                    : "Өткізілмеген"}
                            </td>
                            <td>
                                ${item.repeat
                                    ? item.repeat.percentage + "%"
                                    : "Өткізілмеген"}
                            </td>
                            <td class="${
                                item.difference === null
                                    ? ""
                                    : item.difference > 0
                                        ? "positive"
                                        : item.difference < 0
                                            ? "negative"
                                            : ""
                            }">
                                ${item.difference === null
                                    ? "—"
                                    : (item.difference > 0 ? "+" : "") +
                                        item.difference + " п.т."}
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
        <h3>Нәтижелер диаграммасы</h3>
        <div class="dynamics-chart">
            ${comparisons.map(item => `
                <div class="chart-item">
                    <p>${item.title}</p>
                    <div class="chart-line">
                        <span>Бастапқы</span>
                        <div class="chart-track">
                            <div class="chart-bar initial-bar"
                                 style="width:${item.initial ? Math.min(100, Math.max(0, Number(item.initial.percentage) || 0)) : 0}%">
                            </div>
                        </div>
                        <b>${item.initial ? item.initial.percentage + "%" : "—"}</b>
                    </div>
                    <div class="chart-line">
                        <span>Қайталама</span>
                        <div class="chart-track">
                            <div class="chart-bar repeat-bar"
                                 style="width:${item.repeat ? Math.min(100, Math.max(0, Number(item.repeat.percentage) || 0)) : 0}%">
                            </div>
                        </div>
                        <b>${item.repeat ? item.repeat.percentage + "%" : "—"}</b>
                    </div>
                </div>
            `).join("")}
        </div>
        <div class="dynamics-conclusion">
            <h3>Қорытынды</h3>
            ${
                comparable.length > 0
                ? `
                    <p>
                        Салыстырылған ${comparable.length} бағыт бойынша
                        бастапқы орташа көрсеткіш ${averageInitial}%,
                        қайталама орташа көрсеткіш ${averageRepeat}% болды.
                    </p>
                    <p>
                        Өзгеріс: <b>
                        ${(averageDifference > 0 ? "+" : "") +
                            averageDifference} пайыздық пункт.</b>
                    </p>
                    <p>
                        Бұл көрсеткіштер орындалған тапсырмалар нәтижесін
                        сипаттайды. Клиникалық қорытындыны логопед
                        пациенттің жалпы жағдайын ескере отырып жасайды.
                    </p>
                `
                : `
                    <p>
                        Даму динамикасын есептеу үшін кемінде бір бағыт
                        бойынша бастапқы және қайталама диагностика
                        нәтижелері қажет.
                    </p>
                    <p>
                        Алдымен бастапқы диагностиканы, кейін қайталама
                        диагностиканы орындаңыз.
                    </p>
                `
            }
        </div>
        <button onclick="window.location.href='diagnostics.html'">
            ДИАГНОСТИКАҒА ӨТУ
        </button>
        <button onclick="backToCabinetMenu()" class="dynamics-back">
            ← КАБИНЕТКЕ ҚАЙТУ
        </button>
    </div>
`;
addDynamicsStyles();

}

function addDynamicsStyles() {
if (document.getElementById(“dynamics-styles”)) return;

const style = document.createElement("style");
style.id = "dynamics-styles";
style.textContent = `
    .dynamics-container {
        max-width: 1000px;
        margin: 20px auto;
        padding: 25px;
        background: #fff;
        border: 1px solid #ead9b7;
        border-radius: 20px;
        color: #493b2b;
    }
    .dynamics-heading {
        text-align: center;
    }
    .dynamics-heading h2 {
        color: #a77a27;
    }
    .dynamics-summary {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin: 25px 0;
    }
    .dynamics-card {
        padding: 20px 10px;
        background: #fff8e9;
        border: 1px solid #ead9b7;
        border-radius: 14px;
        text-align: center;
    }
    .dynamics-card span {
        display: block;
        font-size: 13px;
        margin-bottom: 10px;
    }
    .dynamics-card strong {
        font-size: 25px;
        color: #a77a27;
    }
    .dynamics-table-wrapper {
        overflow-x: auto;
    }
    .dynamics-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 520px;
    }
    .dynamics-table th,
    .dynamics-table td {
        padding: 13px;
        border: 1px solid #ead9b7;
        text-align: center;
    }
    .dynamics-table th {
        background: #fff8e9;
    }
    .positive {
        color: #278044;
        font-weight: bold;
    }
    .negative {
        color: #b34b3d;
        font-weight: bold;
    }
    .chart-item {
        padding: 15px;
        margin: 15px 0;
        border: 1px solid #ead9b7;
        border-radius: 12px;
    }
    .chart-line {
        display: grid;
        grid-template-columns: 85px 1fr 45px;
        align-items: center;
        gap: 8px;
        margin: 10px 0;
        font-size: 13px;
    }
    .chart-track {
        height: 13px;
        background: #eee7da;
        border-radius: 20px;
        overflow: hidden;
    }
    .chart-bar {
        height: 100%;
        border-radius: 20px;
    }
    .initial-bar {
        background: #c9a66b;
    }
    .repeat-bar {
        background: #77a88a;
    }
    .dynamics-conclusion {
        padding: 18px;
        margin: 20px 0;
        background: #fff8e9;
        border-radius: 14px;
        line-height: 1.7;
    }
    .dynamics-back {
        background: #776b59;
    }
    @media(max-width: 650px) {
        .dynamics-container {
            padding: 15px;
        }
        .dynamics-summary {
            grid-template-columns: 1fr;
        }
        .chart-line {
            grid-template-columns: 75px 1fr 40px;
        }
    }
`;
document.head.appendChild(style);

}
