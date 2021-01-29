import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();
// //api/user

router.route('/home.html').get(userCtrl.home)
router.route('/services.html').get(userCtrl.services)
router.route('/contact.html').get(userCtrl.contact)
router.route('/about_us.html').get(userCtrl.about)

router.route('/api/users')
.get( userCtrl.listAll)
.post(userCtrl.create)

router.route('/api/users/:userid')
.get(authCtrl.requireSignin, userCtrl.read)
.put(authCtrl.requireSignin, authCtrl.hasAuthorization,  userCtrl.update)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userid', userCtrl.getUserById);

export default router