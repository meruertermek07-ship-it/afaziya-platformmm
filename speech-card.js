const speechCardSections = [
{
title: “Сөйлеуді түсіну”,
items: [
“Жеке сөздерді түсіну”,
“Зат атауларын түсіну”,
“Қарапайым нұсқауларды орындау”,
“Күрделі нұсқауларды орындау”,
“Сөйлемдердің мағынасын түсіну”
]
},
{
title: “Экспрессивті сөйлеу”,
items: [
“Жеке сөздерді айту”,
“Қарапайым сөйлем құрау”,
“Сурет бойынша әңгімелеу”,
“Сұрақтарға жауап беру”,
“Өз ойын жеткізу”
]
},
{
title: “Сөздік қор”,
items: [
“Заттарды атау”,
“Әрекеттерді атау”,
“Суреттерді сипаттау”,
“Сөздерді мағынасына қарай топтастыру”,
“Қажетті сөзді еске түсіру”
]
},
{
title: “Қайталап айту”,
items: [
“Дыбыстарды қайталау”,
“Буындарды қайталау”,
“Жеке сөздерді қайталау”,
“Сөз тіркестерін қайталау”,
“Сөйлемдерді қайталау”
]
},
{
title: “Автоматтандырылған сөйлеу”,
items: [
“1-ден 10-ға дейін санау”,
“Апта күндерін айту”,
“Ай атауларын айту”,
“Таныс өлең жолдарын айту”,
“Автоматтандырылған тіркестерді айту”
]
},
{
title: “Оқу”,
items: [
“Әріптерді тану”,
“Буындарды оқу”,
“Жеке сөздерді оқу”,
“Сөйлемдерді оқу”,
“Оқыған мәтінді түсіну”
]
},
{
title: “Жазу”,
items: [
“Әріптерді жазу”,
“Сөздерді көшіру”,
“Диктант бойынша жазу”,
“Сөйлем құрастырып жазу”,
“Өздігінен жазу”
]
},
{
title: “Дыбыс айту және артикуляция”,
items: [
“Артикуляциялық қалыптарды орындау”,
“Дыбыстарды айту”,
“Буындарды айту”,
“Сөздердің дыбыстық құрамын сақтау”,
“Сөйлеу қарқыны мен анықтығы”
]
}
];

