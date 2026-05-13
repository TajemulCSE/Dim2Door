// tokenUtils.js
export const isTokenExpired = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; // convert to milliseconds
    return expiry < Date.now();
  };
  
  export const checkTokenExpiration = (navigate) => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/signin"); // Redirect to signin page
    }
  };
  