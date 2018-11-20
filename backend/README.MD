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
	- POST
	- Vereist een reward id
		- rewardId: id
	- Gaat via token de gebruiker ophalen
	- Punten worden automatisch afgetrokken
	- Gebruiker historiek wordt toegevoegd

	
	/reward/get/{id} 
	- GET
	- Verkrijg een reward met ID
	
	/reward/create
	- POST
	- Maakt reward aan
		- name: string
		- worth: number
		- owner: id 
	
	/reward/delete/{rewardid}
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

	/reward/delete/{rewardid}
	- DELETE
	- Verwijderen record
		- rewardid in parameters

CATEGORIES:
	
	/category/all
	- GET
	- Alle categorieën


CHALLENGES:
	

	/challenge/request 
	- POST
	- Een user vraagt een challenge aan 
	- Vereist:
		- userid: id
		- challengeid: id
	- Retourneert: 
		- unieke identifier



	/challenge/complete
	- POST
	- Een user heeft een challenge gecomplete
	- Vereist:
		- userid: id
		- challengeid: id
		- uniqueindex: string - unieke identifier van hierboven
	- Retourneert:
		- indien succesvol
			- aantal punten gekregen
			- totaal aantal punten
		- indien onsuccesvol
			- waarschijnlijk al gecomplete 
	- Vult het user document verder aan met historiek
	- Geeft de punten automatisch
	
