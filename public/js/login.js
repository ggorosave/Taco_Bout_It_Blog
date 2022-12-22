
const loginFormHandler = async (event) => {
    event.preventDefault();

    // user inputs
    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (email && password) {

        const response = await fetch('')
    }

};