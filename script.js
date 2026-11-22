// =============================================
// АФАЗИЯ — НЕГІЗГІ БАҒДАРЛАМАНЫ БАСҚАРУ
// =============================================

document.addEventListener(“DOMContentLoaded”, function () {
const home = document.getElementById(“home”);
const cabinet = document.getElementById(“cabinet”);

if (home) home.style.display = "flex";
if (cabinet) cabinet.style.display = "none";

});

// =============================================
// БАҒДАРЛАМАҒА КІРУ
// =============================================

function enterCabinet() {
const home = document.getElementById(“home”);
const cabinet = document.getElementById(“cabinet”);

if (home) home.style.display = "none";
if (cabinet) cabinet.style.display = "block";
showWelcome();
window.scrollTo({
    top: 0,
    behavior: "smooth"
});

}

// =============================================
// БАСТЫ БЕТКЕ ҚАЙТУ
// =============================================

function goHome() {
const home = document.getElementById(“home”);
const cabinet = document.getElementById(“cabinet”);

if (cabinet) cabinet.style.display = "none";
if (home) home.style.display = "flex";
window.scrollTo({
    top: 0,
    behavior: "smooth"
});

}

// =============================================
// БӨЛІМДЕР ТІЗІМІ
// =============================================

const sections = {

breathing: {
    title: "ТЫНЫС АЛУ",
    icon: "🌬️",
    description: "Сөйлеу тынысын дамытуға арналған жаттығулар.",
    exercises: [
        "Дұрыс тыныс алу",
        "Ұзақ дем шығару",
        "Ауа ағынын дамыту"
    ]
},
articulation: {
    title: "АРТИКУЛЯЦИЯ",
    icon: "👄",
    description: "Ерін, тіл және жақ бұлшықеттерінің қозғалысын дамыту.",
    exercises: [
        "Ерін жаттығулары",
        "Тіл жаттығулары",
        "Жақ жаттығулары"
    ]
},
vocabulary: {
    title: "СӨЗДІК ҚОР",
    icon: "📚",
    description: "Сөздерді түсіну, еске түсіру және қолдану.",
    exercises: [
        "Заттарды атау",
        "Суреттермен жұмыс",
        "Сөздерді топтастыру"
    ]
},
understanding: {
    title: "СӨЙЛЕУДІ ТҮСІНУ",
    icon: "👂",
    description: "Сөздер мен сөйлемдердің мағынасын түсіну.",
    exercises: [
        "Сөзді түсіну",
        "Нұсқауды орындау",
        "Сөйлемді түсіну"
    ]
},
speech: {
    title: "СӨЙЛЕУДІ ҚАЛЫПТАСТЫРУ",
    icon: "🗣️",
    description: "Сөз, сөз тіркесі және сөйлем құрастыру.",
    exercises: [
        "Буындарды айту",
        "Сөздерді айту",
        "Сөйлем құрастыру"
    ]
},
reading: {
    title: "ОҚУ ЖӘНЕ ЖАЗУ",
    icon: "📖",
    description: "Оқу және жазу дағдыларын дамыту.",
    exercises: [
        "Әріптерді тану",
        "Сөздерді оқу",
        "Сөздерді жазу"
    ]
},
rhythm: {
    title: "ЛОГОРИТМИКА",
    icon: "🎵",
    description: "Сөйлеу мен қозғалысты ырғақ арқылы үйлестіру.",
    exercises: [
        "Ырғақты қайталау",
        "Қимылмен сөз айту",
        "Музыкалық жаттығулар"
    ]
},
results: {
    title: "НӘТИЖЕЛЕР",
    icon: "🏆",
    description: "Орындалған жаттығулар мен жетістіктер.",
    exercises: [
        "Орындалған тапсырмалар",
        "Жиналған ұпайлар",
        "Жалпы прогресс"
    ]
}

};

// =============================================
// БАСТАПҚЫ ЭКРАН
// =============================================

function showWelcome() {
const welcome = document.getElementById(“welcome”);
const content = document.getElementById(“section-content”);

if (welcome) welcome.style.display = "block";
if (content) {
    content.style.display = "none";
    content.innerHTML = "";
}
document.querySelectorAll(".menu-button").forEach(button => {
    button.classList.remove("active");
});
const firstButton = document.querySelector(".menu-button");
if (firstButton) firstButton.classList.add("active");

}

// =============================================
// БӨЛІМДІ АШУ
// =============================================

function openSection(sectionName, button = null) {
const section = sections[sectionName];

if (!section) {
    console.error("Бөлім табылмады:", sectionName);
    return;
}
const welcome = document.getElementById("welcome");
const content = document.getElementById("section-content");
if (!content) return;
if (welcome) welcome.style.display = "none";
content.style.display = "block";
// Белсенді мәзір батырмасын белгілеу
document.querySelectorAll(".menu-button").forEach(item => {
    item.classList.remove("active");
});
if (button) {
    button.classList.add("active");
} else {
    document.querySelectorAll(".menu-button").forEach(item => {
        const clickText = item.getAttribute("onclick") || "";
        if (clickText.includes("'" + sectionName + "'")) {
            item.classList.add("active");
        }
    });
}
// Жаттығулар тізімін дайындау
let exerciseHTML = "";
section.exercises.forEach((exercise, index) => {
    exerciseHTML += `
        <div class="game-card">
            <div class="game-number">${index + 1}</div>
            <div>
                <h3>${exercise}</h3>
                <p>Жаттығу мазмұны келесі кезеңде қосылады.</p>
            </div>
            <span class="coming-soon">ДАЙЫНДАЛУДА</span>
        </div>
    `;
});
content.innerHTML = `
    <div class="game-section">
        <div class="game-icon">${section.icon}</div>
        <h1>${section.title}</h1>
        <div class="game-line"></div>
        <p>${section.description}</p>
        <div class="exercise-list">
            ${exerciseHTML}
        </div>
        <button class="back-button" onclick="showWelcome()">
            ← БӨЛІМДЕРГЕ ҚАЙТУ
        </button>
    </div>
`;
content.scrollIntoView({
    behavior: "smooth",
    block: "start"
});

}

// =============================================
// ЛОГОПЕД КАБИНЕТІНЕ ӨТУ
// =============================================

function openLogopedCabinet() {
window.location.href = “cabinet.html”;
}

// =============================================
// ҚАУІПСІЗ МӘТІН
// =============================================

function safeText(value) {
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
