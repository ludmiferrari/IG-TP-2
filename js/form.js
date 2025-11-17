// **SELECCIÓN CORREGIDA (usando # para IDs)**
let contactForm = document.querySelector('#contactForm');
let nameInput = document.querySelector('#name');
let nameValidation = document.querySelector('#nameValidation');
let emailInput = document.querySelector('#email');
let emailValidation = document.querySelector('#emailValidation');
let subjectInput = document.querySelector('#subject');
let subjectValidation = document.querySelector('#subjectValidation');
let messageInput = document.querySelector('#message');
let messageValidation = document.querySelector('#messageValidation');
const messageBox = document.querySelector('#messageBox');
const inputs = [nameInput, emailInput, subjectInput, messageInput];

const validateInput = (input, validationElement, validationFunction) => {
    const isValid = validationFunction(input.value.trim());

    if (!isValid) {
        // Al fallar: añade is-invalid (Bootstrap lo hace visible)
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        // REMOVIDA: validationElement.classList.remove('d-none');
    } else {
        // Al pasar: añade is-valid (Bootstrap lo oculta)
        input.classList.remove('is-invalid');
        input.classList.add('is-valid'); 
        // REMOVIDA: validationElement.classList.add('d-none');
    }
    return isValid;
};

// Funciones de validación
const validateName = () => validateInput(nameInput, nameValidation, (name) => name !== '');
const validateEmail = () => validateInput(emailInput, emailValidation, (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
const validateSubject = () => validateInput(subjectInput, subjectValidation, (subject) => subject !== '');
const validateMessage = () => validateInput(messageInput, messageValidation, (message) => message !== '');

const validateForm = () => {
    // **OPERADOR LÓGICO CORREGIDO: Usando && (AND Lógico)**
    return validateName() && validateEmail() && validateSubject() && validateMessage(); 
};

contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); 
    messageBox.classList.add('d-none'); 

    if (validateForm()) {
        // Envío exitoso
        messageBox.classList.remove('d-none'); 
        this.reset(); // Limpia el formulario
        
        // Limpia las clases is-invalid/is-valid de todos los inputs después del envío
        inputs.forEach(input => {
            input.classList.remove('is-invalid', 'is-valid');
            // Ya no es necesario buscar el elemento de validación si no usamos d-none en él.
        });

        setTimeout(() => {
            messageBox.classList.add('d-none');
        }, 5000);
    }
});

// Validación en tiempo real al escribir
inputs.forEach(input => {
    input.addEventListener('input', function () {
        switch (input.id) {
            case 'name':
                validateName();
                break;
            case 'email':
                validateEmail();
                break;
            case 'subject':
                validateSubject();
                break;
            case 'message':
                validateMessage();
                break;
            default:
                break;
        }
    });
});