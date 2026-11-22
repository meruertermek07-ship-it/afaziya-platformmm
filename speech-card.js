// ======================================
// АФАЗИЯ — СӨЙЛЕУ КАРТАСЫ
// ======================================
function loadSpeechCard() {
    const patient = JSON.parse(
        localStorage.getItem("aphasiaPatient") || "null"
    );
    const results = JSON.parse(
        localStorage.getItem("aphasiaDiagnosticResults") || "[]"
    );
    const content = document.getElementById("patientContent");
    if (!patient) {
        content.innerHTML = "<h2>Пациент тіркелмеген</h2>";
        return;
    }
    const latestResults = {};
    // Әр бағыт бойынша соңғы нәтижені алу
    results.forEach(result => {
        latestResults[result.category] = result;
    });
    const directions = [
        "understanding",
        "naming",
        "repetition",
        "vocabulary",
        "reading",
        "writing"
    ];
    let totalScore = 0;
    let totalMax = 0;
    let totalCompleted = 0;
    let resultHTML = "";
    directions.forEach(direction => {
        const result = latestResults[direction];
        if (result) {
            totalScore += result.score;
            totalMax += result.maxScore;
            totalCompleted += result.completed;
            resultHTML += `
                <div class="coming-soon">
                    <div>
                        <strong>${escapeHTML(result.title)}</strong>
                        <small>
                            Балл: ${result.score}/${result.maxScore}
                            | Көрсеткіш: ${result.percentage}%
                            | Тапсырма: ${result.completed}
                        </small>
                    </div>
                </div>
            `;
        } else {
            resultHTML += `
                <div class="coming-soon">
                    <div>
                        <strong>${directionTitle(direction)}</strong>
                        <small>Диагностика әлі өткізілмеген.</small>
                    </div>
                </div>
            `;
        }
    });
    const overallPercentage = totalMax
        ? Math.round(totalScore / totalMax * 100)
        : 0;
    content.style.display = "block";
    content.innerHTML = `
        <h2>📋 ПАЦИЕНТТІҢ СӨЙЛЕУ КАРТАСЫ</h2>
        <div class="game-line"></div>
        <h3>1. ЖАЛПЫ МӘЛІМЕТТЕР</h3>
        <p><strong>Аты-жөні:</strong> ${escapeHTML(patient.fullName)}</p>
        <p><strong>Туған күні:</strong> ${escapeHTML(patient.birthDate)}</p>
        <p><strong>Жасы:</strong> ${escapeHTML(patient.age)}</p>
        <p><strong>Диагнозы:</strong> ${escapeHTML(patient.diagnosis || "Көрсетілмеген")}</p>
        <p><strong>Тексеру күні:</strong> ${escapeHTML(patient.testDate)}</p>
        <div class="game-line"></div>
        <h3>2. ДИАГНОСТИКАЛЫҚ КӨРСЕТКІШТЕР</h3>
        ${resultHTML}
        <div class="game-line"></div>
        <h3>3. ЖАЛПЫ НӘТИЖЕ</h3>
        <h2>${totalScore} / ${totalMax} балл</h2>
        <h3>${overallPercentage}%</h3>
        <p>Орындалған тапсырмалар: ${totalCompleted}</p>
        <div class="game-line"></div>
        <h3>4. ЛОГОПЕДТІҢ ҚОРЫТЫНДЫСЫ</h3>
        <textarea id="speechConclusion"
            placeholder="Логопедтің бақылауы мен қорытындысын енгізіңіз..."
            rows="5"
            style="width:100%; padding:15px; border-radius:12px; border:1px solid #d6ad55;"></textarea>
        <br><br>
        <button class="enter-button" onclick="saveConclusion()">
            ҚОРЫТЫНДЫНЫ САҚТАУ
        </button>
    `;
    const savedConclusion = localStorage.getItem("aphasiaConclusion");
    if (savedConclusion) {
        document.getElementById("speechConclusion").value = savedConclusion;
    }
    content.scrollIntoView({ behavior: "smooth" });
}
// ======================================
// БАҒЫТ АТАУЛАРЫ
// ======================================
function directionTitle(direction) {
    const names = {
        understanding: "Сөйлеуді түсіну",
        naming: "Заттарды атау",
        repetition: "Қайталау",
        vocabulary: "Сөздік қор",
        reading: "Оқу",
        writing: "Жазу"
    };
    return names[direction] || direction;
}
// ======================================
// ҚОРЫТЫНДЫНЫ САҚТАУ
// ======================================
function saveConclusion() {
    const conclusion = document.getElementById("speechConclusion").value;
    localStorage.setItem("aphasiaConclusion", conclusion);
    alert("Логопед қорытындысы сақталды!");
}
