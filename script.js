// Основной скрипт для сайта

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== НАСТРОЙКА ФОРМ =====
    // Замените эти ID на ваши реальные ID с Formspree
    const FORMSPREE_ORDER_FORM_ID = 'YOUR_FORM_ID_HERE';
    const FORMSPREE_CONSULT_FORM_ID = 'YOUR_CONSULT_FORM_ID_HERE';
    
    // Обновляем action у форм
    const orderForm = document.getElementById('main-form');
    const consultForm = document.getElementById('consult-form');
    
    if (orderForm) {
        orderForm.action = `https://formspree.io/f/${FORMSPREE_ORDER_FORM_ID}`;
    }
    
    if (consultForm) {
        consultForm.action = `https://formspree.io/f/${FORMSPREE_CONSULT_FORM_ID}`;
    }
    
    // ===== МОДАЛЬНОЕ ОКНО КОНСУЛЬТАЦИИ =====
    const modal = document.getElementById('consult-modal');
    const openModalBtn = document.getElementById('open-consult');
    const closeModalBtn = document.querySelector('.close-modal');
    const consultButtons = document.querySelectorAll('a[href="#consult-form"]');
    
    // Открытие модального окна
    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку
    }
    
    // Закрытие модального окна
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Возвращаем прокрутку
    }
    
    // Обработчики событий
    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Все кнопки "Бесплатная консультация"
    consultButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });
    
    // Закрытие по клику вне окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ===== ВЫБОР УСЛУГИ =====
    const serviceButtons = document.querySelectorAll('.btn-service');
    const serviceTypeSelect = document.getElementById('service-type');
    const selectedServiceInput = document.getElementById('selected-service');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            
            // Прокручиваем к форме
            document.getElementById('order-form').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Устанавливаем выбранную услугу
            if (selectedServiceInput) {
                selectedServiceInput.value = serviceName;
            }
            
            if (serviceTypeSelect) {
                serviceTypeSelect.value = serviceName;
            }
            
            // Фокус на поле имени
            setTimeout(() => {
                document.getElementById('name').focus();
            }, 500);
        });
    });
    
    // ===== ОТПРАВКА ФОРМ =====
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Показываем индикатор загрузки
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitButton.disabled = true;
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Успешная отправка
                    if (this.id === 'main-form') {
                        // Показываем сообщение об успехе
                        this.style.display = 'none';
                        document.getElementById('success-message').style.display = 'block';
                    } else {
                        // Для модального окна
                        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                        closeModal();
                        this.reset();
                    }
                } else {
                    throw new Error('Ошибка отправки формы');
                }
            } catch (error) {
                alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.');
                console.error('Form error:', error);
            } finally {
                // Восстанавливаем кнопку
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    });
    
    // ===== АНИМАЦИЯ ПРИ ПРОКРУТКЕ =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .advantage-item, .step-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Инициализация анимации
    const animatedElements = document.querySelectorAll('.service-card, .advantage-item, .step-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Запускаем сразу для видимых элементов
    animateOnScroll();
    
    // ===== ПЛАВНАЯ ПРОКРУТКА ДЛЯ ВСЕХ ВНУТРЕННИХ ССЫЛОК =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем якоря для форм и модальных окон
            if (href === '#order-form' || href === '#consult-form') {
                return;
            }
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== МАСКА ДЛЯ ТЕЛЕФОНА =====
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
                value = value.substring(0, 18);
            }
            
            this.value = value;
        });
    }
    
    // ===== МОДАЛЬНОЕ ОКНО ДЛЯ ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ =====
    const privacyModal = document.getElementById('privacy-modal');
    const privacyLink = document.getElementById('privacy-link');
    const closePrivacyModal = document.querySelector('#privacy-modal .close-modal');

    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    if (closePrivacyModal) {
        closePrivacyModal.addEventListener('click', function() {
            privacyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (privacyModal) {
        privacyModal.addEventListener('click', function(e) {
            if (e.target === privacyModal) {
                privacyModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    console.log('Сайт 3НДФЛ успешно загружен!');
});
