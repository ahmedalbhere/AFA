// تفعيل القائمة المتنقلة
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }
    });
    
    // تحديث الحسابات تلقائياً عند تغيير القيم
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', updateCalculations);
    });
    
    // تحديث الحسابات الأولي
    updateCalculations();
});

// إضافة بنود الأصول
document.getElementById('add-asset-item').addEventListener('click', function() {
    const category = prompt('اختر نوع الأصل:\n1- الأصول المتداولة\n2- الأصول الثابتة', '1');
    let categoryName, categoryData;
    
    if (category === '1') {
        categoryName = 'الأصول المتداولة';
        categoryData = 'current-assets';
    } else if (category === '2') {
        categoryName = 'الأصول الثابتة';
        categoryData = 'fixed-assets';
    } else {
        return;
    }
    
    const itemName = prompt('أدخل اسم البند:');
    if (!itemName) return;
    
    addBalanceItem(categoryName, categoryData, itemName);
});

// إضافة بنود الخصوم وحقوق الملكية
document.getElementById('add-liability-item').addEventListener('click', function() {
    const category = prompt('اختر النوع:\n1- الخصوم المتداولة\n2- الخصوم طويلة الأجل\n3- حقوق الملكية', '1');
    let categoryName, categoryData;
    
    if (category === '1') {
        categoryName = 'الخصوم المتداولة';
        categoryData = 'current-liabilities';
    } else if (category === '2') {
        categoryName = 'الخصوم طويلة الأجل';
        categoryData = 'long-liabilities';
    } else if (category === '3') {
        categoryName = 'حقوق الملكية';
        categoryData = 'equity';
    } else {
        return;
    }
    
    const itemName = prompt('أدخل اسم البند:');
    if (!itemName) return;
    
    addBalanceItem(categoryName, categoryData, itemName);
});

// إضافة بنود قائمة الدخل
document.getElementById('add-income-item').addEventListener('click', function() {
    const itemName = prompt('أدخل اسم البند:');
    if (!itemName) return;
    
    const table = document.getElementById('income-statement').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length - 4); // إدراج قبل الصفوف المحسوبة
    
    const itemNameCell = newRow.insertCell(0);
    const input2024Cell = newRow.insertCell(1);
    const input2025Cell = newRow.insertCell(2);
    const actionsCell = newRow.insertCell(3);
    
    itemNameCell.textContent = itemName;
    
    const input2024 = document.createElement('input');
    input2024.type = 'number';
    input2024.placeholder = '0';
    input2024.className = 'income-input';
    input2024.setAttribute('data-year', '2024');
    input2024.setAttribute('data-item', 'custom');
    input2024.addEventListener('input', updateCalculations);
    input2024Cell.appendChild(input2024);
    
    const input2025 = document.createElement('input');
    input2025.type = 'number';
    input2025.placeholder = '0';
    input2025.className = 'income-input';
    input2025.setAttribute('data-year', '2025');
    input2025.setAttribute('data-item', 'custom');
    input2025.addEventListener('input', updateCalculations);
    input2025Cell.appendChild(input2025);
    
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'btn btn-danger btn-small remove-row';
    removeButton.textContent = 'حذف';
    removeButton.addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex - 1);
        updateCalculations();
    });
    actionsCell.appendChild(removeButton);
    
    updateCalculations();
});

// دالة مساعدة لإضافة بنود الميزانية
function addBalanceItem(categoryName, categoryData, itemName) {
    const table = document.getElementById('balance-sheet').getElementsByTagName('tbody')[0];
    let insertIndex = -1;
    
    // البحث عن مكان الإدراج بناءً على القسم
    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].classList.contains('section-header') && 
            table.rows[i].cells[0].textContent === categoryName) {
            insertIndex = i + 1;
            break;
        }
    }
    
    if (insertIndex === -1) return;
    
    const newRow = table.insertRow(insertIndex);
    
    const itemNameCell = newRow.insertCell(0);
    const input2024Cell = newRow.insertCell(1);
    const input2025Cell = newRow.insertCell(2);
    const actionsCell = newRow.insertCell(3);
    
    itemNameCell.textContent = itemName;
    
    const input2024 = document.createElement('input');
    input2024.type = 'number';
    input2024.placeholder = '0';
    input2024.className = 'balance-input';
    input2024.setAttribute('data-category', categoryData);
    input2024.setAttribute('data-year', '2024');
    input2024.setAttribute('data-item', 'custom');
    input2024.addEventListener('input', updateCalculations);
    input2024Cell.appendChild(input2024);
    
    const input2025 = document.createElement('input');
    input2025.type = 'number';
    input2025.placeholder = '0';
    input2025.className = 'balance-input';
    input2025.setAttribute('data-category', categoryData);
    input2025.setAttribute('data-year', '2025');
    input2025.setAttribute('data-item', 'custom');
    input2025.addEventListener('input', updateCalculations);
    input2025Cell.appendChild(input2025);
    
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'btn btn-danger btn-small remove-row';
    removeButton.textContent = 'حذف';
    removeButton.addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex - 1);
        updateCalculations();
    });
    actionsCell.appendChild(removeButton);
    
    updateCalculations();
}

// إضافة حدث لحذف الصفوف
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('remove-row')) {
        const row = e.target.closest('tr');
        row.parentNode.removeChild(row);
        updateCalculations();
    }
});

// تحديث الحسابات التلقائية
function updateCalculations() {
    // تحديث قائمة الدخل
    const revenue2024 = parseFloat(document.querySelector('.income-input[data-year="2024"][data-item="revenue"]').value) || 0;
    const revenue2025 = parseFloat(document.querySelector('.income-input[data-year="2025"][data-item="revenue"]').value) || 0;
    
    const cogs2024 = parseFloat(document.querySelector('.income-input[data-year="2024"][data-item="cogs"]').value) || 0;
    const cogs2025 = parseFloat(document.querySelector('.income-input[data-year="2025"][data-item="cogs"]').value) || 0;
    
    const opex2024 = parseFloat(document.querySelector('.income-input[data-year="2024"][data-item="opex"]').value) || 0;
    const opex2025 = parseFloat(document.querySelector('.income-input[data-year="2025"][data-item="opex"]').value) || 0;
    
    const interest2024 = parseFloat(document.querySelector('.income-input[data-year="2024"][data-item="interest"]').value) || 0;
    const interest2025 = parseFloat(document.querySelector('.income-input[data-year="2025"][data-item="interest"]').value) ||
