window.addEventListener("DOMContentLoaded", event => {
    fetch("/kitten/image").then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
        document.querySelector(".cat-pic").src = data.src;
    })
});