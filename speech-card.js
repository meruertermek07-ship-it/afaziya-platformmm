const speechAssessmentCategories = [
{
title: “1. Сөйлеуді түсіну”,
items: [
“Жеке сөздерді түсіну”,
“Қарапайым нұсқауларды орындау”,
“Күрделі нұсқауларды орындау”,
“Сөйлемдердің мағынасын түсіну”,
“Әңгіме мазмұнын түсіну”
]
},
{
title: “2. Экспрессивті сөйлеу”,
items: [
“Жеке сөздерді айту”,
“Қарапайым сөйлем құрау”,
“Сурет бойынша әңгімелеу”,
“Өз ойын жеткізу”,
“Диалогқа қатысу”
]
},
{
title: “3. Сөздік қор”,
items: [
“Заттардың атауын білу”,
“Әрекеттерді атау”,
“Сөздерді мағынасына қарай топтау”,
“Қажетті сөзді табу”,
“Сөздерді сөйлемде қолдану”
]
},
{
title: “4. Қайталап айту”,
items: [
“Дыбыстарды қайталау”,
“Буындарды қайталау”,
“Қысқа сөздерді қайталау”,
“Ұзын сөздерді қайталау”,
“Сөйлемдерді қайталау”
]
},
{
title: “5. Автоматтандырылған сөйлеу”,
items: [
“Санау”,
“Апта күндерін айту”,
“Ай атауларын айту”,
“Таныс өлеңдерді айту”,
“Күнделікті қалыптасқан тіркестерді айту”
]
},
{
title: “6. Оқу”,
items: [
“Әріптерді тану”,
“Буындарды оқу”,
“Сөздерді оқу”,
“Сөйлемдерді оқу”,
“Мәтінді түсініп оқу”
]
},
{
title: “7. Жазу”,
items: [
“Әріптерді жазу”,
“Сөздерді көшіріп жазу”,
“Сөздерді есту бойынша жазу”,
“Сөйлем құрастырып жазу”,
“Өз ойын жазбаша жеткізу”
]
},
{
title: “8. Дыбыс айту және артикуляция”,
items: [
“Артикуляциялық қимылдарды орындау”,
“Дыбыстарды айту”,
“Буындарды айту”,
“Сөздердегі дыбыстарды айту”,
“Сөйлеу кезіндегі артикуляциялық үйлесімділік”
]
}
];

function getSpeechPatient() {
const saved = localStorage.getItem(“aphasiaPatient”);

if (!saved) return null;
try {
    const patient = JSON.parse(saved);
    if (!patient.fullName || !patient.birthDate) return null;
    return patient;
} catch (error) {
    return null;
}

}

function getSpeechPatientId(patient) {
return patient.fullName.trim().toLowerCase() + “_” + patient.birthDate;
}

