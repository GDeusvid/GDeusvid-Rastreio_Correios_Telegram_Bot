// ------------------------------------------------------------ CODIGO PARA MANIPULAR COMANDOS DO TELEGRAM
// Digite o token do seu bot:
var token = "SEU_Token";

var telegramUrl = "https://api.telegram.org/bot" + token;
// Substitua o valor webAppUrl sempre que fizer uma nova implantação:
var webAppUrl = "Seu_link_Implantação";

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendMessage(id, text) {

  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(id),
      text: text,
      parse_mode: "HTML",

    }
  };
  UrlFetchApp.fetch(telegramUrl + '/', data);
}

function sendMessageDois(id, text) {

  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(id),
      text: text,
      parse_mode: "MarkdownV2",

    }
  };
  UrlFetchApp.fetch(telegramUrl + '/', data);
}



var codigorastreio='';
function doPost(e) {
    // Substitua o ssId pelo da sua planilha do google:
  var ssId = "Sua_ssID_da_Planilha";

  //parse user data
  var contents = JSON.parse(e.postData.contents);
  var id = contents.message.from.id;
  var text = contents.message.text;
  var first_name = contents.message.from.first_name;

  //itemmizing the data
  // var word = text.split(" ");
  var word = text.split(" ").map(function(word, index) {
    // Converte apenas a primeira palavra para minúsculas
    if (index === 0) {
        return word.toLowerCase();
    }
    // Mantém as outras palavras como estão
    return word;
  });

  //expense sheet
  // Em getSheetByName coloque o nome da aba da planilha, caso voce nao tenha alterado deixe o padrao "planilha1"
  var expenseSheet = SpreadsheetApp.openById(ssId).getSheetByName("planilha1");

  //get date
  var nowDate = new Date();
  var month = nowDate.getMonth()+1;
  var date = nowDate.getDate()+'/'+month+'/'+nowDate.getFullYear();

  Logger.log(expenseSheet.getRange(2,1).getValue());
  expenseSheet.getRange(1,8).setValue(id);


  if (word[0]=="add"){
    var contador =2;
      while (contador <200) {
        
        if (expenseSheet.getRange(contador,1).getValue() ==''){
          var adicionarcodigo=expenseSheet.getRange(contador,1).setValue('`' + word[1] + '`');
          var adicionardescricao=expenseSheet.getRange(contador,2).setValue('`' + word[2] + '`');
          var adicionarcodigolimpo=expenseSheet.getRange(contador,4).setValue(word[1]);
          contador = 200;
        }
        contador=contador+1;
      }
  
     sendMessage(id,`Código: ${word[1]}, ${word[2]} - adicionado com sucesso!`);
  } 

 

  if (word[0]=="list"){
    var contador =2;
    var codigos=[];
    var descricoes=[];
    
      while (contador <200) {
        
        if (expenseSheet.getRange(contador,1).getValue() !=''){
          codigos.push(expenseSheet.getRange(contador,1).getValue());
          descricoes.push(expenseSheet.getRange(contador,2).getValue());
          contador = contador+1;
          
        } else{
          contador=201;
        }
        
      }
    
    var contadorgeral=0;
    var exibicao=[];
    while (contadorgeral <codigos.length) {
        
        exibicao.push(['\n',`${codigos[contadorgeral]}`, `   ${descricoes[contadorgeral]}`]);
        contadorgeral=contadorgeral+1;
      }

    sendMessageDois(id,exibicao.join());


     
  } 
 


  if ((word[0]=="rastreio" || word[0] == "rast" || word[0] == "rt") && word[1] != ""){
    codigorastreio=word[1];
    var respostacorreios = null;
    while (respostacorreios === null) {
      respostacorreios = rastrear(codigorastreio);
  
    }
    var atualizacao=[];
    for (var i=0; i<respostacorreios.eventos.length;i++){
      
      // atualizacao.push(`atualizacao ${i+1}: data - ${respostacorreios.eventos[i].data}, hora - ${respostacorreios.eventos[i].hora}, local - ${respostacorreios.eventos[i].local}, status - ${respostacorreios.eventos[i].status}, - ${respostacorreios.eventos[i].subStatus}`);
      var evento = respostacorreios.eventos[i];
      var mensagemAtualizacao = `atualizacao ${i + 1}:\n` +
      `data - ${evento.data},\n` +
      `hora - ${evento.hora},\n` +
      `local - ${evento.local},\n` +
      `status - ${evento.status},\n` +
      `- ${evento.subStatus}\n`;

    atualizacao.push(mensagemAtualizacao);

    }
    var atualizacaomod = [];
      atualizacaomod.push(atualizacao);
      atualizacaomod.push("\n by GDeusvid, find in GitHub \n david.dev.go@gmail.com ");
      
     sendMessage(id,'Rastreio: \n'+atualizacaomod);
    var p=2;
    while (p<500) {
      var buscaEsseCodigo=expenseSheet.getRange(p,1).getValue();
      var modcodigorastreio='`' + codigorastreio + '`';
      var stringatualizacao=atualizacao.join(";");
      if (buscaEsseCodigo==modcodigorastreio){
        expenseSheet.getRange(p,3).setValue(stringatualizacao);
        p=501;
      } 
      p=p+1;
    } 
  }
  
  

  if (word[0]=="rmv"){
    var codigoARemover='`' + word[1] + '`';
    
    var i=2;
    while (i<500) {
      var buscaRemover=expenseSheet.getRange(i,1).getValue();
      if (buscaRemover==codigoARemover){
        expenseSheet.deleteRow(i);
        i=501;
      } else{
        i=i+1;
      }
    }
   
     sendMessage(id,`O código ${word[1]} foi deletado com sucesso. Sua nova lista é:`);
          var contador =2;
          var codigos=[];
          var descricoes=[];
    
          while (contador <200) {
        
              if (expenseSheet.getRange(contador,1).getValue() !=''){
                codigos.push(expenseSheet.getRange(contador,1).getValue());
                descricoes.push(expenseSheet.getRange(contador,2).getValue());
                contador = contador+1;
          
              } else{
                  contador=201;
              }
        
          }
    
          var contadorgeral=0;
          var exibicao=[];
          while (contadorgeral <codigos.length) {
        
              exibicao.push(['\n',`${codigos[contadorgeral]}`, `   ${descricoes[contadorgeral]}`]);
              contadorgeral=contadorgeral+1;
          }

    sendMessageDois(id,exibicao.join());

    }
    
     
  




  if (word[0] == "help" || word[0] == "Help") {

    sendMessage(id,'Suas opções são: \n add [codigo] [descrição] \n list \n rastreio [codigo] ou rast [codigo] ou rt [codigo] \n rmv [codigo]');

  } 
}



