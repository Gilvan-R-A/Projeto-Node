const ConnectionFactory = require('../util/ConnectionFactory');
const Profissional = require('../model/Profissional');
const Message = require('../util/Message');

module.exports = class ProfissionalController {

    constructor() {
        try {
            this.conexao = ConnectionFactory.getConnection();
            console.log('Conexão criada com sucesso!!!');
        } catch (error) {
            console.log(`Erro ao criar conexão com o banco de dados!! Erro: ${error}`);
        }
    }

    async listarProfissional(request, response) {
        try {
            var resultado = await this.conexao.query('select * from profissional');
            response.status(200).json(resultado.rows);
        } catch (error) {
            console.error(`Erro ao listar as postagens! Erro ${erro}`);
            response.status(404).json(false);
        }
    }

    async listarProfissionalPorId(request, response) {
        try {
            const idProfissional = parseInt(request.params.idProfissional);
            var resultado = await this.conexao.query('select * from profissional where idprofissional = $1', [idProfissional]);
            response.status(200).json((resultado.rowCount == 0) ? false : resultado.rows);
        } catch (error) {
            console.error(`Erro ao listar uma postagem por id! Erro: ${error} `);
            console.status(404).send(false);
        }
    }

    async cadastrarProfissional(request, response) {
        const profissional = new Profissional(null, request.body.nomeProfissional,
            request.body.loginProfissional,
            request.body.senhaProfissional,
            request.body.cpfProfissional,
            request.body.telefoneProfissional,
            request.body.generoProfissional,
            request.body.idEspecialidade,
            request.body.conselhoProfissional,
            request.body.numConselho,
            request.body.statusProfissional,
            request.body.logradouro,
            request.body.numero,
            request.body.complemento,
            request.body.referencia,
            request.body.bairro,
            request.body.cep,
            request.body.idCidade);
        console.log(profissional);
        try {
            var resultado = await this.conexao.query('INSERT INTO profissional(nomeprofissional,' +
                ' loginprofissional, senhaprofissional, cpfprofissional, telefoneprofissional,' +
                ' generoprofissional, idespecialidade, conselhoprofissional, numconselho, statusprofissional,' +
                ' logradouro, numero, complemento, referencia, bairro, cep, idcidade)' +
                ' VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);',
                [profissional.nomeProfissional, profissional.loginProfissional, profissional.senhaProfissional,
                profissional.cpfProfissional, profissional.telefoneProfissional, profissional.generoProfissional,
                profissional.idEspecialidade, profissional.conselhoProfissional, profissional.numConselho,
                profissional.statusProfissional, profissional.logradouro, profissional.numero, profissional.complemento,
                profissional.referencia, profissional.bairro, profissional.cep, profissional.idCidade]);
            console.log(resultado);
            response.status(201).send(true);

        } catch (error) {
            console.error(`Erro ao cadastrar um profissional! Erro: ${error}`);
            response.status(404).send(false);
        }
    }

    async atualizarProfissional(request, response) {
        try {
            const profissional = new Profissional(request.params.idProfissional,
                request.body.nomeProfissional,
                request.body.loginProfissional,
                request.body.senhaProfissional,
                request.body.cpfProfissional,
                request.body.telefoneProfissional,
                request.body.generoProfissional,
                request.body.idEspecialidade,
                request.body.conselhoProfissional,
                request.body.numConselho,
                request.body.statusProfissional,
                request.body.logradouro,
                request.body.numero,
                request.body.complemento,
                request.body.referencia,
                request.body.bairro,
                request.body.cep,
                request.body.idCidade);
            console.log(profissional);
            await this.conexao.query('UPDATE profissional SET  nomeprofissional=$1, loginprofissional=$2,' +
                ' senhaprofissional=$3, cpfprofissional=$4, telefoneprofissional=$5, generoprofissional=$6,' +
                ' idespecialidade=$7, conselhoprofissional=$8, numconselho=$9, statusprofissional=$10,' +
                ' logradouro=$11, numero=$12, complemento=$13, referencia=$14, bairro=$15, cep=$16, idcidade=$17' +
                ' WHERE idprofissional=$18;', [profissional.nomeProfissional, profissional.loginProfissional,
                profissional.senhaProfissional, profissional.cpfProfissional, profissional.telefoneProfissional,
                profissional.generoProfissional, profissional.idEspecialidade, profissional.conselhoProfissional,
                profissional.numConselho, profissional.statusProfissional, profissional.logradouro, profissional.numero,
                profissional.complemento, profissional.referencia, profissional.bairro,
                 profissional.cep, profissional.idCidade, profissional.idProfissional]);
            response.status(200).send(true);
        } catch (error) {
            console.error(`Erro ao atualizar um profissional! Erro: ${error}`);
            response.status(404).send(false);
        }
    }

    async excluirProfissional(request, response) {
        try {
            const idProfissional = parseInt(request.params.idProfissional)
            await this.conexao.query('DELETE FROM profissional WHERE idprofissional = $1;', [idProfissional]);
            response.status(200).send(true);
        } catch (error) {
            console.error(`Erro ao excluir um profissional! Erro: ${error}`);
            response.status(404).send(false);
        }
    }

    async logarProfissional(request, response) {
        try {
            const loginprofissional = request.body.loginProfissional;
            const senhaprofissional = request.body.senhaProfissional;

            const resultado = await this.conexao.query('select * from profissional where loginprofissional = $1 ' +
                'and senhaProfissional = $2', [loginprofissional, senhaprofissional]);

            if (resultado.rowCount > 0) {
                response.status(200).json(new Message(true, resultado.rows));
            } else {
                response.status(200).json(new Message(false, 'E-mail ou senha incorretos!!'));
            }
        } catch (error) {
            console.log(`Problemas no login do profissional no banco de dados! Erro: ${error}`);
            response.status(404).json(new Message(false, 'Erro ao fazer login'));
        }
    }


}