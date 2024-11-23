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




// Lista de aplicaciones con las nuevas apps marcadas
const apps = [
    { name: 'Calculadora', installed: false, isNew: false, isImproved: false, inMaintenance: false  },
    { name: 'Reloj', installed: false, isNew: false, isImproved: false, inMaintenance: false  },
    { name: 'Notas', installed: false, isNew: false, isImproved: true, inMaintenance: false  },
    { name: 'CheckMate', installed: false, isNew: false, isImproved: true, inMaintenance: false  },
    { name: 'Calendario', installed: false, isNew: false, isImproved: true, inMaintenance: false  },
    { name: 'Mixer', installed: false, isNew: false, isImproved: true, inMaintenance: false  },
    { name: 'RNG', installed: false, isNew: false, isImproved: true, inMaintenance: false  },
    { name: 'Enciclopedia Animales Extintos', installed: false, isNew: false, isImproved: false, inMaintenance: false  }, // Nueva app
    { name: 'Sugerir App', installed: false, isNew: false, isImproved: true, inMaintenance: false  }, // Nueva app
    { name: 'Prompt de AllApp', installed: false, isNew: false, isImproved: false, inMaintenance: false  }, // Nueva app
    { name: 'Reproductor de Música', installed: false, isNew: false, isImproved: false, inMaintenance: false  }, // Nueva app
    { name: 'Crear Proyectos', installed: false, isNew: false, isImproved: false, inMaintenance: false  }, // Nueva app
    { name: 'Clima', installed: false, isNew: false, isImproved: false, inMaintenance: false }, // Nueva app
    { name: 'Editor de Código', installed: false, isNew: false, isImproved: false, inMaintenance: false  }, // Nueva app
    { name: 'Clicker Indefinido', installed: false, isNew: false, isImproved: false, inMaintenance: false  }, // Nueva app
    { name: 'Brújula', installed: false, isNew: false, isImproved: false, inMaintenance: false  }, // Nueva app
    { name: 'Detector de Movimiento', installed: false, isNew: false, isImproved: false, inMaintenance: false  }, // Nueva app
    { name: 'Estado del Sistema', installed: false, isNew: false, isImproved: false, inMaintenance: false  }, // Nueva app
    { name: 'Horóscopo', installed: false, isNew: false, isImproved: false, inMaintenance: false  }, // Nuevo comando
    { name: 'Calculadora de Tiempo', installed: false, isNew: false, isImproved: false, inMaintenance: false  }, // Nuevo comando
    { name: 'Actualizaciones y Cambios de Balance', installed: false, isNew: false, isImproved: false, inMaintenance: false }, // Nuevo comando
    { name: 'Juego de Gatos: The Rat', installed: false, isNew: false, isImproved: true, inMaintenance: false  }, // Nuevo comando
    { name: 'Unlock Link', installed: false, isNew: false, isImproved: false, inMaintenance: false  }, // Nuevo comando
    { name: 'Escape Police', installed: false, isNew: true, isImproved: false, inMaintenance: false  }, // Nuevo comando
    { name: 'Quiz de Artes Marciales', installed: false, isNew: true, isImproved: false, inMaintenance: false  }, // Nuevo comando
    { name: 'Enciclopedia Animal', installed: false, isNew: true, isImproved: false, inMaintenance: false  }, // Nuevo comando
    { name: 'Galeria de Gatitos', installed: false, isNew: true, isImproved: false, inMaintenance: false  }, // Nuevo comando
];

// Botón para abrir la tienda
openStoreBtn.addEventListener('click', () => {
    // Muestra el modal
    appStoreModal.style.display = 'flex';
    document.querySelector('#appStoreModal').classList.add('active');

    // Verifica si el botón de cerrar ya existe
    let closeButton = appStoreModal.querySelector('.custom-button');

    // Si no existe, crea un nuevo botón "Cerrar"
    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.textContent = 'Cerrar'; // Texto del botón
        closeButton.classList.add('custom-button'); // Agregar clase personalizada si es necesario

        // Agrega el evento para el botón de cerrar
        closeButton.addEventListener('click', () => {
            appStoreModal.style.display = 'none';
            document.removeEventListener('keydown', closeOnEsc); // Remueve el evento de tecla "Esc" al cerrar
        });

        appStoreModal.appendChild(closeButton);
    }

    // Añade el evento de escuchar la tecla "Esc"
    const closeOnEsc = (event) => {
        if (event.key === 'Escape') { // Verifica si la tecla presionada es "Esc"
            appStoreModal.style.display = 'none'; // Cierra el modal
            document.removeEventListener('keydown', closeOnEsc); // Remueve el evento de tecla "Esc" al cerrar
        }
    };

    // Agrega el evento de tecla "Esc" al documento
    document.addEventListener('keydown', closeOnEsc);

    // Renderiza la tienda inicial (la primera página)
    renderAppStore(1);
});






// Cerrar el modal
function closeModal() {
    appStoreModal.style.display = 'none';
}