function loadSpeechCard() {
const patient = JSON.parse(
localStorage.getItem(“aphasiaPatient”) || “{}”
);

const content = document.getElementById("patientContent");
if (!content) return;
const saved = JSON.parse(
    localStorage.getItem("aphasiaSpeechCardData") || "{}"
);
let sectionsHTML = speechCardSections.map((section, index) => {
    return `
        <div class="speech-section">
            <h3>${index + 1}. ${section.title}</h3>
            ${section.items.map((item, itemIndex) => {
                const key = `s${index}_i${itemIndex}`;
                const selected = saved[key] ?? "";
                return `
                    <div class="speech-item">
                        <label>${item}</label>
                        <select data-key="${key}">
                            <option value="" ${selected === "" ? "selected" : ""}>
                                Бағалауды таңдаңыз
                            </option>
                            <option value="3" ${selected === "3" ? "selected" : ""}>
                                3 — толық орындайды
                            </option>
                            <option value="2" ${selected === "2" ? "selected" : ""}>
                                2 — аздаған қиындықпен
                            </option>
                            <option value="1" ${selected === "1" ? "selected" : ""}>
                                1 — елеулі қиындықпен
                            </option>
                            <option value="0" ${selected === "0" ? "selected" : ""}>
                                0 — орындай алмайды
                            </option>
                        </select>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}).join("");
content.innerHTML = `
    <style>
        .speech-card {
            color: #574735;
        }
        .speech-card h2 {
            color: #b58a43;
            text-align: center;
            margin-bottom: 10px;
        }
        .speech-card .subtitle {
            text-align: center;
            color: #8d7b65;
            margin-bottom: 25px;
        }
        .speech-section {
            background: white;
            border: 1px solid #eadcc3;
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 18px;
        }
        .speech-section h3 {
            color: #b58a43;
            margin-bottom: 17px;
        }
        .speech-item {
            display: grid;
            grid-template-columns: 1fr minmax(180px, 260px);
            gap: 12px;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #f0e7d7;
        }
        .speech-item:last-child {
            border-bottom: none;
        }
        .speech-item select,
        .speech-card input,
        .speech-card textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #eadcc3;
            border-radius: 9px;
            background: #fffaf0;
            color: #574735;
            font-size: 15px;
        }
        .speech-info {
            background: white;
            border: 1px solid #eadcc3;
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .speech-info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }
        .speech-field label {
            display: block;
            margin-bottom: 6px;
            font-size: 13px;
            color: #8d7b65;
        }
        .speech-field {
            min-width: 0;
        }
        .speech-card textarea {
            min-height: 90px;
            resize: vertical;
            margin-top: 8px;
        }
        .speech-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin: 20px 0;
        }
        .speech-actions button {
            flex: 1;
            min-width: 140px;
            padding: 14px;
            border: none;
            border-radius: 10px;
            background: #b58a43;
            color: white;
            font-weight: bold;
        }
        .speech-actions .secondary {
            background: #f8f0df;
            color: #574735;
            border: 1px solid #eadcc3;
        }
        @media(max-width:600px) {
            .speech-item {
                grid-template-columns: 1fr;
            }
            .speech-info-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
    <div class="speech-card">
        <h2>«ТІЛАШАР» ЛОГОПЕДИЯЛЫҚ КАБИНЕТІ</h2>
        <p class="subtitle">Афазиясы бар ересектерге арналған сөйлеу картасы</p>
        <div class="speech-info">
            <h3>1. Жалпы мәліметтер</h3>
            <div class="speech-info-grid">
                <div class="speech-field">
                    <label>Аты-жөні</label>
                    <input id="scName" value="${escapeHTML(patient.fullName || "")}">
                </div>
                <div class="speech-field">
                    <label>Туған күні</label>
                    <input id="scBirth" type="date" value="${escapeHTML(patient.birthDate || "")}">
                </div>
                <div class="speech-field">
                    <label>Жасы</label>
                    <input id="scAge" value="${escapeHTML(patient.age || "")}">
                </div>
                <div class="speech-field">
                    <label>Жынысы</label>
                    <select id="scGender">
                        <option value="">Таңдаңыз</option>
                        <option>Әйел</option>
                        <option>Ер</option>
                    </select>
                </div>
                <div class="speech-field">
                    <label>Білімі</label>
                    <input id="scEducation" placeholder="Білімі">
                </div>
                <div class="speech-field">
                    <label>Мамандығы</label>
                    <input id="scProfession" placeholder="Мамандығы">
                </div>
                <div class="speech-field">
                    <label>Негізгі қолы</label>
                    <select id="scHand">
                        <option value="">Таңдаңыз</option>
                        <option>Оң қол</option>
                        <option>Сол қол</option>
                    </select>
                </div>
                <div class="speech-field">
                    <label>Тексеру күні</label>
                    <input id="scDate" type="date">
                </div>
                <div class="speech-field">
                    <label>Диагноз</label>
                    <input id="scDiagnosis" value="${escapeHTML(patient.diagnosis || "")}">
                </div>
                <div class="speech-field">
                    <label>Логопедтің аты-жөні</label>
                    <input id="scLogoped" placeholder="Логопед">
                </div>
            </div>
        </div>
        <div class="speech-info">
            <h3>2. Анамнездік мәліметтер</h3>
            <label>Афазияның пайда болу себебі</label>
            <textarea id="scCause">${escapeHTML(saved.cause || "")}</textarea>
            <label>Ауру басталған күні</label>
            <input id="scIllnessDate" type="date">
            <label>Қосымша диагноздары</label>
            <textarea id="scExtraDiagnosis">${escapeHTML(saved.extraDiagnosis || "")}</textarea>
            <label>Бұрын жүргізілген оңалту жұмыстары</label>
            <textarea id="scRehabilitation">${escapeHTML(saved.rehabilitation || "")}</textarea>
            <label>Науқастың шағымдары</label>
            <textarea id="scComplaints">${escapeHTML(saved.complaints || "")}</textarea>
        </div>
        <h3 style="color:#b58a43;margin:20px 0;">
            3. Сөйлеу қызметін зерттеу
        </h3>
        ${sectionsHTML}
        <div class="speech-info">
            <h3>4. Танымдық қызметтер</h3>
            <label>Есту арқылы есте сақтау</label>
            <textarea id="scAuditoryMemory">${escapeHTML(saved.auditoryMemory || "")}</textarea>
            <label>Көру арқылы есте сақтау</label>
            <textarea id="scVisualMemory">${escapeHTML(saved.visualMemory || "")}</textarea>
            <label>Зейін</label>
            <textarea id="scAttention">${escapeHTML(saved.attention || "")}</textarea>
            <label>Ойлау</label>
            <textarea id="scThinking">${escapeHTML(saved.thinking || "")}</textarea>
            <label>Кеңістікті бағдарлау</label>
            <textarea id="scOrientation">${escapeHTML(saved.orientation || "")}</textarea>
        </div>
        <div class="speech-info">
            <h3>5. Логопедиялық қорытынды</h3>
            <label>Сақталған дағдылар</label>
            <textarea id="scPreserved">${escapeHTML(saved.preserved || "")}</textarea>
            <label>Қиындық туғызатын дағдылар</label>
            <textarea id="scDifficulties">${escapeHTML(saved.difficulties || "")}</textarea>
            <label>Логопедиялық қорытынды</label>
            <textarea id="scConclusion">${escapeHTML(saved.conclusion || "")}</textarea>
            <label>Түзету жұмысының ұсыныстары</label>
            <textarea id="scRecommendations">${escapeHTML(saved.recommendations || "")}</textarea>
        </div>
        <div class="speech-actions">
            <button onclick="saveSpeechCard()">САҚТАУ</button>
            <button class="secondary" onclick="window.print()">БАСЫП ШЫҒАРУ</button>
            <button class="secondary" onclick="backToCabinetMenu()">← КАБИНЕТКЕ ҚАЙТУ</button>
        </div>
        <p id="speechSaveMessage" style="color:#b58a43;"></p>
    </div>
`;
document.getElementById("scDate").value =
    saved.testDate || new Date().toISOString().slice(0, 10);
document.getElementById("scGender").value = saved.gender || "";
document.getElementById("scEducation").value = saved.education || "";
document.getElementById("scProfession").value = saved.profession || "";
document.getElementById("scHand").value = saved.hand || "";
document.getElementById("scLogoped").value = saved.logoped || "";
document.getElementById("scIllnessDate").value = saved.illnessDate || "";

}

