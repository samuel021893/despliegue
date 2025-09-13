// BMW Motorrad - JavaScript

// Variables globales
let currentSection = 'inicio';
let isLoading = true;
let animationId = null;

// Elementos del DOM
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const modal = document.getElementById('modal');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.getElementById('modal-body');
const header = document.querySelector('.header');
const loadingScreen = document.getElementById('loading');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Datos de los modelos
const modelData = {
    s1000rr: {
        name: 'BMW S 1000 RR',
        category: 'Sport',
        description: 'La superbike más potente y tecnológicamente avanzada de BMW.',
        specs: {
            power: '207 HP',
            torque: '113 Nm',
            weight: '197 kg',
            topSpeed: '299 km/h',
            acceleration: '3.1 s (0-100 km/h)'
        },
        features: [
            'Motor de 999 cc con 207 HP',
            'Suspensión electrónica DDC',
            'Modos de conducción Pro',
            'ABS Pro y DTC',
            'Winglets aerodinámicos',
            'Escape Akrapovič de serie'
        ],
        price: 'Desde €18,950'
    },
    r1250gs: {
        name: 'BMW R 1250 GS',
        category: 'Adventure',
        description: 'La aventurera más vendida del mundo, lista para cualquier terreno.',
        specs: {
            power: '136 HP',
            torque: '143 Nm',
            weight: '249 kg',
            topSpeed: '200 km/h',
            fuelCapacity: '20 litros'
        },
        features: [
            'Motor Boxer de 1254 cc',
            'Tecnología ShiftCam',
            'Suspensión ESA electrónica',
            'Modos de conducción Enduro Pro',
            'ABS Pro y ASC',
            'Protección contra caídas'
        ],
        price: 'Desde €16,750'
    },
    m1000rr: {
        name: 'BMW M 1000 RR',
        category: 'Sport',
        description: 'La M más radical, desarrollada para la pista pero homologada para calle.',
        specs: {
            power: '212 HP',
            torque: '113 Nm',
            weight: '192 kg',
            topSpeed: '306 km/h',
            acceleration: '3.0 s (0-100 km/h)'
        },
        features: [
            'Motor M optimizado de 999 cc',
            'Piezas de fibra de carbono',
            'Winglets M aerodinámicos',
            'Suspensión Öhlins',
            'Frenos Brembo M',
            'Modos de conducción Race Pro'
        ],
        price: 'Desde €34,900'
    },
    k1600gtl: {
        name: 'BMW K 1600 GTL',
        category: 'Touring',
        description: 'El gran turismo definitivo para viajes largos con máximo confort.',
        specs: {
            power: '160 HP',
            torque: '175 Nm',
            weight: '348 kg',
            topSpeed: '200 km/h',
            fuelCapacity: '26.5 litros'
        },
        features: [
            'Motor de 6 cilindros en línea',
            'Sistema de navegación BMW',
            'Audio premium',
            'Calefacción de asientos',
            'Control de crucero adaptativo',
            'Maletas integradas'
        ],
        price: 'Desde €24,950'
    },
    ce04: {
        name: 'BMW CE 04',
        category: 'Urban Mobility',
        description: 'El futuro de la movilidad urbana con propulsión 100% eléctrica.',
        specs: {
            power: '42 HP',
            torque: '62 Nm',
            weight: '231 kg',
            range: '130 km',
            chargingTime: '4.2 horas'
        },
        features: [
            'Motor eléctrico BMW eDrive',
            'Batería de alta capacidad',
            'Conectividad BMW OS',
            'Carga rápida',
            'Diseño futurista',
            'Cero emisiones locales'
        ],
        price: 'Desde €11,990'
    },
    f850gs: {
        name: 'BMW F 850 GS',
        category: 'Adventure',
        description: 'Aventura accesible con la calidad y tecnología BMW.',
        specs: {
            power: '90 HP',
            torque: '92 Nm',
            weight: '229 kg',
            topSpeed: '200 km/h',
            fuelCapacity: '15 litros'
        },
        features: [
            'Motor bicilíndrico paralelo',
            'ABS para curvas',
            'Modos de conducción',
            'Suspensión ajustable',
            'Protección contra caídas',
            'Gran capacidad off-road'
        ],
        price: 'Desde €12,950'
    }
};

