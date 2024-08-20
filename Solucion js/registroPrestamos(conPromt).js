function RegistroDeudas() {
    let personas = [];

    while (true) {
        let option = parseInt(prompt("Seleccione una opción:\n1. Registrar persona nueva\n2. Agregar préstamo a persona existente\n3. Agregar pago a persona existente\n4. Ver informe de deuda\n5. Salir"));

        switch (option) {
            case 1:
                agregarPersonaNueva(personas);
                break;
            case 2:
                if (verificarPersonasRegistradas(personas)) {
                    agregarPrestamo(personas);
                }
                break;
            case 3:
                if (verificarPersonasRegistradas(personas)) {
                    agregarPago(personas);
                }
                break;
            case 4:
                if (verificarPersonasRegistradas(personas)) {
                    verInformeDeuda(personas);
                }
                break;
            case 5:
                return;
            default:
                alert("Seleccione una opción válida.");
        }
    }
}

function agregarPersonaNueva(personas) {
    let nombre;
    while (true) {
        nombre = prompt("Ingrese el nombre de la nueva persona (solo letras y espacios):");
        if (esNombreValido(nombre, personas)) {
            personas.push({ nombre: nombre, prestamos: [], pagos: [], deudaTotal: 0 });
            alert(`${nombre} agregado(a) correctamente.`);
            break;
        } else {
            alert("Nombre no válido o ya existente. Por favor, intente nuevamente.");
        }
    }
}

function agregarPrestamo(personas) {
    let personaIndex = seleccionarPersona(personas);
    if (personaIndex !== -1) {
        let montoPrestamo = parseFloat(prompt("Ingrese el monto del préstamo:"));
        let persona = personas[personaIndex];
        persona.prestamos.push(montoPrestamo);
        persona.deudaTotal += montoPrestamo;
        alert(`A ${persona.nombre} se le agregó un préstamo de ${montoPrestamo} dólares.\nTiene un total de ${persona.prestamos.length} préstamos y una deuda total de ${persona.deudaTotal} dólares.`);
    } else {
        alert("Persona no encontrada.");
    }
}

function agregarPago(personas) {
    let personaIndex = seleccionarPersona(personas);
    if (personaIndex !== -1) {
        let montoPago = parseFloat(prompt("Ingrese el monto del pago:"));
        let persona = personas[personaIndex];
        persona.pagos.push(montoPago);
        persona.deudaTotal -= montoPago;

        let montoRestante = montoPago;
        for (let i = 0; i < persona.prestamos.length && montoRestante > 0; i++) {
            if (persona.prestamos[i] <= montoRestante) {
                montoRestante -= persona.prestamos[i];
                persona.prestamos.splice(i, 1);
                i--;
            } else {
                persona.prestamos[i] -= montoRestante;
                montoRestante = 0;
            }
        }

        alert(`A ${persona.nombre} se le registró un pago de ${montoPago} dólares.\nDeuda total reducida a ${persona.deudaTotal} dólares.\nQuedan ${persona.prestamos.length} préstamos por pagar.`);
    } else {
        alert("Persona no encontrada.");
    }
}

function verInformeDeuda(personas) {
    let personaIndex = seleccionarPersona(personas);
    if (personaIndex !== -1) {
        let persona = personas[personaIndex];
        if (persona.deudaTotal === 0) {
            alert(`${persona.nombre} no tiene deudas pendientes.`);
        } else {
            let informe = `${persona.nombre}:\nDeuda total: ${persona.deudaTotal} dólares\nPréstamos:\n`;
            persona.prestamos.forEach((prestamo, i) => {
                informe += `Préstamo ${i + 1}: ${prestamo} dólares\n`;
            });
            informe += `Pagos realizados:\n`;
            persona.pagos.forEach((pago, i) => {
                informe += `Pago ${i + 1}: ${pago} dólares\n`;
            });
            alert(informe);
        }
    } else {
        alert("Persona no encontrada.");
    }
}

function esNombreValido(nombre, personas) {
    const regex = /^[a-zA-Z\s]+$/;
    const nombreExiste = personas.some(persona => persona.nombre.toLowerCase() === nombre.toLowerCase());
    return regex.test(nombre) && !nombreExiste;
}

function seleccionarPersona(personas) {
    let lista = "Seleccione el número de la persona:\n";
    personas.forEach((persona, i) => {
        lista += `${i + 1}. ${persona.nombre}\n`;
    });
    let personaIndex = parseInt(prompt(lista)) - 1;
    return (personaIndex >= 0 && personaIndex < personas.length) ? personaIndex : -1;
}

function verificarPersonasRegistradas(personas) {
    if (personas.length === 0) {
        alert("No hay personas registradas.");
        return false;
    }
    return true;
}

// Llamar la función para iniciar el programa
RegistroDeudas();
