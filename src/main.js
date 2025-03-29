import './style.css'
import * as helper from "./print.js"

import * as sendReq from "./sendReq.js"

let currentModalDisplayFolder= "D:\\zaved\\pythonprojects\\web development\\geminiFM\\server\\testing\\";


let pathType='';

window.selectFolder= function() {
   
}
window.selectThisFolder= function() {
    if (pathType=='source'){
    const display=document.getElementById('selectedSourceFolder');

    display.textContent=currentModalDisplayFolder;
    }
    else {
        const display=document.getElementById('selectedOutputFolder');
    
        display.textContent=currentModalDisplayFolder; 
    }
}
window.getResponse =function(){
    const dataField= document.getElementById('textBox')
    // console.log(dataField.value)
    fetch('/api/getResponse',{
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: stringData
    })
}

function updateModalDirectoryDisplay() {
    document.getElementById("currentDir").textContent = currentModalDisplayFolder;
}


window.folderAdd = function(folderSelected){
    // const dir = document.getElementById('currentDir');
    // console.log(dir.textContent);
    currentModalDisplayFolder = currentModalDisplayFolder +  folderSelected + '\\' ;
   

    showFolder();
}




window.showFolder= function() {
    updateModalDirectoryDisplay();
    helper.getData()
        .then(data => {
            // console.log('data received', data);
            // Use the data here, e.g., update the container
            helper.drawFolders(data);
            
        })
        .catch(error => {
            console.error('Failed to show folder:', error);
        });
    
}

window.folderUp =function(){
    // const dir = document.getElementById('currentDir');
    currentModalDisplayFolder = stripLastSegment(currentModalDisplayFolder);
   
    showFolder();
}



console.log('script loaded')

window.sendMessage =function(){
    let text=document.getElementById('textBox').value
    let container=document.getElementById('messageContainer')
    const scroller=document.getElementById('scroller');
    container.innerHTML += `
    <div class="chat chat-end">
        <div class="rounded-4xl chat-bubble chat-bubble-secondary">${text}</div>
        </div>`;

    
    // console.log('button pressed',text)
    scroller.scrollTop = scroller.scrollHeight
    prompt=text;

    const sourceDir =document.getElementById('selectedSourceFolder').textContent;

    const outputDir =document.getElementById('selectedOutputFolder').textContent;

    sendReq.sendPromptAndFilesToBackent(prompt,sourceDir,outputDir)
}






function stripLastSegment(path) {
    
    const segment = path.split('\\').filter(segment => segment.length > 0);
   if (segment.length==1){
    return path;

   }
    path=path.slice(0, -1)
    if (!path || !path.includes('\\')) {
        return path; // Return original if empty or no slashes
    }
    
    const segments = path.split('\\');
    segments.pop(); // Remove last segment
    return segments.join('\\')+ '\\';
}
// Call the function
window.sourceFileModal =function(){
   showFolder();
   pathType='source';
my_modal_1.showModal();  
}
window.outputFileModal =function(){
    showFolder();
    pathType='output';
 my_modal_1.showModal();  
 }
showFolder();

