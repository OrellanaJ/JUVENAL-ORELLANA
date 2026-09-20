# ADR – DECISIONES DE ARQUITECTURA DEL SISTEMA DE FACTURACIÓN ELECTRÓNICA

## 1. Información general

**Sistema:** Sistema de Facturación Electrónica
**Tipo de arquitectura:** Sistema web con servicios de negocio y base de datos
**Integraciones externas:** SIAT y medios de pago
**Principios utilizados:** SOLID
**Patrones principales:** Strategy, Observer y Adapter
**Patrones secundarios:** Factory Method y Singleton, solamente cuando exista una necesidad concreta.

---

# 2. Contexto del sistema

El sistema de facturación electrónica tiene como objetivo permitir que los usuarios puedan registrar ventas, administrar productos, controlar inventario, gestionar clientes y usuarios, generar facturas y comunicarse con servicios externos como el SIAT.

El sistema está compuesto principalmente por una aplicación web, servicios de negocio y una base de datos.

Los principales actores son:

* Cliente.
* Vendedor.
* Administrador.

Los principales sistemas externos son:

* SIAT.
* Medio o proveedor de pago.

El sistema debe permitir que las responsabilidades estén separadas para evitar que una sola clase o componente tenga demasiadas funciones.

Por este motivo se decidió aplicar principios SOLID y determinados patrones de diseño.

La decisión principal es **no utilizar todos los patrones disponibles**, sino únicamente aquellos que solucionen problemas reales del sistema.

---

# 3. ADR-001 – Aplicación de principios SOLID

## Decisión

Se decidió aplicar los principios SOLID para mejorar la organización del código, disminuir el acoplamiento entre componentes y facilitar el mantenimiento y evolución del sistema.

Los principios SOLID que se aplicarán son:

* SRP.
* OCP.
* LSP.
* ISP.
* DIP.

---

## 3.1 SRP – Single Responsibility Principle

El principio de responsabilidad única establece que una clase o módulo debe tener una responsabilidad principal.

En el sistema no se recomienda crear una clase gigante como:

**SistemaFacturacion**

que se encargue de:

* Registrar usuarios.
* Registrar clientes.
* Registrar productos.
* Actualizar inventario.
* Generar facturas.
* Calcular impuestos.
* Enviar información al SIAT.
* Registrar pagos.
* Enviar notificaciones.

Esto provocaría una clase difícil de mantener.

Por esta razón se propone separar las responsabilidades.

Por ejemplo:

**FacturacionService**

Se encarga de la lógica relacionada con las facturas.

**InventarioService**

Se encarga del stock y productos.

**UsuarioService**

Se encarga de usuarios y roles.

**ClienteService**

Se encarga de clientes.

**NotificacionService**

Se encarga de las notificaciones.

**SIATAdapter**

Se encarga de la comunicación con el SIAT.

### Justificación

Aplicar SRP facilita encontrar errores y realizar cambios.

Por ejemplo, si cambia la forma de comunicarse con el SIAT, no debería ser necesario modificar el servicio completo de inventario o usuarios.

---

# 4. OCP – Open/Closed Principle

El sistema debe estar abierto a la extensión pero cerrado a modificaciones innecesarias del código existente.

Este principio tiene una relación importante con el patrón Strategy.

Por ejemplo, si en el futuro aparecen diferentes formas de calcular descuentos:

* Descuento por cantidad.
* Descuento por cliente.
* Descuento promocional.
* Descuento especial.

No sería recomendable colocar todos los casos dentro de una clase mediante muchos bloques `if/else`.

En su lugar, se pueden crear diferentes estrategias.

Esto permite agregar una nueva regla sin modificar constantemente la lógica principal.

### Justificación

OCP facilita que el sistema pueda crecer sin generar modificaciones excesivas en componentes que ya funcionan.

---

# 5. LSP – Liskov Substitution Principle

El principio de sustitución de Liskov indica que una implementación concreta debe poder sustituir a la abstracción que representa sin romper el funcionamiento esperado.

Por ejemplo, si el sistema define una interfaz para un proveedor de facturación electrónica, cualquier implementación válida debe cumplir el comportamiento establecido por dicha interfaz.

Este principio será aplicado cuando existan diferentes implementaciones de una misma abstracción.

### Justificación

Permite cambiar una implementación por otra sin modificar la lógica principal del sistema.

