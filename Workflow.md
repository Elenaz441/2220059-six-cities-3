# Как работать над проектом

## Окружение

Для удобства работы над проектом используются инструменты из **Node.js** и **npm**. Все необходимые настройки произведены. Убедитесь, что на рабочем компьютере установлен актуальный LTS релиз Node.js**. Актуальная версия **Node.js** указана в файле `package.json` в поле `node`. Затем, в терминале, перейдите в директорию с проектом и _единожды_ запустите команду:

```bash
npm install
```

Команда запустит процесс установки зависимостей проекта из **npm**.

### Сценарии

В `package.json` предопределено несколько сценариев.

#### Скомпилировать проект

```bash
npm run compile
```

Создаст директорию `dist` и скомпилирует проект.

#### Удалить скомпилированный проект

```bash
npm run clean
```

Удаляет директорию `dist`. Используется перед компиляцией.

#### Собрать проект

```bash
npm run build
```

Выполняет сборку проекта: удаляет ранее скомпилированный проект и компилирует заново.

#### Проверить линтером

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Линтер проверяет файлы только внутри директории `src`.

**Обратите внимание**, при запуске данной команды, ошибки выводятся в терминал.

#### Запустить ts-модуль без компиляции

```bash
npm run ts -- <Путь к модулю с ts-кодом>
```

Пакет `tsx` позволяет выполнить TS-код в Node.js без предварительной компиляции. Используется только на этапе разработки.

#### Запустить проект

```bash
npm run start
```

В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода.

#### Запустить проект в режиме разработки

```bash
npm run start:dev
```

Проект будет запущен в режиме разработки. Приложение перезапускается каждый раз при изменении какого-либо файла.

#### Запустить консольное приложение

```bash
npm run cli:dev --
```

Запуск cli-приложения.

#### Запустить моковый сервер

```bash
npm run mock:server
```

Запуск JSON-server с подготовленными заранее данными.

## Структура проекта

### Директория `src`

Исходный код проекта: компоненты, модули и так далее. Структура директории `src` может быть произвольной.

### Файл `Readme.md`

Инструкции по работе с учебным репозиторием.

### Файл `Contributing.md`

Советы и инструкции по внесению изменений в учебный репозиторий.

### Файл `.env`

PORT=4000 - порт, на котором запускается прилодение
HOST=localhost - хост, на котором запускается приложение
DB_HOST=127.0.0.1 - хост базы данных
DB_PORT=27017 - порт базы данных
DB_USER=root - пользователь базы данных
DB_PASSWORD=root - пароль базы данных
SALT=qwerty - соль для шифрования
UPLOAD_DIRECTORY=C:\Users\six-cities\upload - папка для загрузки изображений
JWT_SECRET=secret - секрет для шифрования JWT токенов
STATIC_DIRECTORY_PATH=static - папка, где хранятся статические файлы

### Остальное

Все остальные файлы в проекте являются служебными. Пожалуйста, не удаляйте и не изменяйте их самовольно. Только если того требует задание или наставник.
