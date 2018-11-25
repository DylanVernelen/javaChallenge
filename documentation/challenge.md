# Token

Challenges are the most important type of this application.


## Getting a challenge
Required userlevel: user
This call is a GET method requiring the following fields:
- challenge_id: String

> /api/challenge/get/:challenge_id


If succesful, it will return the challenge info:
```
  {
    "_id": "5bf53d850020f9229ae57b8d",
    "challengeName": "TOM234",
    "challengeOwner": "es",
    "challengeWorth": 85,
    "__v": 0
  }
``` 

If unsuccesful, it will return **null**


## Getting all challenges
Required userlevel: user

This call is a GET method requiring the following fields:
- challenge_id: String

> /api/challenge/all/


If succesful, it will return all challenges' info:
```
[{
  "_id": "5bf53d850020f9229ae57b8d",
  "challengeName": "TOM234",
  "challengeOwner": "es",
  "challengeWorth": 85,
  "__v": 0
},
...
]
``` 


## Creating a challenge
Required userlevel: admin

This call is a PUT method with the following optional fields:
- Optional
  - name: String
  - worth: Number
  - owner: String

> /api/challenge/create/

If succesful, it will return a confirmation:
```
{
    succes: true
}
``` 


## Updating a challenge
Required userlevel: admin

This call is a PUT method with the following fields:
- Required
  - id: String

- Optional
  - name: String
  - worth: Number
  - owner: String


> /api/challenge/update/

If succesful, it will return a confirmation:
```
{
    succes: true
}
``` 




## Deleting a challenge
Required userlevel: admin

This call is a DELETE method requiring the following fields:
- challenge_id: String

> /api/challenge/delete/:challenge_id

If succesful, it will return a confirmation:
```
{
    succes: true
}
``` 


## Requesting a challenge
Required userlevel: user

This call is a POST method requiring the following fields:
- id: String - Challenge ID
- Optional:
  - description: String
It will automatically get the user object by token and will give the following result:


```
{
    "succes": true,
}
```
