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
});

// إضافة وإزالة البنود ديناميكياً
document.getElementById('add-income-item').addEventListener('click', function() {
    const table = document.getElementById('income-statement').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    const itemNameCell = newRow.insertCell(0);
    const input2024Cell = newRow.insertCell(1);
    const input2025Cell = newRow.insertCell(2);
    const actionsCell = newRow.insertCell(3);
    
    const itemNameInput = document.createElement('input');
    itemNameInput.type = 'text';
    itemNameInput.placeholder = 'اسم البند';
    itemNameInput.className = 'item-name';
    itemNameCell.appendChild(itemNameInput);
    
    const input2024 = document.createElement('input');
    input2024.type = 'number';
    input2024.placeholder = '0';
    input2024.className = 'income-input';
    input2024.setAttribute('data-year', '2024');
    input2024.setAttribute('data-item', 'custom');
    input2024Cell.appendChild(input2024);
    
    const input2025 = document.createElement('input');
    input2025.type = 'number';
    input2025.placeholder = '0';
    input2025.className = 'income-input';
    input2025.setAttribute('data-year', '2025');
    input2025.setAttribute('data-item', 'custom');
    input2025Cell.appendChild(input2025);
    
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'btn btn-danger btn-small remove-row';
    removeButton.textContent = 'حذف';
    removeButton.addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex - 1);
    });
    actionsCell.appendChild(removeButton);
});

document.getElementById('add-balance-item').addEventListener('click', function() {
    const table = document.getElementById('balance-sheet').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    const itemNameCell = newRow.insertCell(0);
    const input2024Cell = newRow.insertCell(1);
    const input2025Cell = newRow.insertCell(2);
    const actionsCell = newRow.insertCell(3);
    
    const itemNameInput = document.createElement('input');
    itemNameInput.type = 'text';
    itemNameInput.placeholder = 'اسم البند';
    itemNameInput.className = 'item-name';
    itemNameCell.appendChild(itemNameInput);
    
    const input2024 = document.createElement('input');
    input2024.type = 'number';
    input2024.placeholder = '0';
    input2024.className = 'balance-input';
    input2024.setAttribute('data-year', '2024');
    input2024.setAttribute('data-item', 'custom');
    input2024Cell.appendChild(input2024);
    
    const input2025 = document.createElement('input');
    input2025.type = 'number';
    input2025.placeholder = '0';
    input2025.className = 'balance-input';
    input2025.setAttribute('data-year', '2025');
    input2025.setAttribute('data-item', 'custom');
    input2025Cell.appendChild(input2025);
    
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'btn btn-danger btn-small remove-row';
    removeButton.textContent = 'حذف';
    removeButton.addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex - 1);
    });
    actionsCell.appendChild(removeButton);
});

// إضافة حدث لحذف الصفوف
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('remove-row')) {
        const row = e.target.closest('tr');
        row.parentNode.removeChild(row);
    }
});

