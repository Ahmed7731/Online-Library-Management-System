/*
 * Handles client-side validation only.
 * Actual authentication is done server-side by Django.
 */
document.addEventListener("DOMContentLoaded", function () {

    const form          = document.querySelector("form");
    const emailError    = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const showBtn       = document.getElementById("show");
    const emailInput    = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (showBtn) showBtn.style.display = "none";

    // Client-side validation before submitting to Django
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email    = emailInput.value.trim();
        const password = passwordInput.value.trim();

        emailError.textContent    = "";
        passwordError.textContent = "";

        let isValid = true;

        // Email check
        if (email === "") {
            emailError.textContent = "Email is required";
            isValid = false;
        } else if (!email.includes("@")) {
            emailError.textContent = "Invalid email format";
            isValid = false;
        }

        // Password check
        if (password === "") {
            passwordError.textContent = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters";
            isValid = false;
        }

        // If valid, let Django handle the rest
        if (isValid) {
            form.submit();
        }
    });

    // Show / Hide password toggle
    if (showBtn) {
        showBtn.addEventListener("click", function () {
            if (passwordInput.value === "") return;

            if (passwordInput.type === "password") {
                passwordInput.type    = "text";
                showBtn.textContent   = "Hide";
            } else {
                passwordInput.type    = "password";
                showBtn.textContent   = "Show";
            }
        });

        passwordInput.addEventListener("input", function () {
            if (passwordInput.value === "") {
                passwordInput.type  = "password";
                showBtn.style.display = "none";
                showBtn.textContent = "Show";
            } else {
                showBtn.style.display = "inline-block";
            }
        });
    }

});
