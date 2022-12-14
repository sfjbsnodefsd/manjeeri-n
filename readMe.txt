<pre>
Pension Project
    This is a pension management project where user can create a account and login to it . 
    Add the user and pension details.
    Pension is calculated according to data entered by user.
    User can logout from application

Start database (mongoDB)
Backend:
    There are 3 services
    1. Auth Service: For managing login and logout

        To Start:
            - navigate to 'pension/auth-service' folder in terminal
            - npm run start 
            - Service will be avilable at http://localhost:3001
    2. Pensioner details: To get the pension details
        To Start:
            - navigate to 'pension/pensioner-detail' folder in terminal
            - npm run start 
            - Service will be avilable at http://localhost:3002
    3. Process Pension: To calculate the pension amount.
        To Start:
            - navigate to 'pension/process-pension' folder in terminal
            - npm run start 
            - Service will be avilable at http://localhost:3000


API List:
1. Register 
    EndPoint : http://localhost:3001/auth/reg
    Request Type: POST
    Request: body->raw->json

    {
        "name": "Manjeeri",
        "dob": "1996-01-01",
        "password": "Abc@2022",
        "pancard": "RJWPN3456e",
        "adharno": "234567898768",
        "salaryearned": 25000,
        "allowances": 1000,
        "pensiontype": "self",
        "bankdetail": {
            "bankname" : "CBI",
            "accountno" : "1234567890987",
            "banktype" : "private"
        }
    }
2. Login
     EndPoint : http://localhost:3001/auth/login
     Request Type: POST

      Request: body->raw->json
        {
            "password": "Abc@2022",
            "adharno": "234567898768"
        }

3. Pensioner details:
     Request Type: GET

    EndPoint: http://localhost:3002/pensioner/234567898768
    Header: Authorization - Bearer Token - {{Value of 'token' returned in login api }}

4. Process Pension  
     Request Type: GET

    Endpoint :  http://localhost:3000/ProcessPension
    Header: Authorization - Bearer Token - {{Value of 'token' returned in login api }}

    Request :body->raw->json
        {
            "adharno":"234567898768"
        }


Frontend :
    Angular application:
        To start :
            - npm run start
            - Runs at http://localhost:4200

===========================================================

commands to run
to start with nodemon - npm run dev
to start with node - npm run start
Site will run at http://localhost:5000/
Api will run at http://localhost:3000/
inside respective folders

create procedure
if employee doesnt exist- insert else update
