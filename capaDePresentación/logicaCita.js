const formCitas = document.getElementById("formCitas");
const tablaCitas = document.getElementById("tablaCitas");

formCitas.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validarFormularioCitas()) {
    alert("Hay campos con datos incorrectos");
    return;
  }

  const fecha = document.getElementById("fecha").value;
  const horaInicio = document.getElementById("horaInicio").value;
  const horaFin = document.getElementById("horaFin").value;
  const motivo = document.getElementById("motivoCita").value.trim();
  const correoConfirmacion = document.getElementById("correoConfirmacion").value.trim();
  const modalidad = document.querySelector('input[name="modalidadCita"]:checked').value;

  const medicoSelectEl = document.getElementById("medicoSelect");
  const pacienteSelectEl = document.getElementById("pacienteSelect");

  const medicoId = parseInt(medicoSelectEl.value, 10);
  const pacienteId = parseInt(pacienteSelectEl.value, 10);

  try {
    const cita = gestionarCitas.registrarCita(
      fecha,
      horaInicio,
      horaFin,
      medicoId,
      pacienteId,
      motivo,
      modalidad,
      correoConfirmacion
    );

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${cita.fecha}</td>
      <td>${cita.horaInicio}</td>
      <td>${cita.horaFin}</td>
      <td>${cita.medico.nombres} ${cita.medico.apellidos}</td>
      <td>${cita.paciente.nombres} ${cita.paciente.apellidos}</td>
      <td>${cita.motivo}</td>
      <td>${cita.modalidad}</td>
      <td>${cita.correoConfirmacion}</td>
    `;
    tablaCitas.appendChild(fila);
    document.getElementById("bloqueCitas").classList.remove("d-none");

    formCitas.reset();
    limpiarErroresFormulario(formCitas);
    mostrarToastExito("Cita registrada con éxito");
  } catch (error) {
    mostrarNotificacion(error.message, "error");
  }
});
