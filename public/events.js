
const startLoading = () => {
    document.querySelector('.loader').innerHTML = 'loading';
    
}

const endLoading = () => {
    document.querySelector('.loader').innerHTML = '';
}

const handleResponse = (res) =>{
    endLoading();
    if(!res.ok){
        throw res;
    }
    return res.json();
}

const handleError = (error) => {
    window.alert("Something went wrong. Please try again.")
}

const upVote = () =>{
    fetch('/kitten/upvote', {method: 'PATCH'})
    .then(handleResponse)
    .then(data => {
        const {score} = data;
        document.querySelector('.score').innerHTML = score;
    })
    .catch(handleError);
}

const downVote = () =>{
    fetch('/kitten/downvote', {method: 'PATCH'})
    .then(handleResponse)
    .then(data => {
        const {score} = data;
        document.querySelector('.score').innerHTML = score;
    })
    .catch(handleError);
}

const getImage = () =>{
    startLoading();
    fetch("/kitten/image")
    .then(handleResponse)
    .then(data => {
    console.log(data);
    document.querySelector(".cat-pic").src = data.src;
    })
    .catch(handleError)
}


window.addEventListener("DOMContentLoaded", getImage);


document.getElementById('upvote').addEventListener('click', upVote);
document.getElementById('downvote').addEventListener('click', downVote)

let button = document.getElementById('new-pic');
button.addEventListener('click', getImage);
