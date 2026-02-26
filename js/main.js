/**
 * Основной JavaScript для портфолио
 */

document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Эффект скролла для навигации
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Печатная машинка для заголовка
    const typingElement = document.querySelector('.typing-text');
    const phrases = [
        'Senior Python Developer',
        'FastAPI & Django Expert',
        'Microservices Architect',
        'Backend Team Lead',
        '6+ лет опыта'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        if (!typingElement) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Запуск печатной машинки
    setTimeout(type, 1000);

    // Анимация прогресс-баров навыков при скролле
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    function animateSkills() {
        if (skillsAnimated) return;

        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;

        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            skillsAnimated = true;
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
        }
    }

    // Анимация языковых прогресс-баров
    const languageBars = document.querySelectorAll('.language-progress');
    let languagesAnimated = false;

    function animateLanguages() {
        if (languagesAnimated) return;

        const languagesSection = document.querySelector('.additional');
        if (!languagesSection) return;

        const sectionTop = languagesSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            languagesAnimated = true;
            languageBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    }

    // Анимация при скролле (Fade In)
    const fadeElements = document.querySelectorAll('.skills-category, .timeline-item, .project-card, .additional-card');
    
    function checkFadeElements() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    }

    // Добавляем класс fade-in элементам
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });

    // Кнопка "Наверх"
    const backToTop = document.getElementById('backToTop');

    function toggleBackToTop() {
        if (!backToTop) return;

        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обработка формы
    const contactForm = document.getElementById('contact-form');

    contactForm?.addEventListener('submit', function(e) {
        // Форма отправится стандартным способом на Formspree
        // Здесь можно добавить дополнительную валидацию если нужно
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;
        }
    });

    // Анимация чисел (если понадобится в будущем)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Intersection Observer для анимаций
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Навешиваем observer на элементы
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Параллакс эффект для градиентных шаров
    const gradientOrbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        gradientOrbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Эффект "дыхания" для кнопок
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Инициализация при загрузке
    window.addEventListener('scroll', () => {
        animateSkills();
        animateLanguages();
        checkFadeElements();
        toggleBackToTop();
    });

    // Запуск проверок при загрузке
    animateSkills();
    animateLanguages();
    checkFadeElements();
    toggleBackToTop();

    // Консольное сообщение
    console.log('%c👋 Привет, разработчик!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%cИщешь код? Он весь на GitHub: https://github.com/namig41', 'color: #10b981; font-size: 14px;');
});

/**
 * Загрузка проектов с GitHub API
 */
