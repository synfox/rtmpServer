const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

var mongojs = require('mongojs')
var db = mongojs('tracking', ["users"])

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/user/register', function (req, res) {

	let responseBody = {
		success: false,
		result: [],
		message: ""
	}

  	db.users.insert(req.body, function(err, docs){
  		if (err){
  			responseBody.message = err
  			res.send(responseBody)
  		}
  		else{
  			responseBody.success = true;
 			responseBody.result = docs;	
 			res.send(responseBody)
  		}
  	})

})

app.get('/streams', function (req, res) {

	let responseBody = {
		success: false,
		result: [],
		message: ""
	}

 	db.users.find(function(err, docs){
 		responseBody.success = true;
 		responseBody.result = docs;
  		res.send(responseBody)
  	})
  	
})



app.listen(port, () => console.log(`Listening on port ${port}!`))