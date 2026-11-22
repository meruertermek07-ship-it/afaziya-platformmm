// ==================================
// АФАЗИЯ — GAME PLATFORM
// ==================================
// 1. КАБИНЕТКЕ КІРУ
function enterCabinet() {
    document.getElementById("home").style.display = "none";
    document.getElementById("cabinet").style.display = "block";
    window.scrollTo(0, 0);
}
// 2. БАСТЫ БЕТКЕ ҚАЙТУ
function goHome() {
    document.getElementById("cabinet").style.display = "none";
    document.getElementById("home").style.display = "flex";
    window.scrollTo(0, 0);
}
// 3. БӨЛІМДЕР
const sections = {
    breathing: {
        number: "01",
        icon: "🌬️",
        title: "ТЫНЫС АЛУ",
        subtitle: "Тыныс алу әлемі",
        description:
            "Сөйлеу тынысын дамытуға және тыныс пен сөйлеу үйлесімділігін жетілдіруге арналған бөлім."
    },
    articulation: {
        number: "02",
        icon: "👄",
        title: "АРТИКУЛЯЦИЯ",
        subtitle: "Артикуляция әлемі",
        description:
            "Артикуляциялық аппараттың қимыл-қозғалысын дамытуға арналған бөлім."
    },
    vocabulary: {
        number: "03",
        icon: "📚",
        title: "СӨЗДІК ҚОР",
        subtitle: "Сөздер қазынасы",
        description:
            "Сөздерді еске түсіру, атау және сөздік қорды белсендіруге арналған бөлім."
    },
    understanding: {
        number: "04",
        icon: "🧠",
        title: "СӨЙЛЕУДІ ТҮСІНУ",
        subtitle: "Түсіну әлемі",
        description:
            "Ауызша сөйлеуді қабылдау, сөздердің мағынасын түсіну қабілетін дамытуға арналған бөлім."
    },
    speech: {
        number: "05",
        icon: "💬",
        title: "СӨЙЛЕУДІ ҚАЛЫПТАСТЫРУ",
        subtitle: "Сөйлеу әлемі",
        description:
            "Сөздерді, сөйлемдерді және байланыстырып сөйлеуді қалыптастыруға арналған бөлім."
    },
    reading: {
        number: "06",
        icon: "✍️",
        title: "ОҚУ ЖӘНЕ ЖАЗУ",
        subtitle: "Әріптер әлемі",
        description:
            "Оқу және жазу дағдыларын қалпына келтіруге арналған бөлім."
    },
    rhythm: {
        number: "07",
        icon: "🎵",
        title: "ЛОГОРИТМИКА",
        subtitle: "Ырғақ әлемі",
        description:
            "Қозғалыс, ырғақ және сөйлеу әрекетін үйлестіруге арналған бөлім."
    },
    results: {
        number: "08",
        icon: "🏆",
        title: "НӘТИЖЕЛЕР",
        subtitle: "Жетістіктер әлемі",
        description:
            "Орындалған тапсырмалар мен жинақталған нәтижелер көрсетілетін бөлім."
    }
};
// 4. БӨЛІМДІ АШУ
function openSection(sectionName, button) {
    const section = sections[sectionName];
    if (!section) return;
    // Бастапқы ақпаратты жасыру
    document.getElementById("welcome").style.display = "none";
    // Бұрынғы бөлімді жасыру
    const content = document.getElementById("section-content");
    content.style.display = "block";
    // Барлық батырмалардың белсенділігін алып тастау
    document.querySelectorAll(".menu-button").forEach(btn => {
        btn.classList.remove("active");
    });
    // Таңдалған батырманы белгілеу
    button.classList.add("active");
    // Жаңа бөлімді көрсету
    content.innerHTML = `
        <div class="game-section">
            <div class="game-icon">
                ${section.icon}
            </div>
            <span class="game-number">
                ${section.number} • ЛОГОПЕДИЯЛЫҚ БӨЛІМ
            </span>
            <h2>${section.title}</h2>
            <div class="game-line"></div>
            <h3>${section.subtitle}</h3>
            <p>${section.description}</p>
            <div class="coming-soon">
                <span>✦</span>
                <div>
                    <strong>БӨЛІМ ДАЙЫНДАЛУ ҮСТІНДЕ</strong>
                    <small>Оқу материалдары мен тапсырмалар кейін қосылады.</small>
                </div>
            </div>
        </div>
    `;
    // Анимация
    content.classList.remove("section-animation");
    void content.offsetWidth;
    content.classList.add("section-animation");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
