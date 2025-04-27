import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

//const popupWithForm = new PopupWithForm({
// popupSelector: "#add-todo-popup",
// handleFormSubmit: () => {},
//});
const popupWithForm = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputData) => {
    const date = new Date(inputData.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const todo = {
      name: inputData.name,
      date,
      id: uuidv4(),
    };

    section.addItem(todo);
    todoCounter.updateTotal(true);
    formValidator.resetValidation();
    popupWithForm.close();
  },
});
popupWithForm.setEventListeners();

//const openModal = (modal) => {
//modal.classList.add("popup_visible");
//};

//const closeModal = (modal) => {
// modal.classList.remove("popup_visible");
// };

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", todoCounter);
  const todoElement = todo.getView();

  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  popupWithForm.open();
});

//addTodoCloseBtn.addEventListener("click", () => {
// popupWithForm.close();
// });

//addTodoForm.addEventListener("submit", (evt) => {
//evt.preventDefault();
//const name = evt.target.name.value;
//const dateInput = evt.target.date.value;

// Create a date object and adjust for timezone
//const date = new Date(dateInput);
//date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//const id = uuidv4();
//const values = { name, date, id };
//section.addItem(values);

//formValidator.resetValidation();
//popupWithForm.close();
//});

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    todosList.append(todo);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

//const renderTodo = (item) => {
//  const todo = generateTodo(item);
//  todosList.append(todo);
//};

//initialTodos.forEach((item) => {
//  renderTodo(item);
//});

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
