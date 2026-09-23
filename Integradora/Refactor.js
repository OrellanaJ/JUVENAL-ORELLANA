// Refactor: juvenal Orellana
// INTEGRADORA · VARIANTE B — Parqueo del Edificio "Torre Central"

class TarifaAuto {
    calcular(horas) { return horas * 5; }
}

class TarifaMoto {
    calcular(horas) { return horas * 3; }
}

class TarifaResidente {
    calcular(horas) { return horas * 1; }
}

class FabricaDeTarifas {
    static obtener(tipo) {
        switch (tipo) {
            case "auto": return new TarifaAuto();
            case "moto": return new TarifaMoto();
            case "residente": return new TarifaResidente();
            default: return new TarifaAuto();
        }
    }
}

class BaseDeDatosParqueo {
    guardarEstadia(placa, tipo, horas, total) {
        console.log(`[BD] INSERT INTO estadias VALUES ('${placa}', '${tipo}', ${horas}, ${total})`);
    }
}

class WhatsAppDelEdificio {
    enviar(mensaje) {
        console.log(`[WHATSAPP] 📱 ${mensaje}`);
    }
}

class GestorDeEstadias {
    constructor(baseDeDatos, notificador) {
        this.baseDeDatos = baseDeDatos;
        this.notificador = notificador;
    }

    registrarSalida(placa, tipoVehiculo, horas) {
        const estrategiaTarifa = FabricaDeTarifas.obtener(tipoVehiculo);
        const total = estrategiaTarifa.calcular(horas);

        this.baseDeDatos.guardarEstadia(placa, tipoVehiculo, horas, total);

        console.log("----- TICKET DE SALIDA -----");
        console.log(`Placa ${placa}: ${horas} h como ${tipoVehiculo}`);
        console.log(`TOTAL: ${total.toFixed(2)} Bs`);

        this.notificador.enviar(`Salida registrada: ${placa}, ${horas} h, ${total.toFixed(2)} Bs`);
    }
}

// Demo
const gestor = new GestorDeEstadias(new BaseDeDatosParqueo(), new WhatsAppDelEdificio());
gestor.registrarSalida("1234-ABC", "auto", 3);