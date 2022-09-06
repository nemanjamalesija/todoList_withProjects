'use strict';

//import classes
import ToDo from './todo.js';
import Project from './project.js';

// import DOM
import {
  displayMainForm,
  displaySidebarForm,
  hideForm,
  preventDefaultSubmitProject,
  preventDefaultSubmitTodo,
  preventDefaultSubmitEdit,
} from './dom.js';

// sidebar
export const formSidebar = document.querySelector('.form__sidebar');
export const inputProject = document.getElementById('input__project');
const sidebarList = document.querySelector('.sidebar__list');
const buttonNewProject = document.querySelector('.btn__new__project');
const btnCancelProject = document.querySelector('.btn__cancel__project');

// main
const mainList = document.querySelector('.main__list');
export const formMain = document.querySelector('.form__main');
export const inputTitle = document.getElementById('title');
export const inputDueDate = document.getElementById('dueDate');
const btnNewTodo = document.querySelector('.btn__new__todo');
const btnCancelTodo = document.querySelector('.btn__cancel__todo');

//form edit
export const formEdit = document.querySelector('.form__edit');
export const inputTitleEdited = document.getElementById('titleEdited');
export const inputDateEdited = document.getElementById('dueDateEdited');
const btnCancelTodoEdit = document.querySelector('.btn__cancel__todo__edit');

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

    //check for no todo
    btnNewTodo.addEventListener('click', displayMainForm);

    // display form
    buttonNewProject.addEventListener('click', displaySidebarForm);

    // create project
    formSidebar.addEventListener('submit', this.createProject.bind(this));

    //render todos when clicked on project
    sidebarList.addEventListener('click', this.renderTodos.bind(this));

    // create new todo
    formMain.addEventListener('submit', this.createTodo.bind(this));

    // edit todo
    formEdit.addEventListener('submit', this.formEditSubmit.bind(this));

    // prevent default submit project
    btnCancelProject.addEventListener('click', preventDefaultSubmitProject);

    // prevent default submit todo
    // prettier-ignore
    btnCancelTodo.addEventListener('click', preventDefaultSubmitTodo);

    // prevent default submit edit form
    // prettier-ignore
    btnCancelTodoEdit.addEventListener('click', preventDefaultSubmitEdit);
  }

  ///// METHODS
  addProject(pTitle) {
    this.projects.push(pTitle);
  }

  createProject(e) {
    e.preventDefault();

    const newProject = new Project(inputProject.value);

    this.addProject(newProject);

    this.updateProjectsDom();

    hideForm(formSidebar);

    inputProject.value = '';
  }

  updateProjectsDom() {
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

      const icon = li.querySelector('.icon__close__project');

      // delete project
      this.deleteProjectEvent(icon, li);
    });
  }

  deleteProjectEvent(icon, listEl) {
    icon.addEventListener('click', (e) => {
      const clicked = e.target.closest('.sidebar__list__item');
      const clickedProjectId = this.projects.findIndex(
        (proj) => proj.id === clicked.id
      );
      this.projects.splice(clickedProjectId, 1);

      listEl.remove();

      hideForm(formMain);
      mainList.innerHTML = '';

      inputTitle.value = inputDueDate.value = '';
    });
  }

  detectClickedProject(e) {
    const clicked = e.target.closest('.sidebar__list__item');
    this.clickedProject = this.projects.find(
      (project) => project.id === clicked.id
    );
  }

  //// todos
  createTodo(e) {
    e.preventDefault();

    // const date = new Date(inputDueDate.value);
    // const dateFormated = new Intl.DateTimeFormat('en-US').format(date);

    this.addTodo = new ToDo(inputTitle.value, inputDueDate.value);

    this.clickedProject.todos.push(this.addTodo);

    mainList.innerHTML = '';

    this.clickedProject.todos.forEach((todo) => {
      const li = document.createElement('li');
      this.createTodoContent(todo, li);

      // delete todo
      this.addDeleteEvent(li, todo);

      // edit todo
      this.addEditEvent(li, todo);

      // checkbox
      this.addCheckBoxEvent(li, todo);
    });

    hideForm(formMain);

    inputTitle.value = inputDueDate.value = '';
  }

  createTodoContent(todo, li) {
    li.className = 'main__list__item';
    li.innerHTML = `<div class="todo__item">
                    <p>
                      <i class="las la-pen-square icon"></i>  
                  </p>
                    <p class="todo_p">Title:</p> 
                     <p class="todo_p2"> ${todo.title}</p>
                  </div>    
                <div class="todo__item">
                  <p>
                    <i class="las la-calendar-check icon"></i>
                  </p>
                  <p class="todo_p">Due date:</p>
                  <p>${todo.dueDate}</p>
                </div>
                <div class="todo__buttons__div">
                    <button class="btn btn__todo__edit">edit</button>
                   <button class="btn btn__todo__delete">delete</button>
                </div>
              <div class="todo__item">
                 <input class="checkBox" type="checkbox"  name="checkbox" ${todo.setCheckBoxAttribute()} />
                </div>
                  `;

    mainList.insertAdjacentElement('afterBegin', li);
  }

  addDeleteEvent(element, todo) {
    const btnDeleteTodo = element.querySelector('.btn__todo__delete');

    btnDeleteTodo.addEventListener('click', () => {
      this.clickedTodoId = this.clickedProject.todos.findIndex(
        (td) => td.id === todo.id
      );

      this.clickedProject.todos.splice(this.clickedTodoId, 1);
      element.remove();
    });
  }

  addEditEvent(element, todo) {
    const btnEdit = element.querySelector('.btn__todo__edit');

    btnEdit.addEventListener('click', (e) => {
      e.preventDefault();

      this.clickedTodoId = this.clickedProject.todos.findIndex(
        (td) => td.id === todo.id
      );

      formEdit.classList.remove('hidden');

      element.parentNode.insertBefore(formEdit, element.nextSibling);
      inputTitleEdited.value =
        this.clickedProject.todos[this.clickedTodoId].title;

      inputDateEdited.value =
        this.clickedProject.todos[this.clickedTodoId].dueDate;
    });
  }

  addCheckBoxEvent(element, todo) {
    const checkBox = element.querySelector('.checkBox');

    this.clickedTodoId = this.clickedProject.todos.findIndex(
      (td) => td.id === todo.id
    );

    checkBox.addEventListener(
      'change',
      () => (todo.isChecked = !todo.isChecked)
    );
  }

  renderTodos = function (e) {
    this.detectClickedProject(e);

    if (!this.clickedProject) return;

    mainList.innerHTML = '';

    this.clickedProject.todos.forEach((todo, i) => {
      const li = document.createElement('li');

      this.createTodoContent(todo, li);

      // delete todo
      this.addDeleteEvent(li, todo);

      // edit todo
      this.addEditEvent(li, todo);

      // checkbox
      this.addCheckBoxEvent(li, todo);
    });
  };

  // form edit todo
  formEditSubmit(e) {
    e.preventDefault();

    mainList.innerHTML = '';

    this.addTodo = new ToDo(inputTitleEdited.value, inputDateEdited.value);

    this.clickedProject.todos[this.clickedTodoId] = this.addTodo;

    this.clickedProject.todos.forEach((todo, i) => {
      const li = document.createElement('li');

      this.createTodoContent(todo, li);

      inputTitleEdited.value = inputDateEdited.value = '';

      // delete todo
      this.addDeleteEvent(li, todo);

      // edit todo
      this.addEditEvent(li, todo);

      // checkbox
      this.addCheckBoxEvent(li, todo);

      hideForm(formEdit);
    });
  }
}

// project manager
export const app = new ProjectManager();
