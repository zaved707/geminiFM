export function drawFolders(data) {
    
    let container = document.getElementById('foldersContainer');
    
    // Check if container exists
    if (!container) {
        console.error('Container with ID "foldersContainer" not found');
        return;
    }

    // Clear the container
    container.innerHTML = '';

    if (Array.isArray(data)) {
        data.forEach(item => {
            // Create elements programmatically
            const div = document.createElement('div');
            div.className = 'outline-1 p-2';

            const button = document.createElement('button');
            button.className = 'btn bg-primary text-primary-content';
            button.textContent = item;

            // Add event listener programmatically
            button.addEventListener('click', () => folderAdd(item));

            // Append button to div, and div to container
            div.appendChild(button);
            container.appendChild(div);

            
        });
    }else{
        console.log('not an array')
    }
}
export function getData() {    //gets folder data from server 
    const dir = document.getElementById('currentDir');
    console.log(dir.textContent);
    const stringData = dir.textContent;

    // Return the fetch Promise
    return fetch('/api/getFiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: stringData
    })
    .then(response => response.json())
    .then(data => {
        // console.log('Success:', data);
        return data; // Return data to the next .then()
    })
    .catch(error => {
        console.error('Error:', error);
        throw error; // Propagate the error
    });
}