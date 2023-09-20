# Carpetas en estructura de clean code

## Presentation

Rodo lo que se encuentra en la carpeta de presentation es lo que se puede ver desde el exterior de la aplicación, como por ejemplo Express, GraphQL, etc.
Es una capa que se deberia poder cambiar y que no afecte a las reglas de negocio.

## Domain

En esta carpeta se encuentra toda la lógica de negocio de la aplicación, es decir, las reglas de negocio. Es la capa más importante de la aplicación, ya que es la que contiene la lógica de negocio y es la que se debería poder reutilizar en cualquier aplicación.

## Infrastructure

En esta carpeta se encuentra todo lo que tiene que ver con la infraestructura de la aplicación, como por ejemplo la base de datos, el envío de emails, etc.
