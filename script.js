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
    
    // تحديث السنوات في الجداول
    document.getElementById('year1').addEventListener('input', updateYearHeaders);
    document.getElementById('year2').addEventListener('input', updateYearHeaders);
    
    // تحديث الحسابات تلقائياً عند تغيير القيم
    document.addEventListener('input', updateCalculations);
    
    // إضافة أحداث لأزرار الإضافة
    setupAddButtons();
    
    // تحديث الحسابات الأولي
    updateYearHeaders();
    updateCalculations();
});

// إعداد أزرار الإضافة
function setupAddButtons() {
    // إضافة أصول متداولة
    document.getElementById('add-current-asset').addEventListener('click', function() {
        addBalanceItem('current-assets', 'الأصول المتداولة');
    });

    // إضافة أصول ثابتة
    document.getElementById('add-fixed-asset').addEventListener('click', function() {
        addBalanceItem('fixed-assets', 'الأصول الثابتة');
    });

    // إضافة خصوم أو حقوق ملكية
    document.getElementById('add-liability').addEventListener('click', function() {
        const type = prompt('اختر نوع الإضافة:\n1- الخصوم المتداولة\n2- الخصوم طويلة الأجل\n3- حقوق الملكية', '1');
        
        let category, section;
        if (type === '1') {
            category = 'current-liabilities';
            section = 'الخصوم المتداولة';
        } else if (type === '2') {
            category = 'long-liabilities';
            section = 'الخصوم طويلة الأجل';
        } else if (type === '3') {
            category = 'equity';
            section = 'حقوق الملكية';
        } else {
            return;
        }
        
        addBalanceItem(category, section);
    });

    // إضافة إيرادات
    document.getElementById('add-income-item').addEventListener('click', function() {
        addIncomeItem('revenue', 'الإيرادات');
    });

    // إضافة مصروفات
    document.getElementById('add-expense-item').addEventListener('click', function() {
        const type = prompt('اختر نوع المصروفات:\n1- تكلفة الإيرادات\n2- المصروفات التشغيلية\n3- إيرادات/مصروفات أخرى', '2');
        
        let category, section;
        if (type === '1') {
            category = 'cogs';
            section = 'تكلفة الإيرادات';
        } else if (type === '2') {
            category = 'expenses';
            section = 'المصروفات التشغيلية';
        } else if (type === '3') {
            category = 'other';
            section = 'الإيرادات والمصروفات الأخرى';
        } else {
            return;
        }
        
        addIncomeItem(category, section);
    });
}

// تحديث عناوين السنوات في الجداول
function updateYearHeaders() {
    const year1 = document.getElementById('year1').value;
    const year2 = document.getElementById('year2').value;
    
    document.getElementById('balance-year1').textContent = `${year1} (ج.م)`;
    document.getElementById('balance-year2').textContent = `${year2} (ج.م)`;
    document.getElementById('income-year1').textContent = `${year1} (ج.م)`;
    document.getElementById('income-year2').textContent = `${year2} (ج.م)`;
}

