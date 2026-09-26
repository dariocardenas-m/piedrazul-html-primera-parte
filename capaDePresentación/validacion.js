function mostrarError(labelError, mensaje) {
  if (!labelError) return;
  labelError.textContent = mensaje;
}

function limpiarError(labelError) {
  if (!labelError) return;
  labelError.textContent = "";
}

function validarCampoObligatorio(input, labelError, mensaje) {
  const valor = input.value.trim();
  if (valor === "") {
    mostrarError(labelError, mensaje);
    return false;
  }
  limpiarError(labelError);
  return true;
}

function validarLongitud(input, labelError, min, max, mensaje) {
  const longitud = input.value.trim().length;
  if (longitud < min || longitud > max) {
    mostrarError(labelError, mensaje);
    return false;
  }
  limpiarError(labelError);
  return true;
}

function validarCorreo(input, labelError, mensaje) {
  const valor = input.value.trim();
  const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoCorreo.test(valor)) {
    mostrarError(labelError, mensaje);
    return false;
  }
  limpiarError(labelError);
  return true;
}

function validarCorreosIguales(correoInput, confirmarInput, labelError, mensaje) {
  if (correoInput.value.trim() !== confirmarInput.value.trim()) {
    mostrarError(labelError, mensaje);
    return false;
  }
  limpiarError(labelError);
  return true;
}

function validarDocumento(input, labelError) {
  if (!validarCampoObligatorio(input, labelError, "El documento es obligatorio")) {
    return false;
  }
  const valor = input.value.trim();
  if (!/^\d{6,12}$/.test(valor)) {
    mostrarError(labelError, "El documento debe tener entre 6 y 12 dígitos");
    return false;
  }
  limpiarError(labelError);
  return true;
}

function validarTelefono(input, labelError) {
  if (!validarCampoObligatorio(input, labelError, "El teléfono es obligatorio")) {
    return false;
  }
  const valor = input.value.trim();
  if (!/^\d{7,10}$/.test(valor)) {
    mostrarError(labelError, "El teléfono debe tener entre 7 y 10 dígitos");
    return false;
  }
  limpiarError(labelError);
  return true;
}

function validarSeleccion(select, labelError, mensaje) {
  if (select.value === "") {
    mostrarError(labelError, mensaje);
    return false;
  }
  limpiarError(labelError);
  return true;
}

function validarRadio(nombreGrupo, labelError, mensaje) {
  const seleccionado = document.querySelector(`input[name="${nombreGrupo}"]:checked`);
  if (!seleccionado) {
    mostrarError(labelError, mensaje);
    return false;
  }
  limpiarError(labelError);
  return true;
}

function validarCheckbox(input, labelError, mensaje) {
  if (!input.checked) {
    mostrarError(labelError, mensaje);
    return false;
  }
  limpiarError(labelError);
  return true;
}

function validarHoraFinMayor(horaInicioInput, horaFinInput, labelError, mensaje) {
  const inicio = horaInicioInput.value;
  const fin = horaFinInput.value;
  if (!inicio || !fin) {
    return true;
  }
  if (fin <= inicio) {
    mostrarError(labelError, mensaje);
    return false;
  }
  limpiarError(labelError);
  return true;
}

function mostrarToastExito(mensaje) {
  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: { background: "#28a745" }
  }).showToast();
}

function limpiarErroresFormulario(formulario) {
  formulario.querySelectorAll(".mensaje-error").forEach((label) => {
    label.textContent = "";
  });
}

function validarTextoConLongitud(input, labelError, min, max, mensajeObligatorio, mensajeLongitud) {
  if (!validarCampoObligatorio(input, labelError, mensajeObligatorio)) {
    return false;
  }
  return validarLongitud(input, labelError, min, max, mensajeLongitud);
}

