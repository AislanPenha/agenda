const Login = require('../models/loginModel');

module.exports.index = (req, res) => {
    if(req.session.user){
        return res.redirect('/');
    }else{
        res.render('login');
    }
};
module.exports.register = async (req, res, next) => {
    const login = new Login(req.body);

    try{
        await login.register();
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(()=> {
                return res.redirect('back');
            });
            return;
        }else {
            req.flash('success', 'Usuário cadastrado com sucesso');
            req.session.save(()=> {
                return res.redirect('back');
            });
        }
    
    }catch(e) {
        console.log(e);
        res.render('404');
    } 
};
module.exports.login = async (req, res, next) => {
    const login = new Login(req.body);

    try{
        await login.login();
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(()=> {
                return res.redirect('back');
            });
            return;
        }else {
            req.flash('success', 'Você entrou no sistema');
            req.session.user = login.user;
            req.session.save(()=> {
                return res.redirect('/');
            });
        }
    
    }catch(e) {
        console.log(e);
        res.render('404');
    } 
};
module.exports.logout = (req, res,next) => {
    req.session.destroy();
    res.redirect('/')
    next();
}