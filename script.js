const apiUrl = ('https://api.noroff.dev/api/v1/gamehub');

fetch(apiUrl)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to fetch products. Status: ' + response.status);
  })
  .then(products => {
    console.log('Products:', products);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
