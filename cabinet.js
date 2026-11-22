document.addEventListener(“DOMContentLoaded”, function () {
const form = document.getElementById(“patientForm”);
const birthDate = document.getElementById(“birthDate”);
const testDate = document.getElementById(“testDate”);

if (testDate && !testDate.value) {
    testDate.value = new Date().toISOString().split("T")[0];
}
if (birthDate) {
    birthDate.addEventListener("change", calculateAge);
}
loadPatient();
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        savePatient();
    });
}

});

// Жасын есептеу
function calculateAge() {
const birth = document.getElementById(“birthDate”).value;
const ageField = document.getElementById(“age”);

if (!birth || !ageField) return;
const date = new Date(birth);
const today = new Date();
let age = today.getFullYear() - date.getFullYear();
if (
    today.getMonth() < date.getMonth() ||
    (
        today.getMonth() === date.getMonth() &&
        today.getDate() < date.getDate()
    )
) {
    age--;
}
ageField.value = age >= 0 ? age : "";

}

// Мәліметтерді сақтау
function savePatient() {
const patient = {
fullName: document.getElementById(“fullName”).value.trim(),
birthDate: document.getElementById(“birthDate”).value,
age: document.getElementById(“age”).value,
diagnosis: document.getElementById(“diagnosis”).value.trim(),
testDate: document.getElementById(“testDate”).value
};

if (!patient.fullName) {
    showPatientMessage("Аты-жөнін енгізіңіз.");
    return;
}
localStorage.setItem("aphasiaPatient", JSON.stringify(patient));
showPatientMessage("Мәліметтер сәтті сақталды!");

}

// Мәліметтерді жүктеу
function loadPatient() {
const saved = localStorage.getItem(“aphasiaPatient”);

if (!saved) return;
const patient = JSON.parse(saved);
Object.keys(patient).forEach(function (key) {
    const field = document.getElementById(key);
    if (field) {
        field.value = patient[key] || "";
    }
});

}

// Хабарлама
function showPatientMessage(message) {
const box = document.getElementById(“patientMessage”);

if (box) {
    box.textContent = message;
}

}

// Бөлімді ашу
function showPatientSection(section) {
const content = document.getElementById(“patientContent”);
const menu = document.getElementById(“cabinetMenu”);

if (!content || !menu) return;
if (!localStorage.getItem("aphasiaPatient")) {
    showPatientMessage("Алдымен науқастың мәліметтерін сақтаңыз.");
    return;
}
if (section === "diagnostics") {
    window.location.href = "diagnostics.html";
    return;
}
menu.style.display = "none";
content.style.display = "block";
content.innerHTML = "";
if (section === "speechCard") {
    if (typeof loadSpeechCard === "function") {
        loadSpeechCard();
    } else {
        content.innerHTML = "<h2>Сөйлеу картасы жүктелмеді. speech-card.js файлын тексеріңіз.</h2>";
    }
}
else if (section === "initialResult") {
    showInitialResult();
}
else if (section === "dynamics") {
    if (typeof loadDynamics === "function") {
        loadDynamics();
    } else {
        content.innerHTML = "<h2>Даму динамикасы жүктелмеді. dynamics.js файлын тексеріңіз.</h2>";
    }
}

}

// Бастапқы нәтиже
function showInitialResult() {
const content = document.getElementById(“patientContent”);

const results = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
const initial = results.filter(
    item => item.assessmentType === "initial"
);
let html = `
    <button class="back-button" onclick="backToCabinetMenu()">
        ← Кабинетке оралу
    </button>
    <h2 style="color:#b58a43;">БАСТАПҚЫ ДИАГНОСТИКАЛЫҚ НӘТИЖЕ</h2>
`;
if (initial.length === 0) {
    html += `
        <p>Әзірге бастапқы диагностика нәтижесі жоқ.</p>
        <button class="back-button"
            onclick="window.location.href='diagnostics.html'">
            Диагностикаға өту
        </button>
    `;
} else {
    initial.forEach(function (item) {
        html += `
            <div style="
                background:#fffaf0;
                border:1px solid #eadcc3;
                padding:18px;
                border-radius:12px;
                margin:15px 0;
                color:#574735;">
                <h3>${escapeHTML(item.category)}</h3>
                <p>Ұпай: ${Number(item.score)} / ${Number(item.maxScore)}</p>
                <p>Нәтиже: ${Number(item.percentage)}%</p>
                <p>Күні: ${escapeHTML(item.date || "")}</p>
            </div>
        `;
    });
}
content.innerHTML = html;

}

// Мәзірге оралу
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

// HTML қауіпсіздігі
function escapeHTML(value) {
return String(value ?? “”).replace(/[&<>”’]/g, function (char) {
return {
“&”: “&”,
“<”: “<”,
“>”: “>”,
‘”’: “"”,
“’”: “'”
}[char];
});
}
