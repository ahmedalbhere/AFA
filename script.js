/* التنسيقات العامة */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #6C63FF;
    --primary-dark: #564FD8;
    --primary-light: #8B85FF;
    --secondary: #FF6584;
    --secondary-dark: #E04A6D;
    --dark: #121212;
    --dark-light: #1E1E1E;
    --darker: #0A0A0A;
    --text: #E0E0E0;
    --text-light: #A0A0A0;
    --text-lighter: #707070;
    --success: #4CAF50;
    --warning: #FF9800;
    --error: #F44336;
    --border: #333333;
    --border-light: #444444;
    --shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    --shadow-light: 0 5px 15px rgba(0, 0, 0, 0.2);
    --shadow-dark: 0 15px 40px rgba(0, 0, 0, 0.4);
    --gradient: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    --gradient-dark: linear-gradient(135deg, var(--darker) 0%, var(--dark) 100%);
}

body {
    font-family: 'Tajawal', sans-serif;
    background: var(--gradient-dark);
    color: var(--text);
    min-height: 100vh;
    direction: rtl;
    overflow-x: hidden;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* شاشة التحميل */
#loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--darker);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}

.loader-content {
    text-align: center;
    animation: fadeInUp 0.8s ease;
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    flex-direction: column;
}

.logo i {
    font-size: 4rem;
    color: var(--primary);
    margin-bottom: 20px;
    animation: bounce 2s infinite;
}

.logo h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(108, 99, 255, 0.3);
}

.spinner {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(108, 99, 255, 0.2);
    border-radius: 50%;
    border-top-color: var(--primary);
    animation: spin 1.2s linear infinite;
    margin: 0 auto;
    box-shadow: 0 0 20px rgba(108, 99, 255, 0.3);
}

/* الصفحات */
.page {
    display: none;
    min-height: 100vh;
    animation: fadeIn 0.6s ease;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--gradient-dark);
}

.page.active {
    display: block;
    position: relative;
}

/* الهيدر */
header {
    text-align: center;
    padding: 30px 0;
    margin-bottom: 40px;
    animation: slideDown 0.8s ease;
}

.tagline {
    color: var(--text-light);
    font-size: 1.3rem;
    margin-top: 15px;
    font-weight: 300;
    letter-spacing: 0.5px;
}

/* المحتوى */
.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px 0;
    animation: fadeInUp 0.8s ease;
}

.content h2 {
    font-size: 3rem;
    margin-bottom: 20px;
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    text-shadow: 0 2px 10px rgba(108, 99, 255, 0.3);
    line-height: 1.2;
}

.content p {
    font-size: 1.3rem;
    color: var(--text-light);
    margin-bottom: 50px;
    max-width: 700px;
    line-height: 1.8;
    font-weight: 300;
}

/* اختيار المستخدم */
.user-selection {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 50px;
    flex-wrap: wrap;
}

.user-card {
    background: var(--dark-light);
    border-radius: 25px;
    padding: 50px 40px;
    width: 320px;
    text-align: center;
    cursor: pointer;
    transition: all 0.4s ease;
    border: 2px solid transparent;
    box-shadow: var(--shadow);
    position: relative;
    overflow: hidden;
}

.user-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient);
    transform: scaleX(0);
    transition: transform 0.4s ease;
}

.user-card:hover {
    transform: translateY(-15px) scale(1.02);
    border-color: var(--primary);
    box-shadow: 0 20px 50px rgba(108, 99, 255, 0.3);
}

.user-card:hover::before {
    transform: scaleX(1);
}

.user-card .icon {
    font-size: 4rem;
    margin-bottom: 25px;
    color: var(--primary);
    transition: all 0.3s ease;
}

.user-card:hover .icon {
    transform: scale(1.1);
    color: var(--secondary);
}

.user-card h3 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: var(--text);
    font-weight: 600;
}

.user-card p {
    color: var(--text-light);
    font-size: 1.1rem;
    margin-bottom: 0;
    line-height: 1.6;
}

