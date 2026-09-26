class GestionarPacientes {
  constructor(repoPaciente) {
    this.repoPaciente = repoPaciente;
  }

  registrarPaciente(nombres, apellidos, documento, correo, telefono, fechaNacimiento, sexo) {
    const id = this.repoPaciente.siguienteId();
    const paciente = new Paciente(
      id,
      nombres,
      apellidos,
      documento,
      correo,
      telefono,
      fechaNacimiento,
      sexo
    );
    this.repoPaciente.agregar(paciente);
    return paciente;
  }

  listarPacientes() {
    return this.repoPaciente.obtenerTodos();
  }

  buscarPaciente(id) {
    return this.repoPaciente.buscarPorId(id);
  }
}

const gestionarPacientes = new GestionarPacientes(pacienteRepo);
