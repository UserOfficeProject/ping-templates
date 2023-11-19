document.addEventListener('DOMContentLoaded', function() {
    createModal();
});

function createModal() {
    var modal = document.createElement('div');
    modal.setAttribute('id', 'modalWindow');
    modal.setAttribute('class', 'modal');

    var modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal-content');

    var closeModalContainer = document.createElement('div')
    closeModalContainer.setAttribute('class', 'close-modal-container');
    var closeModalBtn = document.createElement('div');
    closeModalBtn.setAttribute('id', 'closeModal');
    closeModalBtn.setAttribute('class', 'close');
    closeModalBtn.innerHTML = 'CLOSE';

    var content = document.createElement('div');
    content.setAttribute('id', 'content');

    modalContent.appendChild(content);
    closeModalContainer.appendChild(closeModalBtn);
    modalContent.appendChild(closeModalContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    closeModalBtn.addEventListener('click', function(){
        modal.style.display = "none";
    });
}

function showHelp() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            document.getElementById('content').innerHTML = xhr.responseText;
            document.getElementById('modalWindow').style.display = 'flex'
        } else {
            console.error('The request failed!');
        }
    };
    xhr.open('GET', 'assets/html/registration-help.html');
    xhr.send();
}
