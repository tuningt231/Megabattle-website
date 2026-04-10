class ITMOMap {
    constructor(containerId) {
        this.containerId = containerId;
        this.map = null;
        this.placemark = null;
        this.coordinates = [59.927228, 30.338342]; // Координаты ИТМО на Ломоносова
        this.zoom = 16;
    }

    async init() {
        try {
            await this.loadYandexMapsAPI();
            await this.createMap();
        } catch (error) {
            console.error('Ошибка при инициализации карты:', error);
        }
    }

    loadYandexMapsAPI() {
        return new Promise((resolve, reject) => {
            if (typeof ymaps !== 'undefined') {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=f57e94dd-1b77-4672-8e24-d6cc20f24d06&lang=ru_RU';
            script.async = true;
            script.onload = () => {
                ymaps.ready(resolve);
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async createMap() {
        this.map = new ymaps.Map(this.containerId, {
            center: this.coordinates,
            zoom: this.zoom,
            controls: ['zoomControl', 'fullscreenControl']
        });

        this.placemark = new ymaps.Placemark(this.coordinates, {
            balloonContent: 'Университет ИТМО<br>ул. Ломоносова, д.9'
        }, {
            preset: 'islands#blueEducationIcon'
        });

        this.map.geoObjects.add(this.placemark);
    }

    // Метод для построения маршрута от текущего местоположения
    async buildRoute(fromCoordinates) {
        if (!this.map) return;

        const multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: [
                fromCoordinates,
                this.coordinates
            ],
            params: {
                routingMode: 'auto'
            }
        });

        this.map.geoObjects.add(multiRoute);
        
        // Подстраиваем карту под маршрут
        multiRoute.model.events.add('requestsuccess', function() {
            this.map.setBounds(multiRoute.getBounds(), {
                checkZoomRange: true
            });
        }.bind(this));
    }

    // Получение текущего местоположения пользователя
    async getUserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Геолокация не поддерживается вашим браузером'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Метод для построения маршрута от текущего местоположения пользователя
    async buildRouteFromCurrentLocation() {
        try {
            const userCoordinates = await this.getUserLocation();
            await this.buildRoute(userCoordinates);
        } catch (error) {
            console.error('Ошибка при построении маршрута:', error);
            alert('Не удалось определить ваше местоположение. Пожалуйста, проверьте настройки геолокации в браузере.');
        }
    }
}

document.querySelector('.contact-button').addEventListener('click', function() {
    // Координаты ИТМО (ул. Ломоносова, д.9)
    const destination = '59.926503, 30.338712';
    // Открываем Яндекс Карты с построением маршрута
    window.open(`https://yandex.ru/maps/?rtext=~${destination}&rtt=auto`, '_blank');
}); 