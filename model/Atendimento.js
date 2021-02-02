module.exports = class Atendimento{
    constructor(idAtendimento, idPaciente, idProfissional, idEspecialidade,
        tipoAtendimento,dataSolicitacao, dataAtendimento, horaAtendimento,
        statusAtendimento, avaliacao){
            this.idAtendimento = idAtendimento;
            this.idPaciente = idPaciente;
            this.idProfissional = idProfissional;
            this.idEspecialidade = idEspecialidade;
            this.tipoAtendimento = tipoAtendimento;
            this.dataSolicitacao = dataSolicitacao;
            this.dataAtendimento = dataAtendimento;
            this.horaAtendimento = horaAtendimento;
            this.statusAtendimento = statusAtendimento;
            this.avaliacao = avaliacao;
        }
}