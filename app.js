const form = document.getElementById('addTaskForm'); 
const input = document.getElementById('txtTaskName');
const taskList = document.getElementById('task-list');
const btnDeleteAll = document.getElementById('btnDeleteAll');
let items; // localStorage'a elaman atarken kullanakcağım global değişken. 

loadItems() // localStorage'dan elamanları getirip ekranda gösterilmesini sağlayacak function

eventListeners(); // bir olay tanımladığım elamanların olduğu function

function loadItems() {
    items = getItemLs();
    items.forEach((item) => {
        createItem(item);
    });
}
function eventListeners() {
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click', deleteAnItem);
    btnDeleteAll.addEventListener('click', deleteAllItems);
}
function addNewItem(e) {
    if (!(input.value == '')) {
        createItem(input.value);
        setItemLS(input.value);
    }
    input.value = '';
    e.preventDefault();
}
function createItem(text) {
    const li = document.createElement('li');
    li.classList = 'list-group-item list-group-item-secondary';
    li.onclick = check
    li.innerText = text;

    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);

    taskList.appendChild(li);
}
function check(){
    this.classList.toggle('checked');
}

function setItemLS(text) {
    items = getItemLs();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}
function getItemLs() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
function deleteAnItem(e) {
    if (e.target.className === 'fas fa-times') {
        const li = e.target.parentElement.parentElement;
        li.remove();
        deleteFromLS(li.textContent);
    }
    e.preventDefault();
}
function deleteFromLS(text) {
    items = getItemLs();
    items.forEach((item,index)=>{
       if(item === text){
        items.splice(index,1);
       }
    });
    localStorage.setItem('items',JSON.stringify(items));
}
function deleteAllItems(e) {
    taskList.innerHTML = '';
    localStorage.clear();
    e.preventDefault();
}