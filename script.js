// ===================================
// АФАЗИЯ — НЕГІЗГІ ЖҮЙЕ
// ===================================
// КАБИНЕТКЕ КІРУ
function enterCabinet() {
    document.getElementById("home").style.display = "none";
    document.getElementById("cabinet").style.display = "block";
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
// БАСТЫ БЕТКЕ ҚАЙТУ
function goHome() {
    document.getElementById("cabinet").style.display = "none";
    document.getElementById("home").style.display = "flex";
    document.getElementById("welcome").style.display = "block";
    document.getElementById("section-content").style.display = "none";
    document.querySelectorAll(".menu-button").forEach(button => {
        button.classList.remove("active");
    });
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
// ===================================
// БӨЛІМДЕР ТУРАЛЫ АҚПАРАТ
// ===================================
const sections = {
    breathing: {
        number: "01",
        icon: "🌬️",
        title: "ТЫНЫС АЛУ",
        subtitle: "Тыныс алу әлемі",
        description:
            "Бұл бөлімде тыныс алуды реттеуге, тыныс шығаруды бірқалыпты қалыптастыруға және сөйлеу кезіндегі тыныс үйлесімділігін дамытуға арналған жаттығулар ұсынылады."
    },
    articulation: {
        number: "02",
        icon: "👄",
        title: "АРТИКУЛЯЦИЯ",
        subtitle: "Артикуляция әлемі",
        description:
            "Бұл бөлім ерін, тіл және жақ қимылдарын дамытуға бағытталған. Артикуляциялық жаттығулар сөйлеу мүшелерінің қозғалысын жетілдіруге көмектеседі."
    },
    vocabulary: {
        number: "03",
        icon: "📚",
        title: "СӨЗДІК ҚОР",
        subtitle: "Сөздер қазынасы",
        description:
            "Бұл бөлімде заттардың атауын еске түсіру, сөздерді сәйкестендіру, мағынасына қарай топтастыру және белсенді сөздік қорды дамыту тапсырмалары беріледі."
    },
    understanding: {
        number: "04",
        icon: "🧠",
        title: "СӨЙЛЕУДІ ТҮСІНУ",
        subtitle: "Түсіну әлемі",
        description:
            "Бұл бөлім ауызша нұсқауларды, сөздерді, сөйлемдерді және сұрақтарды түсіну дағдыларын дамытуға арналған."
    },
    speech: {
        number: "05",
        icon: "💬",
        title: "СӨЙЛЕУДІ ҚАЛЫПТАСТЫРУ",
        subtitle: "Сөйлеу әлемі",
        description:
            "Бұл бөлімде сөздерді, сөз тіркестерін және сөйлемдерді құрастыруға арналған тапсырмалар ұсынылады. Мақсаты — күнделікті қарым-қатынасты қолдау."
    },
    reading: {
        number: "06",
        icon: "✍️",
        title: "ОҚУ ЖӘНЕ ЖАЗУ",
        subtitle: "Әріптер әлемі",
        description:
            "Бұл бөлім әріптерді тану, сөздерді оқу, қысқа мәтіндерді түсіну және жазу дағдыларын дамытуға бағытталған."
    },
    rhythm: {
        number: "07",
        icon: "🎵",
        title: "ЛОГОРИТМИКА",
        subtitle: "Ырғақ әлемі",
        description:
            "Бұл бөлімде қозғалыс, ырғақ, музыка және сөйлеу әрекетін үйлестіруге арналған жаттығулар қарастырылады."
    },
    results: {
        number: "08",
        icon: "🏆",
        title: "НӘТИЖЕЛЕР",
        subtitle: "Жетістіктер әлемі",
        description:
            "Бұл бөлімде орындалған тапсырмалар, жинақталған ұпайлар, бонус саны және оқу барысындағы жетістіктер көрсетіледі."
    }
};
// ===================================
// БӨЛІМДІ АШУ
// ===================================
function openSection(sectionName, button) {
    const section = sections[sectionName];
    if (!section) {
        return;
    }
    // Бастапқы экранды жасыру
    document.getElementById("welcome").style.display = "none";
    // Бөлім мазмұнын көрсету
    const content = document.getElementById("section-content");
    content.style.display = "block";
    // Барлық мәзір батырмаларының белсенділігін алып тастау
    document.querySelectorAll(".menu-button").forEach(btn => {
        btn.classList.remove("active");
    });
    // Таңдалған батырманы белгілеу
    if (button) {
        button.classList.add("active");
    }
    // Бөлім мазмұны
    content.innerHTML = `
        <div class="game-section">
            <div class="game-icon">
                ${section.icon}
            </div>
            <span class="game-number">
                ${section.number} • ЛОГОПЕДИЯЛЫҚ БӨЛІМ
            </span>
            <h2>
                ${section.title}
            </h2>
            <div class="game-line"></div>
            <h3>
                ${section.subtitle}
            </h3>
            <p>
                ${section.description}
            </p>
            <div class="coming-soon">
                <span>✦</span>
                <div>
                    <strong>
                        БӨЛІМ ДАЙЫНДАЛУ ҮСТІНДЕ
                    </strong>
                    <small>
                        Оқу материалдары мен интерактивті тапсырмалар келесі кезеңде енгізіледі.
                    </small>
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
