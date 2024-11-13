// Botón para abrir la tienda
const openStoreBtn = document.getElementById('openStoreBtn');
const appStoreModal = document.getElementById('appStoreModal');
const appContainer = document.getElementById('appContainer');

// Agregar la aplicación "Updates" a la tienda
const updatesApp = {
    name: 'Updates',
    version: '1.0.0',
    lastUpdated: '2024-10-31'
};


let installedApps = [];




const apps = [
    { name: 'Calculadora', installed: false },
    { name: 'Reloj', installed: false },
    { name: 'Notas', installed: false },
    { name: 'Animal AI View', installed: false },
    { name: 'CheckMate', installed: false },
    { name: 'Updates', installed: false },
    { name: 'Calendario', installed: false },
    { name: 'Mixer', installed: false },
    { name: 'RNG', installed: false },
    { name: 'Enciclopedia Animales Extintos', installed: false }, // Nueva app
    { name: 'Sugerir App', installed: false }, // Nueva app para sugerir una app
    { name: 'Prompt de AllApp', installed: false }, // Nueva app para el prompt de descripción
    { name: 'Reproductor de Música', installed: false }, // Nueva app de Reproductor de Música
    { name: 'Crear Proyectos', installed: false }, // Nueva app de Reproductor de Música
    { name: 'Clima', installed: false }, // Nueva app de Clima de Montevideo
    { name: 'Editor de Código', installed: false }, // Nueva app de Editor de Código
    { name: 'Clicker Indefinido', installed: false }, // Nueva app Clicker Indefinido
    { name: 'Brújula', installed: false }, // Nueva app Brújula
    { name: 'Detector de Movimiento', installed: false }, // Nueva app Detector de Movimiento
    { name: 'Estado del Sistema' }, // Nueva app Estado del Sistema
    { name: 'Horóscopo' }, // Nuevo comando Horóscopo
    { name: 'Calculadora de Tiempo' }, // Nuevo comando Calculadora de Tiempo
];

// Función para abrir la tienda
openStoreBtn.addEventListener('click', () => {
    appStoreModal.style.display = 'flex';
});

// Cerrar el modal
function closeModal() {
    appStoreModal.style.display = 'none';
}

// Función de instalación actualizada para usar installedApps
function installApp(appName) {
    const app = apps.find(app => app.name === appName);
    if (!app) {
        console.error("Aplicación no encontrada: " + appName);
        return;
    }

    if (installedApps.some(installedApp => installedApp.name === appName)) {
        console.log(`${appName} ya está instalada.`);
        return;
    }
    

    // Marcar la app como instalada en la lista apps
    app.installed = true;

    // Agregar la aplicación al array de instaladas
    installedApps.push({ ...app, installed: true });

    // Actualiza la tienda para mostrar los cambios
    renderAppStore();

    // Deshabilitar el botón de instalación para esta app
    const installButton = document.querySelector(`[data-app-name="${appName}"]`);
    if (installButton) {
        installButton.disabled = true;
        installButton.textContent = "Instalada";
        installButton.style.cursor = "not-allowed";
        installButton.style.opacity = "0.6";
    } else {
        console.error(`Botón de instalación no encontrado para ${appName}`);
    }

    // Crear contenedor de la app
    const appIconContainer = document.createElement('div');
    appIconContainer.classList.add('app-icon-container');
    appIconContainer.style = `
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
        cursor: pointer;
        text-align: center;
    `;

    // Crear el icono de la app
    const appIcon = document.createElement('div');
    appIcon.classList.add('app-icon');
    appIcon.style = `
        width: 70px;
        height: 70px;
        border-radius: 10px;
        background-color: #4CAF50;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.2s;
    `;

    const iconImage = document.createElement('img');
    iconImage.src = getAppIcon(appName);
    iconImage.alt = appName;
    iconImage.style = `
        width: 40px;
        height: 40px;
        border-radius: 5px;
    `;
    appIcon.appendChild(iconImage);

    // Etiqueta del nombre de la app
    const appLabel = document.createElement('span');
    appLabel.textContent = appName;
    appLabel.style = `
        margin-top: 5px;
        font-size: 14px;
        color: #333;
    `;
    appIconContainer.appendChild(appIcon);
    appIconContainer.appendChild(appLabel);

    // Añadir la app instalada al contenedor
    appContainer.appendChild(appIconContainer);

    // Cerrar el modal
    appStoreModal.style.display = 'none';

    // Añadir funcionalidad al hacer clic en la app
    appIconContainer.addEventListener('click', () => {
        openApp(app);
    });

    // Efecto de hover en el icono
    appIconContainer.addEventListener('mouseenter', () => {
        appIcon.style.transform = 'scale(1.1)';
    });

    appIconContainer.addEventListener('mouseleave', () => {
        appIcon.style.transform = 'scale(1)';
    });
}




 

function renderAppStore(page = 1) {
    const appsPerPage = 6;
    const start = (page - 1) * appsPerPage;
    const end = start + appsPerPage;
    const appsToShow = apps.slice(start, end);

    // Limpiar el contenido actual del modal
    appStoreModal.innerHTML = "";

    // Mostrar las aplicaciones de la página actual
    appsToShow.forEach(app => {
        const appButton = document.createElement('button');
        appButton.textContent = app.name;
        appButton.id = `install-btn-${app.name}`;
        appButton.classList.add('install-btn');
        appButton.addEventListener('click', () => installApp(app.name));
        appButton.setAttribute('data-app-name', app.name);


        // Verificar si la app ya está instalada y deshabilitar el botón
        if (app.installed) {
            appButton.disabled = true;
            appButton.textContent = "Instalada";
            appButton.style.cursor = "not-allowed";
            appButton.style.opacity = "0.6";
        }

        appStoreModal.appendChild(appButton);
    });

    // Añadir el botón de paginación si hay más de 6 apps
    if (apps.length > appsPerPage) {
        const paginationContainer = document.createElement('div');
        paginationContainer.style.textAlign = 'center';
        paginationContainer.style.marginTop = '10px';

        if (page > 1) {
            const prevButton = document.createElement('button');
            prevButton.textContent = "Anterior";
            prevButton.addEventListener('click', () => renderAppStore(page - 1));
            paginationContainer.appendChild(prevButton);
        }

        if (end < apps.length) {
            const nextButton = document.createElement('button');
            nextButton.textContent = "Siguiente";
            nextButton.addEventListener('click', () => renderAppStore(page + 1));
            paginationContainer.appendChild(nextButton);
        }

        appStoreModal.appendChild(paginationContainer);
    }
}


