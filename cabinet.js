document.addEventListener(“DOMContentLoaded”, () => {
const form = document.getElementById(“patientForm”);
const birthDate = document.getElementById(“birthDate”);
const ageInput = document.getElementById(“age”);
const testDate = document.getElementById(“testDate”);

// Бүгінгі күнді автоматты енгізу
if (testDate && !testDate.value) {
    testDate.value = new Date().toISOString().split("T")[0];
}
// Туған күні бойынша жасын есептеу
if (birthDate) {
    birthDate.addEventListener("change", calculateAge);
}
// Сақталған мәліметтерді жүктеу
loadPatient();
// Науқас мәліметтерін сақтау
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        savePatient();
    });
}

});

// Жасты есептеу
function calculateAge() {
const birthDate = document.getElementById(“birthDate”);
const ageInput = document.getElementById(“age”);

if (!birthDate || !birthDate.value || !ageInput) return;
const birth = new Date(birthDate.value);
const today = new Date();
let age = today.getFullYear() - birth.getFullYear();
const monthDifference = today.getMonth() - birth.getMonth();
if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
) {
    age--;
}
ageInput.value = age >= 0 ? age : "";

}

// Науқас мәліметтерін сақтау
function savePatient() {
const patient = {
fullName: document.getElementById(“fullName”)?.value.trim() || “”,
birthDate: document.getElementById(“birthDate”)?.value || “”,
age: document.getElementById(“age”)?.value || “”,
diagnosis: document.getElementById(“diagnosis”)?.value.trim() || “”,
testDate: document.getElementById(“testDate”)?.value || “”
};

if (!patient.fullName) {
    showPatientMessage("Науқастың аты-жөнін енгізіңіз.");
    return;
}
localStorage.setItem("aphasiaPatient", JSON.stringify(patient));
showPatientMessage("Науқастың мәліметтері сәтті сақталды!");

}

// Сақталған мәліметтерді шығару
function loadPatient() {
const savedPatient = localStorage.getItem(“aphasiaPatient”);

if (!savedPatient) return;
const patient = JSON.parse(savedPatient);
const fields = {
    fullName: patient.fullName,
    birthDate: patient.birthDate,
    age: patient.age,
    diagnosis: patient.diagnosis,
    testDate: patient.testDate
};
Object.entries(fields).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element && value !== undefined) {
        element.value = value;
    }
});

}

// Хабарлама шығару
function showPatientMessage(message) {
const messageBox = document.getElementById(“patientMessage”);

if (messageBox) {
    messageBox.textContent = message;
    messageBox.style.display = "block";
}

}

// Кабинет бөлімдерін ашу
function showPatientSection(section) {
const savedPatient = localStorage.getItem(“aphasiaPatient”);

if (!savedPatient) {
    showPatientMessage("Алдымен науқастың мәліметтерін енгізіп, сақтаңыз.");
    return;
}
const content = document.getElementById("patientContent");
if (!content) return;
// Кабинет мәзірін жасыру
document.querySelectorAll(".cabinet-card").forEach(card => {
    card.style.display = "none";
});
// Контентті ашу
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

// Бастапқы нәтижені көрсету
function showInitialResult() {
const content = document.getElementById(“patientContent”);

if (!content) return;
const results = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
const initialResults = results.filter(
    result => result.assessmentType === "initial"
);
let html = `
    <div class="result-section">
        <h2>БАСТАПҚЫ ДИАГНОСТИКАЛЫҚ НӘТИЖЕ</h2>
        <button class="back-cabinet-button" onclick="backToCabinetMenu()">
            ← Кабинетке оралу
        </button>
`;
if (initialResults.length === 0) {
    html += `
        <div class="result-empty">
            <h3>Әзірге нәтиже жоқ</h3>
            <p>Бастапқы диагностика тапсырмаларын орындағаннан кейін нәтиже осы жерде көрсетіледі.</p>
            <button onclick="window.location.href='diagnostics.html'">
                Диагностикаға өту
            </button>
        </div>
    `;
} else {
    html += `
        <h3>Науқас: ${escapeHTML(JSON.parse(
            localStorage.getItem("aphasiaPatient") || "{}"
        ).fullName || "")}</h3>
        <div class="result-list">
    `;
    initialResults.forEach(result => {
        const percentage = result.percentage ??
            (result.maxScore ? Math.round(result.score / result.maxScore * 100) : 0);
        html += `
            <div class="result-item">
                <h3>${escapeHTML(result.category || result.title || "Тапсырма")}</h3>
                <p>Жинаған ұпайы: ${Number(result.score) || 0} / ${Number(result.maxScore) || 0}</p>
                <p>Нәтиже: ${Number(percentage) || 0}%</p>
                <p>Орындалған күні: ${escapeHTML(result.date || "Көрсетілмеген")}</p>
            </div>
        `;
    });
    html += "</div>";
}
html += "</div>";
content.innerHTML = html;

}

// Кабинет мәзіріне қайта оралу
function backToCabinetMenu() {
const content = document.getElementById(“patientContent”);

if (content) {
    content.style.display = "none";
    content.innerHTML = "";
}
document.querySelectorAll(".cabinet-card").forEach(card => {
    card.style.display = "";
});

}

// HTML мәтінін қауіпсіз көрсету
function escapeHTML(value) {
return String(value ?? “”).replace(/[&<>”’]/g, character => {
const symbols = {
“&”: “&”,
“<”: “<”,
“>”: “>”,
‘”’: “"”,
“’”: “'”
};

    return symbols[character];
});

}
