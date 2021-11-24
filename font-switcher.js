// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: pencil-alt;
// share-sheet-inputs: plain-text;

//The prase to appear in the widgets
let phrase = "The quick brown fox jumps over the lazy dog"

//Order of fonts to appear in the widgets and when selecting a font. See table below if switching order of fonts
const fontOrder = ["SS","SSB","SSI","SSBI","SFB","SFI","SFBI","TW","SC","SCB","FW","FT","FTB","UD","SQ","SQF","SL","PT","HK","ST","US","OT","SR","HT","LT","AW","UA","SB","SP"]
/*
SS   -> 𝖲𝖺𝗇𝗌             Numbers
SSB  -> 𝗦𝗮𝗻𝘀             Bold, Numbers
SSI  -> 𝘚𝘢𝘯𝘴             Italic
SSBI -> 𝙎𝙖𝙣𝙨             Bold, Italic
SFB  -> 𝐒𝐞𝐫𝐢𝐟             Bold, Numbers
SFI  -> 𝑆𝑒𝑟𝑖𝑓            Italic
SSBI -> 𝑺𝒆𝒓𝒊𝒇            Bold, Italic
TW   -> 𝚃𝚢𝚙𝚎𝚠𝚛𝚒𝚝𝚎𝚛        Numbers
SC   -> 𝒮𝒸𝓇𝒾𝓅𝓉
SCB  -> 𝓢𝓬𝓻𝓲𝓹𝓽         Bold
FW   -> Ｆｕｌｌｗｉｄｔｈ Numbers
FT   -> 𝔉𝔯𝔞𝔨𝔱𝔲𝔯
FTB  -> 𝕱𝖗𝖆𝖐𝖙𝖚𝖗          Bold
UD   -> ndsıdǝ doʍn      Lowercase
SQ   -> 🅂🅀🅄🄰🅁🄴🅂     Uppercase
SQF  -> 🆂🆀🆄🅰︎🆁🅴🆂     Uppercase, Filled
SL   -> 🅒🅘🅡🅒🅛🅔🅢     Numbers
PT   -> ⒫⒜⒭⒠⒩⒯⒣⒠⒮  Lowercase, Numbers not 0


HK   -> H̵͓̣̯̪̩̞̽͒̑̂͌̓̏̉͘͠ā̶̧̡̻̯͍̝̞͋̓͆̏̉͌c̷̫͓͕̘̯̔́̇̿͑̓̚k̶̢̛̙͖̳̝̘̫̯̼̟̉͋͌ē̶̡͍̰͖̜͇̬̖̣̯̿̃̑͆͠r̸͖͍͙͇̙̒̑̈́̈̏̅͘͘         Numbers


ST   -> S̶T̶R̶I̶K̶E̶ T̶H̶R̶O̶U̶G̶H̶ Uppercase, Numbers
US   -> U̲N̲D̲E̲R̲S̲C̲O̲R̲E̲      Uppercase, Numbers
OT   -> O͞V͞E͞R͞T͞O͞P͞         Uppercase, Numbers
SR   -> S͙T͙A͙R͙            Uppercase, Numbers
HT   -> H̾o̾t̾             Uppercase, Numbers
LT   -> L͛I͛G͛H͛T͛N͛I͛N͛G͛       Uppercase, Numbers
AW   -> Â̬R̬̂R̬̂Ô̬Ŵ̬           Uppercase, Numbers
UA   -> U͎P͎ A͎R͎R͎O͎W͎        Uppercase, Numbers
SB   -> Subscript       Numbers Only
SP   -> Superscript     Numbers Only
*/