// ---------------------------------------------------------------- CODIGO PARA API DO RASTREIO
function rastrear(codigorastreio) {
  // Configurações da solicitação HTTP
  
  var options = {
    method: 'GET',
    headers: {}
  };

  // URL da API de rastreamento
  var apiUrl = 'https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo='+codigorastreio;

  try {
    // Fazer a solicitação HTTP usando UrlFetchApp
    var response = UrlFetchApp.fetch(apiUrl, options);

    // Verificar se a solicitação foi bem-sucedida (código de resposta 200)
    if (response.getResponseCode() === 200) {
      // Obter o conteúdo da resposta
      var responseBody = JSON.parse(response.getContentText());
      Logger.log(responseBody);
      // Retorna o responseBody
      return responseBody;
    } else {
      // Se a resposta não foi bem-sucedida, lançar uma exceção
      throw new Error('Falha na solicitação. Código de resposta: ' + response.getResponseCode());
    }
  } 
  catch (error) {
    // Se ocorrer um erro, verificar se é devido a um código 429
    if (error.toString().includes('Too Many Requests')) {
      Logger.log('Too Many Requests. Aguarde um momento e tente novamente.');
      
    } else {
      // Se não for um erro 429, logar o erro
      Logger.log('Erro durante a solicitação HTTP: ' + error);
    }
    
    // Retorna null em caso de erro
    
    return null;
    
  }
  
}