// Inicializar el modal de la App Store en la página 1
renderAppStore();




// Función para obtener el ícono de la app
function getAppIcon(appName) {
    const icons = {
        'Calculadora': 'https://i.pinimg.com/564x/89/2c/48/892c486a9a60c758e55b747da91aa671.jpg',
        'Reloj': 'https://i.pinimg.com/564x/f7/c6/c7/f7c6c74dc920669a42c9d9f7ee575c34.jpg',
        'Notas': 'https://i.pinimg.com/564x/f2/21/54/f221546ec773641d3e03b0509b7b4d39.jpg',
        'Animal AI View': 'https://i.pinimg.com/736x/11/f3/88/11f388876b53afc25615f3a980d8f25e.jpg',
        'CheckMate': 'https://i.pinimg.com/564x/eb/64/83/eb6483224dbfd351bf5ec53621a320ff.jpg',
        'Updates': 'https://i.pinimg.com/564x/ef/a8/7e/efa87ea299fa9dd25a5938a7cc3028ce.jpg',
        'Calendario': 'https://i.pinimg.com/564x/ef/a8/7e/efa87ea299fa9dd25a5938a7cc3028ce.jpg',
    };
    return icons[appName] || 'https://i.pinimg.com/564x/36/9b/3b/369b3b5c246ba187037e47afc8e26b1c.jpg'; // Ícono por defecto
}

// Función para abrir la app con animación y botón de cierre
function openApp(app) {
    const appWindow = document.createElement('div');
    appWindow.style = `
        position: fixed; top: 50%; left: 50%; width: 500px; height: 300px;
        transform: translate(-50%, -50%) scale(0);
        background-color: #fff; border: 2px solid #333; border-radius: 8px;
        display: flex; flex-direction: column; align-items: center;
        font-size: 18px; transition: transform 0.3s ease; overflow: hidden;
    `;
    document.body.appendChild(appWindow);

    // Botón de cierre
    const closeButton = createCloseButton(appWindow);
    appWindow.appendChild(closeButton);

    // Contenedor para el contenido
    const content = document.createElement('div');
    content.style = 'width: 100%; height: calc(100% - 50px); overflow-y: auto;'; 
    appWindow.appendChild(content);

    // Iniciar animación de apertura
    setTimeout(() => {
        appWindow.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);

    // Acción específica para cada app
    setTimeout(() => {
        // Limpiar el contenido previo, pero mantener el botón de cierre
        content.innerHTML = ''; // Limpiar contenido anterior
        switch (app.name) {
            case 'Calculadora':
                createCalculator(content);
                break;
            case 'Reloj':
                showClock(content);
                break;
            case 'Notas':
                createNoteApp(content);
                break;
                case 'Animal AI View':
                    const confirmationMessage = document.createElement('div');
                    confirmationMessage.innerHTML = `
                        <p>Esta app necesita redireccionarte para continuar, a un servicio nuestro y no de terceros, ¿deseas continuar?</p>
                        <button id="confirmYes">Sí</button>
                        <button id="confirmNo">No</button>
                    `;
                    content.appendChild(confirmationMessage);
            
                    document.getElementById('confirmYes').addEventListener('click', () => {
                        window.location.href = 'https://oceanandwild.github.io/AnimalAI/';
                    });
            
                    document.getElementById('confirmNo').addEventListener('click', () => {
                        appWindow.style.transform = 'translate(-50%, -50%) scale(0)';
                        setTimeout(() => document.body.removeChild(appWindow), 300);
                    });
                    break;
            case 'Updates':
                createUpdateSystem(content);
                break;
                case 'Calendario': 
                createCalendarApp(content);
                break;
                case 'Mixer':
                createMixerApp(content);
                break;
                case 'RNG':
                startRngApp(content);
                break;
                case 'Enciclopedia Animales Extintos':
                createExtinctAnimalsEncyclopedia(content);
                break;
                case 'Sugerir App':
    createSuggestApp(content);
    break;
    case 'Prompt de AllApp':
    createPromptAllApp(content);
    break;
    case 'Crear Proyectos':
    createProjectApp(content);
    break;
    case 'Reproductor de Música':
    createMusicPlayerApp(content);
    break;
    case 'Clima':
    createWeatherApp(content);
    break;
    case 'Editor de Código':
        createCodeEditorApp(content);
        break;
        case 'Clicker Indefinido':
    createClickerApp(content);
    break;
    case 'Brújula':
    createCompassApp(content);
    break;
    case 'Detector de Movimiento':
        createMotionDetectionApp(content);
        break;
        case 'Estado del Sistema':
            createSystemStatusApp(content);
            break;
            case 'Horóscopo':
                createHoroscopeApp(content);
                break;
                case 'Calculadora de Tiempo':
                    createTimeCalculatorApp(content);
                    break;
            default:
                content.innerHTML = `<p>Aplicación no disponible.</p>`;
        }
    }, 500);
}

// Función para crear el botón de cierre
function createCloseButton(appWindow) {
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.style.cssText = `
        position: absolute;
top: 10px;
right: 10px;
padding: 2px 4px; /* Padding reducido */
background-color: #f44336; 
color: #fff; 
border: none; 
border-radius: 6px; 
cursor: pointer; 
font-size: 14px; /* Tamaño de fuente reducido */
font-weight: bold; 
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
transition: background-color 0.3s, transform 0.3s;
    `;

    // Efecto de hover
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.backgroundColor = '#d32f2f'; 
        closeButton.style.transform = 'scale(1.05)'; 
    });

    closeButton.addEventListener('mouseout', () => {
        closeButton.style.backgroundColor = '#f44336'; 
        closeButton.style.transform = 'scale(1)'; 
    });

    // Evento para cerrar la ventana
    closeButton.addEventListener('click', () => {
        appWindow.style.transform = 'translate(-50%, -50%) scale(0)'; 
        setTimeout(() => document.body.removeChild(appWindow), 300); 
    });

    return closeButton;
}