if(config.runsInWidget){
  //Run in widget
  let widget
  if(config.widgetFamily == "small") {
    //Widget
    widget = new ListWidget()
    let date = new Date()
    date.setMinutes(date.getMinutes() + 20)
    widget.refreshAfterDate = date
    widget.backgroundColor = new Color("#000")
    widget.url = URLScheme.forRunningScript()
    //Add top
    addTop(widget)
    //Other text
    let text = widget.addText(fontSwitch(args.widgetParameter?args.widgetParameter:phrase, fontOrder[Math.floor(Math.random()*fontOrder.length)]))
    text.textColor = new Color("#fff",1)
    text.minimumScaleFactor = 0.5
    
  } else if(config.widgetFamily == "medium" || config.widgetFamily == "large") {
    fontNumber = (config.widgetFamily == "medium")?2:5
    phrase = args.widgetParameter?args.widgetParameter:phrase
    //Widget
    widget = new ListWidget()
    let date = new Date()
    date.setMinutes(date.getMinutes() + 30)
    widget.refreshAfterDate = date
    widget.backgroundColor = new Color("#000")
    widget.url = URLScheme.forRunningScript()
    //Add top
    addTop(widget)
    //Create columns
    let columnHolder = widget.addStack()
    columnHolder.centerAlignContent()
    columnHolder.addSpacer()
    let column1 = columnHolder.addStack()
    column1.layoutVertically()
    column1.addSpacer()
    //Add fonts to column
    addFontStacks(column1, 0, fontNumber)
    columnHolder.addSpacer()
    let column2 = columnHolder.addStack()
    column2.layoutVertically()
    column2.addSpacer()
    //Add fonts to column
    addFontStacks(column2, fontNumber, fontNumber)
    columnHolder.addSpacer()
  } else {
    throw new Error("Invalid Widget Size")
  }
  Script.setWidget(widget)
  Script.complete()
} else if(args.plainTexts[0]) {
  //Run in ShareSheet
  let text = args.plainTexts[0]
  choice = (text.split("\n").join(" ").length > 10)?text.substring(0,10):text
  let choseFont = new Alert()
  choseFont.title = "Choose A Font"
  for(var i = 0, l = fontOrder.length; i < l; i++) {
    choseFont.addAction(fontSwitch(choice, fontOrder[i]))
  }
  let font = fontOrder[await choseFont.presentSheet()]
  Pasteboard.copy(fontSwitch(text, font))
  let notify = new Notification()
   notify.title = "Text Copied"
   notify.body = fontSwitch(text, font)
   await notify.schedule()
   Script.complete()
} else if(Object.keys(args.queryParameters)[0]) {
  //Run with input from a widget
  let alert = new Alert()
  alert.title = "Enter Text Or Use Clipboard"
  alert.addTextField("Enter Text")
  alert.addAction("Use Clipboard")
  alert.addAction("Use Text")
  let text = (await alert.presentAlert()==1)?alert.textFieldValue(0):Pasteboard.paste()
  text = text?text:"No Value"
  Pasteboard.copy(fontSwitch(text, args.queryParameters["font"]))
  let notify = new Notification()
   notify.title = "Text Copied"
   notify.body = fontSwitch(text, args.queryParameters["font"])
   await notify.schedule()
   Script.complete()
} else {
// Run in scriptable
  let alert = new Alert()
  alert.title = "Enter Text Or Use Clipboard"
  alert.addTextField("Enter Text")
  alert.addAction("Use Clipboard")
  alert.addAction("Use Text")
  let text = (await alert.presentAlert()==1)?alert.textFieldValue(0):Pasteboard.paste()
  text = text?text:"No Value"
  choice = (text.split("\n").join(" ").length > 10)?text.substring(0,10):text
  let choseFont = new Alert()
  choseFont.title = "Choose A Font"
  for(var i = 0, l = fontOrder.length; i < l; i++) {
    choseFont.addAction(fontSwitch(choice, fontOrder[i]))
  }
  let font = fontOrder[await choseFont.presentSheet()]
  Pasteboard.copy(fontSwitch(text, font))
  let notify = new Notification()
   notify.title = "Text Copied"
   notify.body = fontSwitch(text, font)
   await notify.schedule()
   Script.complete()
}


