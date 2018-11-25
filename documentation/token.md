# Token

In order to get a token, you must be a registered user on the jstack reward platform. 
There are two userlevels: user & admin


## Validating a token with credentials

This call is a POST method requiring the following fields:
- email: String
- password: String

> /api/token/validate


If succesful, it will return the user info:
```
{
    "id": "5bf272a3fb6fc0561ffbbafa",
    "token": "ABCDEF",
    "pointCount": 0, 
    "email": "admin@ars.com",
    "userLevel": "admin", 
    "history": [] // Purchased rewards history
}
``` 

If unsuccesful, it will return an error:
```
{
	error: "invalid-login"
}

```