function validarFormularioPaciente() {
  const nombres = document.getElementById("nombresPaciente");
  const apellidos = document.getElementById("apellidosPaciente");
  const documento = document.getElementById("documentoPaciente");
  const correo = document.getElementById("correoPaciente");
  const confirmarCorreo = document.getElementById("confirmarCorreoPaciente");
  const telefono = document.getElementById("telefonoPaciente");
  const fechaNacimiento = document.getElementById("fechaNacimientoPaciente");
  const aceptaTerminos = document.getElementById("aceptaTerminos");

  const nombresOk = validarTextoConLongitud(
    nombres,
    document.getElementById("error-nombresPaciente"),
    1,
    20,
    "Los nombres son obligatorios",
    "Los nombres deben tener entre 1 y 20 caracteres"
  );
  const apellidosOk = validarTextoConLongitud(
    apellidos,
    document.getElementById("error-apellidosPaciente"),
    1,
    20,
    "Los apellidos son obligatorios",
    "Los apellidos deben tener entre 1 y 20 caracteres"
  );
  const documentoOk = validarDocumento(documento, document.getElementById("error-documentoPaciente"));
  const correoObligatorioOk = validarCampoObligatorio(
    correo,
    document.getElementById("error-correoPaciente"),
    "El correo es obligatorio para confirmar su registro"
  );
  const correoOk = correoObligatorioOk && validarCorreo(
    correo,
    document.getElementById("error-correoPaciente"),
    "Ingrese un correo electrónico válido"
  );
  const confirmarObligatorioOk = validarCampoObligatorio(
    confirmarCorreo,
    document.getElementById("error-confirmarCorreoPaciente"),
    "Debe confirmar el correo de registro"
  );
  const confirmarOk = confirmarObligatorioOk && validarCorreo(
    confirmarCorreo,
    document.getElementById("error-confirmarCorreoPaciente"),
    "Ingrese un correo electrónico válido"
  ) && validarCorreosIguales(
    correo,
    confirmarCorreo,
    document.getElementById("error-confirmarCorreoPaciente"),
    "Los correos no coinciden"
  );
  const telefonoOk = validarTelefono(telefono, document.getElementById("error-telefonoPaciente"));
  const fechaOk = validarCampoObligatorio(
    fechaNacimiento,
    document.getElementById("error-fechaNacimientoPaciente"),
    "La fecha de nacimiento es obligatoria"
  );
  const sexoOk = validarRadio(
    "sexoPaciente",
    document.getElementById("error-sexoPaciente"),
    "Debe seleccionar el sexo"
  );
  const terminosOk = validarCheckbox(
    aceptaTerminos,
    document.getElementById("error-aceptaTerminos"),
    "Debe aceptar los términos para registrarse"
  );

  return nombresOk && apellidosOk && documentoOk && correoOk && confirmarOk &&
    telefonoOk && fechaOk && sexoOk && terminosOk;
}

function validarFormularioCitas() {
  const fecha = document.getElementById("fecha");
  const horaInicio = document.getElementById("horaInicio");
  const horaFin = document.getElementById("horaFin");
  const medicoSelect = document.getElementById("medicoSelect");
  const pacienteSelect = document.getElementById("pacienteSelect");
  const motivoCita = document.getElementById("motivoCita");
  const correoConfirmacion = document.getElementById("correoConfirmacion");

  const fechaOk = validarCampoObligatorio(
    fecha,
    document.getElementById("error-fecha"),
    "La fecha es obligatoria"
  );
  const horaInicioOk = validarCampoObligatorio(
    horaInicio,
    document.getElementById("error-horaInicio"),
    "La hora de inicio es obligatoria"
  );
  const horaFinOk = validarCampoObligatorio(
    horaFin,
    document.getElementById("error-horaFin"),
    "La hora de fin es obligatoria"
  );
  const horasOrdenOk = validarHoraFinMayor(
    horaInicio,
    horaFin,
    document.getElementById("error-horaFin"),
    "La hora de fin debe ser mayor a la hora de inicio"
  );
  const medicoOk = validarSeleccion(
    medicoSelect,
    document.getElementById("error-medicoSelect"),
    "Debe seleccionar un médico"
  );
  const pacienteOk = validarSeleccion(
    pacienteSelect,
    document.getElementById("error-pacienteSelect"),
    "Debe seleccionar un usuario registrado"
  );
  const motivoOk = validarTextoConLongitud(
    motivoCita,
    document.getElementById("error-motivoCita"),
    1,
    20,
    "El motivo de la cita es obligatorio",
    "El motivo debe tener entre 1 y 20 caracteres"
  );
  const correoObligatorioOk = validarCampoObligatorio(
    correoConfirmacion,
    document.getElementById("error-correoConfirmacion"),
    "El correo de confirmación es obligatorio"
  );
  const correoOk = correoObligatorioOk && validarCorreo(
    correoConfirmacion,
    document.getElementById("error-correoConfirmacion"),
    "Ingrese un correo electrónico válido"
  );
  const modalidadOk = validarRadio(
    "modalidadCita",
    document.getElementById("error-modalidadCita"),
    "Debe seleccionar la modalidad de la cita"
  );

  return fechaOk && horaInicioOk && horaFinOk && horasOrdenOk && medicoOk &&
    pacienteOk && motivoOk && correoOk && modalidadOk;
}

