
# Projeto - APPNAME-UI

Orientações gerais de como configurar e executar o Frontend do projeto.

# Configurações e Passos Iniciais do Projeto

## 1. Realize o Build do Projeto

Antes de importar o projeto no VSCode, é recomendável realizar o download das dependências do projeto. Para isso, basta executar o seguinte comando na raiz do módulo:

> npm install

## 2. Abra o Projeto no VSCode

Após realizar o download e instalação das dependências do projeto, na linha de comando, basta executar o seguinte comando na raiz do módulo:

> code .

## 3. Execute o Projeto

No módulo de Frontend do projeto, não existe o conceito de Profile como o encontrado no módulo de Backend do projeto. No entanto, utilizamos os configurations do projeto para simular tal conceito.

No projeto existem 4 configurations:

-   **local**
    -   Utilizado para executar o projeto utilizando recursos disponibilizados em ambiente local
-   **dev**
    -   Utilizado para executar o projeto utilizando recursos disponibilizados em ambiente de desenvolvimento
-   **test**
    -   Utilizado ao executar testes
-   **deploy**
    -   Utilizado na criação da imagem

O Configuration selecionado por padrão é o **dev**. Ou seja, para executar o projeto utilizando este configuration, basta executar o seguinte comando:

> npm start

Caso seja necessário executar utilizando outro Configuration, execute utilizando um dos comandos abaixo:

> npm run start-local
> npm run start-test

Acompanhe a inicialização através do console e caso nenhum erro ocorra a seguinte mensagem deve ser exibida:

>  Angular Live Development Server is listening on localhost: ....

## 4. Verifique se o Projeto está executando corretamente

Para verificar se o frontend iniciou corretamente, basta a seguinte URL através do Browser:

http://localhost:4200/
