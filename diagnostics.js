const diagnosticCategories = {
understanding: {
title: “Сөйлеуді түсіну”,
tasks: [
{ question: “«Көз» сөзін көрсетіңіз.”, options: [“Көз”, “Қол”, “Аяқ”], correct: 0 },
{ question: “«Ит үреді» деген сөйлем нені білдіреді?”, options: [“Ит дыбыс шығарады”, “Ит ұшады”, “Ит жүзеді”], correct: 0 },
{ question: “«Алма» сөзін көрсетіңіз.”, options: [“Алма”, “Кітап”, “Үстел”], correct: 0 },
{ question: “«Есікті жабыңыз» нұсқауын орындаңыз.”, manual: true },
{ question: “«Құс ағашта отыр» сөйлемін түсіндіріңіз.”, manual: true }
]
},

naming: {
    title: "Заттарды атау",
    tasks: [
        { question: "Суретте алма бейнеленген деп елестетіңіз. Оның атауын таңдаңыз.", options: ["Алма", "Доп", "Үй"], correct: 0 },
        { question: "Қайсысы жиһаз?", options: ["Орындық", "Қарбыз", "Құс"], correct: 0 },
        { question: "Қайсысы көлік?", options: ["Автобус", "Қасық", "Гүл"], correct: 0 },
        { question: "Күнделікті қолданатын үш затты атаңыз.", manual: true },
        { question: "Берілген заттардың атауын өзіңіз айтыңыз.", manual: true }
    ]
},
repetition: {
    title: "Қайталап айту",
    tasks: [
        { question: "«Ана» сөзін қайталап айтыңыз.", manual: true },
        { question: "«Мектеп» сөзін қайталап айтыңыз.", manual: true },
        { question: "«Бүгін күн жылы» сөйлемін қайталаңыз.", manual: true },
        { question: "«Мен кітап оқимын» сөйлемін қайталаңыз.", manual: true },
        { question: "«Балалар бақшада ойнап жүр» сөйлемін қайталаңыз.", manual: true }
    ]
},
vocabulary: {
    title: "Сөздік қор",
    tasks: [
        { question: "«Қарбыз» қай топқа жатады?", options: ["Жеміс-жидек", "Көлік", "Жиһаз"], correct: 0 },
        { question: "«Қуанышты» сөзіне мағынасы жақын сөзді таңдаңыз.", options: ["Көңілді", "Ашулы", "Шаршаған"], correct: 0 },
        { question: "«Қасық» не үшін қолданылады?", options: ["Тамақ ішуге", "Жазуға", "Ұшуға"], correct: 0 },
        { question: "«Жаз» тақырыбына қатысты бес сөз атаңыз.", manual: true },
        { question: "Берілген сөздермен сөйлем құраңыз.", manual: true }
    ]
},
reading: {
    title: "Оқу",
    tasks: [
        { question: "«АНА» сөзін оқыңыз.", manual: true },
        { question: "«КІТАП» сөзін оқыңыз.", manual: true },
        { question: "«ҮЙ» сөзін оқыңыз.", manual: true },
        { question: "«Мен үйге барамын» сөйлемін оқыңыз.", manual: true },
        { question: "Қысқа мәтінді оқып, мазмұнын айтып беріңіз.", manual: true }
    ]
},
writing: {
    title: "Жазу",
    tasks: [
        { question: "Өз атыңызды жазыңыз.", manual: true },
        { question: "«Ана» сөзін жазыңыз.", manual: true },
        { question: "«Кітап» сөзін жазыңыз.", manual: true },
        { question: "«Мен үйдемін» сөйлемін жазыңыз.", manual: true },
        { question: "Сурет бойынша бір сөйлем жазыңыз.", manual: true }
    ]
}

};

let currentCategory = null;
let currentAssessmentType = “initial”;
let currentTaskIndex = 0;
let currentAnswers = [];
let selectedAnswer = null;
let selectedManualScore = null;

