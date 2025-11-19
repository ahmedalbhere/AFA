// بيانات التطبيق
let userData = {
    userType: '',
    gender: '',
    area: '',
    type: '',
    studentGender: '',
    studentArea: '',
    studentType: '',
    details: '',
    price: '',
    contact: ''
};

// تهيئة Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC4wG7v5Q8b6Q3Q2Q1Q0Q9Q8Q7Q6Q5Q4Q3",
    authDomain: "pharmase-9d8bc.firebaseapp.com",
    databaseURL: "https://pharmase-9d8bc-default-rtdb.firebaseio.com",
    projectId: "pharmase-9d8bc",
    storageBucket: "pharmase-9d8bc.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdefghijklmnopqrstuv"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل بعد تحميل الصفحة
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 1500);
    
    // إعداد معالج النماذج
    document.getElementById('owner-form').addEventListener('submit', handleOwnerFormSubmit);
});

// اختيار نوع المستخدم
function selectUserType(type) {
    userData.userType = type;
    
    if (type === 'owner') {
        navigateToPage('owner-gender-page');
    } else if (type === 'student') {
        navigateToPage('student-gender-page');
    }
}

// اختيار خيار في النماذج
function selectOption(field, value) {
    userData[field] = value;
    
    // تحديد الصفحة التالية بناءً على الصفحة الحالية
    const currentPage = document.querySelector('.page.active').id;
    
    if (currentPage === 'owner-gender-page') {
        navigateToPage('owner-area-page');
    } else if (currentPage === 'owner-area-page') {
        navigateToPage('owner-type-page');
    } else if (currentPage === 'owner-type-page') {
        navigateToPage('owner-details-page');
    } else if (currentPage === 'student-gender-page') {
        navigateToPage('student-area-page');
    } else if (currentPage === 'student-area-page') {
        navigateToPage('student-type-page');
    } else if (currentPage === 'student-type-page') {
        // البحث عن الوحدات المتاحة وعرض النتائج
        searchListings();
        navigateToPage('student-results-page');
    }
}

// التنقل بين الصفحات
function navigateToPage(pageId) {
    // إخفاء جميع الصفحات
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // إظهار الصفحة المطلوبة
    document.getElementById(pageId).classList.add('active');
    
    // التمرير إلى أعلى الصفحة
    window.scrollTo(0, 0);
}

// العودة للصفحة السابقة
function goBack() {
    const currentPage = document.querySelector('.page.active').id;
    let previousPage = '';
    
    // تحديد الصفحة السابقة بناءً على الصفحة الحالية
    switch(currentPage) {
        case 'owner-gender-page':
            previousPage = 'main-page';
            break;
        case 'owner-area-page':
            previousPage = 'owner-gender-page';
            break;
        case 'owner-type-page':
            previousPage = 'owner-area-page';
            break;
        case 'owner-details-page':
            previousPage = 'owner-type-page';
            break;
        case 'student-gender-page':
            previousPage = 'main-page';
            break;
        case 'student-area-page':
            previousPage = 'student-gender-page';
            break;
        case 'student-type-page':
            previousPage = 'student-area-page';
            break;
        case 'student-results-page':
            previousPage = 'student-type-page';
            break;
        default:
            previousPage = 'main-page';
    }
    
    navigateToPage(previousPage);
}

// العودة للصفحة الرئيسية
function goToMainPage() {
    navigateToPage('main-page');
    resetUserData();
}

// إعادة تعيين بيانات المستخدم
function resetUserData() {
    userData = {
        userType: '',
        gender: '',
        area: '',
        type: '',
        studentGender: '',
        studentArea: '',
        studentType: '',
        details: '',
        price: '',
        contact: ''
    };
    
    // إعادة تعيين النموذج
    document.getElementById('owner-form').reset();
}

// معالجة نموذج المالك
function handleOwnerFormSubmit(e) {
    e.preventDefault();
    
    // جمع البيانات من النموذج
    userData.details = document.getElementById('details').value;
    userData.price = document.getElementById('price').value;
    userData.contact = document.getElementById('contact').value;
    
    // التحقق من اكتمال البيانات
    if (!userData.details || !userData.price || !userData.contact) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
    }
    
    // إضافة الوحدة إلى قاعدة البيانات
    addListing();
    
    // الانتقال إلى صفحة التأكيد
    navigateToPage('confirmation-page');
}

// إضافة وحدة سكنية جديدة إلى Firebase
function addListing() {
    const newListing = {
        id: Date.now(),
        gender: userData.gender,
        area: userData.area,
        type: userData.type,
        details: userData.details,
        price: userData.price,
        contact: userData.contact,
        date: new Date().toLocaleDateString('ar-EG'),
        timestamp: Date.now()
    };
    
    // حفظ البيانات في Firebase
    database.ref('listings/' + newListing.id).set(newListing)
        .then(() => {
            console.log('تم حفظ البيانات بنجاح');
        })
        .catch((error) => {
            console.error('خطأ في حفظ البيانات:', error);
            alert('حدث خطأ في حفظ البيانات. يرجى المحاولة مرة أخرى.');
        });
}