// Función para instalar la app
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

    if (app.inMaintenance) {
        const appWindow = document.createElement('div');
        appWindow.style = `
            position: fixed; top: 50%; left: 50%; width: 500px; height: 500px;
            transform: translate(-50%, -50%) scale(0);
            background-color: #fff; border: 2px solid #333; border-radius: 8px;
            display: flex; flex-direction: column; align-items: center;
            font-size: 18px; transition: transform 0.3s ease; overflow: hidden;
        `;
    
        // Contenedor para el contenido
        const content = document.createElement('div');
        content.style = 'width: 100%; height: calc(40% - 50px); overflow-y: auto;';
        appWindow.appendChild(content);
    
        // Título de la notificación
        const title = document.createElement('h2');
        title.textContent = '🚧 Mantenimiento 🚧';
        title.style = 'margin-bottom: 10px; color: #f0a500;';
        appWindow.appendChild(title);
    
        // Mensaje de la notificación
        const message = document.createElement('p');
        message.textContent = `La aplicación ${appName} está en mantenimiento y no se puede instalar en este momento.`;
        message.style = 'margin-bottom: 20px; color: #333;';
        appWindow.appendChild(message);
    
        // Botón de cerrar
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Cerrar';
        closeButton.style = `
            padding: 10px 20px;
            background-color: #f0a500;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        `;
        closeButton.addEventListener('click', () => {
            appWindow.style.display = 'none';
        });
        appWindow.appendChild(closeButton);
    
        // **Add this line to append the appWindow to the body**
        document.body.appendChild(appWindow);
    
        // Set the transform property to make the window appear (optional)
        setTimeout(() => {
            appWindow.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
    
        return;
    }
    
    

    app.installed = true;
    installedApps.push({ ...app });

    renderAppStore();
    const installButton = document.querySelector(`[data-app-name="${appName}"]`); 
    if (installButton) {
        installButton.disabled = true;
        installButton.textContent = "Instalada";
        installButton.style.cursor = "not-allowed";
        installButton.style.opacity = "0.6";
    
        // Agregar estilos CSS para alinear el botón verticalmente
        installButton.style.display = "block"; // Hacer que el botón sea un bloque para alinearlo verticalmente
        installButton.style.margin = "10px 0"; // Espaciado entre botones
        installButton.style.padding = "12px 24px"; // Tamaño del botón para que sea más cómodo de ver
        installButton.style.fontSize = "16px"; // Tamaño de fuente
        installButton.style.color = "#FFFFFF"; // Color de texto blanco
        installButton.style.backgroundColor = "#FF073A"; // Fondo rojo fluorescente
        installButton.style.border = "2px solid #B2002D"; // Borde rojo oscuro
        installButton.style.borderRadius = "8px"; // Bordes redondeados
        installButton.style.textTransform = "capitalize"; // Para que el texto sea con la primera letra en mayúscula
        installButton.style.transition = "all 0.3s ease"; // Transición suave para efectos
        installButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Sombra suave
    
        // Efecto hover (aunque estará deshabilitado, en caso de que el usuario pase el ratón)
        installButton.addEventListener('mouseenter', () => {
            installButton.style.backgroundColor = "#FF4567"; // Cambio de color al pasar el ratón
        });
    
        installButton.addEventListener('mouseleave', () => {
            installButton.style.backgroundColor = "#FF073A"; // Vuelve al color original cuando el ratón sale
        });
    }
    

    // Contenedor del icono de la app
    const appIconContainer = document.createElement('div');
    appIconContainer.classList.add('app-icon-container');
    appIconContainer.style = `
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
        cursor: pointer;
        text-align: center;
        position: relative;
    `;

    // Icono de la app
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
        position: relative;
    `;

    const iconImage = document.createElement('img');
    iconImage.src = getAppIcon(appName);
    iconImage.alt = appName;
    iconImage.style = `
        width: 70px;
        height: 70px;
        border-radius: 5px;
    `;
    appIcon.appendChild(iconImage);

    // Añadir la cinta "Nueva!" si la app es nueva
    if (app.isNew) {
        const ribbon = document.createElement('div');
        ribbon.textContent = "Nueva!";
        ribbon.style = `
            position: absolute;
            top: 0;
            right: 0;
            background-color: red;
            color: white;
            font-size: 10px;
            padding: 2px 5px;
            border-radius: 3px;
            transform: translate(50%, -50%);
        `;
        appIcon.appendChild(ribbon);
    }

    // Añadir la cinta "Mejorada!" si la app ha sido mejorada
    if (app.isImproved) {
        const improvedRibbon = document.createElement('div');
        improvedRibbon.textContent = "¡Actualizada!";
        improvedRibbon.style = `
            position: absolute;
            top: 0;
            left: 0;
            background-color: blue;
            color: white;
            font-size: 10px;
            padding: 2px 5px;
            border-radius: 3px;
            transform: translate(-50%, -50%);
        `;
        appIcon.appendChild(improvedRibbon);
    }

    const appLabel = document.createElement('span');
    appLabel.textContent = appName;
    appLabel.style = `
        margin-top: 5px;
        font-size: 14px;
        color: #333;
    `;

    appIconContainer.appendChild(appIcon);
    appIconContainer.appendChild(appLabel);
    appContainer.appendChild(appIconContainer);
    appStoreModal.style.display = 'none';



    // Eventos para abrir la app y animar el icono
    appIconContainer.addEventListener('click', () => {
        openApp(app);
    });
    appIconContainer.addEventListener('mouseenter', () => {
        appIcon.style.transform = 'scale(1.1)';
    });
    appIconContainer.addEventListener('mouseleave', () => {
        appIcon.style.transform = 'scale(1)';
    });
}


// Agregar una configuración global para apps por página
let appsPerPage = 7; // Valor predeterminado

// Función para renderizar la tienda
function renderAppStore(page = 1) {
    const start = (page - 1) * appsPerPage;
    const end = start + appsPerPage;
    const appsToShow = apps.slice(start, end);

    // Limpia el contenido de la tienda, pero no el botón "Cerrar"
    const closeButton = appStoreModal.querySelector('.custom-button');
    appStoreModal.innerHTML = ""; // Limpia todo
    if (closeButton) appStoreModal.appendChild(closeButton); // Reagrega el botón "Cerrar"

    // Agregar la opción de configuración de "Apps por página"
    const configContainer = document.createElement('div');
    configContainer.style = 'margin-bottom: 15px; text-align: center;';

    const label = document.createElement('label');
    label.textContent = "Apps por página: ";
    label.style.marginRight = "5px";

    const input = document.createElement('input');
    input.type = "number";
    input.value = appsPerPage;
    input.min = 1;
    input.max = apps.length;
    input.style.width = "50px";

    input.addEventListener('change', () => {
        const newAppsPerPage = parseInt(input.value, 10);
        if (newAppsPerPage > 0 && newAppsPerPage <= apps.length) {
            appsPerPage = newAppsPerPage; // Actualiza la cantidad
            renderAppStore(1); // Recarga la tienda desde la primera página
        } else {
            alert(`Por favor, elige un valor entre 1 y ${apps.length}.`);
        }
    });

    configContainer.appendChild(label);
    configContainer.appendChild(input);
    appStoreModal.appendChild(configContainer);

    // Mostrar las apps de la página actual
    appsToShow.forEach(app => {
        const appButton = document.createElement('button');
        appButton.textContent = app.name;
        appButton.id = `install-btn-${app.name}`;
        appButton.classList.add('install-btn');
        appButton.setAttribute('data-app-name', app.name);

        if (app.installed) {
            appButton.disabled = true;
            appButton.textContent = "Instalada";
            appButton.style.cursor = "not-allowed";
            appButton.style.opacity = "0.6";
        }

        if (app.isNew) {
            const newIcon = document.createElement('span');
            newIcon.textContent = " (NUEVO!)";
            newIcon.style.color = "#39ff14";
            appButton.appendChild(newIcon);
        }

        if (app.isImproved) {
            const improvedIcon = document.createElement('span');
            improvedIcon.textContent = " (ACTUALIZADA!)";
            improvedIcon.style.color = "yellow";
            appButton.appendChild(improvedIcon);
        }

        appButton.addEventListener('click', () => installApp(app.name));
        appStoreModal.appendChild(appButton);
    });

    // Mostrar botones de paginación
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
        'Quiz de Artes Marciales': 'https://i.pinimg.com/736x/a8/4b/0a/a84b0afc36467910d7c350dc64dd8f3c.jpg',
        'Enciclopedia Animal': 'https://i.pinimg.com/736x/11/7b/ae/117baedaef6757575687e5fa382de38c.jpg',
        'Juego de Gatos: The Rat': 'https://i.pinimg.com/736x/b3/73/fb/b373fb7ff19418378c5b547a247b84c7.jpg',
        'Galeria de Gatitos': 'https://i.pinimg.com/736x/8b/59/7a/8b597aa05cc905e0fb4c32886b378fd7.jpg',
        'Actualizaciones y Cambios de Balance': 'https://i.pinimg.com/736x/8b/5d/21/8b5d2171151a753d80b76215f7647ed8.jpg',
    };
    return icons[appName] || 'https://i.pinimg.com/564x/36/9b/3b/369b3b5c246ba187037e47afc8e26b1c.jpg'; // Ícono por defecto
}

// Función para abrir la app con animación y botón de cierre
function openApp(app) {
    const appWindow = document.createElement('div');
    appWindow.style = `
        position: fixed; top: 50%; left: 50%; width: 500px; height: 500px;
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
                    case 'CheckMate':
                createCheckMateApp(content);
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
                    case 'Actualizaciones y Cambios de Balance':
                    createUpdateAndBalanceChangesApp(content);
                    break;
                    case 'Juego de Gatos: The Rat':
                    createCatGameApp(content);
                    break;
                    case 'Sneak Peeks de Apps':
                        createSneakPeeksApp(content);
                        break;
                        case 'Unlock Link':
                        createUnlockLinkApp(content);
                        break;
                        case 'Escape Police':
                        createSubwaySurfersApp(content);
                        break;
                        case 'Quiz de Artes Marciales':
                        createMartialArtsQuizApp(content);
                        break;
                        case 'Enciclopedia Animal':
                        createAnimalEncyclopediaApp(content);
                        break;
                        case 'Galeria de Gatitos':
                        createKittenGalleryApp(content);
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
        position: down;
top: 15px;
right: 15px;
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

function createKittenGalleryApp(content) {
    // Contenedor principal de la app
    const appContainer = document.createElement('div');
    appContainer.style = 'padding: 20px; text-align: center; width: 100%; height: 100%; background-color: #fdf6e3;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Galería de Gatitos 🐱';
    title.style = 'color: #2a4d69; margin-bottom: 20px;';
    appContainer.appendChild(title);

    // Contenedor para la imagen del gatito
    const kittenImage = document.createElement('img');
    kittenImage.style = 'width: 300px; height: auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);';
    appContainer.appendChild(kittenImage);

    // Pie de texto que indica el número de la imagen
    const caption = document.createElement('p');
    caption.style = 'color: #4a4a4a; font-size: 18px; margin-top: 10px;';
    appContainer.appendChild(caption);

    // Lista de URLs de imágenes de gatitos
    const kittenImages = [
        'https://placekitten.com/400/300',
        'https://placekitten.com/300/400',
        'https://placekitten.com/350/350',
        'https://placekitten.com/450/350',
        'https://placekitten.com/350/450',
        'https://placekitten.com/400/400'
    ];

    let currentKittenIndex = 0;

    // Función para cambiar la imagen del gatito
    function showNextKitten() {
        kittenImage.src = kittenImages[currentKittenIndex];
        caption.textContent = `Gatito #${currentKittenIndex + 1}`;
        currentKittenIndex = (currentKittenIndex + 1) % kittenImages.length;
    }

    // Mostrar el primer gatito al cargar la app
    showNextKitten();

    // Cambiar la imagen cada 3 segundos
    setInterval(showNextKitten, 3000);

    // Añadir el contenedor al contenido de la app
    content.appendChild(appContainer);
}


function createCheckMateApp(content) {
    const appContainer = document.createElement('div');
    appContainer.style = 'padding: 20px; text-align: center; width: 100%; height: 100%; background-color: #f4f4f4;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'CheckMate: ¡Juega al Ajedrez!';
    title.style.color = 'black';
    appContainer.appendChild(title);

    // Crear el tablero de ajedrez (8x8)
    const chessBoard = document.createElement('div');
    chessBoard.style = 'display: grid; grid-template-columns: repeat(8, 50px); grid-template-rows: repeat(8, 50px); gap: 0;';
    appContainer.appendChild(chessBoard);

    // Título de la app
    const result = document.createElement('h2');
    result.textContent = '';
    result.style.color = 'green';
    appContainer.appendChild(result);


    // Representación del tablero con las piezas en sus posiciones iniciales
    const initialBoard = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['T', 'A', 'C', 'D', 'R', 'C', 'A', 'R']
    ];

    // Función para crear el tablero visual
    function drawBoard(board) {
        chessBoard.innerHTML = ''; // Limpiar el tablero antes de redibujarlo
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.style = 'width: 50px; height: 50px; display: flex; justify-content: center; align-items: center;';
                square.style.backgroundColor = (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863';
                square.dataset.row = row;
                square.dataset.col = col;
                square.textContent = board[row][col] === '.' ? '' : board[row][col].toUpperCase();
                square.style.cursor = 'pointer';
                square.addEventListener('click', handleSquareClick);
                chessBoard.appendChild(square);
            }
        }
    }

    let selectedPiece = null;

    // Función para manejar el clic en las casillas del tablero
    function handleSquareClick(event) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        const clickedPiece = initialBoard[row][col];

        if (selectedPiece) {
            // Si hay una pieza seleccionada, intentamos moverla
            if (clickedPiece === '.') {
                initialBoard[row][col] = selectedPiece;
                initialBoard[selectedPiece.row][selectedPiece.col] = '.';
                selectedPiece = null;
                drawBoard(initialBoard);
                checkForCheckMate(); // Comprobamos si hay Jaque Mate
            } else {
                // Si la casilla tiene otra pieza, seleccionamos esa pieza
                selectedPiece = { row, col };
            }
        } else {
            // Seleccionamos una pieza
            if (clickedPiece !== '.') {
                selectedPiece = { piece: clickedPiece, row, col };
            }
        }
    }

    // Función para comprobar si hay Jaque Mate (simplificada)
    function checkForCheckMate() {
        // Verifica si el rey está en jaque mate. Para simplificar, se podría verificar con condiciones básicas.
        const isCheckMate = false; // Esta función sería más compleja en un juego real, pero es un lugar para la lógica
        if (isCheckMate) {
            result.textContent = '¡CheckMate! Has ganado!';
        }
    }

    // Función de IA para mover piezas aleatorias (solo para ejemplo)
    function aiMove() {
        // Movimiento aleatorio de una pieza, para simplificar la IA
        const randomRow = Math.floor(Math.random() * 8);
        const randomCol = Math.floor(Math.random() * 8);
        const piece = initialBoard[randomRow][randomCol];
        if (piece !== '.') {
            initialBoard[randomRow][randomCol] = '.';
            drawBoard(initialBoard);
            checkForCheckMate();
        }
    }

    // Dibujar el tablero inicial
    drawBoard(initialBoard);

    // Añadir un botón para que la IA haga su movimiento
    const aiButton = document.createElement('button');
    aiButton.textContent = 'Hacer Movimiento de la IA';
    aiButton.addEventListener('click', aiMove);
    appContainer.appendChild(aiButton);

    // Añadir el contenedor al contenido de la app
    content.appendChild(appContainer);
}