// دالة مساعدة لإضافة بنود الميزانية
function addBalanceItem(category, sectionName) {
    const table = document.getElementById('balance-body');
    let insertIndex = -1;
    
    // البحث عن مكان الإدراج بناءً على القسم
    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].classList.contains('section-header') && 
            table.rows[i].cells[0].textContent === sectionName) {
            // البحث عن آخر صف في هذا القسم
            for (let j = i + 1; j < table.rows.length; j++) {
                if (table.rows[j].classList.contains('section-header') || 
                    table.rows[j].classList.contains('total-row')) {
                    insertIndex = j;
                    break;
                }
            }
            if (insertIndex === -1) insertIndex = table.rows.length - 2; // قبل المجاميع
            break;
        }
    }
    
    if (insertIndex === -1) return;
    
    const newRow = table.insertRow(insertIndex);
    newRow.setAttribute('data-category', category);
    
    const itemNameCell = newRow.insertCell(0);
    const inputYear1Cell = newRow.insertCell(1);
    const inputYear2Cell = newRow.insertCell(2);
    const actionsCell = newRow.insertCell(3);
    
    const itemNameInput = document.createElement('input');
    itemNameInput.type = 'text';
    itemNameInput.className = 'item-name';
    itemNameInput.placeholder = 'اسم البند';
    itemNameInput.value = 'بند جديد';
    itemNameInput.addEventListener('input', updateCalculations);
    itemNameCell.appendChild(itemNameInput);
    
    const inputYear1 = document.createElement('input');
    inputYear1.type = 'number';
    inputYear1.placeholder = '0';
    inputYear1.className = 'balance-input';
    inputYear1.setAttribute('data-year', 'year1');
    inputYear1.addEventListener('input', updateCalculations);
    inputYear1Cell.appendChild(inputYear1);
    
    const inputYear2 = document.createElement('input');
    inputYear2.type = 'number';
    inputYear2.placeholder = '0';
    inputYear2.className = 'balance-input';
    inputYear2.setAttribute('data-year', 'year2');
    inputYear2.addEventListener('input', updateCalculations);
    inputYear2Cell.appendChild(inputYear2);
    
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'btn btn-danger btn-small remove-row';
    removeButton.textContent = 'حذف';
    removeButton.addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex);
        updateCalculations();
    });
    actionsCell.appendChild(removeButton);
    
    updateCalculations();
}

// دالة مساعدة لإضافة بنود قائمة الدخل
function addIncomeItem(category, sectionName) {
    const table = document.getElementById('income-body');
    let insertIndex = -1;
    
    // البحث عن مكان الإدراج بناءً على القسم
    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].classList.contains('section-header') && 
            table.rows[i].cells[0].textContent === sectionName) {
            // البحث عن آخر صف في هذا القسم
            for (let j = i + 1; j < table.rows.length; j++) {
                if (table.rows[j].classList.contains('section-header') || 
                    table.rows[j].classList.contains('calculated-row')) {
                    insertIndex = j;
                    break;
                }
            }
            if (insertIndex === -1) insertIndex = table.rows.length - 1; // قبل الصف الأخير
            break;
        }
    }
    
    if (insertIndex === -1) return;
    
    const newRow = table.insertRow(insertIndex);
    newRow.setAttribute('data-category', category);
    
    const itemNameCell = newRow.insertCell(0);
    const inputYear1Cell = newRow.insertCell(1);
    const inputYear2Cell = newRow.insertCell(2);
    const actionsCell = newRow.insertCell(3);
    
    const itemNameInput = document.createElement('input');
    itemNameInput.type = 'text';
    itemNameInput.className = 'item-name';
    itemNameInput.placeholder = 'اسم البند';
    itemNameInput.value = 'بند جديد';
    itemNameInput.addEventListener('input', updateCalculations);
    itemNameCell.appendChild(itemNameInput);
    
    const inputYear1 = document.createElement('input');
    inputYear1.type = 'number';
    inputYear1.placeholder = '0';
    inputYear1.className = 'income-input';
    inputYear1.setAttribute('data-year', 'year1');
    inputYear1.addEventListener('input', updateCalculations);
    inputYear1Cell.appendChild(inputYear1);
    
    const inputYear2 = document.createElement('input');
    inputYear2.type = 'number';
    inputYear2.placeholder = '0';
    inputYear2.className = 'income-input';
    inputYear2.setAttribute('data-year', 'year2');
    inputYear2.addEventListener('input', updateCalculations);
    inputYear2Cell.appendChild(inputYear2);
    
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'btn btn-danger btn-small remove-row';
    removeButton.textContent = 'حذف';
    removeButton.addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex);
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
    calculateBalanceSheet();
    calculateIncomeStatement();
    validateBalanceSheet();
}

