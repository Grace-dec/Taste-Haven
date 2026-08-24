// Toggle password visibility
document.querySelectorAll('.toggle-visibility').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    btn.textContent = isHidden ? '🙈' : '👁️';
  });
});

const form = document.getElementById('signup-form');
const submitBtn = document.getElementById('submitBtn');

function setError(fieldId, hasError){
  document.getElementById(fieldId).classList.toggle('error', hasError);
}

function validate(){
  let valid = true;

  const name = document.getElementById('fullName').value.trim();
  setError('field-name', name.length === 0);
  if(name.length === 0) valid = false;

  const email = document.getElementById('email').value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  setError('field-email', !emailOk);
  if(!emailOk) valid = false;

  const phone = document.getElementById('phone').value.trim();
  const phoneOk = /^[0-9+()\-\s]{7,}$/.test(phone);
  setError('field-phone', !phoneOk);
  if(!phoneOk) valid = false;

  const password = document.getElementById('password').value;
  setError('field-password', password.length < 8);
  if(password.length < 8) valid = false;

  const confirmPassword = document.getElementById('confirmPassword').value;
  setError('field-confirm', confirmPassword !== password || confirmPassword.length === 0);
  if(confirmPassword !== password || confirmPassword.length === 0) valid = false;

  const agreed = document.getElementById('agree').checked;
  if(!agreed) valid = false;

  return valid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(validate()){
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating Account...';
    // Simulate submission — replace with real API call
    setTimeout(() => {
      alert('Account created! (This is a front-end demo — connect to your backend to complete signup.)');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create Account';
    }, 1200);
  }
});

document.getElementById('googleBtn').addEventListener('click', () => {
  alert('Connect this button to your Google OAuth flow.');
});
