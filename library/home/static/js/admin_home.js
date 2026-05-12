document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        document.getElementById("welcome").textContent =
            "Hello " + user.username + " 👋";
    }
});
document.addEventListener("DOMContentLoaded", function () {

    const logoutBtn = document.getElementById("logout-btn");

    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // remove user session
        localStorage.removeItem("user");

        // redirect
        window.location.href = "home.html";
    });

});