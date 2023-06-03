function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function load_login() {
    let username = $("#username").val();
    let password = $("#password").val();
    let email = $("#email").val();
    let details_message = $("#details_message");

    if (username == "" && email == ""){
        details_message.text("Please enter a username or Email address");
    } else if (validateEmail(email) == false) {
        details_message.text("Invalid Email");
    } else if (password == ""){
        details_message.text("Please enter a password");
    }

    details_message.text("Logging You In...");
    
    let url = window.location.origin;
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("email", email);
    formdata.append("password", password);

    $.ajax({
        type: "POST",
        url: url + "/login",
        data: formdata,
        processData: false,
        contentType: false,
        headers: {
            "X-CSRFToken": csrftoken
        },
        success: function(response) {
            if (response == "0"){
                window.location.replace(url);
            } else if (response == "1"){
                details_message.text("Invalid Username or Password");
            } else if (response == "2"){
                details_message.text("Invalid");
            }
        }
    });
}
