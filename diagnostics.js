const diagnosticTasks = {
understanding: {
title: “Сөйлеуді түсіну”,
tasks: [
{ question: “«Кітап» сөзін таңдаңыз.”, options: [“Кітап”, “Алма”, “Доп”], answer: “Кітап” },
{ question: “«Мысық» сөзін таңдаңыз.”, options: [“Үстел”, “Мысық”, “Гүл”], answer: “Мысық” },
{ question: “«Су ішіңіз» деген нұсқауды таңдаңыз.”, options: [“Отырыңыз”, “Су ішіңіз”, “Жазыңыз”], answer: “Су ішіңіз” },
{ question: “«Күн» сөзін таңдаңыз.”, options: [“Ай”, “Күн”, “Бұлт”], answer: “Күн” },
{ question: “«Есікті ашыңыз» деген нұсқауды таңдаңыз.”, options: [“Есікті ашыңыз”, “Кітап оқыңыз”, “Қолды жуыңыз”], answer: “Есікті ашыңыз” }
]
},

naming: {
    title: "Заттарды атау",
    tasks: [
        { question: "Жемісті таңдаңыз.", options: ["Алма", "Орындық", "Қалам"], answer: "Алма" },
        { question: "Көлікті таңдаңыз.", options: ["Мысық", "Автобус", "Гүл"], answer: "Автобус" },
        { question: "Киімді таңдаңыз.", options: ["Көйлек", "Қасық", "Доп"], answer: "Көйлек" },
        { question: "Ыдысты таңдаңыз.", options: ["Кесе", "Ағаш", "Құс"], answer: "Кесе" },
        { question: "Жануарды таңдаңыз.", options: ["Үстел", "Ит", "Дәптер"], answer: "Ит" }
    ]
},
repetition: {
    title: "Қайталау",
    tasks: [
        { question: "«Ана» сөзін қайталаңыз.", manual: true },
        { question: "«Бала» сөзін қайталаңыз.", manual: true },
        { question: "«Мен үйге барамын» сөйлемін қайталаңыз.", manual: true },
        { question: "«Кітап оқыдым» сөйлемін қайталаңыз.", manual: true },
        { question: "«Бүгін күн жылы» сөйлемін қайталаңыз.", manual: true }
    ]
},
vocabulary: {
    title: "Сөздік қор",
    tasks: [
        { question: "«Қыс» мезгіліне қатысты сөзді таңдаңыз.", options: ["Қар", "Қарбыз", "Гүл"], answer: "Қар" },
        { question: "«Ас үй» бөлмесіне қатысты затты таңдаңыз.", options: ["Төсек", "Қасық", "Теледидар"], answer: "Қасық" },
        { question: "«Көлік» түрін таңдаңыз.", options: ["Пойыз", "Алма", "Көйлек"], answer: "Пойыз" },
        { question: "«Мамандық» атауын таңдаңыз.", options: ["Дәрігер", "Терезе", "Қарындаш"], answer: "Дәрігер" },
        { question: "«Табиғат» сөзіне қатысты ұғымды таңдаңыз.", options: ["Өзен", "Телефон", "Орындық"], answer: "Өзен" }
    ]
},
reading: {
    title: "Оқу",
    tasks: [
        { question: "«АНА» сөзін оқыңыз.", manual: true },
        { question: "«БАЛА» сөзін оқыңыз.", manual: true },
        { question: "«КІТАП» сөзін оқыңыз.", manual: true },
        { question: "«ҮЙ» сөзін оқыңыз.", manual: true },
        { question: "«МЕН КІТАП ОҚЫЙМЫН» сөйлемін оқыңыз.", manual: true }
    ]
},
writing: {
    title: "Жазу",
    tasks: [
        { question: "«АНА» сөзін жазыңыз.", manual: true },
        { question: "«ҮЙ» сөзін жазыңыз.", manual: true },
        { question: "«БАЛА» сөзін жазыңыз.", manual: true },
        { question: "«КІТАП» сөзін жазыңыз.", manual: true },
        { question: "«МЕН ҮЙГЕ БАРАМЫН» сөйлемін жазыңыз.", manual: true }
    ]
}

};

