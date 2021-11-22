const ulDom = document.querySelector("#list");
const input = document.querySelector("#task");
const addBtn = document.querySelector("#liveToastBtn");
const closeBtn = document.querySelector("#removeItemBtn");

let list = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];

list.forEach((element) => {
    let itemElementLi = document.createElement("li");
    itemElementLi.classList.add("list-item");
    itemElementLi.addEventListener("click", missionCompleted);
    itemElementLi.innerHTML = `${element}<span onclick="removeItemFromList(event)" class="close">&times;</span>
  `;
    ulDom.append(itemElementLi);
});

function addItemToList(item) {
    let task = capitalFirst(item);
    let itemElementLi = document.createElement("li");
    itemElementLi.addEventListener("click", missionCompleted);
    itemElementLi.innerHTML = `${task}<span onclick="removeItemFromList(event)" id="removeItemBtn" class="close">&times;</span>
  `;
    ulDom.append(itemElementLi);
    list.push(task);
    saveToLocalStorage(list);
    showToast("Başarılı bir şekilde eklendi.");
}

function removeItemFromList(e) {
    list = list.filter((x) => x !== e.target.previousSibling.textContent);
    e.target.parentElement.remove();
    saveToLocalStorage(list);
    showToast("Başarılı bir şekilde silindi.");
}

function checkItems(e) {
    if (input.value == "") {
        showToast("Lütfen bir değer girin.");
    } else if (checkItemDiff(input.value)) {
        showToast("Lütfen farklı bir değer girin.");
    } else {
        addItemToList(input.value);
    }
}

function missionCompleted(event) {
    event.target.classList.toggle("checked");
    console.log(event.target.classList);
}

function showToast(message) {
    let option = {
        animation: true,
        delay: 3000,
    };
    document.querySelector(".toast-body").innerHTML = message;
    const toast = document.querySelector("#liveToast");
    const toastElement = new bootstrap.Toast(toast, option);
    toastElement.show();
}


function checkItemDiff(item) {
    let ok = list.filter((x) => x == item);
    if (ok.length == 0) {
        return 0;
    } else {
        return 1;
    }
}

function saveToLocalStorage(list) {
    localStorage.setItem("list", JSON.stringify(list));
}