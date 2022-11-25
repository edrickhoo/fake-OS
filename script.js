const menuClock = document.querySelector(".task-bar__clock");
const startBtn = document.querySelector(".task-bar__start");

const closeBtns = document.querySelectorAll(".app__header-bar--close");

let startMenu = document.querySelector(".start-menu");

const getCurrentTime = () => {
  let date = new Date().toString().slice(16, 24);
  let currentTime = "00:00:00 AM";

  if (Number(date.substring(0, 2)) > 12) {
    currentTime = `${date} PM`;
  } else {
    currentTime = `${date} AM`;
  }
  return currentTime;
};

const setCurrentTime = () => {
  let currentTime = getCurrentTime();

  menuClock.textContent = currentTime;
};

setInterval(setCurrentTime, 1000);

const toggleStartMenu = () => {
  startMenu.classList.toggle("start-menu--toggle");
  startBtn.classList.toggle("task-bar__start--selected");
};

startBtn.addEventListener("click", toggleStartMenu);

// Apps, notepad, photos, phone book, maybe feedback form

const closeWindow = (e) => {
  console.log(e.target);

  e.target.src
    ? (e.target.parentElement.parentElement.parentElement.style.display =
        "none")
    : (e.target.parentElement.parentElement.style.display = "none");
};

closeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    closeWindow(e);
  });
});

const openWindow = (appName) => {
  let app = document.querySelector(`.app__${appName}`);

  app.style.display = "flex";
};

let notepadDesktopIcon = document.querySelector(".desktop__icon--notepad");

notepadDesktopIcon.addEventListener("dblclick", () => {
  retriveNotepad();
  openWindow("notepad");
});

let addressBookDesktopIcon = document.querySelector(
  ".desktop__icon--address_book"
);

addressBookDesktopIcon.addEventListener("dblclick", () => {
  renderAddressBook();
  openWindow("address_book");
});

const paintDesktopIcon = document.querySelector(".desktop__icon--paint");

paintDesktopIcon.addEventListener("dblclick", () => {
  populateBoard();
  openWindow("paint");
});

const addressBookStartIcon = document.querySelector(".apps__address-book");

addressBookStartIcon.addEventListener("click", () => {
  renderAddressBook();
  openWindow("address_book");
  toggleStartMenu();
});

const notepadStartIcon = document.querySelector(".apps__notepad");

notepadStartIcon.addEventListener("click", () => {
  retriveNotepad();
  openWindow("notepad");
  toggleStartMenu();
});

const paintStartIcon = document.querySelector(".apps__paint");

paintStartIcon.addEventListener("click", () => {
  populateBoard();
  openWindow("paint");
  toggleStartMenu();
});

// save btn notepad

let notepadSave = document.querySelector(".app__utility--save");
let notepadTextArea = document.querySelector(".notepad__textarea");

const saveNotepad = () => {
  let text = notepadTextArea.value;

  localStorage.setItem("notepadMessage", text);
};

const retriveNotepad = () => {
  const message = localStorage.getItem("notepadMessage");

  if (message) {
    notepadTextArea.value = message;
  } else {
    notepadTextArea.value = "";
  }
};

notepadSave.addEventListener("click", () => {
  saveNotepad();
});

// Delete save with notepad btn

const notepadDelete = document.querySelector(".app__utility--delete");

const deleteNotepadSave = () => {
  localStorage.removeItem("notepadMessage");
  notepadTextArea.value = "";
};

notepadDelete.addEventListener("click", () => {
  deleteNotepadSave();
});

// Address book

let addressBookDataBase = [
  { name: "test", tel: "041235678", address: "5 water place" },
];

const addressTable = document.querySelector(".address_book__table");

const addressBookForm = document.querySelector(".address_book__form");

const saveToBookData = (entry) => {
  addressBookDataBase.push(entry);

  localStorage.setItem("addressBook", JSON.stringify(addressBookDataBase));
};

