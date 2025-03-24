import './style.css'
console.log('script loaded')
function sendMessage(content){
    let text=document.getElementById('textbox').value
    let container=document.getElementById('messageContainer')
    const scroller=document.getElementById('scroller');
    container.innerHTML += `
    <div class="chat chat-end">
        <div class="rounded-4xl chat-bubble chat-bubble-secondary">${text}</div>
        </div>
`;

    
    console.log('button pressed',text)
    scroller.scrollTop = scroller.scrollHeight
}

function handleDOMContentLoaded() {
    var sendButton = document.getElementById("sendButton");
    if (sendButton) {
      sendButton.addEventListener("click", sendMessage);
    } else {
      console.error("Send button not found!");
    }
  }
  
  document.addEventListener("DOMContentLoaded", handleDOMContentLoaded)