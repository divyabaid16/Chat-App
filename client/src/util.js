export const SERVER_URL = "http://localhost:3001";

export const authToken = localStorage.getItem("authToken");

export const userId = authToken
  ? JSON.parse(atob(authToken.split(".")[1])).userId
  : null;;


// util.js

export const getUserIdFromAuthToken = (authToken) => {
  if (!authToken) return null;

  const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
  return decodedToken.userId;
}

export const getCurrentUserId = () => {
  const authToken = getAuthToken();
  return getUserIdFromAuthToken(authToken);
}

export const getAuthToken = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem("authToken");
  } else {
    // Handle scenarios where localStorage is not available, such as in incognito mode
    return null;
  }
}
