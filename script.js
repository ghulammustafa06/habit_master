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