// ========================================
// АФАЗИЯ — ДИАГНОСТИКАЛЫҚ ЖҮЙЕ
// ========================================

const diagnosticTasks = {

    understanding: {
        title: "СӨЙЛЕУДІ ТҮСІНУ",
        tasks: [
            {
                question: "«Алма» деген сөзге сәйкес суретті таңдаңыз.",
                options: ["🍎 Алма", "🚗 Көлік", "🏠 Үй"],
                correct: 0
            },
            {
                question: "«Ит» деген сөзге сәйкес нұсқаны таңдаңыз.",
                options: ["🐈 Мысық", "🐕 Ит", "🐦 Құс"],
                correct: 1
            },
            {
                question: "«Суға» қатысты затты таңдаңыз.",
                options: ["🥄 Қасық", "🥛 Стақан", "📚 Кітап"],
                correct: 1
            },
            {
                question: "«Қыста қар жауады» сөйлеміне сәйкес жауапты таңдаңыз.",
                options: ["Жаз", "Қыс", "Көктем"],
                correct: 1
            },
            {
                question: "«Кітапты үстелге қойыңыз» нұсқауын орындаңыз. Логопед орындауын белгілейді.",
                options: ["Өздігінен орындады", "Көмекпен орындады", "Орындай алмады"],
                correct: null,
                manual: true
            }
        ]
    },

    naming: {
        title: "ЗАТТАРДЫ АТАУ",
        tasks: [
            {
                question: "🍎 Бұл қандай зат?",
                options: ["Алма", "Доп", "Үй"],
                correct: 0
            },
            {
                question: "🚗 Бұл не?",
                options: ["Ұшақ", "Көлік", "Пойыз"],
                correct: 1
            },
            {
                question: "🐈 Бұл қандай жануар?",
                options: ["Ит", "Құс", "Мысық"],
                correct: 2
            },
            {
                question: "☀️ Бұл не?",
                options: ["Ай", "Күн", "Жұлдыз"],
                correct: 1
            },
            {
                question: "🥄 Бұл зат қалай аталады?",
                options: ["Қасық", "Пышақ", "Шанышқы"],
                correct: 0
            }
        ]
    },

    repetition: {
        title: "ҚАЙТАЛАУ",
        tasks: [
            {
                question: "«Ана» сөзін қайталаңыз.",
                manual: true
            },
            {
                question: "«Бала» сөзін қайталаңыз.",
                manual: true
            },
            {
                question: "«Кітап» сөзін қайталаңыз.",
                manual: true
            },
            {
                question: "«Мен үйге барамын» сөйлемін қайталаңыз.",
                manual: true
            },
            {
                question: "«Бүгін күн жылы» сөйлемін қайталаңыз.",
                manual: true
            }
        ]
    },

    vocabulary: {
        title: "СӨЗДІК ҚОР",
        tasks: [
            {
                question: "Жемісті таңдаңыз.",
                options: ["Алма", "Үстел", "Қалам"],
                correct: 0
            },
            {
                question: "Киімді таңдаңыз.",
                options: ["Кітап", "Көйлек", "Қасық"],
                correct: 1
            },
            {
                question: "Көлік түрін таңдаңыз.",
                options: ["Автобус", "Алмұрт", "Мысық"],
                correct: 0
            },
            {
                question: "Үй жануарын таңдаңыз.",
                options: ["Қасқыр", "Жолбарыс", "Сиыр"],
                correct: 2
            },
            {
                question: "Ыдысты таңдаңыз.",
                options: ["Кесе", "Дәптер", "Ағаш"],
                correct: 0
            }
        ]
    },

    reading: {
        title: "ОҚУ",
        tasks: [
            {
                question: "«АНА» сөзін оқыңыз.",
                manual: true
            },
            {
                question: "«ҮЙ» сөзін оқыңыз.",
                manual: true
            },
            {
                question: "«КІТАП» сөзін оқыңыз.",
                manual: true
            },
            {
                question: "«БАЛА» сөзін оқыңыз.",
                manual: true
            },
            {
                question: "«МЕН ҮЙГЕ БАРАМЫН» сөйлемін оқыңыз.",
                manual: true
            }
        ]
    },

    writing: {
        title: "ЖАЗУ",
        tasks: [
            {
                question: "«АНА» сөзін көшіріп жазыңыз.",
                manual: true
            },
            {
                question: "«ҮЙ» сөзін көшіріп жазыңыз.",
                manual: true
            },
            {
                question: "«АЛМА» сөзін көшіріп жазыңыз.",
                manual: true
            },
            {
                question: "Өз атыңызды жазыңыз.",
                manual: true
            },
            {
                question: "«МЕН ҮЙГЕ БАРАМЫН» сөйлемін жазыңыз.",
                manual: true
            }
        ]
    }

};


// ========================================
// ЖҮЙЕНІҢ ЖҰМЫС КҮЙІ
// ========================================

let currentCategory = "";
let currentTaskIndex = 0;
let currentScore = 0;
let completedTasks = 0;
let answers = [];

const MAX_TASK_SCORE = 3;


// ========================================
// ПАЦИЕНТТІ КӨРСЕТУ
// ========================================

