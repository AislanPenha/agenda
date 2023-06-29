module.exports.globalMiddleware = (req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
}
module.exports.csrfErrorMiddleware = (err, req, res, next) => {
    if(err){
        return res.render('404');
    }else{
        next();
    }
}
module.exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}
module.exports.loginRequiredMiddleware = (req, res, next) => {
    if(!res.locals.user) {

        req.flash('errors', 'Você precisa está logado');
        req.session.save(()=> {
            return res.redirect('/');
        });
        return;
    }
    next();
}