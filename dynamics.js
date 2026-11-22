function loadDynamics() {
const content = document.getElementById(“patientContent”);
if (!content) return;

const results = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
const categories = [
    "Сөйлеуді түсіну",
    "Заттарды атау",
    "Қайталап айту",
    "Сөздік қор",
    "Оқу",
    "Жазу"
];
function getLatestResult(category, type) {
    return results
        .filter(item =>
            item.assessmentType === type &&
            (item.category === category || item.title === category)
        )
        .slice(-1)[0];
}
function getPercentage(result) {
    if (!result) return null;
    if (result.percentage !== undefined) {
        return Number(result.percentage);
    }
    if (Number(result.maxScore) > 0) {
        return Math.round(
            Number(result.score) / Number(result.maxScore) * 100
        );
    }
    return 0;
}
let html = `
    <div class="dynamics-section">
        <h2>ДАМУ ДИНАМИКАСЫ</h2>
        <button class="back-cabinet-button"
            onclick="backToCabinetMenu()">
            ← Кабинетке оралу
        </button>
        <p class="dynamics-description">
            Бұл бөлім бастапқы және қайталама диагностика
            нәтижелерін салыстыруға арналған.
        </p>
        <div class="dynamics-table-wrapper">
            <table class="dynamics-table">
                <thead>
                    <tr>
                        <th>Бағыттар</th>
                        <th>Бастапқы нәтиже</th>
                        <th>Қайталама нәтиже</th>
                        <th>Өзгеріс</th>
                    </tr>
                </thead>
                <tbody>
`;
let hasResults = false;
categories.forEach(category => {
    const initial = getLatestResult(category, "initial");
    const repeat = getLatestResult(category, "repeat");
    const initialPercent = getPercentage(initial);
    const repeatPercent = getPercentage(repeat);
    if (initial || repeat) hasResults = true;
    let difference = "—";
    if (initialPercent !== null && repeatPercent !== null) {
        const change = repeatPercent - initialPercent;
        if (change > 0) {
            difference = `+${change}%`;
        } else if (change < 0) {
            difference = `${change}%`;
        } else {
            difference = "0%";
        }
    }
    html += `
        <tr>
            <td>${category}</td>
            <td>${initialPercent === null ? "—" : initialPercent + "%"}</td>
            <td>${repeatPercent === null ? "—" : repeatPercent + "%"}</td>
            <td>${difference}</td>
        </tr>
    `;
});
html += `
                </tbody>
            </table>
        </div>
`;
if (!hasResults) {
    html += `
        <div class="dynamics-empty">
            <h3>Әзірге нәтиже жоқ</h3>
            <p>
                Даму динамикасын көру үшін алдымен бастапқы,
                кейін қайталама диагностиканы орындаңыз.
            </p>
            <button onclick="window.location.href='diagnostics.html'">
                Диагностикаға өту
            </button>
        </div>
    `;
} else {
    html += `
        <div class="dynamics-note">
            <h3>Ескерту</h3>
            <p>
                Көрсетілген пайыздар орындалған тапсырмалар
                нәтижесінің өзгерісін сипаттайды.
                Олар медициналық диагноз немесе афазияның
                ауырлық дәрежесін автоматты анықтамайды.
            </p>
        </div>
    `;
}
html += `</div>`;
content.innerHTML = html;

}
