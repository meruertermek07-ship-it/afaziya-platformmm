document.addEventListener(“DOMContentLoaded”, () => {
const dateInput = document.getElementById(“testDate”);

if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split("T")[0];
}
loadPatient();
const form = document.getElementById("patientForm");
if (form) {
    form.addEventListener("submit", savePatient);
}
const birthDate = document.getElementById("birthDate");
if (birthDate) {
    birthDate.addEventListener("change", calculateAge);
}

});

function calculateAge() {
const input = document.getElementById(“birthDate”);
const ageInput = document.getElementById(“age”);

if (!input || !ageInput || !input.value) return;
const birth = new Date(input.value);
const today = new Date();
let age = today.getFullYear() - birth.getFullYear();
const month = today.getMonth() - birth.getMonth();
if (
    month < 0 ||
    (month === 0 && today.getDate() < birth.getDate())
) {
    age--;
}
ageInput.value = age >= 0 ? age : "";

}

function getPatientId(patient) {
if (!patient || !patient.fullName || !patient.birthDate) {
return null;
}

return (
    patient.fullName.trim().toLowerCase() +
    "_" +
    patient.birthDate
);

}

function savePatient(event) {
event.preventDefault();

const patient = {
    fullName: document.getElementById("fullName").value.trim(),
    birthDate: document.getElementById("birthDate").value,
    age: document.getElementById("age").value,
    diagnosis: document.getElementById("diagnosis").value.trim(),
    testDate: document.getElementById("testDate").value
};
if (!patient.fullName || !patient.birthDate) {
    showMessage("Аты-жөні мен туған күнін енгізіңіз.", "error");
    return;
}
patient.patientId = getPatientId(patient);
localStorage.setItem(
    "aphasiaPatient",
    JSON.stringify(patient)
);
showMessage("Пациент мәліметтері сақталды!", "success");

}

function loadPatient() {
const saved = localStorage.getItem(“aphasiaPatient”);

if (!saved) return;
try {
    const patient = JSON.parse(saved);
    const fields = {
        fullName: patient.fullName,
        birthDate: patient.birthDate,
        age: patient.age,
        diagnosis: patient.diagnosis,
        testDate: patient.testDate
    };
    Object.keys(fields).forEach(id => {
        const element = document.getElementById(id);
        if (element && fields[id]) {
            element.value = fields[id];
        }
    });
} catch (error) {
    console.error("Пациент мәліметтерін оқу қатесі:", error);
}

}

function showMessage(message, type = “success”) {
const box = document.getElementById(“patientMessage”);

if (!box) return;
box.textContent = message;
box.className = "message " + type;

}

function showPatientSection(section) {
const menu = document.getElementById(“cabinetMenu”);
const content = document.getElementById(“patientContent”);

if (!content) return;
if (menu) menu.style.display = "none";
content.style.display = "block";
content.innerHTML = "";
if (section === "speechCard") {
    if (typeof loadSpeechCard === "function") {
        loadSpeechCard();
    } else {
        content.innerHTML = "<p>Сөйлеу картасы файлы жүктелмеді.</p>";
    }
}
else if (section === "diagnostics") {
    window.location.href = "diagnostics.html";
}
else if (section === "initialResult") {
    showInitialResult();
}
else if (section === "dynamics") {
    if (typeof loadDynamics === "function") {
        loadDynamics();
    } else {
        content.innerHTML = "<p>Даму динамикасы файлы жүктелмеді.</p>";
    }
}

}

function showInitialResult() {
const content = document.getElementById(“patientContent”);

const patientData = localStorage.getItem("aphasiaPatient");
if (!patientData) {
    content.innerHTML = `
        <h2>Бастапқы нәтиже</h2>
        <p>Алдымен пациент мәліметтерін енгізіп, сақтаңыз.</p>
        <button onclick="backToCabinetMenu()">Артқа</button>
    `;
    return;
}
const patient = JSON.parse(patientData);
const patientId = getPatientId(patient);
const allResults = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
const results = allResults.filter(result =>
    result.patientId === patientId &&
    result.assessmentType === "initial" &&
    result.completed === true
);
if (results.length === 0) {
    content.innerHTML = `
        <h2>БАСТАПҚЫ НӘТИЖЕ</h2>
        <h3>${escapeHTML(patient.fullName)}</h3>
        <p>Әзірге бастапқы диагностика нәтижесі жоқ.</p>
        <p>Нәтижені көру үшін диагностика бөліміндегі тапсырмаларды орындаңыз.</p>
        <button onclick="window.location.href='diagnostics.html'">
            ДИАГНОСТИКАҒА ӨТУ
        </button>
        <button onclick="backToCabinetMenu()">АРТҚА</button>
    `;
    return;
}
const categories = {};
results.forEach(result => {
    const key = result.categoryKey || result.category;
    if (
        !categories[key] ||
        Number(result.timestamp) > Number(categories[key].timestamp)
    ) {
        categories[key] = result;
    }
});
const list = Object.values(categories);
const totalScore = list.reduce(
    (sum, item) => sum + Number(item.score || 0), 0
);
const totalMax = list.reduce(
    (sum, item) => sum + Number(item.maxScore || 0), 0
);
const percentage = totalMax > 0
    ? Math.round((totalScore / totalMax) * 100)
    : 0;
content.innerHTML = `
    <div class="result-box">
        <h2>БАСТАПҚЫ ДИАГНОСТИКА НӘТИЖЕСІ</h2>
        <h3>${escapeHTML(patient.fullName)}</h3>
        <p><b>Туған күні:</b> ${escapeHTML(patient.birthDate)}</p>
        <p><b>Диагноз:</b> ${escapeHTML(patient.diagnosis || "Көрсетілмеген")}</p>
        <div class="result-summary">
            <h2>${percentage}%</h2>
            <p>Жалпы жинақталған көрсеткіш</p>
            <p>${totalScore} / ${totalMax} балл</p>
        </div>
        <h3>Бөлімдер бойынша нәтиже</h3>
        <div class="result-list">
            ${list.map(item => `
                <div class="result-item">
                    <b>${escapeHTML(item.category)}</b>
                    <p>${item.score} / ${item.maxScore} балл</p>
                    <p>${item.percentage}%</p>
                    <div class="progress">
                        <div class="progress-fill"
                             style="width:${Math.min(100, Math.max(0, Number(item.percentage) || 0))}%">
                        </div>
                    </div>
                </div>
            `).join("")}
        </div>
        <p><b>Соңғы тапсырма күні:</b> ${
            escapeHTML(
                list
                    .map(item => item.date || "")
                    .filter(Boolean)
                    .sort()
                    .pop() || "Көрсетілмеген"
            )
        }</p>
        <p class="note">
            Бұл көрсеткіштер орындалған диагностикалық тапсырмалар
            бойынша есептелді. Клиникалық қорытындыны логопед жасайды.
        </p>
        <button onclick="backToCabinetMenu()">АРТҚА</button>
    </div>
`;

}

function backToCabinetMenu() {
const content = document.getElementById(“patientContent”);
const menu = document.getElementById(“cabinetMenu”);

if (content) {
    content.style.display = "none";
    content.innerHTML = "";
}
if (menu) {
    menu.style.display = "grid";
}

}

function escapeHTML(value) {
return String(value ?? “”).replace(/[&<>”’]/g, character => {
const entities = {
“&”: “&”,
“<”: “<”,
“>”: “>”,
‘”’: “"”,
“’”: “'”
};

    return entities[character];
});

}
