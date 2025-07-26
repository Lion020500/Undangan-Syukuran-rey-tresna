// assets/js/script.js
const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbycqxBYNdR8FPJEDAHnJXGZCz5ne8-tjHufewulS819hOHKeUhe1VWbFT9SEFp6SeGW/exec'; // ganti jika kamu deploy URL baru

document.addEventListener('DOMContentLoaded', () => {
  const form   = document.getElementById('rsvp-form') || document.getElementById('rsvpForm');
  const thanks = document.getElementById('thanks');
  const btn    = form?.querySelector('button[type="submit"]');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // UX: lock button
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Mengirim...';
    }

    const fd = new FormData(form);

    // field opsional biar Apps Script nggak error
    if (!fd.has('jumlah'))  fd.set('jumlah', '');
    if (!fd.has('ucapan'))  fd.set('ucapan', '');

    try {
      const res = await fetch(WEBAPP_URL, {
        method: 'POST',
        body: new URLSearchParams(fd) // cocok dengan e.parameter di Apps Script
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'HTTP error');
      }

      form.reset();
      if (thanks) {
        thanks.style.display = 'block';
      } else {
        alert('Terima kasih, konfirmasi Anda sudah kami terima 🙏');
      }
    } catch (err) {
      alert('Gagal mengirim RSVP. Coba lagi ya.\n\n' + err.message);
      console.error(err);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Kirim';
      }
    }
  });
});
