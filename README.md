# Font Switcher
![Logo](/images/logo.png) 

Font Switcher is the scriptable version of the shortcut [Font Switcher](https://routinehub.co/shortcut/8264/). It supports 29 Unicode fonts that are usable on most platforms (it is missing ⒸⒾⓇⒸⓁⒺⓈ and Sᴍᴀʟʟ Cᴀᴘs from the shortcut). Font switcher allows you to switch fonts from the share sheet, widgets and running the script in scriptable.

## Getting Started

Copy the text from this [file](font-switcher.js) and paste it into a new script. To avoid potential errors, rename the script to `Font Switcher`. You are ready to start using the script.

## Customizing 
You can customize the phrase that is defaulted for text appearing in the widgets by changing the text found on line 7 of the script.

```javascript
//The prase to appear in the widgets
let phrase = "The quick brown fox jumps over the lazy dog"

```

Change the `The quick brown fox jumps over the lazy dog` to any text you like not containing `"`.

You can also change the order of the fonts. The font order effects what fonts are shown in the widgets and what order they appear in. To change the font order, rearrange any of the 2-4 character codes found in this list on line 10.

```javascript
//Order of fonts to appear in the widgets and when selecting a font. See table below if switching order of fonts
const fontOrder = ["SS","SSB","SSI","SSBI","SFB","SFI","SFBI","TW","SC","SCB","FW","FT","FTB","UD","SQ","SQF","SL","PT","HK","ST","US","OT","SR","HT","LT","AW","UA","SB","SP"]
```

You will also find a table below showing the codes for all the fonts.

```javascript
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
```

## Widgets

### Small

![Small](/images/small-widget.jpeg)

Displays a random font with the text set by the phrase or widget parameter. When taped, it runs the script normally, allowing you to enter text and chose a font to be copied.

### Medium

![Medium](/images/medium-widget.jpeg)

Displays four clickable fonts with the text set by the phrase or widget parameter. The fonts are the first four specified in the font order. When clicking the title, it runs the script normally, allowing you to enter text and chose a font to be copied. When clicking a font, it runs the script with input, allowing you to enter text and copying it as the clicked font.

### Large

![Large](/images/large-widget.jpeg)

Displays ten clickable fonts with the text set by the phrase or widget parameter. The fonts are the first ten specified in the font order. When clicking the title, it runs the script normally, allowing you to enter text and chose a font to be copied. When clicking a font, it runs the script with input, allowing you to enter text and copying it as the clicked font.

## Normal Run

Running from the scriptable gives you the option to use your clipboard as text or enter it. After, the first few characters of the text will appear in a variety of fonts for your choosing. Chose the font you would like to use and your text will be converted and copied to the clipboard. Finally, a notification will appear saying that the text was copied.

## Share Sheet

Select text you would like to switch and hit share. Select the run script option and choose Font Switcher. The first few characters of the text will appear in a variety of fonts for your choosing. Chose the font you would like to use and your text will be converted and copied to the clipboard. Finally, a notification will appear saying that the text was copied.
