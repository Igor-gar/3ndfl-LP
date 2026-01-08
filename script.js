// script.js - ПОЛНЫЙ ИСПРАВЛЕННЫЙ ФАЙЛ

document.addEventListener('DOMContentLoaded', function() {
    console.log('Документ загружен, инициализация скриптов...');
    
    // ===== ПЕРЕМЕННЫЕ И ЭЛЕМЕНТЫ =====
    const serviceButtons = document.querySelectorAll('.btn-service');
    const serviceTypeSelect = document.getElementById('service-type');
    const selectedServiceInput = document.getElementById('selected-service');
    const orderForm = document.getElementById('main-form');
    const successMessage = document.getElementById('success-message');
    const consultModal = document.getElementById('consult-modal');
    const consultForm = document.getElementById('consult-form');
    const openConsultBtn = document.querySelector('.btn-secondary.btn-large[href="#consult-form"]');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // ===== ПРОВЕРКА ЭЛЕМЕНТОВ =====
    console.log('Найдено кнопок услуг:', serviceButtons.length);
    console.log('Форма заказа найдена:', !!orderForm);
    console.log('Модальное окно найдено:', !!consultModal);
    
    // ===== ОБРАБОТКА КНОПОК УСЛУГ =====
    if (serviceButtons.length > 0) {
        serviceButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const service = this.getAttribute('data-service');
                console.log('Выбрана услуга:', service);
                
                // Устанавливаем значение в скрытое поле
                if (selectedServiceInput) {
                    selectedServiceInput.value = service;
                    console.log('Установлено в скрытое поле:', selectedServiceInput.value);
                }
                
                // Устанавливаем значение в выпадающий список
                if (serviceTypeSelect) {
                    for (let i = 0; i < serviceTypeSelect.options.length; i++) {
                        if (serviceTypeSelect.options[i].value === service) {
                            serviceTypeSelect.selectedIndex = i;
                            console.log('Выбрано в select:', serviceTypeSelect.value);
                            break;
                        }
                    }
                }
                
                // Прокручиваем к форме заказа
                const orderFormSection = document.getElementById('order-form');
                if (orderFormSection) {
                    orderFormSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Добавляем небольшой отступ после прокрутки
                    setTimeout(() => {
                        window.scrollBy(0, -80);
                    }, 500);
                }
            });
        });
    }
    
    // ===== МОДАЛЬНОЕ ОКНО ДЛЯ КОНСУЛЬТАЦИИ =====
    // Открытие модального окна
    if (openConsultBtn && consultModal) {
        // Заменяем href на обработчик события
        openConsultBtn.href = 'javascript:void(0);';
        
        openConsultBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Открытие модального окна консультации');
            consultModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '15px'; // Для компенсации скроллбара
            
            // Фокус на первое поле формы
            setTimeout(() => {
                const firstInput = consultModal.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 100);
        });
    }
    
    // Закрытие модального окна по крестику
    if (closeModalBtn && consultModal) {
        closeModalBtn.addEventListener('click', function() {
            console.log('Закрытие модального окна');
            consultModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '';
        });
    }
    
    // Закрытие модального окна по клику вне его
    if (consultModal) {
        consultModal.addEventListener('click', function(e) {
            if (e.target === consultModal) {
                console.log('Закрытие модального окна по клику вне');
                consultModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                document.body.style.paddingRight = '';
            }
        });
    }
    
    // Закрытие модального окна по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && consultModal && consultModal.style.display === 'flex') {
            console.log('Закрытие модального окна по Escape');
            consultModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '';
        }
    });
    
    // ===== ОБРАБОТКА ОТПРАВКИ ФОРМЫ ЗАКАЗА =====
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Отправка формы заказа');
            
            // Простая валидация
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            const agreement = document.getElementById('agreement');
            
            let isValid = true;
            
            // Проверка обязательных полей
            if (!name.value.trim()) {
                showError(name, 'Введите ваше имя');
                isValid = false;
            } else {
                clearError(name);
            }
            
            if (!phone.value.trim()) {
                showError(phone, 'Введите ваш телефон');
                isValid = false;
            } else {
                clearError(phone);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Введите ваш email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Введите корректный email');
                isValid = false;
            } else {
                clearError(email);
            }
            
            if (!agreement.checked) {
                showError(agreement, 'Необходимо согласие на обработку данных');
                isValid = false;
            } else {
                clearError(agreement);
            }
            
            if (!isValid) {
                console.log('Форма не прошла валидацию');
                return;
            }
            
            // Если валидация прошла успешно
            console.log('Данные формы:', {
                name: name.value,
                phone: phone.value,
                email: email.value,
                service: serviceTypeSelect ? serviceTypeSelect.value : 'Не указано'
            });
            
            // В реальном проекте здесь будет AJAX запрос к Formspree
            // Для демонстрации просто показываем сообщение об успехе
            
            // Скрываем форму
            orderForm.style.display = 'none';
            
            // Показываем сообщение об успехе
            if (successMessage) {
                successMessage.style.display = 'block';
                console.log('Показано сообщение об успехе');
            }
            
            // Прокручиваем к сообщению об успехе
            if (successMessage) {
                successMessage.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }
            
            // Очищаем форму (если нужно будет сбросить)
            // orderForm.reset();
            
            // В реальном проекте здесь должен быть fetch запрос:
            /*
            const formData = new FormData(orderForm);
            fetch(orderForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    orderForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                } else {
                    alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
                }
            })
            .catch(error => {
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
            });
            */
        });
    }
    
    // ===== ОБРАБОТКА ОТПРАВКИ ФОРМЫ КОНСУЛЬТАЦИИ =====
    if (consultForm) {
        consultForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Отправка формы консультации');
            
            // Простая валидация
            const inputs = consultForm.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    showError(input, 'Это поле обязательно для заполнения');
                    isValid = false;
                } else {
                    clearError(input);
                }
            });
            
            if (!isValid) {
                console.log('Форма консультации не прошла валидацию');
                return;
            }
            
            // Если валидация прошла успешно
            console.log('Данные формы консультации:', {
                name: consultForm.querySelector('input[name="name"]').value,
                phone: consultForm.querySelector('input[name="phone"]').value,
                email: consultForm.querySelector('input[name="email"]').value,
                question: consultForm.querySelector('textarea[name="question"]').value
            });
            
            // Показываем сообщение
            alert('Спасибо! Мы свяжемся с вами для консультации в ближайшее время.');
            
            // Закрываем модальное окно
            if (consultModal) {
                consultModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                document.body.style.paddingRight = '';
            }
            
            // Очищаем форму
            consultForm.reset();
        });
    }
    
    // ===== МАСКА ДЛЯ ТЕЛЕФОНА =====
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            // Форматируем номер
            let formattedValue = '';
            if (value.length > 0) {
                formattedValue = '+7';
                if (value.length > 1) {
                    formattedValue += ' (' + value.substring(1, 4);
                }
                if (value.length >= 4) {
                    formattedValue += ') ' + value.substring(4, 7);
                }
                if (value.length >= 7) {
                    formattedValue += '-' + value.substring(7, 9);
                }
                if (value.length >= 9) {
                    formattedValue += '-' + value.substring(9, 11);
                }
            }
            
            this.value = formattedValue;
            
            // Проверяем длину номера (11 цифр включая 7)
            if (value.length === 11) {
                clearError(this);
            }
        });
        
        // Убираем нецифровые символы при вставке
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const numbers = pastedText.replace(/\D/g, '');
            this.value = numbers;
            this.dispatchEvent(new Event('input'));
        });
    });
    
    // ===== ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем якорь для модального окна и пустые ссылки
            if (href === '#consult-form' || href === '#') {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Если это форма заказа, фокус на первое поле
                if (href === '#order-form') {
                    setTimeout(() => {
                        const firstInput = targetElement.querySelector('input');
                        if (firstInput) firstInput.focus();
                    }, 800);
                }
            }
        });
    });
    
    // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
    function showError(element, message) {
        // Убираем предыдущие ошибки
        clearError(element);
        
        // Добавляем класс ошибки
        element.classList.add('error');
        
        // Создаем элемент с сообщением об ошибке
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        
        // Вставляем сообщение после элемента
        if (element.type === 'checkbox') {
            element.parentNode.parentNode.appendChild(errorDiv);
        } else {
            element.parentNode.appendChild(errorDiv);
        }
    }
    
    function clearError(element) {
        // Убираем класс ошибки
        element.classList.remove('error');
        
        // Убираем сообщение об ошибке
        const errorMessage = element.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===== ДОПОЛНИТЕЛЬНЫЕ СТИЛИ ДЛЯ ОШИБОК =====
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: #e74c3c !important;
            background-color: #fff8f8 !important;
        }
        
        .error:focus {
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2) !important;
        }
        
        input.error, select.error, textarea.error {
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Все скрипты успешно инициализированы!');
});