function loadSpeechCard() {
const content = document.getElementById(“patientContent”);

if (!content) return;
const patient = getSpeechPatient();
if (!patient) {
    content.innerHTML = `
        <h2>СӨЙЛЕУ КАРТАСЫ</h2>
        <p>Алдымен пациенттің аты-жөні мен туған күнін енгізіп сақтаңыз.</p>
        <button onclick="backToCabinetMenu()">АРТҚА</button>
    `;
    return;
}
const patientId = getSpeechPatientId(patient);
const allCards = JSON.parse(
    localStorage.getItem("aphasiaSpeechCardData") || "{}"
);
const data = allCards[patientId] || {};
let assessmentHTML = "";
speechAssessmentCategories.forEach((category, categoryIndex) => {
    assessmentHTML += `
        <div class="speech-category">
            <h3>${category.title}</h3>
            ${category.items.map((item, itemIndex) => {
                const key = `score_${categoryIndex}_${itemIndex}`;
                const savedScore = data[key] ?? "";
                return `
                    <div class="speech-assessment-item">
                        <label>${item}</label>
                        <select name="${key}">
                            <option value="">Баға таңдаңыз</option>
                            <option value="3" ${savedScore === "3" || savedScore === 3 ? "selected" : ""}>3 — Толық орындайды</option>
                            <option value="2" ${savedScore === "2" || savedScore === 2 ? "selected" : ""}>2 — Аздаған қиындықпен</option>
                            <option value="1" ${savedScore === "1" || savedScore === 1 ? "selected" : ""}>1 — Елеулі қиындықпен</option>
                            <option value="0" ${savedScore === "0" || savedScore === 0 ? "selected" : ""}>0 — Орындай алмайды</option>
                        </select>
                    </div>
                `;
            }).join("")}
        </div>
    `;
});
content.innerHTML = `
    <div class="speech-card-container">
        <div class="speech-card-heading">
            <h2>«ТІЛАШАР» ЛОГОПЕДИЯЛЫҚ КАБИНЕТІ</h2>
            <h3>СӨЙЛЕУ КАРТАСЫ</h3>
            <p>Афазиясы бар ересектерге арналған</p>
        </div>
        <form id="speechCardForm">
            <h3>1. ЖАЛПЫ МӘЛІМЕТТЕР</h3>
            <div class="speech-form-grid">
                ${speechInput("Аты-жөні", "fullName", patient.fullName)}
                ${speechInput("Туған күні", "birthDate", patient.birthDate, "date")}
                ${speechInput("Жасы", "age", patient.age || "")}
                ${speechInput("Жынысы", "gender", data.gender || "")}
                ${speechInput("Білімі", "education", data.education || "")}
                ${speechInput("Мамандығы", "profession", data.profession || "")}
                ${speechInput("Жетекші қолы", "dominantHand", data.dominantHand || "")}
                ${speechInput("Диагнозы", "diagnosis", patient.diagnosis || "")}
                ${speechInput("Тексеру күні", "testDate", patient.testDate || "", "date")}
                ${speechInput("Логопедтің аты-жөні", "logopedist", data.logopedist || "")}
            </div>
            <h3>2. АНАМНЕЗ</h3>
            ${speechTextarea("Аурудың пайда болу себебі", "cause", data.cause)}
            ${speechTextarea("Ауру басталған уақыт", "illnessDate", data.illnessDate)}
            ${speechTextarea("Қосымша диагноздар", "additionalDiagnoses", data.additionalDiagnoses)}
            ${speechTextarea("Бұрын жүргізілген оңалту жұмыстары", "previousRehabilitation", data.previousRehabilitation)}
            ${speechTextarea("Пациенттің негізгі шағымдары", "complaints", data.complaints)}
            <h3>3. СӨЙЛЕУ ДАҒДЫЛАРЫН БАҒАЛАУ</h3>
            <p class="speech-note">
                Әр дағдыны 0–3 балл аралығында бағалаңыз.
                Бағалау логопедтің бақылауы негізінде жүргізіледі.
            </p>
            ${assessmentHTML}
            <h3>4. ТАНЫМДЫҚ ҮДЕРІСТЕР</h3>
            ${speechTextarea("Есту арқылы есте сақтау", "auditoryMemory", data.auditoryMemory)}
            ${speechTextarea("Көру арқылы есте сақтау", "visualMemory", data.visualMemory)}
            ${speechTextarea("Зейіні", "attention", data.attention)}
            ${speechTextarea("Ойлау ерекшеліктері", "thinking", data.thinking)}
            ${speechTextarea("Кеңістікте және уақытта бағдарлануы", "orientation", data.orientation)}
            <h3>5. ЛОГОПЕДИЯЛЫҚ ҚОРЫТЫНДЫ</h3>
            ${speechTextarea("Сақталған сөйлеу дағдылары", "preservedSkills", data.preservedSkills)}
            ${speechTextarea("Қиындықтары", "difficulties", data.difficulties)}
            ${speechTextarea("Логопедтің қорытындысы", "conclusion", data.conclusion)}
            ${speechTextarea("Ұсыныстар", "recommendations", data.recommendations)}
            <button type="submit" class="speech-save-button">
                СӨЙЛЕУ КАРТАСЫН САҚТАУ
            </button>
            <p id="speechCardMessage"></p>
        </form>
        <button onclick="backToCabinetMenu()" class="speech-back-button">
            ← КАБИНЕТКЕ ҚАЙТУ
        </button>
    </div>
`;
addSpeechCardStyles();
document.getElementById("speechCardForm")
    .addEventListener("submit", saveSpeechCard);

}

