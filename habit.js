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