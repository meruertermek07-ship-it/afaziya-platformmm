function loadSpeechCard() {
const content = document.getElementById(“patientContent”);
if (!content) return;

const patient = JSON.parse(
    localStorage.getItem("aphasiaPatient") || "{}"
);
const saved = JSON.parse(
    localStorage.getItem("aphasiaSpeechCardData") || "{}"
);
const sections = [
    {
        title: "1. Сөйлеуді түсіну",
        tasks: [
            "Жеке сөздерді түсіну",
            "Қарапайым нұсқауларды түсіну",
            "Күрделі нұсқауларды түсіну",
            "Сұрақтарды түсіну",
            "Сөйлемдердің мағынасын түсіну"
        ]
    },
    {
        title: "2. Сөздік қор және атау",
        tasks: [
            "Заттарды атау",
            "Суреттерді атау",
            "Әрекеттерді атау",
            "Сөздерді еске түсіру",
            "Заттардың қызметін түсіндіру"
        ]
    },
    {
        title: "3. Ауызша сөйлеу",
        tasks: [
            "Жеке сөздерді айту",
            "Қарапайым сөйлем құрастыру",
            "Күрделі сөйлем құрастыру",
            "Сурет бойынша әңгімелеу",
            "Өз ойын жеткізу"
        ]
    },
    {
        title: "4. Қайталап айту",
        tasks: [
            "Дыбыстарды қайталау",
            "Буындарды қайталау",
            "Жеке сөздерді қайталау",
            "Сөз тіркестерін қайталау",
            "Сөйлемдерді қайталау"
        ]
    },
    {
        title: "5. Оқу дағдылары",
        tasks: [
            "Әріптерді тану",
            "Буындарды оқу",
            "Сөздерді оқу",
            "Сөйлемдерді оқу",
            "Оқығанын түсіну"
        ]
    },
    {
        title: "6. Жазу дағдылары",
        tasks: [
            "Әріптерді жазу",
            "Сөздерді көшіріп жазу",
            "Есту арқылы жазу",
            "Сөйлемдерді жазу",
            "Өздігінен мәтін құрастыру"
        ]
    }
];
const patientName = patient.fullName || "";
const patientAge = patient.age || "";
const patientDiagnosis = patient.diagnosis || "";
let html = `
    <style>
        .speech-card {
            color: #574735;
            font-family: Arial, sans-serif;
        }
        .speech-card h2,
        .speech-card h3 {
            color: #b58a43;
        }
        .speech-card .sc-intro {
            background: #fffaf0;
            border: 1px solid #eadcc3;
            border-radius: 14px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .speech-card .sc-section {
            background: #fffdf8;
            border: 1px solid #eadcc3;
            border-radius: 14px;
            padding: 20px;
            margin: 20px 0;
        }
        .speech-card input,
        .speech-card textarea,
        .speech-card select {
            width: 100%;
            padding: 11px;
            border: 1px solid #dfcfb2;
            border-radius: 8px;
            background: white;
            color: #574735;
            margin: 6px 0 14px;
        }
        .speech-card textarea {
            min-height: 80px;
            resize: vertical;
        }
        .speech-card table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        .speech-card th,
        .speech-card td {
            border: 1px solid #eadcc3;
            padding: 10px;
            text-align: left;
        }
        .speech-card th {
            background: #f5ead6;
            color: #8b672f;
        }
        .speech-card .sc-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 20px;
        }
        .speech-card button {
            border: none;
            border-radius: 9px;
            background: #b58a43;
            color: white;
            padding: 12px 18px;
            cursor: pointer;
            font-weight: bold;
        }
        .speech-card .sc-back {
            background: #8c795f;
        }
        @media(max-width:600px) {
            .speech-card table {
                font-size: 12px;
            }
            .speech-card th,
            .speech-card td {
                padding: 6px;
            }
        }
        @media print {
            .speech-card .sc-actions,
            .speech-card .sc-back {
                display: none;
            }
        }
    </style>
    <div class="speech-card">
        <button class="sc-back" onclick="backToCabinetMenu()">
            ← Кабинетке оралу
        </button>
        <div class="sc-intro">
            <h2>ТІЛАШАР</h2>
            <h3>ЭЛЕКТРОНДЫ СӨЙЛЕУ КАРТАСЫ</h3>
            <p>Афазиясы бар ересектерге арналған логопедиялық бақылау картасы.</p>
            <p>
                Мақсаты: сөйлеу дағдыларының қазіргі жағдайын
                тіркеу, қиындықтарды белгілеу және түзету жұмысын жоспарлау.
            </p>
        </div>
        <div class="sc-section">
            <h3>1. ЖАЛПЫ МӘЛІМЕТТЕР</h3>
            <label>Аты-жөні</label>
            <input id="sc_name" value="${escapeHTML(patientName)}">
            <label>Жасы</label>
            <input id="sc_age" value="${escapeHTML(patientAge)}">
            <label>Диагнозы</label>
            <input id="sc_diagnosis" value="${escapeHTML(patientDiagnosis)}">
            <label>Тексеру күні</label>
            <input id="sc_date" type="date" value="${escapeHTML(patient.testDate || "")}">
        </div>
        <div class="sc-section">
            <h3>2. ЖАЛПЫ БАҚЫЛАУ</h3>
            <label>Жалпы жағдайы</label>
            <select id="sc_general">
                <option value="">Таңдаңыз</option>
                <option>Қанағаттанарлық</option>
                <option>Орташа</option>
                <option>Қосымша бақылау қажет</option>
            </select>
            <label>Қарым-қатынасқа түсуі</label>
            <select id="sc_communication">
                <option value="">Таңдаңыз</option>
                <option>Белсенді</option>
                <option>Көмекпен қатысады</option>
                <option>Қарым-қатынасқа түсуі шектеулі</option>
            </select>
            <label>Қосымша бақылау</label>
            <textarea id="sc_observation" placeholder="Бақылау нәтижесін енгізіңіз..."></textarea>
        </div>
`;
sections.forEach((section, sectionIndex) => {
    html += `
        <div class="sc-section">
            <h3>${section.title}</h3>
            <p>
                Бағалау шкаласы:
                3 – толық орындайды;
                2 – аздаған көмекпен;
                1 – едәуір көмекпен;
                0 – орындай алмайды.
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Бағалау тапсырмасы</th>
                        <th>Ұпай (0–3)</th>
                    </tr>
                </thead>
                <tbody>
    `;
    section.tasks.forEach((task, taskIndex) => {
        const id = `sc_${sectionIndex}_${taskIndex}`;
        html += `
            <tr>
                <td>${task}</td>
                <td>
                    <select id="${id}" class="sc-score">
                        <option value="">—</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </td>
            </tr>
        `;
    });
    html += `
                </tbody>
            </table>
        </div>
    `;
});
html += `
        <div class="sc-section">
            <h3>3. ЛОГОПЕД ҚОРЫТЫНДЫСЫ</h3>
            <label>Анықталған қиындықтар</label>
            <textarea id="sc_difficulties"></textarea>
            <label>Сақталған дағдылар</label>
            <textarea id="sc_strengths"></textarea>
            <label>Түзету жұмысының мақсаттары</label>
            <textarea id="sc_goals"></textarea>
            <label>Логопедтің қорытындысы</label>
            <textarea id="sc_conclusion"></textarea>
            <label>Логопедтің аты-жөні</label>
            <input id="sc_logopedist">
        </div>
        <div class="sc-actions">
            <button onclick="saveSpeechCard()">САҚТАУ</button>
            <button onclick="window.print()">БАСЫП ШЫҒАРУ</button>
            <button onclick="exportSpeechCard()">JSON ЖҮКТЕУ</button>
        </div>
        <p id="sc_message"></p>
    </div>
`;
content.innerHTML = html;
// Бұрын сақталған деректерді енгізу
Object.entries(saved).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element && value !== undefined && value !== null) {
        element.value = value;
    }
});

}

// Сөйлеу картасын сақтау
function saveSpeechCard() {
const content = document.getElementById(“patientContent”);
if (!content) return;

const data = {};
content.querySelectorAll(
    ".speech-card input, .speech-card textarea, .speech-card select"
).forEach(element => {
    if (element.id) {
        data[element.id] = element.value;
    }
});
localStorage.setItem(
    "aphasiaSpeechCardData",
    JSON.stringify(data)
);
const message = document.getElementById("sc_message");
if (message) {
    message.textContent = "Сөйлеу картасы сәтті сақталды!";
    message.style.color = "#54834e";
}

}

// JSON файлын жүктеу
function exportSpeechCard() {
const data = JSON.parse(
localStorage.getItem(“aphasiaSpeechCardData”) || “{}”
);

const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
);
const url = URL.createObjectURL(blob);
const link = document.createElement("a");
link.href = url;
link.download = "tilashar-soyleu-kartasy.json";
link.click();
URL.revokeObjectURL(url);

}
