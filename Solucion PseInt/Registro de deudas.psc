Proceso RegistroDeudas
    Dimensionar  prestamos[100,100], pagos[100,100], deuda_total[100], cantidad_prestamos[100], cantidad_pagos[100], personas[100]
    Definir total_personas, option, persona_id, monto, persona_index Como entero
    Definir seguir Como Logico
    seguir = Verdadero
    total_personas = 0
	
    Mientras seguir Hacer
        Escribir "Seleccione una opci�n: "
        Escribir "1. Agregar persona nueva"
        Escribir "2. Agregar pr�stamo a persona existente"
        Escribir "3. Agregar pago a persona existente"
        Escribir "4. Ver informe de deuda"
        Escribir "5. Salir"
        Leer option
        
        Segun option Hacer
            Caso 1: 
                total_personas = total_personas + 1
                Escribir "Ingrese el nombre de la nueva persona: "
                Leer personas[total_personas]
                cantidad_prestamos[total_personas] = 0
                cantidad_pagos[total_personas] = 0
                deuda_total[total_personas] = 0
                Escribir "Persona ", personas[total_personas], " agregada correctamente."
				
            Caso 2: 
                Escribir "Seleccione el n�mero de la persona: "
                Para i = 1 Hasta total_personas Hacer
                    Escribir i, ". ", personas[i]
                Fin Para
                Leer persona_id
                
                Escribir "Ingrese el monto del pr�stamo: "
                Leer monto
                cantidad_prestamos[persona_id] = cantidad_prestamos[persona_id] + 1
                prestamos[persona_id, cantidad_prestamos[persona_id]] = monto
                deuda_total[persona_id] = deuda_total[persona_id] + monto
                
                Escribir "A ", personas[persona_id], " se le agreg� un pr�stamo de ", monto, " d�lares."
                Escribir "Tiene un total de ", cantidad_prestamos[persona_id], " pr�stamos y una deuda total de ", deuda_total[persona_id], " d�lares."
				
            Caso 3: 
                Escribir "Seleccione el n�mero de la persona: "
                Para i = 1 Hasta total_personas Hacer
                    Escribir i, ". ", personas[i]
                Fin Para
                Leer persona_id
                
                Escribir "Ingrese el monto del pago: "
                Leer monto
                cantidad_pagos[persona_id] = cantidad_pagos[persona_id] + 1
                pagos[persona_id, cantidad_pagos[persona_id]] = monto
                deuda_total[persona_id] = deuda_total[persona_id] - monto
                
                Escribir "A ", personas[persona_id], " se le registr� un pago de ", monto, " d�lares."
                Escribir "Deuda total reducida a ", deuda_total[persona_id], " d�lares."
                
                monto_restante = monto
                i = 1
                
                Mientras monto_restante > 0 Y cantidad_prestamos[persona_id] > 0 Hacer
                    Si prestamos[persona_id, i] <= monto_restante Entonces
                        monto_restante = monto_restante - prestamos[persona_id, i]
                        cantidad_prestamos[persona_id] = cantidad_prestamos[persona_id] - 1
                        Para j = i Hasta cantidad_prestamos[persona_id] Hacer
                            prestamos[persona_id, j] = prestamos[persona_id, j + 1]
                        Fin Para
                    SiNo
                        prestamos[persona_id, i] = prestamos[persona_id, i] - monto_restante
                        monto_restante = 0
                    Fin Si
                Fin Mientras
                
                Escribir "Quedan ", cantidad_prestamos[persona_id], " pr�stamos por pagar."
				
            Caso 4: 
                Escribir "Seleccione el n�mero de la persona: "
                Para i = 1 Hasta total_personas Hacer
                    Escribir i, ". ", personas[i]
                Fin Para
                Leer persona_id
                
                Escribir personas[persona_id], ":"
                Escribir "Deuda total: ", deuda_total[persona_id], " d�lares"
                Escribir "Pr�stamos:"
                Para i = 1 Hasta cantidad_prestamos[persona_id] Hacer
                    Escribir "Pr�stamo ", i, ": ", prestamos[persona_id, i], " d�lares"
                Fin Para
                Escribir "Pagos realizados:"
                Para i = 1 Hasta cantidad_pagos[persona_id] Hacer
                    Escribir "Pago ", i, ": ", pagos[persona_id, i], " d�lares"
                Fin Para
				
            Caso 5:
                seguir = Falso
				
        Fin Segun
    Fin Mientras
    
FinProceso

