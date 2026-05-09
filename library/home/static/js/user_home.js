document.addEventListener("DOMContentLoaded", function () {

    const logoutBtn = document.getElementById("logout-btn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            // The logout link already points to {% url 'logout' %} in the template,
            // so a normal click works. This handler is kept for any extra logic.
            // Let the link navigate naturally.
        });
    }

});