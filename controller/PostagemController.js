const ConnectionFactory = require('../util/ConnectionFactory');
const Postagem = require('../model/Postagem')

module.exports = class PostagemController {

    constructor() {
        try {
            this.conexao = ConnectionFactory.getConnection();
            console.log('Conexão criada com sucesso!');
        } catch (error) {
            console.log(`Erro ao criar conexão com o banco de dados!! Erro: ${error}`);
        }
    }

    async listarPostagem(request, response) {
        try {
            var resultado = await this.conexao.query('select * from postagem');
            response.status(200).json(resultado.rows);
        } catch (error) {
            console.error(`Erro ao listar as postagens! Erro ${erro}`);
            response.status(404).json(false);
        }
    }

    async listarPostagemPorId(request, response) {
        try {
            const idPostagem = parseInt(request.params.idPostagem);
            var resultado = await this.conexao.query('select * from postagem where idpostagem = $1', [idPostagem]);
            response.status(200).json((resultado.rowCount == 0) ? false : resultado.rows);
        } catch (error) {
            console.error(`Erro ao listar uma postagem por id! Erro: ${error} `);
            console.status(404).send(false);
        }
    }

    async cadastrarPostagem(request, response) {
        try {
            const postagem = new Postagem(null, request.body.idProfissional, request.body.categoriaPostagem,
                request.body.tituloPostagem, request.body.conteudoPostagem, request.body.dataPostagem);
            console.log(postagem);
            var resultado = await this.conexao.query('INSERT INTO postagem( idprofissional,' +
                ' categoriapostagem, titulopostagem, conteudopostagem, datapostagem)' +
                ' VALUES ($1, $2, $3, $4, $5);', [postagem.idProfissional, postagem.categoriaPostagem,
                postagem.tituloPostagem, postagem.conteudoPostagem, postagem.dataPostagem]);
            console.log(resultado);
            response.status(201).send(true);

        } catch (error) {
            console.error(`Erro ao cadastrar uma postagem! Erro: ${error}`);
            response.status(404).send(false);
        }
    }

    async alterarPostagem(request, response) {
        try {
            const postagem = new Postagem(request.params.idPostagem, request.body.idProfissional, request.body.categoriaPostagem,
                request.body.tituloPostagem, request.body.conteudoPostagem, request.body.dataPostagem);
            console.log(postagem);
            await this.conexao.query('UPDATE postagem SET  idprofissional=$1, categoriapostagem=$2,'+
            ' titulopostagem=$3, conteudopostagem=$4, datapostagem=$5 WHERE idpostagem=$6;', [postagem.idProfissional,
            postagem.categoriaPostagem, postagem.tituloPostagem, postagem.conteudoPostagem,
        postagem.dataPostagem, postagem.idPostagem]);
            response.status(200).send(true);
        } catch (error) {
            console.error(`Erro ao cadastrar uma postagem! Erro: ${error}`);
            response.status(404).send(false);
        }
    }

    async excluirPostagem(request, response) {
        try {
            const idPostagem = parseInt(request.params.idPostagem)
            await this.conexao.query('DELETE FROM postagem WHERE idpostagem = $1;', [idPostagem]);
            response.status(200).send(true);
        } catch (error) {
            console.error(`Erro ao excluir uma postagem! Erro: ${error}`);
            response.status(404).send(false);
        }
    }


}