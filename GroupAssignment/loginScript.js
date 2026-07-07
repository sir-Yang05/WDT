function init() {
    var button = document.getElementById("get_start");
    button.addEventListener("click", displayUsername);
}

function validateAndRedirect(event) {
        const username = document.getElementById('username').value.trim();

        if (username === "") {
            alert("Please enter a valid username.");
            event.preventDefault(); 
            return false;
        }

        localStorage.setItem('username', username);

        window.location.href = 'Homepage.html';
        return false; 
    }

function displayUsername() {
    var resultDiv = document.getElementById("display_username");
    var username = localStorage.getItem('username');
    if (username) {
        resultDiv.innerHTML = `<p style="color: black; font-size: 26px; font-weight: bold; margin: 10px 0; text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);">Hello, ${username}, welcome to our website!</p>`;
    }
}

window.onload = init;