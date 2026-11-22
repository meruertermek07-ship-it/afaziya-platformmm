const diagnosticTasks = {
understanding: {
title: “Сөйлеуді түсіну”,
mode: “auto”,
tasks: [
{ question: “«Алма» сөзін көрсетіңіз.”, options: [“🍎 Алма”, “🚗 Көлік”, “🏠 Үй”], answer: 0 },
{ question: “«Ит» сөзін көрсетіңіз.”, options: [“🐈 Мысық”, “🐕 Ит”, “🐟 Балық”], answer: 1 },
{ question: “«Күн» сөзін көрсетіңіз.”, options: [“🌙 Ай”, “⭐ Жұлдыз”, “☀️ Күн”], answer: 2 },
{ question: “«Кітап» сөзін көрсетіңіз.”, options: [“📖 Кітап”, “🍞 Нан”, “🌳 Ағаш”], answer: 0 },
{ question: “«Допты ал» деген нұсқауға сәйкес суретті таңдаңыз.”, options: [“⚽ Доп”, “🥄 Қасық”, “🪑 Орындық”], answer: 0 }
]
},

naming: {
    title: "Заттарды атау",
    mode: "auto",
    tasks: [
        { question: "🍎 Бұл не?", options: ["Алма", "Алмұрт", "Шие"], answer: 0 },
        { question: "🚗 Бұл не?", options: ["Ұшақ", "Көлік", "Пойыз"], answer: 1 },
        { question: "🐈 Бұл қандай жануар?", options: ["Ит", "Қоян", "Мысық"], answer: 2 },
        { question: "☀️ Бұл не?", options: ["Күн", "Ай", "Жұлдыз"], answer: 0 },
        { question: "📖 Бұл не?", options: ["Дәптер", "Кітап", "Қалам"], answer: 1 }
    ]
},
repetition: {
    title: "Қайталау",
    mode: "manual",
    tasks: [
        { question: "«Ана» сөзін қайталаңыз." },
        { question: "«Бала» сөзін қайталаңыз." },
        { question: "«Мен үйге барамын» сөйлемін қайталаңыз." },
        { question: "«Бүгін күн жылы» сөйлемін қайталаңыз." },
        { question: "«Мен кітап оқығанды жақсы көремін» сөйлемін қайталаңыз." }
    ]
},
vocabulary: {
    title: "Сөздік қор",
    mode: "auto",
    tasks: [
        { question: "Қайсысы жеміс?", options: ["🚗 Көлік", "🍐 Алмұрт", "🪑 Орындық"], answer: 1 },
        { question: "Қайсысы киім?", options: ["👕 Көйлек", "🍎 Алма", "🐕 Ит"], answer: 0 },
        { question: "Қайсысы ыдыс?", options: ["📚 Кітап", "🥄 Қасық", "🌳 Ағаш"], answer: 1 },
        { question: "Қайсысы көлік?", options: ["🚲 Велосипед", "🍞 Нан", "🌸 Гүл"], answer: 0 },
        { question: "Қайсысы жануар?", options: ["🪟 Терезе", "✏️ Қалам", "🐘 Піл"], answer: 2 }
    ]
},
reading: {
    title: "Оқу",
    mode: "manual",
    tasks: [
        { question: "«АНА» сөзін дауыстап оқыңыз." },
        { question: "«БАЛА» сөзін дауыстап оқыңыз." },
        { question: "«КІТАП» сөзін оқыңыз." },
        { question: "«МЕН ҮЙГЕ БАРАМЫН» сөйлемін оқыңыз." },
        { question: "«БҮГІН КҮН ЖЫЛЫ» сөйлемін оқыңыз." }
    ]
},
writing: {
    title: "Жазу",
    mode: "manual",
    tasks: [
        { question: "«АНА» сөзін жазуын сұраңыз." },
        { question: "«ҮЙ» сөзін жазуын сұраңыз." },
        { question: "«БАЛА» сөзін жазуын сұраңыз." },
        { question: "«МЕНІҢ АТЫМ» сөз тіркесін жазуын сұраңыз." },
        { question: "«МЕН КІТАП ОҚИМЫН» сөйлемін жазуын сұраңыз." }
    ]
}

};

let currentCategory = “”;
let currentTaskIndex = 0;
let currentScore = 0;
let completedTasks = 0;
let taskAnswers = [];

// Пациент туралы мәлімет
function showDiagnosticPatient() {
const patient = JSON.parse(
localStorage.getItem(“aphasiaPatient”) || “null”
);

const element = document.getElementById("patientName");
if (!element) return;
if (!patient) {
    element.textContent = "Пациент тіркелмеген";
    return;
}
element.textContent =
    patient.fullName + " | Жасы: " + patient.age;

}

// Тексеру түрі
function getAssessmentType() {
const select = document.getElementById(“assessmentType”);
return select ? select.value : “initial”;
}

// Бағытты бастау
function startCategory(category) {
if (!diagnosticTasks[category]) return;

const patient = localStorage.getItem("aphasiaPatient");
if (!patient) {
    alert("Алдымен логопед кабинетінде пациентті тіркеңіз!");
    return;
}
currentCategory = category;
currentTaskIndex = 0;
currentScore = 0;
completedTasks = 0;
taskAnswers = [];
const taskArea = document.getElementById("taskArea");
const resultArea = document.getElementById("diagnosticResult");
taskArea.style.display = "block";
resultArea.style.display = "none";
taskArea.scrollIntoView({ behavior: "smooth" });
showTask();

}