// Event Listeners principales
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    startLoadingSequence();
});

// Inicialización de la aplicación
function initializeApp() {
    console.log('🏍️ BMW Motorrad App iniciada');
    
    // Configurar intersection observer para animaciones
    setupScrollAnimations();
    
    // Inicializar contadores
    setupCounters();
    
    // Configurar filtros de modelos
    setupModelFilters();
    
    // Configurar formulario
    setupContactForm();
    
    console.log('✅ BMW Motorrad App lista');
}

// Configurar event listeners
function setupEventListeners() {
    // Navegación
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionName = this.dataset.section;
            navigateToSection(sectionName);
            logEvent('Navigation', { section: sectionName });
        });
    });
    
    // Modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Teclas de acceso rápido
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Scroll del header
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Menu toggle para móviles
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Resize para responsive
    window.addEventListener('resize', handleResize);
    
    // Eventos de hover para efectos
    setupHoverEffects();
}

// Secuencia de carga
function startLoadingSequence() {
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                isLoading = false;
                
                // Iniciar animaciones de entrada
                startEntryAnimations();
            }, 500);
        }
    }, 2000);
}

// Animaciones de entrada
function startEntryAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const heroStats = document.querySelector('.hero-stats');
    
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
    
    if (heroStats) {
        setTimeout(() => {
            heroStats.classList.add('slide-in-left');
            animateCounters();
        }, 500);
    }
}

