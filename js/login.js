// Toggle password visibility
document.querySelectorAll('.toggle-visibility').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    btn.textContent = isHidden ? '🙈' : '👁️';
  });
});

const form = document.getElementById('login-form');
const submitBtn = document.getElementById('submitBtn');

function setError(fieldId, hasError){
  document.getElementById(fieldId).classList.toggle('error', hasError);
}

function validate(){
  let valid = true;

  const email = document.getElementById('email').value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  setError('field-email', !emailOk);
  if(!emailOk) valid = false;

  const password = document.getElementById('password').value;
  setError('field-password', password.length === 0);
  if(password.length === 0) valid = false;

  return valid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(validate()){
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';
    // Simulate submission — replace with real API call
    setTimeout(() => {
      alert('Login successful! (This is a front-end demo — connect to your backend to complete login.)');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Login';
    }, 1200);
  }
});

document.getElementById('googleBtn').addEventListener('click', () => {
  alert('Connect this button to your Google OAuth flow.');
});