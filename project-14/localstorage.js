document.addEventListener("DOMContentLoaded", () => {
  const addItems = document.querySelector(".add-items");
  const itemsList = document.querySelector(".plates");
  const removeBtn = document.querySelector(".removebtn");
  let items = JSON.parse(localStorage.getItem("items")) || [];

  function addItem(e) {
    e.preventDefault();
    const text = this.querySelector("[name=item]").value;
    const item = {
      text,
      done: false,
    };

    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    addList(items, itemsList);

    this.reset();
    console.log(items);
  }

  function addList(plates = [], plateList) {
    plateList.innerHTML = plates
      .map(
        (plate, i) => `
          <li>
            <input type="checkbox" data-index=${i} id='item${i}' ${
          plate.done ? "checked" : ""
        }>
            <label for='item${i}'>${plate.text}</label>
          </li>
        `
      )
      .join("");
  }

  function isDone(e) {
    if (!e.target.matches("input")) return;
    const target = e.target;
    const index = target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));
    addList(items, itemsList);
  }

  function removeList() {
    localStorage.clear("items");
    items = [];
    addList([], itemsList);
  }

  addItems.addEventListener("submit", addItem);
  itemsList.addEventListener("click", isDone);
  removeBtn.addEventListener("click", removeList);
  addList(items, itemsList);
   
});
