const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    senha: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    async register() {
        this.validDatas();
        if(this.errors.length > 0){
            return;
        } else{
            await this.userExists();
            if(this.errors.length > 0) {
                return;
            }

            const salt = bcrypt.genSaltSync();
            this.body.senha = bcrypt.hashSync(this.body.senha, salt);
            this.user = await LoginModel.create(this.body);
            return;
        }
    }
    async login() {
        this.validDatas();
        if(this.errors.length > 0){
            return;
        } else{
            this.user = await LoginModel.findOne({email: this.body.email});
            if(!this.user) {
                this.errors.push('Usuário não existe');
                return;
            }
            if(!await bcrypt.compare(this.body.senha,this.user.senha)){
                this.errors.push('Não é essa senha');
                this.user = null
                return;
            }
           
            
        }
    }
    async userExists(){
        this.user = await LoginModel.findOne({email: this.body.email});
        if(this.user) this.errors.push('Usuário já existe');
        
    }
    validDatas() {
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido!');
        if(this.body.senha.length < 3 || this.body.senha.length > 30) this.errors.push('Senha inválida!');
    }
    cleanUp() {
        for(let key in this.body) {
            if(typeof this.body[key] !== 'string') this.body[key] = '';
        }
        this.body = {
            email: this.body.email,
            senha: this.body.senha
        };
    }
}

module.exports = Login;