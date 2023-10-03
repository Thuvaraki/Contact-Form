//let's get all required elements
const form = document.querySelector("form"),
statusText = form.querySelector(".button-area span");

form.onsubmit = (e) => {
    e.preventDefault(); //preventing default form submitting
    statusText.style.color = '#0D6EFD';
     statusText.style.display = "block";

    let xhr = new XMLHttpRequest(); //creating new XML object
    xhr.open("POST", "message.php", true); //sending post request to message.php file, true for asynchronous
    xhr.onload = () => { //once AJAX is loaded
        if (xhr.readyState == 4 && xhr.status == 200) {
            //if ajax response status is 200 & ready status is 4 means there is no any error
            let response = xhr.response; //storing AJAX response in a responsive variable
            if (response.indexOf("Email and password field is required!") != -1 || response.indexOf("Enter a valid email address") != -1 || response.indexOf("Sorry, failed to send your message!") != -1) {
                statusText.style.color = 'red';
            } else {
                form.reset();
                setTimeout(() => {
                    statusText.style.display = "none";
                }, 3000);
            }
            
            statusText.innerText = response;
        }
    }
    let formData = new FormData(form); // creating new FormData obj. This object is used to send form data
    xhr.send(formData); // sending form data
}
