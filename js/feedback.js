const openFeedbackBtns = document.querySelectorAll('#openFeedbackBtn, #openFeedbackBtn2');
const feedbackPopup = document.getElementById('feedbackPopup');
const closeFeedbackBtn = document.getElementById('closeFeedbackBtn');
const feedbackForm = document.getElementById('feedbackForm');
const submitBtn = document.getElementById('submitBtn');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const messageError = document.getElementById('messageError');

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
messageInput.addEventListener('input', validateMessage);

function validateName() {
  const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s]+$/;
  if (!nameRegex.test(nameInput.value.trim())) {
    nameError.textContent = 'Имя должно содержать только русские или английские буквы';
    return false;
  }
  nameError.textContent = '';
  return true;
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = 'Введите корректный email адрес';
    return false;
  }
  emailError.textContent = '';
  return true;
}

function validatePhone() {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  if (!phoneRegex.test(phoneInput.value.trim())) {
    phoneError.textContent = 'Введите корректный номер телефона (10-15 цифр)';
    return false;
  }
  phoneError.textContent = '';
  return true;
}

function validateMessage() {
  if (messageInput.value.trim() === '') {
    messageError.textContent = 'Введите сообщение';
    return false;
  }
  messageError.textContent = '';
  return true;
}

feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  resetErrors();
  
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isMessageValid = validateMessage();
  
  if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
    submitForm();
  }
});

openFeedbackBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    feedbackPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

closeFeedbackBtn.addEventListener('click', closeFeedbackPopup);
feedbackPopup.addEventListener('click', (e) => {
  if (e.target === feedbackPopup) {
    closeFeedbackPopup();
  }
});

function resetErrors() {
  nameError.textContent = '';
  emailError.textContent = '';
  phoneError.textContent = '';
  messageError.textContent = '';
}

function closeFeedbackPopup() {
  feedbackPopup.classList.remove('active');
  document.body.style.overflow = '';
}
function submitForm() {
  submitBtn.textContent = 'Отправляем...';
  submitBtn.classList.add('sending');
  submitBtn.disabled = true;
  const formData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    message: messageInput.value.trim()
  };
  setTimeout(() => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      submitBtn.textContent = 'Успешно отправлено!';
      submitBtn.classList.remove('sending');
      submitBtn.classList.add('success');
      feedbackForm.reset();
      setTimeout(closeFeedbackPopup, 2000);
    })
    .catch(error => {
      submitBtn.textContent = 'Ошибка! Попробуйте снова';
      submitBtn.classList.remove('sending');
      submitBtn.disabled = false;
    });  
    feedbackForm.reset();
    setTimeout(closeFeedbackPopup, 2000);
  }, 1500);
}
