### Tienda Online MATIENZO ###

##### Una tienda web de productos materos, construida con HTML, CSS, JavaScript, implementando Bootstrap y SCSS 

Este proyecto es una tienda online sencilla donde los usuarios pueden:

 - 🌿 Explorar productos organizados por categorías.

 - 🛍️ Agregar y eliminar artículos en un carrito de compras (sidebar).

 - 💰 Ver el total del carrito y realizar simulaciones de compra.

La idea es practicar la modularización de código JS, el preprocesado con SCSS y la integración de componentes responsivos con Bootstrap

###### Demo en vivo

##### Puedes ver la tienda desplegada en: https://matienzocoderhouse.netlify.app/

#### Tecnologías

HTML5 ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

CSS3 ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

JavaScript (ES6+) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

SCSS (Sass) ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

Bootstrap 5 ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

Netlify (deploy continuo) ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

###### Instalación y puesta en marcha

1) git clone https://github.com/facundovarela99/Tienda-Online-MATIENZO.git

2) cd Tienda-Online-MATIENZO

3) npm install

4) npm run build:css

###### Estructura del proyecto
/index.html            – Página principal

/css/                  – CSS compilado desde SCSS

/sass/                 – Archivos fuente SCSS

/js/                   – Lógica del carrito, eventos y modularización

/assets/img/           – Imágenes e íconos



###### Uso de SCSS y Bootstrap

###### SCSS

Modularización de estilos en archivos parciales (_variables.scss, _components.scss, etc.).

Variables para paleta de colores y mixins reutilizables.

Compilación automática con un watcher (por ejemplo, node-sass --watch sass -o css).

###### Bootstrap

Integrado vía CDN o import en SCSS (@import "bootstrap/scss/bootstrap";).

Uso de utilidades (.d-flex, .justify-content-between, etc.) y componentes (.navbar, .card).

Personalización a través de las variables de Bootstrap antes de la importación.

##### 💡 Objetivos del proyecto

-Practicar la modularización de JavaScript para mantener el código limpio y escalable.

-Aprender a utilizar SCSS para un desarrollo más eficiente y mantenible.

-Integrar Bootstrap para crear interfaces responsivas y modernas.

-Construir un carrito de compras funcional con total dinámico y simulaciones de compra.
