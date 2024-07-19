document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.querySelector('img').style.transform = 'scale(1.1)';
        });
        member.addEventListener('mouseleave', () => {
            member.querySelector('img').style.transform = 'scale(1)';
        });
    });

    const currentYear = new Date().getFullYear();
    document.querySelector('.copyright').textContent = `© ${currentYear} develop by GM. with ❤ `;
});