function createAnimalEncyclopediaApp(content) {
    // Crear el contenedor de la app
    const appContainer = document.createElement('div');
    appContainer.style = 'padding: 20px; text-align: center; width: 100%; height: 100%; background-color: #f4f4f4;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Enciclopedia Animal';
    title.style.color = 'green';
    appContainer.appendChild(title);

    // Lista de animales
    const animals = [
        { name: 'León', description: 'El león es un mamífero carnívoro de la familia Felidae, conocido como el rey de la selva.' },
        { name: 'Elefante', description: 'El elefante es el mamífero terrestre más grande, conocido por sus grandes orejas y trompa.' },
        { name: 'Tigre', description: 'El tigre es un gran felino caracterizado por su pelaje rayado y su habilidad como cazador.' },
        { name: 'Águila', description: 'El águila es un ave rapaz con una visión excepcional y gran habilidad para cazar.' },
        { name: 'Delfín', description: 'El delfín es un mamífero marino conocido por su inteligencia y habilidades sociales.' },
        { name: 'Cebra', description: 'La cebra es un mamífero herbívoro, conocida por su distintivo pelaje blanco y negro.' }
    ];

    // Contenedor de los animales
    const animalsContainer = document.createElement('div');
    animalsContainer.style = 'margin-bottom: 30px;';

    // Función para mostrar los animales en la lista
    animals.forEach(animal => {
        const animalItem = document.createElement('div');
        animalItem.textContent = animal.name;
        animalItem.style = 'cursor: pointer; font-size: 20px; color: #333; margin: 5px 0;';
        animalItem.addEventListener('click', () => showAnimalDescription(animal));
        animalsContainer.appendChild(animalItem);
    });

    // Crear el contenedor de la descripción
    const descriptionContainer = document.createElement('div');
    descriptionContainer.style = 'margin-top: 20px; padding: 10px; background-color: #fff; border: 1px solid #ccc; width: 60%; margin-left: auto; margin-right: auto; text-align: left; display: none;';

    const descriptionTitle = document.createElement('h3');
    descriptionTitle.textContent = 'Descripción:';
    descriptionContainer.appendChild(descriptionTitle);

    const descriptionText = document.createElement('p');
    descriptionContainer.appendChild(descriptionText);

    // Función para mostrar la descripción de un animal
    function showAnimalDescription(animal) {
        descriptionText.textContent = animal.description;
        descriptionContainer.style.display = 'block';
    }

    // Añadir la lista de animales y la descripción al contenedor principal
    appContainer.appendChild(animalsContainer);
    appContainer.appendChild(descriptionContainer);

    // Añadir el contenedor al contenido de la app
    content.appendChild(appContainer);
}


