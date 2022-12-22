
// gets new data from form and sends it to server to update a post
const editPostFormHandler = async (event) => {

    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content && event.target.getAttribute('data-id')) {

        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogposts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            window.alert('Failed to update blog');
        }
    }
};

// gets the blogpost id from a data attribute and sends it to the server to delete a post
const deletePostButtonHandler = async (event) => {

    if (event.target.getAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogposts/${id}`, {
            method: 'DELETE',
        })

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            window.alert('Failed to delete blog post');
        }
    }

};

document.querySelector('#update-button').addEventListener('click', editPostFormHandler);
document.querySelector('#delete-button').addEventListener('click', deletePostButtonHandler);