/* شريط التقدم */
.progress-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
    gap: 15px;
    position: relative;
}

.progress-bar::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 3px;
    background: var(--border);
    z-index: 1;
}

.progress-step {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--dark-light);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-light);
    font-weight: bold;
    z-index: 2;
    transition: all 0.4s ease;
    border: 3px solid var(--border);
}

.progress-step.active {
    background: var(--primary);
    color: white;
    box-shadow: 0 0 20px rgba(108, 99, 255, 0.5);
    border-color: var(--primary-light);
    transform: scale(1.1);
}

.progress-step.completed {
    background: var(--success);
    color: white;
    border-color: var(--success);
}

.progress-step.completed::after {
    content: "✓";
    font-size: 1.2rem;
}

/* خيارات الشبكة */
.options-grid {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 40px;
    flex-wrap: wrap;
}

.option-card {
    background: var(--dark-light);
    border-radius: 25px;
    padding: 50px 40px;
    width: 280px;
    text-align: center;
    cursor: pointer;
    transition: all 0.4s ease;
    border: 2px solid transparent;
    box-shadow: var(--shadow);
    position: relative;
    overflow: hidden;
}

.option-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient);
    transform: scaleX(0);
    transition: transform 0.4s ease;
}

.option-card:hover {
    transform: translateY(-12px) scale(1.05);
    border-color: var(--primary);
    box-shadow: 0 20px 50px rgba(108, 99, 255, 0.3);
}

.option-card:hover::before {
    transform: scaleX(1);
}

.option-card .option-icon {
    font-size: 4rem;
    margin-bottom: 25px;
    color: var(--primary);
    transition: all 0.3s ease;
}

.option-card:hover .option-icon {
    transform: scale(1.1) rotate(5deg);
    color: var(--secondary);
}

.option-card h3 {
    font-size: 1.6rem;
    color: var(--text);
    font-weight: 600;
    transition: all 0.3s ease;
}

.option-card:hover h3 {
    color: var(--primary-light);
}

/* النماذج */
.form-group {
    margin-bottom: 30px;
    width: 100%;
    max-width: 600px;
    text-align: right;
    animation: fadeInUp 0.6s ease;
}

.form-group label {
    display: block;
    margin-bottom: 12px;
    font-weight: 600;
    color: var(--text);
    font-size: 1.1rem;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 18px 25px;
    background: var(--dark-light);
    border: 2px solid var(--border);
    border-radius: 15px;
    color: var(--text);
    font-size: 1.1rem;
    transition: all 0.3s ease;
    font-family: 'Tajawal', sans-serif;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 20px rgba(108, 99, 255, 0.3);
    background: var(--darker);
    transform: translateY(-2px);
}

.form-group textarea {
    min-height: 150px;
    resize: vertical;
    line-height: 1.6;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: var(--text-lighter);
}

/* الأزرار */
.navigation {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-top: 50px;
    flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
    padding: 18px 35px;
    border: none;
    border-radius: 15px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.4s ease;
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'Tajawal', sans-serif;
    position: relative;
    overflow: hidden;
}

.btn-primary::before,
.btn-secondary::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transition: all 0.6s ease;
    transform: translate(-50%, -50%);
}

.btn-primary:hover::before,
.btn-secondary:hover::before {
    width: 300px;
    height: 300px;
}

.btn-primary {
    background: var(--gradient);
    color: white;
    box-shadow: 0 8px 25px rgba(108, 99, 255, 0.4);
}

.btn-primary:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 40px rgba(108, 99, 255, 0.6);
}

.btn-secondary {
    background: transparent;
    color: var(--text-light);
    border: 2px solid var(--border);
}

.btn-secondary:hover {
    background: var(--dark-light);
    color: var(--text);
    border-color: var(--primary);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(108, 99, 255, 0.3);
}

/* قائمة الوحدات */
.listings-container {
    width: 100%;
    max-width: 900px;
    margin-top: 40px;
}

