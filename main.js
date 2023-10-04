const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;
let statusApp = "stop";

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");

renderTasks();
renderTime();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value !== "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTasks();
  }
});

function createTask(value) { // Crea un nuevo objeto de tarea y lo agrega al principio del arreglo //
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(2),
    title: value,
    completed: false,
  };

  tasks.unshift(newTask);
}

function renderTasks() { // Renderiza la lista de tareas en la interfaz de usuario. También maneja los botones de inicio para cada tarea.//
  const html = tasks.map((task) => {
    return `
        <div class="task">
        <div class="completed">${
          task.completed
            ? "<span class='done'>Done</span>"
            : `<button class="start-button" data-id="${task.id}">Start</button></div>`
        }
            <div class="title">${task.title}</div>
        </div>`;
  });
  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll(".task .start-button");
  startButtons.forEach((startButton) => {
    startButton.addEventListener("click", () => {
      if (!timer) {
        startButtonHandler(startButton.getAttribute("data-id"));
        startButton.textContent = "In progress...";
      }
    });
  });
}

function startButtonHandler(id) { // Inicia el temporizador para una tarea específica cuando el usuario hace clic en el botón "Start".//
  time = 5 * 60;
  current = id;
  const taskId = tasks.findIndex((task) => task.id === id);

   taskName.textContent = tasks[taskId].title;
  renderTime()
    timer = setInterval(() => {
    timerHandler(id);
  }, 1000);
}

function timerHandler(id = null) { // Maneja el temporizador mientras se realiza una tarea. Cuando el tiempo se agota, marca la tarea como completada y comienza un descanso.//
    time--;                        
    renderTime();
    if (time === 0) {
      markComplete(id);
      clearInterval(timer);
      timer = null 
      renderTasks();
      startBreak();
    }
  }

function markComplete(id) {  //Marca una tarea como completada //
  const taskId = tasks.findIndex((task) => task.id === id);
  tasks[taskId].completed = true;
}

function startBreak() { // Inicia un temporizador de descanso después de completar una tarea //
  time = 3;
 taskName.textContent = "Break";
 renderTime()
  timerBreak = setInterval (() => {
    timerBreakHandler();
  }, 1000)
}

function timerBreakHandler() { // Maneja el temporizador de descanso. Cuando el tiempo de descanso se agota, restablece la interfaz de usuario.//
    time--;
    renderTime();
    if (time === 0) {
      clearInterval(timerBreak);
      current = null;
      document.querySelector("#time #taskName").textContent = "";
      renderTime();
    }
  }

function renderTime() { // Renderiza el tiempo restante en la interfaz de usuario.//
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);
  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}