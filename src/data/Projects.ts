import {ProjectSchema} from "@/schemas/ProjectSchemas";

const ProjectsData: ProjectSchema [] = [
    {
        "id": 1,
        "name": "Sisga",
        "type": "desktop",
        "bannerPath": "/images/banners/sisga_banner.webp",
        "logoPath": "/images/projects-images/sisga/logo.webp",
        "imagesPath": "/images/projects-images/sisga/",
        "repositoryUrl": "https://gitfront.io/r/CorteStudios/SbexuTXSNetu/sisga/",
        "publishUrl": "",
        "status": "inProgress",
        "techStack": ["JavaFx", "Spring Boot", "Hibernate", "MySQL", "Java 8"],
        "description": "Sisga (Sistema de gestión de acuerdos) fue creado para automatizar y agilizar el proceso de reuniones y acuerdos de la entidad, generar gráficas de decisión y expedir documentos con firmas digitales."
    },
    {
        "id": 2,
        "name": "Find my Phrase",
        "type": "desktop",
        "bannerPath": "/images/banners/find_my_phrase_banner.webp",
        "logoPath": "/images/projects-images/find_my_phrase/logo.webp",
        "imagesPath": "/images/projects-images/find_my_phrase/",
        "repositoryUrl": "https://gitfront.io/r/CorteStudios/LCuBTfGyDmNY/FindMyPhrase/",
        "publishUrl": "",
        "status": "finished",
        "techStack": ["Java Swing", "PDFReader"],
        "description": "Find my phrase surge como una inquietud y un proyecto personal, de manera simple permite encontrar una lista de PDFs que contengan una palabra o una frase con solo brindar un directorio."
    },
    {
        "id": 3,
        "name": "Power Off",
        "type": "desktop",
        "bannerPath": "/images/banners/power_off_banner.webp",
        "logoPath": "/images/projects-images/power_off/logo.webp",
        "imagesPath": "/images/projects-images/power_off/",
        "repositoryUrl": "https://gitfront.io/r/CorteStudios/tXkqYaqndTR9/PowerOff/",
        "publishUrl": "",
        "status": "finished",
        "techStack": ["C#", "Windows Form"],
        "description": "Power Off permite reocrrer todos los equipos de una LAN para ejecutar comandos o automatizar los mismos mediante una interfaz sencilla y cómoda"
    },
    {
        "id": 4,
        "name": "Casero",
        "type": "mobile",
        "bannerPath": "/images/banners/casero_banner.webp",
        "logoPath": "/images/projects-images/casero/logo.webp",
        "imagesPath": "/images/projects-images/casero/",
        "repositoryUrl": "https://gitfront.io/r/CorteStudios/UYmAFyriyj7b/Casero/",
        "publishUrl": "",
        "status": "finished",
        "techStack": ["Java", "Jsoup", "Scraping Web", "Android SDK"],
        "description": "Casero fue concebida para mejorar la experiencia y brindar nuevas funcionalidades al antiguo sistema de gestión de huéspedes para casas particulares."
    },
    {
        "id": 5,
        "name": "Conservador Trinidad",
        "type": "mobile",
        "bannerPath": "/images/banners/conservador_banner.webp",
        "logoPath": "/images/projects-images/conservador_trinidad/logo.webp",
        "imagesPath": "/images/projects-images/conservador_trinidad/",
        "repositoryUrl": "https://gitfront.io/r/CorteStudios/9jrDP6augZvN/ConservadorTrinidad/",
        "publishUrl": "",
        "status": "finished",
        "techStack": ["Kotlin", "Android SDK"],
        "description": "Conservador Trinidad sirve como una herrmamienta promocional de la empresa Oficina del Conservador de Trinidad, además brinda funcionalidades para las inscripciones de eventos relacionados a la entidad."
    },
    {
        "id": 6,
        "name": "Recárgame App",
        "type": "mobile",
        "bannerPath": "/images/banners/recargame_banner.webp",
        "logoPath": "/images/projects-images/recargame_app/logo.webp",
        "imagesPath": "/images/projects-images/recargame_app/",
        "repositoryUrl": "https://gitfront.io/r/CorteStudios/AQFN4tD5dUV3/Recargame-app/",
        "publishUrl": "https://play.google.com/store/apps/details?id=com.cortestudios.recargameapp",
        "status": "finished",
        "techStack": ["Java", "Room", "Android SDK"],
        "description": "Recárgame App fue desarrollada como parte del encargo de un cliente para gestionar las facturas y transferencias del sistema de dicha compañia(Recárgame), permitiendo la sincronizacion local y online de los datos."
    },
    {
        "id": 7,
        "name": "Dememo",
        "type": "mobile",
        "bannerPath": "/images/banners/dememo_banner.webp",
        "logoPath": "/images/projects-images/dememo/logo.webp",
        "imagesPath": "/images/projects-images/dememo/",
        "repositoryUrl": "https://github.com/ElioReyesGlez/DeMeMo",
        "publishUrl": "https://play.google.com/store/apps/details?id=com.erg.memorized",
        "status": "finished",
        "techStack": ["Java", "Firebase", "Realm", "Android SDK"],
        "description": "Dememo fue un proyecto en conjunto donde fui coautor, la idea original fue concebida por el Ing. Elioenai Reyes González https://www.linkedin.com/in/elioenai-reyes-gonzález como parte de un proyecto para el movimiento cristiano."
    },
    {
        "id": 8,
        "name": "Casero Server",
        "type": "web",
        "bannerPath": "/images/banners/casero_server_banner.webp",
        "logoPath": "/images/projects-images/casero/logo.webp",
        "imagesPath": "/images/projects_imgs/casero_server/",
        "repositoryUrl": "https://gitfront.io/r/CorteStudios/YoM29uPTsSoR/caseroserver/",
        "publishUrl": "",
        "status": "inProgress",
        "techStack": ["Java", "Spring Boot", "Materializecss", "Hibernate", "MySQL", "JavaMail", "Thymeleaf", "Tomcat", "Javascript"],
        "description": "Casero server es una simple web que fue ideada para gestionar las solicitudes de licencias para la aplicación Android de Casero, permite registrar las solicitudes de licencias, eliminarlas, crearlas y enviarlas mediante correo electrónico"
    },
    {
        "id": 9,
        "name": "Cloud Scrapy",
        "type": "web",
        "bannerPath": "/images/banners/cloud_scrapy_banner.webp",
        "logoPath": "/images/projects-images/cloud_scrapy/logo.webp",
        "imagesPath": "/images/projects-images/cloud_scrapy/",
        "repositoryUrl": "https://gitfront.io/r/CorteStudios/aCGin7BUJQMz/CloudScrapy/",
        "publishUrl": "",
        "status": "finished",
        "techStack": ["NodeJs", "Web Scraping", "Express", "Puppeteer", "Mongo DB", "Redis", "Swagger", "Javascript", "Docker/docker-compose"],
        "description": "CloudScrapy es un API-Rest que permite controlar un navegador sin cabeza en un servidor mediante llamadas http a la API, este permite al usuario hacer scraping web, hacer capturas de pantallas y ejecutar instrucciones lo que permite dinamizar la navegación, además, permite hacer ejecuciones para solucionar acciones requeridas, entre otras cosas más. Surge con la idea de abstraer toda la lógica, complejidad y la configuración en un servidor así como el consumo de recursos de las aplicaciones que necesiten usarla. Posee una licencia ISC, puedes visitar el repositorio de github y leer parte de la documentación si le interesa."
    },
    {
        "id": 10,
        "name": "Unnax Payment Gateway",
        "type": "web",
        "bannerPath": "/images/banners/unnax_payment_gateway_banner.webp",
        "logoPath": "/images/projects-images/unnax_payment_gateway/logo.webp",
        "imagesPath": "/images/projects-images/unnax_payment_gateway/",
        "repositoryUrl": "",
        "publishUrl": "",
        "status": "finished",
        "techStack": ["PHP", "WordPress", "WooCommerce", "REST API", "JavaScript", "cURL", "MySQL", "HTML", "CSS", "React", "NodeJs"],
        "description": "Este proyecto es un plugin de WordPress y WooCommerce desarrollado en colaboración con los ingenieros Diony Castillo Rodríguez https://www.linkedin.com/in/diony-castillo y Javier Ojeda Rodríguez https://www.linkedin.com/in/javieralejandroojedarodríguez, que permite la integración rápida y eficiente del API de pago de Unnax SL. Está diseñado para facilitar a los comercios electrónicos la implementación de pasarelas de pago seguras y rápidas, optimizando así la experiencia de usuario en el proceso de compra. El plugin ofrece un método sencillo de integración sin necesidad de manejar la complejidad técnica del API, proporcionando un flujo de trabajo fluido para los desarrolladores y comerciantes."
    }
]


export default ProjectsData;