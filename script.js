// ТІЛАШАР — АФАЗИЯ
// БАСТЫ БЕТ ЖӘНЕ 8 БӨЛІМ

const sections = {
    breathing: {
        title: "ТЫНЫС АЛУ",
        description: "Сөйлеу тынысын дамытуға арналған жаттығулар.",
        tasks: [
            "Дұрыс тыныс алуды үйрену",
            "Мұрын арқылы тыныс алу",
            "Ауыз арқылы дем шығару",
            "Ұзақ дем шығару",
            "Демді бірқалыпты реттеу"
        ]
    },

    articulation: {
        title: "АРТИКУЛЯЦИЯ",
        description: "Сөйлеу мүшелерінің қимыл-қозғалысын дамыту.",
        tasks: [
            "Ерін жаттығулары",
            "Тіл жаттығулары",
            "Жақ жаттығулары",
            "Артикуляциялық қалыптар",
            "Қимылдарды қайталау"
        ]
    },

    vocabulary: {
        title: "СӨЗДІК ҚОР",
        description: "Сөздерді түсіну және белсенді сөздік қорды дамыту.",
        tasks: [
            "Заттарды атау",
            "Суреттерді сәйкестендіру",
            "Заттардың атауын табу",
            "Сөздерді топтастыру",
            "Сөздерді сөйлемде қолдану"
        ]
    },

    understanding: {
        title: "СӨЙЛЕУДІ ТҮСІНУ",
        description: "Сөздер мен сөйлемдердің мағынасын түсінуді дамыту.",
        tasks: [
            "Жеке сөздерді түсіну",
            "Қарапайым нұсқауларды орындау",
            "Сөйлемдерді түсіну",
            "Сұрақтарға жауап беру",
            "Мәтін мазмұнын түсіну"
        ]
    },

    speech: {
        title: "СӨЙЛЕУДІ ҚАЛЫПТАСТЫРУ",
        description: "Өз ойын сөзбен жеткізу дағдыларын дамыту.",
        tasks: [
            "Жеке сөздерді айту",
            "Сөз тіркестерін құрастыру",
            "Қарапайым сөйлем құрау",
            "Сурет бойынша әңгімелеу",
            "Өз ойын жеткізу"
        ]
    },

    reading: {
        title: "ОҚУ ЖӘНЕ ЖАЗУ",
        description: "Оқу және жазу дағдыларын қалпына келтіру.",
        tasks: [
            "Әріптерді тану",
            "Буындарды оқу",
            "Сөздерді оқу",
            "Сөздерді жазу",
            "Қарапайым сөйлем жазу"
        ]
    },

    logorhythmics: {
        title: "ЛОГОРИТМИКА",
        description: "Қимыл, ырғақ және сөйлеуді үйлестіру.",
        tasks: [
            "Ырғақты сезіну",
            "Қимылды қайталау",
            "Музыка ырғағымен қозғалу",
            "Сөз бен қимылды үйлестіру",
            "Қимылды сөйлеу жаттығулары"
        ]
    },

    results: {
        title: "НӘТИЖЕЛЕР",
        description: "Орындалған тапсырмалар мен даму көрсеткіштері.",
        tasks: [
            "Орындалған тапсырмалар",
            "Диагностика нәтижелері",
            "Бастапқы көрсеткіштер",
            "Қайталама көрсеткіштер",
            "Даму динамикасы"
        ]
    }
};


// 1. БАСТАПҚЫ БЕТТЕН БАҒДАРЛАМА МӘЗІРІНЕ ӨТУ
window.enterProgram = function () {
    const home = document.getElementById("home");
    const program = document.getElementById("program");
    const login = document.getElementById("logopedLogin");

    if (home) home.style.display = "none";
    if (login) login.style.display = "none";

    if (program) {
        program.style.display = "block";
        program.scrollIntoView({ behavior: "smooth" });
    }

    showProgramMenu();
};


// 2. ЛОГОПЕД КАБИНЕТІНЕ ӨТУ
window.openLogopedCabinet = function () {
    const home = document.getElementById("home");
    const program = document.getElementById("program");
    const login = document.getElementById("logopedLogin");

    if (home) home.style.display = "none";
    if (program) program.style.display = "none";
    if (login) login.style.display = "flex";
};


// 3. КАБИНЕТКЕ КІРУ
window.enterLogopedCabinet = function () {
    window.location.href = "cabinet.html";
};


// 4. БАҒДАРЛАМАҒА ҚАЙТУ
window.backToProgram = function () {
    const login = document.getElementById("logopedLogin");
    const program = document.getElementById("program");

    if (login) login.style.display = "none";
    if (program) program.style.display = "block";

    showProgramMenu();
};


// 5. СЕГІЗ БӨЛІМНІҢ БІРІН АШУ
window.openSection = function (sectionName, button) {
    const section = sections[sectionName];

    if (!section) {
        alert("Бұл бөлім табылмады!");
        return;
    }

    const grid = document.getElementById("world-grid");
    const content = document.getElementById("section-content");
    const heading = document.getElementById("program-heading");

    if (!content || !grid) {
        alert("Бөлімнің HTML элементтері табылмады. index.html файлын тексер.");
        return;
    }

    grid.style.display = "none";
    content.style.display = "block";

    if (heading) heading.style.display = "none";

    content.innerHTML = `
        <div class="section-page">
            <button class="back-to-menu" onclick="showProgramMenu()">
                ← МӘЗІРГЕ ҚАЙТУ
            </button>

            <h2>${section.title}</h2>

            <p>${section.description}</p>

            <div class="task-list">
                ${section.tasks.map((task, index) => `
                    <div class="task-card">
                        <span class="task-number">${index + 1}</span>
                        <span>${task}</span>
                        <button onclick="openTask('${sectionName}', ${index})">
                            АШУ
                        </button>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
};


// 6. ТАПСЫРМАНЫ АШУ
window.openTask = function (sectionName, taskIndex) {
    const section = sections[sectionName];

    if (!section || !section.tasks[taskIndex]) return;

    const content = document.getElementById("section-content");
    const taskName = section.tasks[taskIndex];

    content.innerHTML = `
        <div class="section-page">
            <button class="back-to-menu" onclick="openSection('${sectionName}')">
                ← АРТҚА
            </button>

            <h2>${taskName}</h2>

            <p>
                Бұл тапсырма логопедиялық жұмысты ұйымдастыруға арналған.
                Тапсырманы маманның бақылауымен орындаңыз.
            </p>

            <div class="task-instruction">
                <h3>Тапсырманың мақсаты</h3>
                <p>${section.description}</p>

                <h3>Орындау тәртібі</h3>
                <p>
                    Логопед нұсқауды түсіндіреді, тапсырманы көрсетеді
                    және орындалуын бақылайды.
                </p>
            </div>
        </div>
    `;
};


// 7. СЕГІЗ БӨЛІМНІҢ МӘЗІРІНЕ ҚАЙТУ
window.showProgramMenu = function () {
    const grid = document.getElementById("world-grid");
    const content = document.getElementById("section-content");
    const heading = document.getElementById("program-heading");

    if (content) {
        content.style.display = "none";
        content.innerHTML = "";
    }

    if (grid) grid.style.display = "grid";
    if (heading) heading.style.display = "block";
};


// 8. БЕТ ЖҮКТЕЛГЕН КЕЗДЕ БАСТАПҚЫ КҮЙДІ ОРНАТУ
document.addEventListener("DOMContentLoaded", function () {
    const program = document.getElementById("program");
    const content = document.getElementById("section-content");

    if (program) program.style.display = "none";
    if (content) content.style.display = "none";
});
