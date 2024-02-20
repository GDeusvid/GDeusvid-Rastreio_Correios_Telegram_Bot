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


var validador=0;
var word=[];
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
  word = text.split(" ").map(function(word, index) {
    // Converte apenas a primeira palavra para minúsculas
    if (index === 0) {
        return word.toLowerCase();
    }
    // Mantém as outras palavras como estão
    return word;
  });

  //expense sheet
  var expenseSheet = SpreadsheetApp.openById(ssId).getSheetByName("planilha1");

  //get date
  var nowDate = new Date();
  var month = nowDate.getMonth()+1;
  var date = nowDate.getDate()+'/'+month+'/'+nowDate.getFullYear();

  Logger.log(expenseSheet.getRange(2,1).getValue());
  expenseSheet.getRange(1,8).setValue(id);

validadorcodigo();

  if (word[0]=="add" || word[0] == "Add"){
    if(validador==4){
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
    }else{
      sendMessage(id,'CÓDIGO NÃO PERMITIDO. \n Seu código deve conter [2 letras][9 números][2 letras], no formato: XX123456789XX');
    }
     
  } 

 

  if (word[0]=="list" || word[0] == "List"){
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



  if ((word[0]=="rastreio" || word[0] == "rast" || word[0] == "rt" || word[0] == "Rastreio" || word[0] == "Rt" || word[0] == "Rast") && word[1] != ""){
    if(validador==4){

    
    codigorastreio=word[1];
    var respostacorreios = null;
    while (respostacorreios === null) {
      respostacorreios = rastrear(codigorastreio);
  
    }
    var atualizacao=[];
    var objetosubstatus={};
    for (var i=0; i<respostacorreios.eventos.length;i++){
      
      // atualizacao.push(`atualizacao ${i+1}: data - ${respostacorreios.eventos[i].data}, hora - ${respostacorreios.eventos[i].hora}, local - ${respostacorreios.eventos[i].local}, status - ${respostacorreios.eventos[i].status}, - ${respostacorreios.eventos[i].subStatus}`);
      var evento = respostacorreios.eventos[i];
      var subStatusString = evento.subStatus.map(status => {
                // Remove tags HTML da string usando expressões regulares
                return status.replace(/<[^>]+>/g, '');
                }).join(", ");
      var mensagemAtualizacao = `atualizacao ${i + 1}:\n` +
      `data - ${evento.data},\n` +
      `hora - ${evento.hora},\n` +
      `local - ${evento.local},\n` +
      `status - ${evento.status},\n` +
      `- ${subStatusString}\n`+
      '\n';
      
    objetosubstatus['substatus' + i] = subStatusString;

    atualizacao.push(mensagemAtualizacao);

    }
    
      
     sendMessage(id,'Rastreio: \n'+atualizacao);
    var p=2;
    while (p<500) {
      var buscaEsseCodigo=expenseSheet.getRange(p,1).getValue();
      var modcodigorastreio='`' + codigorastreio + '`';
      
      if (buscaEsseCodigo==modcodigorastreio){
        var dadoderastreio=expenseSheet.getRange(p,3).getValue();
        dadoderastreio=dadoderastreio.split(";");
        if(dadoderastreio.length < atualizacao.length){
          var stringatualizacao=atualizacao.join(";");
          expenseSheet.getRange(p,3).setValue(stringatualizacao);
          Logger.log('o banco de dados foi atualizado');
        } else{
          if (objetosubstatus.substatus0.toString() != ""){
          
          var conteudoatualizacaoTESTE=atualizacao[0].toString();
          conteudoatualizacaoTESTE=conteudoatualizacaoTESTE.replace(/\s/g, "");
          var dadoderastreioTrimmed=dadoderastreio[0].replace(/\s/g, "");

          if (dadoderastreioTrimmed.includes(conteudoatualizacaoTESTE)){
            Logger.log('nao foi atualizado o banco de dados pois ja esta atualizado');
            
                
          } else{
            var stringatualizacao=atualizacao.join(";");
            expenseSheet.getRange(p,3).setValue(stringatualizacao);
            Logger.log('o banco de dados foi atualizado com substatus');
            
          }

          }
            
        }
        
        p=501;
      } 
      p=p+1;
    }
    }else{
      sendMessage(id,'CÓDIGO NÃO PERMITIDO. \n Seu código deve conter [2 letras][9 números][2 letras], no formato: XX123456789XX');
    }
  }
  
  

  if (word[0]=="rmv" || word[0] == "Rmv"){
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

    sendMessage(id,'Suas opções são: \n add [codigo] [descrição] \n list \n rastreio [codigo] ou rt [codigo] \n rmv [codigo]');

  } 
}


// ---------------------------------------------------------------- CODIGO PARA VALIDAR CARACTERES DO RASTREIO

function validadorcodigo(){

const posicoesDivisao = [2, 11];

const resultado = [];


if(1 in word){
    for (let i = 0; i < posicoesDivisao.length; i++) {
  const inicioSubstr = i === 0 ? 0 : posicoesDivisao[i - 1];
  const fimSubstr = posicoesDivisao[i];
  const substring = word[1].substring(inicioSubstr, fimSubstr);
  resultado.push(substring);
}
    const ultimaSubstr = word[1].substring(posicoesDivisao[posicoesDivisao.length - 1]);
resultado.push(ultimaSubstr);

 

if (word[1].split('').length == 13){
    validador++;
    if (/^[a-zA-Z]+$/.test(resultado[0])){
        validador++;
        if(/^[1-9]+$/.test(resultado[1])){
            validador++;
            if(/^[a-zA-Z]+$/.test(resultado[2])){
                validador++;
            }
        }
    }
}

}
console.log(validador);
return validador
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
