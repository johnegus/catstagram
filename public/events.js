document.querySelector('.score').innerHTML = 0;
document.querySelector('.comments').innerHTML = '';
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
    if(error.json){
        error.json()
        .then(errorJSON =>{
            document.querySelector('.error').innerHTML = `Error: ${errorJSON.message}`
        })
    } else{
        console.error(error);
        alert('SOmething went wrong.');
    }
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
    document.querySelector('.score').innerHTML = data.score;
    document.querySelector('.comments').innerHTML = data.comments;
    })
    .catch(handleError)
}


window.addEventListener("DOMContentLoaded", getImage);


document.getElementById('upvote').addEventListener('click', upVote);
document.getElementById('downvote').addEventListener('click', downVote)

let button = document.getElementById('new-pic');
button.addEventListener('click', getImage);

const commentForm = document.querySelector(".comment-form")
commentForm.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(commentForm);
    const comment = formData.get("user-comment");
    fetch("/kitten/comments", { method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment })
    })
        .then(handleResponse)
        .then(data => {
            commentForm.reset();
            setComment(data);
        }).catch(handleError);
})

const setComment = (data) =>{
    const comments = document.querySelector('.comments');
    comments.innerHTML = '';
    data.comments.forEach((comment)=> {
        const newDiv = document.createElement('div');
        newDiv.className = 'comment-div';
        const newComment = document.createElement('p');
        newComment.appendChild(document.createTextNode(comment));
        comments.appendChild(newDiv);
        newDiv.appendChild(newComment);
    })
}
