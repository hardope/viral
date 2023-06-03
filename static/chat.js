$(document).ready(function(){
    let url = window.location.origin
    let request = new XMLHttpRequest();
    request.open("GET", url + "/get_chats")
    request.send()
    request.onload = () => {
        var chats = JSON.parse(request.response);
        for (let chat of chats){
            var users = 
            `<div style="display: inline-flex;">
                <img src="/static/favicon.ico" class="profile_pic">
                <h2 class="recipient_name" onclick="open_chat(this.textContent)">${chat}</h2>
            </div><br>`
            $('#list').append(users);
        }
        if (tabs[0] == "users"){
            tabs = [];
        }
        if (tabs.length > 0) {
            open_chat(tabs[0]);
        }
    }

});

function open_chat(element){
    $('#list').hide();
    $('#tabs').show();
    if (element in tabs){
        $(`#tab_${element}`).show();
        return;
    }

    tabs.push(element);
    var tab = `<div class="tabs" id="tab_${element}">
    <div style="display: inline-flex">
        <img src="/static/favicon.ico" class="profile_pic">
        <h2 class="recipient_name">${element}</h2>
        <button class="cancel_button" onclick="close_chat()">Close</button>
    </div>
    <div id="body" class="imessage">

    </div>
        <form id="form">
            <div class="div">
                <input type="text" id="message" autocomplete="off" autofocus>
                <button type="submit" id="send_message">Send</button>
            </div>
        </form>
    </div>
</div>`

    $('#tabs').append(tab);
    load_chat(element);

}

function close_chat(){
    $('.tabs').hide();
    $('#tabs').hide();
    $('#list').show();
}

function load_chat(user){
    let url = window.location.origin

    let request = new XMLHttpRequest();
    request.open("GET", url + "/get_chats/" + user);
    request.send();
    request.onload = () => {
        console.log(request.response)
        if (request.status === 200) {
            let body = document.querySelector('#tab_' + user + ' #body');
            for (let obj of JSON.parse(request.response)) {
                if (obj[1] === username ) {
                        var tag = document.createElement('p');
                        tag.textContent = obj[3]
                        tag.setAttribute('class', 'from-me margin-b_none')
                        tag.setAttribute('style', 'font-size: 20px;')
                        body.appendChild(tag);
                        var date = document.createElement('small')
                        date.textContent = get_time(obj[4])
                        date.setAttribute('style', 'text-align: right; font-size: 15px !important')
                        body.appendChild(date)
                } else {
                        var tag = document.createElement('p');
                        tag.textContent = obj[3]
                        tag.setAttribute('class', 'from-them')
                        tag.setAttribute('style', 'font-size: 20px;')
                        body.appendChild(tag);
                        var date = document.createElement('small')
                        date.textContent = get_time(obj[4])
                        date.setAttribute('style', 'text-align: left; font-size: 15px !important')
                        body.appendChild(date)
                }
            }
            window.scrollTo(0, 10000);
        }
    }
}
function refresh() {
    let request = new XMLHttpRequest();
    request.open("GET", url + "/api/{{recipient}}");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            newlist = JSON.parse(request.response);
            if (newlist.length > list.length){
                var count = newlist.length - list.length;
                for (let i = list.length -1; i < newlist.length-1; i++){
                    if (newlist[i+1][1] === username ) {
                        var tag = document.createElement('p');
                        tag.textContent = newlist[i+1][3];
                        tag.setAttribute('class', 'from-me')
                        tag.setAttribute('style', 'font-size: 20px;')
                        body.appendChild(tag);
                        var date = document.createElement('small')
                        date.textContent = get_time(newlist[i+1][4]);
                        date.setAttribute('style', 'text-align: right; font-size: 15px !important')
                        body.appendChild(date)
                    } else{
                        var tag = document.createElement('p');
                        tag.textContent = newlist[i+1][3];
                        tag.setAttribute('class', 'from-them')
                        tag.setAttribute('style', 'font-size: 20px;')
                        body.appendChild(tag);
                        var date = document.createElement('small')
                        date.textContent = get_time(newlist[i+1][4]);
                        date.setAttribute('style', 'text-align: left; font-size: 15px !important')
                        body.appendChild(date)
                    }
                }
                list = newlist;
                window.scrollTo(0, 10000);
            }
        }
    }
}
//setInterval(refresh, 1000);
//document.querySelector('#submit').disabled = true;

document.querySelector('#message').onkeyup = () => {
    if (document.querySelector('#message').value.length > 0){
        document.querySelector('#submit').disabled = false;
    }
    else {
        document.querySelector('#submit').disabled = true;
    }
}
document.querySelector('#form').onsubmit = () => {
    let message = document.querySelector('#message').value;
    let newmessage = new XMLHttpRequest();
    var formdata = new FormData()
    formdata.append("message", message)
    newmessage.open("POST", url + "/messages/{{recipient}}");
    newmessage.send(formdata);
    document.querySelector('#message').value = '';
    document.querySelector('#submit').disabled = true;
    return false
}