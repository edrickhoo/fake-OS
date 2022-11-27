import { dragElement } from "./DragWindows.js";

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

startBtn.addEventListener("click", () => toggleStartMenu());

const closeStartMenu = (e) => {
  startMenu.classList.remove("start-menu--toggle");
  startBtn.classList.remove("task-bar__start--selected");
};

let wallpaper = document.querySelector(".wallpaper");

wallpaper.addEventListener("click", (e) => {
  closeStartMenu(e);
});

// Apps, notepad, photos, phone book, maybe feedback form

const closeWindow = (e) => {
  e.target.src
    ? (e.target.parentElement.parentElement.parentElement.style.display =
        "none")
    : (e.target.parentElement.parentElement.style.display = "none");

  let appName = "";

  if (e.target.src) {
    appName = e.target.parentElement.parentElement
      .querySelector(".app__header-bar--title")
      .textContent.toLowerCase();
  } else {
    appName = e.target.parentElement
      .querySelector(".app__header-bar--title")
      .textContent.toLowerCase();
  }

  removeInOpenedApps(appName);
};

closeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    closeWindow(e);
  });
});

// render taskbar apps
let openedApps = [];

const renderTaskApps = () => {
  const taskBar = document.querySelector(".task-bar__apps");

  taskBar.innerHTML = "";

  openedApps.forEach((app) => {
    const div = document.createElement("div");
    div.classList.add(
      "task-bar__app",
      `task-bar__apps--${app.name.toLowerCase()}`
    );

    div.innerHTML = ` <img src="${app.img}" alt="${app.name}" /><span>${app.name}</span>`;

    taskBar.appendChild(div);
  });
};

const addToOpenedApps = (appName) => {
  const app = {
    name: appName,
    img: `./assets/icons/${appName}.png`,
  };

  if (!(openedApps.filter((item) => item.name === appName).length > 0)) {
    openedApps.push(app);
  }

  renderTaskApps();
};

const removeInOpenedApps = (appName) => {
  openedApps = openedApps.filter(
    (app) => app.name.toLowerCase() !== appName.toLowerCase()
  );

  renderTaskApps();
};

const openWindow = (appName) => {
  let app = document.querySelector(`.app__${appName}`);
  app.style.display = "flex";
  addToOpenedApps(appName);
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
    <td class="address_book__table--address">${entry.address}</td>
    `;

    let removeBtn = document.createElement("img");
    removeBtn.src = "./assets/icons/media_player_stream_no2-1.png";

    removeBtn.classList.add("address_book__table--close");

    removeBtn.addEventListener("click", () => {
      removeAddressEntry(entry.id);
    });

    tr.appendChild(removeBtn);

    tr.classList.add("address_book__table--row");
    addressTable.appendChild(tr);
  });
};

// Remove addres entry

const removeAddressEntry = (id) => {
  // remove from database
  addressBookDataBase = addressBookDataBase.filter((item) => item.id !== id);

  localStorage.setItem("addressBook", JSON.stringify(addressBookDataBase));

  renderAddressBook();
};

const addToAddressBook = (e) => {
  e.preventDefault();

  const myFormData = new FormData(
    document.querySelector(".address_book__form")
  );

  const formDataObj = {};
  myFormData.forEach((value, key) => (formDataObj[key] = value));

  let id = new Date().valueOf();

  formDataObj.id = id;

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

  let screenSize = 80;

  board.style.gridTemplateColumns = `repeat(${screenSize} , 1fr)`;
  board.style.gridTemplateRows = `repeat(${screenSize} , 1fr)`;

  for (let i = 0; i < screenSize ** 2; i++) {
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

// Adding paint btn events

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

// Changing window z index

const applications = document.querySelectorAll(".app");

const changeZIndex = (app) => {
  app.style.zIndex = 1;

  applications.forEach((a) => {
    if (a !== app) {
      a.style.zIndex = 0;
    }
  });
};

// Select taskbar when clicked

const selectApp = (app) => {
  let appName = app
    .querySelector(".app__header-bar")
    .querySelector(".app__header-bar--title")
    .textContent.toLowerCase();

  let taskBarApp = document.querySelector(`.task-bar__apps--${appName}`);

  document.querySelectorAll(".task-bar__app").forEach((application) => {
    application.classList.remove("task-bar__app--selected");
  });

  taskBarApp?.classList.add("task-bar__app--selected");
};

applications.forEach((app) => {
  app.addEventListener("click", () => {
    changeZIndex(app);
    selectApp(app);
  });
});
