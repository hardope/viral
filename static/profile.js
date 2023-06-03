function toggle_edit(num){
    if (num == 1) {
        $('#view_profile').hide();
        $('#edit_profile').show();
    }
    else {
        $('#view_profile').show();
        $('#edit_profile').hide();
    }
}

function upload_image() {
    if ($('#image_file')[0].files.length < 1) {
        alert("Please Select An Image");
        return;
    }
    var formData = new FormData();

    formData.append('image', $('#image_file')[0].files[0]);
    formData.append('username', username);
    formData.append('action', 'upload');

    $("#edit_profile_message").html("Uploading Your Profile photo...")
    $.ajax({
        url: window.location.origin + '/edit_profile',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            "X-CSRFToken": csrftoken
        },
        success: function(data) {
            // handle successful response
            $("#edit_profile_message").html("Profile photo uploaded successfully")
            $("#profile_image").attr("src", "/media/profile/" + data.image + `?v=${Math.random()}`);
            $("#main_image").attr("src", "/media/profile/" + data.image + `?v=${Math.random()}`);
        },
        error: function(xhr, status, error) {
            alert("Unable To upload Your post, Please Check Your Internet Connection"); // handle error response
        }
    });
}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function send_request(data, action) {
    if (action == "email") {
        if (!validateEmail(data)) {
            alert("Please Enter A Valid Email Address");
            return;
        }
    }
    console.log(data)
    $("#edit_profile_message").html("Updating Your Profile...")
    $.ajax({
        url: window.location.origin + '/edit_profile',
        type: 'POST',
        data: {
            username: username,
            data: data,
            action: action
        },
        headers: {
            "X-CSRFToken": csrftoken
        },
        success: function(data) {
            // handle successful response
            $("#edit_profile_message").html("Profile Updated successfully")
            $("#profile_" + action).html(data.data);
            $("#main_" + action).html(data.data);
            toggle_edit(0);
        },
        error: function(xhr, status, error) {
            alert("Unable To Update Your Profile, Please Check Your Internet Connection"); // handle error response
        }
    });
}

function save_about(){
    var about = $("#profile_about").val();

    send_request(about, "about");
}

function save_location(){
    var location = $("#profile_location").val();

    send_request(location, "location");
}

function save_gender(){
    var radioValue = $("input[name='gender']:checked").val();
    if(!radioValue){
        return;
    } else {
        send_request(radioValue, "gender");
    }
}

function save_birthday(){
    if ($("#profile_birthday").val() == ""){
        return;
    }

    var birthdate = new Date($("#profile_birthday").val());
    birthdate = birthdate.toString();
    birthdate = birthdate.split(" ");
    var day = birthdate[1];
    var month = birthdate[2];
    var year = birthdate[3];

    $.ajax({
        url: window.location.origin + '/edit_profile',
        type: 'POST',
        data: {
            username: username,
            action: "birthday",
            birthday: day + " " + month,
            birthyear: year,
        },
        headers: {
            "X-CSRFToken": csrftoken
        },
        success: function(data) {
            // handle successful response
            $("#edit_profile_message").html("Profile Updated successfully")
            $("#main_birthday").html(data.birthday);
            toggle_edit(0);
        },
        error: function(xhr, status, error) {
            alert("Unable To Update Your Profile, Please Check Your Internet Connection"); // handle error response
        }
    });
}