---

# 6. ISP – Interface Segregation Principle

El sistema no debe obligar a una clase a implementar métodos que no necesita.

Por ejemplo, no sería conveniente crear una interfaz gigante:

**ISistema**

con métodos para:

* Facturar.
* Gestionar inventario.
* Gestionar usuarios.
* Gestionar clientes.
* Generar reportes.
* Gestionar pagos.
* Enviar notificaciones.

En lugar de eso, se pueden utilizar interfaces específicas:

**IFacturacion**

**IInventario**

**IUsuario**

**INotificacion**

**IServicioFacturacion**

### Justificación

Las interfaces pequeñas permiten reducir el acoplamiento y hacen que cada componente dependa solamente de las operaciones que necesita.

---

# 7. DIP – Dependency Inversion Principle

El sistema debe depender de abstracciones y no directamente de implementaciones concretas.

Por ejemplo, el servicio de facturación no debería depender directamente de:

**SIATService**

sino de una abstracción como:

**IServicioFacturacion**

De esta manera se puede tener:

**IServicioFacturacion**

y posteriormente:

* SIATAdapter.
* OtroProveedorFacturacionAdapter.

El servicio de facturación no necesita conocer los detalles internos de cada proveedor.

### Justificación

DIP facilita las pruebas, reduce el acoplamiento y permite cambiar integraciones externas con menor impacto.

---

# 8. ADR-002 – Patrón Strategy

## Decisión

Se decidió utilizar el patrón **Strategy** para representar algoritmos o reglas que pueden variar.

Este patrón será utilizado principalmente para reglas de negocio.

Algunos posibles casos son:

* Cálculo de impuestos.
* Descuentos.
* Métodos de pago.
* Reglas especiales de facturación.
* Cálculos diferentes según el tipo de cliente.

Por ejemplo, el sistema puede tener una estrategia para el cálculo normal y otra estrategia para una promoción.

El servicio de facturación utiliza una interfaz común y selecciona la estrategia correspondiente.

## ¿Por qué Strategy?

Porque evita que la clase principal tenga una gran cantidad de condiciones.

En lugar de:

"Si es tipo A hago esto; si es tipo B hago aquello; si es tipo C hago otra cosa..."

se utilizan estrategias independientes.

### Beneficios

* Reduce `if/else`.
* Facilita agregar nuevas reglas.
* Cumple con OCP.
* Facilita las pruebas.
* Permite cambiar una regla sin modificar todo el servicio.

### Conclusión

**Strategy es uno de los patrones principales recomendados para este sistema.**

---

# 9. ADR-003 – Patrón Observer

## Decisión

Se decidió utilizar **Observer** para manejar eventos que pueden generar diferentes acciones dentro del sistema.

Un ejemplo sería el registro de una venta.

Cuando una venta se confirma pueden ocurrir varias acciones:

* Actualizar inventario.
* Registrar auditoría.
* Generar una notificación.
* Registrar información relacionada con la factura.
* Informar a otro componente.

No sería recomendable que el servicio de ventas tenga que conocer directamente todos esos componentes.

Con Observer se genera un evento y los componentes interesados reaccionan ante dicho evento.

## Ejemplo

Cuando se registra:

**Venta registrada**

pueden reaccionar:

**Inventario**

Actualiza el stock.

**Auditoría**

Registra la operación.

**Notificación**

Genera la notificación correspondiente.

### ¿Por qué Observer?

Porque disminuye el acoplamiento entre el componente que produce un evento y los componentes que reaccionan ante él.

### Beneficios

* Menor acoplamiento.
* Facilita agregar nuevos receptores.
* Permite trabajar con eventos.
* Separa responsabilidades.

### Precaución

No se debe abusar de Observer.

Si existen demasiados eventos encadenados, el sistema puede ser difícil de seguir y depurar.

### Conclusión

Observer es recomendable para los eventos importantes del sistema, pero debe utilizarse de forma controlada.

---

# 10. ADR-004 – Patrón Adapter

## Decisión

Se decidió utilizar **Adapter** para integrar el sistema con servicios externos.

El principal caso es la comunicación con el **SIAT**.

El sistema interno no debería depender directamente de los detalles técnicos de la API externa.

Se propone utilizar una abstracción:

**IServicioFacturacion**

y un adaptador:

**SIATAdapter**

