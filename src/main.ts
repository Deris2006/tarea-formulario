import './style.css';

// --- DOM Element Selection ---
const form = document.getElementById('formulario') as HTMLFormElement;
const nombreInput = document.getElementById('nombreUsuario') as HTMLInputElement;
const emailInput = document.getElementById('emailUsuario') as HTMLInputElement;
const passwordInput = document.getElementById('passwordUsuario') as HTMLInputElement;
const confirmacionInput = document.getElementById('confirmaciónUsuario') as HTMLInputElement;
const diaInput = document.getElementById('diaNacimiento') as HTMLSelectElement;
const mesInput = document.getElementById('mesNacimiento') as HTMLSelectElement;
const anioInput = document.getElementById('añoNacimiento') as HTMLSelectElement;

// --- Event Listener for Form Submission ---
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (validateForm()) {
    console.log('Formulario válido. Datos enviados:');
    console.log({
      nombre: nombreInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      fechaNacimiento: `${anioInput.value}-${mesInput.value}-${diaInput.value}`
    });
    alert('¡Registro exitoso!');
    form.reset();
    clearErrors();
  }
});

// --- Main Validation Function ---
function validateForm(): boolean {
  clearErrors();
  let isValid = true;

  // 1. Validate Name
  if (nombreInput.value.trim() === '') {
    showError(nombreInput, 'El nombre es obligatorio.');
    isValid = false;
  }

  // 2. Validate Email
  if (emailInput.value.trim() === '') {
    showError(emailInput, 'El correo es obligatorio.');
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, 'El formato del correo no es válido.');
    isValid = false;
  }

  // 3. Validate Password
  if (passwordInput.value.length < 8) {
    showError(passwordInput, 'La contraseña debe tener al menos 8 caracteres.');
    isValid = false;
  }

  // 4. Validate Password Confirmation
  if (passwordInput.value !== confirmacionInput.value) {
    showError(confirmacionInput, 'Las contraseñas no coinciden.');
    isValid = false;
  }

  // 5. Validate Date of Birth
  const dia = diaInput.value;
  const mes = mesInput.value;
  const anio = anioInput.value;

  if (!dia || !mes || !anio) {
    showError(diaInput, 'La fecha de nacimiento es obligatoria.');
    isValid = false;
  } else if (!isDateValid(parseInt(anio), parseInt(mes), parseInt(dia))) {
    showError(diaInput, 'La fecha seleccionada no es válida.');
    isValid = false;
  } else if (!isAdult(parseInt(anio), parseInt(mes), parseInt(dia))) {
    showError(diaInput, 'Debes ser mayor de 18 años.');
    isValid = false;
  }

  return isValid;
}

// --- Validation Helper Functions ---

/**
 * Checks if an email has a valid format.
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Checks if the selected date is a real date (e.g., not Feb 30).
 */
function isDateValid(year: number, month: number, day: number): boolean {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}


/**
 * Checks if the user is at least 18 years old.
 */
function isAdult(year: number, month: number, day: number): boolean {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
}

// --- UI Helper Functions for Errors ---

/**
 * Displays an error message next to the specified form element.
 */
function showError(element: HTMLElement, message: string) {
  element.classList.add('error');
  const errorElement = document.createElement('p');
  errorElement.className = 'error-message';
  errorElement.textContent = message;

  const dateGroup = element.closest('.date-select-group');
  if (dateGroup) {
    if (!dateGroup.nextElementSibling?.classList.contains('error-message')) {
      dateGroup.insertAdjacentElement('afterend', errorElement);
      dateGroup.querySelectorAll('.input').forEach(el => el.classList.add('error'));
    }
  } else {
    element.insertAdjacentElement('afterend', errorElement);
  }
}

/**
 * Removes all error messages and error styles from the form.
 */
function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  document.querySelectorAll('.input.error').forEach(el => el.classList.remove('error'));
}