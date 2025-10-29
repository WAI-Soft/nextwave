// Simple test to check if the API is accessible from the browser
fetch('http://localhost:8000/api/v1/admin/testimonials', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    credentials: 'include'
})
.then(response => {
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    return response.json();
})
.then(data => {
    console.log('Success! Data:', data);
    console.log('Number of testimonials:', data.data.length);
})
.catch(error => {
    console.error('Error:', error);
});