function showDiagnosticPatient() {

    const patient = JSON.parse(
        localStorage.getItem("aphasiaPatient") || "null"
    );

    const area = document.getElementById("patientName");

    if (!patient) {
        area.innerHTML = `
            <h3>Пациент мәліметтері табылмады</h3>
            <p>Алдымен логопед кабинетінде пациентті тіркеңіз.</p>
            <button class="enter-button"
                onclick="location.href='cabinet.html'">
                КАБИНЕТКЕ ҚАЙТУ
            </button>
        `;
        return;
    }

    area.innerHTML = `
        <h3>ПАЦИЕНТ</h3>
        <p><strong>${escapeDiagnosticHTML(patient.fullName)}</strong></p>
        <p>Жасы: ${escapeDiagnosticHTML(patient.age)}</p>
        <p>Диагнозы: ${escapeDiagnosticHTML(patient.diagnosis || "Көрсетілмеген")}</p>
    `;
}

showDiagnosticPatient();


// ========================================
// ДИАГНОСТИКАНЫ БАСТАУ
// ========================================

function startCategory(category) {

    if (!diagnosticTasks[category]) return;

    currentCategory = category;
    currentTaskIndex = 0;
    currentScore = 0;
    completedTasks = 0;
    answers = [];

    document.getElementById("diagnosticResult").style.display = "none";

    showTask();

}


// ========================================
// ТАПСЫРМАНЫ КӨРСЕТУ
// ========================================

function showTask() {

    const category = diagnosticTasks[currentCategory];
    const task = category.tasks[currentTaskIndex];

    const area = document.getElementById("taskArea");

    area.style.display = "block";

    let optionsHTML = "";

    if (task.options) {

        optionsHTML = task.options.map((option, index) => `
            <button class="world-card"
                onclick="checkAnswer(${index})">
                ${option}
            </button>
        `).join("");

    } else {

        optionsHTML = `
            <div class="coming-soon">
                <div>
                    <strong>ЛОГОПЕДКЕ АРНАЛҒАН БАҒАЛАУ</strong>
                    <small>Пациент тапсырманы орындағаннан кейін тиісті бағалауды таңдаңыз.</small>
                </div>
            </div>

            <div class="world-grid">
                <button class="world-card" onclick="checkManual(3)">
                    3 балл<br>Өздігінен орындады
                </button>

                <button class="world-card" onclick="checkManual(2)">
                    2 балл<br>Аздаған көмекпен
                </button>

                <button class="world-card" onclick="checkManual(1)">
                    1 балл<br>Едәуір көмекпен
                </button>

                <button class="world-card" onclick="checkManual(0)">
                    0 балл<br>Орындай алмады
                </button>
            </div>
        `;
    }

    area.innerHTML = `
        <span class="game-number">
            ${category.title}
        </span>

        <h2>ТАПСЫРМА ${currentTaskIndex + 1} / ${category.tasks.length}</h2>

        <div class="game-line"></div>

        <h3>${task.question}</h3>

        <div class="world-grid">
            ${optionsHTML}
        </div>

        <p style="margin-top:20px;">
            Ағымдағы ұпай: ${currentScore}
        </p>
    `;

    area.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ========================================
// АВТОМАТТЫ ТЕКСЕРУ
// ========================================

function checkAnswer(selected) {

    const task = diagnosticTasks[currentCategory].tasks[currentTaskIndex];

    const correct = selected === task.correct;

    const score = correct ? 3 : 0;

    saveTaskAnswer(score, correct ? "Дұрыс" : "Қате");
}


// ========================================
// ЛОГОПЕД БАҒАЛАУЫ
// ========================================

function checkManual(score) {

    saveTaskAnswer(score, "Логопед бағалады");

}


// ========================================
// НӘТИЖЕНІ САҚТАУ
// ========================================

function saveTaskAnswer(score, status) {

    currentScore += score;
    completedTasks++;

    answers.push({
        task: currentTaskIndex + 1,
        score: score,
        status: status
    });

    currentTaskIndex++;

    const totalTasks = diagnosticTasks[currentCategory].tasks.length;

    if (currentTaskIndex < totalTasks) {
        showTask();
    } else {
        showCategoryResult();
    }

}


// ========================================
// БӨЛІМ НӘТИЖЕСІ
// ========================================

function showCategoryResult() {

    const category = diagnosticTasks[currentCategory];

    const maxScore = category.tasks.length * MAX_TASK_SCORE;

    const percentage = Math.round((currentScore / maxScore) * 100);

    const result = {
        category: currentCategory,
        title: category.title,
        score: currentScore,
        maxScore: maxScore,
        percentage: percentage,
        completed: completedTasks,
        answers: answers,
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

    const area = document.getElementById("diagnosticResult");

    area.style.display = "block";

    area.innerHTML = `
        <h2>🏆 ДИАГНОСТИКА НӘТИЖЕСІ</h2>

        <h3>${category.title}</h3>

        <div class="game-icon">📊</div>

        <h2>${currentScore} / ${maxScore} балл</h2>

        <h3>${percentage}%</h3>

        <p>Орындалған тапсырмалар: ${completedTasks}</p>

        <div class="game-line"></div>

        <h3>ТАПСЫРМАЛАР БОЙЫНША НӘТИЖЕ</h3>

        ${answers.map(answer => `
            <p>
                ${answer.task}-тапсырма:
                ${answer.score} / 3 балл —
                ${answer.status}
            </p>
        `).join("")}

        <button class="enter-button" onclick="startCategory('${currentCategory}')">
            ҚАЙТА ӨТУ
        </button>
    `;

    document.getElementById("taskArea").style.display = "none";

    area.scrollIntoView({
        behavior: "smooth"
    });

}


// ========================================
// ҚАУІПСІЗ МӘТІН ШЫҒАРУ
// ========================================

function escapeDiagnosticHTML(value) {

    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);

}
