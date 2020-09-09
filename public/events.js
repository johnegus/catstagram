window.addEventListener("DOMContentLoaded", event => {
    fetch("/kitten/image")
        .then(handleResponse)
        .then(data => {
        console.log(data);
        document.querySelector(".cat-pic").src = data.src;
        })
        .catch(handleError)
});



let button = document.getElementById('new-pic');
button.addEventListener('click', event =>{
    fetch('/kitten/image')
        .then(res=>{
        return res.json();
        })
        .then(data=>{
        document.querySelector('.cat-pic').src = data.src;
        })
        .catch(handleError)
})

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