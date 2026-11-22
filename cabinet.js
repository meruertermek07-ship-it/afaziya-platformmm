document.addEventListener(“DOMContentLoaded”, () => {
setDefaultDate();
loadPatient();

const form = document.getElementById(“patientForm”);

if (form) {
form.addEventListener(“submit”, (event) => {
event.preventDefault();
savePatient();
});
}

const birthDate = document.getElementById(“birthDate”);

if (birthDate) {
birthDate.addEventListener(“change”, calculateAge);
}
});

function setDefaultDate() {
const field = document.getElementById(“testDate”);

if (field && !field.value) {
field.value = new Date().toISOString().slice(0, 10);
}
}

function calculateAge() {
const birth = document.getElementById(“birthDate”)?.value;
const ageField = document.getElementById(“age”);

if (!birth || !ageField) return;

const date = new Date(birth + “T00:00:00”);
const today = new Date();

let age = today.getFullYear() - date.getFullYear();

if (
today.getMonth() < date.getMonth() ||
(today.getMonth() === date.getMonth() &&
today.getDate() < date.getDate())
) {
age–;
}

ageField.value = age >= 0 ? age : “”;
}

function savePatient() {
const patient = {
fullName: document.getElementById(“fullName”).value.trim(),
birthDate: document.getElementById(“birthDate”).value,
age: document.getElementById(“age”).value,
diagnosis: document.getElementById(“diagnosis”).value.trim(),
testDate: document.getElementById(“testDate”).value
};

if (!patient.fullName) {
showMessage(“Пациенттің аты-жөнін енгізіңіз.”);
return;
}

localStorage.setItem(“aphasiaPatient”, JSON.stringify(patient));

showMessage(“Пациент мәліметтері сәтті сақталды!”);
}

function loadPatient() {
try {
const patient = JSON.parse(
localStorage.getItem(“aphasiaPatient”) || “null”
);

if (!patient) return;
Object.keys(patient).forEach((key) => {
  const field = document.getElementById(key);
  if (field) field.value = patient[key] || "";
});

} catch (error) {
console.error(“Пациент мәліметін оқу қатесі:”, error);
}
}

function showMessage(message) {
const box = document.getElementById(“patientMessage”);

if (box) {
box.textContent = message;
} else {
alert(message);
}
}

// ТӨРТ БӨЛІМНІҢ АШЫЛУЫ

function showPatientSection(section) {
const menu = document.getElementById(“cabinetMenu”);
const content = document.getElementById(“patientContent”);

if (!menu || !content) {
alert(“Бөлім контейнерлері табылмады. cabinet.html файлын тексеріңіз.”);
return;
}

menu.style.display = “none”;
content.style.display = “block”;

if (section === “speechCard”) {
if (typeof loadSpeechCard === “function”) {
loadSpeechCard();
} else {
showError(“speech-card.js файлы жүктелмеді.”);
}
return;
}

if (section === “diagnostics”) {
window.location.href = “diagnostics.html”;
return;
}

if (section === “initialResult”) {
showInitialResult();
return;
}

if (section === “dynamics”) {
if (typeof loadDynamics === “function”) {
loadDynamics();
} else {
showError(“dynamics.js файлы жүктелмеді.”);
}
return;
}

showError(“Бөлім табылмады.”);
}

function showError(message) {
const content = document.getElementById(“patientContent”);

content.innerHTML = <button class="content-back" onclick="backToCabinetMenu()"> ← АРТҚА </button> <h2>Қате</h2> <p>${escapeHTML(message)}</p>;
}

// БАСТАПҚЫ НӘТИЖЕ

function showInitialResult() {
const content = document.getElementById(“patientContent”);

let results = [];

try {
results = JSON.parse(
localStorage.getItem(“aphasiaDiagnosticResults”) || “[]”
);
} catch (error) {
results = [];
}

const initial = results.filter(
item => item.assessmentType === “initial”
);

content.innerHTML = `
← АРТҚА
<h2>БАСТАПҚЫ ДИАГНОСТИКА НӘТИЖЕЛЕРІ</h2>
${
  initial.length
    ? initial.map(item => `
      <div class="result-card">
        <h3>${escapeHTML(item.category || "Бағалау бөлімі")}</h3>
        <p>Жинаған ұпайы: ${Number(item.score) || 0} / ${Number(item.maxScore) || 0}</p>
        <p>Нәтиже: ${Number(item.percentage) || 0}%</p>
        <p>Күні: ${escapeHTML(item.date || "Көрсетілмеген")}</p>
      </div>
    `).join("")
    : "<p>Бастапқы диагностика әлі орындалмаған. Алдымен «Диагностика» бөліміндегі бастапқы тапсырмаларды орындаңыз.</p>"
}

`;
}

// МӘЗІРГЕ ҚАЙТУ

function backToCabinetMenu() {
const menu = document.getElementById(“cabinetMenu”);
const content = document.getElementById(“patientContent”);

if (content) {
content.style.display = “none”;
content.innerHTML = “”;
}

if (menu) {
menu.style.display = “grid”;
}
}

function escapeHTML(value) {
return String(value ?? “”).replace(/[&<>”’]/g, character => ({
“&”: “&”,
“<”: “<”,
“>”: “>”,
‘”’: “"”,
“’”: “'”
})[character]);
}
