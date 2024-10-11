function displayTrees() {
    const treeList = document.getElementById('trees');
    if (treeList) {
        treeList.innerHTML = '';
        fetch('/api/trees')
            .then(response => response.json())
            .then(trees => {
                trees.forEach((tree, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span class="tree-info">Виробник: ${tree.brand} - Висота: ${tree.height} см, Ціна: ${tree.price} грн, Матеріал: ${tree.material}</span>
                        <button class="edit" onclick="editTree(${index})">Редагувати</button>
                        <button class="delete" onclick="deleteTree(${index})">Видалити</button>
                    `;
                    treeList.appendChild(li);
                });
            });
    }
}

function editTree(index) {
    localStorage.setItem('editTreeIndex', index);
    window.location.href = 'edit.html';
}

function deleteTree(index) {
    fetch(`/api/trees/${index}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            displayTrees();
            calculateTotalPrice();
        } else {
            alert('Error deleting tree.');
        }
    });
}

function sortTrees(criteria) {
    const treeList = document.getElementById('trees');
    fetch('/api/trees')
        .then(response => response.json())
        .then(trees => {
            if (criteria === 'price') {
                trees.sort((a, b) => a.price - b.price);
            } else if (criteria === 'height') {
                trees.sort((a, b) => a.height - b.height);
            }
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
        });
}

function searchTrees() {
    const searchValue = document.getElementById('search').value.trim().toLowerCase();
    fetch('/api/trees')
        .then(response => response.json())
        .then(trees => {
            const filteredTrees = trees.filter(tree => tree.brand.toLowerCase().includes(searchValue));
            const treeList = document.getElementById('trees');
            treeList.innerHTML = '';
            filteredTrees.forEach((tree, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="tree-info">${tree.brand} - Висота: ${tree.height} см, Ціна: ${tree.price} грн, Матеріал: ${tree.material}</span>
                    <button class="edit" onclick="editTree(${index})">Редагувати</button>
                    <button class="delete" onclick="deleteTree(${index})">Видалити</button>
                `;
                treeList.appendChild(li);
            });
        });
}

function calculateTotalPrice() {
    fetch('/api/trees')
        .then(response => response.json())
        .then(trees => {
            const total = trees.reduce((acc, tree) => acc + tree.price, 0);
            document.getElementById('total-price').innerText = total;
        });
}
