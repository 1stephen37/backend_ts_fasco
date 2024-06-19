import {Router, Request, Response} from "express";
import UsersController from "../../controllers/users";
import {auth, authAdmin} from "../../libraries/authMiddleware";
import upload from "../../middlewares/uploadMiddleware";

const router = Router();

router.get('/', UsersController.index)
router.post('/sign_in', UsersController.SignIn)
router.post('/sign_up', UsersController.SignUp)
router.post('/upload', auth, upload.any() ,UsersController.uploadAvatar)
router.post('/add', UsersController.addUser)
router.patch('/edit/:id', UsersController.editUser)
router.delete('/delete/:id', UsersController.removeUser)
router.delete('/delete/:filename', UsersController.removeBackground)
router.post('/reset-password', UsersController.resetPassword)
router.post('/check-email', UsersController.checkEmail)
router.get('/statistics', authAdmin , UsersController.statistics)
router.get('/:id', auth ,UsersController.findUserById)

export default router;
