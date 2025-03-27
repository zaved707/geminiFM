import './style.css'
import * as helper from "./print.js"


let pathType='';

window.selectFolder= function() {
   
}
window.selectThisFolder= function() {
    if (pathType=='source'){
    const dir = document.getElementById('currentDir');
    const display=document.getElementById('selectedSourceFolder');

    display.textContent=dir.textContent;
    }
    else {
        const dir = document.getElementById('currentDir');
        const display=document.getElementById('selectedOutputFolder');
    
        display.textContent=dir.textContent; 
    }
}
window.getResponse =function(){
    const dataField= document.getElementById('textBox')
    console.log(dataField.value)
    fetch('/api/getResponse',{
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: stringData
    })
}



window.folderAdd = function(folderSelected){
    const dir = document.getElementById('currentDir');
    console.log(dir.textContent);
    dir.textContent = dir.textContent +  folderSelected + '\\' ;
    showFolder();
}




window.showFolder= function() {
    
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
    const dir = document.getElementById('currentDir');
    dir.textContent= stripLastSegment(dir.textContent);
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

    
    console.log('button pressed',text)
    scroller.scrollTop = scroller.scrollHeight
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

