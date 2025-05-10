window.addEventListener('DOMContentLoaded', async () => {
  const info = await window.electronAPI.getInfo();
  window.electronAPI.onUsersCount((count) => {
    document.getElementById('users-count').textContent = count;
  });

  document.getElementById('versions').innerHTML = `
      Versión de Node: ${info.node}<br>
      Versión de Chrome: ${info.chrome}<br>
      Versión Electron: ${info.electron}<br>
      <br>
      <b>Arquitectura:</b> ${info.arch}<br>
      <b>Plataforma:</b> ${info.platform}<br>
      <b>Hostname:</b> ${info.hostname}<br>
  `;

  document.getElementById('chat-url').innerHTML = `<a href="${info.chatURL}" target="_blank">${info.chatURL}</a>`;
  new QRCode(document.getElementById('qrcode'), info.chatURL);

  document.getElementById('users-count').textContent = info.users || '0';

  // Mostrar mensajes del servidor en tiempo real
  window.electronAPI.onServerMsg((_, msg) => {
    const messages = document.getElementById('messages');
    messages.innerHTML += `<div>${msg}</div>`;
    messages.scrollTop = messages.scrollHeight;
});

  // Botón de prueba
  document.getElementById('test-btn').onclick = async () => {
      const ok = await window.electronAPI.broadcastTest();
      if (ok) {
          document.getElementById('messages').innerHTML += `<div style="color:green">Mensaje de prueba enviado.</div>`;
      } else {
          document.getElementById('messages').innerHTML += `<div style="color:red">Error al enviar mensaje de prueba.</div>`;
      }
  };
});