async function loadGitHubProjects() {
    const username = 'namig41';
    const projectsGrid = document.getElementById('projects-grid');
    
    console.log('🔍 Загрузка проектов для пользователя:', username);
    
    if (!projectsGrid) {
        console.error('❌ Элемент projects-grid не найден');
        return;
    }

    // Показываем индикатор загрузки
    projectsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #a0a0b0;">
            <i class="fas fa-spinner fa-spin" style="font-size: 3rem; margin-bottom: 20px;"></i>
            <p>Загрузка проектов с GitHub...</p>
        </div>
    `;

    try {
        const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`;
        console.log('📡 Запрос к API:', url);
        
        const response = await fetch(url);
        console.log('📥 Ответ API:', response.status, response.statusText);
        
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('Превышен лимит запросов к GitHub API. Попробуйте позже.');
            }
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const repos = await response.json();
        console.log('✅ Получено репозиториев:', repos.length);
        console.log('Репозитории:', repos.map(r => ({ name: r.name, stars: r.stargazers_count })));
        
        // Фильтруем форки и сортируем по количеству звёзд
        const filteredRepos = repos
            .filter(repo => {
                const isNotFork = !repo.fork;
                console.log(`Repo: ${repo.name}, Fork: ${repo.fork}, Keep: ${isNotFork}`);
                return isNotFork;
            })
            .sort((a, b) => b.stargazers_count - a.stargazers_count);

        console.log('✅ После фильтрации форков:', filteredRepos.length);

        // Очищаем сетку
        projectsGrid.innerHTML = '';

        if (filteredRepos.length === 0) {
            projectsGrid.innerHTML = `
                <p style="grid-column: 1/-1; text-align: center; color: #a0a0b0; padding: 40px;">
                    Нет публичных репозиториев или все репозитории являются форками.
                    <br><br>
                    <a href="https://github.com/${username}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-github"></i> Перейти на GitHub
                    </a>
                </p>`;
            return;
        }

        // Создаём карточки проектов
        filteredRepos.forEach((repo, index) => {
            console.log(`📦 Создаём карточку для: ${repo.name}`);
            const card = createProjectCard(repo, index);
            // Убираем fade-in для динамически загруженных проектов
            card.classList.remove('fade-in');
            projectsGrid.appendChild(card);
        });

    } catch (error) {
        console.error('❌ Ошибка при загрузке проектов:', error);
        projectsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #ef4444;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <p>Не удалось загрузить проекты.</p>
                <p style="color: #a0a0b0; font-size: 0.9rem; margin-top: 10px;">${error.message}</p>
                <a href="https://github.com/${username}" target="_blank" class="btn btn-primary" style="margin-top: 20px;">
                    <i class="fab fa-github"></i> Перейти на GitHub
                </a>
            </div>
        `;
    }
}

/**
 * Создание карточки проекта
 */
function createProjectCard(repo, index) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;

    // Определяем технологии по описанию и языку
    const technologies = detectTechnologies(repo);

    // Форматируем описание - если нет, создаём заглушку
    let description;
    if (repo.description) {
        description = repo.description.length > 150 
            ? repo.description.slice(0, 150) + '...' 
            : repo.description;
    } else {
        // Создаём описание на основе информации о репозитории
        const visibility = repo.private ? '🔒 Private' : '🌍 Public';
        const defaultBranch = repo.default_branch || 'main';
        description = `Репозиторий на языке ${repo.language || 'не указан'}. 
Ветка: ${defaultBranch}. ${visibility}. 
Последнее обновление: ${new Date(repo.updated_at).toLocaleDateString('ru-RU')}.`;
    }

    card.innerHTML = `
        <div class="project-image">
            <div class="project-overlay">
                ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                ` : ''}
                <a href="${repo.html_url}" target="_blank" class="project-github">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
        <div class="project-content">
            <h3>${repo.name}</h3>
            <p>${description}</p>
            <div class="project-tech">
                ${repo.language ? `<span class="tech-primary">${repo.language}</span>` : ''}
                ${technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <div class="project-stats">
                ${repo.stargazers_count > 0 ? `
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                ` : ''}
                ${repo.forks_count > 0 ? `
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                ` : ''}
                <span title="Обновлено: ${new Date(repo.updated_at).toLocaleDateString('ru-RU')}">
                    <i class="fas fa-clock"></i> ${formatDate(repo.updated_at)}
                </span>
            </div>
        </div>
    `;

    return card;
}

/**
 * Определение технологий по репозиторию
 */
function detectTechnologies(repo) {
    const technologies = [];
    const text = `${repo.name} ${repo.description || ''} ${repo.topics?.join(' ') || ''}`.toLowerCase();

    const techMap = {
        'python': 'Python',
        'django': 'Django',
        'fastapi': 'FastAPI',
        'flask': 'Flask',
        'react': 'React',
        'vue': 'Vue',
        'docker': 'Docker',
        'kubernetes': 'K8s',
        'kafka': 'Kafka',
        'rabbitmq': 'RabbitMQ',
        'postgresql': 'PostgreSQL',
        'mongo': 'MongoDB',
        'redis': 'Redis',
        'celery': 'Celery',
        'tensorflow': 'TensorFlow',
        'pytorch': 'PyTorch',
        'javascript': 'JavaScript',
        'typescript': 'TypeScript',
        'c++': 'C++',
        'qt': 'Qt'
    };

    for (const [key, value] of Object.entries(techMap)) {
        if (text.includes(key) && !technologies.includes(value)) {
            technologies.push(value);
        }
    }

    // Ограничиваем количество технологий
    return technologies.slice(0, 5);
}

/**
 * Форматирование даты
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Сегодня';
    if (diffDays === 1) return 'Вчера';
    if (diffDays < 7) return `${diffDays} дн. назад`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} нед. назад`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} мес. назад`;
    return `${Math.floor(diffDays / 365)} г. назад`;
}

// Загружаем проекты при загрузке страницы
document.addEventListener('DOMContentLoaded', loadGitHubProjects);
