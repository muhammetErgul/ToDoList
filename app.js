const form = document.getElementById('inputForm');
const input = document.getElementById('taskName');
const btnDeleteAll = document.getElementById('btnDeleteAll');
const taskList = document.getElementById('taskList');
const alertDOM = document.getElementById('alert');
let items;

const alertFunction = (title, message, className) => `
<div class="alert alert-${className} alert-dismissible fade show" role="alert">
  <strong>${title}</strong> ${message}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
  </button>
</div>
`;

loadItems();
eventListeners();
function eventListeners() {
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click', deleteItem);
    btnDeleteAll.addEventListener('click', deleteAllItems);
}
function getItemFromLS() {
    if (localStorage.getItem('items') == null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
function setItemToLS(text) {
    items = getItemFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}
function loadItems() {
    items = getItemFromLS();
    items.forEach(item => {
        createElement(item);
    });
}
function addNewItem(e) {
    if (input.value == '') {
        alertDOM.innerHTML = alertFunction(
            "Başarısız!",
            "Eksik veya yanlış bilgi girdiniz",
            "warning"
        )
    } else {
        createElement(input.value);
        setItemToLS(input.value);
        alertDOM.innerHTML=alertFunction(
            "Başarılı",
            "Bilgileri başarılı bir şekilde girdiniz",
            "success"
        )
        input.value = '';
    }
    e.preventDefault();
}
function createElement(text) {
    const li = document.createElement('li');
    li.classList = 'list-group-item list-group-item-secondary';
    li.onclick = check
    li.appendChild(document.createTextNode(text));

    const a = document.createElement('a');
    a.classList = 'delete-item float-right'
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';
    li.append(a);
    taskList.append(li);
}
function deleteItem(e) {
    if (e.target.className == 'fas fa-times') {
        let deleteTask = e.target.parentElement.parentElement;
        deleteTask.remove();
        deleteItemFromLS(deleteTask.textContent);
    }
    e.preventDefault();
}
function deleteItemFromLS(text) {
    items = getItemFromLS();
    items.forEach((item, index) => {
        if (item == text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}
function deleteAllItems(e){
    taskList.innerHTML ='';
    localStorage.clear();
    e.preventDefault();
}
function check(){
    this.classList.toggle("checked");
}


