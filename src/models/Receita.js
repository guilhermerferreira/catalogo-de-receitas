export default class Receita {
    constructor(id, usuario_id, nome, categoria, tempoPreparo, ingredientes = [], modoDePreparo = [], favorita = false) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.nome = nome;
        this.categoria = categoria;
        this.tempoPreparo = tempoPreparo;
        this.ingredientes = ingredientes;
        this.modoDePreparo = modoDePreparo;
        this.favorita = favorita;
    }
}
