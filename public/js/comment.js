
const commentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-content').value.trim();
     
    if (content && event.target.getAttribute('data-bpId')) {

        const blogpost_id = event.target.getAttribute('data-bpId');
        
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content, blogpost_id }),
            headers: { 'Content-Type': 'application/json', },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
};

document.querySelector('#submit-button').addEventListener('click', commentFormHandler);