// ========================================
// AI革命 ランディングページ JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // カウントダウンタイマー
    initCountdown();

    // FAQアコーディオン
    initFAQ();

    // スムーズスクロール
    initSmoothScroll();

    // スクロールアニメーション
    initScrollAnimations();
});

// ========================================
// カウントダウンタイマー
// ========================================
function initCountdown() {
    // 3日後の日時を設定
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    endDate.setHours(23, 59, 59, 999);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;

        if (distance < 0) {
            // カウントダウン終了時
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // 初回実行
    updateTimer();

    // 1秒ごとに更新
    setInterval(updateTimer, 1000);
}

// ========================================
// FAQアコーディオン
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // 他のアイテムを閉じる
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // クリックしたアイテムをトグル
            item.classList.toggle('active');
        });
    });
}

// ========================================
// スムーズスクロール
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 50;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// スクロールアニメーション
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.problem-item, .content-card, .bonus-card, .testimonial-card, .faq-item'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// CTAボタン クリック追跡（オプション）
// ========================================
document.querySelectorAll('.cta-button, .cta-button-large').forEach(button => {
    button.addEventListener('click', function(e) {
        // Google Analytics等のトラッキング用
        // gtag('event', 'click', {
        //     'event_category': 'CTA',
        //     'event_label': this.textContent.trim()
        // });

        console.log('CTA Clicked:', this.textContent.trim());
    });
});

// ========================================
// 離脱防止ポップアップ（オプション）
// ========================================
let exitIntentShown = false;

document.addEventListener('mouseout', function(e) {
    if (e.clientY < 0 && !exitIntentShown) {
        // 離脱意図を検知した時の処理
        // exitIntentShown = true;
        // ポップアップを表示する処理をここに追加
        console.log('Exit intent detected');
    }
});

// ========================================
// スクロール位置に応じたヘッダー表示
// ========================================
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 下スクロール
        header.style.transform = 'translateY(-100%)';
    } else {
        // 上スクロール
        header.style.transform = 'translateY(0)';
    }

    header.style.transition = 'transform 0.3s ease';
    lastScrollTop = scrollTop;
});
