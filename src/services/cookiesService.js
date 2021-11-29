export function setCookies(token, refreshToken) {
  if (typeof window !== "undefined") {
    document.cookie = `authToken=${token};`;
    document.cookie = `refreshToken=${refreshToken};`;
  }
}

export function getCookies(cookieName) {
  if (typeof window !== "undefined") {
    let decodedCookie = decodeURIComponent(document.cookie);

    const cookies = decodedCookie.split(";");

    const cookie = cookies.find((item) => item === cookieName);

    return cookie;
  }
}

export function removeCookies() {
  if (typeof window !== "undefined") {
    document.cookie = `authToken=`;
    document.cookie = `refreshToken=`;
  }
}
