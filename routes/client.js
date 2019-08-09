let socket = io() 

let chatMessageTextBox = document.getElementById('chatMessageTextBox')
let sendButton = document.getElementById('sendButton')
let chatMessages = document.getElementById('chatMessages')

sendButton.addEventListener('click',() => {
    let chatMessage = chatMessageTextBox.value 
    socket.emit('Houston',chatMessage)
})

socket.on('Trips',(message) => {
    let messageListItem = `<li>${message}</li>`
    chatMessages.insertAdjacentHTML('beforeend',messageListItem)

})