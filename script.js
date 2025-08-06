<script>
document.addEventListener('DOMContentLoaded', function() {
    // Menü navigasyonu için tüm bağlantıları seç
    const menuLinks = document.querySelectorAll('.main-menu a');
    const sections = document.querySelectorAll('.section');
    
    // Her menü bağlantısına tıklanma olayını ekle
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Tüm menü öğelerinden active classını kaldır
            menuLinks.forEach(item => item.classList.remove('active'));
            // Tıklanan menü öğesine active classını ekle
            this.classList.add('active');
            
            // Hedef bölüm ID'sini al
            const target = this.getAttribute('href');
            
            // Tüm bölümleri gizle
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Hedef bölümü göster
            const targetSection = document.querySelector(target);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Animasyonları yeniden başlat
                const animatedElements = targetSection.querySelectorAll('.animate__animated');
                animatedElements.forEach(el => {
                    // Animasyon classını geçici olarak kaldır
                    const animationClass = Array.from(el.classList).find(cls => cls.startsWith('animate__'));
                    if (animationClass) {
                        el.classList.remove(animationClass);
                        // Yeniden eklemek için kısa bir gecikme
                        setTimeout(() => {
                            el.classList.add(animationClass);
                        }, 10);
                    }
                });
            }
            
            // Mobil görünümde menüyü kapat
            if (window.innerWidth < 992) {
                document.querySelector('.sidebar').classList.remove('active');
            }
            
            // Tarayıcı geçmişini güncelle
            history.pushState(null, null, target);
        });
    });
    
    // Tema değiştirme butonu
    const themeToggle = document.getElementById('theme-toggle');
    
    // Kayıtlı tema varsa yükle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }
    
    // Tema değiştirme butonuna tıklanınca
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            this.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            localStorage.setItem('theme', 'light');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Mobil menü butonu oluştur
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileMenuToggle);
    
    // Mobil menü butonuna tıklanınca
    mobileMenuToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });
    
    // Sayfa yüklendiğinde URL'deki hash'e göre bölüm aç
    function loadFromHash() {
        if (window.location.hash) {
            const targetId = window.location.hash;
            const targetSection = document.querySelector(targetId);
            const targetLink = document.querySelector(`.main-menu a[href="${targetId}"]`);
            
            if (targetSection && targetLink) {
                sections.forEach(section => section.classList.remove('active'));
                targetSection.classList.add('active');
                
                menuLinks.forEach(link => link.classList.remove('active'));
                targetLink.classList.add('active');
            }
        } else {
            // Varsayılan olarak Hakkımda bölümünü göster
            document.querySelector('#about').classList.add('active');
            document.querySelector('.main-menu a[href="#about"]').classList.add('active');
        }
    }
    
    // Sayfa yüklendiğinde çalıştır
    loadFromHash();
    
    // Hash değişikliklerini dinle
    window.addEventListener('hashchange', loadFromHash);
    
    // Ekran boyutu değiştiğinde mobil menüyü kapat
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            document.querySelector('.sidebar').classList.remove('active');
        }
    });
});
</script>