'use strict';

// sidebar
const formSidebar = document.querySelector('.form__sidebar');
const inputProject = document.getElementById('input__project');
const sidebarList = document.querySelector('.sidebar__list');
const buttonNewProject = document.querySelector('.btn__new__project');
const btnCancelProject = document.querySelector('.btn__cancel__project');

// main
const mainList = document.querySelector('.main__list');
const formMain = document.querySelector('.form__main');
const inputTitle = document.getElementById('title');
const inputDueDate = document.getElementById('dueDate');
const btnNewTodo = document.querySelector('.btn__new__todo');
const btnCancelTodo = document.querySelector('.btn__cancel__todo');

// todos
class toDo {
  id = self.crypto.randomUUID();
  constructor(title, dueDate) {
    (this.title = title), (this.dueDate = dueDate);
  }
}

// project
class Project {
  id = self.crypto.randomUUID();
  todos = [];
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
  }

  pushTodo(todo) {
    this.todos.push(todo);
    return [...this.todos];
  }
}

// project manager
class ProjectManager {
  projects = [];
  clickedProject;
  clickedProjectId;
  addTodo;
  addTodoEdited;
  clickedTodoId;

  constructor() {
    ///// EVENT LISTENERS

    // display form
    buttonNewProject.addEventListener('click', this.displayForm);

    // create project
    formSidebar.addEventListener('submit', this.createProject.bind(this));
  }

  ///// METHODS
  addProject(pTitle) {
    this.projects.push(pTitle);
  }

  createProject(e) {
    e.preventDefault();

    const newProject = new Project(inputProject.value);

    this.addProject(newProject);

    sidebarList.innerHTML = '';

    this.projects.forEach((project) => {
      const li = document.createElement('li');
      li.className = 'sidebar__list__item';
      li.setAttribute('id', `${project.id}`);

      let html;

      html = `<p>
                  ${project.projectTitle}
                </p>
                  <p class="span__icon">
                    <i class="las la-times-circle icon icon__close__project"></i>
                  </p>
              `;
      li.insertAdjacentHTML('afterBegin', html);
      sidebarList.appendChild(li);
    });

    this.hideForm(formSidebar);

    inputProject.value = '';
  }

  displayForm = function () {
    formSidebar.style.opacity = 100;
    formSidebar.classList.remove('hidden');
  };

  hideForm = function (form) {
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => {
      form.style.display = 'grid';
    }, 1000);
  };
}

// project manager
const app = new ProjectManager();
