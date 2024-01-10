const multer = require('multer');
var admin = require("firebase-admin");
var serviceAccount = require("./raskai-fbbdc-firebase-adminsdk-lorng-608e1ca361.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://raskai-fbbdc-default-rtdb.firebaseio.com",
    storageBucket: "gs://raskai-fbbdc.appspot.com"
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

module.exports = upload





// ------------- Local Storage --------------


// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // Set the destination folder for uploaded files
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname); // Set the filename
//     },
//   });
//   const upload = multer({ storage: storage });

// module.exports = upload