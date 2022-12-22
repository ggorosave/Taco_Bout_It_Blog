
const loginFormHandler = async (event) => {
    event.preventDefault();

    // user inputs
    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    // if the user has entered an email and password
    if (email && password) {

        // sends a fetch request to the user api
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        // if the response is ok, send user to the dashboard 
        if (response.ok) {

            document.location.replace('/dashboard')
        } else {

            // if response is bad, send status in an alert
            alert(response.statusText);
        }
    }

};

document.querySelector('#submit-button').addEventListener('click', loginFormHandler);