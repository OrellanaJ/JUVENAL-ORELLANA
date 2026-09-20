flowchart LR

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
