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

    createStreakDistributionChart() {
        const ctx = document.getElementById('streakDistributionChart').getContext('2d');
        const streaks = this.habits.map(habit => habit.streak);
        const labels = [...new Set(streaks)].sort((a, b) => a - b);
        const data = labels.map(streak => streaks.filter(s => s === streak).length);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Habits',
                    data: data,
                    backgroundColor: '#3498db'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Habits'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Streak Length'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Streak Distribution'
                    }
                }
            }
        });
    }

    createDailyCompletionChart() {
        const ctx = document.getElementById('dailyCompletionChart').getContext('2d');
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        const completionData = last7Days.map(date => {
            return this.habits.filter(habit => habit.lastCompleted === date).length;
        });

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [{
                    label: 'Habits Completed',
                    data: completionData,
                    borderColor: '#2ecc71',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Habits Completed'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Daily Habit Completion'
                    }
                }
            }
        });
    }

    renderTopPerformingHabits() {
        const topHabits = this.habits
            .sort((a, b) => b.streak - a.streak)
            .slice(0, 5);

        const topHabitsList = document.getElementById('topPerformingHabits');
        topHabitsList.innerHTML = topHabits.map(habit => `
            <li>
                <span class="habit-name">${habit.text}</span>
                <span class="habit-streak"><i class="fas fa-fire"></i> ${habit.streak}</span>
            </li>
        `).join('');
    }

    renderHabitStats() {
        const statsContainer = document.getElementById('habitStats');
        const totalHabits = this.habits.length;
        const completedHabits = this.habits.filter(habit => habit.completed).length;
        const avgStreak = this.habits.reduce((sum, habit) => sum + habit.streak, 0) / totalHabits || 0;
        const longestStreak = Math.max(...this.habits.map(habit => habit.streak));

        statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${totalHabits}</div>
                <div class="stat-label">Total Habits</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${completedHabits}</div>
                <div class="stat-label">Completed Habits</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${avgStreak.toFixed(1)}</div>
                <div class="stat-label">Average Streak</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${longestStreak}</div>
                <div class="stat-label">Longest Streak</div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HabitInsights();
});