// حساب الميزانية العمومية
function calculateBalanceSheet() {
    const categories = {
        'current-assets': { year1: 0, year2: 0 },
        'fixed-assets': { year1: 0, year2: 0 },
        'current-liabilities': { year1: 0, year2: 0 },
        'long-liabilities': { year1: 0, year2: 0 },
        'equity': { year1: 0, year2: 0 }
    };
    
    // جمع قيم كل فئة
    document.querySelectorAll('#balance-body tr[data-category]').forEach(row => {
        const category = row.getAttribute('data-category');
        const year1Input = row.querySelector('input[data-year="year1"]');
        const year2Input = row.querySelector('input[data-year="year2"]');
        
        if (year1Input) {
            categories[category].year1 += parseFloat(year1Input.value) || 0;
        }
        if (year2Input) {
            categories[category].year2 += parseFloat(year2Input.value) || 0;
        }
    });
    
    // حساب الإجماليات
    const totalAssetsYear1 = categories['current-assets'].year1 + categories['fixed-assets'].year1;
    const totalAssetsYear2 = categories['current-assets'].year2 + categories['fixed-assets'].year2;
    
    const totalLiabilitiesEquityYear1 = categories['current-liabilities'].year1 + 
                                      categories['long-liabilities'].year1 + 
                                      categories['equity'].year1;
    
    const totalLiabilitiesEquityYear2 = categories['current-liabilities'].year2 + 
                                      categories['long-liabilities'].year2 + 
                                      categories['equity'].year2;
    
    // تحديث القيم في الجدول
    document.getElementById('total-assets-year1').textContent = formatNumber(totalAssetsYear1);
    document.getElementById('total-assets-year2').textContent = formatNumber(totalAssetsYear2);
    document.getElementById('total-liabilities-equity-year1').textContent = formatNumber(totalLiabilitiesEquityYear1);
    document.getElementById('total-liabilities-equity-year2').textContent = formatNumber(totalLiabilitiesEquityYear2);
}

// حساب قائمة الدخل
function calculateIncomeStatement() {
    const categories = {
        'revenue': { year1: 0, year2: 0 },
        'cogs': { year1: 0, year2: 0 },
        'expenses': { year1: 0, year2: 0 },
        'other': { year1: 0, year2: 0 }
    };
    
    // جمع قيم كل فئة
    document.querySelectorAll('#income-body tr[data-category]').forEach(row => {
        const category = row.getAttribute('data-category');
        const year1Input = row.querySelector('input[data-year="year1"]');
        const year2Input = row.querySelector('input[data-year="year2"]');
        
        if (year1Input) {
            categories[category].year1 += parseFloat(year1Input.value) || 0;
        }
        if (year2Input) {
            categories[category].year2 += parseFloat(year2Input.value) || 0;
        }
    });
    
    // حساب النتائج
    const grossProfitYear1 = categories['revenue'].year1 - categories['cogs'].year1;
    const grossProfitYear2 = categories['revenue'].year2 - categories['cogs'].year2;
    
    const operatingProfitYear1 = grossProfitYear1 - categories['expenses'].year1;
    const operatingProfitYear2 = grossProfitYear2 - categories['expenses'].year2;
    
    const netProfitYear1 = operatingProfitYear1 - categories['other'].year1;
    const netProfitYear2 = operatingProfitYear2 - categories['other'].year2;
    
    // تحديث القيم في الجدول
    document.getElementById('gross-profit-year1').textContent = formatNumber(grossProfitYear1);
    document.getElementById('gross-profit-year2').textContent = formatNumber(grossProfitYear2);
    document.getElementById('operating-profit-year1').textContent = formatNumber(operatingProfitYear1);
    document.getElementById('operating-profit-year2').textContent = formatNumber(operatingProfitYear2);
    document.getElementById('net-profit-year1').textContent = formatNumber(netProfitYear1);
    document.getElementById('net-profit-year2').textContent = formatNumber(netProfitYear2);
}