// Navegación entre secciones
function navigateToSection(sectionName) {
    // Actualizar navegación activa
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-section="${sectionName}"]`)?.classList.add('active');
    
    // Ocultar todas las secciones
    sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('fade-in');
    });
    
    // Mostrar sección seleccionada
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('fade-in');
        
        // Scroll suave
        setTimeout(() => {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
        
        // Efectos específicos por sección
        handleSectionSpecificEffects(sectionName);
    }
    
    currentSection = sectionName;
    
    // Cerrar menú móvil si está abierto
    if (navMenu && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// Efectos específicos por sección
function handleSectionSpecificEffects(sectionName) {
    switch(sectionName) {
        case 'modelos':
            animateModelCards();
            break;
        case 'tecnologia':
            animateTechCards();
            break;
        case 'historia':
            animateTimeline();
            break;
        case 'contacto':
            animateContactMethods();
            break;
        default:
            break;
    }
}

// Animación de tarjetas de modelos
function animateModelCards() {
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// Animación de tarjetas de tecnología
function animateTechCards() {
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('slide-in-left');
        }, index * 200);
    });
}

// Animación de timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
            item.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 50);
        }, index * 300);
    });
}

// Animación de métodos de contacto
function animateContactMethods() {
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        setTimeout(() => {
            method.classList.add('slide-in-right');
        }, index * 150);
    });
}

// Configurar contadores animados
function setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counter.style.opacity = '0';
    });
}

// Animar contadores
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const increment = target / 60; // 60 frames para la animación
        let current = 0;
        
        counter.style.opacity = '1';
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 25);
    });
}

// Configurar filtros de modelos
function setupModelFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modelCards = document.querySelectorAll('.model-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar modelos
            modelCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            logEvent('Filter', { category: filter });
        });
    });
}

// Abrir modal
function openModal(type, data = {}) {
    if (!modal || !modalBody) return;
    
    let content = '';
    
    switch(type) {
        case 'welcome':
            content = generateWelcomeModal();
            break;
        default:
            if (modelData[type]) {
                content = generateModelModal(modelData[type]);
            }
            break;
    }
    
    modalBody.innerHTML = content;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Animación de entrada
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.transition = 'opacity 0.3s ease';
    }, 10);
    
    logEvent('Modal Opened', { type });
}

// Cerrar modal
function closeModal() {
    if (!modal) return;
    
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
    
    logEvent('Modal Closed');
}

// Generar contenido del modal de bienvenida
function generateWelcomeModal() {
    return `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🏍️</div>
            <h2 style="color: var(--bmw-blue); margin-bottom: 1rem;">¡Bienvenido a BMW Motorrad!</h2>
            <p style="margin-bottom: 2rem; line-height: 1.6;">
                Descubre la perfecta combinación de innovación alemana, rendimiento excepcional y 
                diseño vanguardista en cada una de nuestras motocicletas.
            </p>
            <div style="background: var(--bmw-gray); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
                <h3 style="color: var(--bmw-blue); margin-bottom: 1rem;">¿Por qué elegir BMW?</h3>
                <ul style="text-align: left; list-style: none; line-height: 1.8;">
                    <li>✓ 100 años de innovación y experiencia</li>
                    <li>✓ Tecnología de vanguardia en cada modelo</li>
                    <li>✓ Red de servicio mundial</li>
                    <li>✓ Calidad alemana garantizada</li>
                </ul>
            </div>
            <button class="btn btn-primary" onclick="closeModal(); navigateToSection('modelos');">
                Explorar Modelos
            </button>
        </div>
    `;
}

// Generar contenido del modal de modelo
function generateModelModal(model) {
    return `
        <div>
            <h2 style="color: var(--bmw-blue); margin-bottom: 0.5rem;">${model.name}</h2>
            <p style="color: var(--bmw-accent); font-weight: 600; margin-bottom: 1.5rem;">${model.category}</p>
            
            <div style="background: linear-gradient(135deg, var(--bmw-blue), var(--bmw-light-blue)); 
                        height: 200px; border-radius: 10px; margin-bottom: 1.5rem; 
                        display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                ${model.name.split(' ').slice(-2).join(' ')}
            </div>
            
            <p style="margin-bottom: 2rem; line-height: 1.6;">${model.description}</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div>
                    <h3 style="color: var(--bmw-blue); margin-bottom: 1rem;">Especificaciones</h3>
                    <ul style="list-style: none; line-height: 1.8;">
                        ${Object.entries(model.specs).map(([key, value]) => 
                            `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</li>`
                        ).join('')}
                    </ul>
                </div>
                <div>
                    <h3 style="color: var(--bmw-blue); margin-bottom: 1rem;">Características</h3>
                    <ul style="list-style: none; line-height: 1.8;">
                        ${model.features.slice(0, 3).map(feature => 
                            `<li>✓ ${feature}</li>`
                        ).join('')}
                    </ul>
                </div>
            </div>
            
            <div style="background: var(--bmw-gray); padding: 1.5rem; border-radius: 10px; text-align: center;">
                <h3 style="color: var(--bmw-blue); margin-bottom: 0.5rem;">${model.price}</h3>
                <p style="margin-bottom: 1rem;">*Precio orientativo, consulta en tu concesionario</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="closeModal(); navigateToSection('contacto');">
                        Solicitar Información
                    </button>
                    <button class="btn btn-outline" onclick="closeModal();">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Configurar formulario de contacto
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

// Manejar envío del formulario
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simular envío del formulario
    showFormSuccess();
    form.reset();
    
    logEvent('Form Submitted', data);
}

// Mostrar mensaje de éxito del formulario
function showFormSuccess() {
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: var(--bmw-blue); 
                    color: white; padding: 1rem 2rem; border-radius: 10px; z-index: 3000;
                    box-shadow: var(--shadow); animation: slideInRight 0.5s ease;">
            ✓ ¡Solicitud enviada correctamente! Nos pondremos en contacto contigo pronto.
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 3000);
}

