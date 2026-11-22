// =============================================
// АФАЗИЯ ДИАГНОСТИКАСЫ
// =============================================

const diagnosticTasks = {
understanding: {
title: “Сөйлеуді түсіну”,
tasks: [
{
question: “«Алма» деген сөзге сәйкес суретті таңдаңыз.”,
options: [“🍎 Алма”, “🚗 Көлік”, “🏠 Үй”],
correct: 0
},
{
question: “«Мысық» деген сөзді таңдаңыз.”,
options: [“🐶 Ит”, “🐱 Мысық”, “🐟 Балық”],
correct: 1
},
{
question: “«Су» деген сөзге сәйкес нұсқаны таңдаңыз.”,
options: [“💧 Су”, “🔥 От”, “🌳 Ағаш”],
correct: 0
},
{
question: “«Кітап» деген сөзді таңдаңыз.”,
options: [“✏️ Қалам”, “📚 Кітап”, “⚽ Доп”],
correct: 1
},
{
question: “«Күн» деген сөзді таңдаңыз.”,
options: [“🌙 Ай”, “⭐ Жұлдыз”, “☀️ Күн”],
correct: 2
}
]
},

naming: {
    title: "Заттарды атау",
    tasks: [
        { question: "🍎 Бұл не?", options: ["Алма", "Үстел", "Құс"], correct: 0 },
        { question: "🚗 Бұл не?", options: ["Доп", "Көлік", "Гүл"], correct: 1 },
        { question: "🏠 Бұл не?", options: ["Үй", "Кітап", "Сағат"], correct: 0 },
        { question: "🐶 Бұл не?", options: ["Мысық", "Ит", "Балық"], correct: 1 },
        { question: "📚 Бұл не?", options: ["Кітап", "Қасық", "Аяқ киім"], correct: 0 }
    ]
},
repetition: {
    title: "Қайталау",
    tasks: [
        { question: "«Ана» сөзін қайталаңыз." },
        { question: "«Үй» сөзін қайталаңыз." },
        { question: "«Бала» сөзін қайталаңыз." },
        { question: "«Мен кітап оқимын» сөйлемін қайталаңыз." },
        { question: "«Бүгін ауа райы жақсы» сөйлемін қайталаңыз." }
    ]
},
vocabulary: {
    title: "Сөздік қор",
    tasks: [
        { question: "Қайсысы жеміс?", options: ["🍎 Алма", "🚗 Көлік", "🪑 Орындық"], correct: 0 },
        { question: "Қайсысы жануар?", options: ["📖 Кітап", "🐈 Мысық", "✏️ Қалам"], correct: 1 },
        { question: "Қайсысы киім?", options: ["👕 Көйлек", "🍞 Нан", "🚲 Велосипед"], correct: 0 },
        { question: "Қайсысы ыдыс?", options: ["🥄 Қасық", "🌳 Ағаш", "🐦 Құс"], correct: 0 },
        { question: "Қайсысы көлік?", options: ["🍐 Алмұрт", "🚲 Велосипед", "📚 Кітап"], correct: 1 }
    ]
},
reading: {
    title: "Оқу",
    tasks: [
        { question: "«АНА» сөзін оқыңыз." },
        { question: "«ҮЙ» сөзін оқыңыз." },
        { question: "«АЛМА» сөзін оқыңыз." },
        { question: "«БАЛА» сөзін оқыңыз." },
        { question: "«МЕН КІТАП ОҚИМЫН» сөйлемін оқыңыз." }
    ]
},
writing: {
    title: "Жазу",
    tasks: [
        { question: "«АНА» сөзін жазыңыз." },
        { question: "«ҮЙ» сөзін жазыңыз." },
        { question: "«АЛМА» сөзін жазыңыз." },
        { question: "«БАЛА» сөзін жазыңыз." },
        { question: "«МЕН ҮЙГЕ БАРАМЫН» сөйлемін жазыңыз." }
    ]
}

};

let currentCategory = “”;
let currentTaskIndex = 0;
let currentScore = 0;
let completedTasks = 0;
let taskAnswers = [];

// =============================================
// ПАЦИЕНТТІ КӨРСЕТУ
// =============================================

function showDiagnosticPatient() {
const patient = JSON.parse(
localStorage.getItem(“aphasiaPatient”) || “null”
);

const nameElement = document.getElementById("patientName");
if (!nameElement) return;
if (!patient) {
    nameElement.textContent = "Пациент тіркелмеген";
    return;
}
nameElement.textContent =
    "Пациент: " + patient.fullName +
    " | Жасы: " + patient.age;

}

// =============================================
// БАҒАЛАУ ТҮРІ
// =============================================

function getAssessmentType() {
const selector = document.getElementById(“assessmentType”);

return selector ? selector.value : "initial";

}

// =============================================
// БАҒЫТТЫ БАСТАУ
// =============================================

