# User


## Getting a user
Required userlevel: admin

This call is a GET method requiring the following fields:
- user_id: String

> /api/user/get/:user_id


If succesful, it will return the user info:
```
{
    "_id": "5bf9d80a754c04364897be5f",
    "history": [],
    "challenges": [],
    "token": "2b10iS1VkR83ZPSmQReaEADMcjDtBGkiX39jMwPJo7fKVUp58XI9",
    "password": "$2b$10$Tpe9z9TgC78pFEAsDZeP2bNrbPZUoT8TyFIy4qs2I4CXO.",
    "email": "test@test.be",
    "userLevel": "admin",
    "pointCount": 0,
    "__v": 0
},
``` 

If unsuccesful, it will return **null**



## Getting all users
Required userlevel: admin

This call is a GET method requiring the following fields:
- user_id: String

> /api/user/all/


If succesful, it will return all users' info:
```
[{
  "_id": "5bf9d80a754c04364897be5f",
  "history": [],
  "challenges": [],
  "token": "2b10iS1VkR83ZPSmQReaEADMcjDtBGkiX39jMwPJo7fKVUp58XI9",
  "password": "$2b$10$Tpe9z9TgC78pFEAsDZeP2bNrbPZUoT8TyFIy4qs2I4CXO.",
  "email": "test@test.be",
  "userLevel": "admin",
  "pointCount": 0,
  "__v": 0
}
...
]
``` 


## Creating a user
Required userlevel: admin

This call is a PUT method with the following optional fields:
- Required
  - name: String
  - password: String
  - userLevel: String


> /api/user/create/

If succesful, it will return a confirmation:
```
{
    succes: true
}
``` 


## Updating a user
Required userlevel: admin

This call is a PUT method with the following fields:
- Required
  - id: String

- Optional
  - name: String
  - password: String
  - userLevel: String

> /api/user/update/

If succesful, it will return a confirmation:
```
{
    succes: true
}
``` 




## Deleting a user
Required userlevel: admin

This call is a DELETE method requiring the following fields:
- user_id: String

> /api/user/delete/:user_id

If succesful, it will return a confirmation:
```
{
    succes: true
}
``` 
