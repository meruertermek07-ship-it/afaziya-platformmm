const diagnosticTasks = {
understanding: {
title: “Сөйлеуді түсіну”,
tasks: [
{
question: “«Алма» сөзін таңдаңыз.”,
options: [“Алма”, “Үстел”, “Кітап”],
answer: “Алма”
},
{
question: “«Мысық» сөзін таңдаңыз.”,
options: [“Ит”, “Мысық”, “Құс”],
answer: “Мысық”
},
{
question: “«Қыста қар жауады» сөйлемін аяқтаңыз.”,
options: [“Қар”, “Жапырақ”, “Гүл”],
answer: “Қар”
},
{
question: “«Көзіңізді жұмыңыз» нұсқауын орындаңыз.”,
options: [“Көзді жұму”, “Қолды көтеру”, “Орныңыздан тұру”],
answer: “Көзді жұму”
},
{
question: “«Қасықпен не істейміз?»”,
options: [“Тамақ ішеміз”, “Жазамыз”, “Сурет саламыз”],
answer: “Тамақ ішеміз”
}
]
},

naming: {
    title: "Заттарды атау",
    tasks: [
        {
            question: "Суретсіз берілген сөз: жемістің атауын таңдаңыз.",
            options: ["Алма", "Орындық", "Қалам"],
            answer: "Алма"
        },
        {
            question: "Көлік атауын таңдаңыз.",
            options: ["Автобус", "Қасық", "Гүл"],
            answer: "Автобус"
        },
        {
            question: "Жануар атауын таңдаңыз.",
            options: ["Мысық", "Үстел", "Терезе"],
            answer: "Мысық"
        },
        {
            question: "Киім атауын таңдаңыз.",
            options: ["Көйлек", "Алмұрт", "Кесе"],
            answer: "Көйлек"
        },
        {
            question: "Ыдыс атауын таңдаңыз.",
            options: ["Кесе", "Доп", "Ағаш"],
            answer: "Кесе"
        }
    ]
},
repetition: {
    title: "Қайталап айту",
    tasks: [
        {
            question: "«Ана» сөзін қайталаңыз. Өзіңізге сәйкес жауапты таңдаңыз.",
            options: ["Дұрыс қайталадым", "Қиналдым", "Қайталай алмадым"],
            manual: true
        },
        {
            question: "«Бала» сөзін қайталаңыз.",
            options: ["Дұрыс қайталадым", "Қиналдым", "Қайталай алмадым"],
            manual: true
        },
        {
            question: "«Мен үйге барамын» сөйлемін қайталаңыз.",
            options: ["Дұрыс қайталадым", "Қиналдым", "Қайталай алмадым"],
            manual: true
        },
        {
            question: "«Кітап» сөзін қайталаңыз.",
            options: ["Дұрыс қайталадым", "Қиналдым", "Қайталай алмадым"],
            manual: true
        },
        {
            question: "«Бүгін күн жылы» сөйлемін қайталаңыз.",
            options: ["Дұрыс қайталадым", "Қиналдым", "Қайталай алмадым"],
            manual: true
        }
    ]
},
vocabulary: {
    title: "Сөздік қор",
    tasks: [
        {
            question: "«Алма» қай топқа жатады?",
            options: ["Жеміс", "Киім", "Жиһаз"],
            answer: "Жеміс"
        },
        {
            question: "«Қасық» не үшін қолданылады?",
            options: ["Тамақ ішу", "Жазу", "Ұшу"],
            answer: "Тамақ ішу"
        },
        {
            question: "«Қыс» мезгілінен кейін қай мезгіл келеді?",
            options: ["Көктем", "Күз", "Жаз"],
            answer: "Көктем"
        },
        {
            question: "«Қуаныш» сөзіне қарама-қарсы мағыналы сөзді таңдаңыз.",
            options: ["Қайғы", "Күлкі", "Бақыт"],
            answer: "Қайғы"
        },
        {
            question: "«Дәрігер» қай жерде жұмыс істейді?",
            options: ["Ауруханада", "Мектепте", "Дүкенде"],
            answer: "Ауруханада"
        }
    ]
},
reading: {
    title: "Оқу",
    tasks: [
        {
            question: "«АНА» сөзін оқып, дұрыс нұсқаны таңдаңыз.",
            options: ["АНА", "АТА", "АЛА"],
            answer: "АНА"
        },
        {
            question: "«ҮЙ» сөзін оқыңыз.",
            options: ["ҮЙ", "КҮН", "АЙ"],
            answer: "ҮЙ"
        },
        {
            question: "«КІТАП» сөзін табыңыз.",
            options: ["КІТАП", "ҚАЛАМ", "ДӘПТЕР"],
            answer: "КІТАП"
        },
        {
            question: "«АЛМА» сөзін табыңыз.",
            options: ["АЛМА", "АЛҒА", "АЛТЫН"],
            answer: "АЛМА"
        },
        {
            question: "«БАЛА ҮЙГЕ КЕЛДІ» сөйлемін оқыңыз.",
            options: [
                "БАЛА ҮЙГЕ КЕЛДІ",
                "БАЛА ДАЛАҒА КЕТТІ",
                "ӘКЕ ЖҰМЫСҚА КЕТТІ"
            ],
            answer: "БАЛА ҮЙГЕ КЕЛДІ"
        }
    ]
},
writing: {
    title: "Жазу",
    tasks: [
        {
            question: "«АНА» сөзін дәптерге жазыңыз.",
            options: ["Дұрыс жаздым", "Қателестім", "Жаза алмадым"],
            manual: true
        },
        {
            question: "«ҮЙ» сөзін жазыңыз.",
            options: ["Дұрыс жаздым", "Қателестім", "Жаза алмадым"],
            manual: true
        },
        {
            question: "«КІТАП» сөзін көшіріп жазыңыз.",
            options: ["Дұрыс жаздым", "Қателестім", "Жаза алмадым"],
            manual: true
        },
        {
            question: "«АЛМА» сөзін жазыңыз.",
            options: ["Дұрыс жаздым", "Қателестім", "Жаза алмадым"],
            manual: true
        },
        {
            question: "«БАЛА ҮЙГЕ КЕЛДІ» сөйлемін жазыңыз.",
            options: ["Дұрыс жаздым", "Қателестім", "Жаза алмадым"],
            manual: true
        }
    ]
}

};