function startCategory(category) {
if (!diagnosticTasks[category]) return;

currentCategory = category;
currentTaskIndex = 0;
currentScore = 0;
completedTasks = 0;
taskAnswers = [];
const taskArea = document.getElementById("taskArea");
const resultArea = document.getElementById("diagnosticResult");
taskArea.style.display = "block";
resultArea.style.display = "none";
showTask();
taskArea.scrollIntoView({ behavior: "smooth" });

}

// =============================================
// ТАПСЫРМАНЫ КӨРСЕТУ
// =============================================

function showTask() {
const category = diagnosticTasks[currentCategory];
const task = category.tasks[currentTaskIndex];
const area = document.getElementById(“taskArea”);

let html = `
    <h2>${category.title}</h2>
    <p>
        Тапсырма ${currentTaskIndex + 1} / ${category.tasks.length}
    </p>
    <div class="progress-track"
         style="height:9px;background:#ead9b8;border-radius:10px;">
        <div style="
            height:9px;
            width:${((currentTaskIndex + 1) / category.tasks.length) * 100}%;
            background:#a62b25;
            border-radius:10px;">
        </div>
    </div>
    <h3 style="margin-top:25px;">
        ${task.question}
    </h3>
`;
if (task.options) {
    task.options.forEach((option, index) => {
        html += `
            <button onclick="checkAnswer(${index})">
                ${option}
            </button>
        `;
    });
} else {
    html += `
        <p>
            Пациенттің жауабын тыңдап, логопед бағалайды.
        </p>
        <div>
            <button onclick="checkManual(3)">3 балл</button>
            <button onclick="checkManual(2)">2 балл</button>
            <button onclick="checkManual(1)">1 балл</button>
            <button onclick="checkManual(0)">0 балл</button>
        </div>
    `;
}
area.innerHTML = html;

}

// =============================================
// АВТОМАТТЫ БАҒАЛАУ
// =============================================

function checkAnswer(selected) {
const task = diagnosticTasks[currentCategory].tasks[currentTaskIndex];

const isCorrect = selected === task.correct;
const score = isCorrect ? 3 : 0;
saveTaskAnswer(score, isCorrect ? "Дұрыс" : "Қате");

}

// =============================================
// ЛОГОПЕД БАҒАЛАУЫ
// =============================================

function checkManual(score) {
saveTaskAnswer(score, “Логопед бағалады”);
}

// =============================================
// ЖАУАПТЫ САҚТАУ
// =============================================

function saveTaskAnswer(score, status) {
currentScore += score;
completedTasks++;

taskAnswers.push({
    task: currentTaskIndex + 1,
    score: score,
    status: status
});
currentTaskIndex++;
if (
    currentTaskIndex <
    diagnosticTasks[currentCategory].tasks.length
) {
    showTask();
} else {
    showCategoryResult();
}

}

// =============================================
// БАҒЫТ НӘТИЖЕСІ
// =============================================

function showCategoryResult() {
const category = diagnosticTasks[currentCategory];

const maxScore = category.tasks.length * 3;
const percentage = Math.round((currentScore / maxScore) * 100);
const assessmentType = getAssessmentType();
const result = {
    category: currentCategory,
    title: category.title,
    assessmentType: assessmentType,
    score: currentScore,
    maxScore: maxScore,
    percentage: percentage,
    completed: completedTasks,
    answers: taskAnswers,
    date: new Date().toISOString()
};
const allResults = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
allResults.push(result);
localStorage.setItem(
    "aphasiaDiagnosticResults",
    JSON.stringify(allResults)
);
const area = document.getElementById("taskArea");
const resultArea = document.getElementById("diagnosticResult");
area.style.display = "none";
resultArea.style.display = "block";
resultArea.innerHTML = `
    <h2>Диагностика аяқталды!</h2>
    <h3>${category.title}</h3>
    <p>
        Бағалау кезеңі:
        ${assessmentType === "initial"
            ? "Бастапқы диагностика"
            : "Қайталама диагностика"}
    </p>
    <h3>Жиналған балл: ${currentScore} / ${maxScore}</h3>
    <h3>Нәтиже: ${percentage}%</h3>
    <p>Орындалған тапсырма: ${completedTasks}</p>
    <p>
        Бұл көрсеткіш тапсырмаларды орындау нәтижесін сипаттайды.
        Ол өздігінен медициналық диагнозды анықтамайды.
    </p>
    <button onclick="startCategory('${currentCategory}')">
        Қайта өту
    </button>
    <button onclick="backToCategories()">
        Басқа бағытты таңдау
    </button>
    <button onclick="location.href='cabinet.html'">
        Кабинетке қайту
    </button>
`;
resultArea.scrollIntoView({ behavior: "smooth" });

}

// =============================================
// БАҒЫТТАРҒА ҚАЙТУ
// =============================================

function backToCategories() {
document.getElementById(“taskArea”).style.display = “none”;
document.getElementById(“diagnosticResult”).style.display = “none”;

window.scrollTo({ top: 0, behavior: "smooth" });

}

// =============================================
// БЕТ ЖҮКТЕЛГЕНДЕ
// =============================================

document.addEventListener(“DOMContentLoaded”, function () {
showDiagnosticPatient();
});
