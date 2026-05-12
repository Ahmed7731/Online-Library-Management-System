document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();

        if (email === "") {
            alert('Email is required');
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            alert('Invalid Email');
            return;
        }
        if (password === "") {
            alert('Password is required');
            return;
        }
        if (password.length < 6) {
            alert('Password must be greater than 6 characters');
            return;
        }
        // backend handover from here
    });

});