/* 
  Denail v2 - Core Interaction Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Parallax Orbs
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const o1 = document.querySelector('.o1');
        const o2 = document.querySelector('.o2');
        const o3 = document.querySelector('.o3');
        
        if(o1) o1.style.transform = `translateY(${scrolled * 0.15}px)`;
        if(o2) o2.style.transform = `translateY(${-scrolled * 0.1}px)`;
        if(o3) o3.style.transform = `translateX(${scrolled * 0.05}px)`;
    });

    // Magnetic Buttons
    if (window.matchMedia('(pointer: fine)').matches) {
        const magneticElements = document.querySelectorAll('.btn-premium, .btn-secondary');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Header Blur on Scroll
    const header = document.querySelector('.header-v2');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 15, 0.8)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.padding = '16px 0';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.padding = '24px 0';
        }
    });

    // Slideshow Logic
    function startSlideshow(id, interval = 3000) {
        const container = document.getElementById(id);
        if (!container) return;
        const imgs = container.querySelectorAll('.case-img');
        let idx = 0;
        setInterval(() => {
            imgs[idx].classList.remove('active');
            idx = (idx + 1) % imgs.length;
            imgs[idx].classList.add('active');
        }, interval);
    }

    startSlideshow('sunna-slideshow-v2', 4000);
});

// Profit Calculator Logic
function calcProfit() {
    const inc = document.getElementById('incomeInput').value;
    const res = document.getElementById('calcResult');
    const val = document.getElementById('lostVal');
    
    if (inc > 0) {
        const lost = Math.round(inc * 0.2);
        val.innerText = lost.toLocaleString();
        res.style.display = 'block';
        res.classList.add('in');
        
        // Scroll to result
        res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Form Submission Logic
function sendForm(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const text = `Здравствуйте, Denail!%0AИмя: ${encodeURIComponent(fd.get('name'))}%0AТелефон: ${encodeURIComponent(fd.get('phone'))}%0AЗадача: ${encodeURIComponent(fd.get('task'))}`;
    window.open(`https://wa.me/77072186014?text=${text}`, '_blank');
}
