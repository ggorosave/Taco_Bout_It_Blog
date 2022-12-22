
// function to get data from user inputs on the frontend and make a fetch request to create a comment
const commentFormHandler = async (event) => {
    event.preventDefault();

    // gets the comment content from the textarea
    const content = document.querySelector('#comment-content').value.trim();
     
    if (content && event.target.getAttribute('data-bpId')) {

        // gets the blogpost_id from the data attribute
        const blogpost_id = event.target.getAttribute('data-bpId');
        
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content, blogpost_id }),
            headers: { 'Content-Type': 'application/json', },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            window.alert('Failed to create comment');
        }
    }
};

document.querySelector('#submit-button').addEventListener('click', commentFormHandler);