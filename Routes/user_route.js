const express =  require('express');
const router = express.Router();
const user_controller = require('../Controllers/user_controller');
const { checkSession, isAdmin } = require('../middleware/SessionCheck')
const upload = require('../middleware/storage')





router.get('/',user_controller.home)
router.get('/login', user_controller.loginPage);
router.post('/register', user_controller.userRegister);
router.post('/loginuser', user_controller.userLogin);
router.get('/dasboard', checkSession, user_controller.dashboard);
router.get('/uploadfile',user_controller.ImgeUpload);
router.post('/uploadfile',upload.single('image'),user_controller.ImageSave);
router.get('/logout',user_controller.logoutUser);
router.delete('/delete/:id',user_controller.deleteUser);
router.post('/update/:id', user_controller.updateUser);
router.get('/users', user_controller.FindAllUsers);

module.exports = router