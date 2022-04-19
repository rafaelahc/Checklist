// Attempt 2
let inputNewTask = document.querySelector('#addNewTask'); //input
let btnAdd = document.querySelector('.btnAddTask'); //botão adicionar
let notCompleted = document.querySelector('#notCompleted'); //Tarefa não completada OL
let completed = document.querySelector('#completed'); //Tarefa completada OL
let deleted = document.querySelector('#deleted'); //Tarefa Deletada

let notCompletedCounter = document.querySelector('#notCompleted .counter');
let completedCounter = document.querySelector('#completed .counter');
let deletedCounter =  document.querySelector('#deleted .counter');


// inputNewTask.setAttribute('maxlength', '50');

//Eventos:
btnAdd.addEventListener('click', addList);
document.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        btnAdd.click()
    };
});

function addList(e) {

    let newLi = document.createElement('li');
    let inputText = document.createElement('input');
    inputText.classList.add('inputText');
    inputText.setAttribute('readonly', 'readonly');
    inputText.type = 'text';
    let checkBtn = document.createElement('button');
    checkBtn.classList.add('btnCheck');
    let delBtn = document.createElement('button');
    delBtn.classList.add('btnDelete');
    let returnBtn = document.createElement('button');
    returnBtn.classList.add('btnReturn');
    let editBtn = document.createElement('button');
    editBtn.classList.add('btnEdit');

    checkBtn.innerHTML = '<i class="fas fa-circle-fa-2x"></i>';
    returnBtn.innerHTML = '<i class="fas fa-undo-alt"></i>';
    editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';

    if(inputNewTask.value !== '') {
        inputText.value = inputNewTask.value;
        inputNewTask.value = '';
        notCompleted.appendChild(newLi);
        newLi.appendChild(checkBtn);
        newLi.appendChild(delBtn);
        newLi.appendChild(editBtn);
        newLi.appendChild(inputText);

        taskCounter();
    }

    editBtn.addEventListener('click', function() {
        if(editBtn.innerHTML == '<i class="fas fa-pencil-alt"></i>') {
            editBtn.innerHTML = '<i class="fa fa-check"></i>';
            editBtn.style.cssText = 'background-color: var(--black);' + 'color: #fff';
            delBtn.style.display = 'none';
            checkBtn.style.display = 'none';
            inputText.removeAttribute('readonly');
            inputText.focus();
            inputText.style.borderBottom = '1px solid rgb(255, 255, 255, 0.3)';
        } else {
            editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            editBtn.style.removeProperty('background-color');
            editBtn.style.removeProperty('color');
            delBtn.style.display = 'inline';
            checkBtn.style.display = 'inline';
            inputText.style.borderBottom = 'none';
            inputText.setAttribute('readonly', 'readonly');
        }
    });

    checkBtn.addEventListener('click', function() {
        const parent = this.parentNode;
        parent.remove();
        completed.appendChild(parent);
        inputText.style.cssText = 'text-decoration:  line-through;' + 'color: #ffffff8e';
        checkBtn.style.cssText = 'background-color: var(--check-color);' + 'border: 2px solid var(--check-color)';
        newLi.appendChild(returnBtn);
        returnBtn.style.display = 'inline';
        editBtn.style.display = 'none';

        removeMouseLeave();
        taskCounter();
    });

    checkBtn.addEventListener('mouseenter', addCheckHover);
    checkBtn.addEventListener('mouseleave', addCircleHover);
   
    function addCheckHover() {
        checkBtn.innerHTML = '<i class="fa fa-check">';
        checkBtn.style.transition =  '0.3s';
    }

    function addCircleHover() {
        checkBtn.innerHTML = '<i class="fas fa-circle-fa-2x"></i>';
        checkBtn.style.transition =  '0.3s';
    }

    function removeMouseLeave() {
        checkBtn.removeEventListener('mouseleave', addCircleHover);
    }

    function addMouseLeave() {
        checkBtn.addEventListener('mouseleave', addCircleHover);
    }


    //Delete Button
    delBtn.addEventListener('click', function(status) {
        const parent = this.parentNode;
        console.log(parent);
        parent.remove();
        deleted.appendChild(parent);
        checkBtn.style.display = 'none';  
        delBtn.style.display = 'none';
        editBtn.style.display = 'none';
        returnBtn.style.display = 'inline';
        inputText.style.cssText = 'font-style: italic;' + 'color: #ffffff46';
        newLi.appendChild(returnBtn);
        taskCounter();
    });


    //Return Button
    returnBtn.addEventListener('click', function() {
        const parent = this.parentNode;
        parent.remove();
        notCompleted.appendChild(parent);
        returnBtn.style.display = 'none';
        newLi.appendChild(checkBtn);
        newLi.appendChild(delBtn);
        inputText.style.cssText = 'font-style: normal;' + 'color: #fff';
        checkBtn.style.display = 'inline';
        checkBtn.style.cssText = 'background-color: var(--bg-color);' + 'border: 2px solid var(--main-color)';
        checkBtn.innerHTML = '<i class="fas fa-circle-fa-2x"></i>';
        editBtn.style.display = 'inline';
        delBtn.style.display = 'inline';

        addMouseLeave();
        taskCounter();
    });

    function taskCounter() {
        completedCounter.textContent = completed.getElementsByTagName("li").length;
        notCompletedCounter.textContent = notCompleted.getElementsByTagName("li").length;
        deletedCounter.textContent = deleted.getElementsByTagName("li").length;
    }

}

