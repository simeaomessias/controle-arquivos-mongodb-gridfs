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
    
## Tecnologias utilizadas
- HTML5 + CSS3 + JAVASCRIPT
- NODE.JS + MONGODB
- BIBLIOTECAS<br>
  express, express-handlebars, express-session, mongoose, connect-mongo, dotenv, connect-flash, passport, multer, multer-gridfs-storage, bootstrap
- Observações:
  - Foi utilizado o padrão de projeto MVC (Model - View - Controller)
  - O Handlebars foi o template engine para a camada View.<br>
      
## Como acessar
- **Deploy** <br>
  O link será disponibilizado aqui! <br>
  Credenciais do Administrador <br>
  *E-mail: admin@admin.com / Senha: admin@admin*
- **Para instalar e executar o projeto** <br>
  1. Fazer clone deste repositório. <br>
     `https://github.com/simeaomessias/controle-arquivos-mongodb-gridfs`
  2. Certificar que o npm está instalado. <br>
     O npm pode ser obtido instalando o [Node](https://nodejs.org/en/).
  3. Configurar os valores da seguintes variaveis de ambiente:<br>
     - KEY: nome do cookie para o express-session. <br>
     - SECRET: chave secreta para o express-session <br>
     - MONGOURI: formato URI da string de conexão do MongoDB <br>
  4. Executar o comando *npm start*. <br>
     Acesse http://localhost:8081 para visualizar no navegador. <br>

## Imagens
![01 - Tela de login](https://user-images.githubusercontent.com/76917508/222044209-a5abec0c-683c-40f6-921b-900172b652e4.jpg)
![03 - Admin - Cadastro de usuários](https://user-images.githubusercontent.com/76917508/222044358-17a96710-3b84-4262-8d0f-95df0c85f15c.jpg)
![06 - Admin - Cadastro de documentos](https://user-images.githubusercontent.com/76917508/222044388-83903427-9af7-4e06-8715-d4af849168c4.jpg)
![07 - Admin - Documentos cadastrados](https://user-images.githubusercontent.com/76917508/222044469-88eee914-86c0-4b49-8b6b-ac32725fe462.jpg)
![08 - Usuário - Documentos para download](https://user-images.githubusercontent.com/76917508/222044484-2d23d1e0-4857-4870-ae4a-6960ef89a15f.jpg)
![09 - Admin - List de usuários por documento](https://user-images.githubusercontent.com/76917508/222044552-626e33cc-2bd2-4b84-b7b9-58b19181c755.jpg)
![09 - Admin - Lista de documentos por usuário](https://user-images.githubusercontent.com/76917508/222044568-67c07281-68e2-43c5-a401-659cb4b14680.jpg)


## Autor
https://github.com/simeaomessias