.listing-card {
    background: var(--dark-light);
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 25px;
    box-shadow: var(--shadow);
    border-left: 6px solid var(--primary);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
}

.listing-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(108, 99, 255, 0.1), transparent);
    transition: left 0.6s ease;
}

.listing-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
    border-left-color: var(--secondary);
}

.listing-card:hover::before {
    left: 100%;
}

.listing-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
}

.listing-title {
    font-size: 1.5rem;
    color: var(--text);
    font-weight: 700;
}

.listing-price {
    font-size: 1.8rem;
    color: var(--primary);
    font-weight: 800;
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.listing-details {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.listing-detail {
    background: var(--darker);
    padding: 8px 20px;
    border-radius: 25px;
    font-size: 0.95rem;
    color: var(--text-light);
    border: 1px solid var(--border);
    transition: all 0.3s ease;
}

.listing-detail:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
}

.listing-description {
    color: var(--text-light);
    line-height: 1.8;
    margin-bottom: 20px;
    font-size: 1.1rem;
}

.listing-contact {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--border-light);
}

.contact-info {
    color: var(--text);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
}

.contact-info i {
    color: var(--primary);
}

.contact-btn {
    background: var(--gradient);
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Tajawal', sans-serif;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 1rem;
}

.contact-btn:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 20px rgba(108, 99, 255, 0.4);
}

.listing-date {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid var(--border-light);
    color: var(--text-lighter);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* صفحة التأكيد */
.confirmation-content {
    max-width: 700px;
    animation: fadeInUp 0.8s ease;
}

.confirmation-icon {
    font-size: 6rem;
    color: var(--success);
    margin-bottom: 40px;
    animation: bounceIn 1s ease;
}

.confirmation-content h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
}

.confirmation-content p {
    font-size: 1.2rem;
    margin-bottom: 15px;
}

/* رسالة الخطأ */
.error-message {
    text-align: center;
    padding: 60px 40px;
    color: var(--text-light);
    animation: shake 0.5s ease;
}

.error-message i {
    font-size: 5rem;
    color: var(--error);
    margin-bottom: 25px;
}

.error-message h3 {
    color: var(--text);
    margin-bottom: 15px;
    font-size: 1.8rem;
}

.error-message p {
    font-size: 1.2rem;
}

/* شاشة التحميل */
.loading {
    text-align: center;
    padding: 60px 40px;
    animation: pulse 2s infinite;
}

.loading .spinner {
    width: 70px;
    height: 70px;
    border: 5px solid rgba(108, 99, 255, 0.2);
    border-radius: 50%;
    border-top-color: var(--primary);
    animation: spin 1.2s linear infinite;
    margin: 0 auto 30px;
    box-shadow: 0 0 25px rgba(108, 99, 255, 0.3);
}

.loading p {
    font-size: 1.3rem;
    color: var(--text-light);
}

/* لا توجد نتائج */
.no-results {
    text-align: center;
    padding: 60px 40px;
    color: var(--text-light);
    animation: fadeInUp 0.8s ease;
}

.no-results i {
    font-size: 5rem;
    color: var(--text-light);
    margin-bottom: 25px;
    opacity: 0.7;
}

.no-results h3 {
    color: var(--text-light);
    margin-bottom: 15px;
    font-size: 1.8rem;
}

.no-results p {
    margin-bottom: 30px;
    font-size: 1.2rem;
}

.no-results .btn-primary {
    margin-top: 20px;
}

/* الفوتر */
footer {
    text-align: center;
    padding: 30px 0;
    margin-top: 50px;
    color: var(--text-light);
    border-top: 1px solid var(--border);
    font-size: 1.1rem;
}

/* الرسوم المتحركة */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
    from { 
        opacity: 0; 
        transform: translateY(50px); 
    }
    to { 
        opacity: 1; 
        transform: translateY(0); 
    }
}

@keyframes slideDown {
    from { 
        opacity: 0; 
       