function createTimeCalculatorApp(content) {
    // Crear el contenedor de la app
    const appContainer = document.createElement('div');
    appContainer.style = 'padding: 20px; text-align: center;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Calculadora de Tiempo';
    appContainer.appendChild(title);

    // Entrada para el número
    const numberInput = document.createElement('input');
    numberInput.type = 'number';
    numberInput.placeholder = 'Ingresa un número';
    numberInput.style = 'margin: 10px; padding: 5px;';
    appContainer.appendChild(numberInput);

    // Selección de la unidad de tiempo inicial
    const fromUnitSelect = document.createElement('select');
    fromUnitSelect.style = 'margin: 10px; padding: 5px;';
    const units = ['Minutos', 'Horas', 'Días', 'Semanas'];
    units.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = unit;
        fromUnitSelect.appendChild(option);
    });
    appContainer.appendChild(fromUnitSelect);

    // Selección de la unidad de tiempo deseada
    const toUnitSelect = document.createElement('select');
    toUnitSelect.style = 'margin: 10px; padding: 5px;';
    units.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = unit;
        toUnitSelect.appendChild(option);
    });
    appContainer.appendChild(toUnitSelect);

    // Botón para realizar la conversión
    const convertButton = document.createElement('button');
    convertButton.textContent = 'Convertir';
    convertButton.style = 'padding: 10px 20px; margin-top: 10px;';
    appContainer.appendChild(convertButton);

    // Contenedor para mostrar el resultado
    const resultContainer = document.createElement('div');
    resultContainer.style = 'margin-top: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;';
    appContainer.appendChild(resultContainer);

    // Funcionalidad para realizar la conversión
    convertButton.addEventListener('click', () => {
        const number = parseFloat(numberInput.value);
        const fromUnit = fromUnitSelect.value;
        const toUnit = toUnitSelect.value;

        if (isNaN(number) || number < 0) {
            resultContainer.textContent = 'Por favor, ingresa un número válido.';
            return;
        }

        const conversionResult = convertTime(number, fromUnit, toUnit);
        resultContainer.textContent = `Resultado: ${conversionResult}`;
    });

    // Añadir el contenedor al contenido de la app
    content.appendChild(appContainer);
}

// Función para convertir tiempo entre diferentes unidades
function convertTime(number, fromUnit, toUnit) {
    const conversionRates = {
        'Minutos': { 'Horas': 1 / 60, 'Días': 1 / 1440, 'Semanas': 1 / 10080 },
        'Horas': { 'Minutos': 60, 'Días': 1 / 24, 'Semanas': 1 / 168 },
        'Días': { 'Minutos': 1440, 'Horas': 24, 'Semanas': 1 / 7 },
        'Semanas': { 'Minutos': 10080, 'Horas': 168, 'Días': 7 }
    };

    if (fromUnit === toUnit) {
        return `${number} ${toUnit}`;
    }

    const rate = conversionRates[fromUnit]?.[toUnit] || 1;
    const convertedValue = (number * rate).toFixed(2);
    return `${convertedValue} ${toUnit}`;
}


function createHoroscopeApp(content) {
    // Crear el contenedor de la app
    const appContainer = document.createElement('div');
    appContainer.style = 'padding: 20px; text-align: center;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Horóscopo Diario';
    appContainer.appendChild(title);

    // Desplegable para seleccionar el signo zodiacal
    const zodiacSelect = document.createElement('select');
    zodiacSelect.style = 'margin-bottom: 20px; padding: 5px;';

    const zodiacSigns = [
        'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo',
        'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'
    ];

    zodiacSigns.forEach(sign => {
        const option = document.createElement('option');
        option.value = sign;
        option.textContent = sign;
        zodiacSelect.appendChild(option);
    });

    appContainer.appendChild(zodiacSelect);

    // Botón para mostrar el horóscopo
    const showHoroscopeButton = document.createElement('button');
    showHoroscopeButton.textContent = 'Ver Horóscopo';
    showHoroscopeButton.style = 'padding: 10px 20px; margin-top: 10px;';
    appContainer.appendChild(showHoroscopeButton);

    // Contenedor para mostrar el horóscopo
    const horoscopeContainer = document.createElement('div');
    horoscopeContainer.style = 'margin-top: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;';
    appContainer.appendChild(horoscopeContainer);

    // Funcionalidad para mostrar el horóscopo
    showHoroscopeButton.addEventListener('click', () => {
        const selectedSign = zodiacSelect.value;
        const horoscope = getDailyHoroscope(selectedSign);

        horoscopeContainer.innerHTML = `
            <h3>${selectedSign}</h3>
            <p><strong>Horóscopo:</strong> ${horoscope.text}</p>
            <p><strong>Consejo:</strong> ${horoscope.advice}</p>
            <p><strong>Mensaje Motivacional:</strong> ${horoscope.motivation}</p>
        `;
    });

    // Añadir el contenedor al contenido de la app
    content.appendChild(appContainer);
}

// Función para obtener el horóscopo diario (puedes personalizarlo)
function getDailyHoroscope(sign) {
    const horoscopes = {
        'Aries': {
            text: 'Hoy es un día para tomar decisiones importantes. La energía positiva está de tu lado.',
            advice: 'Confía en tus instintos y no temas avanzar.',
            motivation: 'El coraje te llevará lejos, ¡sigue adelante!'
        },
        'Tauro': {
            text: 'Podrías enfrentar desafíos inesperados, pero tienes la fortaleza para superarlos.',
            advice: 'Mantén la calma y actúa con determinación.',
            motivation: 'La perseverancia es tu mejor aliada, nunca te rindas.'
        },
        'Géminis': {
            text: 'La comunicación será clave hoy. Expresa tus ideas con claridad.',
            advice: 'Escucha antes de hablar y serás escuchado.',
            motivation: 'La creatividad florece cuando compartes tu visión.'
        },
        // Añadir horóscopos para los demás signos...
        'Piscis': {
            text: 'Tu intuición está más fuerte que nunca. Sigue tus sueños y no te desvíes del camino.',
            advice: 'Dedica tiempo a la meditación y la reflexión.',
            motivation: 'Tu alma está llena de luz; déjala brillar.'
        }
    };

    return horoscopes[sign] || {
        text: 'Hoy es un día lleno de posibilidades. Abraza las sorpresas que te esperan.',
        advice: 'Mantén una mente abierta y sigue aprendiendo.',
        motivation: 'La vida es un viaje maravilloso, ¡disfrútalo!'
    };
}


