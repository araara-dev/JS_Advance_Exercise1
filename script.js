let numbers = [];

function renderList() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    numbers.forEach((num, index) => {
        const tr = document.createElement('tr');
        const isEven = num % 2 === 0;
        const typeText = isEven ? 'EVEN' : 'ODD';
        const typeClass = isEven ? 'even' : 'odd';

        tr.innerHTML = `
            <td><strong>${num}</strong></td>
            <td class="${typeClass}">${typeText}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
            <td><button onclick="editItem(${index})">Edit</button></td>
        `;
        itemList.appendChild(tr);
    });
}

function insertNumber() {
    const inputField = document.getElementById('numInput');
    const val = inputField.value.trim();
    const parsedVal = Number(val);

    if (val === '' || isNaN(parsedVal) || parsedVal <= 0) {
        alert('Please input a positive number');
        return;
    }

    numbers.push(parsedVal);
    inputField.value = '';
    renderList();
}

function clearEntry() {
    document.getElementById('numInput').value = '';
}

function removeItem(index) {
    numbers.splice(index, 1);
    renderList();
}

function editItem(index) {
    const newNum = prompt('Enter new number:');
    if (newNum !== null) {
        const parsedVal = Number(newNum.trim());
        if (newNum.trim() !== '' && !isNaN(parsedVal) && parsedVal > 0) {
            numbers[index] = parsedVal;
            renderList();
        } else {
            alert('Please input a positive number');
        }
    }
}

function clearItems() {
    numbers = [];
    document.getElementById('results').innerHTML = '';
    document.getElementById('sortSelect').value = '';
    renderList();
}

function getTotal() {
    if (numbers.length === 0) return;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    updateResultField('TOTAL', sum);
}

function getHighestLowest() {
    if (numbers.length === 0) return;
    const highest = Math.max(...numbers);
    const lowest = Math.min(...numbers);
    
    updateResultField('HIGHEST', highest);
    updateResultField('LOWEST', lowest);
}

function updateResultField(label, value) {
    const resultsDiv = document.getElementById('results');

    let existingField = document.getElementById(`res-${label}`);

    if (!existingField) {
        existingField = document.createElement('div');
        existingField.id = `res-${label}`;
        resultsDiv.appendChild(existingField);
    }

    existingField.innerHTML = `${label} <u>${value}</u>`;
}

function sortItems(order) {
    if (order === 'asc') {
        numbers.sort((a, b) => a - b);
    } else if (order === 'desc') {
        numbers.sort((a, b) => b - a);
    }
    renderList();
}