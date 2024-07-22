document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const note = document.getElementById('note').value;
    
    if(amount === '') {
        alert('Please enter an amount');
        return;
    }
    
    const expenseItem = document.createElement('div');
    expenseItem.className = 'expense-item';
    
    expenseItem.innerHTML = `
        <span>Amount: $${amount}</span>
        <span>Category: ${category}</span>
        <span>Note: ${note}</span>
        <button class="delete-btn">Delete</button>
    `;
    
    document.getElementById('expense-list').appendChild(expenseItem);
    
    document.getElementById('expense-form').reset();
});

document.getElementById('expense-list').addEventListener('click', function(e) {
    if(e.target.classList.contains('delete-btn')) {
        const expenseItem = e.target.parentElement;
        document.getElementById('expense-list').removeChild(expenseItem);
    }
});
