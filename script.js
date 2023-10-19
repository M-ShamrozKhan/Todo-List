document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task');
    const taskDateInput = document.getElementById('taskDate');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    let editIndex = -1; // Variable to track the index of the task being edited
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks from local storage
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="task-text">${task.text}</div>
                <div class="task-date">${task.date}</div>
            `;
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            buttonContainer.innerHTML = `
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            listItem.appendChild(buttonContainer);
            taskList.appendChild(listItem);
        });
    }

    // Add a new task
    function addTask(text, date) {
        tasks.unshift({ text, date });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        displayTasks();
    }

    // Delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }

    // Edit a task
    function editTask(index, text, date) {
        tasks[index] = { text, date };
        localStorage.setItem('tasks', JSON.stringify(tasks));
        editIndex = -1;
        displayTasks();
    }

    addTaskButton.addEventListener('click', () => {
        const newTask = taskInput.value.trim();
        const date = taskDateInput.value;

        if (newTask) {
            if (editIndex === -1) {
                addTask(newTask, date);
            } else {
                editTask(editIndex, newTask, date);
            }
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            deleteTask(index);
        }

        if (e.target.classList.contains('edit')) {
            const index = e.target.getAttribute('data-index');
            taskInput.value = tasks[index].text;
            taskDateInput.value = tasks[index].date;
            editIndex = index;
        }
    });

    displayTasks();
});
