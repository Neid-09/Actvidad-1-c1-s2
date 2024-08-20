function RegistroDeudas() {
    let personas = [];

    // Datos para array personas
    personas.push({ nombre: "Camila", prestamos: [100, 200], pagos: [50], deudaTotal: 250 });
    personas.push({ nombre: "Juan", prestamos: [300], pagos: [100], deudaTotal: 200 });

    // Ejemplo de opciones para ejecutar manualmente
    let opciones = [
        { opcion: 1, nombre: "Pedro" },  // Agregar persona nueva
        { opcion: 2, personaIndex: 0, monto: 100 },  // Agregar préstamo a persona existente (Camila)
        { opcion: 3, personaIndex: 1, monto: 150 }, // Agregar pago a persona existente (Juan)
        { opcion: 4, informeOption: 1, personaIndex: 0 }, // Ver informe de una persona (Camila)
        { opcion: 4, informeOption: 2 }, // Ver informe total prestado
    ];

    

    opciones.forEach(opcion => {
        ejecutarOpcion(opcion, personas);
    });

    console.log("Saliendo del sistema...");
}

function ejecutarOpcion(opcion, personas) {
    switch (opcion.opcion) {
        case 1:
            agregarPersona(personas, opcion.nombre);
            break;
        case 2:
            manejarPrestamoPago(personas, true, opcion.personaIndex, opcion.monto);
            break;
        case 3:
            manejarPrestamoPago(personas, false, opcion.personaIndex, opcion.monto);
            break;
        case 4:
            verInforme(personas, opcion.informeOption, opcion.personaIndex);
            break;
        default:
            console.log("Seleccione una opción válida.");
    }
}


function agregarPersona(personas, nombre) {
    if (esNombreValido(nombre, personas)) {
        personas.push({ nombre: nombre, prestamos: [], pagos: [], deudaTotal: 0 });
        console.log(`Persona ${nombre} agregada correctamente.`);
    } else {
        console.log("Nombre no válido o ya existente.");
    }
}

function manejarPrestamoPago(personas, esPrestamo, personaIndex, monto) {
    if (personas.length === 0) return console.log("No hay personas registradas.");
    if (personaIndex === -1 || personaIndex >= personas.length) return console.log("Persona no encontrada.");

    if (esPrestamo) {
        personas[personaIndex].prestamos.push(monto);
        personas[personaIndex].deudaTotal += monto;
        console.log(`A ${personas[personaIndex].nombre} se le agregó un préstamo de ${monto} dólares.`);
    } else {
        personas[personaIndex].pagos.push(monto);
        personas[personaIndex].deudaTotal -= monto;
        actualizarPrestamos(personas[personaIndex], monto);
        console.log(`A ${personas[personaIndex].nombre} se le registró un pago de ${monto} dólares.`);
    }
}

function actualizarPrestamos(persona, montoRestante) {
    persona.prestamos = persona.prestamos.reduce((nuevosPrestamos, prestamo) => {
        if (montoRestante <= 0) {
            nuevosPrestamos.push(prestamo);
        } else if (prestamo > montoRestante) {
            nuevosPrestamos.push(prestamo - montoRestante);
            montoRestante = 0;
        } else {
            montoRestante -= prestamo;
        }
        return nuevosPrestamos;
    }, []);
}

function verInforme(personas, informeOption, personaIndex = -1) {
    if (personas.length === 0) return console.log("No hay personas registradas.");

    if (informeOption === 1) {
        if (personaIndex !== -1 && personaIndex < personas.length) {
            let persona = personas[personaIndex];
            console.log(`${persona.nombre}:\nDeuda total: ${persona.deudaTotal} dólares\nPréstamos: ${persona.prestamos.join(", ")}\nPagos realizados: ${persona.pagos.join(", ")}`);
        } else {
            console.log("Persona no encontrada.");
        }
    } else if (informeOption === 2) {
        let totalPrestado = personas.reduce((sum, persona) => sum + persona.prestamos.reduce((subSum, p) => subSum + p, 0), 0);
        console.log(`El total prestado a todas las personas es: ${totalPrestado} dólares.`);
    } else {
        console.log("Opción no válida.");
    }
}

function esNombreValido(nombre, personas) {
    return /^[a-zA-Z\s]+$/.test(nombre) && !personas.some(p => p.nombre.toLowerCase() === nombre.toLowerCase());
}

// Llamar la función para iniciar el programa
RegistroDeudas();


