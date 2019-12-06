const functions = require('firebase-functions');
const admin = require("firebase-admin");
const firebase = require('firebase');
const express = require('express');
const app = express();

var firebaseConfig = {
  apiKey: "AIzaSyBffOg0wP8X2oJsSsvs8JnCANtPYOmtBv0",
  authDomain: "socialapp-8dc24.firebaseapp.com",
  databaseURL: "https://socialapp-8dc24.firebaseio.com",
  projectId: "socialapp-8dc24",
  storageBucket: "socialapp-8dc24.appspot.com",
  messagingSenderId: "121497261753",
  appId: "1:121497261753:web:4424eacdd42e2b52136d68",
  measurementId: "G-THG7EZMP3T"
};

//for locally

admin.initializeApp({
  credential: admin.credential.cert(require('../key/admin.json'))
});

// admin.initializeApp();



firebase.initializeApp(firebaseConfig);

const db = admin.firestore();



app.get('/screams', (req, res) => {
  db
    .collection('screams')
    .orderBy('createdAt', "desc")
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          id: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount
        });
      });
      return res.json(screams);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err.code });
    });
});

//post a scream
app.post('/scream', (req, res) => {

  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: "Body must not be empty" })
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
    // likeCount: req.body.likeCount,
    // commentCount: req.body.commentCount
  }

  db
    .collection('screams')
    .add(newScream)
    .then(doc => {
      return res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ error: 'something went wrong' }) //server error
    });

  return ""
});

//signup route
app.post("/signup", (req, res) => {

  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  let token, userId;
  //todo: validate data
  db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    //if we get here, user is created, return authentication token
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();  //returns a promise --> return and another .then()
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(data => {
      return res.status(201).json({
        token
      })
    })
    .catch(err => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'email is already in use' });
      } else {


        return res.status(500).json({ error: err.code })
      }
    })

});







//tell firebase that app will be the new endpoint receiver -> u wanna hit /api https://baseurl.com /api/
exports.api = functions.https.onRequest(app);




//create user and return message that they signed up successfully

  // firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
  //   .then(data => {
  //     return res.status(201).json({ message: `user ${data.user.uid} signed up successfully` })
  //   })
  //   .catch(err => {
  //     console.error(err)
  //     return res.status(500).json({ error: err.code })
  //   });