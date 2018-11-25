# rewardcategory

rewardcategorys are the most important type of this application.


## Getting a reward category
Required userlevel: user
This call is a GET method requiring the following fields:
- rewardcategory_id: String

> /api/rewardcategory/get/:rewardcategory_id


If succesful, it will return the rewardcategory info:
```
{
  "_id": "5bf2bfbae7179a56e2129eb8",
  "categoryName": "Coupons"
} 
``` 

If unsuccesful, it will return **null**



## Getting all reward categories
Required userlevel: user

This call is a GET method requiring the following fields:
- rewardcategory_id: String

> /api/rewardcategory/all/


If succesful, it will return all rewardcategorys' info:
```
[
  {
      "_id": "5bf2bfbae7179a56e2129eb8",
      "categoryName": "Coupons"
  }
  ...
]
``` 


## Creating a reward category
Required userlevel: admin

This call is a PUT method with the following optional fields:
- Optional
  - name: String


> /api/rewardcategory/create/

If succesful, it will return a confirmation:
```
{
    succes: true
}
``` 


## Updating a reward category
Required userlevel: admin

This call is a PUT method with the following fields:
- Required
  - id: String

- Optional
  - name: String


> /api/rewardcategory/update/

If succesful, it will return a confirmation:
```
{
    succes: true
}
``` 




## Deleting a reward category
Required userlevel: admin

This call is a DELETE method requiring the following fields:
- rewardcategory_id: String

> /api/rewardcategory/delete/:rewardcategory_id

If succesful, it will return a confirmation:
```
{
    succes: true
}
``` 
