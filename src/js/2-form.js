const LOCAL_STORAGE_KEY = 'feedback-form-state';

const defaultFormData = {
  email: '',
  message: '',
};

const formData = getStoredData();

function getStoredData() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (data) {
      const parsedData = JSON.parse(data);

      if (
        typeof parsedData.email === 'string' &&
        typeof parsedData.message === 'string'
      ) {
        return parsedData;
      }
    }
  } catch (error) {
    console.log(error);
  }

  return { ...defaultFormData };
}

function saveDataToLocalStorage({ email, message }) {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      email: email.trim(),
      message: message.trim(),
    })
  );
}

function setFormFields({ email, message }) {
  form.email.value = email;
  form.message.value = message;
}

const form = document.querySelector('.feedback-form');

setFormFields(formData);

form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value;

  saveDataToLocalStorage(formData);
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Please fill in all fields!');
    return;
  }

  console.log('Form data:', formData);

  formData.email = defaultFormData.email;
  formData.message = defaultFormData.message;

  setFormFields(formData);

  localStorage.removeItem(LOCAL_STORAGE_KEY);
});
