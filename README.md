# Six Pack SIL

Primer prototipo de los seis instrumentos de aviación. Las variables se introducen manualmente y el panel las representa en el navegador.

## Abrir el proyecto

1. Abre esta carpeta (`sixpack-sil`) en Visual Studio Code.
2. Abre `index.html` en un navegador moderno. También puedes usar la opción de VS Code para abrirlo en el navegador.
3. Cambia los campos de la columna «Condición de vuelo». El panel se actualiza inmediatamente y realiza una lectura cada 100 ms.

No requiere instalar Python, Node ni paquetes de JavaScript.

## Carpetas y archivos

- `index.html`: estructura del panel y controles.
- `styles.css`: presentación adaptable a distintos tamaños de pantalla.
- `src/flight-state.js`: variables, límites y validación de entradas.
- `src/instruments.js`: dibujo de ASI, AI, ALT, TC, HI y VSI.
- `src/app.js`: lectura de entradas y actualización de la interfaz.
- `jsconfig.json`: configuración del proyecto JavaScript para Visual Studio Code.

## Comprobaciones manuales sugeridas

- Cambia la velocidad a 30 kt y el cabeceo a 20°. ASI y AI deben actualizarse sin reiniciar la página.
- Cambia el rumbo de 359° a 0° y comprueba que la rosa gira sin perder la indicación.
- Deja vacío un campo o introduce un valor fuera del rango mostrado. El instrumento correspondiente debe indicar «SIN DATOS».
- Usa «Restablecer valores» para regresar a la condición inicial.

Las escalas gráficas son preliminares. Este prototipo representa las variables ingresadas; todavía no calcula variables a partir de sensores.
