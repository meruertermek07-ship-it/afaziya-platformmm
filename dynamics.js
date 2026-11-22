// =============================================
// АФАЗИЯ ДИАГНОСТИКАСЫНЫҢ ДИНАМИКАСЫ
// =============================================

function loadDynamics() {
const content = document.getElementById(“patientContent”);

if (!content) return;
const results = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
const initial = getLatestResults(results, "initial");
const repeat = getLatestResults(results, "repeat");
const categories = [
    { id: "understanding", title: "Сөйлеуді түсіну" },
    { id: "naming", title: "Заттарды атау" },
    { id: "repetition", title: "Қайталау" },
    { id: "vocabulary", title: "Сөздік қор" },
    { id: "reading", title: "Оқу" },
    { id: "writing", title: "Жазу" }
];
let initialTotal = 0;
let repeatTotal = 0;
let initialMax = 0;
let repeatMax = 0;
let rows = "";
categories.forEach(category => {
    const first = initial[category.id];
    const second = repeat[category.id];
    if (first) {
        initialTotal += Number(first.score || 0);
        initialMax += Number(first.maxScore || 0);
    }
    if (second) {
        repeatTotal += Number(second.score || 0);
        repeatMax += Number(second.maxScore || 0);
    }
    const firstScore = first ? Number(first.score) : null;
    const secondScore = second ? Number(second.score) : null;
    let difference = "—";
    if (first && second) {
        const change = secondScore - firstScore;
        difference = change > 0
            ? `+${change} балл`
            : `${change} балл`;
    }
    rows += `
        <tr>
            <td>${category.title}</td>
            <td>${first ? firstScore + "/" + first.maxScore : "—"}</td>
            <td>${second ? secondScore + "/" + second.maxScore : "—"}</td>
            <td>${difference}</td>
        </tr>
    `;
});
const initialPercent = initialMax
    ? Math.round(initialTotal / initialMax * 100)
    : 0;
const repeatPercent = repeatMax
    ? Math.round(repeatTotal / repeatMax * 100)
    : 0;
const totalDifference = repeatPercent - initialPercent;
content.style.display = "block";
content.innerHTML = `
    <div class="dynamics-panel">
        <h2>Диагностика динамикасы</h2>
        <p>
            Пациенттің бастапқы және қайталама бағалау
            нәтижелерін салыстыру.
        </p>
        <div class="result-item">
            <h3>Бастапқы диагностика</h3>
            <h2>${initialTotal} / ${initialMax}</h2>
            <p>${initialPercent}%</p>
        </div>
        <div class="result-item">
            <h3>Қайталама диагностика</h3>
            <h2>${repeatTotal} / ${repeatMax}</h2>
            <p>${repeatPercent}%</p>
        </div>
        <h3>Бағыттар бойынша салыстыру</h3>
        <div style="overflow-x:auto;">
            <table style="
                width:100%;
                border-collapse:collapse;
                text-align:center;
                color:inherit;
            ">
                <thead>
                    <tr>
                        <th>Бағыт</th>
                        <th>Бастапқы</th>
                        <th>Қайталама</th>
                        <th>Өзгеріс</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
        <div class="result-item">
            <h3>Жалпы өзгеріс</h3>
            <h2>
                ${totalDifference > 0 ? "+" : ""}
                ${totalDifference}%
            </h2>
            <p>
                Бұл — екі бағалау кезіндегі тапсырма балдарының
                пайыздық айырмасы.
            </p>
        </div>
        <p>
            Ескерту: нәтижелер тек орындалған тапсырмалар бойынша
            салыстырылады. Бұл көрсеткіштер медициналық диагноз
            немесе афазияның ауырлық дәрежесі болып саналмайды.
        </p>
    </div>
`;

}

// =============================================
// ӘР БАҒЫТТЫҢ СОҢҒЫ НӘТИЖЕСІ
// =============================================

function getLatestResults(results, type) {
const latest = {};

results.forEach(result => {
    if (result.assessmentType === type) {
        latest[result.category] = result;
    }
});
return latest;

}