function createSystemStatusApp(content) {
    // Contenedor principal de la app
    const appContainer = document.createElement('div');
    appContainer.style = 'padding: 20px;';

    // Contenedor de estado
    const statusContainer = document.createElement('div');
    statusContainer.style = 'padding: 10px; margin-bottom: 20px; border-radius: 5px; font-size: 18px; font-weight: bold; text-align: center;';
    
    // Estado inicial
    const isOperational = Math.random() > 0.5; // Simulación: true o false aleatoriamente
    statusContainer.textContent = isOperational ? 'Operacional' : 'AllApp no está disponible actualmente';
    statusContainer.style.backgroundColor = isOperational ? 'green' : 'red';
    statusContainer.style.color = 'white';

    appContainer.appendChild(statusContainer);

    // Contenedor de registro
    const logContainer = document.createElement('div');
    logContainer.style = 'padding: 10px; border: 1px solid #ccc; border-radius: 5px; height: 200px; overflow-y: auto; font-size: 14px;';

    const logTitle = document.createElement('h3');
    logTitle.textContent = 'Registro de Estado:';
    logContainer.appendChild(logTitle);

    // Simular mensajes de registro
    const logMessages = [
        'Iniciando verificación del sistema...',
        'Conexión establecida con los servidores.',
        isOperational ? 'Todos los sistemas operan correctamente.' : 'Error: No se pudo conectar con AllApp.',
        isOperational ? 'Monitoreo de estado en curso.' : 'Advertencia: Reintentos en progreso...',
        isOperational ? 'Sin problemas detectados.' : 'Error crítico: Todos los servicios fallaron.'
    ];

    logMessages.forEach(message => {
        const logItem = document.createElement('p');
        logItem.textContent = message;
        logContainer.appendChild(logItem);
    });

    appContainer.appendChild(logContainer);

    // Mostrar el contenedor en el contenido de la app
    content.appendChild(appContainer);
}

function createMotionDetectionApp(content) {
    const motionContainer = document.createElement('div');
    motionContainer.style = 'padding: 20px; text-align: center;';

    const title = document.createElement('h2');
    title.textContent = 'Detección de Movimiento';
    motionContainer.appendChild(title);

    const warningMessage = document.createElement('div');
    warningMessage.style = 'font-size: 24px; margin: 20px; font-weight: bold; color: green;';
    warningMessage.textContent = 'Esperando movimiento...';
    motionContainer.appendChild(warningMessage);

    if (window.DeviceMotionEvent) {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            // Solicitar permiso para dispositivos iOS
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        // Permiso concedido, comienza a escuchar el evento
                        window.addEventListener('devicemotion', handleMotion);
                    } else {
                        warningMessage.textContent = 'Permiso denegado para acceder a los sensores.';
                        warningMessage.style.color = 'orange';
                    }
                })
                .catch((err) => {
                    warningMessage.textContent = 'Error al solicitar permisos.';
                    warningMessage.style.color = 'orange';
                });
        } else {
            // En dispositivos Android o donde no sea necesario el permiso explícito
            window.addEventListener('devicemotion', handleMotion);
        }
    } else {
        warningMessage.textContent = 'Tu dispositivo no soporta la detección de movimiento.';
        warningMessage.style.color = 'orange';
    }

    function handleMotion(event) {
        const accelerationX = event.acceleration.x ?? 0;
        const accelerationY = event.acceleration.y ?? 0;
        const accelerationZ = event.acceleration.z ?? 0;

        const movementThreshold = 5; // Umbral para considerar un movimiento
        const movementMagnitude = Math.sqrt(accelerationX * accelerationX + accelerationY * accelerationY + accelerationZ * accelerationZ);

        if (movementMagnitude > movementThreshold) {
            warningMessage.textContent = '¡El dispositivo se ha movido!';
            warningMessage.style.color = 'red';

            setTimeout(() => {
                warningMessage.textContent = 'Esperando movimiento...';
                warningMessage.style.color = 'green';
            }, 2000);
        }
    }

    content.appendChild(motionContainer);
}

function createCompassApp(content) {
    const compassContainer = document.createElement('div');
    compassContainer.style = 'padding: 20px; text-align: center;';

    const title = document.createElement('h2');
    title.textContent = 'Brújula';
    compassContainer.appendChild(title);

    const directionIndicator = document.createElement('div');
    directionIndicator.style = 'font-size: 32px; margin: 20px; font-weight: bold;';
    directionIndicator.textContent = 'Cargando dirección...';
    compassContainer.appendChild(directionIndicator);

    const arrow = document.createElement('div');
    arrow.style = 'width: 100px; height: 10px; background-color: red; margin: 20px auto; transform-origin: center center;';
    compassContainer.appendChild(arrow);

    if (window.DeviceOrientationEvent) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            // Solicitar permiso para dispositivos iOS
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                    } else {
                        directionIndicator.textContent = 'Permiso denegado para acceder a los sensores.';
                    }
                })
                .catch(() => {
                    directionIndicator.textContent = 'Error al solicitar el permiso.';
                });
        } else {
            // En dispositivos Android o donde no sea necesario el permiso explícito
            window.addEventListener('deviceorientation', handleOrientation);
        }
    } else {
        directionIndicator.textContent = 'Tu dispositivo no tiene sensores de orientación disponibles.';
    }

    function handleOrientation(event) {
        const alpha = event.alpha ?? null;
        if (alpha !== null) {
            directionIndicator.textContent = `Dirección: ${Math.round(alpha)}°`;
            arrow.style.transform = `rotate(${alpha}deg)`;
        } else {
            directionIndicator.textContent = 'No se puede obtener la dirección, intenta en un dispositivo móvil.';
        }
    }

    content.appendChild(compassContainer);
}






