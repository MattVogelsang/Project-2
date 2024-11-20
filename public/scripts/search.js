document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
  
    // Handle form submission
    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent form reload
  
      const query = searchInput.value.trim();
  
      if (!query) {
        searchResults.innerHTML = '<p>Please enter a search term.</p>';
        return;
      }
  
      try {
        const response = await fetch('/movies?q='+query, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if(response.ok){
          window.location.replace("/index")
        }
        
        // Fetch search results from the backend
      //   const response = await fetch(`/api/movies?q=${encodeURIComponent(query)}`);
      //   if (response.ok) {
      //     const results = await response.json();
  
      //     if (results.length === 0) {
      //       searchResults.innerHTML = '<p>No movies or shows found.</p>';
      //     } else {
      //       // Render search results
      //       searchResults.innerHTML = results
      //         .map(
      //           (movie) => `
      //         <div class="movie-card">
      //           <img src="${movie.poster}" alt="${movie.title}" />
      //           <h3>${movie.title}</h3>
      //           <p>${movie.description}</p>
      //           <p><strong>IMDb Rating:</strong> ${movie.imbdRating || 'N/A'}</p>
      //         </div>
      //       `
      //         )
      //         .join('');
      //     }
      //   } else {
      //     searchResults.innerHTML = '<p>Something went wrong. Please try again.</p>';
      //   }
      } catch (error) {
        console.error('Error fetching search results:', error);
        searchResults.innerHTML = '<p>Unable to fetch results. Please try again later.</p>';
      }
    });
  });
  