// Manejar scroll del header
function handleHeaderScroll() {
    if (!header) return;
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Atajos de teclado
function handleKeyboardShortcuts(e) {
    if (isLoading) return;
    
    switch(e.key) {
        case 'Escape':
            if (modal && modal.style.display === 'flex') {
                closeModal();
            }
            break;
        case '1':
            navigateToSection('inicio');
            break;
        case '2':
            navigateToSection('modelos');
            break;
        case '3':
            navigateToSection('tecnologia');
            break;
        case '4':
            navigateToSection('historia');
            break;
        case '5':
            navigateToSection('contacto');
            break;
    }
}

// Toggle menú móvil
function toggleMobileMenu() {
    if (!navMenu || !menuToggle) return;
    
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Animar hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
}

// Manejar redimensionamiento
function handleResize() {
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    }
}

// Configurar animaciones de scroll
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animaciones específicas para ciertos elementos
                if (entry.target.classList.contains('feature-card')) {
                    const cards = entry.target.parentElement.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.transform = 'translateY(0)';
                            card.style.opacity = '1';
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos con animación
    const animatedElements = document.querySelectorAll('.feature-card, .tech-card, .model-card, .milestone');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Configurar efectos hover
function setupHoverEffects() {
    // Efecto en el logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Easter egg - doble click en el logo
        let clickCount = 0;
        logo.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 2) {
                showEasterEgg();
                clickCount = 0;
            }
            setTimeout(() => { clickCount = 0; }, 500);
        });
    }
    
    // Efecto parallax suave en hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Easter egg
function showEasterEgg() {
    const easterEgg = document.createElement('div');
    easterEgg.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, var(--bmw-blue), var(--bmw-dark-blue));
                    color: white; padding: 2rem; border-radius: 20px; text-align: center;
                    z-index: 4000; box-shadow: var(--shadow-hover); animation: fadeIn 0.5s ease;">
            <h2 style="margin-bottom: 1rem;">🏍️ ¡BMW Motorrad!</h2>
            <p>Sheer Riding Pleasure desde 1923</p>
            <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 1rem;">
                100 años creando momentos inolvidables
            </p>
        </div>
    `;
    
    document.body.appendChild(easterEgg);
    
    setTimeout(() => {
        easterEgg.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(easterEgg);
        }, 500);
    }, 3000);
}

// Scroll suave a sección
function scrollToSection(sectionName) {
    const section = document.getElementById(sectionName);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Sistema de logging
function logEvent(event, data = {}) {
    console.log(`🏍️ BMW Motorrad - ${event}:`, data);
    
    // Aquí se podría enviar a analytics reales
    if (window.gtag) {
        window.gtag('event', event.toLowerCase().replace(' ', '_'), data);
    }
}

// Utilidades
const Utils = {
    // Formatear números
    formatNumber: (num) => {
        return new Intl.NumberFormat().format(num);
    },
    
    // Generar ID único
    generateId: () => {
        return 'bmw_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Validar email
    isValidEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Detectar dispositivo móvil
    isMobile: () => {
        return window.innerWidth <= 768;
    },
    
    // Throttle function
    throttle: (func, delay) => {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
};

// Optimizar performance con throttle
const throttledScroll = Utils.throttle(handleHeaderScroll, 10);
window.addEventListener('scroll', throttledScroll);

// Prevenir comportamientos por defecto en ciertos elementos
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Manejar visibilidad de la página
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pausar animaciones cuando la página no está visible
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    } else {
        // Reanudar animaciones
        if (!isLoading) {
            startEntryAnimations();
        }
    }
});

// Exportar funciones globales necesarias
window.openModal = openModal;
window.closeModal = closeModal;
window.navigateToSection = navigateToSection;
window.scrollToSection = scrollToSection;

// Mensaje de bienvenida en consola
console.log(`
🏍️ BMW Motorrad Web App
━━━━━━━━━━━━━━━━━━━━━━
Sheer Riding Pleasure
Desarrollado con ❤️ para los amantes de BMW
━━━━━━━━━━━━━━━━━━━━━━
Atajos de teclado:
• 1-5: Navegar entre secciones
• ESC: Cerrar modal
• Doble click en logo: Sorpresa 😉
━━━━━━━━━━━━━━━━━━━━━━
`);