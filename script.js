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
    width: 280
