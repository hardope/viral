let url = window.location.origin
let c_blocks = []

function close_comment() {
    $('#comment_block_' + c_blocks[c_blocks.length - 1]).remove();
    c_blocks.splice(c_blocks.length - 1);
    if (c_blocks.length > 0){
        $('#comment_block_' + c_blocks[c_blocks.length - 1]).show();
    } else {
        close_all();
    }
}

function submit_comment (id){
    var formData = new FormData(); // create new FormData object
    
    // add text data to FormData object
    var article = $('#comment_article_' + id).val();
    formData.append('article', article);

    // add file data to FormData object
    var media = $('#comment_media_' + id)[0].files[0];
    formData.append('media', media);

    // send AJAX request to Django app
    $("#new_comment_form_" + id + " #message").html("Uploading Your Post Please wait...")
    $.ajax({
        url: window.location.origin + '/comment/' + id,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            "X-CSRFToken": csrftoken
        },
        success: function(data) {
            // handle successful response
            add_post(data.id, "#new_comments_" + id)
            $("#new_comment_form_" + id + " #message").html("")
            var article = $('#comment_article_' + id).val('');
            var media = $('#comment_media_' + id).val('')

        },
        error: function(xhr, status, error) {
            alert("Unable To upload Your post, Please Check Your Internet Connection"); // handle error response
        }
    });
}

function view_comment(id){
    $('#main').hide();
    $('#comment_block').show();
    if (c_blocks.length > 0){
        last = c_blocks[c_blocks.length - 1];
        $('#comment_block_' + last).hide();
    }
    c_blocks.push(id);
    new_block = '<div id="comment_block_' + id + '"><button onclick="close_comment()" class="cancel_button">Cancel</button></div>';
    $('#comment_block').append(new_block);
    $.ajax({
        url: window.location.origin + '/comment/' + id,
        type: 'GET',
        data: {},
        processData: false,
        contentType: false,
        success: function(data) {
            // handle successful response
            var post = data.post;
            var nameContainer = '<div class="name_container"><a class="a" href="/profile/' + post.name + '" style="display: inline-flex"><img src="/static/favicon.ico" class="profile_pic"><div style="margin-left: 10px; margin-top: 30px;">' + post.name + '</div></a><div style="margin-top: -10px; margin-left: 30px; font-size 1px !important;">' + post.created_at;
            if (post.name == username) {
                nameContainer += '<button ' + 'onclick=edit_post("' + post.id + '")' + ' class="edit_button" type="submit">✏️</button>';
            } else if (post.edited == true) {
                nameContainer += '<button class="edited_button" type="submit">Edited</button>';
            }
            nameContainer += '</div></div>';

            var article = '<div class="div" id="article_' + post.id + '"><div>';
            for (var j = 0; j < post.article.length; j++) {
                var element = post.article[j];
                article += '<' + element.tag + '>' + element.text + '</' + element.tag + '>';
            }
            article += '</div></div>';

            var media = '';
            if (post.media != "empty") {
                if (post.media == "mp4") {
                    media += '<video src="/media/posts/' + post.id + '.mp4" controls loop preload="auto"></video>';
                } else {
                    media += '<a href="/media/posts/' + post.id + '.' + post.media + '"><img src="/media/posts/' + post.id + '.' + post.media + '"></a>';
                }
            }

            var postElement = '<div id="' + 'post_' + post.id + '">' + (nameContainer + article + media) + '</div>'
            $('#comment_block_' + id).append(postElement)

            var upload_comment = '<div id="new_comment_form_' + post.id + '"><center><h1>New Comment</h1><center><b id="message"></b></center><textarea id="comment_article_' + post.id + '" maxlength="1000"></textarea><input type="file" id="comment_media_' + post.id + '" name="media" onchange="validate_c_media(this)" accept="image/*,video/mp4" value="" hidden><div id="label_cont"><label for="comment_media_' + post.id + '" id="media_label_' + post.id + '">Upload Media &#128206;</label></div><button onclick=submit_comment("' + post.id + '") id="button" data-mdb-ripple-color="dark" class="submit_button">Comment</button></center></div>'
            $('#comment_block_' + id).append(upload_comment)

            var new_comments = '<div id="new_comments_' + id + '"></div>'
            $('#comment_block_' + id).append(new_comments)

            for (var i = 0; i < data.comments.length; i++) {
                var post = data.comments[i];
                var nameContainer = '<div class="name_container"><a class="a" href="/profile/' + post.name + '" style="display: inline-flex"><img src="/static/favicon.ico" class="profile_pic"><div style="margin-left: 10px; margin-top: 30px;">' + post.name + '</div></a><div style="margin-top: -10px; margin-left: 30px; font-size 1px !important;">' + post.created_at;
                if (post.name == username) {
                    nameContainer += '<button ' + 'onclick=edit_post("' + post.id + '")' + ' class="edit_button" type="submit">✏️</button>';
                } else if (post.edited == true) {
                    nameContainer += '<button class="edited_button" type="submit">Edited</button>';
                }
                nameContainer += '</div></div>';

                var article = '<div class="div" id="article_' + post.id + '"><div>';
                for (var j = 0; j < post.article.length; j++) {
                    var element = post.article[j];
                    article += '<' + element.tag + '>' + element.text + '</' + element.tag + '>';
                }
                article += '</div></div>';

                var media = '';
                if (post.media != "empty") {
                    if (post.media == "mp4") {
                        media += '<video src="/media/posts/' + post.id + '.mp4" controls loop preload="auto"></video>';
                    } else {
                        media += '<a href="/media/posts/' + post.id + '.' + post.media + '"><img src="/media/posts/' + post.id + '.' + post.media + '"></a>';
                    }
                }

                var container = '<div class="container">';
                if (post.like_value == "True") {
                    container += '<p class="react" value="' + post.like_value + '" id="' + post.id + '" onclick="like(\'' + post.id + '\')">' + post.likes + ' ❤️</p>';
                } else {
                    container += '<p class="react" value="' + post.like_value + '" id="' + post.id + '" onclick="like(\'' + post.id + '\')">' + post.likes + ' 🖤</p>';
                }
                container += '<p class="comment" onclick=view_comment("'+ post.id  + '")' + '>' + post.comments + ' 💬</p><p class="v_like" onclick="view_likes(\'' + post.id + '\')">📊</p></div>';

                var postElement = '<div id="' + 'post_' + post.id + '">' + (nameContainer + article + media + container) + '</div>'

                $('#comment_block_' + id).append(postElement)
            }
        },
        error: function(xhr, status, error) {
            console.log(error); // handle error response
        }
    });
}

