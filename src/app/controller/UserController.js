const User = require('../model/User');
const transport = require('../../modules/index');
const JWTconfg = require('../../config/secret.json');

const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');

class UserController {

    async save (req, res) {

        const { name, email , password } = req.body;
        const final_email = email.toLowerCase();

        try {

            const user = await User.findOne({where: {
                email: final_email
            }});

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            if (!user) {

                const response = await User.create({
                    name,
                    email: final_email,
                    password: hash,
                    passwordResetToken: 'dsdsf',
                    passwordResetExpires: new Date()
                });

                transport.sendMail({
                    from: 'leandrocarlosSLIMSHADY@gmail.com',
                    to: final_email,
                    subject: 'Project Login',
                    text: `${name}, Você está cadastrado no sistema`
                });

                res.status(200).json(response);

            }else
                res.status(422).json({erro: 'Email já existente'});

        }catch(e) {
            res.status(500).json(e);
        }
    }

    async login (req, res) {

        const { email, password } = req.body;
        const final_email = email.toLowerCase();

        try {

            const user = await User.findOne({where: {
                email: final_email
            }});

            const verify_hash = bcrypt.compareSync(password, user.password);

            if (user) {
                if (verify_hash) {

                    const token = JWT.sign({
                        id: user.id
                    }, JWTconfg.secret, { expiresIn: "1h" });
                    res.status(200).json({token: token});

                }else
                    res.status(401).json({erro: "Erro de autenticação"});
            }else
                res.status(401).json({erro: "Erro de autenticação"});

        }catch(e) {
            res.status(500).json(e);
        }

    }


    async forgotPassword (req, res) {

        const email = req.body.email;
        const final_email = email.toLowerCase();

        try {

            const response = await User.findOne({
                where: { email: final_email }
            });

            if (response) {

                const token = crypto.randomBytes(10).toString('hex');

                const now = new Date();
                now.setHours(now.getHours() + 1);

                transport.sendMail({
                    from: 'leandrocarlosSLIMSHADY@gmail.com',
                    to: response.email,
                    subject: 'Redefinir senha',
                    html: `${response.name}, http://localhost:3000/resetPassword/${token}`
                });

               await User.update({
                    passwordResetToken: token,
                    passwordResetExpires: now
                }, { where: {
                    email: response.email
                }});

                res.sendStatus(200);

            }else 
                res.status(404).json({erro: 'Usuário não encontrado '});

        }catch(e) {
            res.status(500).json({erro: 'Try again'});
        }

    }

    async resetPassword (req, res) {

        const { email, token, password } = req.body;
        const final_email = email.toLowerCase();

        try {


            const response = await User.findOne({
                where: { email: final_email }
            });

            if (response) {

                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt);

                const now = new Date();

                if (token != response.passwordResetToken)
                    res.status(400).json({ erro: 'Token inválido '});

                if (now > response.passwordResetExpires)
                    res.status(400).json({erro: 'Token inspirado' });

                User.update({ password: hash }, {where: { id: response.id }});

                res.status(200).json({token: response.passwordResetToken});

            }else
                res.status(404).json({erro: 'Usuário não encontrado' });

        }catch(e) {
            res.status(500).json({erro: 'Try again' });
        }

    };

    async home (req, res) {
        res.sendStatus(200);
    }

}

module.exports = new UserController;

