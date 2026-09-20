El Nivel 1 debe responder:

¿Quién usa el sistema? → Cliente y Administrador/Vendedor.
¿Cuál es el sistema? → Sistema de Tienda con Inventario y Ventas.
¿Con qué sistemas externos habla? → Sistema de Facturación Electrónica.



```mermaid
flowchart LR

    Cliente[" Cliente"]
    Administrador[" Administrador / Vendedor"]

    Sistema[" SISTEMA DE TIENDA<br/>VENTAS E INVENTARIO"]

    Facturacion[" Sistema Externo<br/>de Facturación Electrónica"]

    Cliente -->|"Consulta catálogo<br/>y realiza compras"| Sistema
    Administrador -->|"Gestiona productos,<br/>ventas e inventario"| Sistema

    Sistema -->|"Envía datos de facturación<br/>y recibe respuesta"| Facturacion


