| Contenedor                                | Función                                                              |
| ----------------------------------------- | -------------------------------------------------------------------- |
|Aplicación Web                    | Interfaz que utilizan cliente y administrador                        |
|Servicio / API                    | Procesa ventas, carrito, inventario y facturación                    |
|Base de Datos                     | Almacena productos, stock, clientes, ventas y facturas               |
|Sistema de Facturación Electrónica| Sistema externo con el que se comunica para emitir/procesar facturas |


```mermaid
  flowchart LR

    Cliente["Cliente"]
    Admin["Administrador / Vendedor"]

    subgraph Sistema["SISTEMA DE TIENDA"]
        Web["Aplicación Web<br/>Catálogo, carrito, ventas,<br/>inventario y facturación"]

        Backend["Servicio / API del Sistema<br/>Lógica de negocio,<br/>ventas e inventario"]

        BD[("Base de Datos<br/>Productos, clientes,<br/>ventas, stock y facturas")]
    end

    Facturacion["Sistema Externo<br/>de Facturación Electrónica"]

    Cliente -->|"HTTPS"| Web
    Admin -->|"HTTPS"| Web

    Web -->|"Solicitudes"| Backend
    Backend -->|"Lee / escribe"| BD
    Backend -->|"Envía datos de factura"| Facturacion
    Facturacion -->|"Respuesta / factura"| Backend
