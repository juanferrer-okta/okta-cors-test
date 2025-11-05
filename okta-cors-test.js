// add your domain on the oktaDomain
const oktaDomain = 'example-oie.okta.com'; 
const meEndpoint = `https://${oktaDomain}/api/v1/users/me`;
const resultElement = document.getElementById('result');
const statusElement = document.getElementById('status');

statusElement.textContent = `Attempting to fetch: ${meEndpoint}`;


fetch(meEndpoint, {
    credentials: 'include' 
})
.then(response => {
    // Check if the network request was successful
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Log a success status for the user
    statusElement.textContent = 'CORS Request Successful (Status 200/OK)!';
    return response.json();
})
.then(data => {

    const summary = {
        'ID': data.id,
        'Status': data.status,
        'Login': data.profile.login,
        'Email': data.profile.email,
        'First Name': data.profile.firstName,
        'Last Name': data.profile.lastName,
        'Mobile Phone': data.profile.mobilePhone || 'N/A', 
        'Created': data.created,
        'Updated': data.lastUpdated,
        'Last Login': data.lastLogin || 'N/A'
    };

    let output = "Profile\n";
    
    for (const key in summary) {
        if (summary.hasOwnProperty(key)) {
            output += `${key}\n`;
            output += `    ${summary[key]}\n`; 
        }
    }
    resultElement.textContent = output;
})
.catch(error => {
    statusElement.textContent = 'CORS Request Failed!';
    resultElement.textContent = `Error: ${error.message}`;
    console.error('CORS Error:', error);
    console.warn('Check the Okta Admin Console for "Trusted Origins" and ensure the endpoint supports CORS.');
});