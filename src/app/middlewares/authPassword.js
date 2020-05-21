const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {

        const header = req.headers.authorization;
        const parts = header.split(' ');

        if (!parts == 2)
            res.status(401).json({erro: "Problema na autenticação"});

        JWT.verify(parts[1], 'teste', (err, decode) => {
            if (err)
                res.status(401).json({erro: "Token inválido"});
            else
                req.user = decode;
                next();
        });


    }catch {
        res.status(401).json({erro: "Problema na autenticação"});
    }

}