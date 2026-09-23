Implementación del Patrón Strategy para el cálculo de tarifas de estadía
ESTUDIANTE. Juvenal Orellana Almendras

## Contexto
El sistema de parqueo de la Torre Central calcula las estadías de vehículos (`auto`, `moto`, `residente`) aplicando tarifas por hora[cite: 1, 2]. El diseño original dependía de un bloque `switch` centralizado, provocando acoplamiento y dificultando la extensión del sistema ante nuevas reglas de negocio.

## Decisión
Adoptar el **Patrón Strategy** para encapsular la lógica de cobro de cada tipo de vehículo en clases de estrategia independientes, delegando la selección a una fábrica de tarifas.

## Alternativas consideradas
1. **Mantener el `switch` original:** Descartado porque cada modificación o adición de tarifas altera el código central, aumentando el riesgo de errores en producción.
2. **Herencia directa por tipo de vehículo:** Descartado por crear jerarquías rígidas e innecesarias que acoplan los datos del vehículo con el comportamiento de cobro.

## Consecuencias
* **Positivas:** Código desacoplado, alta mantenibilidad, cumplimiento del principio OCP y facilidad para incorporar nuevos tipos de vehículos.
* **Negativas:** Incremento en el número de archivos y clases del proyecto.