let currentCategory = “”;
let currentAssessmentType = “initial”;
let currentTaskIndex = 0;
let currentAnswers = [];
let currentScore = 0;

function startCategory(category) {
if (!diagnosticTasks[category]) {
alert(“Диагностика бөлімі табылмады.”);
return;
}

const typeSelect = document.getElementById("assessmentType");
currentAssessmentType = typeSelect ? typeSelect.value : "initial";
currentCategory = category;
currentTaskIndex = 0;
currentAnswers = [];
currentScore = 0;
renderDiagnosticTask();

}

function renderDiagnosticTask() {
const page = document.querySelector(”.diagnostics-page”);

if (!page) return;
const category = diagnosticTasks[currentCategory];
const task = category.tasks[currentTaskIndex];
const progress = Math.round(
    ((currentTaskIndex + 1) / category.tasks.length) * 100
);
let answerHTML = "";
if (task.manual) {
    answerHTML = `
        <div class="manual-box">
            <p>Тапсырманы орындағаннан кейін логопед бағасын белгілейді.</p>
            <label>Бағалау:</label>
            <select id="manualScore">
                <option value="3">3 — дұрыс орындады</option>
                <option value="1">1 — жартылай орындады</option>
                <option value="0">0 — орындай алмады</option>
            </select>
        </div>
    `;
} else {
    answerHTML = `
        <div class="answer-options">
            ${task.options.map(option => `
                <button class="answer-option"
                    onclick="selectAnswer(this, '${escapeDiagnosticText(option)}')">
                    ${escapeDiagnosticText(option)}
                </button>
            `).join("")}
        </div>
    `;
}
page.innerHTML = `
    <header class="diagnostics-header">
        <div class="logo">ТІЛАШАР</div>
        <button class="back-button" onclick="showDiagnosticMenu()">
            ← Диагностикаға қайту
        </button>
    </header>
    <div style="
        background:white;
        border:1px solid #eadcc3;
        border-radius:20px;
        padding:25px;
        max-width:750px;
        margin:35px auto;
    ">
        <h2 style="color:#b58a43;text-align:center;">
            ${category.title}
        </h2>
        <p style="text-align:center;color:#8d7b65;">
            ${currentTaskIndex + 1} / ${category.tasks.length} тапсырма
        </p>
        <div style="
            height:9px;
            background:#f0e7d7;
            border-radius:20px;
            overflow:hidden;
            margin:20px 0;
        ">
            <div style="
                height:100%;
                width:${progress}%;
                background:#b58a43;
                border-radius:20px;
            "></div>
        </div>
        <h3 style="text-align:center;margin:35px 0;color:#574735;">
            ${task.question}
        </h3>
        ${answerHTML}
        <button id="nextDiagnosticButton"
            onclick="submitDiagnosticAnswer()"
            style="
                display:block;
                width:100%;
                padding:15px;
                margin-top:30px;
                border:0;
                border-radius:12px;
                background:#b58a43;
                color:white;
                font-size:16px;
                cursor:pointer;
            ">
            ${currentTaskIndex === category.tasks.length - 1
                ? "НӘТИЖЕНІ АЛУ"
                : "КЕЛЕСІ ТАПСЫРМА"}
        </button>
    </div>
`;
if (task.manual) {
    const select = document.getElementById("manualScore");
    if (select) select.value = "3";
}

}

function selectAnswer(button, answer) {
document.querySelectorAll(”.answer-option”).forEach(item => {
item.style.background = “white”;
item.style.borderColor = “#eadcc3”;
item.style.color = “#574735”;
});

button.style.background = "#f8f0df";
button.style.borderColor = "#b58a43";
button.style.color = "#574735";
window.selectedDiagnosticAnswer = answer;

}

function submitDiagnosticAnswer() {
const category = diagnosticTasks[currentCategory];
const task = category.tasks[currentTaskIndex];

let score = 0;
let answer = "";
if (task.manual) {
    const select = document.getElementById("manualScore");
    score = select ? Number(select.value) : 0;
    answer = "Логопед бағалауы";
} else {
    answer = window.selectedDiagnosticAnswer || "";
    if (!answer) {
        alert("Алдымен жауапты таңдаңыз.");
        return;
    }
    score = answer === task.answer ? 3 : 0;
}
currentAnswers.push({
    question: task.question,
    answer: answer,
    score: score
});
currentScore += score;
window.selectedDiagnosticAnswer = "";
if (currentTaskIndex < category.tasks.length - 1) {
    currentTaskIndex++;
    renderDiagnosticTask();
} else {
    finishDiagnostic();
}

}

