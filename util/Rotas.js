const controladorRotas = require('express').Router();
const PostagemController = require('../controller/PostagemController');
const AtendimentoController = require('../controller/AtendimentoController');
const CidadeController = require('../controller/CidadeController');
const ProfissionalController = require('../controller/ProfissionalController');
const PacienteController = require('../controller/PacienteController');
const EspecialidadeController = require('../controller/EspecialidadeController');
const {request, response} = require('express');


//Rotas de acesso a postagem
controladorRotas.get('/postagem', (request, response) =>{
    new PostagemController().listarPostagem(request, response);
});

controladorRotas.get('/postagem/:idPostagem', (request, response) =>{
    new PostagemController().listarPostagemPorId(request, response);
});

controladorRotas.post('/postagem', (request, response)=>{
    new PostagemController().cadastrarPostagem(request, response);
});

controladorRotas.put('/postagem/:idPostagem', (request, response)=>{
    new PostagemController().alterarPostagem(request, response);
});

controladorRotas.delete('/postagem/:idPostagem', (request, response)=>{
    new PostagemController().excluirPostagem(request, response);
});


//Rotas de acesso a paciente

controladorRotas.get('/paciente', (request, response)=>{
    new PacienteController().listarPaciente(request, response);
});

controladorRotas.get('/paciente/:idPaciente', (request, response)=>{
    new PacienteController().listarPacientePorId(request, response);
});

controladorRotas.post('/paciente', (request, response)=>{
    new PacienteController().cadastrarPaciente(request, response);
});

controladorRotas.put('/paciente/:idPaciente', (request, response)=>{
    new PacienteController().atualizarPaciente(request, response);
});

controladorRotas.delete('/paciente/:idPaciente', (request, response)=>{
    new PacienteController().excluirPaciente(request, response);
});

controladorRotas.post('/pacienteLogin', (request, response)=>{
    new PacienteController().logarPaciente(request, response);
});


//Rotas de acesso a profissional

controladorRotas.get('/profissional', (request, response)=>{
    new ProfissionalController().listarProfissional(request, response);
});

controladorRotas.get('/profissional/:idProfissional', (request, response)=>{
    new ProfissionalController().listarProfissionalPorId(request, response);
});

controladorRotas.post('/profissional', (request, response)=>{
    new ProfissionalController().cadastrarProfissional(request, response);
});

controladorRotas.put('/profissional/:idProfissional', (request, response)=>{
    new ProfissionalController().atualizarProfissional(request, response);
});

controladorRotas.delete('/profissional/:idProfissional', (request, response)=>{
    new ProfissionalController().excluirProfissional(request, response);
});

controladorRotas.post('/profissionalLogin', (request, response)=>{
    new ProfissionalController().logarProfissional(request, response);
});

//Rotas de acesso a cidade

controladorRotas.get('/cidade', (request, response)=>{
    new CidadeController().listarCidade(request, response);
});

controladorRotas.post('/cidadepornome', (request, response)=>{
    new CidadeController().listarPorNome(request, response);
})


//Rotas de acesso a atendimento
controladorRotas.get('/atendimento', (request, response)=>{
    new AtendimentoController().listarAtendimento(request, response);
});

controladorRotas.get('/atendimento/:idAtendimento', (request, response)=>{
    new AtendimentoController().listarAtendimentoPorId(request, response);
});

controladorRotas.post('/atendimento', (request, response)=>{
    new AtendimentoController().marcarAtendimento(request, response);
});

controladorRotas.put('/atendimento/:idAtendimento', (request, response)=>{
    new AtendimentoController().remarcarAtendimento(request, response);
});

controladorRotas.delete('/atendimento/:idAtendimento', (request, response)=>{
    new AtendimentoController().desmarcarAtendimento(request, response);
});


//rotas de acesso a especialidade
controladorRotas.get('/especialidade', (request, response)=>{
    new EspecialidadeController().listarEspecialidade(request, response);
});

controladorRotas.get('/especialidade/:idEspecialidade', (request, response)=>{
    new EspecialidadeController().listarEspecialidadePorId(request, response);
});

controladorRotas.post('/especialidade', (request, response)=>{
    new EspecialidadeController().cadastrarEspecialidade(request, response);
});

controladorRotas.put('/especialidade/:idEspecialidade', (request, response)=>{
    new EspecialidadeController().atualizarEspecialidade(request, response);
});

controladorRotas.delete('/especialidade/:idEspecialidade', (request, response)=>{
    new EspecialidadeController().excluirEspecialidade(request, response);
})


module.exports = controladorRotas;