El flujo sería:

Sistema de Facturación → IServicioFacturacion → SIATAdapter → SIAT.

## ¿Por qué Adapter?

Porque el SIAT es un sistema externo.

El formato, métodos, autenticación o estructura de comunicación del sistema externo pueden cambiar.

El Adapter permite mantener esos detalles separados de la lógica principal.

### Beneficios

* Reduce el acoplamiento.
* Aísla la API externa.
* Facilita pruebas.
* Facilita cambiar el proveedor.
* Protege la lógica interna del sistema.

### Conclusión

**Adapter es especialmente importante en este proyecto porque existe comunicación con un sistema externo como el SIAT.**

---

# 11. ADR-005 – Patrón Factory Method

## Decisión

Factory Method será utilizado solamente si la creación de objetos depende del tipo o configuración.

Por ejemplo, si en el futuro existen diferentes tipos de documentos o diferentes proveedores:

* Factura normal.
* Factura especial.
* Documento electrónico diferente.
* Proveedor A.
* Proveedor B.

La Factory puede decidir qué objeto crear.

## ¿Por qué no utilizarlo desde el principio para todo?

Porque si solamente existe una implementación, una Factory no aporta un beneficio real.

Por ejemplo, si solamente se necesita:

**new Factura()**

crear una Factory solamente agregaría clases y código innecesario.

### Conclusión

Factory Method es un patrón **opcional y condicionado al crecimiento del sistema**.

---

# 12. ADR-006 – Patrón Singleton

## Decisión

Singleton solamente se utilizará para recursos que realmente deban tener una única instancia controlada dentro de la aplicación.

Un posible caso sería una configuración general de la aplicación.

Por ejemplo:

**AppConfig**

podría manejar configuraciones globales.

## ¿Por qué no convertir todos los servicios en Singleton?

Porque Singleton puede generar:

* Estado global.
* Dependencias ocultas.
* Problemas en pruebas.
* Mayor dificultad para controlar el ciclo de vida de los objetos.

Por este motivo no se recomienda hacer:

FacturacionService = Singleton

InventarioService = Singleton

UsuarioService = Singleton

por defecto.

### Conclusión

Singleton puede utilizarse, pero de manera limitada.

---

# 13. Patrones que no se recomienda utilizar inicialmente

No todos los patrones de diseño son necesarios para este sistema.

Aplicar patrones sin una necesidad concreta puede aumentar la complejidad.

## Decorator

No se recomienda inicialmente porque no existe una necesidad clara de agregar dinámicamente múltiples comportamientos a los objetos.

Si se utiliza sin necesidad, aumentaría la cantidad de clases y relaciones.

## Composite

No se recomienda porque el sistema no necesita representar actualmente estructuras jerárquicas de objetos tratados como un conjunto.

## Command

No se recomienda inicialmente porque el sistema no requiere convertir cada operación en un objeto ni necesita principalmente funcionalidades como deshacer y rehacer.

Podría considerarse posteriormente si aparecen colas de operaciones, procesamiento diferido o auditoría basada en comandos.

## State

No se recomienda inicialmente porque el sistema no presenta una máquina de estados suficientemente compleja que justifique este patrón.

Si posteriormente las facturas tuvieran muchos estados y comportamientos diferentes por estado, podría reconsiderarse.

## Template Method

No se recomienda porque actualmente no existe una familia de algoritmos que tenga una estructura común y necesite variar determinados pasos mediante herencia.

## Bridge

No se recomienda inicialmente porque introduciría una separación adicional entre abstracción e implementación que no es necesaria para el alcance actual.

## Facade

Puede utilizarse posteriormente si el sistema llega a tener muchos servicios y se necesita una interfaz simplificada para acceder a ellos.

Sin embargo, no es obligatorio en la primera versión.

## Proxy

Puede ser útil posteriormente para:

* Control de acceso.
* Caché.
* Seguridad.
* Control de llamadas.

Pero no es necesario introducirlo sin una necesidad concreta.

---

# 14. Justificación general de los patrones seleccionados

Los patrones principales fueron seleccionados de acuerdo con problemas concretos del sistema.

### Strategy

Resuelve el problema de las reglas variables.

### Observer

Resuelve el problema de los eventos y múltiples componentes interesados.

### Adapter

Resuelve el problema de integración con sistemas externos como el SIAT.

