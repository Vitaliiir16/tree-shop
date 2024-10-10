document.addEventListener('DOMContentLoaded', () => {
    const editTreeIndex = localStorage.getItem('editTreeIndex');
    if (editTreeIndex !== null) {
        const treeData = JSON.parse(localStorage.getItem('editTreeData'));
        if (treeData) {
            document.getElementById('edit-brand').value = treeData.brand;
            document.getElementById('edit-height').value = treeData.height;
            document.getElementById('edit-price').value = treeData.price;
            document.getElementById('edit-material').value = treeData.material;
        }
    }

    const form = document.getElementById('tree-form') || document.getElementById('edit-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (form.id === 'tree-form') {
            const newTree = {
                brand: document.getElementById('brand').value,
                height: parseInt(document.getElementById('height').value),
                price: parseFloat(document.getElementById('price').value),
                material: document.getElementById('material').value,
            };
            await addTree(newTree);
            window.location.href = 'index.html';
        } else if (form.id === 'edit-form') {
            const updatedTree = {
                brand: document.getElementById('edit-brand').value,
                height: parseInt(document.getElementById('edit-height').value),
                price: parseFloat(document.getElementById('edit-price').value),
                material: document.getElementById('edit-material').value,
            };
            await updateTree(editTreeIndex, updatedTree);
            localStorage.removeItem('editTreeIndex');
            localStorage.removeItem('editTreeData');
            window.location.href = 'index.html';
        }
    });
});

async function addTree(tree) {
    await fetch('http://localhost:3000/trees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tree),
    });
}

async function updateTree(id, tree) {
    await fetch(`http://localhost:3000/trees/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tree),
    });
}
