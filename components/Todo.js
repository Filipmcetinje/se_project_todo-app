class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _setDate() {
    this._todoDate = this._todoElement.querySelector(".todo__date");

    if (this._data.date) {
      const dueDate = new Date(this._data.date);

      if (!isNaN(dueDate)) {
        this._todoDate.textContent = `Due: ${dueDate.toLocaleDateString(
          "en-Us",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        )} `;
      }
    }
  }

  getView() {
    this._todoElement = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");

    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._setDate();
    this._setEventListeners();

    return this._todoElement;
  }
}
export default Todo;
