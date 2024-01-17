# Rastreio de encomendas dos Correios do Brasil
## _Telegram Bot_
![gif engraçado buscando](https://media.giphy.com/media/njYiRJVemOny8bHJNt/giphy.gif)

### Etapa 1 - Planilha Google
- Crie uma planilha google, renomeie como quiser por exemplo “teste_rastreio”, na primeira linha digite os textos conforme a imagem:
 ![1](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/1%20planilha%20inicial.png?raw=true)
- Na planilha clique em extensões e em seguida em AppScript. Se não funcionar, tente usando o Google Chrome.
- Uma nova aba será aberta no AppScript. Dê o nome que quiser ao projeto. E apague a function inicial.
  ![2](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/2%20app%20scirpt%20inicial.png?raw=true)
- Abra o Rastreio_Base.gs nos arquivos do github, copie o código e cole no AppScript.
- Alguns valores do código precisam ser modificados, iremos modificar o primeiro deles, altere o ssID para o da sua planilha.
 
![3](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/3%20codigo%20mod.png?raw=true)
- O ssID da planilha é encontrado no seu próprio link. Observe a imagem anterior da planilha, neste exemplo o ssID é 1K-BS5WjQbTTyehh6LK9S4dqkafZ0GEVG2rZCaUj_oPY


 ### Etapa 2 - Criando um bot Telegram
- Pesquise no Telegram por bot father
  
![4](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/4%20bot%20telegram%201.png?raw=true)
  
- Inicie a conversa. Digite: /newbot
- Dê um nome ao bot, por exemplo: testando_rastreio
- Dê um username ao bot, por exemplo: test_rast_bot
- Anote o token do seu bot que o BotFather forneceu.
- Seu bot está criado e é possível localizá-lo pesquisando no telegram pelo seu username. Você já pode pesquisar e dar start para iniciar a conversa.





### Etapa 3 - Voltando ao AppScript
 - Substitua o token, pelo token do seu bot
 
  ![5](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/5%20codigo%20token%20mod.png?raw=true)

- Execute seu código na função setWebhook

![6](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/6%20executando%20codigo.png?raw=true)

- Se obtiver o resultado abaixo, o código está funcionando.

 ![7](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/6%20resultado%20codigo%201.png?raw=true)

- Agora vamos fazer a primeira implantação do código.
- Clique em implantar > Nova Implantação.
- Selecione o tipo clicando na engrenagem. Selecione o tipo App da Web.
- Dê a descrição que quiser. Verifique se o e-mail está correto. Em quem pode acessar, selecione qualquer pessoa.
- Clique em implantar.
- Provavelmente vai pedir para autorizar, pois envolve interações com APIs externas, como o Telegram API para usar um bot. Pode autorizar o que for solicitado.
- Você receberá a seguinte mensagem:
 ![8](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/7%20resultado%20de%20implanta%C3%A7ao.png?raw=true)
- Copie o URL, clique em concluído.
- Substitua o valor de webAppUrl pelo url que você copiou. Faça isso SEMPRE que fizer uma nova implantação.
 ![9](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/8%20codigo%20mod%202.png?raw=true)

- Execute novamente seu código na função setWebhook.
- Se obtiver o mesmo resultado, está tudo ok.
 ![7](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/6%20resultado%20codigo%201.png?raw=true)

 ### Etapa 4 - Hora de testar
- No seu bot do telegram, digite: help
- Você deve receber a seguinte mensagem:

![10](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/9%20teste%201.png?raw=true)
- Se não funcionar revise as etapas anteriores ou reinicie o processo, pois a partir dessa etapa já deve estar funcionando.
- Caso revise, refaça e não funcione me envie uma mensagem ou deixe algum comentário.

 ### Etapa 5 - Tutorial
- O comando help irá informar o que você pode fazer com o bot.

| Funções | Comandos | Observações |
| ------ | ------ | ------ |
| Adicionar | add NB999664860BR roupa_da_shein | Tenha certeza que o código é rastreável pelos Correios.<br> Se não for, o bot pode “quebrar”. <br> A descrição deve ser uma palavra única, por exemplo: computador_gamer_novo |
| Listar | list | Irá listar todos os seus códigos cadastrados.<br> A lista é formatada para que ao clicar no código, o texto seja copiado.|
| Rastrear | rastreio NB999664860BR <br> rast NB999664860BR <br> rt NB999664860BR| Qualquer uma das 3 opções irá rastrear a encomenda. |
| Remover | rmv NB999664860BR | Irá remover o código de sua lista. |

 ### Etapa 6 - Boas práticas
- Tenha certeza que o código é rastreável pelos Correios antes de adicionar ou rastrear.
- Utilize uma única palavra para a descrição.
- Tome cuidado ao rastrear, se enviar um código que não existe ou enviar vazio, o bot pode “quebrar”.
- Tome cuidado ao remover, remova apenas um código que esteja na lista.
- Sempre que receber a encomenda e finalizar o rastreio, remova o código. Mantenha no máximo de 10 a 12 códigos por bot.

OBS:
> O seu bot já está funcional. Porém, ainda não checa por atualizações automaticamente. <br>
> Se você deseja que faça verificações siga para a etapa 7.

### Etapa 7 - Checar atualizações automaticamente(opcional)
- Vá para a página inicial do seu AppScript. Lá você verá a lista de projetos.
- Crie um novo projeto. Renomeie como quiser, por exemplo Rastreio_atualizações.
- Apague a function padrão.
- Abra no github o arquivo Rastreio_Check.gs e copie o código.
- Cole o código no AppScript.
- Você precisa substituir novamente alguns itens. O primeiro é o id do seu telegram.
  ![11](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/10%20check%20mod%201.png?raw=true)
- Não se preocupe, já deixei o código pronto para isso. Se as etapas anteriores deram certo, na sua planilha na célula H1, talvez você já tenha notado, existe um número. É o id.
- Substitua o número. O id no AppScript deve estar como número e não como string, não use aspas.
- Substitua o ssID da sua planilha. Deve ser a mesma planilha das etapas anteriores.
 ![12](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/10%20check%20mod%202.png?raw=true)
- Substitua também o token, o mesmo do seu bot da etapa anterior.
 ![13](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/10%20check%20mod%203.png?raw=true)
- Salve e faça uma nova implantação da mesma forma da etapa anterior. Implante como App da Web e deixe para qualquer pessoa. Conceda autorização solicitada e copie o URL. Em seguida cole substituindo o Seu_link_Implantação.
- Verifique a lista de códigos de rastreio, para testar recomendo que deixe apenas 1 item na lista. Faça um rastreio manual pelo bot do telegram antes de executar o item a seguir.
- Execute a função RastrearEEnviarMensagem.
  
 ![14](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/10%203%20executar.png?raw=true)
- Irá aparecer várias mensagens de: “ Too Many Requests. Aguarde um momento e tente novamente.” É normal.
- Em algum momento o código irá parar.
  
 ![15](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/11%20executar.png?raw=true)

- Se o código não parar, ou der algum erro que a Execução não seja concluída, verifique as etapas anteriores, refaça. Caso não funcione tente entrar em contato ou deixar um comentário.
- Se tudo funcionou, agora só precisamos criar um acionador baseado no tempo.
- Clique no “reloginho”, acionadores, do lado esquerdo no AppScript. Em seguida clique em adicionar acionador.
 ![16](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/12%20timer.png?raw=true)

- Na nova janela selecione a função rastrearEEnviarMensagem
- Escolha a implantação mais recente. Obs: sempre que realizar uma nova implantação você deve apagar esse acionador e criar um novo para a nova implantação.
- Selecione: baseado no tempo.
- Selecione de quanto em quanto tempo quer realizar a verificação.
- Recomendo nunca utilizar um intervalo menor que 2h. (Explicarei ao final).
- A notificação de falha fica a seu critério, utilizo a opção a cada dia.
- Clique em salvar. E está pronto.
 
 ![17](https://github.com/GDeusvid/GDeusvid-Rastreio_Correios_Telegram_Bot/blob/main/images/12%20timer%202.png?raw=true)

- Pronto, seu bot está completo!

  <img src="https://pbs.twimg.com/media/GECwaNJXsAExiDY?format=png&name=small" width="220"> 
## Importante
### Por que as limitações de quantidade e intervalo?
- Não é interessante ter muitos códigos na lista, nem fazer buscas com intervalos curtos, pois existe um limite de fetch do AppScript. A API utilizada para fazer o rastreio é bastante limitada e não funciona a todo momento. Isso é contornado pois o código faz várias tentativas até que encontre um resultado de rastreio. Sendo assim, realiza dezenas ou centenas de fetchs para realizar um rastreio.
- Se você tiver muitos códigos e realizar rastreios em intervalos curtos, o limite diário de fetch do Google pode esgotar.
- Um valor seguro é utilizar de 10 a 12 códigos simultâneos e deixar a busca automática com um intervalo de 2h. São valores razoáveis e suficientes, garantindo a funcionalidade.

### Planilha mal formatada?
- Não se preocupe com a formatação da planilha. Quando começa a rastrear, como as mensagens são grandes, a formatação fica esquisita/feia.
- Isso não importa para o bot. O importante é tudo estar dentro de cada célula para que o código no AppScript encontre tudo no devido lugar.

### Funcionamento resumido
- Quando um código é adicionado, tanto o código quanto a descrição são salvos na sua planilha.
- Sempre que você rastreia manualmente, além de receber uma mensagem no telegram, ficará registrado o último rastreio na planilha.
- A cada 2 horas, o AppScript irá acionar a função de fazer uma busca por todos os seus rastreios da lista e verificar se houve uma mudança desde o último rastreio. Se houver, irá lhe enviar o rastreio no telegram.

### Sobre e pedidos
> Sempre tive problemas com apps de rastreio que nunca atualizavam, eram cheios de propaganda. Até que descobri um bot no telegram para isso, que recentemente foi desativado, talvez você também o utilizava. <br>
> A partir dessa necessidade resolvi tentar fazer meu próprio bot, sem utilizar a API oficial dos Correios, que exige cadastro por CNPJ. <br>
> Sou um desenvolvedor júnior em busca da minha primeira oportunidade, criando meu portfólio. Então, esse seria um excelente desafio! <br>
> Diante de minhas limitações e buscando formas simples, consegui realizar esse bot utilizando o AppScript. <br>
> Acredito que seguindo as orientações aqui presentes, qualquer um pode montar seu próprio bot de rastreio dos correios no telegram.

> Se sintam livres para melhorar o código ou utilizá-lo diretamente. Meu pedido é que dêem o crédito, para que meu trabalho possa ser visto e reconhecido.
> Estou disponível para qualquer informação ou suporte.

![gif keanu agradecendo](https://media.giphy.com/media/fWfowxJtHySJ0SGCgN/giphy.gif)

## License

MIT

**David Gonçalves, Web Developer - 2024**
