const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = loginForm.elements.username.value;
  const password = loginForm.elements.password.value;
  const response = await fetch(`https://www.patreon.com/api/oauth2/token?grant_type=password&username=${username}&password=${password}&client_id=<client_id>&client_secret=<client_secret>`);
  const data = await response.json();
  if (response.ok) {
    const accessToken = data.access_token;
    const userResponse = await fetch('https://www.patreon.com/api/oauth2/v2/identity', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const userData = await userResponse.json();
    if (userData.data.relationships.memberships.data.length > 0) {
      window.location.href = 'colabs.html';
    } else {
      errorMessage.textContent = 'You are not an active patron.';
    }
  } else {
    errorMessage.textContent = 'Invalid username or password.';
  }
});