function loadDynamics() {
const content = document.getElementById(“patientContent”);

const allResults = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
const categories = [
    { id: "understanding", name: "Сөйлеуді түсіну" },
    { id: "naming", name: "Заттарды атау" },
    { id: "repetition", name: "Қайталау" },
    { id: "vocabulary", name: "Сөздік қор" },
    { id: "reading", name: "Оқу" },
    { id: "writing", name: "Жазу" }
];
function getLatest(categoryId, type) {
    const found = allResults.filter(function (item) {
        return item.category === categoryId &&
               item.assessmentType === type;
    });
    return found.length ? found[found.length - 1] : null;
}
let initialTotal = 0;
let repeatTotal = 0;
let initialMax = 0;
let repeatMax = 0;
let html = "";
categories.forEach(function (category) {
    const initial = getLatest(category.id, "initial");
    const repeat = getLatest(category.id, "repeat");
    if (initial) {
        initialTotal += Number(initial.score) || 0;
        initialMax += Number(initial.maxScore) || 0;
    }
    if (repeat) {
        repeatTotal += Number(repeat.score) || 0;
        repeatMax += Number(repeat.maxScore) || 0;
    }
    let differenceText = "Салыстыру үшін екі нәтиже де қажет.";
    if (initial && repeat) {
        const difference =
            Number(repeat.score) - Number(initial.score);
        if (difference > 0) {
            differenceText = `+${difference} балл — көрсеткіш өскен.`;
        } else if (difference < 0) {
            differenceText = `${difference} балл — көрсеткіш төмендеген.`;
        } else {
            differenceText = "Көрсеткіш өзгермеген.";
        }
    }
    html += `
        <div class="result-item">
            <h3>${category.name}</h3>
            <p>
                <b>Бастапқы нәтиже:</b>
                ${initial
                    ? `${initial.score} / ${initial.maxScore} балл`
                    : "Өткізілмеген"}
            </p>
            <p>
                <b>Қайталама нәтиже:</b>
                ${repeat
                    ? `${repeat.score} / ${repeat.maxScore} балл`
                    : "Өткізілмеген"}
            </p>
            <p><b>Өзгеріс:</b> ${differenceText}</p>
        </div>
    `;
});
const initialPercent = initialMax
    ? Math.round(initialTotal / initialMax * 100)
    : 0;
const repeatPercent = repeatMax
    ? Math.round(repeatTotal / repeatMax * 100)
    : 0;
const overallDifference = repeatPercent - initialPercent;
html = `
    <h2>📈 ДИАГНОСТИКАЛЫҚ ДИНАМИКА</h2>
    <div class="result-item">
        <h3>ЖАЛПЫ САЛЫСТЫРУ</h3>
        <p>Бастапқы көрсеткіш: ${initialMax
            ? `${initialTotal} / ${initialMax} (${initialPercent}%)`
            : "Әзірге нәтиже жоқ"}</p>
        <p>Қайталама көрсеткіш: ${repeatMax
            ? `${repeatTotal} / ${repeatMax} (${repeatPercent}%)`
            : "Әзірге нәтиже жоқ"}</p>
        <p><b>Пайыздық айырмашылық:</b>
            ${initialMax && repeatMax
                ? `${overallDifference > 0 ? "+" : ""}${overallDifference}%`
                : "Салыстыру мүмкін емес"}
        </p>
    </div>
    <h3>БАҒЫТТАР БОЙЫНША САЛЫСТЫРУ</h3>
    ${html}
    <div class="result-item">
        <h3>ЕСКЕРТПЕ</h3>
        <p>
            Нәтижелер тек орындалған тапсырмалар бойынша жиналған
            балдарды салыстырады. Бұл медициналық диагноз немесе
            афазияның ауырлық дәрежесін автоматты анықтау емес.
            Қорытындыны логопед маман бағалайды.
        </p>
    </div>
`;
content.style.display = "block";
content.innerHTML = html;

}
