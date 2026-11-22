const diagnosticCategories = {
understanding: {
title: “СӨЙЛЕУДІ ТҮСІНУ”,
tasks: [
{
question: “«Алма» сөзін білдіретін суретті таңдаңыз.”,
options: [“Алма”, “Үстел”, “Кітап”],
answer: “Алма”
},
{
question: “«Ит» деген сөзді таңдаңыз.”,
options: [“Мысық”, “Ит”, “Құс”],
answer: “Ит”
},
{
question: “«Қолды көтеріңіз» нұсқауын орындаңыз.”,
options: [“Қолды көтерді”, “Көзді жұмды”, “Отырды”],
answer: “Қолды көтерді”
},
{
question: “«Су» сөзін таңдаңыз.”,
options: [“Су”, “Ағаш”, “Доп”],
answer: “Су”
},
{
question: “«Құсты көрсетіңіз» деген нұсқауға сәйкес жауапты таңдаңыз.”,
options: [“Құс”, “Балық”, “Мысық”],
answer: “Құс”
}
]
},

naming: {
title: “ЗАТТАРДЫ АТАУ”,
tasks: [
{
question: “Суретте көрсетілген заттың атауын таңдаңыз: алма.”,
options: [“Алма”, “Доп”, “Кітап”],
answer: “Алма”
},
{
question: “Суретте көрсетілген заттың атауын таңдаңыз: сағат.”,
options: [“Қасық”, “Сағат”, “Гүл”],
answer: “Сағат”
},
{
question: “Суретте көрсетілген заттың атауын таңдаңыз: орындық.”,
options: [“Терезе”, “Орындық”, “Телефон”],
answer: “Орындық”
},
{
question: “Суретте көрсетілген заттың атауын таңдаңыз: кітап.”,
options: [“Кітап”, “Кесе”, “Қалам”],
answer: “Кітап”
},
{
question: “Суретте көрсетілген заттың атауын таңдаңыз: кілт.”,
options: [“Доп”, “Кілт”, “Құс”],
answer: “Кілт”
}
]
},

repetition: {
title: “ҚАЙТАЛАП АЙТУ”,
tasks: [
{
question: “«Ана» сөзін қайталаңыз.”,
manual: true
},
{
question: “«Үй» сөзін қайталаңыз.”,
manual: true
},
{
question: “«Мен кітап оқимын» сөйлемін қайталаңыз.”,
manual: true
},
{
question: “«Бүгін күн жылы» сөйлемін қайталаңыз.”,
manual: true
},
{
question: “«Бала мектепке барды» сөйлемін қайталаңыз.”,
manual: true
}
]
},

vocabulary: {
title: “СӨЗДІК ҚОР”,
tasks: [
{
question: “Жемісті таңдаңыз.”,
options: [“Алма”, “Орындық”, “Қалам”],
answer: “Алма”
},
{
question: “Жануарды таңдаңыз.”,
options: [“Мысық”, “Үстел”, “Кесе”],
answer: “Мысық”
},
{
question: “Көлік түрін таңдаңыз.”,
options: [“Автобус”, “Алмұрт”, “Кітап”],
answer: “Автобус”
},
{
question: “Киім атауын таңдаңыз.”,
options: [“Көйлек”, “Қасық”, “Терезе”],
answer: “Көйлек”
},
{
question: “Ыдыс атауын таңдаңыз.”,
options: [“Кесе”, “Доп”, “Ағаш”],
answer: “Кесе”
}
]
},

reading: {
title: “ОҚУ ДАҒДЫСЫ”,
tasks: [
{ question: “«АНА» сөзін оқыңыз.”, manual: true },
{ question: “«ҮЙ» сөзін оқыңыз.”, manual: true },
{ question: “«КІТАП» сөзін оқыңыз.”, manual: true },
{ question: “«МЕКТЕП» сөзін оқыңыз.”, manual: true },
{ question: “«БАЛА ОЙНАП ЖҮР» сөйлемін оқыңыз.”, manual: true }
]
},

writing: {
title: “ЖАЗУ ДАҒДЫСЫ”,
tasks: [
{ question: “«АНА» сөзін жазуын тексеріңіз.”, manual: true },
{ question: “«ҮЙ» сөзін жазуын тексеріңіз.”, manual: true },
{ question: “«АЛМА» сөзін жазуын тексеріңіз.”, manual: true },
{ question: “«КІТАП» сөзін жазуын тексеріңіз.”, manual: true },
{ question: “«МЕН ҮЙГЕ БАРАМЫН» сөйлемін жазуын тексеріңіз.”, manual: true }
]
}
};

let currentCategory = “”;
let currentAssessmentType = “initial”;
let currentTaskIndex = 0;
let currentAnswers = [];
let selectedAnswer = null;
let currentManualScore = null;

