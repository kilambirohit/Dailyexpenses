document.addEventListener('DOMContentLoaded', loadExpenses);
document.getElementById('expense-form').addEventListener('submit', addExpense);
document.getElementById('expense-list').addEventListener('click', removeExpense);

function addExpense(e) {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const note = document.getElementById('note').value;

    if (amount === '' || date === '') {
        alert('Please enter all required fields');
        return;
    }

    const expense = {
        amount,
        date,
        category,
        note
    };

    saveExpense(expense);
    appendExpense(expense);
    document.getElementById('expense-form').reset();
}

function appendExpense(expense) {
    const expenseItem = document.createElement('div');
    expenseItem.className = 'expense-item';

    expenseItem.innerHTML = `
        <span>Amount: ₹${expense.amount}</span>
        <span>Date: ${expense.date}</span>
        <span>Category: ${expense.category}</span>
        <span>Note: ${expense.note}</span>
        <button class="delete-btn">Delete</button>
    `;

    document.getElementById('expense-list').appendChild(expenseItem);
}

function saveExpense(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => appendExpense(expense));
}

function removeExpense(e) {
    if (e.target.classList.contains('delete-btn')) {
        const expenseItem = e.target.parentElement;
        const amount = expenseItem.querySelector('span:nth-child(1)').textContent.replace('Amount: ₹', '');
        const date = expenseItem.querySelector('span:nth-child(2)').textContent.replace('Date: ', '');
        const category = expenseItem.querySelector('span:nth-child(3)').textContent.replace('Category: ', '');
        const note = expenseItem.querySelector('span:nth-child(4)').textContent.replace('Note: ', '');

        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses = expenses.filter(expense => !(expense.amount === amount && expense.date === date && expense.category === category && expense.note === note));
        localStorage.setItem('expenses', JSON.stringify(expenses));

        document.getElementById('expense-list').removeChild(expenseItem);
    }
}
