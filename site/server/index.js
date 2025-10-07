const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const banco = mysql2.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "1234",
    database : "sistema"
});

banco.connect( (erro) =>{

    if(erro)
    {
        console.log("Erro ao conectar ao MySQL: ");
        console.log(erro);
    }
    else
    {
        console.log("Conectado ao MySQL com sucesso!");
    }
});

app.listen(PORT, () => {
    console.log("Servidor rodando em http://localhost:" + PORT);
});