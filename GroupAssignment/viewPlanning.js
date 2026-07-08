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
        option.textContent = i;
        daySelect.appendChild(option);
    }
    
    if (currentSelectedDay && currentSelectedDay <= daysInMonth) {
        daySelect.value = currentSelectedDay;
    }
}

function renderMealPlan() {
    const year = yearSelect.value;
    const month = monthSelect.value;
    const day = daySelect.value;
    
    const dateKey = `${year}-${month}-${day}`;
    const allPlans = JSON.parse(localStorage.getItem('coKitchenPlans')) || {};
    const dayPlan = allPlans[dateKey];
    
    if (dayPlan && (dayPlan.breakfast.length > 0 || dayPlan.lunch.length > 0 || dayPlan.dinner.length > 0)) {
        let htmlContent = `<h3 style="color: #C46220;">Plan for ${dateKey}</h3>`;
        
        ['breakfast', 'lunch', 'dinner'].forEach(meal => {
            const mealTitle = meal.charAt(0).toUpperCase() + meal.slice(1);
            htmlContent += `<div style="margin-bottom: 5px; padding: 5px; background: #fcfbf9; border-left: 4px solid #7A987E;">`;
            htmlContent += `<h4 style="margin: 0 0 5px 0; color: #7A987E;">${mealTitle}</h4><ul>`;
            
            if (dayPlan[meal] && dayPlan[meal].length > 0) {
                dayPlan[meal].forEach(food => {
                    htmlContent += `<li>${food}</li>`;
                });
            } else {
                htmlContent += `<li style="color: #bbb; list-style:none;">No plan</li>`;
            }
            htmlContent += `</ul></div>`;
        });
        
        plansContainer.innerHTML = htmlContent;
    } else {
        plansContainer.innerHTML = `<p style="color: #999; font-style: italic; padding: 5px;">No plan found for ${dateKey}.</p>`;
    }
}

yearSelect.addEventListener('change', () => {
    populateDays();
    renderMealPlan();
});

monthSelect.addEventListener('change', () => {
    populateDays();
    renderMealPlan();
});

daySelect.addEventListener('change', renderMealPlan);

function viewPlanning() {
    yearSelect.value = "2026";
    monthSelect.value = "07";
    
    populateDays();
    daySelect.value = "08";
    
    renderMealPlan();
}