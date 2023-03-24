//Initial const declaration
const taskList = document.querySelector('#task-list');
const taskInput = document.querySelector('#new-task-input');
const dateInput = document.querySelector('#new-date-input');
const addTaskForm = document.querySelector('#add-task-form');
const inputButton = document.getElementById('input-button')

let tasks = []

//Date li items and buttons(tasks) 
function addTask(task, date) {
  const newTask = { text: task, done: false, important: false, date: date};
  tasks.push(newTask);
  tasks.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const li = document.createElement('li');
  li.innerText = `${task} - ${date}`;
  const deleteButton = createDeleteButton(newTask, li);
  const doneButton = createDoneButton(newTask, li);
  const importantButton = createImportantButton(newTask, li);
  li.appendChild(deleteButton);
  li.appendChild(doneButton);
  li.appendChild(importantButton);
  taskList.appendChild(li);
}

addTaskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskText = taskInput.value;
    const taskDate = dateInput.value;
    //reset values before adding the task and date
    taskInput.value = "";
    dateInput.value = "";
    addTask(taskText, taskDate);
});

// create the buttons and save their values to localStorage
function createDeleteButton(task, li) {
    const deleteButton = document.createElement('button');
    deleteButton.innerText = '✗';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function () {
      li.remove();
      tasks = tasks.filter(t => t !== task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    return deleteButton;
  }

function createDoneButton(task, li) {
    const doneButton = document.createElement('button');
    doneButton.innerText = '✓';
    doneButton.classList.add('done-button');
    doneButton.addEventListener('click', function () {
      li.classList.toggle('done');
      const index = tasks.indexOf(task);
      tasks[index].done = li.classList.contains('done');
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  
    const index = tasks.indexOf(task);
    if (tasks[index].done) {
      li.classList.add('done');
    }
  
    return doneButton;
  }

function createImportantButton(task, li) {
    const importantButton = document.createElement('button');
    importantButton.innerText = '❕';
    importantButton.classList.add('important-button');
    importantButton.addEventListener('click', function () {
        li.classList.toggle('important');
        const index = tasks.indexOf(task);
        tasks[index].important = li.classList.contains('important');
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    const index = tasks.indexOf(task);
    if (tasks[index].important) {
      li.classList.add('important');
    }

    return importantButton;
}

//load values upon refreshing or entering the page
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
      tasks = JSON.parse(storedTasks);
      tasks.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      });
      tasks.forEach(task => {
          const li = document.createElement('li');
          li.innerText = `${task.text} - ${task.date}`
          const deleteButton = createDeleteButton(task, li);
          const doneButton = createDoneButton(task, li, task.done);
          const importantButton = createImportantButton(task, li, task.important);
          li.appendChild(deleteButton);
          li.appendChild(doneButton);
          li.appendChild(importantButton);
          taskList.appendChild(li);
      });
  }
}

loadTasks();