function saveSpeechCard() {
const data = {};

document.querySelectorAll(".speech-card input, .speech-card select, .speech-card textarea")
    .forEach(element => {
        if (element.id) {
            data[element.id] = element.value;
        }
    });
document.querySelectorAll(".speech-card select[data-key]")
    .forEach(element => {
        data[element.dataset.key] = element.value;
    });
const textFields = [
    "cause", "extraDiagnosis", "rehabilitation", "complaints",
    "auditoryMemory", "visualMemory", "attention", "thinking",
    "orientation", "preserved", "difficulties", "conclusion",
    "recommendations"
];
textFields.forEach(key => {
    const element = document.getElementById("sc" +
        key.charAt(0).toUpperCase() + key.slice(1));
    if (element) data[key] = element.value;
});
data.gender = document.getElementById("scGender").value;
data.education = document.getElementById("scEducation").value;
data.profession = document.getElementById("scProfession").value;
data.hand = document.getElementById("scHand").value;
data.logoped = document.getElementById("scLogoped").value;
data.testDate = document.getElementById("scDate").value;
data.illnessDate = document.getElementById("scIllnessDate").value;
localStorage.setItem("aphasiaSpeechCardData", JSON.stringify(data));
const message = document.getElementById("speechSaveMessage");
if (message) message.textContent = "✓ Сөйлеу картасы сәтті сақталды!";

}
