// ==========================================
// ТІЛАШАР — ЭЛЕКТРОНДЫ СӨЙЛЕУ КАРТАСЫ
// ==========================================

const speechCardSections = [
    {
        title: "3.1. Сөйлеуді түсіну",
        tasks: [
            "Жеке сөздерді түсіну",
            "Сөзді суретпен сәйкестендіру",
            "Қарапайым нұсқауды орындау",
            "Күрделі нұсқауды орындау",
            "Сөйлемнің мағынасын түсіну",
            "Қысқа мәтінді тыңдап түсіну"
        ]
    },
    {
        title: "3.2. Сөздік қор және атау",
        tasks: [
            "Заттардың атауын айту",
            "Әрекеттерді атау",
            "Сурет бойынша сөз табу",
            "Сөздерді мағынасына қарай топтастыру",
            "Қажетті сөзді өздігінен еске түсіру"
        ]
    },
    {
        title: "3.3. Ауызша сөйлеу және сөйлем құрау",
        tasks: [
            "Дыбыс немесе буынды айту",
            "Сөзді қайталау",
            "Сөз тіркесін айту",
            "Қарапайым сөйлем құрау",
            "Сурет бойынша сөйлем құрау",
            "Қысқа әңгіме құрастыру",
            "Диалогқа қатысу"
        ]
    },
    {
        title: "3.4. Қайталап айту",
        tasks: [
            "Дыбысты қайталау",
            "Буындарды қайталау",
            "Сөзді қайталау",
            "Сөз тіркесін қайталау",
            "Сөйлемді қайталау"
        ]
    },
    {
        title: "3.5. Оқу дағдылары",
        tasks: [
            "Әріптерді тану",
            "Буындарды оқу",
            "Сөздерді оқу",
            "Сөзді суретпен сәйкестендіру",
            "Сөйлемді оқу және түсіну",
            "Қысқа мәтінді оқу және түсіну"
        ]
    },
    {
        title: "3.6. Жазу дағдылары",
        tasks: [
            "Әріптерді жазу",
            "Буындарды жазу",
            "Сөздерді көшіріп жазу",
            "Диктант бойынша сөз жазу",
            "Сурет бойынша сөз жазу",
            "Сөйлем құрастырып жазу",
            "Қысқа хабарлама жазу"
        ]
    }
];


// ==========================================
// КАРТАНЫ АШУ
// ==========================================