function createClickerApp(content) {
    // Crear el contenedor de la app
    const clickerContainer = document.createElement('div');
    clickerContainer.style = 'padding: 20px; text-align: center;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Clicker Indefinido';
    clickerContainer.appendChild(title);

    // Input para ingresar el tiempo por click
    const timeInput = document.createElement('input');
    timeInput.type = 'number';
    timeInput.placeholder = 'Tiempo por click (ms)';
    timeInput.style = 'margin-bottom: 10px; padding: 5px;';
    clickerContainer.appendChild(timeInput);

    // Botón para iniciar el clicker
    const startButton = document.createElement('button');
    startButton.textContent = 'Iniciar Clicker';
    startButton.style = 'margin: 10px; padding: 8px 16px;';
    clickerContainer.appendChild(startButton);

    // Botón para detener el clicker
    const stopButton = document.createElement('button');
    stopButton.textContent = 'Detener Clicker';
    stopButton.style = 'padding: 8px 16px;';
    clickerContainer.appendChild(stopButton);

    // Contador de clicks
    const clickCount = document.createElement('p');
    clickCount.textContent = 'Clicks: 0';
    clickCount.style = 'margin-top: 20px;';
    clickerContainer.appendChild(clickCount);

    // Variables para manejar el clicker
    let clickInterval;
    let clicks = 0;

    // Función para iniciar el clicker
    startButton.addEventListener('click', () => {
        const time = parseInt(timeInput.value);
        if (isNaN(time) || time <= 0) {
            alert('Por favor, ingresa un tiempo válido en milisegundos.');
            return;
        }

        // Limpiar cualquier intervalo anterior
        clearInterval(clickInterval);

        // Configurar un nuevo intervalo
        clickInterval = setInterval(() => {
            clicks++;
            clickCount.textContent = `Clicks: ${clicks}`;
        }, time);
    });

    // Función para detener el clicker
    stopButton.addEventListener('click', () => {
        clearInterval(clickInterval);
    });

    // Mostrar el contenedor en el contenido de la app
    content.appendChild(clickerContainer);
}


function createCodeEditorApp(content) {
    // Crear el contenedor de la app
    const editorContainer = document.createElement('div');
    editorContainer.style = 'padding: 20px; text-align: center;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Editor de Código';
    editorContainer.appendChild(title);

    // Textarea para escribir el código
    const codeArea = document.createElement('textarea');
    codeArea.style = 'width: 100%; height: 300px; font-family: monospace; font-size: 14px;';
    codeArea.placeholder = 'Escribe tu código aquí...';
    editorContainer.appendChild(codeArea);

    // Botón para exportar el código
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Exportar Código';
    exportButton.style = 'margin-top: 10px; padding: 8px 16px;';
    editorContainer.appendChild(exportButton);

    // Evento para exportar el código en un archivo
    exportButton.addEventListener('click', () => {
        const code = codeArea.value;
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'codigo.txt';
        downloadLink.click();

        // Limpiar el objeto URL después de descargar
        URL.revokeObjectURL(url);
    });

    // Mostrar el contenedor en el contenido de la app
    content.appendChild(editorContainer);
}


