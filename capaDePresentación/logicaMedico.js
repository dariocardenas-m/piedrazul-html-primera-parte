const ESPECIALIDADES = [
  {
    nombre: "Terapia neural",
    descripcion: "Tratamiento regulador que usa anestésicos locales en baja dosis para aliviar dolor crónico y restaurar el equilibrio del sistema nervioso."
  },
  {
    nombre: "Quiropraxia",
    descripcion: "Especialidad enfocada en el diagnóstico y corrección de disfunciones de la columna y el sistema musculoesquelético mediante ajustes manuales."
  },
  {
    nombre: "Fisioterapia",
    descripcion: "Rehabilitación del movimiento con ejercicio terapéutico, agentes físicos y educación para recuperar función y prevenir recaídas."
  },
  {
    nombre: "Nutrición y Dietética Terapéutica",
    descripcion: "Planes de alimentación personalizados para prevenir y tratar enfermedades, mejorar el rendimiento y acompañar procesos clínicos."
  },
  {
    nombre: "Medicina general",
    descripcion: "Atención integral de primer nivel: valoración, diagnóstico inicial, seguimiento y remisión oportuna a otras especialidades."
  },
  {
    nombre: "Psicología",
    descripcion: "Acompañamiento en salud mental para ansiedad, duelo, hábitos y relaciones, con un enfoque clínico y humanizado."
  }
];

function cargarMedicosIniciales() {
  if (gestionarMedicos.listarMedicos().length > 0) {
    return;
  }

  const medicos = [
    {
      nombres: "Laura",
      apellidos: "Gómez Ruiz",
      especialidad: "Terapia neural",
      horarioAtencion: "Lunes a viernes 8:00-16:00",
      aniosExperiencia: 8,
      bibliografia: "Especialista en dolor crónico y medicina reguladora.",
      imagen: "imagenes/medicos/laura.jpg",
      subespecialidades: "Dolor crónico, cefalea",
      motivacion: "Quiero que cada paciente recupere su calidad de vida sin procedimientos invasivos."
    },
    {
      nombres: "Andrés",
      apellidos: "Pérez Castro",
      especialidad: "Quiropraxia",
      horarioAtencion: "Martes a sábado 9:00-17:00",
      aniosExperiencia: 10,
      bibliografia: "Quiropráctico con énfasis en columna lumbar y postura.",
      imagen: "imagenes/medicos/andres.jpg",
      subespecialidades: "Columna, postura laboral",
      motivacion: "Un ajuste a tiempo evita años de dolor y limita las recaídas."
    },
    {
      nombres: "Camila",
      apellidos: "Ortiz Díaz",
      especialidad: "Fisioterapia",
      horarioAtencion: "Lunes a viernes 7:00-15:00",
      aniosExperiencia: 6,
      bibliografia: "Fisioterapeuta deportiva y de rehabilitación postoperatoria.",
      imagen: "imagenes/medicos/camila.jpg",
      subespecialidades: "Deporte, rodilla y hombro",
      motivacion: "El movimiento es el mejor medicamento cuando se prescribe bien."
    },
    {
      nombres: "Julián",
      apellidos: "Vargas Melo",
      especialidad: "Nutrición y Dietética Terapéutica",
      horarioAtencion: "Lunes, miércoles y viernes 10:00-18:00",
      aniosExperiencia: 7,
      bibliografia: "Nutricionista clínico en enfermedades metabólicas.",
      imagen: "imagenes/medicos/julian.jpg",
      subespecialidades: "Diabetes, control de peso",
      motivacion: "Comer bien no es privarse: es aprender a nutrir el cuerpo."
    },
    {
      nombres: "Sofía",
      apellidos: "Herrera León",
      especialidad: "Medicina general",
      horarioAtencion: "Lunes a viernes 8:00-12:00 y 14:00-18:00",
      aniosExperiencia: 12,
      bibliografia: "Médica general con enfoque en atención primaria familiar.",
      imagen: "imagenes/medicos/sofia.jpg",
      subespecialidades: "Atención primaria, control adulto",
      motivacion: "Escuchar con calma es el primer paso de un buen diagnóstico."
    },
    {
      nombres: "Diego",
      apellidos: "Ramírez Soto",
      especialidad: "Psicología",
      horarioAtencion: "Martes a jueves 8:00-17:00",
      aniosExperiencia: 9,
      bibliografia: "Psicólogo clínico en ansiedad, duelo y hábitos de salud.",
      imagen: "imagenes/medicos/diego.jpg",
      subespecialidades: "Ansiedad, hábitos de salud",
      motivacion: "Cuidar la mente es tan urgente como cuidar el cuerpo."
    },
    {
      nombres: "Elena",
      apellidos: "Suárez Niño",
      especialidad: "Fisioterapia",
      horarioAtencion: "Lunes a sábado 8:00-13:00",
      aniosExperiencia: 5,
      bibliografia: "Especialista en piso pélvico y rehabilitación de adulto mayor.",
      imagen: "imagenes/medicos/elena.jpg",
      subespecialidades: "Adulto mayor, piso pélvico",
      motivacion: "Cada sesión busca devolver independencia y confianza."
    },
    {
      nombres: "Martín",
      apellidos: "Cobo Aguilar",
      especialidad: "Nutrición y Dietética Terapéutica",
      horarioAtencion: "Jueves y viernes 9:00-16:00",
      aniosExperiencia: 4,
      bibliografia: "Nutricionista deportivo y de trastornos gastrointestinales.",
      imagen: "imagenes/medicos/martin.jpg",
      subespecialidades: "Deporte, nutrición digestiva",
      motivacion: "Un plan realista es el que el paciente sí puede sostener."
    }
  ];

  medicos.forEach((medico) => {
    gestionarMedicos.registrarMedico(
      medico.nombres,
      medico.apellidos,
      medico.especialidad,
      medico.horarioAtencion,
      medico.aniosExperiencia,
      medico.bibliografia,
      medico.imagen,
      medico.subespecialidades,
      medico.motivacion
    );
  });
}

