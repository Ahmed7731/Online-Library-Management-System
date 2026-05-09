document.addEventListener("DOMContentLoaded", function () {

    const loginBtn  = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");

    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            window.location.href = "/login/";
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener("click", function () {
            window.location.href = "/signup/";
        });
    }

});