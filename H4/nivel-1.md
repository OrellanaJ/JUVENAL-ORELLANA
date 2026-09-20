
```mermaid
flowchart LR

    Cliente[" Cliente"]
    Administrador[" Administrador / Vendedor"]

    Sistema[" SISTEMA DE TIENDA<br/>VENTAS E INVENTARIO"]

    Facturacion[" Sistema Externo<br/>de Facturación Electrónica"]

    Cliente -->|"Consulta catálogo<br/>y realiza compras"| Sistema
    Administrador -->|"Gestiona productos,<br/>ventas e inventario"| Sistema

    Sistema -->|"Envía datos de facturación<br/>y recibe respuesta"| Facturacion
