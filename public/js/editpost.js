
const editPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
        const response = await fetch('/api/blogposts', {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update blog');
        }
    }
};

const deletePostButtonHandler = async (event) => {

    if (event.target.getAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`api/blogposts/${id}`, {
            method: 'DELETE',
        })

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog post');
        }
    }

};

document.querySelector('#update-button').addEventListener('click', editPostFormHandler);
document.querySelector('#delete-button').addEventListener('click', deletePostButtonHandler);

