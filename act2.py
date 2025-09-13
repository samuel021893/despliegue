estudiantes = int(input("Ingrese la cantidad de estudiantes: "))
nombres = []
notas = []

for i in range(estudiantes):
    nombre = input(f"Ingrese el nombre del estudiante {i+1}: ")
    cantidad_notas = int(input(f"Ingrese la cantidad de notas para {nombre}: "))
    notas_estudiante = []
    for j in range(cantidad_notas):
        nota = float(input(f"Ingrese la nota {j+1} de {nombre}: "))
        notas_estudiante.append(nota)
    nombres.append(nombre)
    notas.append(notas_estudiante)

print("\nResultados:")
for i in range(estudiantes):
    promedio_individual = sum(notas[i]) / len(notas[i])
    estado = "Pasa" if promedio_individual >= 3.0 else "No pasa"
    print(f"{nombres[i]} - Notas: {notas[i]} - Promedio: {promedio_individual:.2f} - {estado}")

promedio_general = sum([sum(n)/len(n) for n in notas]) / estudiantes
print(f"\nPromedio general de notas: {promedio_general:.2f}")
