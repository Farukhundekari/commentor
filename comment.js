const submit = document.getElementById("submit");
const input = document.getElementById("input");
const Hscode = document.getElementById("Hscode");
const copyBtn = document.getElementById("copyBtn");
const counterDisplay = document.getElementById("counter");
const resetBtn = document.getElementById("reset");
const decrementBtn = document.getElementById("decrement");
const comment = document.getElementById("comment");
const procComment = document.getElementById("proc-comment");
const entryInput = document.getElementById("entry-input");
const editBtn = document.getElementById("edit");
const editInput = document.getElementById("editInput");

//////////////////////////
// Counter with localStorage
//////////////////////////
function counter() {
  //  Initialize from localStorage if exists
  let num = parseInt(localStorage.getItem("copyCount")) || 0;

  // Helper to sync to localStorage
  const saveToStorage = () => {
    localStorage.setItem("copyCount", num);
  };

  return {
    increment() {
      num++;
      saveToStorage();
      return num;
    },
    decrement() {
      num = Math.max(0, num - 1);
      saveToStorage();
      return num;
    },
    reset() {
      num = 0;
      saveToStorage();
      return num;
    },
    value() {
      return num;
    },
    edit(newNum) {
      if (typeof newNum === "number" && newNum >= 0) {
        num = newNum;
        saveToStorage();
        return num;
      } else {
        console.warn("Invalid value — must be a positive number");
        return num;
      }
    },
  };
}

const counts = counter();

// ✅ Set initial display from stored value
counterDisplay.textContent = `Copied: ${counts.value()} times`;

//////////////////////////
// Event Listeners
//////////////////////////

submit.addEventListener("click", async () => {
  const result = input.value.trim().replace(/\./g, "");
  Hscode.textContent = `HTS CODE : ${result} ` || "No code entered";
  input.value = "";
  Hscode.style.color = "#4D148C";
  Hscode.style.fontSize = "18px";
  Hscode.style.justifyContent = "center";
  setTimeout(() => (Hscode.style.transform = "scale(1)"), 400);
  const Hscodes = result;
  try {
    await navigator.clipboard.writeText(Hscodes).then(() => {
      const val = counts.increment();
      counterDisplay.textContent = `Copied: ${val} times`;
      counterDisplay.style.color = "#28a745";
      setTimeout(() => (counterDisplay.style.color = "#007bff"), 800);
    });
  } catch (err) {
    console.error("Failed to copy:", err);
  }
});

resetBtn.addEventListener("click", () => {
  counts.reset();
  counterDisplay.textContent = "Copied: 0 times";
});

decrementBtn.addEventListener("click", () => {
  const val = counts.decrement();
  counterDisplay.textContent = `Copied: ${val} times`;
});

procComment.addEventListener("click", function () {
  const previewHold = document.getElementById("previewHold");
  const entry = entryInput.value.trim();
  preview = `${entry} - Shipment is on hold`;
  navigator.clipboard.writeText(`${entry} - Shipment is on hold`);
  previewHold.textContent = preview;
});

editBtn.addEventListener("click", () => {
  const newVal = Number(editInput.value);
  const updated = counts.edit(newVal);
  counterDisplay.textContent = `Copied: ${updated} times`;
  editInput.value = "";
});

//////////////////Dropdown ///////////////////////////
const getDozen = document.getElementById("getDozen");
const getGross = document.getElementById("getGross");
const container = document.getElementById("unit-converter");

getDozen.addEventListener("click", async () => {
  const inputDozen = document.getElementById("unitInput");
  const input = inputDozen.value;

  const dozenvalue = input / 12;
  const preview = document.getElementById("previewDozen");
  preview.textContent = dozenvalue.toFixed(2);

  inputDozen.value = "";

  try {
    await navigator.clipboard.writeText(preview);
  } catch (err) {
    alert(`please find error Massesge ${err}`);
  }
});

getGross.addEventListener("click", async () => {
  const inputDozen = document.getElementById("unitInput");
  const preview = document.getElementById("previewGross");

  const input = inputDozen.value;

  const dozenvalue = input / 10;
  preview.textContent = dozenvalue.toFixed(2);

  inputDozen.value = "";

  try {
    await navigator.clipboard.writeText(preview);
  } catch (err) {
    alert(`please find error Massesge ${err}`);
  }
});

//////////// Commeting section ./////////////////

const commentSeven = document.getElementById("commentSeven");
const indexComplete = document.getElementById("indexComplete");

// Indexing Completed shipements //////////

indexComplete.addEventListener("click", async () => {
  const inputs = document.getElementById("indexShips");
  const newValue = inputs.value;
  const previewIndex = document.getElementById("previewIndex");
  const text = `${newValue} SI AUTO - Index`;
  previewIndex.innerHTML = text;

  try {
    const textConent = "SI AUTO - Index";
    await navigator.clipboard.writeText(textConent);
  } catch (err) {
    console.error("Failed to copy:", err);
  }

  const log = {
    date: formatted,
    action: text,
    waight: 0.25,
  };
  logs.push(log);

  localStorage.setItem("inputLogs", JSON.stringify(logs));
  renderLogs();
});

