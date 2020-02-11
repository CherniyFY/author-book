Тестовое задание для роли Dev (Web/Front).

Технологии:
  - Web:
    - Angular
    - Apollo Client
    - Ant Design
  - Server:
    - Go
    - GraphQL
    - nginx
  - DevOps:
    - Docker
    - docker-compose

Результаты: 
  - Выполнены все пункты технического задания. 
  - Разработано SPA Авторы & Книги, с возможностью авторизации и комментирования книг. 
  - Взаимодействие с сервером происходит с помощью GraphQL API. 
  - Небольшой сервер для данного приложения был реализован самостоятельно. 
  - Подготовлен способ развертывания приложения на локальной машине.

Ссылка на репозиторий: https://github.com/CherniyFY/author-book/

Требования для развертывания на локальной машине:
- Docker
- docker-compose
- Минимальные требования для сборки приложения:
  - RAM: 4096MB
  - CPUs: 2

Инструкция для развертывания на локальной машине:
1. git clone https://github.com/CherniyFY/author-book/
2. cd author-book
3. docker-compose -f "docker-compose.yaml" up -d --build
4. Открыть в браузере http://localhost

Для завершения работы с проектом:
1. docker-compose -f "docker-compose.yaml" down
