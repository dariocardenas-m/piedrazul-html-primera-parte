const formPaciente = document.getElementById("formPaciente");
const pacienteSelect = document.getElementById("pacienteSelect");

formPaciente.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validarFormularioPaciente()) {
    alert("Hay campos con datos incorrectos");
    return;
  }

  const nombres = document.getElementById("nombresPaciente").value.trim();
  const apellidos = document.getElementById("apellidosPaciente").value.trim();
  const documento = document.getElementById("documentoPaciente").value.trim();
  const correo = document.getElementById("correoPaciente").value.trim();
  const telefono = document.getElementById("telefonoPaciente").value.trim();
  const fechaNacimiento = document.getElementById("fechaNacimientoPaciente").value;
  const sexo = document.querySelector('input[name="sexoPaciente"]:checked').value;

  const paciente = gestionarPacientes.registrarPaciente(
    nombres,
    apellidos,
    documento,
    correo,
    telefono,
    fechaNacimiento,
    sexo
  );

  const option = document.createElement("option");
  option.value = paciente.id;
  option.textContent = `${paciente.nombres} ${paciente.apellidos}`;
  pacienteSelect.appendChild(option);
  pacienteSelect.value = String(paciente.id);

  formPaciente.reset();
  limpiarErroresFormulario(formPaciente);
  mostrarToastExito(`Registro confirmado. Enviaremos la confirmación a ${paciente.correo}`);
});
