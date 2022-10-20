base url auth service - http://localhost:3001/
base url process pension service - http://localhost:3000/
base url pensioner detail service - http://localhost:3002/

auth service endpoints:
    1. {base url}/auth/reg-
        method :post
        body-raw-json
            {
                "name": "Manjeeri",
                "dob": "1996-01-01",
                "password": "Node@2022",
                "pancard": "RJWPN3456e",
                "adharno": "234567898765",
                "salaryearned": 25000,
                "allowances": 1000,
                "pensiontype": "self",
                "bankdetail": {
                    "bankname" : "CBI",
                    "accountno" : "1234567890987",
                    "banktype" : "private"
                }
            }

            success response : 
            {
                "name": "Manjeeri2",
                "dob": "1996-01-01T00:00:00.000Z",
                "password": "Node@2022",
                "pancard": "RJWPN3456e",
                "adharno": "234567898768",
                "salaryearned": 25000,
                "allowances": 1000,
                "pensiontype": "self",
                "bankdetail": {
                    "bankname": "CBI",
                    "accountno": "1234567890987",
                    "banktype": "private"
                },
                "created_at": "2022-10-20T13:17:05.079Z",
                "_id": "63514f2a4f55f28f6184024b"
            }

            failure response :
            {
                "sucess": 0,
                "message": "User already exists"
            }
                
    2. {base url}/auth/login - 
        method - post
        body-raw-json
        {
            "password": "Node@2022",
            "adharno": "234567898765"
        }
        success response : 
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGhhcm5vIjoiMjM0NTY3ODk4NzY1IiwibmFtZSI6Ik1hbmplZXJpIiwiaWF0IjoxNjY2MjcyNTEyfQ.Jp4sTJX81AJpHqsqYH936ppIwCQhv_LyfMpxYAmKVno"
        }
        failure response :
        {
            "sucess": 0,
            "message": "User does not exist"
        }

pensioner detail endpoints:
    1. {base url}/pensioner/{aadharNo}
        method : get 
        Authorization : Bearer Token : {token response from login}

        success response :
        {
            "name": "Manjeeri2",
            "dob": "1996-01-01T00:00:00.000Z",
            "pancard": "RJWPN3456e",
            "adharno": "234567898768",
            "salaryearned": 25000,
            "allowances": 1000,
            "pensiontype": "self",
            "bankdetail": {
                "bankname": "CBI",
                "accountno": "1234567890987",
                "banktype": "private"
            }
        }
        error response :
        {}

process pension endpoints :
    1. {base url}/ProcessPension
    method : post
    body-raw-json
    {
        "adharno":"234567898765"
    }

    success response :
    {
        "success": true,
        "pensionDetails": {
            "pensionAmount": 21000,
            "bankServiceCharge": 500
        }
    }

    error message:
    {
        "success": false
    }