function llenarSelectMedicos() {
  const medicoSelect = document.getElementById("medicoSelect");
  if (!medicoSelect) return;

  const valorActual = medicoSelect.value;
  medicoSelect.innerHTML = '<option value="" disabled selected>Seleccione un médico</option>';
  gestionarMedicos.listarMedicos().forEach((medico) => {
    const option = document.createElement("option");
    option.value = medico.id;
    option.textContent = `${medico.nombres} ${medico.apellidos} (${medico.especialidad})`;
    medicoSelect.appendChild(option);
  });
  if (valorActual) {
    medicoSelect.value = valorActual;
  }
}

function renderizarEspecialidades() {
  const lista = document.getElementById("listaEspecialidades");
  if (!lista) return;

  lista.innerHTML = "";
  ESPECIALIDADES.forEach((especialidad, indice) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "list-group-item list-group-item-action";
    boton.textContent = especialidad.nombre;
    boton.dataset.especialidad = especialidad.nombre;
    if (indice === 0) {
      boton.classList.add("active");
    }
    boton.addEventListener("click", () => seleccionarEspecialidad(especialidad.nombre));
    lista.appendChild(boton);
  });
}

function seleccionarEspecialidad(nombre) {
  document.querySelectorAll("#listaEspecialidades .list-group-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.especialidad === nombre);
  });

  const especialidad = ESPECIALIDADES.find((item) => item.nombre === nombre);
  const descripcion = document.getElementById("descripcionEspecialidad");
  if (descripcion && especialidad) {
    descripcion.innerHTML = `<h3 class="h5">${especialidad.nombre}</h3><p class="mb-0">${especialidad.descripcion}</p>`;
  }

  renderizarMedicos(nombre);
}

function renderizarMedicos(especialidad) {
  const contenedor = document.getElementById("contenedorMedicos");
  if (!contenedor) return;

  const medicos = gestionarMedicos.listarPorEspecialidad(especialidad);
  contenedor.innerHTML = "";

  if (medicos.length === 0) {
    contenedor.innerHTML = '<p class="text-muted">No hay médicos para esta especialidad.</p>';
    return;
  }

  medicos.forEach((medico) => {
    const columna = document.createElement("div");
    columna.className = "col-12 col-sm-6 col-md-4 col-lg-3";
    columna.innerHTML = `
      <article class="card border h-100 card-medico">
        <img src="${medico.imagen}" class="img-fluid border card-img-top" alt="Foto de ${medico.nombres} ${medico.apellidos}">
        <div class="card-body d-flex flex-column">
          <h3 class="h6">${medico.nombres} ${medico.apellidos}</h3>
          <p class="small text-muted mb-1"><strong>Subespecialidades:</strong> ${medico.subespecialidades}</p>
          <p class="small flex-grow-1">${medico.motivacion}</p>
          <button type="button" class="btn btn-primary mt-auto" data-medico-id="${medico.id}">Agendar cita</button>
        </div>
      </article>
    `;
    columna.querySelector("button").addEventListener("click", () => abrirModalCita(medico.id));
    contenedor.appendChild(columna);
  });
}

function abrirModalCita(medicoId) {
  llenarSelectMedicos();
  const medicoSelect = document.getElementById("medicoSelect");
  if (medicoSelect) {
    medicoSelect.value = String(medicoId);
  }
  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalCita"));
  modal.show();
}

document.addEventListener("DOMContentLoaded", () => {
  cargarMedicosIniciales();
  llenarSelectMedicos();
  renderizarEspecialidades();
  seleccionarEspecialidad(ESPECIALIDADES[0].nombre);
});
