export default class Receita {
    constructor(id, usuario_id, nome, categoria, ingredientes = [], modoDePreparo = []) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.nome = nome;
        this.categoria = categoria;
        this.ingredientes = ingredientes;
        this.modoDePreparo = modoDePreparo;
    }
}