function loadSpeechCard() {

    const patient = JSON.parse(
        localStorage.getItem("aphasiaPatient") || "{}"
    );

    const saved = JSON.parse(
        localStorage.getItem("aphasiaSpeechCardData") || "{}"
    );

    const container = document.getElementById("patientContent");

    if (!container) return;

    container.innerHTML = `
    <style>

    .speech-card {
        color: #fff8ed;
        max-width: 1100px;
        margin: auto;
        font-family: Arial, sans-serif;
    }

    .speech-card * {
        box-sizing: border-box;
    }

    .sc-title {
        text-align: center;
        color: #ffe5a6;
        font-size: 28px;
        margin: 20px 0;
    }

    .sc-intro {
        background: #321018;
        border: 1px solid #e8bd67;
        border-radius: 15px;
        padding: 22px;
        line-height: 1.8;
        margin-bottom: 25px;
    }

    .sc-section {
        background: #321018;
        border: 1px solid #a8792d;
        border-radius: 15px;
        padding: 20px;
        margin: 22px 0;
    }

    .sc-section h3 {
        color: #ffe5a6;
        margin-bottom: 18px;
        font-size: 20px;
    }

    .sc-section h4 {
        color: #e8bd67;
        margin: 20px 0 12px;
    }

    .sc-field {
        margin-bottom: 15px;
    }

    .sc-field label {
        display: block;
        color: #fff0d5;
        margin-bottom: 7px;
        font-weight: bold;
    }

    .sc-field input,
    .sc-field textarea,
    .sc-field select {
        width: 100%;
        padding: 12px;
        border: 1px solid #e8bd67;
        border-radius: 8px;
        background: #fffaf1;
        color: #241015;
        font-size: 15px;
    }

    .sc-field textarea {
        min-height: 75px;
        resize: vertical;
    }

    .sc-table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
    }

    .sc-table th,
    .sc-table td {
        border: 1px solid #a8792d;
        padding: 11px;
        text-align: left;
        color: #fff8ed;
    }

    .sc-table th {
        background: #650b17;
        color: #ffe5a6;
    }

    .sc-table select,
    .sc-table input {
        width: 100%;
        padding: 9px;
        border-radius: 7px;
        color: #241015;
        background: #fffaf1;
    }

    .sc-check {
        display: block;
        margin: 12px 0;
        color: #fff8ed;
    }

    .sc-check input {
        width: 18px;
        height: 18px;
        accent-color: #e8bd67;
        margin-right: 8px;
    }

    .sc-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin: 25px 0;
    }

    .sc-button {
        padding: 14px 22px;
        border: 1px solid #ffe5a6;
        border-radius: 30px;
        background: linear-gradient(135deg,#e8bd67,#a8792d);
        color: #310910;
        font-weight: bold;
        cursor: pointer;
    }

    .sc-button:hover {
        transform: translateY(-2px);
    }

    .sc-total {
        color: #ffe5a6;
        font-weight: bold;
    }

    .sc-note {
        color: #f5dfc0;
        line-height: 1.7;
        font-size: 14px;
    }

    @media(max-width:650px) {
        .sc-table {
            font-size: 12px;
        }

        .sc-table th,
        .sc-table td {
            padding: 7px;
        }

        .sc-title {
            font-size: 22px;
        }

        .sc-section {
            padding: 13px;
        }
    }

    @media print {
        body {
            background: white !important;
        }

        .sc-section,
        .sc-intro {
            background: white !important;
            color: black !important;
            border: 1px solid #999;
        }

        .sc-section h3,
        .sc-section h4,
        .sc-title,
        .sc-intro,
        .sc-field label,
        .sc-table td,
        .sc-table th,
        .sc-note {
            color: black !important;
        }

        .sc-actions,
        .back-button,
        .main-header {
            display: none !important;
        }

        .sc-table th {
            background: #eee !important;
        }
    }

    </style>


    <div class="speech-card">

        <h2 class="sc-title">
            ✦ СӨЙЛЕУ КАРТАСЫ ✦
        </h2>

        <div class="sc-intro">

            <h3>«Тілашар» логопедиялық кабинетіне арналған сөйлеу картасы</h3>

            <p><b>Афазиясы бар ересектерге арналған</b></p>

            <p>
                Бұл карта логопед кабинетінде күнделікті және аралық
                бақылау жүргізуге арналған. Негізгі міндеті –
                адамның сөйлеу дағдыларының қазіргі жағдайын тіркеу,
                қиындықтарын белгілеу және түзету сабақтарындағы
                өзгерістерді бақылау.
            </p>

            <p>
                Карта қысқаша болғанымен, афазия кезіндегі негізгі
                тілдік дағдыларды қамтиды. Оны әр адамға жеке толтыруға болады.
            </p>

        </div>


        <!-- 1. ЖЕКЕ МӘЛІМЕТТЕР -->

        <section class="sc-section">

            <h3>1. Жеке мәліметтер</h3>

            ${field("Аты-жөні", "sc-name", patient.fullName || saved.name || "")}
            ${field("Жасы", "sc-age", patient.age || saved.age || "")}
            ${field("Тексеру күні", "sc-date", saved.date || new Date().toISOString().slice(0,10), "date")}
            ${field("Логопедтің аты-жөні", "sc-logoped", saved.logoped || "")}
            ${field("Сөйлеу бұзылысының басталған уақыты", "sc-start", saved.start || "")}

            <div class="sc-field">
                <label>Бұрын жүргізілген түзету жұмыстары</label>
                <textarea id="sc-previous">${saved.previous || ""}</textarea>
            </div>

        </section>


        <!-- 2. ЖАЛПЫ БАҚЫЛАУ -->

        <section class="sc-section">

            <h3>2. Жалпы бақылау</h3>

            ${field("Қарым-қатынасқа түсуі", "sc-contact", saved.contact || "")}
            ${field("Нұсқауды қабылдауы", "sc-instruction", saved.instruction || "")}
            ${field("Тапсырманы орындауға қатысуы", "sc-participation", saved.participation || "")}
            ${field("Шаршағыштығы", "sc-fatigue", saved.fatigue || "")}

            <div class="sc-field">
                <label>Қосымша ескертпе</label>
                <textarea id="sc-general-note">${saved.generalNote || ""}</textarea>
            </div>

        </section>


        <!-- 3. СӨЙЛЕУ ДАҒДЫЛАРЫ -->

        <section class="sc-section">

            <h3>3. Сөйлеу дағдыларын бақылау</h3>

            <h4>Бағалау шкаласы</h4>

            <table class="sc-table">
                <tr><th>Балл</th><th>Бағалау көрсеткіші</th></tr>
                <tr><td>3</td><td>Тапсырманы өздігінен, дұрыс орындады</td></tr>
                <tr><td>2</td><td>Қайталап ұсынғаннан кейін орындады</td></tr>
                <tr><td>1</td><td>Логопедтің көмегімен немесе нұсқау арқылы орындады</td></tr>
                <tr><td>0</td><td>Тапсырманы орындай алмады</td></tr>
            </table>

            <p class="sc-note">
                Ескерту: бағалау нәтижелері тек осы тапсырмаларды орындау
                барысын сипаттайды. Бұл афазияның ауырлық дәрежесін
                анықтайтын диагностикалық шкала емес.
            </p>

            ${speechCardSections.map((section, index) => `
                <h4>${section.title}</h4>
                ${createScoreTable(section.tasks, "section-" + index, saved)}
                <div class="sc-field">
                    <label>Бақылау ескертпесі</label>
                    <textarea id="note-${index}">${saved["note-" + index] || ""}</textarea>
                </div>
            `).join("")}

        </section>


        <!-- 4. ҚАРЫМ-ҚАТЫНАС -->

        <section class="sc-section">

            <h3>4. Қарым-қатынас дағдыларын бақылау</h3>

            <p class="sc-note">
                Бұл бөлімде адамның күнделікті өмірде өз ойын жеткізу
                мүмкіндігі бақыланады.
            </p>

            ${createScoreTable([
                "Амандасу және қоштасу",
                "Өз аты-жөнін айту",
                "Қажеттілігін білдіру",
                "Сұраққа жауап беру",
                "Сұрақ қою",
                "Көмек сұрау",
                "Күнделікті диалогқа қатысу"
            ], "communication", saved)}

            <h4>Қарым-қатынас кезінде қолданатын тәсілі</h4>

            ${checkboxes([
                "Ауызша сөйлеу",
                "Ым-ишара",
                "Жазу",
                "Суреттер мен карточкалар",
                "Коммуникативтік тақта"
            ], saved.methods)}

            <div class="sc-field">
                <label>Басқа тәсіл</label>
                <input id="sc-method-other" value="${escapeHTML(saved.methodOther || "")}">
            </div>

        </section>


        <!-- 5. ҚОСЫМША БАҚЫЛАУ -->

        <section class="sc-section">

            <h3>5. Қосымша бақылау</h3>

            <p class="sc-note">
                Бұл бөлім афазиямен қатар кездесуі мүмкін қосымша сөйлеу
                және қозғалыс ерекшеліктерін белгілеуге арналған.
                Олар міндетті түрде әр адамда бола бермейді.
            </p>

            ${yesNoTable([
                "Дыбыстарды айтуда қиындық байқалады",
                "Сөйлеу қарқынында өзгеріс байқалады",
                "Дауыс ерекшеліктері байқалады",
                "Сөйлеу кезінде қимылдық қиындық байқалады",
                "Тыныс пен сөйлеуді үйлестіруде қиындық байқалады"
            ], saved)}

            <div class="sc-field">
                <label>Қосымша түсініктеме</label>
                <textarea id="sc-extra-note">${saved.extraNote || ""}</textarea>
            </div>

            <p class="sc-note">
                Афазияның өзі міндетті түрде артикуляциялық немесе тыныс
                алу бұзылысын білдірмейді. Сондықтан бұл көрсеткіштер
                тек қажеттілігі болған жағдайда тексеріледі.
            </p>

        </section>


        <!-- 6. ЛОГОПЕД ҚОРЫТЫНДЫСЫ -->

        <section class="sc-section">

            <h3>6. Логопедтің қорытындысы</h3>

            ${textareaField("Салыстырмалы түрде жақсы сақталған дағдылар", "sc-good", saved.good)}
            ${textareaField("Қиындық байқалған дағдылар", "sc-difficult", saved.difficult)}
            <h4>Түзету жұмысының негізгі бағыттары</h4>

            ${checkboxes([
                "Сөйлеуді түсіну",
                "Сөздік қорды белсендіру",
                "Сөздерді атау",
                "Сөйлем құрау",
                "Қайталап айту",
                "Оқу",
                "Жазу",
                "Күнделікті қарым-қатынас",
                "Қажеттілігіне қарай қосымша бағыттар"
            ], saved.goals)}

            ${textareaField("Логопедтің ұсыныстары", "sc-recommendations", saved.recommendations)}

            ${field("Логопедтің қолы", "sc-sign", saved.sign)}
            ${field("Күні", "sc-sign-date", saved.signDate || "", "date")}

        </section>


        <!-- 7. ДАМУ ДИНАМИКАСЫ -->

        <section class="sc-section">

            <h3>7. Даму динамикасын бақылау</h3>

            <p class="sc-note">
                Бұл бөлімді әр бірнеше сабақтан кейін немесе белгіленген
                бақылау күнінде толтыруға болады.
            </p>

            <table class="sc-table">

                <thead>
                    <tr>
                        <th>Дағды</th>
                        <th>Бастапқы бақылау</th>
                        <th>Қайта бақылау</th>
                        <th>Соңғы бақылау</th>
                    </tr>
                </thead>

                <tbody>
                    ${[
                        "Сөйлеуді түсіну",
                        "Сөздік қор және атау",
                        "Ауызша сөйлеу",
                        "Қайталап айту",
                        "Оқу",
                        "Жазу",
                        "Қарым-қатынас"
                    ].map((name, i) => `
                        <tr>
                            <td>${name}</td>
                            <td><input type="number" min="0" max="100" id="dyn-${i}-1" value="${saved["dyn-"+i+"-1"] ?? ""}"></td>
                            <td><input type="number" min="0" max="100" id="dyn-${i}-2" value="${saved["dyn-"+i+"-2"] ?? ""}"></td>
                            <td><input type="number" min="0" max="100" id="dyn-${i}-3" value="${saved["dyn-"+i+"-3"] ?? ""}"></td>
                        </tr>
                    `).join("")}
                </tbody>

            </table>

            <h4>Динамика туралы қорытынды</h4>

            ${textareaField("Оң өзгеріс байқалған дағдылар", "sc-positive", saved.positive)}
            ${textareaField("Әлі де жұмыс қажет ететін дағдылар", "sc-work", saved.work)}
            ${textareaField("Келесі сабақтың мақсаты", "sc-next", saved.next)}
            ${textareaField("Логопедтің ескертпесі", "sc-dynamic-note", saved.dynamicNote)}

        </section>


        <!-- 8. ҚОЛДАНУ ТӘРТІБІ -->

        <section class="sc-section">

            <h3>8. Кабинетте қолдану тәртібі</h3>

            <p><b>Бастапқы бақылау:</b> алғашқы кездесуде адамның сөйлеу мүмкіндіктері мен қиындықтары тіркеледі.</p>

            <p><b>Аралық бақылау:</b> түзету сабақтары барысында өзгерістер белгіленеді.</p>

            <p><b>Қорытынды бақылау:</b> бастапқы және соңғы көрсеткіштер салыстырылады.</p>

            <br>

            <p class="sc-note">
                Бағалауда әр тапсырмада адамның өздігінен орындағаны,
                қайталап тыңдағаннан кейін орындағаны немесе логопед
                көмегімен орындағаны бөлек тіркелуі керек.
                Қайта тексергенде мүмкіндігінше бірдей немесе
                күрделілігі ұқсас тапсырмалар қолданылады.
            </p>

        </section>


        <!-- БАСҚАРУ БАТЫРМАЛАРЫ -->

        <div class="sc-actions">

            <button class="sc-button" onclick="saveSpeechCard()">
                💾 КАРТАНЫ САҚТАУ
            </button>

            <button class="sc-button" onclick="window.print()">
                🖨️ БАСЫП ШЫҒАРУ
            </button>

            <button class="sc-button" onclick="exportSpeechCard()">
                📥 МӘЛІМЕТТЕРДІ ЖҮКТЕУ
            </button>

        </div>

        <p id="speechSaveMessage" class="sc-note"></p>

    </div>
    `;

}


