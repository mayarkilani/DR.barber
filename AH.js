document.getElementById('enrollmentForm').addEventListener('submit', function(event) {
    // منع الصفحة من إعادة التحميل
    event.preventDefault();

    // جلب البيانات من الحقول
    const fullName = document.querySelector('input[type="text"]').value;
    const phone = document.querySelector('input[type="tel"]').value;
    const course = document.querySelector('select').value;

    // فحص بسيط لرقم الهاتف (تأكد أنه يبدأ بـ 09 ومكون من 10 أرقام)
    const phoneRegex = /^09\d{8}$/;

    if (!phoneRegex.test(phone)) {
        alert("يرجى إدخال رقم هاتف سوري صحيح يبدأ بـ 09 ومكون من 10 أرقام.");
        return;
    }

    // محاكاة عملية إرسال البيانات (هنا سيتم الربط مع API شام كاش لاحقاً)
    console.log("تم استلام البيانات:", { fullName, phone, course });

    // تغيير شكل الزر لإظهار جاري المعالجة
    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.innerText = "جاري التحقق من البيانات...";
    submitBtn.style.opacity = "0.7";
    submitBtn.disabled = true;

    // بعد ثانيتين، نظهر رسالة النجاح
    setTimeout(() => {
        alert(`أهلاً بك يا ${fullName}! تم تسجيل طلبك بنجاح. سنقوم الآن بتحويلك إلى بوابة شام كاش لإتمام عملية الدفع.`);
        
        // هنا نضع رابط الدفع الفعلي (رابط تجريبي حالياً)
        // window.location.href = "https://sham-cash-payment-gateway.com"; 
        
        // لإعادة تفعيل الزر إذا لزم الأمر
        submitBtn.innerText = "تأكيد التسجيل والانتقال للدفع";
        submitBtn.style.opacity = "1";
        submitBtn.disabled = false;
    }, 2000);
});
document.getElementById('enrollmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.querySelector('input[type="text"]').value;
    const phone = document.querySelector('input[type="tel"]').value;
    const courseSelect = document.querySelector('select');
    const courseText = courseSelect.options[courseSelect.selectedIndex].text;

    // مسح الـ QR القديم إن وجد
    document.getElementById("qrcode").innerHTML = "";

    // توليد QR Code يحتوي على اسم الطالب ورقمه
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
});

// إغلاق النافذة عند الضغط على X
document.querySelector('.close-btn').onclick = function() {
    document.getElementById('idCardModal').style.display = "none";
}
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.courses-section, .gallery-section, .registration-section');
    sections.forEach(sec => {
        const top = window.scrollY + window.innerHeight - 100;
        if (top > sec.offsetTop) {
            sec.classList.add('show-on-scroll');
        }
    });
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('تم تسجيل التطبيق بنجاح!'))
      .catch(err => console.log('فشل تسجيل التطبيق', err));
  });
}