$(document).ready(function(){
    let request = new XMLHttpRequest();
    request.open("GET", url + "/fetch_posts")
    request.send()
    request.onload = () => {
        var posts = JSON.parse(request.response);
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            var nameContainer = '<div class="name_container" display: inline-flex;><a class="a" href="/profile/' + post.name + '" style="display: inline-flex"><img src="/static/favicon.ico" class="profile_pic"><div style="margin-left: 10px; margin-top: 30px;">' + post.name + '</div></a><div style="margin-top: -10px; margin-left: 30px; font-size 1px !important;">' + post.created_at;
            if (post.name == username) {
                nameContainer += '<button ' + 'onclick=edit_post("' + post.id + '")' + ' class="edit_button" type="submit">✏️</button>';
            } else if (post.edited == true) {
                nameContainer += '<button class="edited_button" type="submit">Edited</button>';
            }
            nameContainer += '</div></div>';

            var article = '<div class="div" id="article_' + post.id + '"><div>';
            for (var j = 0; j < post.article.length; j++) {
                var element = post.article[j];
                article += '<' + element.tag + '>' + element.text + '</' + element.tag + '>';
            }
            article += '</div></div>';

            var media = '';
            if (post.media != "empty") {
                if (post.media == "mp4") {
                    media += '<video src="/media/posts/' + post.id + '.mp4" controls loop preload="auto"></video>';
                } else {
                    media += '<a href="/media/posts/' + post.id + '.' + post.media + '"><img src="/media/posts/' + post.id + '.' + post.media + '"></a>';
                }
            }

            var container = '<div class="container">';
            if (post.like_value == "True") {
                container += '<p class="react" value="' + post.like_value + '" id="' + post.id + '" onclick="like(\'' + post.id + '\')">' + post.likes + ' ❤️</p>';
            } else {
                container += '<p class="react" value="' + post.like_value + '" id="' + post.id + '" onclick="like(\'' + post.id + '\')">' + post.likes + ' 🖤</p>';
            }
            container += '<p class="comment" onclick=view_comment("'+ post.id  + '")' + '>' + post.comments + ' 💬</p><p class="v_like" onclick="view_likes(\'' + post.id + '\')">📊</p></div>';
            
            var postElement = '<div id="' + 'post_' + post.id + '">' + (nameContainer + article + media + container) + '</div>'
            $('#body').append(postElement)
            }
    }
})

