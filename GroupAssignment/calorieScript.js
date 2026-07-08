function init() {
    var button = document.getElementById("calculateBtn");
    button.addEventListener("click", calculateIntake);
}

function calculateIntake() {
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);
    var age = parseInt(document.getElementById("age").value);
    var gender = document.querySelector('input[name="csex"]:checked').value;
    var activityLevel = document.getElementById("activity").value;
    var resultDiv = document.getElementById("result");

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        resultDiv.innerHTML = "<p style='color:red;'>Please ensure all physical data is correctly filled out.</p>";
        return;
    }

    var bmr;
    if (gender === 'm') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    var tdee;

    if (activityLevel === "sedentary") { 
        tdee = bmr * 1.2;
        resultDiv.innerHTML = `<p>Hi ${name}, your estimated Total Daily Energy Expenditure (TDEE) is ${tdee.toFixed(0)} kcal.</p>`;
    } else if (activityLevel === "light") {
        tdee = bmr * 1.375;
        resultDiv.innerHTML = `<p>Hi ${name}, your estimated Total Daily Energy Expenditure (TDEE) is ${tdee.toFixed(0)} kcal.</p>`;
    } else if (activityLevel === "moderate") {
        tdee = bmr * 1.55;
        resultDiv.innerHTML = `<p>Hi ${name}, your estimated Total Daily Energy Expenditure (TDEE) is ${tdee.toFixed(0)} kcal.</p>`;
    } else if (activityLevel === "active") {
        tdee = bmr * 1.725;
        resultDiv.innerHTML = `<p>Hi ${name}, your estimated Total Daily Energy Expenditure (TDEE) is ${tdee.toFixed(0)} kcal.</p>`;
    }

}
window.onload = init;