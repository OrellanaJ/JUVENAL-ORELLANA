El sistema registra ESTADÍAS: cada vehículo (auto, moto o residente)


```mermaid
classDiagram
    direction TB
    class TuNombreCompleto {
        +String autor: "Tu Nombre Completo"
    }
    
    class Estadia {
        -String placa
        -String tipoVehiculo
        -int horas
        -String estado
        -decimal total
        +cambiarEstado(nuevoEstado)
    }

    class GestorDeEstadias {
        -TarifaStrategy tarifaStrategy
        -BaseDeDatosParqueo db
        -Notificador notificador
        +registrarEntrada(placa, tipo)
        +registrarSalida(placa, horas)
        +anularEstadia(placa)
    }

    class AdministracionParqueo {
        +ajustarTarifa(tipo, nuevaTarifa)
        +generarReporteIngresosMensual()
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
        +guardarEstadia(estadia)
        +obtenerEstadiasActivas()
        +obtenerIngresosPorTipo()
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
    AdministracionParqueo --> BaseDeDatosParqueo