// التحقق من توازن الميزانية
function validateBalanceSheet() {
    const totalAssetsYear1 = parseFloat(document.getElementById('total-assets-year1').textContent.replace(/,/g, '')) || 0;
    const totalAssetsYear2 = parseFloat(document.getElementById('total-assets-year2').textContent.replace(/,/g, '')) || 0;
    
    const totalLiabilitiesEquityYear1 = parseFloat(document.getElementById('total-liabilities-equity-year1').textContent.replace(/,/g, '')) || 0;
    const totalLiabilitiesEquityYear2 = parseFloat(document.getElementById('total-liabilities-equity-year2').textContent.replace(/,/g, '')) || 0;
    
    const validationElement = document.querySelector('#balance-validation .validation-message');
    
    const diffYear1 = Math.abs(totalAssetsYear1 - totalLiabilitiesEquityYear1);
    const diffYear2 = Math.abs(totalAssetsYear2 - totalLiabilitiesEquityYear2);
    
    if (diffYear1 <= 1 && diffYear2 <= 1) {
        validationElement.textContent = '✓ الميزانية متوازنة';
        validationElement.className = 'validation-message validation-success';
    } else {
        validationElement.textContent = `! الميزانية غير متوازنة - الفرق: ${formatNumber(diffYear1)} (السنة الأولى) - ${formatNumber(diffYear2)} (السنة الثانية)`;
        validationElement.className = 'validation-message validation-error';
    }
}

// تنسيق الأرقام
function formatNumber(num) {
    return new Intl.NumberFormat('ar-EG').format(Math.round(num * 100) / 100);
}

// معالجة نموذج التحليل
document.getElementById('financial-data-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // جمع البيانات
    const financialData = collectFinancialData();
    
    // عرض عناصر التحكم
    document.getElementById('analysis-controls').style.display = 'block';
    document.getElementById('results').style.display = 'block';
    document.getElementById('additional-analysis').style.display = 'block';
    document.getElementById('additional-results').style.display = 'block';
    
    // إعداد أحداث أزرار التحليل
    setupAnalysisButtons(financialData);
    setupAdditionalAnalysisButtons(financialData);
    
    // عرض التحليل الافتراضي (الرأسي)
    showVerticalAnalysis(financialData);
    
    // التمرير إلى قسم النتائج
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});

