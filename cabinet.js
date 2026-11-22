// =====================================
// ЛОГОПЕД КАБИНЕТІ
// =====================================

// Пациент деректерін жүктеу
document.addEventListener(“DOMContentLoaded”, function () {
const birthInput = document.getElementById(“birthDate”);
const ageInput = document.getElementById(“age”);
const dateInput = document.getElementById(“testDate”);
const patientForm = document.getElementById(“patientForm”);

// Бүгінгі күнді автоматты қою
if (dateInput && !dateInput.value) {
    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];
    dateInput.value = localDate;
}
// Туған күн бойынша жасты есептеу
if (birthInput && ageInput) {
    birthInput.addEventListener("change", function () {
        ageInput.value = calculateAge(birthInput.value);
    });
}
// Бұрын сақталған пациент деректерін шығару
loadPatient();
// Пациент мәліметтерін сақтау
if (patientForm) {
    patientForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const patient = {
            fullName: document.getElementById("fullName").value.trim(),
            birthDate: document.getElementById("birthDate").value,
            age: document.getElementById("age").value,
            diagnosis: document.getElementById("diagnosis").value.trim(),
            testDate: document.getElementById("testDate").value
        };
        if (!patient.fullName || !patient.birthDate) {
            alert("Пациенттің аты-жөні мен туған күнін енгізіңіз!");
            return;
        }
        localStorage.setItem(
            "aphasiaPatient",
            JSON.stringify(patient)
        );
        alert("Пациент мәліметтері сәтті сақталды!");
        loadPatient();
    });
}

});

// =====================================
// ЖАСЫН ЕСЕПТЕУ
// =====================================

function calculateAge(birthDate) {
if (!birthDate) return “”;

const birth = new Date(birthDate);
const today = new Date();
let age = today.getFullYear() - birth.getFullYear();
const monthDifference = today.getMonth() - birth.getMonth();
if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
) {
    age--;
}
return age >= 0 ? age : "";

}

// =====================================
// ПАЦИЕНТ ДЕРЕКТЕРІН ЖҮКТЕУ
// =====================================

function loadPatient() {
const savedPatient = localStorage.getItem(“aphasiaPatient”);

if (!savedPatient) return;
const patient = JSON.parse(savedPatient);
const fullName = document.getElementById("fullName");
const birthDate = document.getElementById("birthDate");
const age = document.getElementById("age");
const diagnosis = document.getElementById("diagnosis");
const testDate = document.getElementById("testDate");
if (fullName) fullName.value = patient.fullName || "";
if (birthDate) birthDate.value = patient.birthDate || "";
if (age) age.value = patient.age || "";
if (diagnosis) diagnosis.value = patient.diagnosis || "";
if (testDate) testDate.value = patient.testDate || "";

}

// =====================================
// КАБИНЕТ БӨЛІМДЕРІН АШУ
// =====================================

function showPatientSection(section) {
const content = document.getElementById(“patientContent”);

if (!content) return;
const savedPatient = localStorage.getItem("aphasiaPatient");
if (!savedPatient) {
    content.style.display = "block";
    content.innerHTML = `
        <h2>Пациент тіркелмеген</h2>
        <p>Алдымен пациенттің мәліметтерін енгізіп, сақтаңыз.</p>
    `;
    return;
}
const patient = JSON.parse(savedPatient);
content.style.display = "block";
// СӨЙЛЕУ КАРТАСЫ
if (section === "speechCard") {
    if (typeof loadSpeechCard === "function") {
        loadSpeechCard();
    } else {
        content.innerHTML = `
            <h2>Сөйлеу картасы</h2>
            <p>Сөйлеу картасы модулі әлі қосылмаған.</p>
        `;
    }
    return;
}
// ДИАГНОСТИКА
if (section === "diagnostics") {
    window.location.href = "diagnostics.html";
    return;
}
// БАСТАПҚЫ НӘТИЖЕ
if (section === "initialResult") {
    showInitialResult();
    return;
}
// ДИНАМИКА
if (section === "dynamics") {
    if (typeof loadDynamics === "function") {
        loadDynamics();
    } else {
        content.innerHTML = `
            <h2>Диагностика динамикасы</h2>
            <p>Динамика бөлімі келесі кезеңде қосылады.</p>
        `;
    }
    return;
}

}

// =====================================
// БАСТАПҚЫ ДИАГНОСТИКА НӘТИЖЕСІ
// =====================================

function showInitialResult() {
const content = document.getElementById(“patientContent”);

const allResults = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
const initialResults = allResults.filter(
    result => result.assessmentType === "initial"
);
if (initialResults.length === 0) {
    content.innerHTML = `
        <h2>Бастапқы диагностика нәтижесі</h2>
        <p>Әзірге бастапқы диагностика нәтижелері сақталмаған.</p>
        <button onclick="window.location.href='diagnostics.html'">
            Диагностиканы бастау
        </button>
    `;
    return;
}
let html = `
    <h2>Бастапқы диагностика нәтижесі</h2>
    <p>Төменде бастапқы бағалау нәтижелері көрсетілген.</p>
    <div class="result-list">
`;
initialResults.forEach(result => {
    html += `
        <div class="result-item">
            <h3>${escapeHTML(result.title || "")}</h3>
            <p>Жиналған балл: ${result.score || 0} / ${result.maxScore || 0}</p>
            <p>Орындалған тапсырма: ${result.completed || 0}</p>
            <p>Нәтиже: ${result.percentage || 0}%</p>
        </div>
    `;
});
html += `</div>`;
content.innerHTML = html;

}

// =====================================
// HTML ҚАУІПСІЗ МӘТІН
// =====================================

function escapeHTML(value) {
return String(value ?? “”).replace(/[&<>”’]/g, function (character) {
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
