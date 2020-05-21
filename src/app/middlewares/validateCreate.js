module.exports = (req,res, next) => {

    function formatEmail () {

        let email = req.body.email;

        console.log(email)

        if (email == null) {
            return false
        }else {

            parts = email.split('@');

            if (parts.length == 2)
                return true
            else 
                return false

        }
    }


    if (req.body.name == null)
        res.status(400).json({erro: 'Campu inválido'})
    else if (formatEmail() == false) 
        res.status(400).json({erro: 'campu inválido' });
    else if (req.body.password == null)
        res.status(400).json({erro: 'Campu inválido'});
    else
        next();

}