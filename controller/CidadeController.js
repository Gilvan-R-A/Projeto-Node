const ConnectionFactory = require('../util/ConnectionFactory');
const Cidade = require('../model/Cidade');
const Message = require('../util/Message');

module.exports = class CidadeController {

    constructor() {
        try {
            this.conexao = ConnectionFactory.getConnection();
            console.log('Conexão criada com sucesso');
        } catch (error) {
            console.log(`Erro ao criar conexão com o banco de dados!! Erro: ${error}`);
        }
    }

    async listarCidade(request, response) {
        try {
            var resultado = await this.conexao.query('select c.idcidade, c.nomecidade,' +
                ' e.siglaestado as ufcidade from cidade c, estado e where c.ufcidade = e.idestado');
            response.status(200).json(new Message(true, resultado.rows));
        } catch (error) {
            console.error(`Erro ao listar as cidades! Erro ${error}`);
            response.status(404).json(new Message(false, 'Erro ao listar cidades no banco de dados'));
        }

    }


    async listarPorNome(request, response) {
        try {
            var nome = request.body.nomecidade;
            var resultado = await this.conexao.query("select c.idcidade, c.nomecidade, e.siglaestado as ufcidade from cidade c, estado e where c.ufcidade = e.idestado and c.nomecidade LIKE $1", [`%${nome}%`]);


            if (resultado.rowCount > 0) {
                response.status(200).json(new Message(true, resultado.rows));
            } else {
                response.status(404).json(new Message(false, `Nenhma cidade encontrada com o nome: ${nome}`));
            }

        } catch (error) {
            console.error(`Erro ao listar as cidades! Erro ${error}`);
            response.status(404).json(new Message(false, 'Erro ao listar as cidades por nome no banco de dados'));
        }
    }

}











