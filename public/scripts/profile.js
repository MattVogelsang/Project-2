// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const username = document.querySelector('#project-name').value.trim();
//   const needed_funding = document.querySelector('#project-funding').value.trim();
//   const description = document.querySelector('#project-desc').value.trim();

//   if (username && needed_funding && description) {
//     const response = await fetch(`/api/projects`, {
//       method: 'POST',
//       body: JSON.stringify({ username, needed_funding, description }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to create project');
//     }
//   }
// };

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/projects/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete project');
//     }
//   }
// };

// document
//   .querySelector('.new-project-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
// Select DOM elements
const commentsList = document.querySelector('.comments-list');
const logoutButton = document.querySelector('.btn-logout');

// Function to fetch user comments dynamically (optional if the comments are already provided in the template)
const fetchUserComments = async () => {
  try {
    const response = await fetch('/api/comments', { method: 'GET' });
    if (!response.ok) {
      throw new Error('Failed to fetch comments.');
    }

    const comments = await response.json();
    if (comments.length) {
      commentsList.innerHTML = comments.map(comment => `
        <li>
          <strong>${comment.original_title}</strong> - ${comment.content} <br>
          <em>Posted on: ${new Date(comment.createdAt).toLocaleDateString()}</em>
        </li>
      `).join('');
    } else {
      commentsList.innerHTML = '<p>You haven’t commented on any movies yet. Join the conversation by leaving your thoughts on a movie!</p>';
    }
  } catch (error) {
    console.error(error);
    commentsList.innerHTML = '<p>Unable to load comments. Please try again later.</p>';
  }
};

// Add event listener for logout functionality
logoutButton.addEventListener('click', async (event) => {
  event.preventDefault();
  
  try {
    const response = await fetch('/logout', { method: 'POST' });
    if (response.ok) {
      window.location.href = '/';
    } else {
      throw new Error('Logout failed.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while trying to log out. Please try again.');
  }
});

// Fetch user comments on page load (if dynamic fetching is needed)
document.addEventListener('DOMContentLoaded', () => {
  // Uncomment the following line if comments are not pre-rendered
  // fetchUserComments();
});
