document.addEventListener("DOMContentLoaded", () => {

    const tracks = document.querySelectorAll('.carousel-track');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.navbar-mobile');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    tracks.forEach(track => {
        const container = track.parentElement;
        
        if (track.scrollWidth > container.offsetWidth) {
            
            const initialContent = track.innerHTML;
            track.innerHTML += initialContent;

            const allBubbles = track.children;
            const originalCount = allBubbles.length / 2;
            
            const speed = parseFloat(track.getAttribute('data-speed')) || 0.5;
            let scrollPos = 0;

            function moveCarousel() {
               if (!track.matches(':hover')) {
                    scrollPos -= speed;
                    
                    const firstClone = allBubbles[originalCount];
                    const trackLeft = track.parentElement.getBoundingClientRect().left;
                    
                    if (firstClone.getBoundingClientRect().left <= trackLeft) {
                        scrollPos = 0;
                    }
                    
                    track.style.transform = `translateX(${scrollPos}px)`;
                }
                requestAnimationFrame(moveCarousel);
            }
            
            moveCarousel();
        } else {
            track.style.justifyContent = "center";
        }
    });

    const turbulence = document.querySelector('feTurbulence');
    let step = 0;

    function animateGlassDistortion() {
        step += 0.005;
        const freqX = 0.01 + Math.sin(step) * 0.002;
        const freqY = 0.03 + Math.cos(step) * 0.002;
        
        if (turbulence) {
            turbulence.setAttribute('baseFrequency', `${freqX} ${freqY}`);
        }
        requestAnimationFrame(animateGlassDistortion);
    }

    if (turbulence) {
        animateGlassDistortion();
    }
});

const colors = ['var(--pastel-pink)', 'var(--pastel-green)'];
const background = document.querySelector('.background-blobs');

if (background) {
    for (let i = 0; i < 6; i++) {
        const blob = document.createElement('div');
        blob.classList.add('blob');
        
        const size = Math.floor(Math.random() * 300) + 600;
        
        const posX = Math.floor(Math.random() * 100);
        const posY = Math.floor(Math.random() * 100);
        
        const color = colors[Math.floor(Math.random() * colors.length)];

        blob.style.width = `${size}px`;
        blob.style.height = `${size}px`;
        blob.style.left = `${Math.random() * 120 - 20}%`; // Peut déborder un peu à gauche/droite
        blob.style.top = `${Math.random() * 120 - 20}%`;
        blob.style.backgroundColor = color;
        blob.style.borderRadius = `${Math.random() * 50 + 30}% ${Math.random() * 50 + 30}%`;
        
        blob.style.animationDelay = `${Math.random() * 5}s`;
        blob.style.animationDuration = `${15 + Math.random() * 10}s`;

        background.appendChild(blob);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const projectsPerPage = 6;
    const projects = document.querySelectorAll('.project-card');
    const paginationContainer = document.getElementById('pagination');
    const totalPages = Math.ceil(projects.length / projectsPerPage);
    let currentPage = 1;

    function showPage(pageNumber) {
        currentPage = pageNumber;
        const start = (pageNumber - 1) * projectsPerPage;
        const end = start + projectsPerPage;

        projects.forEach((project, index) => {
            project.style.display = (index >= start && index < end) ? 'block' : 'none';
        });

        renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderPagination() {
        paginationContainer.innerHTML = '';

        const prevBtn = createBtn('←', currentPage > 1 ? () => showPage(currentPage - 1) : null);
        paginationContainer.appendChild(prevBtn);

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                const btn = createBtn(i, () => showPage(i), i === currentPage);
                paginationContainer.appendChild(btn);
            } 
            
            else if (i === currentPage - 2 || i === currentPage + 2) {
                const dots = document.createElement('span');
                dots.innerText = '...';
                dots.classList.add('page-dots');
                paginationContainer.appendChild(dots);
            }
        }

        const nextBtn = createBtn('→', currentPage < totalPages ? () => showPage(currentPage + 1) : null);
        paginationContainer.appendChild(nextBtn);
    }

    function createBtn(text, onClick, isActive = false) {
        const btn = document.createElement('a');
        btn.innerText = text;
        btn.classList.add('page-number');
        if (isActive) btn.classList.add('active');
        if (!onClick) btn.style.opacity = "0.3";
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (onClick) onClick();
        });
        return btn;
    }

    if (projects.length > 0) showPage(1);
});