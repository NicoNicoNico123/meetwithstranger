// DOM elements
const acceptBtn = document.getElementById('acceptBtn');
const rejectBtn = document.getElementById('rejectBtn');
const buttonsContainer = document.getElementById('buttonsContainer');
const contactForm = document.getElementById('contactForm');
const modalOverlay = document.getElementById('modalOverlay');
const rejectionModal = document.getElementById('rejectionModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const submitBtn = document.getElementById('submitBtn');
const backBtn = document.getElementById('backBtn');
const successMessage = document.getElementById('successMessage');
const contactInfo = document.getElementById('contactInfo');

// Contact form elements
const instagramRadio = document.getElementById('instagramRadio');
const whatsappRadio = document.getElementById('whatsappRadio');
const instagramInput = document.getElementById('instagramInput');
const whatsappInput = document.getElementById('whatsappInput');

// State
let currentContactMethod = 'instagram';

// Event listeners
acceptBtn.addEventListener('click', showContactForm);
rejectBtn.addEventListener('click', showRejectionModal);
closeModalBtn.addEventListener('click', closeModal);
backBtn.addEventListener('click', backToButtons);
submitBtn.addEventListener('click', submitContact);
modalOverlay.addEventListener('click', handleOverlayClick);

// Radio button change listeners
instagramRadio.addEventListener('change', () => switchContactMethod('instagram'));
whatsappRadio.addEventListener('change', () => switchContactMethod('whatsapp'));

// Input validation
instagramInput.addEventListener('input', validateInstagramInput);
whatsappInput.addEventListener('input', validateWhatsAppInput);

// Functions
function showContactForm() {
    buttonsContainer.classList.add('hidden');
    contactForm.classList.remove('hidden');
    
    // Reset form state
    instagramInput.value = '';
    whatsappInput.value = '';
    instagramRadio.checked = true;
    whatsappRadio.checked = false;
    switchContactMethod('instagram');
}

function showRejectionModal() {
    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function handleOverlayClick(event) {
    if (event.target === modalOverlay) {
        closeModal();
    }
}

function backToButtons() {
    contactForm.classList.add('hidden');
    buttonsContainer.classList.remove('hidden');
    successMessage.classList.add('hidden');
}

function switchContactMethod(method) {
    currentContactMethod = method;
    
    if (method === 'instagram') {
        instagramInput.classList.remove('hidden');
        whatsappInput.classList.add('hidden');
        instagramInput.focus();
    } else {
        instagramInput.classList.add('hidden');
        whatsappInput.classList.remove('hidden');
        whatsappInput.focus();
    }
}

function validateInstagramInput() {
    const value = instagramInput.value.trim();
    
    // Remove @ symbol if user adds it
    if (value.startsWith('@')) {
        instagramInput.value = value.substring(1);
    }
    
    // Remove any characters that aren't allowed in Instagram usernames
    instagramInput.value = instagramInput.value.replace(/[^a-zA-Z0-9_.]/g, '');
    
    // Validate length (Instagram usernames are 1-30 characters)
    if (instagramInput.value.length > 30) {
        instagramInput.value = instagramInput.value.substring(0, 30);
    }
}

function validateWhatsAppInput() {
    let value = whatsappInput.value.trim();
    
    // Remove all non-digit characters except + at the beginning
    value = value.replace(/[^\d+]/g, '');
    
    // Ensure + is only at the beginning
    if (value.includes('+') && !value.startsWith('+')) {
        value = '+' + value.replace(/\+/g, '');
    }
    
    // Validate length (WhatsApp numbers are typically 10-15 digits including country code)
    if (value.length > 16) {
        value = value.substring(0, 16);
    }
    
    whatsappInput.value = value;
}

function submitContact() {
    const inputValue = currentContactMethod === 'instagram' 
        ? instagramInput.value.trim() 
        : whatsappInput.value.trim();
    
    // Validation
    if (!inputValue) {
        showError(currentContactMethod === 'instagram' ? instagramInput : whatsappInput);
        return;
    }
    
    // Additional validation based on contact method
    if (currentContactMethod === 'instagram') {
        if (inputValue.length < 1 || inputValue.length > 30) {
            showError(instagramInput, 'Instagram username must be 1-30 characters');
            return;
        }
    } else {
        // WhatsApp number validation
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(inputValue)) {
            showError(whatsappInput, 'Please enter a valid WhatsApp number with country code');
            return;
        }
    }
    
    // Success - show success message
    showSuccessMessage();
    
    // In a real application, you would send this data to a server here
    console.log('Contact submitted:', {
        method: currentContactMethod,
        value: inputValue,
        timestamp: new Date().toISOString()
    });
}

function showError(inputElement, message = 'This field is required') {
    // Remove any existing error
    const existingError = inputElement.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    inputElement.style.borderColor = '#f44336';
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#f44336';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.style.marginLeft = '30px';
    
    inputElement.parentNode.appendChild(errorDiv);
    
    // Remove error after 3 seconds or when user starts typing
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
        inputElement.style.borderColor = '';
    }, 3000);
    
    inputElement.addEventListener('input', () => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
        inputElement.style.borderColor = '';
    }, { once: true });
}

function showSuccessMessage() {
    const inputValue = currentContactMethod === 'instagram' 
        ? instagramInput.value.trim() 
        : whatsappInput.value.trim();
    
    // Format the contact information for display
    let displayText = '';
    if (currentContactMethod === 'instagram') {
        displayText = `📷 Instagram: @${inputValue}`;
    } else {
        displayText = `📞 WhatsApp: ${inputValue}`;
    }
    
    // Update the contact info in the success message
    contactInfo.textContent = displayText;
    
    // Hide contact form and show success message
    contactForm.classList.add('hidden');
    successMessage.classList.remove('hidden');
    
    // Hide success message after 5 seconds and return to buttons
    setTimeout(() => {
        successMessage.classList.add('hidden');
        buttonsContainer.classList.remove('hidden');
    }, 5000);
}

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    // ESC key closes modal
    if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
        closeModal();
    }
    
    // Enter key submits form when contact form is visible
    if (event.key === 'Enter' && !contactForm.classList.contains('hidden')) {
        submitContact();
    }
});

// Initialize focus on page load
window.addEventListener('load', () => {
    acceptBtn.focus();
});

// Prevent form submission on Enter key in input fields
instagramInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitContact();
    }
});

whatsappInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitContact();
    }
});