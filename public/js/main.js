document.addEventListener('DOMContentLoaded', () => {
  window.navigateTo = function (route) {
    fetch(`/${route}`)
      .then(res => res.text())
      .then(html => {
        document.getElementById('app').innerHTML = html;
        history.pushState(null, '', `/${route}`);
      });
  };

  window.onpopstate = function () {
    const path = location.pathname.slice(1) || 'login';
    navigateTo(path);
  };

  // Form login handler
  document.addEventListener('submit', function (e) {
    if (e.target.id === 'loginForm') {
      e.preventDefault();
      const form = e.target;
      const data = Object.fromEntries(new FormData(form));
      fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            toastr.success('Berhasil login');
            window.location.href = '/dashboard';
          } else {
            toastr.error(res.message || 'Login gagal');
          }
        });
    }

    // Register
    if (e.target.id === 'registerForm') {
      e.preventDefault();
      const form = e.target;
      const data = Object.fromEntries(new FormData(form));
      fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            toastr.success('Registrasi berhasil');
            navigateTo('login');
          } else {
            toastr.error(res.message || 'Registrasi gagal');
          }
        });
    }
  });

  navigateTo(location.pathname.slice(1) || 'login');
});
