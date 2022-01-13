# Учебный проект

### `Основная задача проекта:`
Реализована аутентификации и авторизации пользователя, через систему выдачи пары
jwt-токенов. Регистрация подтверждается через email введеный при регистрации.

Серверная часть создавалась по урокам. Фронтэнд-логика самостоятельно с оглядкой на уроки.
Modx был заменен на Redux

_____

## Функционал:

- Регистрация пользователя;
- Подтверждение регистрации через email (настроен через smtp yandex)
- Вход пользователя
- Выход
- Получение списка зарегистрированных пользователей для 
авторизованных пользователей
___

## Стек технологий:

#### Сервер:
- __Express__
- __MongoDB - mongoose__
- __серверное REST API__
- __Дополнительные библотеки__:
  - cors
  - jsonwebtoken
  - express-validator
  - nodemailer
  - nodemon для разработки
  - и другие

#### Фронт:
- __React__
- __Redux:__
    - __Redux toolkit__
    - __Async thunk__

### Прочие:
- __webpack__
    - Своя сборка. Добавлен только необходимый минимум для сборки и разработки. Будет дополняться, по мере надобности
- __Axios__
- __git__ 
- __JavaScript__