function getDiagnosticPatientId() {
const saved = localStorage.getItem(“aphasiaPatient”);

if (!saved) return null;
try {
    const patient = JSON.parse(saved);
    if (!patient.fullName || !patient.birthDate) return null;
    return patient.fullName.trim().toLowerCase() + "_" + patient.birthDate;
} catch (error) {
    return null;
}

}

function startCategory(categoryKey) {
const patientId = getDiagnosticPatientId();

if (!patientId) {
    alert("Алдымен логопед кабинетінде пациенттің аты-жөні мен туған күнін енгізіп, сақтаңыз.");
    window.location.href = "cabinet.html";
    return;
}
const category = diagnosticCategories[categoryKey];
if (!category) return;
const typeSelect = document.getElementById("assessmentType");
currentAssessmentType = typeSelect ? typeSelect.value : "initial";
currentCategory = categoryKey;
currentTaskIndex = 0;
currentAnswers = [];
renderDiagnosticTask();

}

function renderDiagnosticTask() {
const page = document.querySelector(”.diagnostics-page”);

if (!page || !currentCategory) return;
const category = diagnosticCategories[currentCategory];
const task = category.tasks[currentTaskIndex];
const progress = Math.round(
    (currentTaskIndex / category.tasks.length) * 100
);
let answerContent = "";
if (task.manual) {
    answerContent = `
        <p class="manual-instruction">
            Тапсырманы пациентке оқып беріңіз.
            Орындауын логопед бақылап, төмендегі шкала бойынша бағалайды.
        </p>
        <div class="score-buttons">
            ${[0, 1, 2, 3].map(score => `
                <button type="button"
                    class="score-button"
                    onclick="selectManualScore(${score}, this)">
                    ${score} балл
                </button>
            `).join("")}
        </div>
    `;
} else {
    answerContent = `
        <div class="answer-options">
            ${task.options.map((option, index) => `
                <button type="button"
                    class="answer-button"
                    onclick="selectDiagnosticAnswer(${index}, this)">
                    ${escapeDiagnosticText(option)}
                </button>
            `).join("")}
        </div>
    `;
}
page.innerHTML = `
    <div class="top">
        <h1>ТІЛАШАР</h1>
        <h2>${category.title}</h2>
        <p>${currentAssessmentType === "initial"
            ? "Бастапқы диагностика"
            : "Қайталама диагностика"}</p>
    </div>
    <div class="diagnostic-task">
        <p>Тапсырма ${currentTaskIndex + 1} / ${category.tasks.length}</p>
        <div class="progress">
            <div class="progress-fill" style="width:${progress}%"></div>
        </div>
        <h2>${escapeDiagnosticText(task.question)}</h2>
        ${answerContent}
        <button type="button" onclick="submitDiagnosticAnswer()">
            ${currentTaskIndex === category.tasks.length - 1
                ? "НӘТИЖЕНІ АЯҚТАУ"
                : "КЕЛЕСІ ТАПСЫРМА"}
        </button>
    </div>
    <button type="button" class="back-button"
        onclick="showDiagnosticMenu()">
        ← БӨЛІМДЕРГЕ ҚАЙТУ
    </button>
`;
addDiagnosticStyles();

}

function selectDiagnosticAnswer(answer, button) {
selectedAnswer = answer;

document.querySelectorAll(".answer-button").forEach(item => {
    item.classList.remove("selected");
});
button.classList.add("selected");

}

function selectManualScore(score, button) {
selectedManualScore = score;

document.querySelectorAll(".score-button").forEach(item => {
    item.classList.remove("selected");
});
button.classList.add("selected");

}

