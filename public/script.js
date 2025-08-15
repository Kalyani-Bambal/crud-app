function createTable() {
    fetch('/createTable')
        .then(res => res.text())
        .then(data => updateResult(data))
        .catch(showError);
}

function addItem() {
    const name = prompt('Enter item name:');
    if (!name) return;
    fetch('/addItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    })
        .then(res => res.text())
        .then(data => updateResult(data))
        .catch(showError);
}

function getItems() {
    fetch('/getItems')
        .then(res => res.json())
        .then(data => {
            if (!data.length) {
                updateResult('No items found.');
                return;
            }
            let table = `<table>
                            <tr><th>ID</th><th>Name</th></tr>`;
            data.forEach(item => {
                table += `<tr><td>${item.id}</td><td>${item.name}</td></tr>`;
            });
            table += `</table>`;
            document.getElementById('result').innerHTML = table;
        })
        .catch(showError);
}

function updateItem() {
    const id = prompt('Enter item ID to update:');
    const name = prompt('Enter new item name:');
    if (!id || !name) return;
    fetch(`/updateItem/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    })
        .then(res => res.text())
        .then(data => updateResult(data))
        .catch(showError);
}

function deleteItem() {
    const id = prompt('Enter item ID to delete:');
    if (!id) return;
    fetch(`/deleteItem/${id}`, { method: 'DELETE' })
        .then(res => res.text())
        .then(data => updateResult(data))
        .catch(showError);
}

function updateResult(message) {
    document.getElementById('result').innerHTML = `<p>${message}</p>`;
}

function showError(err) {
    document.getElementById('result').innerHTML = `<p style="color:red;">Error: ${err}</p>`;
}

