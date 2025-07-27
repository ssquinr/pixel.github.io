const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const addInput = document.getElementById("add");
const subtractInput = document.getElementById("subtract");
const balanceEl = document.getElementById("balance");
const historyList = document.getElementById("historyList");
const searchInput = document.getElementById("search");
const historySection = document.getElementById("historySection");
const showHistoryBtn = document.getElementById("showHistory");
const personSelect = document.getElementById("person");

let balance = parseFloat(localStorage.getItem("balance")) || 0;
let history = JSON.parse(localStorage.getItem("history")) || [];

updateDisplay();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const person = personSelect.value;
  const name = nameInput.value.trim();
  const add = parseFloat(addInput.value) || 0;
  const subtract = parseFloat(subtractInput.value) || 0;

  if (person === "None") {
    alert("กรุณาเลือกชื่อคน");
    return;
  }

  if (!name || (add === 0 && subtract === 0)) {
    alert("กรุณากรอกชื่อและจำนวนเงินที่ถูกต้อง");
    return;
  }

  const net = add - subtract;
  balance += net;

  history.push({
    person, // เพิ่มชื่อคนในประวัติ
    name,
    amount: net,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("balance", balance);
  localStorage.setItem("history", JSON.stringify(history));

  updateDisplay();
  form.reset();
});

showHistoryBtn.addEventListener("click", () => {
  historySection.classList.toggle("hidden");
  renderHistory();
});

searchInput.addEventListener("input", renderHistory);

function updateDisplay() {
  balanceEl.textContent = balance.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

function renderHistory() {
  const keyword = searchInput.value.toLowerCase();
  historyList.innerHTML = "";

  history
    .filter(item => item.name.toLowerCase().includes(keyword))
    .reverse()
    .forEach(item => {
      const li = document.createElement("li");
      const sign = item.amount > 0 ? "+" : "-";
      li.textContent = `[${item.date}] (${item.person}) ${item.name}: ${sign}${Math.abs(item.amount).toLocaleString()} บาท`;
      historyList.appendChild(li);
    });
}