function delete_post(id){
    let request = new XMLHttpRequest();
    request.open("GET", url + "/delete/" + id)
    request.send()
    $('#post_' + id).remove();
    $('#confirm').hide();
    close_all();
}
function upload_edited(id){
    var formData = new FormData();
    formData.append("post", $('#edit_article').val())
    $.ajax({
        url: window.location.origin + '/edit_post/' + id,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            "X-CSRFToken": csrftoken
        },
        success: function(data) {
            // handle successful response
            data = JSON.parse(data);
            let new_article = data.article;
            var article = '';
            for (var j = 0; j < new_article.length; j++) {
                var element = new_article[j];
                article += '<' + element.tag + '>' + element.text + '</' + element.tag + '>';
            }
            article += '</div></div>';
            $('#article_' + id).html(article);
            if (c_blocks.length > 0){
                $('.block').hide();
                $('#create_post').hide();
                $('#edit_post').hide();
                $('#comment_block').show();
                $('#comment_block_' + c_blocks[c_blocks.length - 1]).show();
            } else {
                close_all();
            }
        },
        error: function(xhr, status, error) {
            console.log(error); // handle error response
            $("#edit_post").hide();
            if (c_blocks.length > 0){
                close_all();
                $('#comment_block_' + c_blocks[c_blocks.length - 1]).show();
            } else {
                close_all();
            }
        }
    });
}

function edit_post(id){
    close_all();
    $('#main').hide();
    $('#edit_post').show()
    let request = new XMLHttpRequest();
    request.open("GET", url + "/get_post/" + id)
    request.send()
    request.onload = () => {
        if (request.status === 200) {
            var post = JSON.parse(request.response)[0];
            // check if the post has media and display it in the DOM
            if (post.media !== "empty") {
                if (post.media === "mp4") {
                    $('#post_media').html(`<video src="/media/posts/${post.id}.mp4" controls loop preload="auto"></video>`);
                } else {
                    $('#post_media').html(`<a href="/media/posts/${post.id}.${post.media}"><img src="/media/posts/${post.id}.${post.media}"></a>`);
                }
                $('#post_media').show();
            } else {
                $('#post_media').hide();
            }

            // check if the post is editable and display the appropriate form
            if (post.editable) {
                $('#edit_article').val(post.raw_article);
                $('#edit_article').attr('readonly', false);
                $('#edit_message').html('<b>Edit Post</b>');
                $('#submit_post').show();
                $('#submit_post').off('onclick');
                $('#submit_post').attr('onclick', 'upload_edited("' + id + '")');
            } else {
                $('#edit_article').val(post.raw_article);
                $('#edit_article').attr('readonly', true);
                $('#edit_message').html('<b>Editing Period Has Elapsed</b>');
                $('#submit_post').hide();
            }

            // display the delete post button and prompt
            $('#delete-btn').click(function() {
                $('#confirm').show();
            });
            $('#confirm #btn-yes').off('onclick')
            $('#confirm #btn-yes').attr('onclick', 'delete_post("' + id + '")');
            $('#confirm #btn-no').click(function() {
                $('#confirm').hide();
            });
        } else{
            alert("An error occurred. Please try again")
        }
    }
}
function validate(){
    if($("#media").value != "") {
          let label = $("#media_label")
          label.css('background-color', 'green');
    }
}
function validate_c_media (event) {
    if(event.value != "") {
        console.log(event.id.split("_")[2])
        let label = $("#media_label_" + event.id.split("_")[2])
        label.css('background-color', 'green');
    }
}

