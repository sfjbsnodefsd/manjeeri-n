const http = require('http');
// http.createServer((req,res)=>{
//     res.write('hello')
//     res.end()
// }).listen(5000)

function greet(req,res) {
    res.writeHead(200,{'Content-Type' : 'application/json'})
    res.write(JSON.stringify({
        "name" : "Manjeeri",
        "empId" : "20092022",
        "address" : {
            "street" : "32",
            "city":"Pune"
        }
    }))
    res.end();
}
http.createServer(greet).listen(5000);