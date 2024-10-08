class HabitTracker {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.habits = JSON.parse(localStorage.getItem('habits')) || [];
        this.suggestedHabits = this.getSuggestedHabits();
        this.cacheDOM();
        this.addEventListeners();
        this.renderHabits();
        this.renderHabitSuggestions();
        this.updateStats();
    }

    cacheDOM() {
        this.habitInput = document.getElementById('habit-input');
        this.addHabitButton = document.getElementById('add-habit');
        this.habitsList = document.getElementById('habits-list');
        this.habitSuggestions = document.getElementById('habit-suggestions');
    }

    addEventListeners() {
        this.addHabitButton.addEventListener('click', () => this.addHabit());
        this.habitsList.addEventListener('change', this.handleHabitChange.bind(this));
        this.habitsList.addEventListener('click', this.handleHabitDelete.bind(this));
        this.habitSuggestions.addEventListener('click', this.handleSuggestedHabitAdd.bind(this));
    }

    handleHabitChange(e) {
        if (e.target.type === 'checkbox') {
            this.toggleHabit(Number(e.target.id.split('-')[1]));
        }
    }

    handleHabitDelete(e) {
        if (e.target.classList.contains('delete-habit') || e.target.parentElement.classList.contains('delete-habit')) {
            const id = Number(e.target.dataset.id || e.target.parentElement.dataset.id);
            this.deleteHabit(id);
        }
    }

    handleSuggestedHabitAdd(e) {
        if (e.target.classList.contains('add-suggested-habit')) {
            const habitName = e.target.dataset.habit;
            this.addSuggestedHabit(habitName);
        }
    }

    addHabit() {
        const habitText = this.habitInput.value.trim();
        if (habitText && !this.habitExists(habitText)) {
            const habit = this.createHabit(habitText);
            this.habits.push(habit);
            this.saveHabits();
            this.renderHabits();
            this.habitInput.value = '';
        } else if (this.habitExists(habitText)) {
            alert('This habit already exists!');
        }
    }

    habitExists(habitText) {
        return this.habits.some(h => h.text.toLowerCase() === habitText.toLowerCase());
    }

    createHabit(text) {
        return {
            id: Date.now(),
            text: text,
            completed: false,
            streak: 0,
            lastCompleted: null
        };
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
        if (!this.habitExists(habitName)) {
            const habit = this.createHabit(habitName);
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
            const habitElement = this.createHabitElement(habit);
            this.habitsList.appendChild(habitElement);
        });
        this.updateStats();
    }

    createHabitElement(habit) {
        const habitElement = document.createElement('div');
        habitElement.classList.add('habit-item');
        habitElement.innerHTML = `
            <input type="checkbox" id="habit-${habit.id}" class="habit-checkbox" ${habit.completed ? 'checked' : ''}>
            <label for="habit-${habit.id}" class="habit-text">${habit.text}</label>
            <span class="habit-streak"><i class="fas fa-fire"></i> ${habit.streak}</span>
            <button class="delete-habit" data-id="${habit.id}"><i class="fas fa-trash"></i></button>
        `;
        return habitElement;
    }

    renderHabitSuggestions() {
        this.habitSuggestions.innerHTML = '';
        this.suggestedHabits.forEach(habit => {
            const suggestionElement = this.createSuggestionElement(habit);
            this.habitSuggestions.appendChild(suggestionElement);
        });
    }

    createSuggestionElement(habit) {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('habit-suggestion');
        suggestionElement.innerHTML = `
            <h3><i class="${habit.icon}"></i> ${habit.name}</h3>
            <p>${habit.description}</p>
            <button class="add-suggested-habit" data-habit="${habit.name}">Add This Habit</button>
        `;
        return suggestionElement;
    }

    updateStats() {
        const totalHabits = this.habits.length;
        const completedToday = this.habits.filter(h => h.lastCompleted === new Date().toDateString()).length;
        const longestStreak = Math.max(...this.habits.map(h => h.streak));

        document.getElementById('total-habits').textContent = totalHabits;
        document.getElementById('completed-today').textContent = completedToday;
        document.getElementById('longest-streak').textContent = longestStreak;
    }

    getSuggestedHabits() {
        return [
            {
                name: "Daily Meditation",
                description: "Improve focus and reduce stress with just 10 minutes of meditation each day.",
                icon: "fas fa-spa"
            },
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
            }];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HabitTracker();
});
