// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase");
var admin = require("firebase-admin");

// Add the Firebase services that you want to use
require("firebase/firestore");
const { Storage } = require('@google-cloud/storage');

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDi0SRXl3fdtgYM849WXEj3bZYTpkPLAY4",
    authDomain: "fir-bucket-test.firebaseapp.com",
    databaseURL: "https://fir-bucket-test.firebaseio.com",
    projectId: "fir-bucket-test",
    storageBucket: "fir-bucket-test.appspot.com",
    messagingSenderId: "481119053219",
    appId: "1:481119053219:web:300f3b4080cf0f0762a616",
    measurementId: "G-XV46VFMXEZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var serviceAccount = require("./fir-bucket-test-firebase-adminsdk-v3ulx-98991ca61b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "fir-bucket-test.appspot.com"
});

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
// var storage = admin.storage();
// var storage = require('@google-cloud/storage');
// var bucket = admin.storage().bucket();
// const storage = new Storage();


export const uploadFile = async (files = {}) => {

    let fileUploadedArray = [];
    for (const file in files) {
        console.log('#file', file, files[file]);
        let storageRef = storage.ref(`ams_docs/${files[file].name}`);

        // Upload files
        const task = await storageRef.put(files[file]);
        let errorObj, completeFlag, url;

        task.on('state_changed',
            function error(err) {
                console.log(err);
                errorObj = err;
            },
            function complete() {
                url = task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    return downloadURL;
                })
                console.log('Upload complete');
                completeFlag = true;
            }
        );

        fileUploadedArray.push({
            errorObj: errorObj,
            completeFlag: completeFlag,
            storageRef: storageRef,
            downloadURL: url,
        })
    }
    /* const fileUploadedArray = files.map(async (file) => {

        // Create a storage reference from our storage service
        let storageRef = storage.ref(`ams_docs/${file.name}`);

        // Upload files
        const task = await storageRef.put(file);
        let errorObj, completeFlag, url;

        task.on('state_changed',
            function error(err) {
                console.log(err);
                errorObj = err;
            },
            function complete() {
                url = task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    return downloadURL;
                })
                console.log('Upload complete');
                completeFlag = true;
            }
        );

        return {
            errorObj: errorObj,
            completeFlag: completeFlag,
            storageRef: storageRef,
            downloadURL: url,
        }
    }); */

    return fileUploadedArray;
};





/* // console.log('#storageRef', storageRef);

// Create a child reference
var imagesRef = storageRef.child('ams_docs');
// imagesRef now points to 'ams_docs'

// Child references can also take paths delimited by '/'
var spaceRef = storageRef.child('ams_docs/google-maps-oops-something-went-wrong.png');
// spaceRef now points to "ams_docs/google-maps-oops-something-went-wrong.png"
// imagesRef still points to "ams_docs"

console.log('#imageRef', imagesRef);
console.log('#spaceRef', spaceRef); */




/*
// Upload files
var task = storageRef.put(file);
const errorObj, completeFlag;

task.on('state_changed',
    function error(err) {
        console.log(err);
        errorObj = err;
    },
    function complete() {
        console.log('Upload complete');
        completeFlag = true;
    }
)

return {
    errorObj: errorObj,
    completeFlag: completeFlag
} */