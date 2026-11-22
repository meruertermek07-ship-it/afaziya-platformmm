// =====================================
// ЛОГОПЕД КАБИНЕТІ
// =====================================
// Жасты автоматты есептеу
const birthInput = document.getElementById("birthDate");
const ageInput = document.getElementById("age");
birthInput.addEventListener("change", function () {
    const birth = new Date(this.value);
    const today = new Date();
    if (isNaN(birth.getTime()) || birth > today) {
        ageInput.value = "";
        return;
    }
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
        age--;
    }
    ageInput.value = age;
});
// Тексеру күнін автоматты қою
document.getElementById("testDate").value =
    new Date().toISOString().split("T")[0];
// =====================================
// ПАЦИЕНТ МӘЛІМЕТТЕРІН САҚТАУ
// =====================================
const patientForm = document.getElementById("patientForm");
patientForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const patient = {
        fullName: document.getElementById("fullName").value.trim(),
        birthDate: document.getElementById("birthDate").value,
        age: document.getElementById("age").value,
        diagnosis: document.getElementById("diagnosis").value.trim(),
        testDate: document.getElementById("testDate").value
    };
    if (!patient.fullName || !patient.birthDate || !patient.age) {
        alert("Міндетті мәліметтерді толық енгізіңіз!");
        return;
    }
    // Осы демо-нұсқада мәліметтер браузерде сақталады.
    localStorage.setItem("aphasiaPatient", JSON.stringify(patient));
    document.getElementById("saveMessage").innerHTML = `
        <div class="coming-soon">
            <span>✓</span>
            <div>
                <strong>МӘЛІМЕТТЕР САҚТАЛДЫ</strong>
                <small>Пациенттің жеке мәліметтері енгізілді.</small>
            </div>
        </div>
    `;
    showPatientSection("speechCard");
});
// =====================================
// САҚТАЛҒАН МӘЛІМЕТТІ ҚАЙТА ШЫҒАРУ
// =====================================
function loadPatient() {
    const saved = localStorage.getItem("aphasiaPatient");
    if (!saved) return;
    const patient = JSON.parse(saved);
    document.getElementById("fullName").value = patient.fullName;
    document.getElementById("birthDate").value = patient.birthDate;
    document.getElementById("age").value = patient.age;
    document.getElementById("diagnosis").value = patient.diagnosis;
    document.getElementById("testDate").value = patient.testDate;
}
loadPatient();
// =====================================
// КАБИНЕТ БӨЛІМДЕРІ
// =====================================
function showPatientSection(section) {
    const patient = JSON.parse(
        localStorage.getItem("aphasiaPatient") || "null"
    );
    const content = document.getElementById("patientContent");
    content.style.display = "block";
    if (!patient) {
        content.innerHTML = `
            <h2>АЛДЫМЕН ПАЦИЕНТ МӘЛІМЕТТЕРІН ЕНГІЗІҢІЗ</h2>
            <p>Бөлімдерді ашу үшін пациент туралы мәліметтерді сақтаңыз.</p>
        `;
        content.scrollIntoView({ behavior: "smooth" });
        return;
    }
    const patientInfo = `
        <div class="coming-soon">
            <div>
                <strong>${escapeHTML(patient.fullName)}</strong>
                <small>
                    Жасы: ${escapeHTML(patient.age)} |
                    Диагнозы: ${escapeHTML(patient.diagnosis || "Енгізілмеген")}
                </small>
            </div>
        </div>
    `;
    if (section === "speechCard") {
        content.innerHTML = `
            <h2>📋 СӨЙЛЕУ КАРТАСЫ</h2>
            ${patientInfo}
            <h3>Жалпы мәліметтер</h3>
            <p>Туған күні: ${escapeHTML(patient.birthDate)}</p>
            <p>Тексеру күні: ${escapeHTML(patient.testDate)}</p>
            <h3>Сөйлеу қызметін тексеру</h3>
            <p>Сөйлеуді түсіну: тексеру нәтижесі енгізіледі.</p>
            <p>Заттарды атау: тексеру нәтижесі енгізіледі.</p>
            <p>Қайталау: тексеру нәтижесі енгізіледі.</p>
            <p>Оқу және жазу: тексеру нәтижесі енгізіледі.</p>
            <p>Байланыстырып сөйлеу: тексеру нәтижесі енгізіледі.</p>
        `;
    }
    else if (section === "diagnostics") {
        content.innerHTML = `
            <h2>🧠 БАСТАПҚЫ ДИАГНОСТИКА</h2>
            ${patientInfo}
            <p>
                Бұл бөлімде афазия кезіндегі сөйлеу қызметін
                бағалауға арналған диагностикалық тапсырмалар орналасады.
            </p>
            <div class="coming-soon">
                <div>
                    <strong>ДИАГНОСТИКАЛЫҚ ТАПСЫРМАЛАР</strong>
                    <small>Келесі кезеңде жеке тапсырмалар жүйесін енгіземіз.</small>
                </div>
            </div>
        `;
    }
    else if (section === "initialResult") {
        content.innerHTML = `
            <h2>📊 БАСТАПҚЫ НӘТИЖЕ</h2>
            ${patientInfo}
            <p>Диагностика аяқталғаннан кейін бастапқы бағалау көрсетіледі.</p>
            <p>Жиналған балл: әзірге нәтиже жоқ.</p>
        `;
    }
    else if (section === "dynamics") {
        content.innerHTML = `
            <h2>🏆 НӘТИЖЕЛЕР ДИНАМИКАСЫ</h2>
            ${patientInfo}
            <p>Қайталама диагностика нәтижелері осы бөлімде салыстырылады.</p>
        `;
    }
    content.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}
// HTML ішіне енгізілетін пациент мәтінін қауіпсіз көрсету
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[character];
    });
}
