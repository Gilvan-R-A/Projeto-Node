const ConnectionFactory = require('../util/ConnectionFactory');
const Atendimento = require('../model/Atendimento');

module.exports = class AtendimentoController {

    constructor() {
        try {
            this.conexao = ConnectionFactory.getConnection();
            console.log('Conexão criada com sucesso');
        } catch (error) {
            console.log(`Erro ao criar conexão com o banco de dados!! Erro: ${error}`);
        }
    }

    async listarAtendimento(request, response) {
        try {
            var resultado = await this.conexao.query('select * from atendimento');
            response.status(200).json(resultado.rows);
        } catch (error) {
            console.error(`Erro ao listar as postagens! Erro ${erro}`);
            response.status(404).json(false);
        }
    }

    async listarAtendimentoPorId(request, response) {
        try {
            const idAtendimento = parseInt(request.params.idAtendimento);
            var resultado = await this.conexao.query('select * from atendimento where idatendimento = $1', [idAtendimento]);
            response.status(200).json((resultado.rowCount == 0) ? false : resultado.rows);
        } catch (error) {
            console.error(`Erro ao listar um atendimento por id! Erro: ${error} `);
            console.status(404).send(false);
        }
    }

    async marcarAtendimento(request, response) {
        try {
            const atendimento = new Atendimento(null, request.body.idPaciente,
                request.body.idProfissional,
                request.body.idEspecialidade,
                request.body.tipoAtendimento,
                request.body.dataSolicitacao,
                request.body.dataAtendimento,
                request.body.horaAtendimento,
                request.body.statusAtendimento,
                request.body.avaliacao);
            console.log(atendimento);
            var resultado = await this.conexao.query('INSERT INTO atendimento( idpaciente, idprofissional,' +
                ' idespecialidade, tipoatendimento, datasolicitacao, dataatendimento, horaatendimento,' +
                ' statusatendimento, avaliacao) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9);',
                [atendimento.idPaciente, atendimento.idProfissional, atendimento.idEspecialidade,
                atendimento.tipoAtendimento,atendimento.dataSolicitacao, atendimento.dataAtendimento,
                atendimento.horaAtendimento, atendimento.statusAtendimento, atendimento.avaliacao]);
            console.log(resultado);
            response.status(201).send(true);
        } catch (error) {
            console.error(`Erro ao cadastrar um atendimento! Erro: ${error}`);
            response.status(404).send(false);
        }
    }

    async remarcarAtendimento(request, response) {
        try {
            const atendimento = new Atendimento(request.params.idAtendimento,
                                                request.body.idPaciente,
                                                request.body.idProfissional,
                                                request.body.idEspecialidade,
                                                request.body.tipoAtendimento,
                                                request.body.dataSolicitacao,
                                                request.body.dataAtendimento,
                                                request.body.horaAtendimento,
                                                request.body.statusAtendimento,
                                                request.body.avaliacao);
            console.log(atendimento);
            await this.conexao.query('UPDATE atendimento SET  idpaciente=$1, idprofissional=$2,'+
            ' idespecialidade=$3, tipoatendimento=$4, datasolicitacao=$5, dataatendimento=$6,'+
            ' horaatendimento=$7, statusatendimento=$8, avaliacao=$9 WHERE idatendimento=$10;',
            [atendimento.idPaciente, atendimento.idProfissional, atendimento.idEspecialidade,
            atendimento.tipoAtendimento, atendimento.dataSolicitacao,  atendimento.dataAtendimento,
        atendimento.horaAtendimento, atendimento.statusAtendimento, atendimento.avaliacao, atendimento.idAtendimento]);
            response.status(200).send(true);
        } catch (error) {
            console.error(`Erro ao remarcar um atendimento! Erro: ${error}`);
            response.status(404).send(false);
        }
    }

    async desmarcarAtendimento(request, response) {
        try {
            const idAtendimento = parseInt(request.params.idAtendimento)
            await this.conexao.query('DELETE FROM atendimento WHERE idatendimento = $1;', [idAtendimento]);
            response.status(200).send(true);
        } catch (error) {
            console.error(`Erro ao excluir um atendimento! Erro: ${error}`);
            response.status(404).send(false);
        }
    }


}