function createMartialArtsQuizApp(content) {
    // Crear el contenedor principal
    const appContainer = document.createElement('div');
    appContainer.style = 'padding: 20px; text-align: center; width: 100%; max-width: 600px; margin: auto;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Quiz de Artes Marciales';
    appContainer.appendChild(title);

    // Crear una lista de artes marciales
    const martialArts = [
        'Karate',
        'Judo',
        'Taekwondo',
        'Kung Fu',
        'Aikido',
        'Capoeira',
        'Muay Thai',
        'Boxeo', // Nuevo arte marcial añadido
    ];

    // Contenedor de botones para seleccionar un arte marcial
    const martialArtsContainer = document.createElement('div');
    martialArtsContainer.style = 'margin-top: 20px; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;';
    appContainer.appendChild(martialArtsContainer);

    martialArts.forEach((art) => {
        const button = document.createElement('button');
        button.textContent = art;
        button.style = 'padding: 10px 15px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;';
        button.addEventListener('click', () => startQuiz(art));
        martialArtsContainer.appendChild(button);
    });

    // Contenedor para el quiz
    const quizContainer = document.createElement('div');
    quizContainer.style = 'margin-top: 20px;';
    appContainer.appendChild(quizContainer);

    // Iniciar el quiz
    function startQuiz(art) {
        quizContainer.innerHTML = ''; // Limpiar el contenedor del quiz
        const questions = generateQuestions(art); // Generar preguntas específicas del arte marcial seleccionado
        let currentQuestion = 0;
        let correctAnswers = 0;

        // Mostrar una pregunta
        function showQuestion() {
            quizContainer.innerHTML = '';
            const question = questions[currentQuestion];

            const questionText = document.createElement('h3');
            questionText.textContent = question.text;
            quizContainer.appendChild(questionText);

            question.options.forEach((option, index) => {
                const optionButton = document.createElement('button');
                optionButton.textContent = option;
                optionButton.style = 'display: block; margin: 10px auto; padding: 10px 15px; background-color: #28a745; color: #fff; border: none; border-radius: 5px; cursor: pointer;';
                optionButton.addEventListener('click', () => {
                    if (index === question.correctIndex) correctAnswers++;
                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        showQuestion();
                    } else {
                        showResults();
                    }
                });
                quizContainer.appendChild(optionButton);
            });
        }

        // Mostrar los resultados
        function showResults() {
            quizContainer.innerHTML = '';
            const score = Math.round((correctAnswers / questions.length) * 100);

            const resultsText = document.createElement('h3');
            resultsText.textContent = `¡Quiz finalizado! Tu puntaje: ${correctAnswers}/${questions.length} (${score}%)`;
            quizContainer.appendChild(resultsText);

            const retryButton = document.createElement('button');
            retryButton.textContent = 'Volver a la lista';
            retryButton.style = 'margin-top: 15px; padding: 10px 15px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;';
            retryButton.addEventListener('click', () => {
                quizContainer.innerHTML = '';
                martialArtsContainer.style.display = 'flex';
            });
            quizContainer.appendChild(retryButton);

            martialArtsContainer.style.display = 'none';
        }

        showQuestion(); // Iniciar con la primera pregunta
    }

    // Generar preguntas específicas por arte marcial
    function generateQuestions(art) {
        const questionsBase = {
            Karate: [
                { text: '¿Cuál es el significado de Karate?', options: ['Mano Vacía', 'Arte de la Espada', 'Defensa Personal', 'Combate'], correctIndex: 0 },
                { text: '¿Dónde se originó el Karate?', options: ['Japón', 'China', 'Corea', 'Tailandia'], correctIndex: 0 },
            ],
            Boxeo: [ // Preguntas específicas de Boxeo
                { text: '¿En qué país se originó el boxeo moderno?', options: ['Reino Unido', 'Estados Unidos', 'Grecia', 'México'], correctIndex: 0 },
                { text: '¿Qué es un "jab"?', options: ['Un golpe recto rápido', 'Un golpe curvo', 'Una posición defensiva', 'Un movimiento de piernas'], correctIndex: 0 },
                { text: '¿Cuántos rounds tiene una pelea profesional estándar?', options: ['12', '10', '15', '8'], correctIndex: 0 },
                { text: '¿Qué significa "KO" en boxeo?', options: ['Knock Out', 'King of Ring', 'Knock On', 'Knee On'], correctIndex: 0 },
                { text: '¿Qué equipo es obligatorio usar en el boxeo?', options: ['Guantes', 'Cascos', 'Botas', 'Todas las anteriores'], correctIndex: 0 },
                { text: '¿Qué técnica se utiliza para esquivar golpes?', options: ['Bob and Weave', 'Hook', 'Cross', 'Jab'], correctIndex: 0 },
                { text: '¿Cómo se llama el área donde se lleva a cabo una pelea?', options: ['El ring', 'El dojo', 'El tatami', 'La jaula'], correctIndex: 0 },
            ],
        };

        const generalQuestions = [
            { text: '¿Qué es un dojo?', options: ['Lugar de entrenamiento', 'Maestro', 'Tipo de técnica', 'Estilo'], correctIndex: 0 },
            { text: '¿Qué representa el cinturón negro?', options: ['Maestría', 'Principiante', 'Intermedio', 'Ninguna'], correctIndex: 0 },
            { text: '¿Qué es un kata?', options: ['Forma', 'Pelea', 'Meditación', 'Saludo'], correctIndex: 0 },
        ];

        return [...(questionsBase[art] || []), ...generalQuestions].slice(0, 7);
    }

    // Añadir el contenedor al contenido de la app
    content.appendChild(appContainer);
}

function createSubwaySurfersApp(content) {
    // Crear el contenedor principal de la app
    const appContainer = document.createElement('div');
    appContainer.style = 'position: relative; width: 800px; height: 600px; border: 2px solid #333; overflow: hidden; margin: 0 auto;';

    // Crear el jugador (ratón)
    const player = document.createElement('div');
    player.style = `
        width: 50px; 
        height: 50px; 
        background-color: orange; 
        border-radius: 50%; 
        position: absolute; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%);
    `;
    appContainer.appendChild(player);

    // Crear el enemigo (policía)
    const police = document.createElement('img');
    police.src = 'https://i.pinimg.com/736x/81/9c/25/819c2584e5c7208de8be7308c76dfc91.jpg'; // Cambia esta URL por una imagen de policía
    police.style = `
        width: 70px; 
        height: 70px; 
        position: absolute; 
        top: 10px; 
        left: 10px; 
        transition: top 0.5s, left 0.5s;
    `;
    appContainer.appendChild(police);

    // Contenedor del puntaje
    const scoreContainer = document.createElement('div');
    scoreContainer.textContent = 'Puntaje: 0';
    scoreContainer.style = `
        position: absolute; 
        top: 10px; 
        right: 10px; 
        padding: 10px; 
        background: rgba(0, 0, 0, 0.7); 
        color: white; 
        border-radius: 5px;
    `;
    appContainer.appendChild(scoreContainer);

    // Añadir el contenedor principal al contenido
    content.appendChild(appContainer);

    // Variables del juego
    let score = 0;
    let gameOver = false;

    // Función para mover al jugador con el ratón
    document.addEventListener('mousemove', (e) => {
        if (gameOver) return;
        const rect = appContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            player.style.left = `${x - player.offsetWidth / 2}px`;
            player.style.top = `${y - player.offsetHeight / 2}px`;
        }
    });

    // Función para mover al policía hacia el jugador