### Factory Method

Resuelve la creación variable de objetos cuando existan diferentes tipos.

### Singleton

Resuelve casos específicos donde realmente se necesita una única instancia.

La decisión arquitectónica es utilizar principalmente:

**Strategy + Observer + Adapter**

y utilizar:

**Factory Method + Singleton**

solamente cuando exista una necesidad concreta.

---

# 15. Relación entre SOLID y patrones

Los patrones no reemplazan SOLID.

SOLID establece principios para diseñar correctamente los componentes, mientras que los patrones proporcionan soluciones reutilizables para determinados problemas.

La relación propuesta es:

**SRP**

Separa Facturación, Inventario, Usuarios y otras responsabilidades.

**OCP**

Se beneficia de Strategy para agregar nuevas reglas.

**DIP**

Se beneficia de Adapter para que la lógica dependa de interfaces y no directamente del SIAT.

**ISP**

Permite crear interfaces pequeñas para los diferentes servicios.

**LSP**

Permite que diferentes implementaciones respeten la misma abstracción.

Por lo tanto, SOLID y los patrones trabajan conjuntamente.

---

# 16. Decisión arquitectónica final

Para el sistema de facturación electrónica se decide utilizar una arquitectura sencilla y mantenible, evitando aplicar patrones solamente por aumentar la cantidad de patrones utilizados.

Los principios SOLID serán utilizados como base del diseño.

Los patrones principales serán:

**Strategy:** para reglas variables.

**Observer:** para eventos y notificaciones.

**Adapter:** para integración con SIAT y otros sistemas externos.

Como patrones secundarios:

**Factory Method:** cuando existan diferentes tipos de objetos que deban crearse.

**Singleton:** únicamente para recursos que realmente deban tener una única instancia.

Otros patrones como Composite, Command, State, Template Method y Bridge no serán implementados inicialmente porque no resuelven un problema actual del sistema.

Esto permite mantener una arquitectura comprensible, evitando sobreingeniería y facilitando futuras modificaciones.

---

# 17. Resumen de decisiones

| Elemento        | Decisión        | Justificación                                    |
| --------------- | --------------- | ------------------------------------------------ |
| SRP             | Aplicar         | Separar responsabilidades                        |
| OCP             | Aplicar         | Facilitar extensiones                            |
| LSP             | Aplicar         | Sustitución correcta de implementaciones         |
| ISP             | Aplicar         | Interfaces pequeñas                              |
| DIP             | Aplicar         | Reducir dependencia de implementaciones          |
| Strategy        | Aplicar         | Reglas variables                                 |
| Observer        | Aplicar         | Eventos y notificaciones                         |
| Adapter         | Aplicar         | Integración con SIAT                             |
| Factory Method  | Condicional     | Creación variable                                |
| Singleton       | Limitado        | Recursos realmente únicos                        |
| Decorator       | No inicialmente | Complejidad innecesaria                          |
| Composite       | No              | No existe estructura jerárquica                  |
| Command         | No inicialmente | No se necesita ejecutar operaciones como objetos |
| State           | No inicialmente | No existe máquina de estados compleja            |
| Template Method | No              | No existe algoritmo común basado en herencia     |
| Bridge          | No              | Abstracción innecesaria actualmente              |
| Facade          | Opcional        | Útil si aumenta la complejidad                   |
| Proxy           | Opcional        | Útil para necesidades futuras de seguridad/caché |

# 18. Conclusión

La arquitectura propuesta busca un equilibrio entre funcionalidad, simplicidad y mantenibilidad.

No se pretende utilizar la mayor cantidad posible de patrones, sino utilizar aquellos que realmente solucionen problemas del sistema.

La combinación principal será:

**SOLID + Strategy + Observer + Adapter**

porque estos elementos responden directamente a las necesidades del sistema de facturación electrónica.

Strategy permite manejar reglas que pueden cambiar, Observer permite reaccionar ante eventos sin crear dependencias innecesarias y Adapter permite aislar la comunicación con el SIAT y otros sistemas externos.

Factory Method y Singleton quedan como herramientas disponibles para situaciones específicas, pero no se consideran obligatorios.

De esta manera, el sistema mantiene una arquitectura clara y comprensible, evitando la sobreingeniería y permitiendo que pueda crecer posteriormente sin tener que modificar completamente su estructura.
