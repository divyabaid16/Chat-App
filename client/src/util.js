export const SERVER_URL = "http://localhost:3001";

export const getAuthToken = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem("authToken");
  } else {
    return null;
  }
}

export const authToken = getAuthToken();

export const userId = authToken
  ? JSON.parse(atob(authToken.split(".")[1])).userId
  : null;

export const getUserIdFromAuthToken = (authToken) => {
  if (!authToken) return null;

  const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
  return decodedToken.userId;
}

export const getCurrentUserId = () => {
  const authToken = getAuthToken();
  return getUserIdFromAuthToken(authToken);
}

export const handleLogout = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem("authToken");
  }
}
