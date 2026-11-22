document.addEventListener(“DOMContentLoaded”, function () {
const form = document.getElementById(“patientForm”);
const birthDate = document.getElementById(“birthDate”);
const age = document.getElementById(“age”);
const testDate = document.getElementById(“testDate”);
const message = document.getElementById(“patientMessage”);

// Бүгінгі күнді автоматты енгізу
if (testDate && !testDate.value) {
    testDate.value = new Date().toISOString().slice(0, 10);
}
// Туған күн бойынша жасты есептеу
if (birthDate) {
    birthDate.addEventListener("change", function () {
        age.value = calculateAge(birthDate.value);
    });
}
// Сақталған пациентті шығару
loadPatient();
// Пациент мәліметтерін сақтау
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const patient = {
            fullName: document.getElementById("fullName").value.trim(),
            birthDate: birthDate.value,
            age: age.value,
            diagnosis: document.getElementById("diagnosis").value.trim(),
            testDate: testDate.value
        };
        if (!patient.fullName || !patient.birthDate || !patient.age || !patient.testDate) {
            message.textContent = "Барлық міндетті өрістерді толтырыңыз!";
            return;
        }
        localStorage.setItem("aphasiaPatient", JSON.stringify(patient));
        message.textContent = "✅ Пациент мәліметтері сәтті сақталды!";
        loadPatient();
    });
}

});

// Жасты есептеу
function calculateAge(dateString) {
if (!dateString) return “”;

const birth = new Date(dateString);
const today = new Date();
let years = today.getFullYear() - birth.getFullYear();
const monthDifference = today.getMonth() - birth.getMonth();
if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
) {
    years--;
}
return years;

}

// Пациент мәліметтерін жүктеу
function loadPatient() {
const saved = localStorage.getItem(“aphasiaPatient”);

if (!saved) return;
const patient = JSON.parse(saved);
const fields = {
    fullName: patient.fullName,
    birthDate: patient.birthDate,
    age: patient.age,
    diagnosis: patient.diagnosis,
    testDate: patient.testDate
};
Object.keys(fields).forEach(function (id) {
    const element = document.getElementById(id);
    if (element && fields[id] !== undefined) {
        element.value = fields[id];
    }
});

}

// Кабинет бөлімдерін ашу
function showPatientSection(section) {
const content = document.getElementById(“patientContent”);
const patient = localStorage.getItem(“aphasiaPatient”);

if (!content) return;
if (!patient) {
    content.style.display = "block";
    content.innerHTML = `
        <h2>⚠️ Пациент тіркелмеген</h2>
        <p>Алдымен пациенттің мәліметтерін енгізіп, сақтаңыз.</p>
    `;
    return;
}
content.style.display = "block";
if (section === "speechCard") {
    if (typeof loadSpeechCard === "function") {
        loadSpeechCard();
    } else {
        content.innerHTML = "<h2>Сөйлеу картасы жүктелмеді.</h2>";
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
        content.innerHTML = "<h2>Динамика бөлімі жүктелмеді.</h2>";
    }
}

}

// Бастапқы диагностика нәтижесі
function showInitialResult() {
const content = document.getElementById(“patientContent”);

const allResults = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
const results = allResults.filter(function (item) {
    return item.assessmentType === "initial";
});
content.style.display = "block";
if (results.length === 0) {
    content.innerHTML = `
        <h2>📊 БАСТАПҚЫ НӘТИЖЕ</h2>
        <p>Әзірге бастапқы диагностика нәтижелері жоқ.</p>
        <p>Алдымен диагностика бөліміндегі тапсырмаларды орындаңыз.</p>
    `;
    return;
}
let html = `
    <h2>📊 БАСТАПҚЫ ДИАГНОСТИКА НӘТИЖЕСІ</h2>
    <div class="result-list">
`;
results.forEach(function (item) {
    html += `
        <div class="result-item">
            <h3>${escapeHTML(item.title)}</h3>
            <p>Жиналған балл: ${item.score} / ${item.maxScore}</p>
            <p>Көрсеткіш: ${item.percentage}%</p>
            <p>Орындалған тапсырма: ${item.completed}</p>
            <p>Күні: ${escapeHTML(item.date || "")}</p>
        </div>
    `;
});
html += `</div>`;
content.innerHTML = html;

}

// HTML қауіпсіздігі үшін мәтінді өңдеу
function escapeHTML(value) {
return String(value ?? “”).replace(/[&<>”’]/g, function (character) {
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
