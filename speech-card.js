function loadSpeechCard() {
const content = document.getElementById(“patientContent”);

const patient = JSON.parse(
    localStorage.getItem("aphasiaPatient") || "null"
);
if (!patient) {
    content.innerHTML = "<h2>Пациент тіркелмеген!</h2>";
    return;
}
const allResults = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
const initialResults = allResults.filter(function (item) {
    return item.assessmentType === "initial";
});
const categories = [
    { id: "understanding", name: "Сөйлеуді түсіну" },
    { id: "naming", name: "Заттарды атау" },
    { id: "repetition", name: "Қайталау" },
    { id: "vocabulary", name: "Сөздік қор" },
    { id: "reading", name: "Оқу" },
    { id: "writing", name: "Жазу" }
];
let totalScore = 0;
let totalMax = 0;
let html = `
    <h2>📄 ПАЦИЕНТТІҢ СӨЙЛЕУ КАРТАСЫ</h2>
    <div class="result-item">
        <h3>ЖЕКЕ МӘЛІМЕТТЕР</h3>
        <p><b>Аты-жөні:</b> ${escapeHTML(patient.fullName)}</p>
        <p><b>Туған күні:</b> ${escapeHTML(patient.birthDate)}</p>
        <p><b>Жасы:</b> ${escapeHTML(patient.age)}</p>
        <p><b>Диагнозы:</b> ${escapeHTML(patient.diagnosis || "Көрсетілмеген")}</p>
        <p><b>Тексеру күні:</b> ${escapeHTML(patient.testDate)}</p>
    </div>
    <h3>ДИАГНОСТИКАЛЫҚ КӨРСЕТКІШТЕР</h3>
    <div class="result-list">
`;
categories.forEach(function (category) {
    const categoryResults = initialResults.filter(function (item) {
        return item.category === category.id;
    });
    const result = categoryResults.length
        ? categoryResults[categoryResults.length - 1]
        : null;
    if (result) {
        totalScore += Number(result.score) || 0;
        totalMax += Number(result.maxScore) || 0;
    }
    html += `
        <div class="result-item">
            <h3>${category.name}</h3>
            ${
                result
                ? `
                    <p>Балл: ${result.score} / ${result.maxScore}</p>
                    <p>Көрсеткіш: ${result.percentage}%</p>
                    <p>Орындалған тапсырма: ${result.completed || 0}</p>
                `
                : `<p>Бұл бағыт бойынша диагностика өткізілмеген.</p>`
            }
        </div>
    `;
});
html += `
    </div>
    <div class="result-item">
        <h3>ЖАЛПЫ КӨРСЕТКІШ</h3>
        <p>Жиналған балл: ${totalScore} / ${totalMax}</p>
        <p>Орындалған бағыттар: ${
            initialResults.length
        }</p>
        <small>
            Бұл көрсеткіштер тапсырмалардың орындалу нәтижесін көрсетеді.
            Олар өздігінен медициналық диагноз немесе афазияның ауырлық
            дәрежесі болып саналмайды.
        </small>
    </div>
    <div class="result-item">
        <h3>ЛОГОПЕДТІҢ ҚОРЫТЫНДЫСЫ</h3>
        <textarea id="speechConclusion"
            rows="5"
            placeholder="Логопедтің бақылауы мен қорытындысын енгізіңіз..."></textarea>
        <button class="enter-button"
            onclick="saveSpeechConclusion()">
            💾 ҚОРЫТЫНДЫНЫ САҚТАУ
        </button>
        <p id="conclusionMessage"></p>
    </div>
`;
content.innerHTML = html;
const savedConclusion = localStorage.getItem("aphasiaConclusion");
if (savedConclusion) {
    document.getElementById("speechConclusion").value =
        savedConclusion;
}

}

// Логопед қорытындысын сақтау
function saveSpeechConclusion() {
const field = document.getElementById(“speechConclusion”);
const message = document.getElementById(“conclusionMessage”);

if (!field) return;
localStorage.setItem("aphasiaConclusion", field.value);
message.textContent = "✅ Қорытынды сәтті сақталды!";

}
