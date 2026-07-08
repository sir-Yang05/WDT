const yearSelect = document.getElementById('view-year');
const monthSelect = document.getElementById('view-month');
const daySelect = document.getElementById('view-day');
const plansContainer = document.getElementById('plans-container');

function populateDays() {
    const year = parseInt(yearSelect.value);
    const month = parseInt(monthSelect.value);
    const daysInMonth = new Date(year, month, 0).getDate();
    
    const currentSelectedDay = daySelect.value;
    daySelect.innerHTML = '';
    
    for (let i = 1; i <= daysInMonth; i++) {
        const dayStr = i < 10 ? '0' + i : i.toString();
        const option = document.createElement('option');
        option.value = dayStr;
        option.textContent = i + ' day';
        daySelect.appendChild(option);
    }
    
    if (currentSelectedDay && currentSelectedDay <= daysInMonth) {
        daySelect.value = currentSelectedDay;
    }
}

function renderViewPlan() {
    const year = yearSelect.value;
    const month = monthSelect.value;
    const day = daySelect.value;

    const dateKey = `${year}-${month}-${day}`;
    
    const allPlans = JSON.parse(localStorage.getItem('coKitchenPlans')) || {};
    
    const dayPlan = allPlans[dateKey];

    if (dayPlan && (dayPlan.breakfast.length > 0 || dayPlan.lunch.length > 0 || dayPlan.dinner.length > 0)) {
        let htmlContent = '';
        
        htmlContent += generateMealCardHTML("Breakfast 🍳", dayPlan.breakfast);
        htmlContent += generateMealCardHTML("Lunch 🥪", dayPlan.lunch);
        htmlContent += generateMealCardHTML("Dinner 🍛", dayPlan.dinner);
        
        plansContainer.innerHTML = htmlContent;
    } else {
        plansContainer.innerHTML = `<div class="no-plan">No eating plans found for ${year}-${month}-${day}.</div>`;
    }
}

function generateMealCardHTML(title, items) {
    let cardHtml = `<div class="meal-card"><h3>${title}</h3>`;
    if (items && items.length > 0) {
        cardHtml += `<ul class="meal-item-list">`;
        items.forEach(food => {
            cardHtml += `<li>${food}</li>`;
        });
        cardHtml += `</ul>`;
    } else {
        cardHtml += `<p style="color:#bbb; margin:0; font-size:0.9rem;">Not planned yet</p>`;
    }
    cardHtml += `</div>`;
    return cardHtml;
}

yearSelect.addEventListener('change', () => { populateDays(); renderViewPlan(); });
monthSelect.addEventListener('change', () => { populateDays(); renderViewPlan(); });
daySelect.addEventListener('change', renderViewPlan);

const today = new Date();
yearSelect.value = "2026";
monthSelect.value = "07";
populateDays();
daySelect.value = "08";

renderViewPlan();