const commentHandler = async (event) => {
    event.preventDefault();
    const description = document.getElementById('comment-box').value.trim()

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ description, blog_id: id }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/')
    } else {
        alert(response.statusText)
    }
}
document.getElementById('comment-form').addEventListener('submit', commentHandler)