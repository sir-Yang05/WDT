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
        const dayStr = i.toString().padStart(2, '0');
        const option = document.createElement('option');
        option.value = dayStr;
        option.textContent = i;
        daySelect.appendChild(option);
    }
    
    if (currentSelectedDay && parseInt(currentSelectedDay) <= daysInMonth) {
        daySelect.value = currentSelectedDay;
    }
}

function renderMealPlan() {
    const year = yearSelect.value;
    const month = monthSelect.value;
    const day = daySelect.value;
    
    const dateKey = `${year}-${month}-${day}`;
    const allPlans = JSON.parse(localStorage.getItem('coKitchenPlans')) || {};
    const dayPlan = allPlans[dateKey] || { breakfast: [], lunch: [], dinner: [] };
    
    let htmlContent = '';
    
    ['breakfast', 'lunch', 'dinner'].forEach(meal => {
        const mealTitle = meal.charAt(0).toUpperCase() + meal.slice(1);
        htmlContent += `<div class="meal-box">`;
        htmlContent += `<h3>${mealTitle}</h3>`;
        htmlContent += `<ul class="meal-items">`;
        
        if (dayPlan[meal] && dayPlan[meal].length > 0) {
            dayPlan[meal].forEach(food => {
                htmlContent += `<li>${food}</li>`;
            });
        } else {
            htmlContent += `<li class="empty-msg">No plans for this meal.</li>`;
        }
        htmlContent += `</ul></div>`;
    });
    
    plansContainer.innerHTML = htmlContent;
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
    const today = new Date();
    const yyyy = today.getFullYear().toString();
    const mm = (today.getMonth() + 1).toString().padStart(2, '0');
    const dd = today.getDate().toString().padStart(2, '0');
    
    yearSelect.value = yyyy;
    monthSelect.value = mm;
    
    populateDays();
    daySelect.value = dd;
    
    renderMealPlan();
}