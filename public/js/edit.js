const editFormHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')
        const name = document.getElementById('blog-name')
        const description = document.getElementById('blog-description')
        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                description
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert('Failed to edit')
        }
    }
}

document.querySelector('.edit-form').addEventListener('click', editButtonHandler)
