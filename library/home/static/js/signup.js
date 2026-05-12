document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let username = document.getElementById("username").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let confirmPassword = document.getElementById("confirm_password").value.trim();

        let isAdmin = document.querySelector('input[name="is_admin"]:checked');

        // validations
        if (!username || !email || !password || !confirmPassword) {
            alert("Fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match ");
            return;
        }

        if (!isAdmin) {
            alert("Select admin or user ");
            return;
        }

        // duplicate email check
        // let exists = users.some(u => u.email === email);
        // if (exists) {
        //     alert("Email already exists ");
        //     return;
        // }

        // let newUser = {
        //     username,
        //     email,
        //     password,
        //     isAdmin: isAdmin.value === "1"
        // };
        //
        // users.push(newUser);
        //
        // localStorage.setItem("users", JSON.stringify(users));
        //
        // // login session
        // localStorage.setItem("currentUser", JSON.stringify(newUser));
        //
        // alert("Account created ");
        //
        // if (newUser.isAdmin) {
        //     window.location.href = "admin_home.html";
        // } else {
        //     window.location.href = "user_home.html";
        // }
    });

});