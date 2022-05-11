const editFormHandler = async (event) => {
  
     const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
        const title = document.getElementById('blog-title').value
        const description = document.getElementById('blog-description').value
        const response = await fetch(`/api/blogs/edit/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                description,
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

const editButton = document.getElementById('edit-form') 
editButton.addEventListener('submit', editFormHandler)
