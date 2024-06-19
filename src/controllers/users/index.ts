import {Request, Response} from "express";
import {comparePassword, hashPassword} from "../../libraries/passwordUtils";
import Users from "../../models/users";
import {createToken, verifyToken} from "../../libraries/tokenLibary";
import * as fs from "node:fs";
import transporter from "../../libraries/nodeMailer";


export default class UsersController {
    static async index(req: Request, res: Response) {
        try {
            const page = req.query.page;
            const limit = req.query.limit;
            let filter = {};
            if (page) {

            }
            if (limit) {

            }
            let usersList = await Users.findAll(filter);
            usersList = JSON.parse(JSON.stringify(usersList, null, 2));
            res.status(200).json(usersList);
        } catch (err: Error | any) {
            res.status(500).send(err.message)
        }
    }

    static async SignIn(req: Request, res: Response) {
        try {
            const user = req.body;
            const findUser = await Users.findOne({
                where: {
                    email: user.email
                }, attributes: ["id_user", 'email', 'password', 'role']
            })
            if (!findUser) {
                res.status(401).json({message: 'Email không tồn tại trên hệ thống'})
            } else {
                if (await comparePassword(user.password, findUser.password)) {
                    const token = createToken(findUser.id_user, findUser.role, (60 * 60 * 60));
                    res.status(200).json({
                        id_user: findUser.id_user,
                        isAdmin: findUser.role !== 0,
                        token: token
                    });
                } else {
                    res.status(401).json({message: 'Email hoặc mật khẩu không chính xác'});
                }
            }
        } catch (err: Error | any) {
            res.status(500).json({error: err.message})
        }
    }

    static async SignUp(req: Request, res: Response) {
        try {
            const user = req.body;
            user.password = await hashPassword(user.password);
            const newUser = await Users.create(user, {returning: true});
            const token = createToken(newUser.id_user, newUser.role, 60 * 60 * 60);
            res.status(200).json({
                id_user: newUser.id_user,
                token
            })
        } catch (err) {
            res.status(500).json({err})
        }
    }

    static async findUserById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await Users.findOne({
                where: {id_user: id},
                attributes: ["name", 'email', 'address', 'phone', 'image', 'role']
            });
            if (user) res.status(200).json(user);
        } catch (err: Error | any) {
            res.status(500).json({error: err.message})
        }
    }

    static async uploadAvatar(req: Request, res: Response) {
        try {
            const files = req.files;
            // @ts-ignore
            if (files && files.length > 0) {
                // @ts-ignore
                res.status(200).json({filename: files[0].filename});
            } else {
                res.status(501).json({message: "uploads avatar failed"});
            }
        } catch (err: Error | any) {
            res.status(500).json({error: err.message})
        }
    }

    static async addUser(req: Request, res: Response) {
        try {
            const user = req.body;
            const newUser = await Users.create(user, {returning: true})
            res.status(200).json(newUser);
        } catch (err: Error | any) {
            res.status(500).json({err: err.message})
        }
    }

    static async editUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            let user = req.body;
            if(user.password) {
                user.password = await hashPassword(user.password);
            }
            await Users.update(user, {
                where: {
                    id_user: id
                }
            })
            const newUser = await Users.findOne({where: {id_user: id}})
            res.status(200).json(newUser);
        } catch (err: Error | any) {
            res.status(500).json({err: err.message})
        }
    }

    static async removeUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await Users.destroy({
                where: {
                    id_user: id
                }
            })
            res.status(200).json({message: 'User deleted'})
        } catch (err: Error | any) {
            res.status(500).json({err: err.message})
        }
    }

    static async removeBackground(req: Request, res: Response) {
        const filename = req.params.filename;
        try {
            fs.unlink(`public/images/uploads/${filename}`, (err) => {
                if (err) {
                    res.status(501).json({err: 'error when remove image'})
                } else {
                    console.log('Ảnh đã được xóa');
                    res.status(200).json({});
                }
            });
        } catch (err) {
            console.log(err)
            res.status(501).json({message: "uploads avatar failed"});
        }
    }


    static async resetPassword(req: Request, res: Response) {
        const email = req.body.email;
        const id_user = req.body.id_user;
        const role = req.body.role;
        const token = createToken(id_user, role, 60 * 60 * 60);
        console.log(email, id_user, role);
        const resetUrl = `http://localhost:5173/account/reset_pass?token=${token}`;
        const mailOptions = {
            from: 'ngamingyahoo@gmail.com',
            to: email,
            subject: 'Request to reset password',
            html: `
            <h1>Request to reset password</h1>
            <a href="${resetUrl}">click here to reset your password</a>
        `,
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                res.status(500).send({error : err.message});
            } else {
                console.log('Email đã được gửi');
                res.status(200).send('Email đã được gửi');
            }
        });
    }

    static async updatePassword(req: Request, res: Response) {
        const {password} = req.body;
        try {
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1];
                const data = verifyToken(token);
                if (data instanceof Error) {
                    res.status(401).json({error: 'access token invalid'})
                } else {
                    console.log(data)
                    // Users.update({
                    //     password: await hashPassword(password)
                    // }, {
                    //     where: {
                    //         // id_user: data.idUser,
                    //     }
                    // })
                    //     .then((result) => {
                    //         res.status(200).json(result)
                    //     })
                    //     .catch((error) => {
                    //         res.status(500).json(error)
                    //     })
                }
            } else {
                res.status(401).json({error: 'Not authoried!!'});
            }
        } catch (err) {
            res.status(500).json({error: err})
        }
    }

    static async checkEmail(req : Request, res : Response) {
        try {
            const email = req.body.email;
            const findUser = await Users.findOne({
                where: {email: email}
            });
            if(findUser) {
                res.status(200).json(findUser);
            } else {
                res.status(404).json({err : 'email không tồn tại trên hệ thông'});
            }
        } catch (err : Error | any) {
            res.status(500).json({error: err.message})
        }
    }

    static async statistics (req: Request, res: Response) {
        console.log(31231);
        try {
            const user = await Users.findAll();
            res.status(200).json({ allUsers: user.length })
        } catch (err : Error | any) {
            res.status(500).json({error: err.message})
        }
    }
}
