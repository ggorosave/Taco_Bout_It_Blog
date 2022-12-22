
const signUpFormHandler = async (event) => {
    
    event.preventDefault();

    // user inputs
    const name = document.querySelector('#signup-name').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    // checks that user input all fields
    if (name && email && password) {

        // makes fetch request to user api
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            window.alert(response.statusText);
        }
    }

}

document.querySelector('#submit-button').addEventListener('click', signUpFormHandler);