const latestBtn = document.getElementById("commentSeven");

let stored = localStorage.getItem("inputLogs");
let logs = [];

try {
  const parse = JSON.parse(stored);
  if (Array.isArray(parse)) {
    logs = parse;
  } else if (parse) {
    logs = parse[parse];
  } else {
    logs = [];
  }
} catch {
  logs = [];
}

const parsed = JSON.parse(stored);

latestBtn.addEventListener("click", async () => {
  const inputs = document.getElementById("input75");

  if (inputs.value.trim() === "") {
    alert("please add Number");
    return;
  }
  const preview = ` ${inputs.value} - Keyed 87/01 - 7501PROC`;
  const preview7501 = document.getElementById("preview7501");
  preview7501.textContent = preview;
  inputs.value = "";
  try {
    await navigator.clipboard.writeText(preview);
  } catch (err) {
    console.error("Failed to copy:", err);
  }

  const log = {
    date: formatted,
    action: preview,
    waight: 1,
  };

  logs.push(log);

  localStorage.setItem("inputLogs", JSON.stringify(logs));
  inputs.value = "";
  renderLogs();
});

/////////////////////////DATE GENRERATOR////////////////////////////////
const d = new Date();

const day = String(d.getDate()).padStart(2, "0");
const month = String(d.getMonth() + 1).padStart(2, "0");
const year = d.getFullYear();

const hours = String(d.getHours()).padStart(2, "0");
const minutes = String(d.getMinutes()).padStart(2, "0");

let formatted = `${day}/${month}/${year} ${hours}:${minutes}`;
////////////////////////////////FInish////////////////////////////////

//////////////////////////Index REview Block///////////////////////////
const indexReview = document.getElementById("btn-raviewTwo");

indexReview.addEventListener("click", async () => {
  const dept = document.getElementById("deptTwo");
  const task = document.getElementById("taskTwo");

  const inputs = [dept, task];
  const Alllogs = [];

  inputs.forEach((items) => {
    const selected = Array.from(items.selectedOptions).map((optn) => {
      return optn.value;
    });
    const letselect = selected.join(" ");
    console.log(letselect);
    Alllogs.push(...selected);
  });
  const addnText = document.getElementById("addComment").value;
  const finalselect = `${Alllogs.join(" ")} ${addnText}`;
  const preview = document.getElementById("preview");

  preview.textContent = finalselect;

  // Copy to clipboard (fixed reference)
  try {
    await navigator.clipboard.writeText(finalselect);
    console.log("✅ Copied to clipboard:", finalselect);
  } catch (err) {
    alert("❌ Failed to copy: " + err);
  }

  const log = {
    date: formatted,
    action: finalselect,
    waight: 0.25,
  };
  console.log(log);
  logs.push(log);
  localStorage.setItem("inputLogs", JSON.stringify(logs));
  renderLogs();
});
////////////////////////////////7501 Review Block///////////////////////////
const Review7501 = document.getElementById("review7501");

Review7501.addEventListener("click", async () => {
  const dept = document.getElementById("dept");
  const task = document.getElementById("task");

  const inputs = [dept, task];
  const Alllogs = [];

  inputs.forEach((items) => {
    const selected = Array.from(items.selectedOptions).map((optn) => {
      return optn.value;
    });
    Alllogs.push(...selected);
  });
  const inputComment = document.getElementById("add-comment");
  const newinputs = inputComment.value;
  console.log(newinputs);
  console.log(Alllogs);
  const newSelect = `${Alllogs.join(" ")} ${newinputs}`;
  const output = document.getElementById("output");
  output.textContent = newSelect;

  // ✅ Copy to clipboard
  try {
    await navigator.clipboard.writeText(newSelect);
    console.log("✅ Copied to clipboard:", newSelect);
  } catch (err) {
    alert("❌ Failed to copy: " + err);
  }
  const log = {
    date: formatted,
    action: newSelect,
    waight: 1,
  };
  console.log(log);
  logs.push(log);
  localStorage.setItem("inputLogs", JSON.stringify(logs));
  renderLogs();
});

/////////////////////////////////////////////////////////
function renderLogs() {
  const logscontainer = document.getElementById("logsContainer");
  logscontainer.innerHTML = "";

  logs.forEach((item, index) => {
    const renderDiv = document.createElement("div");
    renderDiv.className = "logs-renders";

    renderDiv.innerHTML = `
      <div class='render-container'>
        <div class='table-items'>
          <div>${item.action}</div>
          <div>${item.date}</div>
        </div>
        <div data-index="${index}" class="delete-btn">X</div>
      </div>
    `;
    logscontainer.appendChild(renderDiv);
  });

  // Total Count
  let total = logs.reduce((acc, item) => acc + item.waight, 0);
  document.getElementById(
    "activitySummary"
  ).innerHTML = `Total Actions : ${total}`;
}

