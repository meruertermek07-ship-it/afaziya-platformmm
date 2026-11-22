function loadDynamics() {
const content = document.getElementById(“patientContent”);
if (!content) return;

const results = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
const categories = [
    { key: "understanding", name: "Сөйлеуді түсіну" },
    { key: "naming", name: "Заттарды атау" },
    { key: "repetition", name: "Қайталап айту" },
    { key: "vocabulary", name: "Сөздік қор" },
    { key: "reading", name: "Оқу" },
    { key: "writing", name: "Жазу" }
];
function latestResult(key, type) {
    return results
        .filter(item =>
            item.categoryKey === key &&
            item.assessmentType === type
        )
        .slice(-1)[0];
}
function percentage(result) {
    if (!result) return null;
    if (result.percentage !== undefined) {
        return Number(result.percentage);
    }
    return result.maxScore
        ? Math.round(result.score / result.maxScore * 100)
        : 0;
}
let rows = "";
let initialTotal = 0;
let repeatTotal = 0;
let initialCount = 0;
let repeatCount = 0;
categories.forEach(category => {
    const initial = latestResult(category.key, "initial");
    const repeat = latestResult(category.key, "repeat");
    const first = percentage(initial);
    const second = percentage(repeat);
    if (first !== null) {
        initialTotal += first;
        initialCount++;
    }
    if (second !== null) {
        repeatTotal += second;
        repeatCount++;
    }
    let change = "—";
    if (first !== null && second !== null) {
        const difference = second - first;
        change = difference > 0
            ? `+${difference}%`
            : `${difference}%`;
    }
    rows += `
        <tr>
            <td>${category.name}</td>
            <td>${first === null ? "—" : first + "%"}</td>
            <td>${second === null ? "—" : second + "%"}</td>
            <td>${change}</td>
        </tr>
    `;
});
const initialAverage = initialCount
    ? Math.round(initialTotal / initialCount)
    : null;
const repeatAverage = repeatCount
    ? Math.round(repeatTotal / repeatCount)
    : null;
let overallChange = "—";
if (initialAverage !== null && repeatAverage !== null) {
    const difference = repeatAverage - initialAverage;
    overallChange = difference > 0
        ? `+${difference}%`
        : `${difference}%`;
}
content.innerHTML = `
    <style>
        .dynamics-page {
            color: #574735;
            font-family: Arial, sans-serif;
        }
        .dynamics-page h2,
        .dynamics-page h3 {
            color: #b58a43;
        }
        .dynamics-description,
        .dynamics-summary,
        .dynamics-note {
            background: #fffaf0;
            border: 1px solid #eadcc3;
            border-radius: 14px;
            padding: 18px;
            margin: 18px 0;
        }
        .dynamics-table-wrap {
            overflow-x: auto;
        }
        .dynamics-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 480px;
            background: white;
        }
        .dynamics-table th,
        .dynamics-table td {
            padding: 14px;
            border: 1px solid #eadcc3;
            text-align: center;
        }
        .dynamics-table th {
            background: #f5ead6;
            color: #8b672f;
        }
        .dynamics-table td:first-child {
            text-align: left;
        }
        .dynamics-stat {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin: 20px 0;
        }
        .dynamics-stat div {
            background: white;
            border: 1px solid #eadcc3;
            padding: 18px;
            border-radius: 13px;
            text-align: center;
        }
        .dynamics-stat strong {
            display: block;
            color: #b58a43;
            font-size: 25px;
            margin-top: 8px;
        }
        @media(max-width:600px) {
            .dynamics-stat {
                grid-template-columns: 1fr;
            }
        }
    </style>
    <div class="dynamics-page">
        <button class="back-button"
            onclick="backToCabinetMenu()">
            ← Кабинетке оралу
        </button>
        <h2>ДАМУ ДИНАМИКАСЫ</h2>
        <div class="dynamics-description">
            <p>
                Бұл бөлім науқастың бастапқы және қайталама
                диагностика нәтижелерін салыстыруға арналған.
            </p>
        </div>
        <div class="dynamics-stat">
            <div>
                Бастапқы орташа көрсеткіш
                <strong>${initialAverage === null ? "—" : initialAverage + "%"}</strong>
            </div>
            <div>
                Қайталама орташа көрсеткіш
                <strong>${repeatAverage === null ? "—" : repeatAverage + "%"}</strong>
            </div>
            <div>
                Жалпы өзгеріс
                <strong>${overallChange}</strong>
            </div>
        </div>
        <h3>НӘТИЖЕЛЕРДІ САЛЫСТЫРУ</h3>
        <div class="dynamics-table-wrap">
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
                    ${rows}
                </tbody>
            </table>
        </div>
        <div class="dynamics-note">
            <h3>Ескерту</h3>
            <p>
                Нәтижелер орындалған тапсырмалар бойынша есептеледі.
                Олар клиникалық диагнозды немесе афазияның
                ауырлық дәрежесін автоматты түрде анықтамайды.
                Қорытындыны логопед маман шығарады.
            </p>
        </div>
    </div>
`;

}
