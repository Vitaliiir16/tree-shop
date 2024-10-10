let trees = [];

async function fetchTrees() {
    const response = await fetch('http://localhost:3000/trees');
    trees = await response.json();
    displayTrees();
}

function displayTrees() {
    const treeList = document.getElementById('trees');
    if (treeList) {
        treeList.innerHTML = '';
        trees.forEach((tree, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="tree-info">Виробник: ${tree.brand} - Висота: ${tree.height} см, Ціна: ${tree.price} грн, Матеріал: ${tree.material}</span>
                <button class="edit" onclick="editTree(${index})">Редагувати</button>
                <button class="delete" onclick="deleteTree(${index})">Видалити</button>
           `;
            treeList.appendChild(li);
        });
        calculateTotalPrice();
    }
}

function calculateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = trees.reduce((total, tree) => total + tree.price, 0);
    totalPriceElement.textContent = totalPrice;
}

async function deleteTree(index) {
    const id = index; // Використовуємо індекс в масиві
    await fetch(`http://localhost:3000/trees/${id}`, {
        method: 'DELETE',
    });
    fetchTrees();
}

function editTree(index) {
    localStorage.setItem('editTreeIndex', index);
    localStorage.setItem('editTreeData', JSON.stringify(trees[index]));
    window.location.href = 'edit.html';
}

async function sortTrees(criteria) {
    if (criteria === 'price') {
        trees.sort((a, b) => a.price - b.price);
    } else if (criteria === 'height') {
        trees.sort((a, b) => a.height - b.height);
    }
    displayTrees();
}

function searchTrees() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredTrees = trees.filter(tree => tree.brand.toLowerCase().includes(searchValue));
    const treeList = document.getElementById('trees');
    treeList.innerHTML = '';
    filteredTrees.forEach((tree, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="tree-info">Виробник: ${tree.brand} - Висота: ${tree.height} см, Ціна: ${tree.price} грн, Матеріал: ${tree.material}</span>
            <button class="edit" onclick="editTree(${index})">Редагувати</button>
            <button class="delete" onclick="deleteTree(${index})">Видалити</button>
       `;
        treeList.appendChild(li);
    });
}