// Тапсырманы көрсету
function showTask() {
const category = diagnosticTasks[currentCategory];
const task = category.tasks[currentTaskIndex];
const taskArea = document.getElementById(“taskArea”);

let html = `
    <h2>${category.title}</h2>
    <p>
        Тапсырма ${currentTaskIndex + 1} / ${category.tasks.length}
    </p>
    <div class="result-item">
        <h3>${task.question}</h3>
`;
if (category.mode === "auto") {
    html += `<div class="diagnostic-grid">`;
    task.options.forEach(function (option, index) {
        html += `
            <button class="diagnostic-card"
                onclick="checkAnswer(${index})">
                ${option}
            </button>
        `;
    });
    html += `</div>`;
} else {
    html += `
        <p>
            Пациенттің жауабын тыңдап, логопед төмендегі шкала
            бойынша бағалайды.
        </p>
        <div class="diagnostic-grid">
            <button class="diagnostic-card" onclick="checkManual(3)">
                3 балл — толық орындады
            </button>
            <button class="diagnostic-card" onclick="checkManual(2)">
                2 балл — аздаған көмекпен
            </button>
            <button class="diagnostic-card" onclick="checkManual(1)">
                1 балл — елеулі көмекпен
            </button>
            <button class="diagnostic-card" onclick="checkManual(0)">
                0 балл — орындай алмады
            </button>
        </div>
    `;
}
html += `</div>`;
taskArea.innerHTML = html;

}

// Автоматты бағалау
function checkAnswer(selected) {
const task = diagnosticTasks[currentCategory].tasks[currentTaskIndex];

const correct = selected === task.answer;
const score = correct ? 3 : 0;
saveTaskAnswer(score, correct ? "Дұрыс" : "Қате");

}

// Логопед бағалауы
function checkManual(score) {
const status = score === 3
? “Толық орындады”
: score === 2
? “Аздаған көмекпен”
: score === 1
? “Елеулі көмекпен”
: “Орындай алмады”;

saveTaskAnswer(score, status);

}

// Жауапты сақтау
function saveTaskAnswer(score, status) {
currentScore += score;
completedTasks++;

taskAnswers.push({
    taskNumber: currentTaskIndex + 1,
    question: diagnosticTasks[currentCategory].tasks[currentTaskIndex].question,
    score: score,
    status: status
});
currentTaskIndex++;
if (currentTaskIndex < diagnosticTasks[currentCategory].tasks.length) {
    showTask();
} else {
    showCategoryResult();
}

}

// Бағыт нәтижесі
function showCategoryResult() {
const category = diagnosticTasks[currentCategory];
const maxScore = category.tasks.length * 3;
const percentage = Math.round(currentScore / maxScore * 100);

const result = {
    category: currentCategory,
    title: category.title,
    assessmentType: getAssessmentType(),
    score: currentScore,
    maxScore: maxScore,
    percentage: percentage,
    completed: completedTasks,
    answers: taskAnswers,
    date: new Date().toLocaleDateString("kk-KZ")
};
const results = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
results.push(result);
localStorage.setItem(
    "aphasiaDiagnosticResults",
    JSON.stringify(results)
);
const taskArea = document.getElementById("taskArea");
const resultArea = document.getElementById("diagnosticResult");
taskArea.style.display = "none";
resultArea.style.display = "block";
let answerHTML = "";
taskAnswers.forEach(function (answer) {
    answerHTML += `
        <div class="result-item">
            <p><b>${answer.taskNumber}. ${escapeDiagnosticHTML(answer.question)}</b></p>
            <p>${answer.score} / 3 балл</p>
            <p>${escapeDiagnosticHTML(answer.status)}</p>
        </div>
    `;
});
resultArea.innerHTML = `
    <h2>🏆 ${category.title} — НӘТИЖЕСІ</h2>
    <div class="result-item">
        <h3>ЖАЛПЫ БАЛЛ</h3>
        <h1>${currentScore} / ${maxScore}</h1>
        <p>Тапсырмалардың балдық көрсеткіші: ${percentage}%</p>
        <p>Орындалған тапсырма: ${completedTasks} / 5</p>
    </div>
    <h3>ТАПСЫРМАЛАР БОЙЫНША НӘТИЖЕ</h3>
    ${answerHTML}
    <button class="back-button" onclick="startCategory('${currentCategory}')">
        ҚАЙТА ОРЫНДАУ
    </button>
    <button class="back-button" onclick="backToCategories()">
        БАСҚА БАҒЫТТЫ ТАҢДАУ
    </button>
    <button class="back-button" onclick="window.location.href='cabinet.html'">
        КАБИНЕТКЕ ҚАЙТУ
    </button>
`;
resultArea.scrollIntoView({ behavior: "smooth" });

}

// Бағыттарға қайту
function backToCategories() {
document.getElementById(“taskArea”).style.display = “none”;
document.getElementById(“diagnosticResult”).style.display = “none”;

window.scrollTo({ top: 0, behavior: "smooth" });

}

// Мәтінді қауіпсіз көрсету
function escapeDiagnosticHTML(value) {
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

// Бетті ашқанда пациентті көрсету
document.addEventListener(“DOMContentLoaded”, function () {
showDiagnosticPatient();
});
