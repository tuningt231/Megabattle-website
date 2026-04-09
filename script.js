document.addEventListener('DOMContentLoaded', () => {
    // Обработка месяцев в расписании
    const months = document.querySelectorAll('.month');
    const eventCards = document.querySelectorAll('.event-card');

    // Показываем карточку первого месяца по умолчанию
    if (eventCards.length > 0) {
        eventCards[0].classList.add('active');
    }

    months.forEach((month, index) => {
        month.addEventListener('click', () => {
            // Убираем активный класс со всех карточек
            eventCards.forEach(card => {
                card.classList.remove('active');
            });

            // Добавляем активный класс соответствующей карточке
            if (eventCards[index]) {
                eventCards[index].classList.add('active');
            }

            // Подсвечиваем выбранный месяц
            months.forEach(m => m.classList.remove('active'));
            month.classList.add('active');
        });
    });

    // Обработка фильтров команды
    const teamFilters = document.querySelectorAll('.team-filter');
    const teamGroups = document.querySelectorAll('.team-members-scroll');

    teamFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Убираем активный класс со всех фильтров
            teamFilters.forEach(f => f.classList.remove('active'));
            // Добавляем активный класс нажатому фильтру
            filter.classList.add('active');

            // Получаем группу для отображения
            const targetGroup = filter.getAttribute('data-filter');

            // Скрываем все группы
            teamGroups.forEach(group => {
                group.classList.remove('active');
                if (group.classList.contains(targetGroup)) {
                    group.classList.add('active');
                }
            });
        });
    });

    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация появления элементов при прокрутке
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.story-card, .team-member, .event-card').forEach((el) => {
        observer.observe(el);
    });

    // Обработка кнопки "Построить маршрут"
    const routeButton = document.querySelector('.contact-button');
    if (routeButton) {
        routeButton.addEventListener('click', () => {
            // Здесь можно добавить интеграцию с картами
            window.open('https://maps.google.com?q=ул.+Ломоносова,+д.9,+Санкт-Петербург', '_blank');
        });
    }

    // Team Members Click Handling
    const teamMembers = document.querySelectorAll('.team-member');
    const infoBlocks = document.querySelectorAll('.member-info-expanded');
    let activeInfoBlock = null;
    let activeMember = null;

    // Функция для закрытия активного блока
    const closeActiveBlock = () => {
        if (activeInfoBlock) {
            activeInfoBlock.style.opacity = '0';
            if (activeMember) {
                activeMember.classList.remove('active');
            }
            
            setTimeout(() => {
                activeInfoBlock.classList.remove('active');
                activeInfoBlock = null;
                activeMember = null;
            }, 300);
        }
    };

    teamMembers.forEach(member => {
        member.addEventListener('click', () => {
            const memberId = member.getAttribute('data-member');
            const infoBlock = document.getElementById(`${memberId}-info`);

            // Если кликнули на уже активную карточку
            if (member === activeMember) {
                closeActiveBlock();
                return;
            }

            // Закрываем предыдущий активный блок
            closeActiveBlock();

            // Показываем новый блок
            setTimeout(() => {
                infoBlock.classList.add('active');
                member.classList.add('active');
                
                setTimeout(() => {
                    infoBlock.style.opacity = '1';
                    infoBlock.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 50);

                activeInfoBlock = infoBlock;
                activeMember = member;
            }, activeMember ? 300 : 0);
        });
    });

    // Закрываем активный блок при клике вне карточек
    document.addEventListener('click', (event) => {
        const isClickInsideMember = event.target.closest('.team-member');
        const isClickInsideInfo = event.target.closest('.member-info-expanded');
        
        if (!isClickInsideMember && !isClickInsideInfo) {
            closeActiveBlock();
        }
    });
}); 