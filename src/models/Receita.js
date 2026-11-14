export default class Receita {
    constructor(id, nome, categoria, tempo, dificuldade, ingredientes = [], modoDePreparo = []) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
        this.tempo = tempo;
        this.dificuldade = dificuldade;
        this.ingredientes = ingredientes;
        this.modoDePreparo = modoDePreparo;
    }
}