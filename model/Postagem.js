module.exports = class Postagem{
    constructor(idPostagem, idProfissional, categoriaPostagem, tituloPostagem, 
        conteudoPostagem, dataPostagem){
        this.idPostagem = idPostagem;
        this.idProfissional = idProfissional;
        this.categoriaPostagem = categoriaPostagem;
        this.tituloPostagem = tituloPostagem;
        this.conteudoPostagem = conteudoPostagem;
        this.dataPostagem = dataPostagem;
    }
}