# ConnectUP Frontend

Plataforma integral para la gestión de instituciones educativas, conectando administradores, docentes y estudiantes en un solo lugar.

## 🏗️ Arquitectura del Proyecto

El proyecto está construido siguiendo principios SOLID, con una arquitectura escalable y mantenible:

```
src/
├── admin/                          # 🔧 Sección de Administradores
│   ├── components/                 # Componentes específicos de admin
│   ├── views/                      # Vistas de admin (MiEspacioAdmin, Instituciones, etc.)
│   ├── services/                   # Servicios de admin (apiService, userService, etc.)
│   └── repositories/               # Repositorios de datos
│
├── user/                           # 👨‍🏫 Sección de Usuarios/Docentes
│   ├── components/                 # Componentes específicos de usuario
│   │   └── MiCV/                   # Componentes del CV
│   ├── views/                      # Vistas de usuario (MiEspacio, MisClases, etc.)
│   └── services/                   # Servicios de usuario (APIUserService, LoginUserService)
│
├── shared/                         # 🔗 Elementos Compartidos
│   ├── components/                 # Componentes comunes (Layout, ProtectedRoute, etc.)
│   ├── hooks/                      # Hooks compartidos (tokenUtils, useAuth, etc.)
│   ├── interfaces/                 # Interfaces TypeScript
│   ├── models/                     # Modelos de datos
│   ├── context/                    # Contextos de React
│   └── config.ts                   # Configuración general
│
├── routes/                         # 🛣️ Sistema de Rutas
│   ├── Routes.tsx                  # Router principal
│   ├── AdminRoutes.tsx             # Rutas específicas de admin
│   └── UserRoutes.tsx              # Rutas específicas de usuario
│
├── views/                          # 📄 Vistas Públicas
│   ├── Landing.tsx                 # Página de inicio
│   ├── loginAdmin.tsx              # Login de administrador
│   ├── loginUser.tsx               # Login de usuario
│   ├── registerAdmin.tsx           # Registro de admin
│   └── registerUser.tsx            # Registro de usuario
│
└── assets/                         # 🎨 Recursos Estáticos
    ├── icons/                      # Iconos SVG
    └── img/                        # Imágenes
```

## 🎯 Principios SOLID Implementados

### Single Responsibility Principle (SRP)
- Cada servicio tiene una responsabilidad específica
- Separación clara entre UserService y CVService
- Componentes con propósitos únicos

### Open/Closed Principle (OCP)
- Interfaces extensibles para servicios
- Componentes que pueden extenderse sin modificar código existente

### Liskov Substitution Principle (LSP)
- Implementaciones intercambiables de IHttpClient
- Modelos que implementan interfaces base

### Interface Segregation Principle (ISP)
- Interfaces específicas para cada tipo de operación
- Separación entre IStorage, IHttpClient, IValidator

### Dependency Inversion Principle (DIP)
- Servicios dependen de abstracciones, no de implementaciones concretas
- Inyección de dependencias en constructores

## 🏛️ Patrones de Diseño

### Factory Pattern
- `UserServiceFactory` para crear instancias de servicios
- Centralización de la creación de objetos

### Repository Pattern
- Interfaz `IRepository` para acceso a datos
- Abstracción de la capa de datos

### Observer Pattern
- Contexto de autenticación con useReducer
- Sistema de eventos para comunicación entre componentes

### Singleton Pattern
- Instancias únicas de servicios API
- Cliente HTTP compartido

## 🔧 Tecnologías Utilizadas

- **React 18** con TypeScript
- **React Router DOM** para navegación
- **Axios** para llamadas HTTP
- **Context API** para gestión de estado
- **CSS Modules** para estilos

## 🚀 Instalación y Configuración

### Prerrequisitos
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
