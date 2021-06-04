# Projeto Monitora Industria

Este projeto foi concebido para monitorar setores da industria. Aqui, apresentamos relatório dos seguintes setores:
[Monitora Industrica](https://monitora-industria.vercel.app/)
*   Body (Dashboard)
*   Ativos
*   Usuários
*   Unidades
*   Empresas

## Desenvolvido com: 

Biblioteca de design do React [AntDesign](https://ant.design/docs/spec/introduce) , que permite criar interface de usuário elegante realizando chamadas de componentes pré definidos.

A aplicação está desenvolvida totamente dentro da pasta `./src` e dentro dessa pasta contém:

* `./src/App` - App.tsx, onde está o componente do AntDesign que renderiza o layout base da aplicação (Sidebar, Header, Breadcrumb e Content).
    *   Como ainda não cheguei no ponto de "React route" no meu curso (Ignite - Rocketseat), criei uma função que recebe o estado do botão/menu clicado e faz o switch para renderizar o componente.

* `./src/Body` - está basicamente o dashboard, apenas alguns gráficos para demonstrar visualmente a situação das informações do sistema. Intuito é demonstrar implementação do Highcharts com dados reais (API).

Os demais componentes, está bem semantico, o nome de cada já diz o conteúdo que renderiza.

*   Cada componente possui duas colunas, uma para listagem e outra para renderizar as informações detalhada.
*   Em Usuários, na coluna de detalhes, possui um botão ***Editar*** que ao clicar abre um modal com input já com as informações do item/id clicado.


## Responsividade

Iniciei um trabalho de definição de tamanho(Responsividade) (baseado no AntDesign) dos elementos de acordo com o dispositivo acessado. 

## Como Iniciar projeto local

[1°]    -   Ao baixar o projeto, execute `npm install`.

[2°]    -   Após tudo instalado, pode executar `npm run start` em seu terminal.

