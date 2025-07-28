let budget = 0;
let remaining = 0;

const budgetEl = document.getElementById('budget');
const remainingEl = document.getElementById('remaining');
const budgetPrompt = document.getElementById('budgetPrompt');
const budgetInput = document.getElementById('budgetInput');
const itemList = document.getElementById('itemList');

function setBudgetFromInput() {
  const value = parseFloat(budgetInput.value);
  if (!isNaN(value) && value > 0) {
    budget = value;
    remaining = budget;
    updateBudgetUI();
    budgetPrompt.style.display = 'none';
  } else {
    alert('Please enter a valid number');
  }
}

function editBudget() {
  budgetPrompt.style.display = 'block';
}

function updateBudgetUI() {
  budgetEl.textContent = budget.toFixed(2);
  remainingEl.textContent = remaining.toFixed(2);
}

function addItem() {
  const name = document.getElementById('itemName').value;
  const price = parseFloat(document.getElementById('itemPrice').value);

  if (!name || isNaN(price) || price <= 0) return;

  const li = document.createElement('li');
  li.textContent = `${name} - $${price.toFixed(2)}`;
  itemList.appendChild(li);

  remaining -= price;
  updateBudgetUI();

  document.getElementById('itemName').value = '';
  document.getElementById('itemPrice').value = '';
}

function exportData() {
  const items = [];
  itemList.querySelectorAll('li').forEach((li) => {
    items.push(li.textContent);
  });

  const blob = new Blob([`Budget: $${budget.toFixed(2)}\nRemaining: $${remaining.toFixed(2)}\n\nItems:\n${items.join('\n')}`], {
    type: 'text/plain',
  });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'grocery-budget.txt';
  a.click();
}

function clearAll() {
  itemList.innerHTML = '';
  remaining = budget;
  updateBudgetUI();
}

window.onload = () => {
  if (budget === 0) {
    budgetPrompt.style.display = 'block';
  }
};
