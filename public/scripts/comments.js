const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#content').value.trim();
    const rating = document.querySelector('#rating').value.trim();
    const movieTitle= event.target.getAttribute("data-id")
  
    if (content && rating && movieTitle) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, rating, movieTitle }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile'); 
      } else {
        alert('Failed to add comment. Please try again.');
      }
    }
  };

  document
  .querySelector('.post-comment')
  .addEventListener('submit', commentFormHandler);