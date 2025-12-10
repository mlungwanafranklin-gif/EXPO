document.getElementById('crackBtn').addEventListener('click', () => {
    const cookie = document.getElementById('cookie');
    const fortuneDiv = document.getElementById('fortune');

    // Trigger cookie crack animation
    cookie.classList.add('cracked');

    // Call Python backend (Flask example) to get a fortune
    fetch('/get_fortune')
        .then(response => response.json())
        .then(data => {
            fortuneDiv.textContent = data.fortune;
            fortuneDiv.classList.add('show');
        });
});
