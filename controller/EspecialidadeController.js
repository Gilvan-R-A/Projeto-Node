const ConnectionFactory = require('../util/ConnectionFactory');
const Especialidade = require('../model/Especialidade');

module.exports = class EspecialidadeController {
    constructor() {
try {
    this.conexao = ConnectionFactory.getConnection();
    console.log('Conexão criada com sucesso');
} catch (error) {
    console.log(`Erro ao criar conexão com o banco de dados!! Erro: ${error}`);
}   
    }

    async listarEspecialidade(request, response) {
        try {
            var resultado = await this.conexao.query('select * from especialidade');
            response.status(200).json(resultado.rows);
        } catch (error) {
            console.error(`Erro ao listar as especialidades! Erro ${erro}`);
            response.status(404).json(false);
        }
    }

    async listarEspecialidadePorId(request, response) {
        try {
            const idEspecialidade = parseInt(request.params.idEspecialidade);
            var resultado = await this.conexao.query('select * from especialidade where idespecialidade = $1', [idEspecialidade]);
            response.status(200).json((resultado.rowCount == 0) ? false : resultado.rows);
        } catch (error) {
            console.error(`Erro ao listar uma especialidade por id! Erro: ${error} `);
            console.status(404).send(false);
        }
    }

    async cadastrarEspecialidade(request, response) {
        try {
            const especialidade = new Especialidade(null, request.body.nomeEspecialidade,
                request.body.categoriaEspecialidade);
            console.log(postagem);
            var resultado = await this.conexao.query('INSERT INTO especialidade( nomeespecialidade,'+
            ' categoriaespecialidade) VALUES ( $1, $2);')
            console.log(resultado);
            response.status(201).send(true);

        } catch (error) {
            console.error(`Erro ao cadastrar uma postagem! Erro: ${error}`);
            response.status(404).send(false);
        }
    }

    async atualizarEspecialidade(request, response) {
        try {
            const especialidade = new Especialidade(request.params.idEspecialidade,
                request.body.nomeEspecialidade, request.body.categoriaEspecialidade);
            console.log(especialidade);
            await this.conexao.query('UPDATE especialidade SET  nomeespecialidade=$1,'+
            ' categoriaespecialidade=$2  WHERE idespecialidade=$3;', [especialidade.nomeEspecialidade,
            request.categoriaEspecialidade. especialidade.idEspecialidade]);
            response.status(200).send(true);
        } catch (error) {
            console.error(`Erro ao cadastrar uma postagem! Erro: ${error}`);
            response.status(404).send(false);
        }
    }

    async excluirEspecialidade(request, response) {
        try {
            const idEspecialidade = parseInt(request.params.idEspecialidade)
            await this.conexao.query('DELETE FROM especialidade WHERE idespecialidade = $1;', [idEspecialidade]);
            response.status(200).send(true);
        } catch (error) {
            console.error(`Erro ao excluir uma especialidade! Erro: ${error}`);
            response.status(404).send(false);
        }
    }

}
