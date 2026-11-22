document.addEventListener(“DOMContentLoaded”, function () {
const home = document.getElementById(“home”);
const cabinet = document.getElementById(“cabinet”);

if (home) home.style.display = "flex";
if (cabinet) cabinet.style.display = "none";

});

// Бағдарламаға кіру
function enterCabinet() {
const home = document.getElementById(“home”);
const cabinet = document.getElementById(“cabinet”);

if (home) home.style.display = "none";
if (cabinet) cabinet.style.display = "block";
showWelcome();

}

// Басты бетке қайту
function goHome() {
const home = document.getElementById(“home”);
const cabinet = document.getElementById(“cabinet”);

if (cabinet) cabinet.style.display = "none";
if (home) home.style.display = "flex";

}

// Бөлімдер
const sections = {
breathing: {
title: “ТЫНЫС АЛУ”,
icon: “🌬”,
description: “Дұрыс тыныс алу сөйлеу әрекетінің маңызды бөлігі.”
},

articulation: {
    title: "АРТИКУЛЯЦИЯ",
    icon: "👄",
    description: "Сөйлеу мүшелерінің қимылын жаттықтыру."
},
vocabulary: {
    title: "СӨЗДІК ҚОР",
    icon: "📚",
    description: "Сөздерді тану, түсіну және атау."
},
understanding: {
    title: "СӨЙЛЕУДІ ТҮСІНУ",
    icon: "🧠",
    description: "Сөздер мен сөйлемдердің мағынасын түсіну."
},
speech: {
    title: "СӨЙЛЕУДІ ҚАЛЫПТАСТЫРУ",
    icon: "🗣",
    description: "Сөздер мен сөйлемдерді құрастыру."
},
reading: {
    title: "ОҚУ ЖӘНЕ ЖАЗУ",
    icon: "✍️",
    description: "Оқу және жазу дағдыларын жаттықтыру."
},
rhythm: {
    title: "ЛОГОРИТМИКА",
    icon: "🎵",
    description: "Қимыл, ырғақ және сөйлеуді үйлестіру."
},
results: {
    title: "НӘТИЖЕЛЕР",
    icon: "🏆",
    description: "Орындалған тапсырмалар мен жинақталған ұпайлар."
}

};

// Басты мәзірді көрсету
function showWelcome() {
const welcome = document.getElementById(“welcome”);
const content = document.getElementById(“section-content”);

if (welcome) welcome.style.display = "block";
if (content) {
    content.style.display = "none";
    content.innerHTML = "";
}
document.querySelectorAll(".menu-button").forEach(function (button) {
    button.classList.remove("active");
});

}

// Бөлімді ашу
function openSection(sectionName, button = null) {
const section = sections[sectionName];

if (!section) return;
const welcome = document.getElementById("welcome");
const content = document.getElementById("section-content");
if (!content) return;
if (welcome) welcome.style.display = "none";
content.style.display = "block";
document.querySelectorAll(".menu-button").forEach(function (item) {
    item.classList.remove("active");
});
if (button) {
    button.classList.add("active");
} else {
    const matchingButton = Array.from(
        document.querySelectorAll(".menu-button")
    ).find(function (item) {
        return item.getAttribute("onclick")?.includes(
            "'" + sectionName + "'"
        );
    });
    if (matchingButton) matchingButton.classList.add("active");
}
if (sectionName === "results") {
    showResults();
    return;
}
content.innerHTML = `
    <div class="game-section">
        <h1>${section.icon} ${section.title}</h1>
        <p>${section.description}</p>
        <div class="result-item">
            <h3>ЖАТТЫҒУЛАР</h3>
            <p>Бұл бөлімнің интерактивті тапсырмалары келесі кезеңде қосылады.</p>
        </div>
        <button class="enter-button" onclick="showWelcome()">
            ← БӨЛІМДЕРГЕ ҚАЙТУ
        </button>
    </div>
`;

}

// Нәтижелер бөлімі
function showResults() {
const content = document.getElementById(“section-content”);

const results = JSON.parse(
    localStorage.getItem("aphasiaDiagnosticResults") || "[]"
);
const completed = results.reduce(function (sum, item) {
    return sum + (Number(item.completed) || 0);
}, 0);
const points = results.reduce(function (sum, item) {
    return sum + (Number(item.score) || 0);
}, 0);
content.innerHTML = `
    <div class="game-section">
        <h1>🏆 НӘТИЖЕЛЕР</h1>
        <div class="result-item">
            <h3>Орындалған тапсырмалар</h3>
            <h2>${completed}</h2>
        </div>
        <div class="result-item">
            <h3>Жиналған балл</h3>
            <h2>${points}</h2>
        </div>
        <p>Диагностикалық тапсырмалар нәтижелері логопед кабинетінде сақталады.</p>
        <button class="enter-button" onclick="showWelcome()">
            ← ҚАЙТУ
        </button>
    </div>
`;

}

// Логопед кабинетіне өту
function openLogopedCabinet() {
window.location.href = “./cabinet.html”;
}
