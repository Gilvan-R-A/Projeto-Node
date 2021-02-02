module.exports = class Paciente{
    constructor(idPaciente, nomePaciente, loginPaciente, senhaPaciente, cpfPaciente,
        telefonePaciente, generoPaciente, logradouro, numero, complemento,
        referencia, bairro, cep, idCidade){
            this.idPaciente = idPaciente;
            this.nomePaciente = nomePaciente;
            this.loginPaciente = loginPaciente;
            this.senhaPaciente = senhaPaciente;
            this.cpfPaciente = cpfPaciente;
            this.telefonePaciente = telefonePaciente;
            this.generoPaciente = generoPaciente;
            this.logradouro = logradouro;
            this.numero = numero;
            this.complemento = complemento;
            this.referencia = referencia;
            this.bairro = bairro;
            this.cep = cep;
            this.idCidade = idCidade;
        }
}