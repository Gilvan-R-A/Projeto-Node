const ConnectionFactory = require('../util/ConnectionFactory');
const Paciente = require('../model/Paciente');
const Message = require('../util/Message');
module.exports = class PacienteController {

    constructor() {
        try {
            this.conexao = ConnectionFactory.getConnection();
            console.log('Conexão criada com sucesso!!');
        } catch (error) {
            console.log(`Erro ao criar conexão com o banco de dados!! Erro: ${error}`);
        }
    }

    async listarPaciente(request, response) {
        try {
            var resultado = await this.conexao.query('select * from paciente');
            response.status(200).json(resultado.rows);
        } catch (error) {
            console.error(`Erro ao listar as paciente! Erro ${erro}`);
            response.status(404).json(false);
        }
    }

    async listarPacientePorId(request, response) {
        try {
            const idPaciente = parseInt(request.params.idPaciente);
            var resultado = await this.conexao.query('select * from paciente where idpaciente = $1', [idPaciente]);
            response.status(200).json((resultado.rowCount == 0) ? false : resultado.rows);
        } catch (error) {
            console.error(`Erro ao listar um paciente por id! Erro: ${error} `);
            console.status(404).send(false);
        }
    }

    async cadastrarPaciente(request, response) {
        const paciente = new Paciente(null, request.body.nomePaciente,
            request.body.loginPaciente,
            request.body.senhaPaciente,
            request.body.cpfPaciente,
            request.body.telefonePaciente,
            request.body.generoPaciente,
            request.body.logradouro,
            request.body.numero,
            request.body.complemento,
            request.body.referencia,
            request.body.bairro,
            request.body.cep,
            request.body.idCidade);
        console.log(paciente);
        try {
            var resultado = await this.conexao.query('INSERT INTO paciente(nomepaciente, loginpaciente,' +
                ' senhapaciente, cpfpaciente, telefonepaciente, generopaciente, logradouro, numero,' +
                ' complemento, referencia, bairro, cep, idcidade) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,' +
                ' $11, $12, $13);', [paciente.nomePaciente, paciente.loginPaciente, paciente.senhaPaciente,
                paciente.cpfPaciente, paciente.telefonePaciente, paciente.generoPaciente, paciente.logradouro,
                paciente.numero, paciente.complemento, paciente.referencia, paciente.bairro, paciente.cep, paciente.idCidade]);

            console.log(resultado);
            response.status(201).send(true);

        } catch (error) {
            console.error(`Erro ao cadastrar um Paciente! Erro: ${error}`);
            response.status(404).send(false);
        }
    }

    async atualizarPaciente(request, response) {
        try {
            const paciente = new Paciente(request.params.idPaciente,
                request.body.nomePaciente,
                request.body.loginPaciente,
                request.body.senhaPaciente,
                request.body.cpfPaciente,
                request.body.telefonePaciente,
                request.body.generoPaciente,
                request.body.logradouro,
                request.body.numero,
                request.body.complemento,
                request.body.referencia,
                request.body.bairro,
                request.body.cep,
                request.body.idCidade);
            console.log(paciente);
            await this.conexao.query('UPDATE paciente  SET  nomepaciente=$1, loginpaciente=$2,' +
                ' senhapaciente=$3, cpfpaciente=$4, telefonepaciente=$5, generopaciente=$6, logradouro=$7,' +
                ' numero=$8, complemento=$9, referencia=$10, bairro=$11, cep=$12, idcidade=$13  WHERE idpaciente=$14;',
                [paciente.nomePaciente, paciente.loginPaciente, paciente.senhaPaciente, paciente.cpfPaciente,
                paciente.telefonePaciente, paciente.generoPaciente, paciente.logradouro, paciente.numero,
                paciente.complemento, paciente.referencia, paciente.bairro, paciente.cep, paciente.idCidade,
                paciente.idPaciente]);
            response.status(200).send(true);
        } catch (error) {
            console.error(`Erro ao atualizar um paciente! Erro: ${error}`);
            response.status(404).send(false);
        }
    }

    async excluirPaciente(request, response) {
        try {
            const idPaciente = parseInt(request.params.idPaciente)
            await this.conexao.query('DELETE FROM paciente WHERE idpaciente = $1;', [idPaciente]);
            response.status(200).send(true);
        } catch (error) {
            console.error(`Erro ao excluir um paciente! Erro: ${error}`);
            response.status(404).send(false);
        }
    }



    async logarPaciente(request, response) {
        try {
            const loginpaciente = request.body.loginPaciente;
            const senhapaciente = request.body.senhaPaciente;

            const resultado = await this.conexao.query('select * from paciente where loginpaciente = $1 and ' +
                'senhapaciente = $2', [loginpaciente, senhapaciente]);

            if (resultado.rowCount > 0) {
                response.status(200).json(new Message(true, resultado.rows));
            } else {
                response.status(200).json(new Message(false, 'E-mail ou senha incorretos!'))
            }
        } catch (error) {
            console.log(`Problemas no login do paciente no banco de dados! Erro: ${error}`);
            response.status(404).json(new Message(false, 'Erro ao fazer login!!'));
        }
    }


}