function movePolice() {
    if (gameOver) return;

    const playerRect = player.getBoundingClientRect();
    const policeRect = police.getBoundingClientRect();
    const appRect = appContainer.getBoundingClientRect(); // Obtener límites del contenedor

    // Distancias entre policía y jugador
    const dx = playerRect.left - policeRect.left;
    const dy = playerRect.top - policeRect.top;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const step = 20; // Tamaño del paso
    let newLeft = policeRect.left + (dx / distance) * step;
    let newTop = policeRect.top + (dy / distance) * step;

    // Verificar que los nuevos valores están dentro del área del contenedor
    if (newLeft < appRect.left) newLeft = appRect.left;
    if (newLeft + police.offsetWidth > appRect.right) newLeft = appRect.right - police.offsetWidth;
    if (newTop < appRect.top) newTop = appRect.top;
    if (newTop + police.offsetHeight > appRect.bottom) newTop = appRect.bottom - police.offsetHeight;

    // Si la distancia es pequeña, ataque rápido
    if (distance < 100) {
        police.style.transition = 'top 0.2s, left 0.2s';
        police.style.left = `${playerRect.left - appRect.left}px`;
        police.style.top = `${playerRect.top - appRect.top}px`;
    } else {
        // Movimiento gradual hacia el jugador
        police.style.transition = 'top 0.5s, left 0.5s';
        police.style.left = `${newLeft - appRect.left}px`;
        police.style.top = `${newTop - appRect.top}px`;
    }
}


    // Función para detectar colisiones
    function checkCollision() {
        const playerRect = player.getBoundingClientRect();
        const policeRect = police.getBoundingClientRect();

        if (
            playerRect.left < policeRect.right &&
            playerRect.right > policeRect.left &&
            playerRect.top < policeRect.bottom &&
            playerRect.bottom > policeRect.top
        ) {
            endGame();
        }
    }

    // Función para finalizar el juego
    function endGame() {
        gameOver = true;
        alert(`¡Has sido atrapado! Puntaje final: ${score}`);
        clearInterval(policeInterval);
        clearInterval(scoreInterval);
    }

    // Intervalo para mover al policía y verificar colisiones
    const policeInterval = setInterval(() => {
        movePolice();
        checkCollision();
    }, 500);

    // Intervalo para sumar puntos cada 15 segundos
    const scoreInterval = setInterval(() => {
        if (!gameOver) {
            score++;
            scoreContainer.textContent = `Puntaje: ${score}`;
        }
    }, 15000);
}

function createUnlockLinkApp(content) {
    // Crear el contenedor de la app
    const appContainer = document.createElement('div');
    appContainer.style = 'padding: 20px; text-align: center; position: fixed; width: 100%; height auto; border: 1px solid #ccc; border-radius: 8px;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Desbloquear Enlace';
    appContainer.appendChild(title);

    // Sección para mostrar acciones
    const actionsContainer = document.createElement('div');
    actionsContainer.style = 'margin-bottom: 20px;';
    appContainer.appendChild(actionsContainer);

    // Enlace a desbloquear proporcionado por el desarrollador
    const unlockableLink = 'https://oceanandwild.github.io/AllApp/'; // Aquí defines tu enlace

    // Botón de desbloqueo
    const unlockButton = document.createElement('button');
    unlockButton.textContent = 'Desbloquear Enlace';
    unlockButton.disabled = true; // Inicialmente deshabilitado
    appContainer.appendChild(unlockButton);

    // Crear botón de acción manualmente
    function createActionButton(container, url) {
        const actionButton = document.createElement('button');
        actionButton.textContent = 'Visitar URL';
        actionButton.style = 'margin-right: 10px;';

        // Evento al hacer clic en el botón de acción
        actionButton.addEventListener('click', () => {
            window.open(url, '_blank'); // Abrir la URL en una nueva pestaña
            actionButton.textContent = 'Verificando...';
            actionButton.classList.add('button');
            actionButton.disabled = true;

            // Simular verificación de 5 segundos
            setTimeout(() => {
                actionButton.textContent = 'Verificado ✅';
                actionButton.classList.add('button-verified'); // Agregar clase para cambiar el color
                unlockButton.disabled = false; // Habilitar el botón de desbloqueo
            }, 5000);
        });

        container.appendChild(actionButton);
    }

    // Crear el botón de acción con el enlace proporcionado
    createActionButton(actionsContainer, unlockableLink);

    // Evento al hacer clic en el botón de desbloqueo
    unlockButton.addEventListener('click', () => {
        // Crear un Blob con el enlace para desbloquear
        const blobContent = `Visita este enlace: ${unlockableLink}`;
        const blob = new Blob([blobContent], { type: 'text/plain' });

        // Crear un enlace URL usando el Blob
        const blobUrl = URL.createObjectURL(blob);

        // Abrir el enlace Blob en una nueva pestaña
        window.open(blobUrl, '_blank');
    });

    // Añadir el contenedor al contenido de la app
    content.appendChild(appContainer);
}