// جمع البيانات المالية
function collectFinancialData() {
    const data = {
        companyName: document.getElementById('company-name').value,
        year1: document.getElementById('year1').value,
        year2: document.getElementById('year2').value,
        balanceSheet: {},
        incomeStatement: {},
        inventory: { year1: 0, year2: 0 },
        cash: { year1: 0, year2: 0 }
    };
    
    // جمع بيانات الميزانية العمومية
    document.querySelectorAll('#balance-body tr[data-category]').forEach(row => {
        const category = row.getAttribute('data-category');
        const itemName = row.querySelector('.item-name').value || 'بند بدون اسم';
        const year1Value = parseFloat(row.querySelector('input[data-year="year1"]').value) || 0;
        const year2Value = parseFloat(row.querySelector('input[data-year="year2"]').value) || 0;
        
        if (!data.balanceSheet[category]) {
            data.balanceSheet[category] = {};
        }
        
        data.balanceSheet[category][itemName] = {
            year1: year1Value,
            year2: year2Value
        };
        
        // البحث عن المخزون والنقدية
        if (category === 'current-assets') {
            if (itemName.includes('مخزون') || itemName.includes('بضاعة') || itemName.includes('المخزون')) {
                data.inventory.year1 = year1Value;
                data.inventory.year2 = year2Value;
            }
            
            if (itemName.includes('نقدي') || itemName.includes('النقدية') || itemName.includes('الصندوق')) {
                data.cash.year1 = year1Value;
                data.cash.year2 = year2Value;
            }
        }
    });
    
    // جمع بيانات قائمة الدخل
    document.querySelectorAll('#income-body tr[data-category]').forEach(row => {
        const category = row.getAttribute('data-category');
        const itemName = row.querySelector('.item-name').value || 'بند بدون اسم';
        const year1Value = parseFloat(row.querySelector('input[data-year="year1"]').value) || 0;
        const year2Value = parseFloat(row.querySelector('input[data-year="year2"]').value) || 0;
        
        if (!data.incomeStatement[category]) {
            data.incomeStatement[category] = {};
        }
        
        data.incomeStatement[category][itemName] = {
            year1: year1Value,
            year2: year2Value
        };
    });
    
    // إضافة الحسابات
    data.incomeStatement.calculated = {
        'مجمل الربح': {
            year1: parseFloat(document.getElementById('gross-profit-year1').textContent.replace(/,/g, '')) || 0,
            year2: parseFloat(document.getElementById('gross-profit-year2').textContent.replace(/,/g, '')) || 0
        },
        'الربح التشغيلي': {
            year1: parseFloat(document.getElementById('operating-profit-year1').textContent.replace(/,/g, '')) || 0,
            year2: parseFloat(document.getElementById('operating-profit-year2').textContent.replace(/,/g, '')) || 0
        },
        'صافي الربح': {
            year1: parseFloat(document.getElementById('net-profit-year1').textContent.replace(/,/g, '')) || 0,
            year2: parseFloat(document.getElementById('net-profit-year2').textContent.replace(/,/g, '')) || 0
        }
    };
    
    return data;
}

// إعداد أزرار التحليل
function setupAnalysisButtons(financialData) {
    document.querySelectorAll('.analysis-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            document.querySelectorAll('.analysis-btn').forEach(b => b.classList.remove('active'));
            // إضافة النشاط للزر المحدد
            this.classList.add('active');
            
            const analysisType = this.getAttribute('data-analysis');
            
            switch(analysisType) {
                case 'vertical':
                    showVerticalAnalysis(financialData);
                    break;
                case 'horizontal':
                    showHorizontalAnalysis(financialData);
                    break;
                case 'ratios':
                    showRatiosAnalysis(financialData);
                    break;
            }
        });
    });
}

