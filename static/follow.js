function follow(){
    username = document.getElementById("username").getAttribute("username")
    value = document.getElementById('follow').getAttribute("value")
    if (value === "True"){
        document.getElementById('follow').className = "not_following"
        document.getElementById('follow').setAttribute("value", "False")
    }
    else{
        document.getElementById('follow').className = "following"
        document.getElementById('follow').setAttribute("value", "True")
    }
    let url = window.location.origin
    let request = new XMLHttpRequest()
    request.open("GET", url + "/follow/" + username);
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let button = document.getElementById("follow")
            if (button.getAttribute("value") === "True") {
                button.innerHTML = request.responseText + " following";
            }
            else{
                button.innerHTML = request.responseText + " followers";
            }
        }
    }
}