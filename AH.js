document.getElementById('enrollmentForm').addEventListener('submit', function(event) {
    // منع الصفحة من إعادة التحميل
    event.preventDefault();

    // جلب البيانات من الحقول
    const fullName = document.querySelector('input[type="text"]').value;
    const phone = document.querySelector('input[type="tel"]').value;
    const course = document.querySelector('select').value;

    // فحص رقم الهاتف السوري
    const phoneRegex = /^09\d{8}$/;

    if (!phoneRegex.test(phone)) {
        alert("يرجى إدخال رقم هاتف سوري صحيح يبدأ بـ 09 ومكون من 10 أرقام.");
        return;
    }

    // محاكاة عملية إرسال البيانات
    console.log("تم استلام البيانات:", { fullName, phone, course });

    // تغيير شكل الزر
    const submitBtn = document.querySelector('.btn-gold'); // تأكد من الكلاس الصحيح للزر
    if(submitBtn) {
        submitBtn.innerText = "جاري التحقق من البيانات...";
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;
    }

    // بعد ثانيتين، نظهر البطاقة
    setTimeout(() => {
        const courseSelect = document.getElementById('courseSelect');
        const courseText = courseSelect.options[courseSelect.selectedIndex].text;

        // مسح الـ QR القديم إن وجد
        document.getElementById("qrcode").innerHTML = "";

        // توليد QR Code
        new QRCode(document.getElementById("qrcode"), {
            text: `Student: ${fullName}, Phone: ${phone}`,
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff"
        });

        // وضع البيانات في البطاقة
        document.getElementById('displayStudentName').innerText = fullName;
        document.getElementById('displayCourseName').innerText = courseText;

        // إظهار البطاقة
        document.getElementById('idCardModal').style.display = "block";
        
        // إعادة الزر لحالته
        if(submitBtn) {
            submitBtn.innerText = "إرسال الطلب وإصدار البطاقة";
            submitBtn.style.opacity = "1";
            submitBtn.disabled = false;
        }
    }, 2000);
});

// إغلاق النافذة (Modal)
document.querySelector('.close-btn').onclick = function() {
    document.getElementById('idCardModal').style.display = "none";
}

// تأثيرات الظهور عند التمرير
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.courses-section, .gallery-section, .registration-section');
    sections.forEach(sec => {
        const top = window.scrollY + window.innerHeight - 100;
        if (top > sec.offsetTop) {
            sec.classList.add('show-on-scroll');
        }
    });
});

// --- الكود السحري لتفعيل أيقونة التثبيت (PWA) ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
        .then(reg => console.log('Service Worker Registered!', reg))
        .catch(err => console.log('Service Worker Error', err));
    });
}