// عرض التحليل الرأسي
function showVerticalAnalysis(financialData) {
    const resultsContainer = document.getElementById('results-container');
    let html = `
        <h3>التحليل الرأسي - ${financialData.companyName}</h3>
        <div class="analysis-tables">
    `;
    
    // تحليل الميزانية العمومية
    html += '<h4>التحليل الرأسي للميزانية العمومية (%)</h4>';
    html += '<div class="table-scroll"><table class="analysis-table">';
    html += `<thead><tr><th>البند</th><th>${financialData.year1}</th><th>${financialData.year2}</th></tr></thead><tbody>`;
    
    const totalAssetsYear1 = Object.values(financialData.balanceSheet).flatMap(cat => 
        Object.values(cat).map(item => item.year1)
    ).reduce((sum, val) => sum + val, 0);
    
    const totalAssetsYear2 = Object.values(financialData.balanceSheet).flatMap(cat => 
        Object.values(cat).map(item => item.year2)
    ).reduce((sum, val) => sum + val, 0);
    
    for (const [category, items] of Object.entries(financialData.balanceSheet)) {
        html += `<tr class="section-header"><td colspan="3">${getCategoryName(category)}</td></tr>`;
        
        for (const [itemName, values] of Object.entries(items)) {
            const percentYear1 = totalAssetsYear1 > 0 ? (values.year1 / totalAssetsYear1 * 100) : 0;
            const percentYear2 = totalAssetsYear2 > 0 ? (values.year2 / totalAssetsYear2 * 100) : 0;
            
            html += `<tr>
                <td>${itemName}</td>
                <td>${percentYear1.toFixed(2)}%</td>
                <td>${percentYear2.toFixed(2)}%</td>
            </tr>`;
        }
    }
    html += '</tbody></table></div>';
    
    // تحليل قائمة الدخل
    const totalRevenueYear1 = Object.values(financialData.incomeStatement.revenue || {}).reduce((sum, item) => sum + item.year1, 0);
    const totalRevenueYear2 = Object.values(financialData.incomeStatement.revenue || {}).reduce((sum, item) => sum + item.year2, 0);
    
    html += '<h4>التحليل الرأسي لقائمة الدخل (%)</h4>';
    html += '<div class="table-scroll"><table class="analysis-table">';
    html += `<thead><tr><th>البند</th><th>${financialData.year1}</th><th>${financialData.year2}</th></tr></thead><tbody>`;
    
    for (const [category, items] of Object.entries(financialData.incomeStatement)) {
        if (category === 'calculated') continue;
        
        html += `<tr class="section-header"><td colspan="3">${getCategoryName(category)}</td></tr>`;
        
        for (const [itemName, values] of Object.entries(items)) {
            const percentYear1 = totalRevenueYear1 > 0 ? (values.year1 / totalRevenueYear1 * 100) : 0;
            const percentYear2 = totalRevenueYear2 > 0 ? (values.year2 / totalRevenueYear2 * 100) : 0;
            
            html += `<tr>
                <td>${itemName}</td>
                <td>${percentYear1.toFixed(2)}%</td>
                <td>${percentYear2.toFixed(2)}%</td>
            </tr>`;
        }
    }
    
    // إضافة الحسابات
    html += `<tr class="section-header"><td colspan="3">النتائج</td></tr>`;
    for (const [itemName, values] of Object.entries(financialData.incomeStatement.calculated || {})) {
        const percentYear1 = totalRevenueYear1 > 0 ? (values.year1 / totalRevenueYear1 * 100) : 0;
        const percentYear2 = totalRevenueYear2 > 0 ? (values.year2 / totalRevenueYear2 * 100) : 0;
        
        html += `<tr>
            <td><strong>${itemName}</strong></td>
            <td><strong>${percentYear1.toFixed(2)}%</strong></td>
            <td><strong>${percentYear2.toFixed(2)}%</strong></td>
        </tr>`;
    }
    
    html += '</tbody></table></div></div>';
    resultsContainer.innerHTML = html;
}

// عرض التحليل الأفقي
function showHorizontalAnalysis(financialData) {
    const resultsContainer = document.getElementById('results-container');
    let html = `
        <h3>التحليل الأفقي - ${financialData.companyName}</h3>
        <div class="analysis-tables">
    `;
    
    html += '<h4>نمو الإيرادات والمصروفات (%)</h4>';
    html += '<div class="table-scroll"><table class="analysis-table">';
    html += `<thead><tr><th>البند</th><th>نمو ${financialData.year1} إلى ${financialData.year2}</th></tr></thead><tbody>`;
    
    for (const [category, items] of Object.entries(financialData.incomeStatement)) {
        if (category === 'calculated') continue;
        
        html += `<tr class="section-header"><td colspan="2">${getCategoryName(category)}</td></tr>`;
        
        for (const [itemName, values] of Object.entries(items)) {
            const growth = values.year1 !== 0 ? ((values.year2 - values.year1) / Math.abs(values.year1) * 100) : 0;
            const growthClass = growth >= 0 ? 'positive' : 'negative';
            const growthSymbol = growth >= 0 ? '▲' : '▼';
            
            html += `<tr>
                <td>${itemName}</td>
                <td class="${growthClass}">${growthSymbol} ${Math.abs(growth).toFixed(2)}%</td>
            </tr>`;
        }
    }
    
    html += '</tbody></table></div></div>';
    resultsContainer.innerHTML = html;
}

