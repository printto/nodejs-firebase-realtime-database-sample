const admin = require("firebase-admin");
const {
  getDatabase
} = require('firebase-admin/database');
const serviceAccount = require('./our-blank-world-firebase-adminsdk-anrxd-2c05dd8c21.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://our-blank-world-default-rtdb.firebaseio.com"
});
const db = admin.database();

const express = require('express')
const app = express()

const port = 3000;

app.get('/', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
})

app.get('/set/:key/:value', (req, res) => {
  db.ref(req.params.key).set(req.params.value, function(error) {
    if (error) {
      res.send("Failed with error: " + error)
    } else {
      res.send("OK")
    }
  })
})

app.get('/get/:key/', (req, res) => {
  db.ref(req.params.key).on('value', (snapshot) => {
    res.send(snapshot.val())
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  })
})

app.get('/get/', (req, res) => {
  db.ref('/').on('value', (snapshot) => {
    res.send(snapshot.val())
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