function getDiagnosticPatientId() {
let patient = {};

try {
patient = JSON.parse(
localStorage.getItem(“aphasiaPatient”) || “{}”
);
} catch (error) {
patient = {};
}

if (!patient.fullName || !patient.birthDate) {
alert(“Алдымен логопед кабинетінде пациенттің аты-жөні мен туған күнін сақтаңыз.”);
return null;
}

return patient.fullName.trim().toLowerCase() + “_” + patient.birthDate;
}

function startCategory(categoryKey) {
if (!diagnosticCategories[categoryKey]) return;

const patientId = getDiagnosticPatientId();
if (!patientId) return;

currentCategory = categoryKey;
currentTaskIndex = 0;
currentAnswers = [];
selectedAnswer = null;
currentManualScore = null;

const typeField = document.getElementById(“assessmentType”);

currentAssessmentType = typeField
? typeField.value
: “initial”;

renderDiagnosticTask();
}

function renderDiagnosticTask() {
const page = document.querySelector(”.diagnostics-page”);
if (!page) return;

const category = diagnosticCategories[currentCategory];
const task = category.tasks[currentTaskIndex];

const progress = Math.round(
(currentTaskIndex / category.tasks.length) * 100
);

selectedAnswer = null;
currentManualScore = null;

let taskHTML = “”;

if (task.manual) {
taskHTML = `
Тапсырманы пациентке орындатыңыз.
Орындау сапасына қарай ұпай таңдаңыз.
  <div class="manual-scores">
    <button onclick="selectManualScore(3)">
      3 — Толық орындайды
    </button>
    <button onclick="selectManualScore(2)">
      2 — Аздаған қиындықпен
    </button>
    <button onclick="selectManualScore(1)">
      1 — Елеулі қиындықпен
    </button>
    <button onclick="selectManualScore(0)">
      0 — Орындай алмайды
    </button>
  </div>
`;

} else {
taskHTML = <div class="answer-options"> ${task.options.map(option =>
<button class=“answer-button”
onclick=“selectDiagnosticAnswer(this, ${JSON.stringify(option).replace(/</g, “\u003c”)})”>
${escapeDiagnosticText(option)}
).join("")} </div> ;
}

page.innerHTML = `
  <button onclick="showDiagnosticMenu()" class="diag-back">
    ← БӨЛІМДЕРГЕ ҚАЙТУ
  </button>
  <h2>${category.title}</h2>
  <p>${currentAssessmentType === "initial"
    ? "БАСТАПҚЫ ДИАГНОСТИКА"
    : "ҚАЙТА ДИАГНОСТИКА"}</p>
  <div class="progress-info">
    <span>Тапсырма ${currentTaskIndex + 1} / ${category.tasks.length}</span>
    <span>${progress}%</span>
  </div>
  <div class="progress-track">
    <div class="progress-fill" style="width:${progress}%"></div>
  </div>
  <div class="task-box">
    <h3>${escapeDiagnosticText(task.question)}</h3>
    ${taskHTML}
  </div>
  <button class="next-task-button"
    onclick="submitDiagnosticAnswer()">
    ${currentTaskIndex === category.tasks.length - 1
      ? "НӘТИЖЕНІ АЯҚТАУ"
      : "КЕЛЕСІ ТАПСЫРМА →"}
  </button>
</div>

`;

addDiagnosticStyles();
}

function selectDiagnosticAnswer(button, answer) {
selectedAnswer = answer;

document.querySelectorAll(”.answer-button”).forEach(item => {
item.classList.remove(“selected”);
});

button.classList.add(“selected”);
}

function selectManualScore(score) {
currentManualScore = score;

document.querySelectorAll(”.manual-scores button”).forEach(button => {
button.classList.remove(“selected”);
});

event.currentTarget.classList.add(“selected”);
}

function submitDiagnosticAnswer() {
const category = diagnosticCategories[currentCategory];
const task = category.tasks[currentTaskIndex];

let score;

if (task.manual) {
if (currentManualScore === null) {
alert(“Алдымен бағалау ұпайын таңдаңыз.”);
return;
}

score = currentManualScore;

} else {
if (selectedAnswer === null) {
alert(“Жауап нұсқасын таңдаңыз.”);
return;
}

score = selectedAnswer === task.answer ? 3 : 0;

}

currentAnswers.push({
question: task.question,
score: score,
maxScore: 3
});

if (currentTaskIndex < category.tasks.length - 1) {
currentTaskIndex++;
renderDiagnosticTask();
} else {
finishDiagnostic();
}
}