// عرض تحليل النسب المالية
function showRatiosAnalysis(financialData) {
    const resultsContainer = document.getElementById('results-container');
    
    // حساب النسب
    const ratios = calculateFinancialRatios(financialData);
    
    let html = `
        <h3>النسب المالية - ${financialData.companyName}</h3>
        <div class="results-grid">
    `;
    
    for (const [ratioName, values] of Object.entries(ratios)) {
        const year1Value = values.year1 !== null ? values.year1.toFixed(2) : 'N/A';
        const year2Value = values.year2 !== null ? values.year2.toFixed(2) : 'N/A';
        
        html += `
            <div class="result-card">
                <h3>${ratioName}</h3>
                <div class="result-value">${year2Value}</div>
                <p>${financialData.year1}: ${year1Value}</p>
            </div>
        `;
    }
    
    html += '</div>';
    resultsContainer.innerHTML = html;
}

// حساب النسب المالية
function calculateFinancialRatios(data) {
    const ratios = {};
    
    // جمع البيانات الأساسية
    const currentAssetsYear1 = Object.values(data.balanceSheet['current-assets'] || {}).reduce((sum, item) => sum + item.year1, 0);
    const currentAssetsYear2 = Object.values(data.balanceSheet['current-assets'] || {}).reduce((sum, item) => sum + item.year2, 0);
    
    const currentLiabilitiesYear1 = Object.values(data.balanceSheet['current-liabilities'] || {}).reduce((sum, item) => sum + item.year1, 0);
    const currentLiabilitiesYear2 = Object.values(data.balanceSheet['current-liabilities'] || {}).reduce((sum, item) => sum + item.year2, 0);
    
    const totalAssetsYear1 = Object.values(data.balanceSheet).flatMap(cat => 
        Object.values(cat).map(item => item.year1)
    ).reduce((sum, val) => sum + val, 0);
    
    const totalAssetsYear2 = Object.values(data.balanceSheet).flatMap(cat => 
        Object.values(cat).map(item => item.year2)
    ).reduce((sum, val) => sum + val, 0);
    
    const totalLiabilitiesYear1 = (Object.values(data.balanceSheet['current-liabilities'] || {}).reduce((sum, item) => sum + item.year1, 0) +
                                 Object.values(data.balanceSheet['long-liabilities'] || {}).reduce((sum, item) => sum + item.year1, 0));
    
    const totalLiabilitiesYear2 = (Object.values(data.balanceSheet['current-liabilities'] || {}).reduce((sum, item) => sum + item.year2, 0) +
                                 Object.values(data.balanceSheet['long-liabilities'] || {}).reduce((sum, item) => sum + item.year2, 0));
    
    const equityYear1 = Object.values(data.balanceSheet['equity'] || {}).reduce((sum, item) => sum + item.year1, 0);
    const equityYear2 = Object.values(data.balanceSheet['equity'] || {}).reduce((sum, item) => sum + item.year2, 0);
    
    const netProfitYear1 = data.incomeStatement.calculated?.['صافي الربح']?.year1 || 0;
    const netProfitYear2 = data.incomeStatement.calculated?.['صافي الربح']?.year2 || 0;
    
    const revenueYear1 = Object.values(data.incomeStatement.revenue || {}).reduce((sum, item) => sum + item.year1, 0);
    const revenueYear2 = Object.values(data.incomeStatement.revenue || {}).reduce((sum, item) => sum + item.year2, 0);
    
    // حساب النسب
    ratios['النسبة الحالية'] = {
        year1: currentLiabilitiesYear1 > 0 ? currentAssetsYear1 / currentLiabilitiesYear1 : null,
        year2: currentLiabilitiesYear2 > 0 ? currentAssetsYear2 / currentLiabilitiesYear2 : null
    };
    
    ratios['نسبة الدين إلى حقوق الملكية'] = {
        year1: equityYear1 > 0 ? totalLiabilitiesYear1 / equityYear1 : null,
        year2: equityYear2 > 0 ? totalLiabilitiesYear2 / equityYear2 : null
    };
    
    ratios['العائد على الأصول'] = {
        year1: totalAssetsYear1 > 0 ? (netProfitYear1 / totalAssetsYear1) * 100 : null,
        year2: totalAssetsYear2 > 0 ? (netProfitYear2 / totalAssetsYear2) * 100 : null
    };
    
    ratios['العائد على حقوق الملكية'] = {
        year1: equityYear1 > 0 ? (netProfitYear1 / equityYear1) * 100 : null,
        year2: equityYear2 > 0 ? (netProfitYear2 / equityYear2) * 100 : null
    };
    
    ratios['هامش صافي الربح'] = {
        year1: revenueYear1 > 0 ? (netProfitYear1 / revenueYear1) * 100 : null,
        year2: revenueYear2 > 0 ? (netProfitYear2 / revenueYear2) * 100 : null
    };
    
    return ratios;
}