function submitDiagnosticAnswer() {
const task = diagnosticCategories[currentCategory].tasks[currentTaskIndex];

let score;
if (task.manual) {
    if (selectedManualScore === null) {
        alert("Бағалау үшін балл таңдаңыз.");
        return;
    }
    score = selectedManualScore;
} else {
    if (selectedAnswer === null) {
        alert("Жауап нұсқасын таңдаңыз.");
        return;
    }
    score = selectedAnswer === task.correct ? 3 : 0;
}
currentAnswers.push({
    question: task.question,
    score: score,
    maxScore: 3
});
selectedAnswer = null;
selectedManualScore = null;
if (
    currentTaskIndex <
    diagnosticCategories[currentCategory].tasks.length - 1
) {
    currentTaskIndex++;
    renderDiagnosticTask();
} else {
    finishDiagnostic();
}

}

function finishDiagnostic() {
const patientId = getDiagnosticPatientId();

if (!patientId) {
    alert("Пациент мәліметтері табылмады.");
    window.location.href = "cabinet.html";
    return;
}
const score = currentAnswers.reduce(
    (sum, answer) => sum + answer.score, 0
);
const maxScore = currentAnswers.length * 3;
const percentage = maxScore
    ? Math.round((score / maxScore) * 100)
    : 0;
const result = {
    patientId: patientId,
    category: diagnosticCategories[currentCategory].title,
    categoryKey: currentCategory,
    assessmentType: currentAssessmentType,
    score: score,
    maxScore: maxScore,
    percentage: percentage,
    completed: true,
    answers: currentAnswers,
    date: new Date().toLocaleDateString("kk-KZ"),
    timestamp: Date.now()
};
const allResults = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
allResults.push(result);
localStorage.setItem(
    "aphasiaDiagnosticResults",
    JSON.stringify(allResults)
);
showDiagnosticResult(result);

}

function showDiagnosticResult(result) {
const page = document.querySelector(”.diagnostics-page”);

if (!page) return;
page.innerHTML = `
    <div class="top">
        <h1>ДИАГНОСТИКА АЯҚТАЛДЫ!</h1>
        <h2>${escapeDiagnosticText(result.category)}</h2>
    </div>
    <div class="diagnostic-task">
        <h2>${result.percentage}%</h2>
        <p>Жинаған ұпайы: ${result.score} / ${result.maxScore}</p>
        <p>Күні: ${escapeDiagnosticText(result.date)}</p>
        <h3>Тапсырмалар бойынша нәтиже</h3>
        ${result.answers.map((answer, index) => `
            <div class="result-item">
                <b>${index + 1}. ${escapeDiagnosticText(answer.question)}</b>
                <p>${answer.score} / 3 балл</p>
            </div>
        `).join("")}
        <p>
            Нәтиже сақталды. Бұл көрсеткіш тапсырмалар бойынша
            жинақталған баллды көрсетеді.
        </p>
        <button onclick="showDiagnosticMenu()">БАСҚА БӨЛІМДІ ТАҢДАУ</button>
        <button onclick="window.location.href='cabinet.html'">
            КАБИНЕТКЕ ҚАЙТУ
        </button>
    </div>
`;

}

function showDiagnosticMenu() {
window.location.reload();
}

function escapeDiagnosticText(value) {
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

function addDiagnosticStyles() {
if (document.getElementById(“diagnostic-extra-styles”)) return;

const style = document.createElement("style");
style.id = "diagnostic-extra-styles";
style.textContent = `
    .progress {
        height: 10px;
        background: #eee4d1;
        border-radius: 20px;
        overflow: hidden;
        margin: 15px 0 25px;
    }
    .progress-fill {
        height: 100%;
        background: #b58a3b;
        transition: width .3s;
    }
    .answer-options,
    .score-buttons {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        margin: 20px 0;
    }
    .answer-button,
    .score-button {
        width: 100%;
        margin: 0;
        padding: 16px;
        background: #fff;
        color: #493b2b;
        border: 1px solid #d9c49b;
    }
    .answer-button.selected,
    .score-button.selected {
        background: #b58a3b;
        color: white;
    }
    .manual-instruction {
        line-height: 1.6;
        color: #786d5b;
    }
    .result-item {
        padding: 12px;
        margin: 10px 0;
        background: #fff8e9;
        border-radius: 10px;
    }
`;
document.head.appendChild(style);

}