function createSneakPeeksApp(content) {
    // Crear el contenedor de la app
    const appContainer = document.createElement('div');
    appContainer.style = 'padding: 20px; text-align: center; position: relative; width: 100%; height: 400px; border: 1px solid #ccc; overflow: hidden;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Sneak Peeks de Apps';
    appContainer.appendChild(title);

    // Información de la próxima aplicación
    const appName = document.createElement('h3');
    appName.textContent = 'Próxima App: Enciclopedia Animal'; // Cambia el nombre según lo que desees
    appName.style = 'margin-bottom: 10px;';
    appContainer.appendChild(appName);

    // Ícono de la próxima aplicación
    const appIcon = document.createElement('img');
    appIcon.src = 'https://i.pinimg.com/736x/ca/43/b4/ca43b45ff704e682c5768b5cea58f864.jpg'; // Reemplaza con el ícono real
    appIcon.alt = 'Ícono de la App';
    appIcon.style = 'width: 100px; height: auto; margin-bottom: 20px;';
    appContainer.appendChild(appIcon);

    // Contenedor de la cuenta regresiva
    const countdownContainer = document.createElement('div');
    countdownContainer.style = 'font-size: 24px; color: #333;';
    appContainer.appendChild(countdownContainer);

    // Fecha de lanzamiento de la aplicación
    const releaseDate = new Date('2024-11-15T21:00:00'); // Ajusta la fecha y hora del lanzamiento

    // Función para actualizar la cuenta regresiva
    function updateCountdown() {
        const now = new Date();
        const timeRemaining = releaseDate - now;

        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            countdownContainer.textContent = `Lanzamiento en: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            countdownContainer.textContent = '¡La aplicación ya está disponible!';
        }
    }

    // Actualizar la cuenta regresiva cada segundo
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamar la función inicialmente

    // Añadir el contenedor al contenido de la app
    content.appendChild(appContainer);
}


function createCatGameApp(content) {
    
        // Crear el contenedor de la app
        const appContainer = document.createElement('div');
        appContainer.style = `
            padding: 20px; text-align: center; position: relative; 
            width: 100%; height: 400px; border: 1px solid #ccc; overflow: hidden;
        `;

        // Título de la app
        const title = document.createElement('h2');
        title.textContent = 'Juego para Gatos: Atrapa a la Rata';
        appContainer.appendChild(title);

        // Subtítulo de la dificultad
        const title2 = document.createElement('h3');
        title2.textContent = '¡DIFÍCIL!';
        title2.style.color = 'red'; // Se aplica el color rojo al texto
        appContainer.appendChild(title2);

        const title3 = document.createElement('h3');
        title3.textContent = '';
        title3.style.color = 'blue'; // Subtítulo dinámico
        appContainer.appendChild(title3);

        // Contador de puntos
        let points = 0;
        const pointsContainer = document.createElement('div');
        pointsContainer.textContent = `Puntos: ${points}`;
        pointsContainer.style = 'margin-bottom: 20px; font-size: 18px;';
        appContainer.appendChild(pointsContainer);

        // Crear la imagen de la rata
        const ratImage = document.createElement('img');
        ratImage.src = 'https://i.pinimg.com/736x/7c/53/37/7c5337122b7191e1f09b060318f83bdd.jpg';
        ratImage.style = 'width: 50px; height: auto; position: absolute; cursor: pointer;';
        appContainer.appendChild(ratImage);

        // Crear el audio de burla
        const laughAudio = new Audio('https://ia600605.us.archive.org/19/items/muajajajh_202411/Muajajajh.mp3');

        // Lista de mensajes de burla y de burla por puntos
        const ratTaunts = [
            '¡Muy lento! 🐭', '¿Entrenaste el dedo? 😂', '¡Intenta cuando seas más rápido! 😜',
            '¡MEJORA TU VELOCIDAD! 😆', 'MUY NOOB 🤣', 'EZ!!🤣🤣👎', 'NAH I´D WIN 🗿'
        ];
        const ratTauntsByPoints = [
            { threshold: 0, message: '¿Solo uno? ¡Vamos, que mal que juegas! 😂' },
            { threshold: 5, message: '¿Solo 5 puntos? ¡Esfuérzate más! 😜' },
            { threshold: 10, message: '¡10 puntos y nada más! ¡Te estoy ganando! 😆' },
            { threshold: 20, message: '¡20 puntos! Te reto, ni en 3 años llegarás a 30. 🤣' },
            { threshold: 30, message: '¡Wow, 30 puntos! Pero sigo siendo más rápido. 🐭💨' },
        ];

        // Mover la rata a una posición aleatoria
        function moveRatRandomly() {
            const maxX = appContainer.clientWidth - ratImage.clientWidth;
            const maxY = appContainer.clientHeight - ratImage.clientHeight;

            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);

            ratImage.style.left = `${randomX}px`;
            ratImage.style.top = `${randomY}px`;
        }

        // Mostrar mensaje de burla basado en puntos
        function ratLaughByPoints() {
            const taunt = ratTauntsByPoints.find((t) => points >= t.threshold);
            if (taunt) {
                title3.textContent = `Rata: ${taunt.message}`;
            }
        }

        // Evento clic en la rata
        ratImage.addEventListener('click', () => {
            points += 1;
            pointsContainer.textContent = `Puntos: ${points}`;
            ratLaughByPoints();
        });

        // Evento clic en el contenedor
        appContainer.addEventListener('click', (event) => {
            if (event.target !== ratImage) {
                laughAudio.currentTime = 0;
                laughAudio.play();
            }
        });

        // Mostrar mensajes de burla aleatorios
        function ratLaugh() {
            const randomMessage = ratTaunts[Math.floor(Math.random() * ratTaunts.length)];
            title2.textContent = `Rata: ${randomMessage}`;
        }

        // Intervalos para mover la rata y burlarse
        setInterval(moveRatRandomly, 800);
        setInterval(ratLaugh, 5000);

        // Agregar el contenedor de la app
        content.appendChild(appContainer);
    }








function createUpdateAndBalanceChangesApp(content) {
    // Crear el contenedor de la app
    const appContainer = document.createElement('div');
    appContainer.style = 'padding: 20px; text-align: center;';

    // Título de la app
    const title = document.createElement('h2');
    title.textContent = 'Actualizaciones y Cambios de Balance';
    appContainer.appendChild(title);

    // Lista de actualizaciones organizadas por categorías
    const updates = [
        {
            version: '14/11/2024',
            categories: {
                'Correcciones de Errores': [
                    'Se corrigió un problema por el cual el icono de nuevo no aparecía en la app correctamente',
                    'Se corrigió un problema que hacía que el calendario al poner la celda vacía (del próximo mes) mostrara como si el mes tuviera un día más en vez de decirte "1 de (tal mes)"',
                    'Se corrigió un problema en el que, al seleccionar una celda de un día, indicaba que debías poner una nota de otro día menos el que elegiste.'
                ],
                'Mejoras': [
                    'Ahora, si una aplicación es nueva, en la tienda aparecerá un texto "Nuevo!" y en el contenedor de las aplicaciones aparecerá un icono de nuevo',
                    'Ahora, si una aplicación ha sido mejorada, en la tienda aparecerá un texto "Mejorada!" y en el contenedor de las aplicaciones aparecerá un icono de mejorada',
                    'La tienda ahora tiene un botón para cerrar.',
                    'Los botones de la tienda ahora tienen un marco multicolor (arco iris) y un fondo oceánico',
                    'La tienda ahora tiene un fondo de jungla para completar el diseño.'
                ],
                'Optimizaciones': [
                    'Se optimizó la ventana de la aplicación, ahora es más grande, optimizada para usuarios de PC.',
                    'Se optimizó el renderizado de los botones',
                    'Se optimizó la tienda cambiando la posición de los botones: Antes: Horizontal | Ahora: Vertical',
                ],
                'Apps': [
                    'Nueva App: Actualizaciones y Cambios de Balance',
                    'Se mejoró la app "Calendario", permitiendo ahora tomar notas para un día específico y marcar en rojo el día de hoy.',
                    'Se agregaron más ingredientes y combinaciones a la app "Mixer"',
                    'La app "RNG" fue renovada a "RNG de Auras"',
                    'La app "Updates" ha sido removida y reemplazada por "Actualizaciones y Cambios de Balance"',
                ]
            }
        },
        {
            version: '15/11/2024',
            categories: {
                'Correcciones de Errores': [
                    'Se corrigió un problema con el boton Cerrar que hacía que cuando vayas a usar el botón Anterior o Siguiente, el botón Cerrar desaparecía, esto especialmente afectaba usuarios de Móvil ya que no usan las teclas.',
                    'Se corrigió un problema en la cual no te mostraba las versiones mas recientes de la aplicacion en la app "Actualizaciones y Cambios de Balance"'
                ],
                'Mejoras': [
                    'Ahora puedes usar la Tecla Esc para poder cerrar la tienda. (Solo usuarios de PC)',
                    'Ahora si es que la app esta en Mantenimiento, la app no se podra instalar hasta que este salga de tal mantenimiento.'
                ],
                'Optimizaciones': [
                    // Agrega las optimizaciones aquí
                ],
                'Apps': [
                    'Nueva App: Juego de Gatos: The Rat',
                    'La app "Sugerir App" ha sido mejorada y ahora al dar una sugerencia de app te redireccionara a Whatsapp para que tu app sea aceptada o rechazada, incluida o no.',
                    'Nueva App: Sneak Peeks de Apps',
                    'Nueva App: Escape Police. Una app de un intento similar a Subway Surfers.'
                ]
            }
        },
        {
            version: '16/11/2024',
            categories: {
                'Correcciones de Errores': [
                    
                ],
                'Mejoras': [
                   
                ],
                'Optimizaciones': [
                    'Se optimizo el boton Cerrar en las aplicaciones para que sea adaptable y funcione correctamente, especialmente en usuarios de Movil.'
                ],
                'Apps': [
                 'Nueva App: Unlock Link'
                ]
            }
        },
        {
            version: '20/11/2024',
            categories: {
                'Correcciones de Errores': [
                    
                ],
                'Mejoras': [
                   
                ],
                'Optimizaciones': [
                    
                ],
                'Apps': [
                 'Se mejoro la app de Notas',
                ]
            }
        },
        {
            version: '21/11/2024',
            categories: {
                'Correcciones de Errores': [
                    
                ],
                'Mejoras': [
                   
                ],
                'Optimizaciones': [
                    'Se optimizo la aplicacion de Juego de Gatos: Atrapa la rata para que sea menos dificil atraparla aunque sigue siendo un desafio.'
                ],
                'Apps': [
                 'Se mejoro la app de Mixer: Con esta mejora, esta app contiene un ingrediente y combinaciones para asegurar que no se pierda el interes en la app.',
                 'Se mejoro la app de RNG: Ahora contiene mas auras, es mas dificil de su obtencion y se corrigieron algunos problemas con su sistema.',
                 'Nueva App: Escape Police.    Una app que es similar a "Subway Surfers" tecnicamente, una recreacion'
                ]
            }
        },
        {
            version: '22/11/2024',
            categories: {
                'Correcciones de Errores': [
                    
                ],
                'Mejoras': [
                   'Ahora en vez de que el icono de la app deje una parte en verde cuando se ve el icono de la app en vista de instalado, a partir de ahora el icono/imagen acaparara todo sin dejar ningun espacio para mejorar la personalizacion moderna.'
                ],
                'Optimizaciones': [
                    'Ahora la tienda esta optimizada para que puedas adaptar la cantidad de apps por pagina, por defecto es 7 pero puedes cambiarlo a tu gusto con esta nueva configuracion'
                ],
                'Apps': [
                 'Se mejoro la app "Juego de Gatos: Atrapa la rata, ahora la rata se puede burlar si no le atinas.',
                 'Nueva App: Quiz de Artes Marciales',
                 'Nueva App: Enciclopedia Animal.  Perdon por la tardanza',
                 'La app "Sneak Peeks de Apps" ha sido removida',
                 'La app "CheckMate" ya es funcional y ha sido reworkeada',
                 'Nueva App: Galeria de Gatitos',
                 'Se agregaron a varias apps sus imagenes correspondientes, seguiremos agregando a las demas pronto.'
                ]
            }
        },
    ];

    // Crear un menú desplegable para seleccionar la versión
    const versionSelect = document.createElement('select');
    versionSelect.style = 'margin: 10px; padding: 5px;';
    updates.forEach((update, index) => {
        const option = document.createElement('option');
        option.value = index;  // El valor es el índice
        option.textContent = update.version;  // Muestra la versión
        versionSelect.appendChild(option);
    });
    appContainer.appendChild(versionSelect);

    // Contenedor para mostrar los cambios de la versión seleccionada
    const changesContainer = document.createElement('div');
    changesContainer.style = 'margin-top: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;';
    appContainer.appendChild(changesContainer);

    // Función para mostrar los cambios de la versión seleccionada
    function displayChanges(index) {
        const update = updates[index];
        changesContainer.innerHTML = ''; // Limpiar contenido previo

        const versionHeading = document.createElement('h3');
        versionHeading.textContent = `Versión: ${update.version}`;
        changesContainer.appendChild(versionHeading);

        // Mostrar las categorías y sus cambios
        Object.keys(update.categories).forEach(category => {
            const categoryHeading = document.createElement('h4');
            categoryHeading.textContent = category;
            changesContainer.appendChild(categoryHeading);

            const changesList = document.createElement('ul');
            const changes = update.categories[category];

            if (changes.length > 0) {
                changes.forEach(change => {
                    const listItem = document.createElement('li');
                    listItem.textContent = change;
                    changesList.appendChild(listItem);
                });
            } else {
                const emptyItem = document.createElement('li');
                emptyItem.textContent = 'No hay cambios';
                changesList.appendChild(emptyItem);
            }

            changesContainer.appendChild(changesList);
        });
    }

    // Mostrar cambios de la versión seleccionada al cargar
    versionSelect.addEventListener('change', () => {
        const selectedIndex = parseInt(versionSelect.value);  // Asegurarse de que el valor sea un número entero
        displayChanges(selectedIndex);
    });
    displayChanges(0); // Mostrar cambios de la primera versión por defecto

    // Añadir el contenedor al contenido de la app
    content.appendChild(appContainer);
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
    appNameInput.placeholder = 'Nombre de la App';
    appNameInput.required = true;
    appNameInput.style = 'padding: 10px; margin-bottom: 10px; width: 80%; border-radius: 4px; border: 1px solid #ccc;';
    form.appendChild(appNameInput);

    // Input para la descripción de la app
    const appDescriptionInput = document.createElement('textarea');
    appDescriptionInput.placeholder = 'Aqui debe de ir que hara principlamente la App';
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
        const appName = encodeURIComponent(appNameInput.value.trim());
        const appDescription = encodeURIComponent(appDescriptionInput.value.trim());

        // URL de WhatsApp con los datos de la sugerencia
        const whatsappUrl = `https://wa.me/598099685536?text=Nombre%20de%20la%20App:%20${appName}%0ADescripción:%20${appDescription}`;

        // Redirigir a WhatsApp
        window.open(whatsappUrl, '_blank');

        // Confirmación de que la sugerencia fue enviada
        const confirmationMessage = document.createElement('p');
        confirmationMessage.textContent = `Gracias por sugerir "${appNameInput.value}". ¡Tu sugerencia ha sido enviada a WhatsApp!`;
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


// Definir las auras y su rareza (1 entre X)
const auras = [
    { name: 'Aura de Luz', rarity: 10 },            // 1 entre 10
    { name: 'Aura de Oscuridad', rarity: 20 },      // 1 entre 50
    { name: 'Aura de Fuego', rarity: 30 },         // 1 entre 100
    { name: 'Aura de Agua', rarity: 50 },          // 1 entre 500
    { name: 'Aura de Tierra', rarity: 100 },      // 1 entre 1,000
    { name: 'Aura de Viento', rarity: 150 },     // 1 entre 10,000
    { name: 'Aura Cósmica', rarity: 300 },      // 1 entre 100,000
    { name: 'Aura de Eternidad', rarity: 500 } // 1 entre 1,000,000
];

// Función para rodar y obtener un aura basada en la rareza
function rollAura() {
    const totalWeight = auras.reduce((acc, aura) => acc + 1 / aura.rarity, 0); // Calcular el peso total
    const randomValue = Math.random() * totalWeight; // Generar un número aleatorio entre 0 y totalWeight
    let cumulativeWeight = 0;

    for (const aura of auras) {
        cumulativeWeight += 1 / aura.rarity; // Incrementar el peso acumulativo
        if (randomValue <= cumulativeWeight) {
            return aura; // Retornar el aura correspondiente
        }
    }
    return auras[auras.length - 1]; // Retornar la última aura como respaldo
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
    title.textContent = 'RNG de Auras';
    appRNGContainer.appendChild(title);

    const rollBtn = document.createElement('button');
    rollBtn.textContent = 'Rodar Aura';
    rollBtn.style.padding = '10px 20px';
    rollBtn.style.margin = '10px 0';
    appRNGContainer.appendChild(rollBtn);

    const resultDisplay = document.createElement('p');
    resultDisplay.textContent = 'Aura obtenida: ';
    appRNGContainer.appendChild(resultDisplay);

    // Función para rodar y mostrar un aura
    rollBtn.addEventListener('click', () => {
        const aura = rollAura(); // Obtener un aura
        resultDisplay.textContent = `Aura obtenida: ${aura.name} (1 entre ${aura.rarity})`;
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
        "Tierra+Tierra": "Montaña",
        "Aire+Fuego": "Explosión",
        "Aire+Tierra": "Arena",
        "Aire+Aire": "Huracán",
        "Agua+Tierra": "Pantano",
        "Fuego+Aire": "Fuego Salvaje",
        "Tierra+Aire": "Tornado de Polvo",
        "Fuego+Metal": "Hierro Fundido",
        "Agua+Metal": "Óxido",
        "Tierra+Metal": "Caverna de Minerales",
        "Aire+Metal": "Sonido de Eco",
        "Metal+Metal": "Aleación",
        "Agua+Fuego": "Géiser",
        "Tierra+Fuego": "Volcán",
        "Aire+Agua": "Niebla",
        "Agua+Aire": "Lluvia",
        "Tierra+Aire": "Erosión",
        "Aire+Tierra": "Polvo",
        "Fuego+Metal": "Forja",
        "Metal+Fuego": "Escudo Térmico",
        "Agua+Metal": "Corrosión",
        "Metal+Agua": "Condensación",
        "Tierra+Metal": "Mineralización",
        "Metal+Tierra": "Yacimiento",
        "Aire+Metal": "Viento Cortante",
        "Metal+Aire": "Pararrayos",
        "Agua+Madera": "Árbol en Crecimiento",
        "Madera+Agua": "Raíz Podrida",
        "Fuego+Madera": "Ceniza",
        "Madera+Fuego": "Carbón",
        "Tierra+Madera": "Bosque",
        "Madera+Tierra": "Fertilizante",
        "Aire+Madera": "Semilla Voladora",
        "Madera+Aire": "Rama Rota",
        "Metal+Madera": "Hacha", 
        "Madera+Metal": "Savia Metálica",
        "Electricidad+Agua": "Electrocución",
        "Electricidad+Fuego": "Rayo",
        "Electricidad+Tierra": "Cristal",
        "Electricidad+Aire": "Relámpago",
        "Electricidad+Metal": "Magnetismo",
        "Electricidad+Madera": "Árbol Petrificado",
        "Electricidad+Electricidad": "Sobrecarga",
        "Luz+Oscuridad": "Equilibrio",
        "Luz+Agua": "Arcoíris",
        "Luz+Fuego": "Llama Brillante",
        "Luz+Tierra": "Desierto",
        "Luz+Aire": "Aurora Boreal",
        "Luz+Metal": "Brillo Metálico",
        "Luz+Madera": "Fotosíntesis",
        "Oscuridad+Agua": "Profundidad Marina",
        "Oscuridad+Fuego": "Fuego Fatuo",
        "Oscuridad+Tierra": "Caverna",
        "Oscuridad+Aire": "Noche Estrellada",
        "Oscuridad+Metal": "Obsidiana",
        "Oscuridad+Madera": "Madera Petrificada",
        "Agua+Cristal": "Hielo Puro",
        "Fuego+Cristal": "Llama Clara",
        "Tierra+Cristal": "Esmeralda",
        "Aire+Cristal": "Viento Transparente",
        "Metal+Cristal": "Acero Cristalizado",
        "Luz+Cristal": "Prisma Brillante",
        "Oscuridad+Cristal": "Sombra Reflejada"
    };

    // Contenedor de ingredientes y resultado
    content.innerHTML = `
        <h2>Mixer</h2>
        <div style="margin-bottom: 15px;">
            <select id="ingredient1">
                <option value="Agua">Agua</option>
                <option value="Fuego">Fuego</option>
                <option value="Tierra">Tierra</option>
                <option value="Aire">Aire</option>
                <option value="Metal">Metal</option>
                <option value="Madera">Madera</option>
                <option value="Electricidad">Electricidad</option> 
                <option value="Luz">Luz</option>
                <option value="Oscuridad">Oscuridad</option>
                <option value="Cristal">Cristal</option>
            </select>
            +
            <select id="ingredient2">
                <option value="Agua">Agua</option>
                <option value="Fuego">Fuego</option>
                <option value="Tierra">Tierra</option>
                <option value="Aire">Aire</option>
                <option value="Metal">Metal</option>
                <option value="Madera">Madera</option>
                <option value="Electricidad">Electricidad</option> 
                <option value="Luz">Luz</option>
                <option value="Oscuridad">Oscuridad</option>
                <option value="Cristal">Cristal</option>
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
    content.innerHTML = '<h3>Calendario</h3>';

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const notes = {}; // Objeto para guardar notas

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
    const firstDay = new Date(currentYear, currentMonth).getDay();
    let date = 1;
    let nextMonthDate = 1;

    // Llenar el calendario con los días del mes
    for (let i = 0; i < 6; i++) { // 6 semanas como máximo en un mes
        const row = calendar.insertRow();
        for (let j = 0; j < 7; j++) {
            const cell = row.insertCell();
            cell.style = `
                text-align: center;
                padding: 10px;
                border: 1px solid #ccc;
                cursor: pointer;
            `;

            if (i === 0 && j < firstDay) {
                // Dejar celdas vacías antes del primer día del mes
                cell.textContent = '';
            } else if (date > daysInMonth(currentMonth, currentYear)) {
                // Mostrar días del próximo mes si el mes actual ha terminado
                cell.textContent = nextMonthDate;
                const nextMonth = (currentMonth + 1) % 12;
                const nextYear = currentMonth + 1 > 11 ? currentYear + 1 : currentYear;
                const currentDateText = nextMonthDate;

                // Evento para tomar notas para el próximo mes
                cell.addEventListener('click', () => {
                    const note = prompt(`Añade una nota para el ${currentDateText} de ${getMonthName(nextMonth)}:`, notes[`${currentDateText}-${nextMonth}-${nextYear}`] || '');
                    if (note) {
                        notes[`${currentDateText}-${nextMonth}-${nextYear}`] = note;
                        alert(`Nota guardada para el ${currentDateText} de ${getMonthName(nextMonth)}: ${note}`);
                    }
                });

                nextMonthDate++;
            } else {
                cell.textContent = date;
                const currentDateText = date;

                // Marcar en rojo el día de hoy
                if (date === currentDay) {
                    cell.style.backgroundColor = 'red';
                    cell.style.color = 'white';
                }

                // Evento para tomar notas para el mes actual
                cell.addEventListener('click', () => {
                    const note = prompt(`Añade una nota para el ${currentDateText} de ${getMonthName(currentMonth)}:`, notes[`${currentDateText}-${currentMonth}-${currentYear}`] || '');
                    if (note) {
                        notes[`${currentDateText}-${currentMonth}-${currentYear}`] = note;
                        alert(`Nota guardada para el ${currentDateText} de ${getMonthName(currentMonth)}: ${note}`);
                    }
                });

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

function createNoteApp(content) {
    content.innerHTML += `<h3>Notas</h3>`;
  
    const noteArea = document.createElement('textarea');
    noteArea.id = 'noteArea';
    noteArea.style = 'width: 90%; height: 80px; padding: 5px; resize: none; box-sizing: border-box;';
    content.appendChild(noteArea);
  
    // Botón para guardar la nota
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar nota';
    saveButton.addEventListener('click', () => {
      const noteContent = noteArea.value;
      const noteName = prompt('Nombre de la nota:');
      if (noteName) {
        localStorage.setItem(noteName, noteContent);
        alert('Nota guardada!');
      }
    });
    content.appendChild(saveButton);
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
