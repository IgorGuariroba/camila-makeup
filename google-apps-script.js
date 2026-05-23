// =============================================================
// INSTRUÇÕES DE CONFIGURAÇÃO — Google Apps Script
// =============================================================
//
// 1. Abra o Google Sheets: https://sheets.google.com
// 2. Crie uma nova planilha chamada "Leads Camila Makeup"
// 3. Na primeira linha, coloque os cabeçalhos:
//    A1: Data/Hora | B1: Nome | C1: Telefone | D1: Serviço | E1: Data Desejada | F1: Observações
// 4. Vá em Extensões > Apps Script
// 5. Apague o conteúdo e cole este código abaixo
// 6. Clique em "Implantar" > "Nova implantação"
// 7. Tipo: "App da Web"
// 8. Executar como: "Eu"
// 9. Quem tem acesso: "Qualquer pessoa"
// 10. Copie a URL gerada
// 11. Cole a URL no arquivo .env.local do projeto:
//     GOOGLE_SHEETS_URL=https://script.google.com/macros/s/SEU_ID/exec
//
// Pronto! Os leads serão salvos automaticamente na planilha
// e uma notificação será enviada por email.
// =============================================================

var EMAIL_NOTIFICACAO = "camilamakeupbr@gmail.com";

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.nome || "",
    data.telefone || "",
    data.servico || "",
    data.data || "",
    data.observacoes || "",
  ]);

  enviarNotificacao(data);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function enviarNotificacao(data) {
  var assunto = "💄 Novo Lead — " + (data.nome || "Sem nome");
  var corpo =
    "Novo contato recebido!\n\n" +
    "Nome: " + (data.nome || "-") + "\n" +
    "Telefone: " + (data.telefone || "-") + "\n" +
    "Serviço: " + (data.servico || "-") + "\n" +
    "Data desejada: " + (data.data || "-") + "\n" +
    "Observações: " + (data.observacoes || "-") + "\n\n" +
    "Responda o mais rápido possível! 🚀";

  MailApp.sendEmail(EMAIL_NOTIFICACAO, assunto, corpo);
}
