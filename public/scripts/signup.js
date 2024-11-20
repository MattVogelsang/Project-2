document.addEventListener('DOMContentLoaded', () => {
    
    const signupForm = document.querySelector('.signup-form');
  

    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // 
  
   
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
  
      if (!name || !email || !password) {
        alert('Please fill out all fields.');
        return;
      }
  
      try {
        // Send a POST request to the signup API endpoint
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
  
        if (response.ok) {
          // If the signup is successful, redirect to the homepage or dashboard
          alert('Signup successful! Redirecting...');
          window.location.replace('/'); // Update this path to match your application
        } else {
          
          const errorData = await response.json();
          alert(`Signup failed: ${errorData.message}`);
        }
      } catch (error) {
        
        console.error('Error during signup:', error);
        alert('An error occurred during signup. Please try again later.');
      }
    });
  });
  