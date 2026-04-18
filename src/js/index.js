document.addEventListener('DOMContentLoaded', () => {

    const teamMembers = Array.from(document.querySelectorAll('.team-members-scroll .team-member'));
    const infoBlocks = Array.from(document.querySelectorAll('.member-info-expanded'));

    function closeAllMemberDetails() {
        teamMembers.forEach(member => member.classList.remove('active'));
        infoBlocks.forEach(block => block.classList.remove('active'));
    }

    function openMemberDetails(member) {
        const tag = member.dataset.tag;
        const infoBlock = document.querySelector(`.member-info-expanded[data-tag="${tag}"]`);
        if (!infoBlock) return;

        closeAllMemberDetails();
        member.classList.add('active');
        infoBlock.classList.add('active');
    }


    // Обработка фильтров команды
    function onFilterTeams(tag) {
        // buttons
        document.querySelectorAll('.team-filter').forEach(el => {
            el.classList.toggle('active', tag === el.dataset.tag);
        });
        // cards
        document.querySelectorAll('.team-members-scroll .team-member').forEach(el => {
            el.classList.toggle('hidden', el.dataset.role !== tag);
        });

        // Если открытая карточка уехала под фильтр, закрываем expand блок.
        const activeMember = document.querySelector('.team-members-scroll .team-member.active');
        if (!activeMember || activeMember.classList.contains('hidden')) {
            closeAllMemberDetails();
        }
    }

    document.querySelectorAll('.team-filter').forEach(el => {
        el.addEventListener('click', () => onFilterTeams(el.dataset.tag));
    });

    onFilterTeams('organizers');

    // const teamFilters = document.querySelectorAll('.team-filter');
    // const teamGroups = document.querySelectorAll('.team-members-scroll');

    // teamFilters.forEach(filter => {
    //     filter.addEventListener('click', () => {
    //         // Убираем активный класс со всех фильтров
    //         teamFilters.forEach(f => f.classList.remove('active'));
    //         // Добавляем активный класс нажатому фильтру
    //         filter.classList.add('active');

    //         // Получаем группу для отображения
    //         const targetGroup = filter.getAttribute('data-filter');

    //         // Скрываем все группы
    //         teamGroups.forEach(group => {
    //             group.classList.remove('active');
    //             if (group.classList.contains(targetGroup)) {
    //                 group.classList.add('active');
    //             }
    //         });
    //     });
    // });

    // Плавная прокрутка для навигационных ссылок
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const target = document.querySelector(this.getAttribute('href'));
    //         if (target) {
    //             target.scrollIntoView({
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });

    function onHashChange(hash) {
        if (hash === '#responsible') {
            onFilterTeams('responsible');
        } else if (hash === '#organizers') {
            onFilterTeams('organizers');
        }
    }

    window.addEventListener('hashchange', event => {
        onHashChange(window.location.hash);
    });

    onHashChange(window.location.hash);

    teamMembers.forEach(member => {
        member.addEventListener('click', () => {
            if (member.classList.contains('hidden')) return;

            const isAlreadyActive = member.classList.contains('active');
            if (isAlreadyActive) {
                closeAllMemberDetails();
                return;
            }

            openMemberDetails(member);
        });
    });

    // document.addEventListener('click', (event) => {
    //     const clickedMember = event.target.closest('.team-member');
    //     const clickedInfo = event.target.closest('.member-info-expanded');
    //     if (!clickedMember && !clickedInfo) {
    //         closeAllMemberDetails();
    //     }
    // });

    // Анимация появления элементов при прокрутке
    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.classList.add('visible');
    //         }
    //     });
    // });

    // document.querySelectorAll('.story-card, .team-member, .event-card').forEach((el) => {
    //     observer.observe(el);
    // });

    // Обработка кнопки "Построить маршрут"
    // const routeButton = document.querySelector('.contact-button');
    // if (routeButton) {
    //     routeButton.addEventListener('click', () => {
    //         // Здесь можно добавить интеграцию с картами
    //         window.open('https://maps.google.com?q=ул.+Ломоносова,+д.9,+Санкт-Петербург', '_blank');
    //     });
    // }

    // // Team Members Click Handling
    // const teamMembers = document.querySelectorAll('.team-member');
    // const infoBlocks = document.querySelectorAll('.member-info-expanded');
    // let activeInfoBlock = null;
    // let activeMember = null;

    // // Функция для закрытия активного блока
    // const closeActiveBlock = () => {
    //     if (activeInfoBlock) {
    //         activeInfoBlock.style.opacity = '0';
    //         if (activeMember) {
    //             activeMember.classList.remove('active');
    //         }
            
    //         setTimeout(() => {
    //             activeInfoBlock.classList.remove('active');
    //             activeInfoBlock = null;
    //             activeMember = null;
    //         }, 300);
    //     }
    // };

    // teamMembers.forEach(member => {
    //     member.addEventListener('click', () => {
    //         const memberId = member.getAttribute('data-member');
    //         const infoBlock = document.getElementById(`${memberId}-info`);

    //         // Если кликнули на уже активную карточку
    //         if (member === activeMember) {
    //             closeActiveBlock();
    //             return;
    //         }

    //         // Закрываем предыдущий активный блок
    //         closeActiveBlock();

    //         // Показываем новый блок
    //         setTimeout(() => {
    //             infoBlock.classList.add('active');
    //             member.classList.add('active');
                
    //             setTimeout(() => {
    //                 infoBlock.style.opacity = '1';
    //                 infoBlock.scrollIntoView({ 
    //                     behavior: 'smooth', 
    //                     block: 'nearest' 
    //                 });
    //             }, 50);

    //             activeInfoBlock = infoBlock;
    //             activeMember = member;
    //         }, activeMember ? 300 : 0);
    //     });
    // });

    // // Закрываем активный блок при клике вне карточек
    // document.addEventListener('click', (event) => {
    //     const isClickInsideMember = event.target.closest('.team-member');
    //     const isClickInsideInfo = event.target.closest('.member-info-expanded');
        
    //     if (!isClickInsideMember && !isClickInsideInfo) {
    //         closeActiveBlock();
    //     }
    // });
}); 