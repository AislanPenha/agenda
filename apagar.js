function Pessoa(nome, sobrenome) {
    let id=100;
    
    this.nome = nome;
    this.sobrenome = sobrenome;

    this.fala = ()=> {
        console.log('seja bem VideoEncoder', this.nome, this.sobrenome, id)
    }
}

const p1 = new Pessoa('Aislan', 'Penha');

p1.fala();