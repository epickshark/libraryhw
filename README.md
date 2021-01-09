# Необходимое окружение

## VS Code
Установить VS Code с нужными extensions для работы с Java 
[VS Code](https://code.visualstudio.com/docs/languages/java)

## Maven
Желательно поставить Maven отдельно, но в целом нужный файл лежит в проекте
[Maven](https://maven.apache.org/)

## MS SQL Server
Достаточно Express версии.
Необходимо будет создать БД и, возможно, пользователя (вроде есть дефолтный, но это не точно).
В сервере должна быть включена возможность коннекта по SQL авторизации (в общем не только под windows пользователем).
Также должен быть включен TCP порт 1433/1434 (по дефолту вроде выключено).
[Management Studio](https://docs.microsoft.com/ru-ru/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
[MS SQL Express](https://www.microsoft.com/ru-RU/download/details.aspx)

# Настройка приложения

В проекте лежит файл **application.properties**, который имеет следующий вид

```
spring.datasource.driverClassName=com.microsoft.sqlserver.jdbc.SQLServerDriver
spring.datasource.url=jdbc:sqlserver://localhost;databaseName=library
spring.datasource.username=tast
spring.datasource.password=test
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql = true

## Hibernate Properties
# The SQL dialect makes Hibernate generate better SQL for the chosen database
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.SQLServer2012Dialect

# Hibernate ddl auto (create, create-drop, validate, update)
spring.jpa.hibernate.ddl-auto = update
```

Так и должен выглядеть конфиг, то что можно и стоит изменить, показано ниже

## Вариативные настройки
 
**spring.datasource.url** - ConnectionString до БД. Если до локального MS SQL Server, то оставляем localhost, databaseName устанавливаем с названием созданной БД ( в примере БД называется library)

**spring.datasource.username** - Имя пользователя, под которым бует выполнятся подключение к БД. Можно использовать любого, у которого есть права на созданную БД (пользователь tast с паролем test)

**spring.datasource.password** - Пароль пользователя