// ==========================================
// КӨМЕКШІ ФУНКЦИЯЛАР
// ==========================================

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}


function field(label, id, value = "", type = "text") {
    return `
        <div class="sc-field">
            <label>${label}</label>
            <input type="${type}" id="${id}" value="${escapeHTML(value)}">
        </div>
    `;
}


function textareaField(label, id, value = "") {
    return `
        <div class="sc-field">
            <label>${label}</label>
            <textarea id="${id}">${escapeHTML(value || "")}</textarea>
        </div>
    `;
}


function createScoreTable(tasks, prefix, saved) {

    return `
        <table class="sc-table">

            <thead>
                <tr>
                    <th>Тексеру тапсырмасы</th>
                    <th>Балл (0–3)</th>
                </tr>
            </thead>

            <tbody>

                ${tasks.map((task, index) => `
                    <tr>
                        <td>${task}</td>

                        <td>
                            <select id="${prefix}-${index}">
                                <option value="">Таңдау</option>
                                ${[0,1,2,3].map(score => `
                                    <option value="${score}"
                                        ${String(saved[prefix+"-"+index]) === String(score) ? "selected" : ""}>
                                        ${score}
                                    </option>
                                `).join("")}
                            </select>
                        </td>
                    </tr>
                `).join("")}

            </tbody>

        </table>
    `;
}


