function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function request_code(username, email) {
    let verify = $('#verify');
    let details = $('#details');
    let details_message = $('#details_message');
    let url = window.location.origin;
    let formdata = new FormData();
    formdata.append('username', username);
    formdata.append('csrftoken', csrftoken);
    formdata.append('email', email);

    $.ajax({
        url: url + '/request_code',
        type: 'POST',
        data: formdata,
        dataType: 'text',
        contentType: false,
        processData: false,
        headers: {
            'X-CSRFToken': csrftoken
        },
        success: function(responseText) {
            if (responseText == '0') {
                details.hide();
                verify.show();
            } else if (responseText == '1') {
                details_message.html('Username Is Unavailable');
            } else if (responseText == '2') {
                details_message.html('Email Is In use by another account');
            } else {
                alert('An Error occurred');
            }
        }
    });
}

function check_otp(username, password, first_name, last_name, email, otp) {
    let verify = $('#verify');
    let verify_message = $('#verify_message');
    let url = window.location.origin;
    let formdata = new FormData();
    formdata.append('username', username);
    formdata.append('password', password);
    formdata.append('first_name', first_name);
    formdata.append('last_name', last_name);
    formdata.append('email', email);
    formdata.append('otp', otp);

    $.ajax({
        url: url + '/check_otp',
        type: 'POST',
        data: formdata,
        dataType: 'text',
        contentType: false,
        processData: false,
        headers: {
            'X-CSRFToken': csrftoken
        },
        success: function(responseText) {
            if (responseText == '0') {
                verify.hide();
                window.location.replace(url);
            } else if (responseText == '1') {
                verify_message.html('Invalid Code');
            } else if (responseText == '2') {
                verify_message.html('Code is expired');
            } else {
                alert('An Error occurred');
            }
        }
    });
}

function confirm() {
    let verify = $('#verify');
    let details = $('#details');
    let first_name = $('#first_name').val();
    let last_name = $('#last_name').val();
    let email = $('#email').val();
    let username = $('#username').val();
    let password = $('#password').val();
    let confirm_password = $('#password_confirm').val();
    let details_message = $('#details_message');

    if (first_name == '' || last_name == '' || email == '' || password == '' || confirm_password == '' || username == '') {
        details_message.html('Please Fill in All fields');
    } else if (password != confirm_password) {
        details_message.html('Password Does Not Match Confirmation');
    } else if (username.includes(' ')) {
        details_message.html('Username cannot contain spaces');
    } else if (validateEmail(email) == false) {
        details_message.html('Invalid Email');
    } else {
        request_code(username, email);
    }
}
function confirm_otp() {
    let sign_up = $('#submit_block');
    let verify = $('#verify');
    let otp = $('#otp').val();
    let username = $('#username').val();
    let password = $('#password').val();
    let first_name = $('#first_name').val();
    let last_name = $('#last_name').val();
    let email = $('#email').val();
    let verify_message = $('#verify_message');

    if (otp == "") {
        verify_message.html("Please Provide Code");
    } else {
        $.ajax({
            type: "POST",
            url: window.location.origin + "/check_otp",
            headers: {"X-CSRFToken": csrftoken},
            data: {username: username, password: password, first_name: first_name, last_name: last_name, email: email, otp: otp},
            success: function(response) {
                if (response == "0") {
                    verify.hide();
                    window.location.replace(window.location.origin);
                } else if (response == "1") {
                    verify_message.html("Invalid Code");
                } else if (response == "2") {
                    verify_message.html("Code is expired");
                } else {
                    alert("An Error occurred");
                }
            },
            error: function() {
                alert("An Error occurred");
            }
        });
    }
}
