API documentatie:


Alle API calls zijn voorafgaand met /api, bv: /api/reward/get/1?token=XYZ




AUTHENTICATIE:
	
	/token/validate
	- POST
	- Invoer:
		- email: string
		- password: string
	- Resultaat:
		GELDIG:
		- {token: "xyz"}
		ONGELDIG:
		- {"error": "invalid-login"}


REWARDS:
	/reward/buy
	
	/reward/get/{id} 
	- GET
	- Verkrijg een reward met ID
	
	/reward/create
	- POST
	- Maakt reward aan
		- name: string
		- worth: number
		- owner: id 
	
	/reward/delete/{id}
	- DELETE 
	- Verwijderen van reward 
	
	/reward/all
	- GET 
	- Alle rewards
	
	/reward/update
	- PATCH
	- Veranderen van reward
		- name: string
		- worth: number
		- owner: id


