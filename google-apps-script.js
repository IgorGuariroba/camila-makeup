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
// 11. No site, adicione no <head> do layout.tsx:
//     <meta name="sheets-url" content="SUA_URL_AQUI" />
//
// Pronto! Os leads serão salvos automaticamente na planilha.
// =============================================================

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

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
