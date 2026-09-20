# Decisiones de arquitectura para el Sistema Web con Inventario de Facturación Electrónica mediante SOLID, Strategy, Observer y Adapter

### Sistema

**Sistema Web de Facturación Electrónica con gestión de ventas, productos, inventario, clientes, usuarios, pagos e integración con el SIAT.**

### Contexto

El sistema necesita gestionar diferentes reglas de negocio, como descuentos, impuestos y métodos de pago, además de reaccionar a eventos como el registro de una venta. También debe comunicarse con sistemas externos como el SIAT sin depender directamente de su implementación. Por ello se busca reducir el acoplamiento y mantener separadas las responsabilidades mediante principios SOLID.

### Decisión

Se decidió combinar los patrones **Strategy, Observer y Adapter** junto con los principios **SOLID**. Strategy manejará las reglas de negocio que pueden variar, Observer permitirá reaccionar a eventos como una venta registrada y Adapter aislará la comunicación con el SIAT y otros servicios externos.

### Alternativas consideradas

Se consideró **Factory Method**, pero no se aplicará inicialmente porque el sistema no necesita una creación compleja de diferentes tipos de objetos. También se descartó utilizar **Singleton** para todos los servicios porque puede generar estado global, dependencias ocultas y dificultades para realizar pruebas.

### Consecuencias

Se obtiene una arquitectura más organizada, flexible y mantenible, con menor acoplamiento entre los componentes internos y los sistemas externos. Como consecuencia, se agregan algunas interfaces y clases adicionales, aumentando ligeramente la complejidad, pero se facilita la incorporación de nuevas reglas, eventos y proveedores sin modificar toda la lógica del sistema.

### Conclusión

La decisión permite construir un **Sistema Web de Facturación Electrónica** con una arquitectura clara y preparada para crecer. La combinación de **SOLID + Strategy + Observer + Adapter** responde directamente a las necesidades actuales del sistema, mientras que **Factory Method y Singleton** quedan como alternativas para futuras necesidades concretas, evitando aplicar patrones innecesarios y reduciendo la sobreingeniería.
