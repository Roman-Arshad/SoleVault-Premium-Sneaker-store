// =====================================================
// SIZE FINDER
// Converts foot length (cm) into an estimated US shoe size
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const calculateBtn = document.getElementById("calculateSizeBtn");
    const footLengthInput = document.getElementById("footLength");
    const resultBox = document.getElementById("sizeResult");

    if (!calculateBtn) return;

    // Simple US size chart mapped to foot length in cm
    const sizeChart = [
        { cm: 24.0, us: 6 },
        { cm: 25.0, us: 7 },
        { cm: 26.0, us: 8 },
        { cm: 27.0, us: 9 },
        { cm: 28.0, us: 10 },
        { cm: 29.0, us: 11 },
        { cm: 30.0, us: 12 }
    ];

    calculateBtn.addEventListener("click", () => {

        const length = parseFloat(footLengthInput.value);

        if (!length || length < 15 || length > 35) {
            resultBox.innerHTML = "<p>Please enter a valid foot length between 15 and 35 cm.</p>";
            return;
        }

        // Find the closest matching size
        let closest = sizeChart[0];
        let smallestDiff = Math.abs(length - closest.cm);

        sizeChart.forEach((row) => {
            const diff = Math.abs(length - row.cm);
            if (diff < smallestDiff) {
                smallestDiff = diff;
                closest = row;
            }
        });

        resultBox.innerHTML = `
            <p>Your estimated size is:</p>
            <h3>US ${closest.us}</h3>
        `;
    });

});
