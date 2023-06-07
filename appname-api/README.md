
# Projeto - APPNAME-API

Orientações gerais de como configurar e executar o Backend do projeto.

# Configurações e Passos Iniciais do Projeto

## 1. Realize o Build do Projeto

Antes de importar o projeto no STS, é recomendável realizar o build do projeto. Para isso, basta executar o seguinte comando na raiz do módulo:

> mvn clean package -DskipTests=true

## 2. Importe o Projeto no Spring Tool Suite (STS)

Após realizar o primeiro build do projeto, basta abrir o STS, em _File > Import... > Maven > Existing Maven Projects_, selecionar a pasta appname-api do projeto e clicar em _Finish_

## 3. Selecione o Profile do Projeto

O Profile Maven do Projeto define um conjunto de valores pré-definidos para as configurações do projeto, tais como: URL do banco de dados, URLs dos serviços de integração, nível de log e etc.

No projeto existem 4 profiles:

- **local**
  - Utilizado para executar o projeto utilizando recursos disponibilizados em ambiente local
- **desenv**
  - Utilizado para executar o projeto utilizando recursos disponibilizados em ambiente de desenvolvimento
- **test**
  - Utilizado ao executar testes
- **deploy**
  - Utilizado na criação da imagem

O Profile selecionado por padrão é o **desenv**. Caso seja necessário selecionar outro Profile, no STS, _clique com o botão direito do mouse sob projeto > Maven > Select Maven Profiles..._

## 4. Execute o Projeto através do Boot Dashboard

Após realizar os passos anteriores, já é possível executar o projeto. Para isso, basta selecioná-lo na view Boot Dashboard e clicar no Start/Stop.

Acompanhe a inicialização através do console e caso nenhum erro ocorra a seguinte mensagem deve ser exibida:

> .... Started AppNameApiApplication in xxxxx seconds ....

## 5. Verifique se o Projeto está executando corretamente

Uma das maneiras para verificar se o backend do projeto iniciou corretamente é utilizando o Swagger. Para acessá-lo para acessar a seguinte URL através do Browser:

http://localhost:8080/appname-api/swagger-ui/
