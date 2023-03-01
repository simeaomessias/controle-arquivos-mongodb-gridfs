# Gerenciamento de download de arquivos armazenados em um banco não relacional

## Objetivo
- Manipulação de arquivos que excedem o limite BSON de 16 MB no MongoDB.
- Aplicação da biblioteca multer.
- Aplicação da biblioteca multer-gridfs-storage.

## Funcionalidades
- **ADMINISTRADOR**<br>
  1. Cadastra usuários e gerencia o status de acesso (ativo e inativo).<br>
  2. Faz upload de documentos e gerencia as condições para download (disponível e não disponível).<br>
  3. Acessa informações sobre os downloads realizados (documentos por usuário e usuários por documento)
     
- **USUÁRIO**<br>
  1. Tem acesso à lista de arquivos cadastrados.
  2. Pode realizar o download de determinado arquivo apenas uma vez.
    
## Tecnologias que serão utilizadas
- HTML5 + CSS3 + JAVASCRIPT
- NODE.JS + MONGODB
- BIBLIOTECAS<br>
  express, express-handlebars, express-session, mongoose, connect-mongo, dotenv, connect-flash, passport, multer, multer-gridfs-storage, bootstrap
- Observações:
  - Foi utilizado o padrão de projeto MVC (Model - View - Controller)
  - O Handlebars foi o template engine para a camada View.<br>
      
## Como acessar
- **Deploy** <br>
  O link será disponibilizado aqui!
- **Para instalar e executar o projeto** <br>
  1. Fazer clone deste repositório. <br>
     `https://github.com/simeaomessias/miniredesocial.git`
  2. Certificar que o npm está instalado. <br>
     O npm pode ser obtido instalando o [Node](https://nodejs.org/en/).
  3. Configurar os valores da seguintes variaveis de ambiente:<br>
     - A lista de variáveis será disponibilizada aqui. <br>
  4. Executar o comando *npm start*. <br>
     Acesse http://localhost:8081 para visualizar no navegador.

## Autor
https://github.com/simeaomessias

