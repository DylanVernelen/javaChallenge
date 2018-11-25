# Reward

Rewards are the most important type of this application.


## Getting a reward
Required userlevel: user
This call is a GET method requiring the following fields:
- reward_id: String

> /api/reward/get/:reward_id


If succesful, it will return the reward info:
```
{
    "_id": "5bf40ff3301ce91d4f047132",
    "name": "Karting",
    "worth": 50,
    "category": "Activities",
    "description": "A 3 heat karting event for you and 4 friends",
    "__v": 0
}
``` 

If unsuccesful, it will return **null**



## Getting all rewards
Required userlevel: user

This call is a GET method requiring the following fields:
- reward_id: String

> /api/reward/all/


If succesful, it will return all rewards' info:
```
[{
    "_id": "5bf40ff3301ce91d4f047132",
    "name": "Karting",
    "worth": 50,
    "category": "Activities",
    "description": "A 3 heat karting event for you and 4 friends",
    "__v": 0
}]
``` 


## Creating a reward
Required userlevel: admin

This call is a PUT method with the following optional fields:
- Optional
  - name: String
  - worth: Number
  - category: String
  - description: String

> /api/reward/create/

If succesful, it will return a confirmation:
```
{
    succes: true
}
``` 


## Updating a reward
Required userlevel: admin

This call is a PUT method with the following fields:
- Required
  - id: String

- Optional
  - name: String
  - worth: Number
  - category: String
  - description: String

> /api/reward/update/

If succesful, it will return a confirmation:
```
{
    succes: true
}
``` 




## Deleting a reward
Required userlevel: admin

This call is a DELETE method requiring the following fields:
- reward_id: String

> /api/reward/delete/:reward_id

If succesful, it will return a confirmation:
```
{
    succes: true
}
``` 


## Buying a reward
Required userlevel: user

This call is a POST method requiring the following fields:
- rewardid

It will automatically get the user object by token and will give any of the following results:

**Enough points**
```
{
    "succes": true,
    "currentPoints": 400,
    "uniqueid": "n6fqqjy89ya"
}
```
The uniqueid should be used later on to reference which reward is used (if there are two rewards with the same id)

**Not enough points**

{
    "error": "not-enough-points",
    "userPointCount": 0,
    "rewardWorth": 100
}

** Picking up a reward **
Required userlevel: admin

This call is a POST method requiring the following fields:
- userid: String > the user whose rewards are set to picked up or not
- uniqueid: String > the user's purchase history unique id - anti duplicate requirement
- pickedup: Number(0, 1) > if the reward has been picked up or not

It will return the following information upon success
```
{
	"succes": true,
	"history": [] // purchase history
}
```