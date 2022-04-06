const commentHandler = async (event) => {
    event.preventDefault();
    const comment = document.getElementById('comment-box').value.trim()

    const response = await fetch('/api/blogs/comment', {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/all-blog')
    } else {
        alert(response.statusText)
    }
}
document.getElementById('comment').addEventListener('click', commentHandler)