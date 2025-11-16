📝 Instrucciones de Código para Gemini CLI: Ejercicio 1
Genera el código HTML, CSS y JavaScript necesario para construir un formulario de registro completo, siguiendo los requisitos de validación y manejo de eventos del DOM en tiempo real.

1. Estructura del Formulario (HTML)
El formulario debe contener los siguientes campos de entrada y un botón de envío:


Nombre completo (input type="text") 


Correo electrónico (input type="email") 


Contraseña (input type="password") 


Confirmar contraseña (input type="password") 


Fecha de nacimiento (input type="date") 


Botón de envío 

Cada campo debe tener un espacio adyacente para mostrar mensajes de error/validación.

2. Eventos del DOM Requeridos (JavaScript)
Implementa la lógica de validación y UX usando los siguientes eventos:


DOMContentLoaded: Inicializar el formulario (ej. adjuntar listeners a los elementos). 


focus: Cambiar el borde del campo a color azul cuando esté activo. 


blur: Validar el campo cuando pierda el foco y mostrar mensajes de error si la validación falla. 


input (en el campo Contraseña): Mostrar en tiempo real la fortaleza de la contraseña (débil, media, fuerte). 


change (en el campo Fecha de nacimiento): Calcular y mostrar la edad del usuario. 


submit: Prevenir el comportamiento por defecto (preventDefault()) y realizar la validación final de todos los campos antes de un envío simulado (ej. console.log('Formulario enviado')). 

3. Criterios de Validación (JavaScript)
Implementa las siguientes validaciones, mostrando mensajes de error claros cuando fallen:


Nombre: Mínimo 3 caracteres. 


Email: Debe tener un formato de correo electrónico válido (utilizar expresiones regulares). 


Contraseña: Mínimo 8 caracteres, debe incluir al menos una mayúscula, una minúscula y un número (utilizar expresiones regulares). 


Confirmar contraseña: Debe coincidir exactamente con el valor del campo Contraseña. 


Edad: El usuario debe ser mayor de 18 años al momento de la validación.