API documentatie:


Alle API calls zijn voorafgaand met /api, bv: /api/reward/get/1


REWARDS:

	
	
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
	

