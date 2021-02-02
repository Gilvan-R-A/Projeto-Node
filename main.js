const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rotas = require('./util/Rotas')
const app = express();
const porta = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors({origin:"*"}));
app.use(rotas);

app.listen(porta, ()=>{
    console.log(`Servidor rodando no endereço: http://localhost:${porta}/`);
    
})