function speechInput(label, name, value = “”, type = “text”) {
return <div class="speech-field"> <label>${label}</label> <input type="${type}" name="${name}" value="${escapeHTML(value || "")}" ${name === "fullName" || name === "birthDate" ? "readonly" : ""} > </div>;
}

function speechTextarea(label, name, value = “”) {
return <div class="speech-field speech-wide"> <label>${label}</label> <textarea name="${name}" rows="3">${escapeHTML(value || "")}</textarea> </div>;
}

function saveSpeechCard(event) {
event.preventDefault();

const patient = getSpeechPatient();
if (!patient) {
    alert("Пациент мәліметтері табылмады.");
    return;
}
const patientId = getSpeechPatientId(patient);
const form = document.getElementById("speechCardForm");
const formData = new FormData(form);
const cardData = {};
formData.forEach((value, key) => {
    cardData[key] = value;
});
cardData.patientId = patientId;
cardData.savedAt = new Date().toISOString();
const allCards = JSON.parse(
    localStorage.getItem("aphasiaSpeechCardData") || "{}"
);
allCards[patientId] = cardData;
localStorage.setItem(
    "aphasiaSpeechCardData",
    JSON.stringify(allCards)
);
const message = document.getElementById("speechCardMessage");
if (message) {
    message.textContent = "Сөйлеу картасы сәтті сақталды!";
    message.className = "speech-success";
}

}

function addSpeechCardStyles() {
if (document.getElementById(“speech-card-styles”)) return;

const style = document.createElement("style");
style.id = "speech-card-styles";
style.textContent = `
    .speech-card-container {
        max-width: 950px;
        margin: 20px auto;
        padding: 25px;
        background: #fff;
        border: 1px solid #ead9b7;
        border-radius: 20px;
        color: #493b2b;
    }
    .speech-card-heading {
        text-align: center;
        margin-bottom: 30px;
    }
    .speech-card-heading h2,
    .speech-card-heading h3 {
        color: #a77a27;
    }
    .speech-card-container h3 {
        color: #98702c;
        margin-top: 28px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ead9b7;
    }
    .speech-form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }
    .speech-field {
        display: flex;
        flex-direction: column;
        gap: 7px;
        margin: 12px 0;
    }
    .speech-field label,
    .speech-assessment-item label {
        font-weight: bold;
    }
    .speech-field input,
    .speech-field textarea,
    .speech-assessment-item select {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddc99f;
        border-radius: 9px;
        background: #fffdf8;
        color: #493b2b;
        font-size: 15px;
    }
    .speech-field input[readonly] {
        background: #f5f0e5;
    }
    .speech-wide {
        width: 100%;
    }
    .speech-category {
        padding: 16px;
        margin: 18px 0;
        border: 1px solid #ead9b7;
        border-radius: 14px;
        background: #fffdf8;
    }
    .speech-assessment-item {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 12px;
        margin: 12px 0;
    }
    .speech-note {
        line-height: 1.6;
        color: #776b59;
    }
    .speech-save-button {
        width: 100%;
        margin-top: 25px;
        padding: 16px;
        background: #b58a3b;
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
    }
    .speech-back-button {
        background: #776b59;
        color: white;
        border: none;
        padding: 13px 18px;
        border-radius: 10px;
        cursor: pointer;
        margin-top: 15px;
    }
    .speech-success {
        padding: 12px;
        background: #e9f7e9;
        color: #286b35;
        border-radius: 9px;
        text-align: center;
    }
    @media(max-width: 650px) {
        .speech-card-container {
            padding: 15px;
        }
        .speech-form-grid {
            grid-template-columns: 1fr;
        }
        .speech-assessment-item {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

}