let currentCategory = null;
let currentTaskIndex = 0;
let currentAnswers = [];
let currentAssessmentType = “initial”;

function startCategory(category) {
if (!diagnosticTasks[category]) return;

currentCategory = category;
currentTaskIndex = 0;
currentAnswers = [];
currentAssessmentType =
    document.getElementById("assessmentType")?.value || "initial";
renderDiagnosticTask();

}

function renderDiagnosticTask() {
const page = document.querySelector(”.diagnostics-page”);
if (!page || !currentCategory) return;

const category = diagnosticTasks[currentCategory];
const task = category.tasks[currentTaskIndex];
let html = `
    <section class="assessment-box">
        <h2>${category.title}</h2>
        <p>Тапсырма ${currentTaskIndex + 1} / ${category.tasks.length}</p>
        <div style="background:#50302b;height:9px;border-radius:10px;margin:20px 0;">
            <div style="
                width:${((currentTaskIndex + 1) / category.tasks.length) * 100}%;
                height:9px;
                background:var(--gold);
                border-radius:10px;">
            </div>
        </div>
        <h3 style="color:var(--gold-light);margin:25px 0;">
            ${task.question}
        </h3>
        <div class="diagnostic-options">
`;
task.options.forEach((option, index) => {
    html += `
        <label style="
            display:block;
            background:#49202a;
            padding:15px;
            border-radius:10px;
            margin:10px 0;
            cursor:pointer;
            color:white;">
            <input type="radio" name="taskAnswer" value="${index}">
            ${option}
        </label>
    `;
});
html += `
        </div>
        <p id="taskError" style="color:#ffb4b4;"></p>
        <button class="back-cabinet-button"
            onclick="submitDiagnosticAnswer()">
            ${currentTaskIndex === category.tasks.length - 1
                ? "Нәтижені аяқтау"
                : "Келесі тапсырма"}
        </button>
        <button class="back-cabinet-button"
            onclick="showDiagnosticMenu()">
            Тоқтату
        </button>
    </section>
`;
page.innerHTML = `
    <header class="diagnostics-header">
        <h1>АФАЗИЯ ДИАГНОСТИКАСЫ</h1>
    </header>
    ${html}
`;

}

function submitDiagnosticAnswer() {
const selected = document.querySelector(
‘input[name=“taskAnswer”]:checked’
);

const task = diagnosticTasks[currentCategory].tasks[currentTaskIndex];
if (!selected) {
    document.getElementById("taskError").textContent =
        "Жауап нұсқасын таңдаңыз.";
    return;
}
const selectedIndex = Number(selected.value);
let score = 0;
if (task.manual) {
    score = selectedIndex === 0 ? 3 :
            selectedIndex === 1 ? 1 : 0;
} else {
    score = task.options[selectedIndex] === task.answer ? 3 : 0;
}
currentAnswers.push({
    question: task.question,
    answer: task.options[selectedIndex],
    score: score
});
currentTaskIndex++;
if (currentTaskIndex < diagnosticTasks[currentCategory].tasks.length) {
    renderDiagnosticTask();
} else {
    finishDiagnostic();
}

}

function finishDiagnostic() {
const category = diagnosticTasks[currentCategory];

const totalScore = currentAnswers.reduce(
    (sum, answer) => sum + answer.score, 0
);
const maxScore = category.tasks.length * 3;
const percentage = Math.round(totalScore / maxScore * 100);
const result = {
    category: category.title,
    categoryKey: currentCategory,
    assessmentType: currentAssessmentType,
    score: totalScore,
    maxScore: maxScore,
    percentage: percentage,
    completed: category.tasks.length,
    answers: currentAnswers,
    date: new Date().toLocaleDateString("kk-KZ")
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
    <section class="assessment-box" style="text-align:center;">
        <h1 style="color:var(--gold);">
            ДИАГНОСТИКА АЯҚТАЛДЫ
        </h1>
        <h2>${result.category}</h2>
        <div style="
            font-size:42px;
            color:var(--gold);
            font-weight:bold;
            margin:25px;">
            ${result.percentage}%
        </div>
        <p>Жинаған ұпай: ${result.score} / ${result.maxScore}</p>
        <p>Орындалған тапсырма: ${result.completed}</p>
        <p style="color:var(--muted);">
            Нәтиже логопед кабинетінде сақталды.
            Бұл көрсеткіштер тапсырмалардың орындалуын сипаттайды,
            клиникалық диагноз болып саналмайды.
        </p>
        <button class="back-cabinet-button"
            onclick="showDiagnosticMenu()">
            Диагностика мәзіріне оралу
        </button>
        <button class="back-cabinet-button"
            onclick="window.location.href='cabinet.html'">
            Логопед кабинетіне өту
        </button>
    </section>
`;

}

function showDiagnosticMenu() {
window.location.reload();
}
