const usermoadal =  require('../Modals/user_modal');
const UserImg = require('../Modals/Image_upload');
const { Storage } = require('@google-cloud/storage');
const bucket = new Storage().bucket("gs://raskai-fbbdc.appspot.com");




exports.home = (req,res)=>{
    res.render('Project');
}

exports.loginPage = (req, res)=>{
    res.render('login');
}

exports.userRegister = async (req,res)=>{
    const userDetail = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || 'student'
    };
    try {
        const existingUser = await usermoadal.findOne({ $or: [{ name: userDetail.name }, { email: userDetail.email }] });

        if (existingUser) {
            return res.status(404).send("User Already Exists");
        }
        const newuser = new usermoadal(userDetail);
        const savedUser = await newuser.save();
        // req.session.user = { _id: savedUser._id, name: savedUser.name, email: savedUser.email };
        res.redirect(`/admin`)
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

exports.userLogin = async (req,res) => { 
  const {email, password } = req.body;
  try {
    const user = await usermoadal.findOne({email});
    console.log(user);
    if (user && await (user.matchPassword(password))) {
        req.session.user = user;
        if(user.role === "admin"){
            res.redirect(`/admin`);
        }else{
            res.redirect(`/dasboard`);
        } 
    }
    else{
        console.log('UserNotFound');
        res.send("User Not Exist /n try Again:")
    }
} catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
 }
}

exports.logoutUser = async (req,res) => {
    req.session.destroy(err => {
        if (err) {
          console.error('Error destroying session:', err);
        } else {
          res.redirect('/login');
        }
      });
}

exports.deleteUser =  async (req,res)=>{
    const {id}= req.params
    console.log("User Id for delete===>", id);
    const deletedUser = await usermoadal.findByIdAndDelete(id);
    if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      else{
        return res.status(200).redirect(`/admin`);
      }
}

exports.updateUser = async (req,res)=>{
    try {
        const { id } = req.params; // Assuming the user ID is in the URL params
        const updateData = req.body; // Assuming the updated data is in the request body

        console.log("user ID:", id);
        console.log("User update Details:",  req.body);


        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const updatedUser = await usermoadal.findByIdAndUpdate(id, updateData, { new: true });
       
        
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }else{
            res.redirect(`/admin`);
        }

        
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.dashboard = async (req, res) => {
    const { _id, name, email } = req.session.user;
    var messages = '';
    var imgBase64 = "";
    try {
        const userImage = await UserImg.find({ user: _id });
        if (userImage && userImage.length > 0 && userImage[0].Img) {
             var imgBuffer = userImage[0].Img;
             imgBase64 = imgBuffer.toString('base64');
            const currentDate = new Date();
            const currentHour = currentDate.getHours();
            
            if (currentHour < 12) {
                messages = "Good Morning!";
            } else if (currentHour === 12) {
                messages = "Good Noon!";
            } else {
                messages = "Good Afternoon!";
            }

            res.status(200).render('dashboard', { messages, _id, name, email, imgBase64 });
        } else {
            res.status(200).render('dashboard', { messages, _id, name, email, imgBase64 });
        }
    } catch (error) {
        console.error("Error fetching user image:", error);
        res.status(500).send("Internal Server Error");
    }
}

exports.ImageSave =  async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).send("No fileUpload ");
        }
        const metadata = {
            contentType: req.file.mimetype,
        };
          const blob = bucket.file(`profileimages/${req.file.originalname}`);
          const blobStream = blob.createWriteStream({
              metadata: metadata,
              gzip: true
          });
  
          blobStream.on('error', err =>{
              console.log("error uploading",err)
              return res.status(500).json({
                  err: "Unable to upload image"
              })
          })
          blobStream.on('finish',  async ()=>{
              const imageurl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
              const { _id } = req.session.user;
              const newImage = new UserImg({
                user: _id,
                Img: imageurl,
              });
              console.log("new image :", newImage)
              await newImage.save();
              res.status(201).redirect(`/dasboard`);

          });
  
          blobStream.end(req.file.buffer);
          
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
}

exports.ImgeUpload = (req,res)=>{
    res.render('upload');
}




