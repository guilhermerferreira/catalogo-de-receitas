export default class Usuario {
    constructor(id, nome, email, senhaHash) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senhaHash = senhaHash;
    }
}