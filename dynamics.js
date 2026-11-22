// =====================================
// ДИАГНОСТИКА НӘТИЖЕЛЕРІН САЛЫСТЫРУ
// =====================================

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
let maxTotal = 0;
let html = `
    <h2>Диагностика динамикасы</h2>
    <p>Бастапқы және қайталама бағалау нәтижелерін салыстыру.</p>
    <div class="result-list">
`;
categories.forEach(category => {
    const first = initial[category.id];
    const second = repeat[category.id];
    if (first) {
        initialTotal += Number(first.score || 0);
        maxTotal += Number(first.maxScore || 0);
    }
    if (second) {
        repeatTotal += Number(second.score || 0);
    }
    if (!first && !second) return;
    const firstScore = first ? Number(first.score || 0) : null;
    const secondScore = second ? Number(second.score || 0) : null;
    let differenceText = "Салыстыру үшін екі нәтиже де қажет.";
    if (first && second) {
        const difference = secondScore - firstScore;
        if (difference > 0) {
            differenceText = `+${difference} балл — нәтиже өскен.`;
        } else if (difference < 0) {
            differenceText = `${difference} балл — нәтиже төмендеген.`;
        } else {
            differenceText = "Өзгеріс жоқ.";
        }
    }
    html += `
        <div class="result-item">
            <h3>${category.title}</h3>
            <p>Бастапқы нәтиже: ${
                first ? firstScore + " / " + first.maxScore : "Жоқ"
            }</p>
            <p>Қайталама нәтиже: ${
                second ? secondScore + " / " + second.maxScore : "Жоқ"
            }</p>
            <p><strong>${differenceText}</strong></p>
        </div>
    `;
});
const repeatMax = Object.values(repeat).reduce(
    (sum, item) => sum + Number(item.maxScore || 0),
    0
);
html += `
    </div>
    <div class="result-item">
        <h3>Жалпы көрсеткіш</h3>
        <p>Бастапқы балл: ${initialTotal} / ${maxTotal}</p>
        <p>Қайталама балл: ${repeatTotal} / ${repeatMax}</p>
        <p>Ескерту: бұл көрсеткіштер тапсырмаларды орындау нәтижесін ғана сипаттайды. Олар өздігінен медициналық диагноз немесе афазияның ауырлық дәрежесін анықтамайды.</p>
    </div>
`;
content.innerHTML = html;

}

// =====================================
// ӘР БАҒАЛАУДЫҢ СОҢҒЫ НӘТИЖЕСІ
// =====================================

function getLatestResults(results, type) {
const latest = {};

results.forEach(result => {
    if (result.assessmentType === type) {
        latest[result.category] = result;
    }
});
return latest;

}
