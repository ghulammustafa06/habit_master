class HabitInsights {
    constructor() {
        this.habits = JSON.parse(localStorage.getItem('habits')) || [];
        this.initCharts();
        this.renderTopPerformingHabits();
        this.renderHabitStats();
    }

    initCharts() {
        this.createHabitCompletionChart();
        this.createStreakDistributionChart();
        this.createDailyCompletionChart();
    }

    createHabitCompletionChart() {
        const ctx = document.getElementById('habitCompletionChart').getContext('2d');
        const completedHabits = this.habits.filter(habit => habit.completed).length;
        const incompleteHabits = this.habits.length - completedHabits;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Incomplete'],
                datasets: [{
                    data: [completedHabits, incompleteHabits],
                    backgroundColor: ['#2ecc71', '#e74c3c']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Habit Completion Status'
                    }
                }
            }
        });
    }
