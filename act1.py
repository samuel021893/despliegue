numero1=17
numero2=18
print(numero1+numero2)
print(numero1*numero2)
print(numero1-numero2)
print(numero1/numero2)

print(numero1>numero2)
print(numero1<numero2)
print(numero1==numero2)
print()

edad=19
print(edad>18 and edad<30)
print(edad>18 and edad>30)
print(edad<18 or edad<30) 

print()
if numero1<0:
    print("numero1 es negativo")
else:
    print("numero1 es positivo")

print()

nombre= input("Pon tu nombre: ")
peso= input("Pon tu peso: ")
print("Hola " + nombre + " tu peso es " + peso)
print()

edad= int(input("Pon tu edad: "))
if edad>=18:
    print("Eres mayor de edad")
elif edad<25:
    print("Eres un adulto joven")
elif edad<65:
    print("Eres un adulto mayor")
else:
    print("Eres un menor de edad")
    