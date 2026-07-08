            let displayDate = new Date();
            let selectedDateStr = "";
            let currentDayPlan = {
                breakfast: [],
                lunch: [],
                dinner: []
            };
            
            function renderCalendar() {
                const grid = document.getElementById('calendar-grid');
                const monthYear = document.getElementById('month-year');
                grid.innerHTML = '';
            
                const year = displayDate.getFullYear();
                const month = displayDate.getMonth();
                
                monthYear.textContent = displayDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
            
                const firstDayIndex = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
            
                for (let i = 0; i < firstDayIndex; i++) {
                    const emptyCell = document.createElement('div');
                    emptyCell.className = 'day-cell empty';
                    grid.appendChild(emptyCell);
                }
            
                for (let i = 1; i <= daysInMonth; i++) {
                    const cell = document.createElement('div');
                    cell.className = 'day-cell';
                    cell.textContent = i;
            
                    const currentDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            
                    if (currentDateStr === selectedDateStr) {
                        cell.classList.add('selected');
                    }
            
                    cell.onclick = () => {
                        selectedDateStr = currentDateStr;
                        renderCalendar();
                    };
                    grid.appendChild(cell);
                }
            }
            
            function changeMonth(offset) {
                displayDate.setMonth(displayDate.getMonth() + offset);
                renderCalendar();
            }
            
            const today = new Date();
            selectedDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            renderCalendar();

            function addMealItem(mealType) {
                const inputElement = document.getElementById('input-' + mealType);
                const foodName = inputElement.value.trim();
    
                if (foodName !== "") {
                    currentDayPlan[mealType].push(foodName);
                    renderMealList(mealType);
                    inputElement.value = "";
                }
            }
    
            function renderMealList(mealType) {
                const listElement = document.getElementById('list-' + mealType);
                listElement.innerHTML = "";
    
                currentDayPlan[mealType].forEach(function(food) {
                    const li = document.createElement('li');
                    li.textContent = food;
                    listElement.appendChild(li);
                });
            }

            function showToast(message) {
                const toast = document.getElementById('custom-toast');
                toast.textContent = message;
                toast.classList.add('show');
                
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }
    
            function saveDailyPlan() {
                if (!selectedDateStr) {
                    showToast("Please select a date first!");
                    return;
                }
            
                let allPlans = JSON.parse(localStorage.getItem('coKitchenPlans')) || {};
                allPlans[selectedDateStr] = currentDayPlan;
                localStorage.setItem('coKitchenPlans', JSON.stringify(allPlans));
                
                showToast("Plan for " + selectedDateStr + " saved successfully!");
            }
    
            function reviewPlans() {
                window.location.href = "viewPlanning.html";
            }

            function loadPlans() {
                let allPlans = JSON.parse(localStorage.getItem('coKitchenPlans')) || {};
                if (selectedDateStr in allPlans) {
                    currentDayPlan = allPlans[selectedDateStr];
                } else {
                    currentDayPlan = { breakfast: [], lunch: [], dinner: [] };
                }
            }

            loadPlans();

