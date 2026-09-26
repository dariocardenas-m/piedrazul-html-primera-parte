class Medico {
  constructor(
    id,
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
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.especialidad = especialidad;
    this.horarioAtencion = horarioAtencion;
    this.aniosExperiencia = aniosExperiencia;
    this.bibliografia = bibliografia;
    this.imagen = imagen;
    this.subespecialidades = subespecialidades;
    this.motivacion = motivacion;
  }
}