function createWeatherApp(content) {
    // Crear el contenedor de la app
    const weatherContainer = document.createElement('div');
    weatherContainer.style = 'text-align: center; padding: 20px;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Clima en Montevideo';
    weatherContainer.appendChild(title);

    // Contenedor para mostrar la información del clima
    const weatherInfo = document.createElement('div');
    weatherInfo.style = 'font-size: 16px; margin-top: 20px;';
    weatherContainer.appendChild(weatherInfo);

    // Función para obtener el clima
    async function fetchWeather() {
        const apiKey = '19c84689fda5480886303926241111';
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Montevideo&lang=es`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Mostrar la información del clima
            weatherInfo.innerHTML = `
                <p><strong>Condición:</strong> ${data.current.condition.text}</p>
                <p><strong>Temperatura:</strong> ${data.current.temp_c}°C</p>
                <p><strong>Humedad:</strong> ${data.current.humidity}%</p>
                <p><strong>Viento:</strong> ${data.current.wind_kph} km/h</p>
                <img src="${data.current.condition.icon}" alt="Icono del clima">
            `;
        } catch (error) {
            weatherInfo.innerHTML = `<p>Hubo un error al obtener el clima. Por favor, inténtalo de nuevo más tarde.</p>`;
            console.error('Error al obtener el clima:', error);
        }
    }

    // Llamar a la función para obtener el clima
    fetchWeather();

    // Mostrar el contenedor en el contenido de la app
    content.appendChild(weatherContainer);
}


function createMusicPlayerApp(content) {
    // Crear el contenedor de la app
    const musicPlayerContainer = document.createElement('div');
    musicPlayerContainer.style = 'text-align: center; padding: 20px;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Reproductor de Música';
    musicPlayerContainer.appendChild(title);

    // Instrucciones
    const instructions = document.createElement('p');
    instructions.textContent = 'Selecciona un archivo de música para reproducirlo:';
    instructions.style = 'font-size: 16px; margin-bottom: 20px;';
    musicPlayerContainer.appendChild(instructions);

    // Input para seleccionar el archivo
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'audio/*'; // Solo archivos de audio
    fileInput.style = 'margin-bottom: 20px;';
    musicPlayerContainer.appendChild(fileInput);

    // Contenedor para el reproductor de audio
    const audioPlayer = document.createElement('audio');
    audioPlayer.controls = true; // Mostrar los controles de reproducción
    audioPlayer.style = 'width: 100%; max-width: 400px; display: none; margin-top: 20px;';
    musicPlayerContainer.appendChild(audioPlayer);

    // Evento para manejar la selección del archivo
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            audioPlayer.src = fileURL;
            audioPlayer.style.display = 'block'; // Mostrar el reproductor
            audioPlayer.play(); // Reproducir el archivo automáticamente
        }
    });

    // Mostrar el contenedor en el contenido de la app
    content.appendChild(musicPlayerContainer);
}


function createPromptAllApp(content) {
    // Crear el contenedor de la app
    const descriptionContainer = document.createElement('div');
    descriptionContainer.style = 'text-align: center; padding: 20px;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Prompt de AllApp';
    descriptionContainer.appendChild(title);

    // Descripción de la app
    const description = document.createElement('p');
    description.textContent = '¡Bienvenido al Prompt de AllApp! Aquí podrás encontrar una breve descripción de nuestra aplicación, que te ayudará a crear una imagen de fan o algo relacionado con la app. Usa el siguiente prompt para inspirarte y crea algo visualmente único. ¡Sé creativo!';
    description.style = 'font-size: 16px; margin: 20px 0;';
    descriptionContainer.appendChild(description);

    // Botón para generar el prompt
    const generateButton = document.createElement('button');
    generateButton.textContent = 'Generar Prompt para Imagen';
    generateButton.style = 'padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;';
    descriptionContainer.appendChild(generateButton);

    // Mostrar el contenedor en el contenido de la app
    content.appendChild(descriptionContainer);

    // Manejar el evento del botón para generar el prompt
    generateButton.addEventListener('click', function () {
        // Crear el prompt que se utilizará para crear la imagen
        const promptText = 'Crea una imagen de una app de tecnología futurista, con pantallas interactivas flotando en el aire, colores brillantes como verde y azul, con un fondo de ciudad del futuro y personas usando dispositivos avanzados. La atmósfera debe ser dinámica y energética, mostrando cómo las personas interactúan con estas tecnologías en su vida diaria.';

        // Mostrar el prompt generado
        const promptDisplay = document.createElement('p');
        promptDisplay.textContent = 'Prompt Generado: ' + promptText;
        promptDisplay.style = 'font-size: 14px; margin-top: 20px; color: #555;';
        descriptionContainer.appendChild(promptDisplay);

        // Cambiar el botón a un mensaje de éxito
        generateButton.textContent = '¡Prompt Generado! Puedes usarlo para crear tu imagen de fan.';
        generateButton.disabled = true;
        generateButton.style.backgroundColor = '#888';
        generateButton.style.cursor = 'not-allowed';
    });
}


function createSuggestApp(content) {
    // Crear el formulario para sugerir una nueva app
    const form = document.createElement('form');
    form.style = 'display: flex; flex-direction: column; align-items: center; margin-top: 20px;';

    // Input para el nombre de la app
    const appNameInput = document.createElement('input');
    appNameInput.type = 'text';
    appNameInput.placeholder = 'Nombre de la nueva app';
    appNameInput.required = true;
    appNameInput.style = 'padding: 10px; margin-bottom: 10px; width: 80%; border-radius: 4px; border: 1px solid #ccc;';
    form.appendChild(appNameInput);

    // Input para la descripción de la app
    const appDescriptionInput = document.createElement('textarea');
    appDescriptionInput.placeholder = 'Descripción breve de la app';
    appDescriptionInput.required = true;
    appDescriptionInput.style = 'padding: 10px; margin-bottom: 10px; width: 80%; border-radius: 4px; border: 1px solid #ccc;';
    form.appendChild(appDescriptionInput);

    // Botón para enviar la sugerencia
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Enviar Sugerencia';
    submitButton.style = 'padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;';
    form.appendChild(submitButton);

    // Mostrar el formulario en la ventana de la app
    content.appendChild(form);

    // Manejar el envío del formulario
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener los datos del formulario
        const appName = appNameInput.value.trim();
        const appDescription = appDescriptionInput.value.trim();

        // Confirmación de que la sugerencia fue recibida
        const confirmationMessage = document.createElement('p');
        confirmationMessage.textContent = `Gracias por sugerir "${appName}". ¡Tu sugerencia ha sido enviada!`;
        confirmationMessage.style = 'margin-top: 20px; color: green; text-align: center;';
        content.appendChild(confirmationMessage);

        // Limpiar los campos del formulario
        appNameInput.value = '';
        appDescriptionInput.value = '';
    });
}


function createExtinctAnimalsEncyclopedia(content) {
    content.innerHTML = `
        <h2>Enciclopedia de Animales Extintos</h2>
        <p>Explora información sobre especies que han desaparecido de nuestro planeta.</p>
        <div id="animalList"></div>
    `;

    const animalList = document.getElementById('animalList');
    const animals = [
        { name: 'Dodo', info: 'El dodo era un ave no voladora endémica de la isla de Mauricio.' },
        { name: 'Tigre de Tasmania', info: 'El último tigre de Tasmania fue visto en 1936 en Australia.' },
        { name: 'Mamuts Lanudos', info: 'Los mamuts lanudos vivieron en la era del hielo y se extinguieron hace unos 4,000 años.' }
    ];

    animals.forEach(animal => {
        const animalItem = document.createElement('div');
        animalItem.style = 'margin-bottom: 10px; padding: 5px; border: 1px solid #ccc; border-radius: 4px;';

        const animalName = document.createElement('h3');
        animalName.textContent = animal.name;
        animalName.style = 'margin: 0; color: #333;';

        const animalInfo = document.createElement('p');
        animalInfo.textContent = animal.info;
        animalInfo.style = 'margin: 5px 0 0; color: #555;';

        animalItem.appendChild(animalName);
        animalItem.appendChild(animalInfo);
        animalList.appendChild(animalItem);
    });
}


// Definir las auras y sus probabilidades
const auras = [
    { name: 'Aura de Luz', probability: 10 },
    { name: 'Aura de Oscuridad', probability: 20 },
    { name: 'Aura de Fuego', probability: 30 },
    { name: 'Aura de Agua', probability: 40 },
];

// Función para rodar y obtener un aura
function rollAura() {
    const randomValue = Math.random() * 100; // Generar un número aleatorio entre 0 y 100
    let cumulativeProbability = 0;

    for (const aura of auras) {
        cumulativeProbability += aura.probability;
        if (randomValue < cumulativeProbability) {
            return aura.name; // Retornar el aura correspondiente
        }
    }
    return null; // En caso de que no se encuentre un aura (teóricamente no debería suceder)
}

function startRngApp(content) {
    // Limpiar el contenido previo
    content.innerHTML = '';

    // Crear el contenedor para la aplicación RNG
    const appRNGContainer = document.createElement('div');
    appRNGContainer.style = `
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
    `;

    // Agregar elementos a la aplicación RNG
    const title = document.createElement('h2');
    title.textContent = 'Generador de Números Aleatorios';
    appRNGContainer.appendChild(title);

    const generateBtn = document.createElement('button');
    generateBtn.textContent = 'Generar Número';
    generateBtn.style.padding = '10px 20px';
    generateBtn.style.margin = '10px 0';
    appRNGContainer.appendChild(generateBtn);

    const resultDisplay = document.createElement('p');
    resultDisplay.textContent = 'Número generado: ';
    appRNGContainer.appendChild(resultDisplay);

    // Función para generar un número aleatorio
    generateBtn.addEventListener('click', () => {
        const randomNum = Math.floor(Math.random() * 100) + 1; // Genera un número entre 1 y 100
        resultDisplay.textContent = `Número generado: ${randomNum}`;
    });

    // Agregar el contenedor de la app RNG al contenido
    content.appendChild(appRNGContainer);
}



// Función para crear la aplicación de mezcla de ingredientes
function createMixerApp(content) {
    // Diccionario de combinaciones
    const combinations = {
        "Agua+Agua": "Tsunami",
        "Fuego+Agua": "Vapor",
        "Tierra+Agua": "Lodo",
        "Fuego+Tierra": "Lava",
        "Aire+Agua": "Tormenta",
        "Fuego+Fuego": "Incendio",
        // Agrega más combinaciones aquí
    };

    // Contenedor de ingredientes y resultado
    content.innerHTML = `
        <h2>Juego de Mixer de Ingredientes</h2>
        <div style="margin-bottom: 15px;">
            <select id="ingredient1">
                <option value="Agua">Agua</option>
                <option value="Fuego">Fuego</option>
                <option value="Tierra">Tierra</option>
                <option value="Aire">Aire</option>
                <!-- Agrega más opciones según los ingredientes -->
            </select>
            +
            <select id="ingredient2">
                <option value="Agua">Agua</option>
                <option value="Fuego">Fuego</option>
                <option value="Tierra">Tierra</option>
                <option value="Aire">Aire</option>
                <!-- Agrega más opciones según los ingredientes -->
            </select>
        </div>
        <button id="mixButton">Mezclar Ingredientes</button>
        <div id="result" style="margin-top: 20px; font-size: 18px; color: #333;"></div>
    `;

    // Selecciona los elementos del DOM
    const ingredient1 = content.querySelector("#ingredient1");
    const ingredient2 = content.querySelector("#ingredient2");
    const mixButton = content.querySelector("#mixButton");
    const resultDisplay = content.querySelector("#result");

    // Función para realizar la mezcla de ingredientes
    mixButton.addEventListener("click", () => {
        const ing1 = ingredient1.value;
        const ing2 = ingredient2.value;
        const combinationKey = `${ing1}+${ing2}`;

        // Verifica si existe una combinación
        if (combinations[combinationKey]) {
            resultDisplay.textContent = `Resultado: ${combinations[combinationKey]}`;
        } else if (combinations[`${ing2}+${ing1}`]) {
            resultDisplay.textContent = `Resultado: ${combinations[`${ing2}+${ing1}`]}`;
        } else {
            resultDisplay.textContent = "La combinación no produjo ningún resultado.";
        }
    });
}

// Función para crear la app Calendario
function createCalendarApp(content) {
    content.innerHTML = `<h3>Calendario</h3>`;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const calendar = document.createElement('table');
    calendar.style = `
      width: 100%; 
      border-collapse: collapse;
    `;
    content.appendChild(calendar);

    // Mostrar el mes y año actual
    const monthYearHeader = calendar.insertRow();
    const monthYearCell = monthYearHeader.insertCell();
    monthYearCell.colSpan = 7;
    monthYearCell.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
    monthYearCell.style = `
      text-align: center;
      font-weight: bold;
      padding: 10px;
    `;

    // Mostrar los días de la semana
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const daysOfWeekRow = calendar.insertRow();
    daysOfWeek.forEach(day => {
        const dayCell = daysOfWeekRow.insertCell();
        dayCell.textContent = day;
        dayCell.style = `
            text-align: center;
            padding: 5px;
            border: 1px solid #ccc;
        `;
    });

    // Calcular el primer día del mes
    const firstDay = (new Date(currentYear, currentMonth)).getDay();

    // Llenar el calendario con los días del mes
    let date = 1;
    for (let i = 0; i < 6; i++) { // 6 semanas como máximo en un mes
        const row = calendar.insertRow();
        for (let j = 0; j < 7; j++) {
            const cell = row.insertCell();
            cell.style = `
                text-align: center;
                padding: 10px;
                border: 1px solid #ccc;
            `;
            if (i === 0 && j < firstDay) {
                // Dejar celdas vacías antes del primer día del mes
                cell.textContent = '';
            } else if (date > daysInMonth(currentMonth, currentYear)) {
                // Detenerse cuando se hayan agregado todos los días del mes
                break;
            } else {
                cell.textContent = date;
                date++;
            }
        }
    }
}

// Función auxiliar para obtener el nombre del mes
function getMonthName(monthIndex) {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return monthNames[monthIndex];
}

// Función auxiliar para obtener el número de días en un mes
function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

// Función para crear un sistema de actualizaciones funcional
function createUpdateSystem(content) {
    content.innerHTML += `<h3>Actualizaciones</h3>`;

    // Contenedor para mostrar las actualizaciones
    const updateContainer = document.createElement('div');
    updateContainer.id = 'updateContainer';
    updateContainer.style = `
        border: 1px solid #ccc; padding: 10px; 
        margin: 10px 0; max-height: 200px; overflow-y: auto; 
    `;
    content.appendChild(updateContainer);

    // Mostrar información sobre actualizaciones
    installedApps.forEach(app => {
        const appUpdate = document.createElement('div');
        appUpdate.textContent = `${app.name} - Versión: ${app.version} - Última actualización: ${app.lastUpdated}`;
        updateContainer.appendChild(appUpdate);
    });
}

// Función para cerrar la aplicación al hacer clic fuera de ella
window.addEventListener('click', (event) => {
    const appWindows = document.querySelectorAll('.app-window');
    appWindows.forEach(window => {
        if (window === event.target) {
            closeModal();
        }
    });
});

// Función para crear la app CheckMate
function createCheckMateApp(content) {
    content.innerHTML += `<h3>CheckMate</h3>`;
    
    const taskInput = document.createElement('input');
    taskInput.placeholder = 'Nueva tarea';
    taskInput.style = 'width: 90%; padding: 5px; margin-bottom: 10px;';
    content.appendChild(taskInput);

    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Agregar Tarea';
    addTaskBtn.style = 'width: 90%; padding: 5px; margin-bottom: 10px;';
    content.appendChild(addTaskBtn);

    const taskList = document.createElement('ul');
    content.appendChild(taskList);

    addTaskBtn.addEventListener('click', () => {
        if (taskInput.value.trim() !== '') {
            const taskItem = document.createElement('li');
            taskItem.textContent = taskInput.value.trim();
            taskList.appendChild(taskItem);
            taskInput.value = '';
        }
    });
}

// Función para crear una calculadora funcional
function createCalculator(content) {
    content.innerHTML += `<h3>Calculadora</h3>`;
    const display = document.createElement('input');
    display.id = 'display';
    display.disabled = true;
    display.style = `
        width: 90%; font-size: 16px; margin-bottom: 10px;
        text-align: right; padding: 5px; box-sizing: border-box;
    `;
    content.appendChild(display);

    const buttonContainer = document.createElement('div');
    buttonContainer.style = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; width: 100%;';
    const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];
    buttons.forEach(symbol => {
        const btn = document.createElement('button');
        btn.textContent = symbol;
        btn.style = 'width: 100%; height: 40px; font-size: 16px;';
        btn.addEventListener('click', () => handleCalculatorInput(symbol, display));
        buttonContainer.appendChild(btn);
    });
    content.appendChild(buttonContainer);
}

// Manejador de la entrada de calculadora
function handleCalculatorInput(symbol, display) {
    if (symbol === '=') {
        try {
            display.value = eval(display.value);
        } catch {
            display.value = 'Error';
        }
    } else {
        display.value += symbol;
    }
}

// Función para mostrar el reloj
function showClock(content) {
    content.innerHTML += `<h3>Reloj</h3>`;
    const clockDisplay = document.createElement('div');
    clockDisplay.style = 'font-size: 24px; text-align: center; margin-top: 10px;';
    content.appendChild(clockDisplay);
    setInterval(() => {
        const now = new Date();
        clockDisplay.textContent = now.toLocaleTimeString();
    }, 1000);
}

// Función para crear la app de notas
function createNoteApp(content) {
    content.innerHTML += `<h3>Notas</h3>`;
    const noteArea = document.createElement('textarea');
    noteArea.id = 'noteArea';
    noteArea.style = 'width: 90%; height: 80px; padding: 5px; resize: none; box-sizing: border-box;';
    content.appendChild(noteArea);
}

function createProjectApp(content) {
    // Contenedor para el formulario de creación de proyectos
    const projectContainer = document.createElement('div');
    projectContainer.style = 'text-align: center; padding: 20px;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Crear Nuevo Proyecto';
    projectContainer.appendChild(title);

    // Botón para borrar la base de datos
    const deleteDBButton = document.createElement('button');
    deleteDBButton.textContent = 'Borrar Base de Datos';
    deleteDBButton.style = 'padding: 10px 20px; background-color: #f44336; color: white; border: none; border-radius: 4px; margin-bottom: 20px;';
    projectContainer.appendChild(deleteDBButton);

    // Input para el nombre del proyecto
    const projectNameInput = document.createElement('input');
    projectNameInput.type = 'text';
    projectNameInput.placeholder = 'Nombre del proyecto';
    projectNameInput.style = 'padding: 10px; margin-bottom: 10px; width: 100%;';
    projectContainer.appendChild(projectNameInput);

    // Selección del estado del proyecto
    const projectStatusSelect = document.createElement('select');
    projectStatusSelect.style = 'padding: 10px; margin-bottom: 10px; width: 100%;';
    const statuses = [
        { text: 'Estable', color: 'green' },
        { text: 'Requiere Mantenimiento', color: 'orange' },
        { text: 'Inestable', color: 'red' },
        { text: 'Falta Actualizar', color: 'blue' }
    ];
    statuses.forEach(status => {
        const option = document.createElement('option');
        option.value = status.text;
        option.textContent = status.text;
        option.style.color = status.color;
        projectStatusSelect.appendChild(option);
    });
    projectContainer.appendChild(projectStatusSelect);

    // Input para el proveedor del proyecto
    const projectProviderInput = document.createElement('input');
    projectProviderInput.type = 'text';
    projectProviderInput.placeholder = 'Proveedor';
    projectProviderInput.style = 'padding: 10px; margin-bottom: 10px; width: 100%;';
    projectContainer.appendChild(projectProviderInput);

    // Botón para crear el proyecto
    const createProjectButton = document.createElement('button');
    createProjectButton.textContent = 'Crear Proyecto';
    createProjectButton.style = 'padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 4px;';
    projectContainer.appendChild(createProjectButton);

    // Lista para mostrar los proyectos
    const projectList = document.createElement('div');
    projectList.style = 'margin-top: 20px;';
    projectContainer.appendChild(projectList);

    // Función para mostrar los proyectos desde IndexedDB
    function displayProjects() {
        projectList.innerHTML = ''; // Limpiar la lista de proyectos

        const transaction = db.transaction('projects', 'readonly');
        const objectStore = transaction.objectStore('projects');

        objectStore.openCursor().onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
                const project = cursor.value;
                const projectItem = document.createElement('div');
                projectItem.style = `padding: 10px; margin: 5px; background-color: ${statuses.find(s => s.text === project.status).color}; border-radius: 4px;`;
                projectItem.textContent = `Nombre: ${project.name}, Estado: ${project.status}, Proveedor: ${project.provider}`;
                projectList.appendChild(projectItem);
                cursor.continue();
            }
        };
    }

    // Guardar el proyecto en IndexedDB
    createProjectButton.addEventListener('click', () => {
        const name = projectNameInput.value;
        const status = projectStatusSelect.value;
        const provider = projectProviderInput.value;

        if (name && status && provider) {
            const transaction = db.transaction('projects', 'readwrite');
            const objectStore = transaction.objectStore('projects');
            const project = { name, status, provider };
            objectStore.add(project);
            displayProjects(); // Actualizar la lista de proyectos
            projectNameInput.value = '';
            projectProviderInput.value = '';
        }
    });

    // Función para borrar la base de datos
    deleteDBButton.addEventListener('click', () => {
        indexedDB.deleteDatabase('ProjectDatabase');
        alert('Base de datos borrada. Por favor, recarga la página para volver a crearla.');
    });

    // Inicializar la base de datos y mostrar proyectos
    let db;
    const request = indexedDB.open('ProjectDatabase', 1);

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        if (!db.objectStoreNames.contains('projects')) {
            db.createObjectStore('projects', { keyPath: 'id', autoIncrement: true });
        }
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        displayProjects();
    };

    request.onerror = (event) => {
        console.error('Error opening IndexedDB', event);
    };

    content.appendChild(projectContainer);
}
