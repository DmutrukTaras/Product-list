const form = document.getElementById('task-form'); // Форма для додавання завдань
const input = document.getElementById('task-input'); // Поле для введення завдання
const taskList = document.getElementById('task-list'); // Список завда

function addTask(taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.textContent = taskText;
    taskList.appendChild(li);
    li.addEventListener('click', toggleTask);
    
    // Зберігаємо список завдань у локальному сховищі
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTask() {
    this.classList.toggle('completed');
    saveTasksToLocalStorage(); // Оновлення локального сховища
}

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Зупиняємо стандартну поведінку форми
    const taskText = input.value.trim(); // Отримуємо введений текст завдання
    if (taskText !== '') {
        addTask(taskText); // Додаємо завдання до списку
        input.value = ''; // Очищаємо поле введення
    }
});


window.addEventListener('load', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            addTask(task);
        });
    }
});
