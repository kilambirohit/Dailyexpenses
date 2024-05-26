document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    loadBudget();
    calculateTotal();
  });
  
  function updateBudget() {
    const budget = parseFloat(document.getElementById('budget').value);
    localStorage.setItem('budget', budget);
    calculateTotal();
  }
  
  function addItem() {
    const itemName = document.getElementById('item').value;
    const itemPrice = parseFloat(document.getElementById('price').value);
  
    if (itemName === '' || isNaN(itemPrice)) {
      alert('Please enter valid item name and price.');
      return;
    }
  
    const items = getItems();
    items.push({ name: itemName, price: itemPrice });
    localStorage.setItem('items', JSON.stringify(items));
  
    document.getElementById('item').value = '';
    document.getElementById('price').value = '';
  
    displayItems();
    calculateTotal();
  }
  
  function getItems() {
    return JSON.parse(localStorage.getItem('items')) || [];
  }
  
  function loadItems() {
    displayItems();
  }
  
  function loadBudget() {
    const budget = localStorage.getItem('budget');
    if (budget) {
      document.getElementById('budget').value = budget;
    }
  }
  
  function displayItems() {
    const items = getItems();
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';
  
    items.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';
      itemDiv.innerHTML = `
        <div>${item.name}: $<input type="number" value="${item.price.toFixed(2)}" onchange="updatePrice(${index}, this.value)"></div>
        <button class="bought" onclick="removeItem(${index})">Bought</button>
      `;
      itemsList.appendChild(itemDiv);
    });
  }
  
  function updatePrice(index, newPrice) {
    const items = getItems();
    items[index].price = parseFloat(newPrice);
    localStorage.setItem('items', JSON.stringify(items));
    calculateTotal();
  }
  
  function removeItem(index) {
    const items = getItems();
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    displayItems();
    calculateTotal();
  }
  
  function calculateTotal() {
    const items = getItems();
    const totalPrice = items.reduce((total, item) => total + item.price, 0);
    document.getElementById('total-price').textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  
    const budget = parseFloat(localStorage.getItem('budget'));
    if (budget && totalPrice > budget) {
      alert('Warning: You have exceeded your budget!');
    }
  }
  