function finishDiagnostic() {
const category = diagnosticTasks[currentCategory];

const maxScore = category.tasks.length * 3;
const percentage = Math.round((currentScore / maxScore) * 100);
const result = {
    category: category.title,
    categoryKey: currentCategory,
    assessmentType: currentAssessmentType,
    score: currentScore,
    maxScore: maxScore,
    percentage: percentage,
    completed: category.tasks.length,
    answers: currentAnswers,
    date: new Date().toLocaleDateString("kk-KZ"),
    timestamp: Date.now()
};
let results = [];
try {
    results = JSON.parse(
        localStorage.getItem("aphasiaDiagnosticResults") || "[]"
    );
    if (!Array.isArray(results)) results = [];
} catch (error) {
    results = [];
}
results.push(result);
localStorage.setItem(
    "aphasiaDiagnosticResults",
    JSON.stringify(results)
);
showDiagnosticResult(result);

}

function showDiagnosticResult(result) {
const page = document.querySelector(”.diagnostics-page”);

if (!page) return;
let interpretation = "";
if (result.percentage >= 80) {
    interpretation = "Тапсырмалардың басым бөлігін дұрыс орындады.";
} else if (result.percentage >= 50) {
    interpretation = "Дағдыларды орындауда белгілі бір қиындықтар байқалды.";
} else {
    interpretation = "Бұл бағыт бойынша қосымша логопедиялық жұмыс қажет.";
}
page.innerHTML = `
    <header class="diagnostics-header">
        <div class="logo">ТІЛАШАР</div>
    </header>
    <div style="
        max-width:650px;
        margin:40px auto;
        background:white;
        border:1px solid #eadcc3;
        border-radius:22px;
        padding:30px;
        text-align:center;
    ">
        <div style="font-size:45px;">📊</div>
        <h2 style="color:#b58a43;">ДИАГНОСТИКА НӘТИЖЕСІ</h2>
        <h3>${result.category}</h3>
        <div style="
            font-size:48px;
            font-weight:bold;
            color:#b58a43;
            margin:20px;
        ">
            ${result.percentage}%
        </div>
        <p>Жиналған ұпай: ${result.score} / ${result.maxScore}</p>
        <p>Тапсырма саны: ${result.completed}</p>
        <p>Бағалау түрі: ${
            result.assessmentType === "initial"
                ? "Бастапқы диагностика"
                : "Қайта диагностика"
        }</p>
        <p>Күні: ${result.date}</p>
        <div style="
            background:#f8f0df;
            padding:16px;
            border-radius:12px;
            line-height:1.6;
            margin:20px 0;
        ">
            ${interpretation}
        </div>
        <p style="font-size:12px;color:#8d7b65;">
            Нәтиже автоматты есептелді. Қорытындыны логопед
            қосымша бақылау және бағалау арқылы нақтылайды.
        </p>
        <button onclick="showDiagnosticMenu()"
            style="
                width:100%;
                padding:14px;
                margin-top:12px;
                background:#b58a43;
                color:white;
                border:0;
                border-radius:12px;
                cursor:pointer;
            ">
            ДИАГНОСТИКА МӘЗІРІ
        </button>
        <button onclick="window.location.href='cabinet.html'"
            style="
                width:100%;
                padding:14px;
                margin-top:10px;
                background:#f8f0df;
                color:#574735;
                border:1px solid #eadcc3;
                border-radius:12px;
                cursor:pointer;
            ">
            ЛОГОПЕД КАБИНЕТІ
        </button>
    </div>
`;

}

function showDiagnosticMenu() {
window.location.reload();
}

function escapeDiagnosticText(value) {
return String(value)
.replace(/&/g, “&”)
.replace(/</g, “<”)
.replace(/>/g, “>”)
.replace(/”/g, “"”)
.replace(/’/g, “'”);
}