function validarCamposAlCambiarFoco() {
  const nombresPaciente = document.getElementById("nombresPaciente");
  const apellidosPaciente = document.getElementById("apellidosPaciente");
  const documentoPaciente = document.getElementById("documentoPaciente");
  const correoPaciente = document.getElementById("correoPaciente");
  const confirmarCorreoPaciente = document.getElementById("confirmarCorreoPaciente");
  const telefonoPaciente = document.getElementById("telefonoPaciente");
  const fechaNacimientoPaciente = document.getElementById("fechaNacimientoPaciente");
  const aceptaTerminos = document.getElementById("aceptaTerminos");
  const radiosSexo = document.querySelectorAll('input[name="sexoPaciente"]');

  const fecha = document.getElementById("fecha");
  const horaInicio = document.getElementById("horaInicio");
  const horaFin = document.getElementById("horaFin");
  const medicoSelect = document.getElementById("medicoSelect");
  const pacienteSelect = document.getElementById("pacienteSelect");
  const motivoCita = document.getElementById("motivoCita");
  const correoConfirmacion = document.getElementById("correoConfirmacion");
  const radiosModalidad = document.querySelectorAll('input[name="modalidadCita"]');

  const ligarTexto = (input, validar) => {
    if (!input) return;
    input.addEventListener("blur", validar);
    input.addEventListener("input", validar);
  };

  ligarTexto(nombresPaciente, () => validarTextoConLongitud(
    nombresPaciente,
    document.getElementById("error-nombresPaciente"),
    1, 20,
    "Los nombres son obligatorios",
    "Los nombres deben tener entre 1 y 20 caracteres"
  ));
  ligarTexto(apellidosPaciente, () => validarTextoConLongitud(
    apellidosPaciente,
    document.getElementById("error-apellidosPaciente"),
    1, 20,
    "Los apellidos son obligatorios",
    "Los apellidos deben tener entre 1 y 20 caracteres"
  ));
  ligarTexto(documentoPaciente, () => validarDocumento(
    documentoPaciente,
    document.getElementById("error-documentoPaciente")
  ));
  ligarTexto(correoPaciente, () => {
    const obligatorio = validarCampoObligatorio(
      correoPaciente,
      document.getElementById("error-correoPaciente"),
      "El correo es obligatorio para confirmar su registro"
    );
    if (obligatorio) {
      validarCorreo(
        correoPaciente,
        document.getElementById("error-correoPaciente"),
        "Ingrese un correo electrónico válido"
      );
    }
    if (confirmarCorreoPaciente.value.trim() !== "") {
      validarCorreosIguales(
        correoPaciente,
        confirmarCorreoPaciente,
        document.getElementById("error-confirmarCorreoPaciente"),
        "Los correos no coinciden"
      );
    }
  });
  ligarTexto(confirmarCorreoPaciente, () => {
    const obligatorio = validarCampoObligatorio(
      confirmarCorreoPaciente,
      document.getElementById("error-confirmarCorreoPaciente"),
      "Debe confirmar el correo de registro"
    );
    if (!obligatorio) return;
    const formatoOk = validarCorreo(
      confirmarCorreoPaciente,
      document.getElementById("error-confirmarCorreoPaciente"),
      "Ingrese un correo electrónico válido"
    );
    if (formatoOk) {
      validarCorreosIguales(
        correoPaciente,
        confirmarCorreoPaciente,
        document.getElementById("error-confirmarCorreoPaciente"),
        "Los correos no coinciden"
      );
    }
  });
  ligarTexto(telefonoPaciente, () => validarTelefono(
    telefonoPaciente,
    document.getElementById("error-telefonoPaciente")
  ));
  ligarTexto(fechaNacimientoPaciente, () => validarCampoObligatorio(
    fechaNacimientoPaciente,
    document.getElementById("error-fechaNacimientoPaciente"),
    "La fecha de nacimiento es obligatoria"
  ));

  radiosSexo.forEach((radio) => {
    radio.addEventListener("change", () => validarRadio(
      "sexoPaciente",
      document.getElementById("error-sexoPaciente"),
      "Debe seleccionar el sexo"
    ));
    radio.addEventListener("blur", () => validarRadio(
      "sexoPaciente",
      document.getElementById("error-sexoPaciente"),
      "Debe seleccionar el sexo"
    ));
  });

  if (aceptaTerminos) {
    aceptaTerminos.addEventListener("change", () => validarCheckbox(
      aceptaTerminos,
      document.getElementById("error-aceptaTerminos"),
      "Debe aceptar los términos para registrarse"
    ));
    aceptaTerminos.addEventListener("blur", () => validarCheckbox(
      aceptaTerminos,
      document.getElementById("error-aceptaTerminos"),
      "Debe aceptar los términos para registrarse"
    ));
  }

  ligarTexto(fecha, () => validarCampoObligatorio(
    fecha,
    document.getElementById("error-fecha"),
    "La fecha es obligatoria"
  ));
  ligarTexto(horaInicio, () => {
    validarCampoObligatorio(horaInicio, document.getElementById("error-horaInicio"), "La hora de inicio es obligatoria");
    validarHoraFinMayor(horaInicio, horaFin, document.getElementById("error-horaFin"), "La hora de fin debe ser mayor a la hora de inicio");
  });
  ligarTexto(horaFin, () => {
    const obligatorio = validarCampoObligatorio(
      horaFin,
      document.getElementById("error-horaFin"),
      "La hora de fin es obligatoria"
    );
    if (obligatorio) {
      validarHoraFinMayor(horaInicio, horaFin, document.getElementById("error-horaFin"), "La hora de fin debe ser mayor a la hora de inicio");
    }
  });
  ligarTexto(motivoCita, () => validarTextoConLongitud(
    motivoCita,
    document.getElementById("error-motivoCita"),
    1, 20,
    "El motivo de la cita es obligatorio",
    "El motivo debe tener entre 1 y 20 caracteres"
  ));
  ligarTexto(correoConfirmacion, () => {
    const obligatorio = validarCampoObligatorio(
      correoConfirmacion,
      document.getElementById("error-correoConfirmacion"),
      "El correo de confirmación es obligatorio"
    );
    if (obligatorio) {
      validarCorreo(
        correoConfirmacion,
        document.getElementById("error-correoConfirmacion"),
        "Ingrese un correo electrónico válido"
      );
    }
  });

  const validarMedico = () => validarSeleccion(
    medicoSelect,
    document.getElementById("error-medicoSelect"),
    "Debe seleccionar un médico"
  );
  const validarPaciente = () => validarSeleccion(
    pacienteSelect,
    document.getElementById("error-pacienteSelect"),
    "Debe seleccionar un usuario registrado"
  );
  if (medicoSelect) {
    medicoSelect.addEventListener("blur", validarMedico);
    medicoSelect.addEventListener("change", validarMedico);
  }
  if (pacienteSelect) {
    pacienteSelect.addEventListener("blur", validarPaciente);
    pacienteSelect.addEventListener("change", validarPaciente);
  }

  radiosModalidad.forEach((radio) => {
    radio.addEventListener("change", () => validarRadio(
      "modalidadCita",
      document.getElementById("error-modalidadCita"),
      "Debe seleccionar la modalidad de la cita"
    ));
    radio.addEventListener("blur", () => validarRadio(
      "modalidadCita",
      document.getElementById("error-modalidadCita"),
      "Debe seleccionar la modalidad de la cita"
    ));
  });
}

document.addEventListener("DOMContentLoaded", validarCamposAlCambiarFoco);
