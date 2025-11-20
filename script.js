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
    
    // تحديث الحسابات الأولي
    updateYearHeaders();
    updateCalculations();
});

// تحديث عناوين السنوات في الجداول
function updateYearHeaders() {
    const year1 = document.getElementById('year1').value;
    const year2 = document.getElementById('year2').value;
    
    document.getElementById('balance-year1').textContent = `${year1} (ج.م)`;
    document.getElementById('balance-year2').textContent = `${year2} (ج.م)`;
    document.getElementById('income-year1').textContent = `${year1} (ج.م)`;
    document.getElementById('income-year2').textContent = `${year2} (ج.م)`;
}

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
function addIncomeItem(category, sectionName
