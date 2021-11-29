export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
}
export function getRefreshToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refresh_token");
  }
}

export function setToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(token));
  }
}

export function setRefreshToken(refreshToken) {
  if (typeof window !== "undefined") {
    localStorage.setItem("refresh_token", JSON.stringify(refreshToken));
  }
}

export function removeItemFromStorage(keyName) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(keyName);
  }
}
