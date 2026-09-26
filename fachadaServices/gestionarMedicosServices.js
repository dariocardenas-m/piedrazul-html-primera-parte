class GestionarMedicos {
  constructor(repoMedico) {
    this.repoMedico = repoMedico;
  }

  registrarMedico(
    nombres,
    apellidos,
    especialidad,
    horarioAtencion,
    aniosExperiencia,
    bibliografia,
    imagen = "",
    subespecialidades = "",
    motivacion = ""
  ) {
    const id = this.repoMedico.siguienteId();
    const medico = new Medico(
      id,
      nombres,
      apellidos,
      especialidad,
      horarioAtencion,
      aniosExperiencia,
      bibliografia,
      imagen,
      subespecialidades,
      motivacion
    );
    this.repoMedico.agregar(medico);
    return medico;
  }

  listarMedicos() {
    return this.repoMedico.obtenerTodos();
  }

  buscarMedico(id) {
    return this.repoMedico.buscarPorId(id);
  }

  listarPorEspecialidad(especialidad) {
    if (!especialidad) {
      return this.listarMedicos();
    }
    return this.repoMedico.obtenerTodos().filter(
      (medico) => medico.especialidad === especialidad
    );
  }
}

const gestionarMedicos = new GestionarMedicos(medicoRepo);