// البحث عن الوحدات المتاحة للطالب من Firebase
function searchListings() {
    showLoading('listings-container');
    
    database.ref('listings').once('value')
        .then((snapshot) => {
            const listings = [];
            snapshot.forEach((childSnapshot) => {
                listings.push(childSnapshot.val());
            });
            
            const filteredListings = listings.filter(listing => {
                // تحويل "شاب" إلى "شباب" للتوافق مع بيانات المالكين
                const studentGender = userData.studentGender === 'شاب' ? 'شباب' : userData.studentGender;
                
                return listing.gender === studentGender &&
                       listing.area === userData.studentArea &&
                       listing.type === userData.studentType;
            });
            
            displayListings(filteredListings);
        })
        .catch((error) => {
            console.error('خطأ في جلب البيانات:', error);
            document.getElementById('listings-container').innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>حدث خطأ في جلب البيانات</h3>
                    <p>يرجى المحاولة مرة أخرى لاحقاً</p>
                </div>
            `;
        });
}

// عرض الوحدات السكنية
function displayListings(listingsToShow) {
    const container = document.getElementById('listings-container');
    
    if (listingsToShow.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-home"></i>
                <h3>لا توجد وحدات متاحة</h3>
                <p>لا توجد وحدات سكنية تطابق معايير البحث المحددة</p>
                <button class="btn-primary" onclick="goBack()">
                    <i class="fas fa-arrow-right"></i> تعديل معايير البحث
                </button>
            </div>
        `;
        return;
    }
    
    // ترتيب الوحدات حسب الأحدث
    listingsToShow.sort((a, b) => b.timestamp - a.timestamp);
    
    container.innerHTML = '';
    
    listingsToShow.forEach(listing => {
        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card';
        
        listingCard.innerHTML = `
            <div class="listing-header">
                <div class="listing-title">${listing.type} ${listing.gender}</div>
                <div class="listing-price">${listing.price} ج.م/شهر</div>
            </div>
            <div class="listing-details">
                <span class="listing-detail">${listing.area}</span>
                <span class="listing-detail">${listing.gender}</span>
                <span class="listing-detail">${listing.type}</span>
            </div>
            <div class="listing-description">
                ${listing.details}
            </div>
            <div class="listing-contact">
                <div class="contact-info">
                    <i class="fas fa-phone"></i>
                    ${listing.contact}
                </div>
                <button class="contact-btn" onclick="contactOwner('${listing.contact}')">
                    <i class="fas fa-comment"></i> تواصل
                </button>
            </div>
            <div class="listing-date">
                <small>تم الإضافة: ${listing.date}</small>
            </div>
        `;
        
        container.appendChild(listingCard);
    });
}

// عرض شاشة التحميل
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>جاري البحث عن الوحدات المتاحة...</p>
        </div>
    `;
}

// التواصل مع المالك
function contactOwner(contactInfo) {
    // يمكن إضافة منطق إضافي هنا مثل فتح تطبيق المراسلة
    alert(`معلومات الاتصال: ${contactInfo}\n\nيمكنك الآن التواصل مع المالك مباشرة.`);
}

// إضافة بعض البيانات التجريبية إذا كانت قاعدة البيانات فارغة (للتجربة فقط)
function addSampleData() {
    database.ref('listings').once('value')
        .then((snapshot) => {
            if (!snapshot.exists()) {
                const sampleListings = [
                    {
                        id: 1,
                        gender: 'شباب',
                        area: 'شرق',
                        type: 'شقة',
                        details: 'شقة مفروشة بالكامل بمنطقة هادئة قريبة من الجامعة، تحتوي على 3 غرف وصالة ومطبخ وحمامين',
                        price: '1500',
                        contact: '01012345678',
                        date: '2023-10-15',
                        timestamp: 1697385600000
                    },
                    {
                        id: 2,
                        gender: 'بنات',
                        area: 'غرب',
                        type: 'سرير',
                        details: 'سرير في غرفة مشتركة مع طالبات، الشقة تحتوي على 3 غرف وحمام مشترك ومطبخ',
                        price: '600',
                        contact: '01123456789',
                        date: '2023-10-10',
                        timestamp: 1696953600000
                    },
                    {
                        id: 3,
                        gender: 'شباب',
                        area: 'غرب',
                        type: 'شقة',
                        details: 'شقة جديدة بمنطقة غرب بني سويف، قريبة من وسائل المواصلات، تحتوي على غرفتين وصالة',
                        price: '1200',
                        contact: '01234567890',
                        date: '2023-10-05',
                        timestamp: 1696521600000
                    }
                ];
                
                sampleListings.forEach(listing => {
                    database.ref('listings/' + listing.id).set(listing);
                });
                
                console.log('تم إضافة البيانات التجريبية');
            }
        });
}

// استدعاء هذه الدالة مرة واحدة لإضافة بيانات تجريبية (يمكن إزالتها لاحقاً)
// addSampleData();
