flowchart LR
    Vendedor["Vendedor<br/>Registra ventas"]
    Administrador["Administrador<br/>Ajusta stock y precios"]

    Sistema["SISTEMA DE TIENDA<br/>CON INVENTARIO<br/><br/>Registra ventas<br/>Controla stock<br/>Avisa cuando algo se agota"]

    Vendedor -->|Registra ventas| Sistema
    Administrador -->|Gestiona catálogo y stock| Sistema