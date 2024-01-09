// ---------------------------------------------------------------- CODIGO PARA EXECUTAR A CADA TEMPO
function rastrearEEnviarMensagem() {
    // substitua o numero do id pelo do seu Telegram
  var id=000000;
  // Obter os códigos de rastreio da planilha
  // Substitua o ssId pelo da sua planilha do google:
  var ssId = "Sua_ssID_da_Planilha";
  // Em getSheetByName coloque o nome da aba da planilha, caso voce nao tenha alterado deixe o padrao "planilha1"
  var expenseSheet = SpreadsheetApp.openById(ssId).getSheetByName("planilha1");
  var codigosRastreio = [];
  var descricaoRastreio = [];
  for (var i = 2; i < 200; i++) {
    var codigoRastreio = expenseSheet.getRange(i, 4).getValue();
    
    if (codigoRastreio != "") {
      codigosRastreio.push(codigoRastreio);
      descricaoRastreio.push(expenseSheet.getRange(i, 2).getValue());
    }
  }
  
  // Fazer a pesquisa de rastreamento
  var respostasRastreio = codigosRastreio.map(function(codigoRastreio) {
    
    var respostacorreios = null;
    while (respostacorreios === null) {
      respostacorreios = rastrear(codigoRastreio);
  
    }
    return respostacorreios;
  });
  
 
  
  

  // Verificar dados de rastreio da tabela
  for (var j = 0; j < respostasRastreio.length; j++){
    var dadoderastreio=expenseSheet.getRange(j+2, 3).getValue();
    dadoderastreio=dadoderastreio.split(";");
    
    var respostaRastreio = JSON.stringify(respostasRastreio[j]);
    respostaRastreio =JSON.parse(respostaRastreio);
    
    
    
    

    if (dadoderastreio.length < respostaRastreio.eventos.length){
      var atualizacao=[];
      for (var i=0; i<respostaRastreio.eventos.length;i++){
      
      var evento = respostaRastreio.eventos[i];
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
      
      sendMessage(id,`Rastreio: ${descricaoRastreio[j]} \n`+atualizacaomod);

        var stringatualizacao=atualizacao.join(";");
        
        expenseSheet.getRange(j+2,3).setValue(stringatualizacao);
        
      } else{
        Logger.log('sem atualizações');
        
        
      }
      
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

// ---------------------------------------------------------------- SEND MESSAGE
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