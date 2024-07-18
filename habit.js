class HabitTracker {
    constructor() {
        this.habits = JSON.parse(localStorage.getItem('habits')) || [];
        this.suggestedHabits = [
            {
            name: "Daily Meditation",
            description: "Improve focus and reduce stress with just 10 minutes of meditation each day.",
            icon: "fas fa-spa"
            },
            {
            name: "Read for 30 Minutes",
            description: "Expand your knowledge and imagination by reading for half an hour daily.",
            icon: "fas fa-book-reader"
            },
            {
            name: "Stay Hydrated",
            description: "Drink 8 glasses of water daily to improve overall health and energy levels.",
            icon: "fas fa-tint"
            },
            {
            name: "Daily Exercise",
            description: "Boost your mood and health with 30 minutes of exercise each day.",
            icon: "fas fa-running"
            },
            {
            name: "Practice Gratitude",
            description: "Write down three things you're grateful for each day to increase positivity.",
            icon: "fas fa-heart"
            },
            {
            name: "Learn a New Language",
            description: "Expand your horizons and improve cognitive skills by learning a new language.",
            icon: "fas fa-language"
            },
            {
            name: "Eat Healthy Meals",
            description: "Nourish your body with balanced and nutritious meals for better overall health.",
            icon: "fas fa-carrot"
            },
            {
            name: "Get Enough Sleep",
            description: "Ensure you get sufficient sleep each night for better physical and mental well-being.",
            icon: "fas fa-moon"
            },
            {
            name: "Practice Mindfulness",
            description: "Cultivate awareness and live in the present moment through mindfulness practices.",
            icon: "fas fa-peace"
            },
            {
            name: "Spend Time in Nature",
            description: "Reconnect with nature and enjoy the benefits of fresh air and outdoor activities.",
            icon: "fas fa-tree"
            }
        ];

        this.habitInput = document.getElementById('habit-input');
        this.addHabitButton = document.getElementById('add-habit');
        this.habitsList = document.getElementById('habits-list');
        this.habitSuggestions = document.getElementById('habit-suggestions');

        this.addHabitButton.addEventListener('click', () => this.addHabit());
        this.habitsList.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                this.toggleHabit(Number(e.target.id.split('-')[1]));
            }
        });
        this.habitsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-habit') || e.target.parentElement.classList.contains('delete-habit')) {
                const id = Number(e.target.dataset.id || e.target.parentElement.dataset.id);
                this.deleteHabit(id);
            }
        });
        this.habitSuggestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-suggested-habit')) {
                const habitName = e.target.dataset.habit;
                this.addSuggestedHabit(habitName);
            }
        });

        this.renderHabits();
        this.renderHabitSuggestions();
        this.updateStats();
    }

    addHabit() {
        const habitText = this.habitInput.value.trim();
        if (habitText && !this.habits.some(h => h.text.toLowerCase() === habitText.toLowerCase())) {
            const habit = {
                id: Date.now(),
                text: habitText,
                completed: false,
                streak: 0,
                lastCompleted: null
            };
            this.habits.push(habit);
            this.saveHabits();
            this.renderHabits();
            this.habitInput.value = '';
        } else if (this.habits.some(h => h.text.toLowerCase() === habitText.toLowerCase())) {
            alert('This habit already exists!');
        }
    }

    
    toggleHabit(id) {
        const habit = this.habits.find(h => h.id === id);
        if (habit) {
            const today = new Date().toDateString();
            if (habit.lastCompleted !== today) {
                habit.completed = !habit.completed;
                if (habit.completed) {
                    habit.streak++;
                    habit.lastCompleted = today;
                } else {
                    habit.streak = Math.max(0, habit.streak - 1);
                }
                this.saveHabits();
                this.renderHabits();
            }
        }
    }

    deleteHabit(id) {
        this.habits = this.habits.filter(h => h.id !== id);
        this.saveHabits();
        this.renderHabits();
    }

    addSuggestedHabit(habitName) {
        if (!this.habits.some(h => h.text.toLowerCase() === habitName.toLowerCase())) {
            const habit = {
                id: Date.now(),
                text: habitName,
                completed: false,
                streak: 0,
                lastCompleted: null
            };
            this.habits.push(habit);
            this.saveHabits();
            this.renderHabits();
        } else {
            alert('This habit already exists!');
        }
    }

    saveHabits() {
        localStorage.setItem('habits', JSON.stringify(this.habits));
    }

    renderHabits() {
        this.habitsList.innerHTML = '';
        this.habits.forEach(habit => {
            const habitElement = document.createElement('div');
            habitElement.classList.add('habit-item');
            habitElement.innerHTML = `
                <input type="checkbox" id="habit-${habit.id}" class="habit-checkbox" ${habit.completed ? 'checked' : ''}>
                <label for="habit-${habit.id}" class="habit-text">${habit.text}</label>
                <span class="habit-streak"><i class="fas fa-fire"></i> ${habit.streak}</span>
                <button class="delete-habit" data-id="${habit.id}"><i class="fas fa-trash"></i></button>
            `;
            this.habitsList.appendChild(habitElement);
        });
        this.updateStats();
    }

    