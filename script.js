import { services } from './data/services_data.js';
import { stories } from './data/stories_data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initMobileMenu();
    handleActiveNavLinks();

    const path = window.location.pathname;

    if (path.endsWith('index.html') || path.endsWith('/')) {
        renderServices(services.slice(0, 6));
        renderStories(stories.slice(0, 3));
    }
    
    if (path.includes('services.html')) {
        renderServiceDetails(services);
    }
    
    if (path.includes('success_stories.html')) {
        renderFullStories(stories);
        setupStoryFilters(stories);
    }
    
    if(path.includes('consultation.html')){
        handleConsultationForm();
    }
});

function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

function handleActiveNavLinks() {
    const navLinks = document.querySelectorAll('nav a.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}


function renderServices(serviceData) {
    const container = document.getElementById('services-grid');
    if (!container) return;

    container.innerHTML = serviceData.map(service => `
        <div class="service-card">
            <div class="p-6">
                <i data-lucide="${service.icon}" class="w-12 h-12 mb-4 text-primary"></i>
                <h3 class="text-xl font-bold mb-2">${service.title}</h3>
                <p class="text-gray-600 h-20">${service.description}</p>
                 <a href="pages/services.html" class="inline-block mt-4 font-semibold text-primary hover:text-accent">
                    자세히 보기 <i data-lucide="arrow-right" class="inline w-4 h-4"></i>
                </a>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderStories(storyData) {
    const container = document.getElementById('stories-grid');
    if (!container) return;
    
    container.innerHTML = storyData.map(story => `
        <div class="story-card">
            <div class="p-6">
                 <span class="inline-block bg-accent text-white px-3 py-1 text-xs font-semibold rounded-full mb-3">${story.category}</span>
                <h3 class="text-xl font-bold mb-3">${story.title}</h3>
                <p class="text-gray-600">${story.summary}</p>
            </div>
            <div class="bg-gray-50 px-6 py-4 border-t">
                <span class="text-sm text-gray-500">결과: <strong class="text-primary">${story.result}</strong></span>
            </div>
        </div>
    `).join('');
}

function renderServiceDetails(serviceData) {
    const container = document.getElementById('services-list');
    if (!container) return;

    container.innerHTML = serviceData.map(service => `
        <div class="bg-white p-8 rounded-lg shadow-md grid md:grid-cols-4 gap-8 items-center">
            <div class="text-center md:col-span-1">
                <i data-lucide="${service.icon}" class="w-20 h-20 mx-auto text-primary"></i>
            </div>
            <div class="md:col-span-3">
                <h3 class="text-2xl font-bold text-primary mb-3">${service.title}</h3>
                <p class="text-gray-700 leading-relaxed">${service.detail}</p>
                <a href="consultation.html" class="btn-primary mt-6">해당 업무 상담하기</a>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderFullStories(storyData) {
    const container = document.getElementById('full-stories-grid');
    if (!container) return;
    
     container.innerHTML = storyData.map(story => `
        <div class="story-card" data-category="${story.category}">
            <div class="p-6">
                 <span class="inline-block bg-accent text-white px-3 py-1 text-xs font-semibold rounded-full mb-3">${story.category}</span>
                <h3 class="text-xl font-bold mb-3">${story.title}</h3>
                <p class="text-gray-600 mb-4">${story.summary}</p>
                <div class="bg-blue-50 p-4 rounded-md text-sm">
                    <p><strong>행정사 조력:</strong> ${story.action}</p>
                </div>
            </div>
            <div class="bg-gray-100 px-6 py-4 border-t">
                <span class="text-sm text-gray-600">최종 결과: <strong class="text-primary">${story.result}</strong></span>
            </div>
        </div>
    `).join('');
}


function setupStoryFilters(storyData) {
    const filterContainer = document.getElementById('stories-filter-buttons');
    const storiesGrid = document.getElementById('full-stories-grid');
    if (!filterContainer || !storiesGrid) return;

    const categories = ['all', ...new Set(storyData.map(s => s.category))];
    
    filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
            ${cat === 'all' ? '전체보기' : cat}
        </button>
    `).join('');

    filterContainer.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') return;
        
        const category = e.target.dataset.category;
        
        filterContainer.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');

        const storyCards = storiesGrid.querySelectorAll('.story-card');
        storyCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function handleConsultationForm() {
    const form = document.getElementById('consultation-form');
    if(!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const privacyCheckbox = document.getElementById('privacy-policy');
        if (!privacyCheckbox.checked) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }

        const formData = new FormData(form);
        const name = formData.get('name');
        
        alert(`${name}님, 상담 신청이 성공적으로 접수되었습니다.\n빠른 시일 내에 연락드리겠습니다.`);
        form.reset();
    });
}
