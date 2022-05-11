const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-name').value.trim();
  const description = document.querySelector('#blog-description').value.trim();

  if (title && description) {
    const response = await fetch(`/api/blogs/`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }

};
  const deletion = document.querySelectorAll('#delete-blog');

  for (let i=0;i<deletion.length; i++) {
    deletion[i].addEventListener('click', delButtonHandler);
  };

document
  .getElementById('new-blog')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('#delete-blog')
//   .addEventListener('click', delButtonHandler);


