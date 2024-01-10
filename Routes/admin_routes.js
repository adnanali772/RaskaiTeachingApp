const express =  require('express');
const router = express.Router();
const admin_controller = require('../Controllers/admin_controller');
const { checkSession, isAdmin } =  require('../middleware/SessionCheck')



router.get('/',isAdmin, admin_controller.adminPage);



module.exports = router