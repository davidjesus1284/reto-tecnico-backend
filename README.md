# API Serverless en Node.js con TypeScript

Esta API está construida utilizando el framework **Serverless** con **Node.js** y **TypeScript**. El proyecto proporciona ejemplos de instalación de módulos, comandos para levantar el servicio y pruebas de los endpoints.

## Descripción

Este proyecto crea una API serverless que se puede desplegar en plataformas como **AWS Lambda**, **Azure Functions**, o cualquier otra compatible con Serverless. Está implementada en **Node.js** con **TypeScript** para aprovechar sus características de tipado estático y autocompletado.

## Requisitos

- **Node.js** (versión recomendada: 20.x o superior)
- **npm** (gestor de paquetes de Node.js)
- **Serverless Framework** (puedes instalarlo globalmente)
- **AWS CLI** (si se va a desplegar en AWS)

## Instalación de los módulos

1. **Instalar Node.js**:
   Si no tienes Node.js instalado, puedes descargarlo e instalarlo desde [aquí](https://nodejs.org).

2. **Instalar Serverless Framework**:
   Instala Serverless globalmente usando npm:

   ```bash
   npm install -g serverless

   ```

3. **Instalar modulos de node**:
   Instalar los modulos de node usando el siguiente comando:

   ```bash
   npm install --legacy-peer-deps
   Se agrega el flag --legacy-peer-deps por la version de serverless que se implementa evitando errores de instalación

   ```

4. **Iniciar localmente** con Serverless Offline:
   ```bash
   serverless offline start
   ```

## URL para probar la API

Puedes probar la API localmente en la siguiente URL:

- **Endpoint de prueba**:  
  Get: `http://localhost:3000/dev/data/swarapi`
  Post: `http://localhost:3000/dev/data/load/user`
  Get: `http://localhost:3000/dev/data/users`
  Get: `http://localhost:3000/dev/data/users/4`

A continuación se muestra un ejemplo de un objeto JSON que puede ser utilizado en el endpoint de la API para crear usuarios:

- **Data para crear usuario**:

```json
{
  "email": "test@gmail.com",
  "name": "test"
}
```