function addTop(widget) {
  let top = widget.addStack()
  top.setPadding(0,0,0,2)
  top.centerAlignContent()
  top.addSpacer()
  top.url = URLScheme.forRunningScript()
  //logo
  let logoGreen = top.addStack()
  logoGreen.setPadding(3,3,3,3)
  logoGreen.backgroundColor = new Color("#6BC569")
  logoGreen.cornerRadius = 2
  let logoWhite = logoGreen.addStack()
  logoWhite.setPadding(2,2,2,2)
  logoWhite.backgroundColor = new Color("#fff")
  logoWhite.size = new Size(14,14)
  logoWhite.cornerRadius = 2
  logoWhite.centerAlignContent()
  let t = logoWhite.addText("T")
  t.textColor = new Color("#6BC569")
  t.font = Font.blackSystemFont(10)
  t.centerAlignText()
  top.addSpacer(4)
  // Title
  let title = top.addText("Font Switcher")
  title.textColor = new Color("#6BC569")
  title.minimumScaleFactor = 0.2
  title.lineLimit = 1
  title.font = Font.blackSystemFont(20)
  top.addSpacer()
  widget.addSpacer()
}
function addFontStacks(on,startIndex,amount) {
  for(var i = startIndex; i < (startIndex+amount); i++) {
  let stack = on.addStack()
  stack.setPadding(2,2,2,2)
  stack.cornerRadius = 3
  stack.size = new Size(130,35)
  stack.borderWidth = 2
  stack.borderColor = new Color("#6BC569")
  let text = stack.addText(fontSwitch(phrase,fontOrder[i]))
  text.textColor = new Color("#fff")
  text.font = Font.regularSystemFont(12)
  text.minimumScaleFactor = 0.8
  text.url = "scriptable:///run?scriptName=" + URLScheme.forRunningScript().replace("scriptable:///run/", "") + "&font=" + fontOrder[i]
  on.addSpacer()
}
}
function fontSwitch(text,font) {
  var fonts = {"UA":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["A͎","B͎","C͎","D͎","E͎","F͎","G͎","H͎","I͎","J͎","K͎","L͎","M͎","N͎","O͎","P͎","Q͎","R͎","S͎","T͎","U͎","V͎","W͎","X͎","Y͎","Z͎","A͎","B͎","C͎","D͎","E͎","F͎","G͎","H͎","I͎","J͎","K͎","L͎","M͎","N͎","O͎","P͎","Q͎","R͎","S͎","T͎","U͎","V͎","W͎","X͎","Y͎","Z͎","1͎","2͎","3͎","4͎","5͎","6͎","7͎","8͎","9͎","0͎"]},"US":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["A̲","B̲","C̲","D̲","E̲","F̲","G̲","H̲","I̲","J̲","K̲","L̲","M̲","N̲","O̲","P̲","Q̲","R̲","S̲","T̲","U̲","V̲","W̲","X̲","Y̲","Z̲","A̲","B̲","C̲","D̲","E̲","F̲","G̲","H̲","I̲","J̲","K̲","L̲","M̲","N̲","O̲","P̲","Q̲","R̲","S̲","T̲","U̲","V̲","W̲","X̲","Y̲","Z̲","1̲","2̲","3̲","4̲","5̲","6̲","7̲","8̲","9̲","0̲"]},"HK":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["Ą̶͉͔̤̈́̌̎͝","B̵̡̟̖̖̈́̾̈́̈́","C̵̬͉̟̟̹͈͕̭̐́̉̈͌͝ͅ","Ḍ̶̢͓͕͎̘̳̀̇͋̐̑͌̈́̚͜","E̴͈̙̺͕͝","F̸̪̜̟̪͊̈͛̈́̈̂̚͠ͅ","G̸͖̫̺̩͍̩͒͒̇̌͐͋̾͛͠","H̵͓̣̯̪̩̞̽͒̑̂͌̓̏̉͘͠","I̷̡̹̼̔͛̂̿̒","J̷̡̨̟͓̯̜͙͔̺̺̅̔̒́̓̔","K̷̟̯͊̾̈́̂̍̾̄̓͘̕","L̴̠͙͗","M̵̘͙͐̅","N̷̡̖̭̂́̎","Ȍ̴̹͖͊̊̐̒","P̶̡͙̤̼͎͕̺̾̇̽̊̀̑̊́̎","Q̷̱̃͆̃͂͒͘̚","Ŕ̴̨̭̯̩̈́͒̽̈́","S̵̟͇̣̖̰̻͎͒̏̋̊͘̚͝","T̴̡̛̹̦̀͊͆̈́̒̈́͝","Ü̷͚̻͔̊̄̇͑","V̶̼̋͗͗","W̶̨͍̬̦̝̩̣̿̈","X̵̱͕̘͈̗̳͚͙̗̝̀̓̅̄̑̕̕̕","Y̵͔̺̬̹̰͛͑","Z̷̤͍͛","ā̶̧̡̻̯͍̝̞͋̓͆̏̉͌","b̴̧̨͖͙̯͍͉͇̲̦͘͘","c̷̫͓͕̘̯̔́̇̿͑̓̚","d̷̪͖̙̮̯̞̻̉̂̓̈́̋͛͒͊ͅ","ē̶̡͍̰͖̜͇̬̖̣̯̿̃̑͆͠","f̵̱̜̗̮̖̲̩̻̎̌̏͆̓̔̀͝","g̷̨̹̯̝̣̪͇͓̬͙͐͝","h̴̠̄͆̀͠͝","į̷̯̝̂̐͘ͅ","j̷͖̈́͠","k̶̢̛̙͖̳̝̘̫̯̼̟̉͋͌","l̴̫̜͚̦̳̗̇̾̒̋͋͑̎͝͠","ḿ̴͚̗͇͛","ṉ̸̨͉̳͓͋̇́̅̊̃̇͘͠","o̶̭͇̠̔͜","p̸̝̞̦͉̣̗̞̅͛͜͝","q̸̡̼͍͖͙̯̼̺͒́̃","r̸͖͍͙͇̙̒̑̈́̈̏̅͘͘","s̵͕͍̝̥̓͊͗̈́","ţ̵̧̦̥̅̑ͅ","ṳ̵̧̭̰̮̻̗̫̳̔̾͛̆","v̷̛͎̋̾̋̈́̋̊͘̚͘","w̸̲͚̼̓͊͒̀̆͠͝","x̶̥̘̮̜͙̳̝̪̆͋̀̀̾̔͘͜","y̸̧̛͚̤̤̲̰͙̝̥͇̏̓","ẑ̷̎̀̀̊͜ͅ","1̵̪̞͈̬̻̘̑̏͋͊͋̌͊̚̚͜","2̴͙͍̗̤̲̺͊̃͒͑","3̶̛̬̰͉͆͌́̎̾́̔̀͘","4̷̲̰͓̱͗̽́̍͜","5̸̨̠̖͙̪̙͖̩̂̓͠","6̵̨̘̙̮̀̔̈́̃̕͠","7̸͖̗̪̥̎̚","8̷̞͒͂̆","9̴̧̠͇̪̤̹̤̐̒̈́","0̸̧̩̗̟̩̳̘̔"]},"SFB":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["𝐀","𝐁","𝐂","𝐃","𝐄","𝐅","𝐆","𝐇","𝐈","𝐉","𝐊","𝐋","𝐌","𝐍","𝐎","𝐏","𝐐","𝐑","𝐒","𝐓","𝐔","𝐕","𝐖","𝐗","𝐘","𝐙","𝐚","𝐛","𝐜","𝐝","𝐞","𝐟","𝐠","𝐡","𝐢","𝐣","𝐤","𝐥","𝐦","𝐧","𝐨","𝐩","𝐪","𝐫","𝐬","𝐭","𝐮","𝐯","𝐰","𝐱","𝐲","𝐳","𝟏","𝟐","𝟑","𝟒","𝟓","𝟔","𝟕","𝟖","𝟗","𝟎"]},"SCB":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],"new":["𝓐","𝓑","𝓒","𝓓","𝓔","𝓕","𝓖","𝓗","𝓘","𝓙","𝓚","𝓛","𝓜","𝓝","𝓞","𝓟","𝓠","𝓡","𝓢","𝓣","𝓤","𝓥","𝓦","𝓧","𝓨","𝓩","𝓪","𝓫","𝓬","𝓭","𝓮","𝓯","𝓰","𝓱","𝓲","𝓳","𝓴","𝓵","𝓶","𝓷","𝓸","𝓹","𝓺","𝓻","𝓼","𝓽","𝓾","𝓿","𝔀","𝔁","𝔂","𝔃"]},"FTB":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],"new":["𝕬","𝕭","𝕮","𝕯","𝕰","𝕱","𝕲","𝕳","𝕴","𝕵","𝕶","𝕷","𝕸","𝕹","𝕺","𝕻","𝕼","𝕽","𝕾","𝕿","𝖀","𝖁","𝖂","𝖃","𝖄","𝖅","𝖆","𝖇","𝖈","𝖉","𝖊","𝖋","𝖌","𝖍","𝖎","𝖏","𝖐","𝖑","𝖒","𝖓","𝖔","𝖕","𝖖","𝖗","𝖘","𝖙","𝖚","𝖛","𝖜","𝖝","𝖞","𝖟"]},"HT":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["A̾","B̾","C̾","D̾","E̾","F̾","G̾","H̾","I̾","J̾","K̾","L̾","M̾","N̾","O̾","P̾","Q̾","R̾","S̾","T̾","U̾","V̾","W̾","X̾","Y̾","Z̾","a̾","b̾","c̾","d̾","e̾","f̾","g̾","h̾","i̾","j̾","k̾","l̾","m̾","n̾","o̾","p̾","q̾","r̾","s̾","t̾","u̾","v̾","w̾","x̾","y̾","z̾","1̾","2̾","3̾","4̾","5̾","6̾","7̾","8̾","9̾","0̾"]},"FW":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ","Ｈ","Ｉ","Ｊ","Ｋ","Ｌ","Ｍ","Ｎ","Ｏ","Ｐ","Ｑ","Ｒ","Ｓ","Ｔ","Ｕ","Ｖ","Ｗ","Ｘ","Ｙ","Ｚ","ａ","ｂ","ｃ","ｄ","ｅ","ｆ","ｇ","ｈ","ｉ","ｊ","ｋ","ｌ","ｍ","ｎ","ｏ","ｐ","ｑ","ｒ","ｓ","ｔ","ｕ","ｖ","ｗ","ｘ","ｙ","ｚ","０","１","２","３","４","５","６","７","８","９"]},"SQF":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],"new":["🅰︎","🅱︎","🅲","🅳","🅴","🅵","🅶","🅷","🅸","🅹","🅺","🅻","🅼","🅽","🅾︎","🅿︎","🆀","🆁","🆂","🆃","🆄","🆅","🆆","🆇","🆈","🆉","🅰︎","🅱︎","🅲","🅳","🅴","🅵","🅶","🅷","🅸","🅹","🅺","🅻","🅼","🅽","🅾︎","🅿︎","🆀","🆁","🆂","🆃","🆄","🆅","🆆","🆇","🆈","🆉"]},"SB":{"old":["1","2","3","4","5","6","7","8","9","0"],"new":["₁","₂","₃","₄","₅","₆","₇","₈","₉","₀"]},"FT":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],"new":["𝔄","𝔅","ℭ","𝔇","𝔈","𝔉","𝔊","ℌ","ℑ","𝔍","𝔎","𝔏","𝔐","𝔑","𝔒","𝔓","𝔔","ℜ","𝔖","𝔗","𝔘","𝔙","𝔚","𝔛","𝔜","ℨ","𝔞","𝔟","𝔠","𝔡","𝔢","𝔣","𝔤","𝔥","𝔦","𝔧","𝔨","𝔩","𝔪","𝔫","𝔬","𝔭","𝔮","𝔯","𝔰","𝔱","𝔲","𝔳","𝔴","𝔵","𝔶","𝔷"]},"SC":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],"new":["𝒜","ℬ","𝒞","𝒟","ℰ","ℱ","𝒢","ℋ","ℐ","𝒥","𝒦","ℒ","ℳ","𝒩","𝒪","𝒫","𝒬","ℛ","𝒮","𝒯","𝒰","𝒱","𝒲","𝒳","𝒴","𝒵","𝒶","𝒷","𝒸","𝒹","ℯ","𝒻","𝓈","𝒽","𝒾","𝒿","𝓀","𝓁","𝓂","𝓃","ℴ","𝓅","𝓆","𝓇","𝓈","𝓉","𝓊","𝓋","𝓌","𝓍","𝓎","𝓏"]},"SSBI":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],"new":["𝘼","𝘽","𝘾","𝘿","𝙀","𝙁","𝙂","𝙃","𝙄","𝙅","𝙆","𝙇","𝙈","𝙉","𝙊","𝙋","𝙌","𝙍","𝙎","𝙏","𝙐","𝙑","𝙒","𝙓","𝙔","𝙕","𝙖","𝙗","𝙘","𝙙","𝙚","𝙛","𝙜","𝙝","𝙞","𝙟","𝙠","𝙡","𝙢","𝙣","𝙤","𝙥","𝙦","𝙧","𝙨","𝙩","𝙪","𝙫","𝙬","𝙭","𝙮","𝙯"]},"AW":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["Â̬","B̬̂","Ĉ̬","D̬̂","Ê̬","F̬̂","Ĝ̬","Ĥ̬","Î̬","Ĵ̬","K̬̂","L̬̂","M̬̂","N̬̂","Ô̬","P̬̂","Q̬̂","R̬̂","Ŝ̬","T̬̂","Û̬","V̬̂","Ŵ̬","X̬̂","Ŷ̬","Ẑ̬","Â̬","B̬̂","Ĉ̬","D̬̂","Ê̬","F̬̂","Ĝ̬","Ĥ̬","Î̬","Ĵ̬","K̬̂","L̬̂","M̬̂","N̬̂","Ô̬","P̬̂","Q̬̂","R̬̂","Ŝ̬","T̬̂","Û̬","V̬̂","Ŵ̬","X̬̂","Ŷ̬","Ẑ̬","1̬̂","2̬̂","3̬̂","4̬̂","5̬̂","6̬̂","7̬̂","8̬̂","9̬̂","0̬̂"]},"SL":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["🅐","🅑","🅒","🅓","🅔","🅕","🅖","🅗","🅘","🅙","🅚","🅛","🅜","🅝","🅞","🅟","🅠","🅡","🅢","🅣","🅤","🅥","🅦","🅧","🅨","🅩","🅐","🅑","🅒","🅓","🅔","🅕","🅖","🅗","🅘","🅙","🅚","🅛","🅜","🅝","🅞","🅟","🅠","🅡","🅢","🅣","🅤","🅥","🅦","🅧","🅨","🅩","❶","❷","❸","❹","❺","❻","❼","❽","❾","⓿"]},"SQ":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],"new":["🄰","🄱","🄲","🄳","🄴","🄵","🄶","🄷","🄸","🄹","🄺","🄻","🄼","🄽","🄾","🄿","🅀","🅁","🅂","🅃","🅄","🅅","🅆","🅇","🅈","🅉","🄰","🄱","🄲","🄳","🄴","🄵","🄶","🄷","🄸","🄹","🄺","🄻","🄼","🄽","🄾","🄿","🅀","🅁","🅂","🅃","🅄","🅅","🅆","🅇","🅈","🅉"]},"SSI":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],"new":["𝘈","𝘉","𝘊","𝘋","𝘌","𝘍","𝘎","𝘏","𝘐","𝘑","𝘒","𝘓","𝘔","𝘕","𝘖","𝘗","𝘘","𝘙","𝘚","𝘛","𝘜","𝘝","𝘞","𝘟","𝘠","𝘡","𝘢","𝘣","𝘤","𝘥","𝘦","𝘧","𝘨","𝘩","𝘪","𝘫","𝘬","𝘭","𝘮","𝘯","𝘰","𝘱","𝘲","𝘳","𝘴","𝘵","𝘶","𝘷","𝘸","𝘹","𝘺","𝘻"]},"ST":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["A̶","B̶","C̶","D̶","E̶","F̶","G̶","H̶","I̶","J̶","K̶","L̶","M̶","N̶","O̶","P̶","Q̶","R̶","S̶","T̶","U̶","V̶","W̶","X̶","Y̶","Z̶","A̶","B̶","C̶","D̶","E̶","F̶","G̶","H̶","I̶","J̶","K̶","L̶","M̶","N̶","O̶","P̶","Q̶","R̶","S̶","T̶","U̶","V̶","W̶","X̶","Y̶","Z̶","1̶","2̶","3̶","4̶","5̶","6̶","7̶","8̶","9̶","0̶"]},"TW":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["𝙰","𝙱","𝙲","𝙳","𝙴","𝙵","𝙶","𝙷","𝙸","𝙹","𝙺","𝙻","𝙼","𝙽","𝙾","𝙿","𝚀","𝚁","𝚂","𝚃","𝚄","𝚅","𝚆","𝚇","𝚈","𝚉","𝚊","𝚋","𝚌","𝚍","𝚎","𝚏","𝚐","𝚑","𝚒","𝚓","𝚔","𝚕","𝚖","𝚗","𝚘","𝚙","𝚚","𝚛","𝚜","𝚝","𝚞","𝚟","𝚠","𝚡","𝚢","𝚣","𝟷","𝟸","𝟹","𝟺","𝟻","𝟼","𝟽","𝟾","𝟿","𝟶"]},"SR":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["A͙","B͙","C͙","D͙","E͙","F͙","G͙","H͙","I͙","J͙","K͙","L͙","M͙","N͙","O͙","P͙","Q͙","R͙","S͙","T͙","U͙","V͙","W͙","X͙","Y͙","Z͙","A͙","B͙","C͙","D͙","E͙","F͙","G͙","H͙","I͙","J͙","K͙","L͙","M͙","N͙","O͙","P͙","Q͙","R͙","S͙","T͙","U͙","V͙","W͙","X͙","Y͙","Z͙","1͙","2͙","3͙","4͙","5͙","6͙","7͙","8͙","9͙","0͙"]},"OT":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["A͞","B͞","C͞","D͞","E͞","F͞","G͞","H͞","I͞","J͞","K͞","L͞","M͞","N͞","O͞","P͞","Q͞","R͞","S͞","T͞","U͞","V͞","W͞","X͞","Y͞","Z͞","A͞","B͞","C͞","D͞","E͞","F͞","G͞","H͞","I͞","J͞","K͞","L͞","M͞","N͞","O͞","P͞","Q͞","R͞","S͞","T͞","U͞","V͞","W͞","X͞","Y͞","Z͞","1͞","2͞","3͞","4͞","5͞","6͞","7͞","8͞","9͞","0͞"]},"SS":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["𝖠","𝖡","𝖢","𝖣","𝖤","𝖥","𝖦","𝖧","𝖨","𝖩","𝖪","𝖫","𝖬","𝖭","𝖮","𝖯","𝖰","𝖱","𝖲","𝖳","𝖴","𝖵","𝖶","𝖷","𝖸","𝖹","𝖺","𝖻","𝖼","𝖽","𝖾","𝖿","𝗀","𝗁","𝗂","𝗃","𝗄","𝗅","𝗆","𝗇","𝗈","𝗉","𝗊","𝗋","𝗌","𝗍","𝗎","𝗏","𝗐","𝗑","𝗒","𝗓","𝟣","𝟤","𝟥","𝟦","𝟧","𝟨","𝟩","𝟪","𝟫","𝟢"]},"SSB":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["𝗔","𝗕","𝗖","𝗗","𝗘","𝗙","𝗚","𝗛","𝗜","𝗝","𝗞","𝗟","𝗠","𝗡","𝗢","𝗣","𝗤","𝗥","𝗦","𝗧","𝗨","𝗩","𝗪","𝗫","𝗬","𝗭","𝗮","𝗯","𝗰","𝗱","𝗲","𝗳","𝗴","𝗵","𝗶","𝗷","𝗸","𝗹","𝗺","𝗻","𝗼","𝗽","𝗾","𝗿","𝘀","𝘁","𝘂","𝘃","𝘄","𝘅","𝘆","𝘇","𝟭","𝟮","𝟯","𝟰","𝟱","𝟲","𝟳","𝟴","𝟵","𝟬"]},"UD":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],"new":["ɐ","q","ɔ","p","ǝ","ɟ","ƃ","ɥ","ı","ɾ","ʞ","l","ɯ","u","o","d","b","ɹ","s","ʇ","n","ʌ","ʍ","x","ʎ","z","ɐ","q","ɔ","p","ǝ","ɟ","ƃ","ɥ","ı","ɾ","ʞ","l","ɯ","u","o","d","b","ɹ","s","ʇ","n","ʌ","ʍ","x","ʎ","z"]},"SP":{"old":["1","2","3","4","5","6","7","8","9","0"],"new":["¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹","⁰"]},"PT":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["⒜","⒝","⒞","⒟","⒠","⒡","⒢","⒣","⒤","⒥","⒦","⒧","⒨","⒩","⒪","⒫","⒬","⒭","⒮","⒯","⒰","⒱","⒲","⒳","⒴","⒵","⒜","⒝","⒞","⒟","⒠","⒡","⒢","⒣","⒤","⒥","⒦","⒧","⒨","⒩","⒪","⒫","⒬","⒭","⒮","⒯","⒰","⒱","⒲","⒳","⒴","⒵","⑴","⑵","⑶","⑷","⑸","⑹","⑺","⑻","⑼","0"]},"SFI":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],"new":["𝐴","𝐵","𝐶","𝐷","𝐸","𝐹","𝐺","𝐻","𝐼","𝐽","𝐾","𝐿","𝑀","𝑁","𝑂","𝑃","𝑄","𝑅","𝑆","𝑇","𝑈","𝑉","𝑊","𝑋","𝑌","𝑍","𝑎","𝑏","𝑐","𝑑","𝑒","𝑓","𝑔","ℎ","𝑖","𝑗","𝑘","𝑙","𝑚","𝑛","𝑜","𝑝","𝑞","𝑟","𝑠","𝑡","𝑢","𝑣","𝑤","𝑥","𝑦","𝑧"]},"SFBI":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],"new":["𝑨","𝑩","𝑪","𝑫","𝑬","𝑭","𝑮","𝑯","𝑰","𝑱","𝑲","𝑳","𝑴","𝑵","𝑶","𝑷","𝑸","𝑹","𝑺","𝑻","𝑼","𝑽","𝑾","𝑿","𝒀","𝒁","𝒂","𝒃","𝒄","𝒅","𝒆","𝒇","𝒈","𝒉","𝒊","𝒋","𝒌","𝒍","𝒎","𝒏","𝒐","𝒑","𝒒","𝒓","𝒔","𝒕","𝒖","𝒗","𝒘","𝒙","𝒚","𝒛"]},"LT":{"old":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"],"new":["A͛","B͛","C͛","D͛","E͛","F͛","G͛","H͛","I͛","J͛","K͛","L͛","M͛","N͛","O͛","P͛","Q͛","R͛","S͛","T͛","U͛","V͛","W͛","X͛","Y͛","Z͛","A͛","B͛","C͛","D͛","E͛","F͛","G͛","H͛","I͛","J͛","K͛","L͛","M͛","N͛","O͛","P͛","Q͛","R͛","S͛","T͛","U͛","V͛","W͛","X͛","Y͛","Z͛","1͛","2͛","3͛","4͛","5͛","6͛","7͛","8͛","9͛","0͛"]}}
  var i = -1
  for(var each of fonts[font].old){
text=text.replace(new RegExp(each,"g"),fonts[font].new[++i])
  }
  return text
}
