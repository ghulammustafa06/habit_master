class HabitTracker {
    constructor() {
        this.habitInput = document.getElementById('habit-input');
        this.addHabitButton = document.getElementById('add-habit');
        this.habitsList = document.getElementById('habits-list');
        this.progressBar = document.getElementById('progress-bar');
        this.totalHabitsSpan = document.getElementById('total-habits');
        this.completedTodaySpan = document.getElementById('completed-today');
        this.longestStreakSpan = document.getElementById('longest-streak');
        this.habitFilter = document.getElementById('habit-filter');
        this.clearCompletedButton = document.getElementById('clear-completed');

        this.habits = JSON.parse(localStorage.getItem('habits')) || [];
        this.currentFilter = 'all';

        this.addEventListeners();
        this.renderHabits();
    }

    addEventListeners() {
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
        this.habitFilter.addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.renderHabits();
        });
        this.clearCompletedButton.addEventListener('click', () => this.clearCompletedHabits());
        this.habitInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addHabit();
            }
        });
    }

    
    addHabit() {
        const habitText = this.habitInput.value.trim();
        if (habitText) {
            const habit = {
                id: Date.now(),
                text: habitText,
                completed: false,
                streak: 0,
                lastCompleted: null,
                createdAt: new Date().toISOString()
            };
            this.habits.push(habit);
            this.saveHabits();
            this.renderHabits();
            this.habitInput.value = '';
        }
    }

    renderHabits() {
        this.habitsList.innerHTML = '';
        this.filterHabits().forEach(habit => {
            const habitElement = document.createElement('div');
            habitElement.classList.add('habit');
            habitElement.innerHTML = `
                <input type="checkbox" id="habit-${habit.id}" ${habit.completed ? 'checked' : ''}>
                <label for="habit-${habit.id}">${habit.text}</label>
                <span class="streak"><i class="fas fa-fire"></i> ${habit.streak}</span>
                <span class="created-at">Created: ${this.formatDate(habit.createdAt)}</span>
                <button class="edit-habit" data-id="${habit.id}"><i class="fas fa-edit"></i></button>
                <button class="delete-habit" data-id="${habit.id}"><i class="fas fa-trash"></i></button>
            `;
            this.habitsList.appendChild(habitElement);
        });
        this.updateStats();
        this.updateProgressBar();
    }

    filterHabits() {
        switch (this.currentFilter) {
            case 'active':
                return this.habits.filter(habit => !habit.completed);
            case 'completed':
                return this.habits.filter(habit => habit.completed);
            default:
                return this.habits;
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
    
    editHabit(id, newText) {
        const habit = this.habits.find(h => h.id === id);
        if (habit && newText.trim()) {
            habit.text = newText.trim();
            this.saveHabits();
            this.renderHabits();
        }
    }

    clearCompletedHabits() {
        this.habits = this.habits.filter(habit => !habit.completed);
        this.saveHabits();
        this.renderHabits();
    }

    saveHabits() {
        localStorage.setItem('habits', JSON.stringify(this.habits));
    }

    updateStats() {
        const totalHabits = this.habits.length;
        const completedToday = this.habits.filter(h => h.lastCompleted === new Date().toDateString()).length;
        const longestStreak = Math.max(...this.habits.map(h => h.streak));

        this.totalHabitsSpan.textContent = totalHabits;
        this.completedTodaySpan.textContent = completedToday;
        this.longestStreakSpan.textContent = longestStreak;
    }

    updateProgressBar() {
        const totalHabits = this.habits.length;
        const completedToday = this.habits.filter(h => h.lastCompleted === new Date().toDateString()).length;
        const progress = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;
        this.progressBar.style.width = `${progress}%`;
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HabitTracker();
});