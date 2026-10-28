# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
    "name" : "Muhammad Fadjar Yulianto",
    "email" : "sohibul@gmail.com",
    "username" : "sohibul",
    "password" : "Sohibul_2807",
}
```
Response Body Success :

```json
{
    "data" : {
        "email" : "sohibul@gmail.com",
        "username" : "sohibul",
        "name" : "Muhammad Fadjar Yulianto"
    }
}
```

Response Body Error :

```json
{
    "errors" : "username or email alredy registered"
}
```

## Login User API

Enspoint : POST /api/users/login

Request Body :

```json
{
    "email" : "sohibul@gmail.com", // salah satu
    "username" : "sohibul", // salah satu
    "password" : "Sohibul_2807"
}
```

Response Body Success:

```json
{
    "data" : {
        "token" : "unique-token",
    }
}
```

Response Body Error :

```json
{
    "errors" : "username or password wrong"
}
```

## Update User API

Enspoint : PATCH /api/users/current

Headers:
- Authorization : token

Request Body :

```json

{
    "data" : {
        "username" : "sohibul",
        "name" : "Muhammad Fadjar Yulianto New",
        "password" : "Sohibul_2807_new"
    }
}

```

Response Body Success :

```json

{
    "data" : {
        "email" : "sohibulNew@gmail.com",
        "username" : "sohibulNew",
        "name" : "Muhammad Fadjar Yulianto New",
    }
}

```

Response Body Error :

```json

{
    "errors" : "name length max 100"
}

```

## Get User API

Endpoint : GET /api/users/current

Headers:
- Authorization : token

Response Body Success :

```json
{
    "data" : {
        "email" : "sohibulNew@gmail.com",
        "username" : "sohibul",
        "name" : "Muhammad Fadjar Yulianto",
    }
}
```

Response Body Error :

```json
{
    "errors" : "UnAuthorization"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers:
- Authorization : token

Response Body Success :

```json
{
    "data" : "ok"
}
```

Response Body Error :

```json
{
    "errors" : "UnAuthorization"
}
```