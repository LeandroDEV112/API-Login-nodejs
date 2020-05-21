const JWT = require('jsonwebtoken');
const JWTconfig = require('../../config/secret.json');

module.exports = (req, res, next) => {

    try {
        
        const header_token = req.headers.authorization;
        const parts = header_token.split(' ');

        if (!parts == 2)
            res.status(401).json({erro: "Falha na autenticação"});

        JWT.verify(parts[1], JWTconfig.secret, (err, decode) => {
            if (err)
                res.status(401).json({erro: "Token inválido"});
            

            req.user = decode;
            next();
        });


    }catch {
        res.status(401).json({erro: "Falha na autenticação"});
    }
    
}