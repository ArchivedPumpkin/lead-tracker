import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

import { FIREBASE_DATABASE_URL } from "./config.js";

const firebaseConfig = {
  databaseURL: FIREBASE_DATABASE_URL,
}; // Your Firebase configuration object

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDb = ref(database, "leads");

console.log(app);

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  remove(referenceInDb);
  ulEl.innerHTML = "";
});

onValue(referenceInDb, function (snapshot) {
  const snapshotExists = snapshot.exists();

  if (snapshotExists) {
    const snapshotValues = snapshot.val();
    const leads = Object.values(snapshotValues);
    console.log(leads);
    render(leads);
  }
});

inputBtn.addEventListener("click", function () {
  push(referenceInDb, inputEl.value);
  inputEl.value = "";
});