const renderAddressBook = () => {
  addressTable.innerHTML = `<tr>
  <th class="address_book__table--header">Name</th>
  <th class="address_book__table--header">Phone</th>
  <th class="address_book__table--header">Address</th>
</tr>`;

  const entries = JSON.parse(localStorage.getItem("addressBook"));

  if (Array.isArray(entries) && entries.length > 0) {
    addressBookDataBase = entries;
  }

  addressBookDataBase.forEach((entry) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="address_book__table--name">${entry.name}</td>
    <td class="address_book__table--tel">${entry.tel}</td>
    <td class="address_book__table--address">${entry.address}</td>`;

    addressTable.appendChild(tr);
  });
};

const addToAddressBook = (e) => {
  e.preventDefault();

  const myFormData = new FormData(
    document.querySelector(".address_book__form")
  );
  console.log(myFormData);

  const formDataObj = {};
  myFormData.forEach((value, key) => (formDataObj[key] = value));
  console.log(formDataObj);

  if (formDataObj.name !== "") {
    // Push to DataBase
    saveToBookData(formDataObj);

    // Re re-render
    renderAddressBook();

    // Clear inputs
    addressBookForm.reset();
  }
};

const addressBookAddBtn = document.querySelector(".address_book__form--submit");

addressBookAddBtn.addEventListener("click", (e) => {
  addToAddressBook(e);
});

// Dragable

// Make the DIV element draggable:

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  if (document.querySelector(`.${elmnt.classList[1]}--header-bar`)) {
    // if present, the header is where you move the DIV from:
    document.querySelector(`.${elmnt.classList[1]}--header-bar`).onmousedown =
      dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

dragElement(document.querySelector(".app__address_book"));
dragElement(document.querySelector(".app__notepad"));
dragElement(document.querySelector(".app__paint"));

// Paint

let color = "black";
let click = true;

const populateBoard = () => {
  let board = document.querySelector(".paint__board");
  let squares = board.querySelectorAll("div");
  squares.forEach((div) => div.remove());

  board.style.gridTemplateColumns = "repeat(20 , 1fr)";
  board.style.gridTemplateRows = "repeat(20 , 1fr)";

  for (let i = 0; i < 400; i++) {
    let square = document.createElement("div");
    square.addEventListener("mouseover", (e) => {
      colorSquare(e);
    });
    square.style.backgroundColor = "white";
    // board.insertAdjacentElement("beforeend", square);
    board.appendChild(square);
  }
};

const colorSquare = (e) => {
  if (click) {
    if (color === "random") {
      e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else {
      e.target.style.backgroundColor = color;
    }
  }
};

const changeColor = (choice) => {
  color = choice;
};

const resetBoard = () => {
  let board = document.querySelector(".paint__board");
  let squares = board.querySelectorAll("div");
  squares.forEach((div) => (div.style.backgroundColor = "white"));
};

const toggleDraw = (e) => {
  if (e.target.tagName != "BUTTON") {
    click = !click;
    if (click) {
      document.querySelector(".paint__mode").textContent = "Mode: Coloring";
    } else {
      document.querySelector(".paint__mode").textContent = "Mode: Not Coloring";
    }
  }
};

document.querySelector(".paint__board").addEventListener("click", (e) => {
  toggleDraw(e);
});

const paintBtns = document.querySelector(".paint__btns").children;

for (let i = 0; i < paintBtns.length; i++) {
  switch (paintBtns[i].textContent) {
    case "Reset":
      paintBtns[i].addEventListener("click", () => resetBoard());
      break;
    case "Erasor":
      paintBtns[i].addEventListener("click", () => changeColor("white"));
      break;

    default:
      paintBtns[i].addEventListener("click", () =>
        changeColor(paintBtns[i].textContent.toLowerCase())
      );
      break;
  }
}

console.log(paintBtns);

const applications = document.querySelectorAll(".app");

console.log(applications);
