function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem("Search for Words...", "openSearch")
      .addToUi();
}

function openSearch() {
  DocumentApp.getUi().showModalDialog(HtmlService.createHtmlOutputFromFile("Main").setWidth(350)
      .setHeight(150), "Search for Words");
}

function onSearch(wordList) {
  var body = DocumentApp.getActiveDocument().getBody();
  PropertiesService.getUserProperties().setProperty("wordlist", wordList);
    
  var pattern = "(?i)" + wordList.replace(/,/g, "|");
  
  highlight_(body, pattern);
}

function getLast() {
  return PropertiesService.getUserProperties().getProperty("wordlist");
}

function highlight_(body, pattern) {
  var result;
  
  while(true) {
    if (result) {
      result = body.findText(pattern, result);
    } else {
      result = body.findText(pattern);
    }
    
    if (!result) break;
    
    result.getElement().asText().setBackgroundColor(result.getStartOffset(), result.getEndOffsetInclusive(), "#FFFF00");
  }
}
