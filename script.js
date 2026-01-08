document.addEventListener('DOMContentLoaded', function() {
    // Функция для обработки кликов на кнопки услуг
    const serviceButtons = document.querySelectorAll('.btn-service');
    const serviceTypeSelect = document.getElementById('service-type');
    const selectedServiceInput = document.getElementById('selected-service');
    const orderForm = document.getElementById('order-form');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            
            // Устанавливаем значение в скрытое поле
            selectedServiceInput.value = service;
            
            // Устанавливаем значение в выпадающий список
            if (serviceTypeSelect) {
                for (let i = 0; i < serviceTypeSelect.options.length; i++) {
                    if (serviceTypeSelect.options[i].value === service) {
                        serviceTypeSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            
            // Прокручиваем к форме заказа
            if (orderForm) {
                orderForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Модальное окно для консультации
    const consultModal = document.getElementById('consult-modal');
    const openConsultBtn = document.querySelector('.btn-secondary.btn-large[href="#consult-form"]');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Изменяем ссылку на кнопку открытия модального окна
    if (openConsultBtn) {
        openConsultBtn.href = '#';
        openConsultBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (consultModal) {
                consultModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Блокируем скролл
            }
        });
    }
    
    // Закрытие модального окна по крестику
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            if (consultModal) {
                consultModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Восстанавливаем скролл
            }
        });
    }
    
    // Закрытие модального окна по клику вне его
    if (consultModal) {
        consultModal.addEventListener('click', function(e) {
            if (e.target === consultModal) {
                consultModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Обработка отправки формы
    const mainForm = document.getElementById('main-form');
    const successMessage = document.getElementById('success-message');
    
    if (mainForm) {
        mainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // В реальном проекте здесь был бы AJAX запрос к Formspree
            // Для демонстрации просто показываем сообщение об успехе
            
            // Скрываем форму
            mainForm.style.display = 'none';
            
            // Показываем сообщение об успехе
            if (successMessage) {
                successMessage.style.display = 'block';
            }
            
            // Прокручиваем к сообщению об успехе
            if (successMessage) {
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }
            
            // В реальном проекте здесь был бы код отправки формы:
            /*
            const formData = new FormData(mainForm);
            fetch(mainForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    mainForm.style.display = 'none';
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
    
    // Обработка отправки формы консультации
    const consultForm = document.getElementById('consult-form');
    
    if (consultForm) {
        consultForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // В реальном проекте здесь был бы AJAX запрос
            alert('Спасибо! Мы свяжемся с вами для консультации в ближайшее время.');
            
            // Закрываем модальное окно
            if (consultModal) {
                consultModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            // Очищаем форму
            consultForm.reset();
        });
    }
    
    // Маска для телефона (базовая реализация)
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 1) {
                    value = '+7 (' + value;
                } else if (value.length <= 4) {
                    value = '+7 (' + value.substring(1, 4);
                } else if (value.length <= 7) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7);
                } else if (value.length <= 9) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9);
                } else {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
                }
            }
            
            this.value = value;
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем якорь для модального окна
            if (href === '#consult-form') {
                return;
            }
            
            // Пропускаем пустые ссылки
            if (href === '#') {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Учитываем высоту шапки
                    behavior: 'smooth'
                });
            }
        });
    });
});