document.getElementById("actionLog").addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    logs.splice(index, 1);
    localStorage.setItem("inputLogs", JSON.stringify(logs));
    renderLogs();
  }
});
/////Reset Button activity ////////////////
const drawer = document.getElementById("activityDrawer");
const openBtn = document.getElementById("actionLog");
const closeBtn = document.getElementById("closeDrawer");

openBtn.addEventListener("click", () => {
  drawer.classList.add("open");
  renderLogs();
});

closeBtn.addEventListener("click", () => {
  drawer.classList.remove("open");
});
document
  .getElementById("logsContainer")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;
      logs.splice(index, 1);
      localStorage.setItem("inputLogs", JSON.stringify(logs));
      renderLogs();
    }
  });

const resetActivity = document.getElementById("resetLogsBtn");

resetActivity.addEventListener("click", function () {
  const confirmReset = confirm(
    "Are you sure you want to clear all activity logs?"
  );
  if (!confirmReset) return;
  // localStorage.removeItem("inputLogs");
  logs = [];
  renderLogs();
  console.log("look");
});

const departmentTasks = {
  Department1: ["Task1", "Task2", "Task4", "Task3"],
  Department2: ["Task11", "Task21", "Task41", "Task31"],
  Department3: ["Task131", "Task221", "Task411", "Task300"],
  Department4: ["Task1122", "Task5211", "Task4451", "Task3531"],
};

const dept = document.getElementById("dept");
const task = document.getElementById("task");
const finalSelect = [];
const debug = document.getElementById("debug");

dept.addEventListener("change", function () {
  const deptSelect = dept.value;
  if (deptSelect === "") {
    debug.textContent = "No department selected";
    return;
  }
  task.innerHTML = "";
  departmentTasks[deptSelect].forEach((opn) => {
    const option = document.createElement("option");
    option.value = opn;
    option.textContent = opn;
    task.appendChild(option);
  });

  console.log(deptSelect);
});

fetch("tariffData.json")
  .then((response) => response.json())
  .then((data) => {
    const tarrifinput = document.getElementById("tarrifinput");
    const resultsContainer = document.getElementById("results");

    tarrifinput.addEventListener("input", async function () {
      const searchTerm = tarrifinput.value.toLowerCase();
      resultsContainer.innerHTML = "";

      if (searchTerm.length === 0) return;

      const filtered = data.filter((item) =>
        item.description.toLowerCase().includes(searchTerm)
      );

      filtered.forEach((item) => {
        const div = document.createElement("div");
        div.textContent = `${item.description} - ${item.hts_code}`;

        div.addEventListener("click", () => {
          tarrifinput.value = `${item.description} - ${item.hts_code}`;
          const hts = item.hts_code;
          navigator.clipboard.writeText(hts);
          resultsContainer.innerHTML = "";
        });
        resultsContainer.appendChild(div);
      });
    });

    document.addEventListener("click", (e) => {
      if (!resultsContainer.contains(e.target) && e.target !== tarrifinput) {
        resultsContainer.innerHTML = "";
      } else {
        tarrifinput.value = "";
      }
    });
  });

// Highlight active page
document.querySelectorAll(".tab").forEach((tab) => {
  if (tab.href && tab.href === window.location.href) {
    tab.classList.add("active");
  }
});

////////////////////// ODD EVEN NUMBERS ////////////////////////////

// const greetMassge = () => {
//   console.log("hello world");
// };

// greetMassge();

// const calAge = (ageyear, year) => {
//   const ageOfUser = year - ageyear;
//   console.log(ageOfUser);
// };

// calAge(2021, 2025);

// const getBio = (name, prof, organization, city) => {
//   return `Hello, I'm ${name}. I am working as ${prof} in ${organization},${city}`;
// };
// console.log(getBio("faruk ", "dataAnalist", "tcs ", "pune"));

// const calculate = (x, y) => {
//   const c = x + y;
//   const d = c + x + y;
//   console.log(d);
//   innerfun = (amt) => {
//     console.log(amt + d);
//   };
//   return innerfun;
// };

// const funn = calculate(4, 5);
// funn(3);

// const calculateFullAmount = (type, amount) => {
//   let getPercent = 0.5;

//   if (type === "food") {
//     getPercent = 10;
//   }
//   if (type === "jwellary") {
//     getPercent = 18;
//   }
//   if (type === "basicItem") {
//     getPercent = 3;
//   }

//   const getGSTAmount = () => {
//     return amount * (getPercent / 100);
//   };

//   const getFinalAmout = () => {
//     return amount + getGSTAmount();
//   };
//   return getFinalAmout();
// };

// const biscuit = calculateFullAmount("food", 15000);
// const salt = calculateFullAmount("basicItem", 1000);
// const cloths = calculateFullAmount("", 10500);
// const jwellary = calculateFullAmount("jwellary", 100000);

// console.log(
//   biscuit.toFixed(),
//   salt.toFixed(),
//   cloths.toFixed(),
//   jwellary.toFixed()
// );
