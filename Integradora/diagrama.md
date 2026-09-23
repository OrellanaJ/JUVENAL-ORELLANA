classDiagram
    direction TB
    class TuNombreCompleto {
        +String autor: "Tu Nombre Completo"
    }
    class GestorDeEstadias {
        -TarifaStrategy tarifaStrategy
        -BaseDeDatosParqueo db
        -Notificador notificador
        +registrarSalida(placa, tipo, horas)
    }
    class TarifaStrategy {
        <<interface>>
        +calcular(horas)
    }
    class TarifaAuto {
        +calcular(horas)
    }
    class TarifaMoto {
        +calcular(horas)
    }
    class TarifaResidente {
        +calcular(horas)
    }
    class BaseDeDatosParqueo {
        +guardarEstadia(placa, tipo, horas, total)
    }
    class Notificador {
        <<interface>>
        +enviar(mensaje)
    }
    class WhatsAppDelEdificio {
        +enviar(mensaje)
    }

    GestorDeEstadias --> TarifaStrategy
    TarifaStrategy <|.. TarifaAuto
    TarifaStrategy <|.. TarifaMoto
    TarifaStrategy <|.. TarifaResidente
    GestorDeEstadias --> BaseDeDatosParqueo
    GestorDeEstadias --> Notificador
    Notificador <|.. WhatsAppDelEdificio