// ============================================================
// RUTINA MASCULINA — Datos extraídos exactamente de las fotos
// ============================================================

const routineData = {
  masculino: {
    title: "Rutina Masculina",
    days: [
      // ─── DÍA 1 ───────────────────────────────────────────
      {
        day: 1,
        title: "Tren Frontal Superior",
        muscleGroup: "Pecho y Bíceps",
        icon: "💪",
        color: "#2563eb",
        exercises: [
          {
            id: "m1-1",
            name: "Press Inclinado",
            description: "Acostado en un banco inclinado, baja el peso de forma controlada hasta el pecho y empuja hacia arriba extendiendo los brazos. Mantén los hombros estables y el core firme.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Mancuernas",
            videoUrl: "" // Aquí se colocará la URL del video
          },
          {
            id: "m1-2",
            name: "Press Plano",
            description: "Acostado en un banco plano, baja el peso hasta el pecho con control y empuja hacia arriba sin bloquear completamente los codos. Espalda apoyada y pies firmes en el suelo.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Mancuernas",
            videoUrl: ""
          },
          {
            id: "m1-3",
            name: "Aperturas de Pecho",
            description: "Abrir los brazos semi-extendidos abriendo el pecho hasta notar estiramiento y vuelve a cerrar contrayendo el pecho. Movimiento amplio y controlado.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina de aperturas o mancuernas",
            videoUrl: ""
          },
          {
            id: "m1-4",
            name: "Curl de bíceps sentado",
            description: "Sentado en banco ligeramente inclinado, con las palmas hacia arriba, flexiona los codos llevando el peso hacia los hombros. Controla la bajada y evita balancearte.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Mancuernas",
            videoUrl: ""
          },
          {
            id: "m1-5",
            name: "Curl de bíceps Martillo",
            description: "Con las mancuernas a los lados y palmas enfrentadas, flexiona los codos llevando el peso hacia arriba. Mantén los codos pegados al cuerpo y controla el movimiento.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Mancuernas",
            videoUrl: ""
          }
        ]
      },

      // ─── DÍA 2 ───────────────────────────────────────────
      {
        day: 2,
        title: "Tren Frontal Inferior",
        muscleGroup: "Piernas Frontal",
        icon: "🦵",
        color: "#3b82f6",
        exercises: [
          {
            id: "m2-1",
            name: "Aducción sentado",
            description: "Sentado en la máquina, junta las piernas contrayendo los aductores y vuelve de forma controlada a la posición inicial.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina de aducción",
            videoUrl: ""
          },
          {
            id: "m2-2",
            name: "Sentadilla Búlgara",
            description: "Con un pie apoyado atrás en un banco, baja flexionando la pierna delantera y sube empujando con el talón. Mantén el torso estable.",
            reps: "10-12 por pierna",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Banco y mancuernas o en máquina smith",
            videoUrl: ""
          },
          {
            id: "m2-3",
            name: "Cuádriceps sentado",
            description: "Sentado en la máquina, extiende las piernas hasta arriba contrayendo el cuádriceps y baja de forma controlada.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina de cuádriceps",
            videoUrl: ""
          },
          {
            id: "m2-4",
            name: "Sentadilla Clásica",
            description: "Con la barra sobre la espalda o con peso frontal, baja flexionando caderas y rodillas y sube empujando el suelo con los pies.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Barra libre o smith",
            videoUrl: ""
          },
          {
            id: "m2-5",
            name: "Pantorrilla de pie",
            description: "De pie sosteniendo una carga, eleva los talones contrayendo las pantorrillas y baja lentamente hasta estirar bien el músculo.",
            reps: "10-15",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina de Pantorrilla, smith o con escalón y mancuerna",
            videoUrl: ""
          },
          {
            id: "m2-6",
            name: "Crunch en máquina de abs",
            description: "Sentado en la máquina, flexiona el tronco llevando los hombros hacia las piernas y vuelve lentamente a la posición inicial, sin forzar el cuello.",
            reps: "10-15",
            sets: 4,
            rest: "1-2 min entre serie",
            material: "Máquina de crunch o en el suelo",
            videoUrl: ""
          }
        ]
      },

      // ─── DÍA 3 ───────────────────────────────────────────
      {
        day: 3,
        title: "Tren Trasero Superior",
        muscleGroup: "Espalda y Tríceps",
        icon: "🏋️",
        color: "#1a4fd6",
        exercises: [
          {
            id: "m3-1",
            name: "Dominadas Libres o asistidas",
            description: "Colgado de la barra, tira del cuerpo hacia arriba hasta que el pecho se acerque a la barra y baja de forma controlada.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Barra de dominadas o máquina con ayuda",
            videoUrl: ""
          },
          {
            id: "m3-2",
            name: "Remo sentado",
            description: "Sentado en la máquina, tira del agarre hacia el torso juntando las escápulas y vuelve controlando el movimiento.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina de remo",
            videoUrl: ""
          },
          {
            id: "m3-3",
            name: "Pullover en polea",
            description: "De pie en polea, lleva la cuerda desde arriba hacia abajo manteniendo los brazos casi extendidos y contrayendo la espalda.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Polea con agarre en V",
            videoUrl: ""
          },
          {
            id: "m3-4",
            name: "Tríceps sentado por encima de la cabeza con barra (cara larga)",
            description: "Sentado en banco poco inclinado, baja la barra detrás de la cabeza flexionando los codos y extiende los brazos hacia arriba sin mover los hombros.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Banco y barra con peso",
            videoUrl: ""
          },
          {
            id: "m3-5",
            name: "Tríceps en polea de pie (cara corta y media)",
            description: "De pie frente a la polea, extiende los codos empujando la cuerda hacia abajo y vuelve de forma controlada.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Polea y cuerda de agarre",
            videoUrl: ""
          }
        ]
      },

      // ─── DÍA 4 ───────────────────────────────────────────
      {
        day: 4,
        title: "Tren Posterior Inferior",
        muscleGroup: "Piernas Posterior",
        icon: "🦿",
        color: "#5b8ef0",
        exercises: [
          {
            id: "m4-1",
            name: "Abducción sentado",
            description: "Sentado en la máquina, abre las piernas contrayendo los glúteos y vuelve de forma controlada a la posición inicial.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina de abducción",
            videoUrl: ""
          },
          {
            id: "m4-2",
            name: "Femoral sentado",
            description: "Sentado en la máquina, flexiona las rodillas llevando el peso hacia abajo y vuelve lentamente controlando el movimiento.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina de femoral sentado",
            videoUrl: ""
          },
          {
            id: "m4-3",
            name: "Peso muerto",
            description: "Con la barra o mancuernas, baja el peso llevando la cadera atrás y sube extendiendo caderas y rodillas manteniendo la espalda recta.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Mancuernas o barra con peso",
            videoUrl: ""
          },
          {
            id: "m4-4",
            name: "Hip-thrust",
            description: "En máquina o con la espalda apoyada en un banco, eleva la cadera empujando con los talones hasta alinear cadera, tronco y rodillas, contrayendo glúteos.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Banco o máquina de hipthrust",
            videoUrl: ""
          },
          {
            id: "m4-5",
            name: "Pantorrilla sentado (Sóleo)",
            description: "Sentado en la máquina, eleva los talones contrayendo las pantorrillas y baja lentamente hasta estirar bien el músculo.",
            reps: "10-15",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina o banco con un peso libre",
            videoUrl: ""
          },
          {
            id: "m4-6",
            name: "Elevaciones de piernas para abs",
            description: "Acostado boca arriba, colgado o en máquina, eleva las piernas manteniéndolas rectas o ligeramente dobladas, contrayendo el abdomen, y baja controlando el movimiento.",
            reps: "10-15",
            sets: 3,
            rest: "1-2 min entre serie",
            material: "Máquina, barra o suelo",
            videoUrl: ""
          }
        ]
      },

      // ─── DÍA 5 ───────────────────────────────────────────
      {
        day: 5,
        title: "Tren Superior",
        muscleGroup: "Hombros y Tren Superior",
        icon: "🎯",
        color: "#60a5fa",
        exercises: [
          {
            id: "m5-1",
            name: "Press militar",
            description: "Sentado, empuja la carga desde los hombros hacia arriba hasta extender los brazos, manteniendo la espalda recta y el core firme.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Banco y mancuernas o máquina de press militar",
            videoUrl: ""
          },
          {
            id: "m5-2",
            name: "Elevaciones laterales",
            description: "Acostado de lado en un banco inclinado, eleva la mancuerna lateralmente hasta la altura del hombro y baja controlando el movimiento.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Banco y mancuernas",
            videoUrl: ""
          },
          {
            id: "m5-3",
            name: "Elevación Posterior en polea unilateral",
            description: "De pie frente a la polea, tira del agarre hacia atrás y afuera con el brazo casi extendido, contrayendo el deltoide posterior y controlando la bajada.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Polea sin agarre o agarre unilateral de cuerda",
            videoUrl: ""
          },
          {
            id: "m5-4",
            name: "Dominadas libre o asistidas",
            description: "Colgado de la barra, tira del cuerpo hacia arriba hasta que el pecho se acerque a la barra y baja de forma controlada.",
            reps: "8-10",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Barra de dominadas o máquina con ayuda",
            videoUrl: ""
          },
          {
            id: "m5-5",
            name: "Flexiones de Pecho",
            description: "Con las manos apoyadas en el suelo a la altura del pecho, baja el cuerpo flexionando los codos y empuja hasta extender los brazos, manteniendo el cuerpo alineado.",
            reps: "10-15",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Suelo",
            videoUrl: ""
          }
        ]
      }
    ]
  },

  femenino: {
    title: "Rutina Femenina",
    days: [
      // ─── DÍA 1 ───────────────────────────────────────────
      {
        day: 1,
        title: "Tren posterior Inferior",
        muscleGroup: "Piernas Posterior",
        icon: "🍑",
        color: "#2563eb",
        exercises: [
          {
            id: "f1-1",
            name: "Hip-thrust",
            description: "En máquina o con la espalda apoyada en un banco, eleva la cadera empujando con los talones hasta alinear cadera, tronco y rodillas, contrayendo glúteos.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Banco o máquina de hipthrust",
            videoUrl: ""
          },
          {
            id: "f1-2",
            name: "Sentadillas búlgaras enfocadas a glúteo",
            description: "Con el pie trasero elevado y el delantero más adelantado, baja manteniendo el torso ligeramente inclinado y sube empujando con el talón.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Mancuernas y banco",
            videoUrl: ""
          },
          {
            id: "f1-3",
            name: "Femoral sentado",
            description: "Sentado en la máquina, flexiona las rodillas llevando el peso hacia abajo y vuelve lentamente controlando el movimiento.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina de femoral sentado",
            videoUrl: ""
          },
          {
            id: "f1-4",
            name: "Abducción sentado",
            description: "Sentado en la máquina, abre las piernas contrayendo los glúteos y vuelve de forma controlada a la posición inicial.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina de abducción",
            videoUrl: ""
          },
          {
            id: "f1-5",
            name: "Crunch en máquina de abs",
            description: "Sentado en la máquina, flexiona el tronco llevando los hombros hacia las piernas y vuelve lentamente a la posición inicial, sin forzar el cuello.",
            reps: "10-15",
            sets: 4,
            rest: "1-2 min entre serie",
            material: "Máquina de abs o en suelo",
            videoUrl: ""
          }
        ]
      },

      // ─── DÍA 2 ───────────────────────────────────────────
      {
        day: 2,
        title: "Tren frontal superior",
        muscleGroup: "Pecho, hombro y bíceps",
        icon: "💪",
        color: "#3b82f6",
        exercises: [
          {
            id: "f2-1",
            name: "Press Inclinado (flexiones de pecho a preferencia)",
            description: "Acostado en un banco inclinado, baja el peso de forma controlada hasta el pecho y empuja hacia arriba extendiendo los brazos. Mantén los hombros estables y el core firme.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Mancuernas",
            videoUrl: ""
          },
          {
            id: "f2-2",
            name: "Press militar",
            description: "Sentado, empuja la carga desde los hombros hacia arriba hasta extender los brazos, manteniendo la espalda recta y el core firme.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Banco y mancuernas o máquina de press militar",
            videoUrl: ""
          },
          {
            id: "f2-3",
            name: "Aperturas de pecho",
            description: "abrir los brazos semi-extendidos abriendo el pecho hasta notar estiramiento y vuelve a cerrar contrayendo el pecho. Movimiento amplio y controlado.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina de aperturas o mancuernas y banco plano",
            videoUrl: ""
          },
          {
            id: "f2-4",
            name: "Elevaciones laterales",
            description: "Acostado de lado en un banco inclinado, eleva la mancuerna lateralmente hasta la altura del hombro y baja controlando el movimiento.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Banco y mancuernas",
            videoUrl: ""
          },
          {
            id: "f2-5",
            name: "Curl de bíceps sentado",
            description: "Sentado en banco ligeramente inclinado, con las palmas hacia arriba, flexiona los codos llevando el peso hacia los hombros. Controla la bajada y evita balancearte.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Banco y mancuernas",
            videoUrl: ""
          }
        ]
      },

      // ─── DÍA 3 ───────────────────────────────────────────
      {
        day: 3,
        title: "Tren Frontal Inferior",
        muscleGroup: "Piernas Frontal",
        icon: "🦵",
        color: "#1a4fd6",
        exercises: [
          {
            id: "f3-1",
            name: "Sentadilla Clásica",
            description: "Con la barra sobre la espalda o con peso frontal, baja flexionando caderas y rodillas y sube empujando el suelo con los pies.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Barra libre, smith o mancuerna como peso",
            videoUrl: ""
          },
          {
            id: "f3-2",
            name: "Cuádriceps sentado",
            description: "Sentado en la máquina, extiende las piernas hasta arriba contrayendo el cuádriceps y baja de forma controlada.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina de cuádriceps",
            videoUrl: ""
          },
          {
            id: "f3-3",
            name: "Aducción sentado",
            description: "Sentado en la máquina, junta las piernas contrayendo los aductores y vuelve de forma controlada a la posición inicial.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina de aducción",
            videoUrl: ""
          },
          {
            id: "f3-4",
            name: "Pantorrilla de pie",
            description: "De pie sosteniendo una carga, eleva los talones contrayendo las pantorrillas y baja lentamente hasta estirar bien el músculo.",
            reps: "10-15",
            sets: 3,
            rest: "2-3 min entre serie",
            material: "Máquina de pantorrilla, smith o con escalón y mancuerna",
            videoUrl: ""
          },
          {
            id: "f3-5",
            name: "Elevaciones de piernas para abs",
            description: "Acostado boca arriba, colgado o en máquina, eleva las piernas manteniéndolas rectas o ligeramente dobladas, contrayendo el abdomen, y baja controlando el movimiento.",
            reps: "10-15",
            sets: 3,
            rest: "1-2 min entre serie",
            material: "Máquina, barra o suelo",
            videoUrl: ""
          }
        ]
      },

      // ─── DÍA 4 ───────────────────────────────────────────
      {
        day: 4,
        title: "Tren trasero superior",
        muscleGroup: "Espalda y Tríceps",
        icon: "🏋️",
        color: "#5b8ef0",
        exercises: [
          {
            id: "f4-1",
            name: "Dominadas libre o asistidas",
            description: "Colgado de la barra, tira del cuerpo hacia arriba hasta que el pecho se acerque a la barra y baja de forma controlada.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Barra de dominadas o máquina con ayuda",
            videoUrl: ""
          },
          {
            id: "f4-2",
            name: "Remo sentado",
            description: "Sentado en la máquina, tira del agarre hacia el torso juntando las escápulas y vuelve controlando el movimiento.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Máquina de remo",
            videoUrl: ""
          },
          {
            id: "f4-3",
            name: "Pullover en polea",
            description: "De pie en polea, lleva la cuerda desde arriba hacia abajo manteniendo los brazos casi extendidos y contrayendo la espalda.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Polea con agarre en V",
            videoUrl: ""
          },
          {
            id: "f4-4",
            name: "Fondos con Banco",
            description: "Con las manos apoyadas en un banco y los pies en el suelo, baja el cuerpo flexionando los codos hasta formar aproximadamente 90° y empuja hacia arriba extendiendo los brazos. Mantén los hombros estables y el core firme.",
            reps: "10-15",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Banco",
            videoUrl: ""
          },
          {
            id: "f4-5",
            name: "Tríceps en polea de pie (cara corta y media)",
            description: "De pie frente a la polea, extiende los codos empujando la cuerda hacia abajo y vuelve de forma controlada.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Polea y cuerda de agarre",
            videoUrl: ""
          }
        ]
      },

      // ─── DÍA 5 ───────────────────────────────────────────
      {
        day: 5,
        title: "Tren inferior y Abs",
        muscleGroup: "Piernas y abs",
        icon: "🎯",
        color: "#60a5fa",
        exercises: [
          {
            id: "f5-1",
            name: "Prensa de pierna enfocado al cuádriceps",
            description: "Sentado en la máquina, flexiona las rodillas llevando el peso hacia abajo y vuelve lentamente controlando el movimiento.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Prensa de piernas",
            videoUrl: ""
          },
          {
            id: "f5-2",
            name: "Peso Muerto",
            description: "Con la barra o mancuernas, baja el peso llevando la cadera atrás y sube extendiendo caderas y rodillas manteniendo la espalda recta.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Mancuernas o barra con peso",
            videoUrl: ""
          },
          {
            id: "f5-3",
            name: "Sentadilla Sumo",
            description: "Coloca los pies más abiertos que los hombros y las puntas ligeramente hacia afuera. Baja flexionando caderas y rodillas manteniendo la espalda recta y empuja el suelo para volver arriba.",
            reps: "10-12",
            sets: 4,
            rest: "2-3 min entre serie",
            material: "Carga, mancuerna o peso",
            videoUrl: ""
          },
          {
            id: "f5-4",
            name: "Oblícuos",
            description: "Ejercicio lateral que puede incluir crunch lateral o plancha lateral, elevando cadera o girando torso.",
            reps: "10-15",
            sets: 4,
            rest: "1-2 min entre serie",
            material: "Suelo",
            videoUrl: ""
          },
          {
            id: "f5-5",
            name: "Plancha",
            description: "Apoya antebrazos y pies, mantén el cuerpo alineado de cabeza a talones y activa el core.",
            reps: "1 min",
            sets: 4,
            rest: "1-2 min entre serie",
            material: "Suelo",
            videoUrl: ""
          }
        ]
      }
    ]
  }
};