// معالجة نموذج التحليل
document.getElementById('financial-data-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // جمع البيانات من النموذج
    const companyName = document.getElementById('company-name').value;
    
    // جمع بيانات قائمة الدخل
    const incomeData = {
        '2024': {},
        '2025': {}
    };
    
    document.querySelectorAll('.income-input').forEach(input => {
        const year = input.getAttribute('data-year');
        const item = input.getAttribute('data-item');
        const value = parseFloat(input.value) || 0;
        
        if (item === 'custom') {
            const itemName = input.closest('tr').querySelector('.item-name').value || 'بند مخصص';
            if (!incomeData[year].custom) incomeData[year].custom = {};
            incomeData[year].custom[itemName] = value;
        } else {
            incomeData[year][item] = value;
        }
    });
    
    // جمع بيانات الميزانية العمومية
    const balanceData = {
        '2024': {},
        '2025': {}
    };
    
    document.querySelectorAll('.balance-input').forEach(input => {
        const year = input.getAttribute('data-year');
        const item = input.getAttribute('data-item');
        const value = parseFloat(input.value) || 0;
        
        if (item === 'custom') {
            const itemName = input.closest('tr').querySelector('.item-name').value || 'بند مخصص';
            if (!balanceData[year].custom) balanceData[year].custom = {};
            balanceData[year].custom[itemName] = value;
        } else {
            balanceData[year][item] = value;
        }
    });
    
    // حساب النسب المالية
    const revenue2024 = incomeData['2024'].revenue || 0;
    const revenue2025 = incomeData['2025'].revenue || 0;
    
    const cogs2024 = incomeData['2024'].cogs || 0;
    const cogs2025 = incomeData['2025'].cogs || 0;
    
    const opex2024 = incomeData['2024'].opex || 0;
    const opex2025 = incomeData['2025'].opex || 0;
    
    const interest2024 = incomeData['2024'].interest || 0;
    const interest2025 = incomeData['2025'].interest || 0;
    
    const taxes2024 = incomeData['2024'].taxes || 0;
    const taxes2025 = incomeData['2025'].taxes || 0;
    
    // حساب قائمة الدخل
    const grossProfit2024 = revenue2024 - cogs2024;
    const grossProfit2025 = revenue2025 - cogs2025;
    
    const operatingProfit2024 = grossProfit2024 - opex2024;
    const operatingProfit2025 = grossProfit2025 - opex2025;
    
    const netProfit2024 = operatingProfit2024 - interest2024 - taxes2024;
    const netProfit2025 = operatingProfit2025 - interest2025 - taxes2025;
    
    // حساب النسب المالية للسنة الحالية (2025)
    const grossMargin2025 = revenue2025 > 0 ? (grossProfit2025 / revenue2025) * 100 : 0;
    const operatingMargin2025 = revenue2025 > 0 ? (operatingProfit2025 / revenue2025) * 100 : 0;
    const netMargin2025 = revenue2025 > 0 ? (netProfit2025 / revenue2025) * 100 : 0;
    
    // حساب النسب المالية للسنة السابقة (2024)
    const grossMargin2024 = revenue2024 > 0 ? (grossProfit2024 / revenue2024) * 100 : 0;
    const operatingMargin2024 = revenue2024 > 0 ? (operatingProfit2024 / revenue2024) * 100 : 0;
    const netMargin2024 = revenue2024 > 0 ? (netProfit2024 / revenue2024) * 100 : 0;
    
    // حساب نسب الميزانية العمومية
    const cash2024 = balanceData['2024'].cash || 0;
    const cash2025 = balanceData['2025'].cash || 0;
    
    const receivables2024 = balanceData['2024'].receivables || 0;
    const receivables2025 = balanceData['2025'].receivables || 0;
    
    const inventory2024 = balanceData['2024'].inventory || 0;
    const inventory2025 = balanceData['2025'].inventory || 0;
    
    const fixedAssets2024 = balanceData['2024']['fixed-assets'] || 0;
    const fixedAssets2025 = balanceData['2025']['fixed-assets'] || 0;
    
    const shortDebt2024 = balanceData['2024']['short-debt'] || 0;
    const shortDebt2025 = balanceData['2025']['short-debt'] || 0;
    
    const longDebt2024 = balanceData['2024']['long-debt'] || 0;
    const longDebt2025 = balanceData['2025']['long-debt'] || 0;
    
    const equity2024 = balanceData['2024'].equity || 0;
    const equity2025 = balanceData['2025'].equity || 0;
    
    // حساب الأصول والخصوم
    const currentAssets2024 = cash2024 + receivables2024 + inventory2024;
    const currentAssets2025 = cash2025 + receivables2025 + inventory2025;
    
    const totalAssets2024 = currentAssets2024 + fixedAssets2024;
    const totalAssets2025 = currentAssets2025 + fixedAssets2025;
    
    const totalLiabilities2024 = shortDebt2024 + longDebt2024;
    const totalLiabilities2025 = shortDebt2025 + longDebt2025;
    
    // حساب النسب المالية
    const currentRatio2024 = shortDebt2024 > 0 ? currentAssets2024 / shortDebt2024 : 0;
    const currentRatio2025 = shortDebt2025 > 0 ? currentAssets2025 / shortDebt2025 : 0;
    
    const debtToEquity2024 = equity2024 > 0 ? totalLiabilities2024 / equity2024 : 0;
    const debtToEquity2025 = equity2025 > 0 ? totalLiabilities2025 / equity2025 : 0;
    
    const returnOnEquity2024 = equity2024 > 0 ? (netProfit2024 / equity2024) * 100 : 0;
    const returnOnEquity2025 = equity2025 > 0 ? (netProfit2025 / equity2025) * 100 : 0;
    
    // حساب معدلات النمو
    const revenueGrowth = revenue2024 > 0 ? ((revenue2025 - revenue2024) / revenue2024) * 100 : 0;
    const netProfitGrowth = netProfit2024 !== 0 ? ((netProfit2025 - netProfit2024) / Math.abs(netProfit2024)) * 100 : 0;
    const equityGrowth = equity2024 > 0 ? ((equity2025 - equity2024) / equity2024) * 100 : 0;
    
    // حساب التدفق النقدي الحر للمستثمرين
    const operatingCashFlow2025 = netProfit2025 + (opex2025 * 0.3); // تقدير مبسط