function checkboxes(items, selected = []) {

    return items.map((item, index) => `
        <label class="sc-check">
            <input type="checkbox"
                   class="sc-checkbox"
                   value="${item}"
                   ${selected.includes(item) ? "checked" : ""}>
            ${item}
        </label>
    `).join("");
}


function yesNoTable(items, saved) {

    return `
        <table class="sc-table">

            <thead>
                <tr>
                    <th>Бақылау көрсеткіші</th>
                    <th>Белгі</th>
                </tr>
            </thead>

            <tbody>

                ${items.map((item, index) => `
                    <tr>
                        <td>${item}</td>
                        <td>
                            <select id="yesno-${index}">
                                <option value="">Таңдау</option>
                                <option value="Иә" ${saved["yesno-"+index] === "Иә" ? "selected" : ""}>Иә</option>
                                <option value="Жоқ" ${saved["yesno-"+index] === "Жоқ" ? "selected" : ""}>Жоқ</option>
                            </select>
                        </td>
                    </tr>
                `).join("")}

            </tbody>

        </table>
    `;
}


// ==========================================
// КАРТАНЫ САҚТАУ
// ==========================================

function saveSpeechCard() {

    const data = {};

    document.querySelectorAll("#patientContent input, #patientContent textarea, #patientContent select")
        .forEach(element => {

            if (element.type === "checkbox") return;

            if (element.id) {
                data[element.id] = element.value;
            }
        });


    data.methods = Array.from(
        document.querySelectorAll("#patientContent .sc-checkbox:checked")
    ).filter(el => el.closest(".sc-section")?.querySelector("h3")?.textContent.includes("Қарым-қатынас"))
     .map(el => el.value);


    data.goals = Array.from(
        document.querySelectorAll("#patientContent .sc-checkbox:checked")
    ).filter(el => el.closest(".sc-section")?.querySelector("h3")?.textContent.includes("қорытынды"))
     .map(el => el.value);


    const previous = JSON.parse(
        localStorage.getItem("aphasiaSpeechCardData") || "{}"
    );

    const combined = {...previous, ...data};

    localStorage.setItem(
        "aphasiaSpeechCardData",
        JSON.stringify(combined)
    );

    const message = document.getElementById("speechSaveMessage");

    if (message) {
        message.textContent = "✓ Сөйлеу картасы сәтті сақталды!";
    }

}


// ==========================================
// МӘЛІМЕТТЕРДІ ЖҮКТЕУ
// ==========================================

function exportSpeechCard() {

    const data = JSON.parse(
        localStorage.getItem("aphasiaSpeechCardData") || "{}"
    );

    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        {type: "application/json"}
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "Tilashar_soyleu_kartasy.json";

    link.click();

    URL.revokeObjectURL(link.href);

}
