document.getElementById("login-form").onsubmit = function(e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const code = document.getElementById("secure-code").value;
  // Demo: username admin, password 12345, secure code: MBS2025
  if (user === "admin" && pass === "12345" && code === "MBS2025") {
    localStorage.setItem("adminLogin", "true");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("login-msg").textContent = "Username, password, atau secure code salah!";
  }
};