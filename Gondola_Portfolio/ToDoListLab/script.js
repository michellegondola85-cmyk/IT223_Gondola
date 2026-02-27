const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value;  

    if (taskText === '') {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement('li');

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;

 
    li.addEventListener('click', function (e) {
        
        if (e.target.tagName === 'BUTTON') return;

        li.classList.toggle('completed');
    });

  
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function () {
        taskList.removeChild(li);
    });

    taskList.appendChild(li);

    taskInput.value = '';       
}