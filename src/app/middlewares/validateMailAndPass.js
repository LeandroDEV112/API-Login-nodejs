module.exports = (req, res, next) => {

    if (req.body.email == null)
        res.status(400).json({erro: ' Email inválido '});
    else if (req.body.password == null)
        res.status(400).json({erro: 'Senha inválida'});
    else
        next();
        
}