function finishDiagnostic() {
const patientId = getDiagnosticPatientId();
if (!patientId) return;

const category = diagnosticCategories[currentCategory];

const score = currentAnswers.reduce(
(sum, item) => sum + item.score, 0
);

const maxScore = category.tasks.length * 3;

const percentage = Math.round(
(score / maxScore) * 100
);

const result = {
patientId: patientId,
category: category.title,
categoryKey: currentCategory,
assessmentType: currentAssessmentType,
score: score,
maxScore: maxScore,
percentage: percentage,
completed: true,
answers: currentAnswers,
date: new Date().toLocaleDateString(“kk-KZ”),
timestamp: Date.now()
};

let allResults = [];

try {
allResults = JSON.parse(
localStorage.getItem(“aphasiaDiagnosticResults”) || “[]”
);

if (!Array.isArray(allResults)) allResults = [];

} catch (error) {
allResults = [];
}

allResults.push(result);

localStorage.setItem(
“aphasiaDiagnosticResults”,
JSON.stringify(allResults)
);

showDiagnosticResult(result);
}

function showDiagnosticResult(result) {
const page = document.querySelector(”.diagnostics-page”);
if (!page) return;

page.innerHTML = `
  <h2>ДИАГНОСТИКА АЯҚТАЛДЫ!</h2>
  <div class="result-circle">
    ${result.percentage}%
  </div>
  <h3>${escapeDiagnosticText(result.category)}</h3>
  <p>Жинаған ұпайы: ${result.score} / ${result.maxScore}</p>
  <p>Бағалау түрі:
    ${result.assessmentType === "initial"
      ? "Бастапқы диагностика"
      : "Қайта диагностика"}
  </p>
  <p>Тексеру күні: ${result.date}</p>
  <button onclick="showDiagnosticMenu()">
    БӨЛІМДЕРГЕ ҚАЙТУ
  </button>
  <button onclick="window.location.href='cabinet.html'">
    ЛОГОПЕД КАБИНЕТІНЕ ҚАЙТУ
  </button>
</div>

`;

addDiagnosticStyles();
}

function showDiagnosticMenu() {
window.location.reload();
}

function escapeDiagnosticText(value) {
return String(value ?? “”).replace(/[&<>”’]/g, character => ({
“&”: “&”,
“<”: “<”,
“>”: “>”,
‘”’: “"”,
“’”: “'”
})[character]);
}

function addDiagnosticStyles() {
if (document.getElementById(“diagnosticWorkStyles”)) return;

const style = document.createElement(“style”);
style.id = “diagnosticWorkStyles”;

style.textContent = `
.diagnostic-work,
.diagnostic-result {
max-width:800px;
margin:25px auto;
padding:25px;
background:#fff;
border:1px solid #eadcc3;
border-radius:20px;
color:#594832;
}

.diagnostic-work h2,
.diagnostic-result h2 {
  color:#a77c36;
  margin:20px 0;
}
.diag-back {
  background:#f8f0e2;
  border:1px solid #eadcc3;
  color:#896a39;
  border-radius:10px;
  padding:11px 15px;
  cursor:pointer;
}
.progress-info {
  display:flex;
  justify-content:space-between;
  margin:20px 0 10px;
}
.progress-track {
  height:12px;
  background:#eee8dd;
  border-radius:20px;
  overflow:hidden;
}
.progress-fill {
  height:100%;
  background:#b58a43;
  border-radius:20px;
}
.task-box {
  padding:22px;
  background:#fffaf2;
  border:1px solid #eadcc3;
  border-radius:16px;
  margin:25px 0;
}
.task-box h3 {
  line-height:1.6;
  margin-bottom:20px;
}
.answer-options,
.manual-scores {
  display:grid;
  grid-template-columns:1fr;
  gap:12px;
}
.answer-button,
.manual-scores button {
  padding:15px;
  border:1px solid #e5d5b8;
  background:white;
  border-radius:12px;
  color:#594832;
  cursor:pointer;
  text-align:left;
  font-size:15px;
}
.answer-button.selected,
.manual-scores button.selected {
  background:#f3e6ca;
  border:2px solid #b58a43;
}
.next-task-button,
.diagnostic-result button {
  width:100%;
  padding:15px;
  border:0;
  background:#b58a43;
  color:white;
  border-radius:12px;
  margin-top:15px;
  cursor:pointer;
  font-weight:bold;
}
.result-circle {
  width:145px;
  height:145px;
  border-radius:50%;
  border:9px solid #e6c98e;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:30px;
  font-weight:bold;
  color:#a77c36;
  margin:25px auto;
}
.diagnostic-result {
  text-align:center;
}
.diagnostic-result p {
  margin:12px 0;
}
@media(max-width:600px) {
  .diagnostic-work,
  .diagnostic-result {
    padding:17px;
  }
}

`;

document.head.appendChild(style);
}
