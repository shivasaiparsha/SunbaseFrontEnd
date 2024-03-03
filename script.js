const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const statusMessage = document.getElementById('status');

emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

function validateEmail() {
    const email = emailInput.value.trim();
    if (email.length < 3 || !email.includes('@') || !email.includes('.')) {
        emailError.textContent = 'Make sure email is more than 3 characters and has @';
    } else {
        emailError.textContent = '';
        statusMessage.className = 'success';
    }
}

function validatePassword() {
    const password = passwordInput.value.trim();
    if (password.length < 8) {
        passwordError.textContent = 'Make sure password is more than 8 characters.';
    } else {
        passwordError.textContent = '';
        statusMessage.textContent = 'All good to go';
        statusMessage.className = 'success';
    }
}

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (emailError.textContent === '' && passwordError.textContent === '') {
        if (confirm('Are you sure you want to sign up?')) {
            alert('Successful signup!');
        } else {
            // Redirecting to the same page and clearing input values
            window.location.href = window.location.href;
            emailInput.value = '';
            passwordInput.value = '';
        }
    } else {
        alert('Please correct the form errors before submitting.');
    }
});