// إعداد أزرار التحليل الإضافي
function setupAdditionalAnalysisButtons(financialData) {
    document.querySelectorAll('#additional-analysis .analysis-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            document.querySelectorAll('#additional-analysis .analysis-btn').forEach(b => b.classList.remove('active'));
            // إضافة النشاط للزر المحدد
            this.classList.add('active');
            
            const analysisType = this.getAttribute('data-analysis');
            
            switch(analysisType) {
                case 'liquidity-ratios':
                    showLiquidityRatios(financialData);
                    break;
                case 'cash-flow':
                    showCashFlowStatement(financialData);
                    break;
            }
        });
    });
}

// عرض تحليل النسب السيولة
function showLiquidityRatios(financialData) {
    const resultsContainer = document.getElementById('additional-results-container');
    
    // حساب النسب
    const ratios = calculateLiquidityRatios(financialData);
    
    let html = `
        <h3>تحليل نسب السيولة - ${financialData.companyName}</h3>
        <div class="results-grid">
    `;
    
    for (const [ratioName, values] of Object.entries(ratios)) {
        const year1Value = values.year1 !== null ? values.year1.toFixed(2) : 'N/A';
        const year2Value = values.year2 !== null ? values.year2.toFixed(2) : 'N/A';
        const interpretation = getRatioInterpretation(ratioName, values.year2);
        
        html += `
            <div class="result-card">
                <h3>${ratioName}</h3>
                <div class="result-value">${year2Value}</div>
                <p>${financialData.year1}: ${year1Value}</p>
                <p class="ratio-interpretation">${interpretation}</p>
            </div>
        `;
    }
    
    html += '</div>';
    resultsContainer.innerHTML = html;
}

// حساب نسب السيولة
function calculateLiquidityRatios(data) {
    const ratios = {};
    
    // جمع البيانات الأساسية
    const currentAssetsYear1 = Object.values(data.balanceSheet['current-assets'] || {}).reduce((sum, item) => sum + item.year1, 0);
    const currentAssetsYear2 = Object.values(data.balanceSheet['current-assets'] || {}).reduce((sum, item) => sum + item.year2, 0);
    
    const currentLiabilitiesYear1 = Object.values(data.balanceSheet['current-liabilities'] || {}).reduce((sum, item) => sum + item.year1, 0);
    const currentLiabilitiesYear2 = Object.values(data.balanceSheet['current-liabilities'] || {}).reduce((sum, item) => sum + item.year2, 0);
    
    // استخدام المخزون المحفوظ في البيانات
    const inventoryYear1 = data.inventory.year1 || 0;
    const inventoryYear2 = data.inventory.year2 || 0;
    
    // استخدام النقدية المحفوظة في البيانات
    const cashYear1 = data.cash.year1 || 0;
    const cashYear2 = data.cash.year2 || 0;
    
    // حساب النسب
    // 1. نسبة التداول (الأصول المتداولة / الخصوم المتداولة)
    ratios['نسبة الت
