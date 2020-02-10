export const TOKEN_KEY = "@airbnb-Token"
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => localStorage.setItem(TOKEN_KEY, token);
export const logout = () => localStorage.removeItem(TOKEN_KEY);
export const loggedUser = () => {
  const token = getToken();

  if (!token) return;
  console.log(token)
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  console.log(base64)
  return JSON.parse(window.atob(base64Url));
}