function new_post() {
    $('#main').hide();
    $('#comment_block').hide();
    $('#create_post').show();
}
function close_all() {
    $('.block').hide();
    $('#create_post').hide();
    $('#edit_post').hide();
    $('#comment_block').hide();
    $('#main').show();
}

function add_post(id, box) {
    let url = window.location.origin
    let request = new XMLHttpRequest();
    request.open("GET", url + "/get_post/" + id)
    request.send()
    request.onload = () => {
        var posts = JSON.parse(request.response);
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            var nameContainer = '<div class="name_container"><a class="a" href="/profile/' + post.name + '" style="display: inline-flex"><img src="/static/favicon.ico" class="profile_pic"><div style="margin-left: 10px; margin-top: 30px;">' + post.name + '</div></a><div style="margin-top: -10px; margin-left: 30px; font-size 1px !important;">' + post.created_at;
            if (post.name == username) {
                nameContainer += '<button ' + 'onclick=edit_post("' + post.id + '")' + ' class="edit_button" type="submit">✏️</button>';
            } else if (post.edited == true) {
                nameContainer += '<button class="edited_button" type="submit">Edited</button>';
            }
            nameContainer += '</div></div>';

            var article = '<div class="div" id="article_' + post.id + '"><div>';
            for (var j = 0; j < post.article.length; j++) {
                var element = post.article[j];
                article += '<' + element.tag + '>' + element.text + '</' + element.tag + '>';
            }
            article += '</div></div>';

            var media = '';
            if (post.media != "empty") {
                if (post.media == "mp4") {
                    media += '<video src="/media/posts/' + post.id + '.mp4" controls loop preload="auto"></video>';
                } else {
                    media += '<a href="/media/posts/' + post.id + '.' + post.media + '"><img src="/media/posts/' + post.id + '.' + post.media + '"></a>';
                }
            }

            var container = '<div class="container">';
            if (post.like_value == "True") {
                container += '<p class="react" value="' + post.like_value + '" id="' + post.id + '" onclick="like(\'' + post.id + '\')">' + post.likes + ' ❤️</p>';
            } else {
                container += '<p class="react" value="' + post.like_value + '" id="' + post.id + '" onclick="like(\'' + post.id + '\')">' + post.likes + ' 🖤</p>';
            }
            container += '<p class="comment" onclick=view_comment("'+ post.id  + '")' + '>' + post.comments + ' 💬</p><p class="v_like" onclick="view_likes(\'' + post.id + '\')">📊</p></div>';
            
            var postElement = '<div id="' + "post_" + post.id + '">' + (nameContainer + article + media + container) + '</div>'
            $(box).prepend(postElement)
            }
    }
}


$(document).ready(function() {
    $('#new_post_form').submit(function(e) {
        e.preventDefault(); // prevent default form submission
    
        var formData = new FormData(); // create new FormData object
    
        // add text data to FormData object
        var article = $('#article').val();
        formData.append('article', article);
    
        // add file data to FormData object
        var media = $('#media')[0].files[0];
        formData.append('media', media);
    
        // send AJAX request to Django app
        $("#upload_message").html("Uploading Your Post Please wait...")
        $.ajax({
            url: window.location.origin + '/new_post',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                "X-CSRFToken": csrftoken
            },
            success: function(data) {
                // handle successful response
                add_post(data, "#body")
                $("#article").val('');
                $("#media").val('');
                $("#create_post").hide();
                $("#main").show();
            },
            error: function(xhr, status, error) {
                alert("Unable To upload Your post, Please Check Your Internet Connection"); // handle error response
            }
        });
    });
  });
  