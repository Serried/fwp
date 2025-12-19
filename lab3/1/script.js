function validateForm() {    
    let username = document.getElementById("username").value;
    let password = document.getElementById("pass").value;
    let confirm = document.getElementById("confirm-pass").value;
    let tel = document.getElementById("tel").value;
    let email = document.getElementById("email").value;

    if (username.length < 5 ) {
        alert("Username must be longer than 5 characters.");
        return false;
    }
    if (password.length < 8 ) {
        alert("Password must be longer than 8 characters.");
        return false;
    }
    if (password !== confirm) {
        alert("Password does not match.");
        return false;
    }

    if(email.indexOf("@") == -1 || email.indexOf(".") == -1){
        alert("Email is not valid.");
        return false;
    }
    if(tel.length < 10 ){
        alert("Telephone number is not valid.");
        return false;
    }
    
    return true;
}