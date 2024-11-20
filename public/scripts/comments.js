const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#content').value.trim();
    const rating = document.querySelector('#rating').value.trim();
    const movie_id= event.target.getAttribute("data-id")
  
    if (content && rating && movie_id) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, rating, movie_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/'); 
      } else {
        alert('Failed to sign up. Please try again.');
      }
    }
  };

  document
  .querySelector('.post-comment')
  .addEventListener('submit', commentFormHandler);