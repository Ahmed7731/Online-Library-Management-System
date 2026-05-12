document.addEventListener("DOMContentLoaded", function () {

    const form                 = document.querySelector("form");
    const usernameError        = document.getElementById("username-error");
    const emailError           = document.getElementById("email-error");
    const passwordError        = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirm-password-error");
    const adminError           = document.getElementById("admin-error");

    const showBtn1 = document.getElementById("show1");
    const showBtn2 = document.getElementById("show2");

    const usernameInput        = document.getElementById("username");
    const emailInput           = document.getElementById("email");
    const passwordInput        = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");

    // Client-side validation before submitting to Django
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username        = usernameInput.value.trim();
        const email           = emailInput.value.trim();
        const password        = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const isAdmin         = document.querySelector('input[name="is_admin"]:checked');

        usernameError.textContent        = "";
        emailError.textContent           = "";
        passwordError.textContent        = "";
        confirmPasswordError.textContent = "";
        adminError.textContent           = "";

        let isValid = true;

        // Username
        if (username === "") {
            usernameError.textContent = "Username is required";
            isValid = false;
        }

        // Email
        if (email === "") {
            emailError.textContent = "Email is required";
            isValid = false;
        } else if (!email.includes("@")) {
            emailError.textContent = "Invalid email format";
            isValid = false;
        }

        // Password
        if (password === "") {
            passwordError.textContent = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters";
            isValid = false;
        }

        // Confirm password
        if (confirmPassword === "") {
            confirmPasswordError.textContent = "Please confirm your password";
            isValid = false;
        } else if (password !== confirmPassword) {
            confirmPasswordError.textContent = "Passwords do not match";
            isValid = false;
        }

        // Admin radio
        if (!isAdmin) {
            adminError.textContent = "Please select an option";
            isValid = false;
        }

        // If all valid, let Django handle creation
        if (isValid) {
            form.submit();
        }
    });

    // Show/hide button
    function setupToggle(input, button) {
        button.style.display = "none";

        button.addEventListener("click", function () {
            if (input.type === "password") {
                input.type = "text";
                button.textContent = "Hide";
            } else {
                input.type = "password";
                button.textContent = "Show";
            }
        });

        input.addEventListener("input", function () {
            if (input.value === "") {
                input.type = "password";
                button.style.display = "none";
                button.textContent = "Show";
            } else {
                button.style.display = "inline-block";
            }
        });
    }

    setupToggle(passwordInput, showBtn1);
    setupToggle(confirmPasswordInput, showBtn2);

});
