// САЙТТЫҢ БАСТЫ БЕТІНЕН КАБИНЕТКЕ ӨТУ
function enterCabinet() {
    document.getElementById("home").style.display = "none";
    document.getElementById("cabinet").style.display = "block";
}
// БӨЛІМДЕРДІҢ АҚПАРАТЫ
const sections = {
    breathing: {
        title: "ТЫНЫС АЛУ",
        description: "Бұл бөлім афазиясы бар ересектердің сөйлеу тынысын дамытуға арналған."
    },
    articulation: {
        title: "АРТИКУЛЯЦИЯ",
        description: "Бұл бөлім артикуляциялық аппараттың қозғалысын жетілдіруге арналған."
    },
    vocabulary: {
        title: "СӨЗДІК ҚОР",
        description: "Бұл бөлім сөздік қорды белсендіруге және сөздерді еске түсіруге арналған."
    },
    understanding: {
        title: "СӨЙЛЕУДІ ТҮСІНУ",
        description: "Бұл бөлім ауызша сөйлеуді қабылдау және түсіну қабілетін дамытуға арналған."
    },
    speech: {
        title: "СӨЙЛЕУДІ ҚАЛЫПТАСТЫРУ",
        description: "Бұл бөлім сөздерді, сөйлемдерді және байланыстырып сөйлеуді дамытуға арналған."
    },
    reading: {
        title: "ОҚУ ЖӘНЕ ЖАЗУ",
        description: "Бұл бөлім оқу және жазу дағдыларын қалпына келтіруге арналған."
    },
    rhythm: {
        title: "ЛОГОРИТМИКА",
        description: "Бұл бөлім қозғалыс, ырғақ және сөйлеуді үйлестіруге арналған."
    },
    results: {
        title: "НӘТИЖЕЛЕР",
        description: "Бұл бөлімде орындалған тапсырмалар мен жұмыс нәтижелері көрсетіледі."
    }
};
// БӨЛІМДІ АШУ
function openSection(sectionName) {
    const section = sections[sectionName];
    if (!section) return;
    // Қош келдіңіз бөлімін жасыру
    document.getElementById("welcome").style.display = "none";
    // Таңдалған бөлімнің ақпаратын көрсету
    document.getElementById("section-content").innerHTML = `
        <h2>${section.title}</h2>
        <p>${section.description}</p>
    `;
    // Белсенді батырманы белгілеу
    const buttons = document.querySelectorAll(".sidebar button");
    buttons.forEach(button => {
        button.classList.remove("active");
    });
    event.currentTarget.classList.add("active");
}
