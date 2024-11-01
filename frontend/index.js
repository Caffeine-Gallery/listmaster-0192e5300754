import { backend } from 'declarations/backend';

const newItemInput = document.getElementById('newItem');
const newItemQuantityInput = document.getElementById('newItemQuantity');
const addItemButton = document.getElementById('addItem');
const shoppingList = document.getElementById('shoppingList');
const loadingSpinner = document.getElementById('loadingSpinner');

function showLoading() {
    loadingSpinner.style.display = 'block';
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
}

async function loadItems() {
    showLoading();
    try {
        const items = await backend.getItems();
        shoppingList.innerHTML = '';
        items.forEach(item => {
            const li = createListItem(item);
            shoppingList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading items:', error);
    } finally {
        hideLoading();
    }
}

function createListItem(item) {
    const li = document.createElement('li');
    li.className = `list-group-item d-flex justify-content-between align-items-center ${item.completed ? 'completed' : ''}`;
    li.innerHTML = `
        <span class="item-text">${item.text} (Qty: ${item.quantity})</span>
        <div>
            <button class="btn btn-sm btn-success me-2 toggle-btn" data-id="${item.id}">
                <i class="fas ${item.completed ? 'fa-times' : 'fa-check'}"></i>
            </button>
            <button class="btn btn-sm btn-danger delete-btn" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    return li;
}

addItemButton.addEventListener('click', async () => {
    const text = newItemInput.value.trim();
    const quantity = parseInt(newItemQuantityInput.value, 10);
    if (text && quantity > 0) {
        showLoading();
        try {
            await backend.addItem(text, quantity);
            newItemInput.value = '';
            newItemQuantityInput.value = '1';
            await loadItems();
        } catch (error) {
            console.error('Error adding item:', error);
        } finally {
            hideLoading();
        }
    }
});

shoppingList.addEventListener('click', async (e) => {
    const toggleBtn = e.target.closest('.toggle-btn');
    const deleteBtn = e.target.closest('.delete-btn');
    
    if (toggleBtn) {
        const id = Number(toggleBtn.dataset.id);
        showLoading();
        try {
            await backend.toggleItem(id);
            await loadItems();
        } catch (error) {
            console.error('Error toggling item:', error);
        } finally {
            hideLoading();
        }
    } else if (deleteBtn) {
        const id = Number(deleteBtn.dataset.id);
        showLoading();
        try {
            await backend.deleteItem(id);
            await loadItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        } finally {
            hideLoading();
        }
    }
});

// Load items when the page loads
window.addEventListener('load', loadItems);
