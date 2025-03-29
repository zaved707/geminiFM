export function sendPromptAndFilesToBackent(prompt,sourceDir,outputDir){
    console.log(prompt,sourceDir,outputDir)
    fetch('/api/getAIResponse', {
        method: 'POST', // Use POST to send data
        headers: {
            'Content-Type': 'application/json', // Tell the server we're sending JSON
        },
        body: JSON.stringify({
            prompt: prompt,
            sourceDir: sourceDir,
            outputDir: outputDir
        }) // Convert the data to JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response from the backend
    })
    .then(data => {
        console.log('Success:', data); // Handle the response data
    })
    .catch(error => {
        console.error('Error:', error); // Handle any errors
    });

}