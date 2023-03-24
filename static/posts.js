let react = ""

/* Load and populate page */
function load() {
    let a = 1
    let url = window.location.origin
    let request = new XMLHttpRequest();
    let body = document.querySelector('#body');
    request.open("GET", url + "/fetch_posts");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let body = document.querySelector('#body');
            for (let obj of JSON.parse(request.response)) {
                var name_container = document.createElement('div')
                var name_link = document.createElement('a')
                name_container.setAttribute('class', 'name_container')
                name_link.setAttribute('style', 'display: inline-flex;')
                pic = document.createElement('img')
                pic.setAttribute('src', '/static/favicon.ico')
                pic.setAttribute('style', 'width: 50px; border-radius: 25px; margin-top: 20px; margin-left: 30px')
                name_link.appendChild(pic)
                var name = document.createElement('div');
                name.setAttribute('class', 'p')
                name.textContent = obj.user;
                name_link.setAttribute('href', "/profile/" + obj.user)
                name.setAttribute('style', 'margin-left: 10px; margin-top: 30px;')
                name_link.appendChild(name)
                name_container.appendChild(name_link)
                body.appendChild(name_container)
                var time = document.createElement('p');
                time.setAttribute('style', 'margin-top: -10px; margin-left: 30px; font-size: 15px !important;')
                time.setAttribute('class', 'a')
                time.textContent = get_time(obj.created_at);
                body.appendChild(time);
                var tag = document.createElement('div');
                for (let line of obj.article.split("\n")){
                    let par = document.createElement('div')
                    par.textContent = line
                    tag.appendChild(par)
                }
                tag.setAttribute('class', 'div')
                body.appendChild(tag);
                if (obj.media != "empty"){
                    if (obj.media == "mp4") {
                        var video = document.createElement("video")
                        video.setAttribute('src', '/static/posts/'+ obj.id +'.' + obj.media)
                        video.setAttribute('controls', "")
                        video.setAttribute('prelolad', "metadata")
                        video.setAttribute('loop', "")
                        body.appendChild(video)
                    } else {
                        let link = document.createElement('a');
                        link.setAttribute("href", '/static/posts/'+ obj.id +'.' + obj.media)
                        var pic = document.createElement('img');
                        pic.setAttribute('src', '/static/posts/'+ obj.id + '.' + obj.media)
                        link.appendChild(pic)
                        body.appendChild(link)
                    }
                    
                }
                var container = document.createElement('div');
                container.setAttribute('class', 'container')
                var react = document.createElement('p')
                react.setAttribute('class', 'react')
                react.setAttribute('value', obj.like_value)
                react.setAttribute('id', obj.id)
                react.setAttribute('style', 'inline')
                react.setAttribute('onclick', "like(" + toString(obj.id) + ")")
                if (obj.like_value == "True") {
                    react.textContent = obj.likes + "❤️"
                } else {
                    react.textContent = obj.likes + "🖤"
                }
                
                container.appendChild(react)
                var link = document.createElement('a')
                link.setAttribute('href', '/comment/' + obj.id)
                var comment = document.createElement('p')
                comment.setAttribute('class', 'comment')
                comment.setAttribute('style', 'inline')
                comment.textContent = obj.comments + ' 💬';
                link.appendChild(comment)
                container.appendChild(link)
                var v_like = document.createElement('p')
                v_like.setAttribute('class', 'v_like')
                v_like.setAttribute('style', 'inline')
                v_like.textContent = "📊";
                v_like.setAttribute('onclick', 'view_likes(' + obj.id + ')')
                container.appendChild(v_like)
                body.appendChild(container)
           
                a+=1
            }
       }
    }

}

document.addEventListener("DOMContentLoaded", load)