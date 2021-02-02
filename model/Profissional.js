module.exports = class Profissional{
    constructor(idProfissional, nomeProfissional, loginProfissional,senhaProfissional,
        cpfProfissional, telefoneProfissional, generoProfissional, idEspecialidade,
        conselhoProfissional, numConselho, statusProfissional, logradouro,
        numero, complemento, referencia, bairro, cep, idCidade){
            this.idProfissional = idProfissional;
            this.nomeProfissional = nomeProfissional;
            this.loginProfissional = loginProfissional;
            this.senhaProfissional = senhaProfissional;
            this.cpfProfissional = cpfProfissional;
            this.telefoneProfissional = telefoneProfissional;
            this.generoProfissional = generoProfissional;
            this.idEspecialidade = idEspecialidade;
            this.conselhoProfissional = conselhoProfissional;
            this.numConselho = numConselho;
            this.statusProfissional = statusProfissional;
            this.logradouro = logradouro;
            this.numero = numero;
            this.complemento = complemento;
            this.referencia = referencia;
            this.bairro = bairro;
            this.cep = cep;
            this.idCidade = idCidade;
        }
}