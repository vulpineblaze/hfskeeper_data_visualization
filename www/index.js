// var Buffer = require('buffer/').Buffer

const Http = new XMLHttpRequest();
const HttpIndiv = new XMLHttpRequest();
const proxyURL = "https://cors-anywhere.herokuapp.com/";
const kingdomURL='http://www.hfskeeper.com/kingdom.php?kingdomID=21';
const playerURL='http://www.hfskeeper.com/player.php?playerID=';
const attendanceURL='http://www.hfskeeper.com/attendance.php';
Http.open("GET", proxyURL+kingdomURL );
Http.send();

var playerList = [];

const playerLinkStr = "http://www.hfskeeper.com/player.php?playerID=";
const playerNameStart = "size='5pt'>"; 
const playerNameEnd = "</font>";

const overflowStop = 2;
// <td class=name>
// 	<a href="http://www.hfskeeper.com/player.php?playerID=1123" >
// 		<font color=#254117  size='5pt'>Alejandro&nbsp;G.</font>
// 	</a>
// </td>
// <td class=name>
// 	<a href="http://www.hfskeeper.com/player.php?playerID=1145" >
// 		<font color=#254117  size='5pt'>Alexis&nbsp;K.</font>
// 	</a>
// </td>
// <td class=name>
// 	<a href="http://www.hfskeeper.com/player.php?playerID=1045" >
// 		<font color=#254117  size='5pt'>Ali&nbsp;M.</font>
// 	</a>
// </td>
var i = 0;
var runOnce = true;
Http.onreadystatechange = (e) => {
  // console.log(Http.responseText);
  const page = Http.responseText;
  // var pos = string.indexOf(playerLinkStr, 15);

  
  if(page.length > 0 && runOnce){
    runOnce = false;
    var pos = page.indexOf(playerLinkStr) + playerLinkStr.length;
    var peek = page.slice(pos, 1000);
    var lastEnd = page.lastIndexOf(playerNameEnd);
    console.log("going into loop", pos, peek, page.length, lastEnd);
    console.log("page itself", page);
    while(pos){
  	  var start = page.indexOf(playerNameStart, pos) + playerNameStart.length;
  	  var end = page.indexOf(playerNameEnd, start);

  	  var link = page.slice(pos, pos+4);
  	  var name = page.slice(start, end);

  	  

      var obj = {name: name,
                id: link };

      playerList.push(obj);
      // last line
      var newpos = page.indexOf(playerLinkStr, end) + playerLinkStr.length;
      console.log("chop it up",pos,start,end,link,name, obj, newpos);
      pos = newpos;
      i+=1;
      if(i > overflowStop || end == lastEnd){
        break;
        pos = -1;
      }
    }
  }

  console.log("player list ", playerList);
  var playerListString = "";
  // for (var i = 0; i < playerList.length; i++) {
  for (var i = 0; i < playerList.length && i < overflowStop; i++) {
    playerListString += playerList[i].name +","+ playerList[i].id +"<br>";
    // delete window.document.referrer;
    // window.document.__defineGetter__('referrer', function () {
    //     return playerURL+playerList[i].id;
    // });
    // HttpIndiv.open("POST", proxyURL+attendanceURL );
    // HttpIndiv.open("GET", proxyURL+playerURL+playerList[i].id  );
    // HttpIndiv.send();
    var newWindow = window.open (playerURL+playerList[i].id);
    // newButton = newWindow.querySelectorAll('button')[4];
    console.log("new window lol", newWindow);
    // newWindow.close();
  }
  document.getElementById("playerList").innerHTML = playerListString;

// href: [Exception: DOMException: Blocked a frame with origin "http://fusionbombsderp.com" from accessing a cross-origin frame.]

  

  HttpIndiv.onreadystatechange = (e) => {
    // console.log(Http.responseText);
  var page = HttpIndiv.responseText;
  // page.getElementById("myCheck").click();
  // var element = HttpIndiv.response.getElementById("rightmenu");
  if(page.length > 0){
    var parsedDoc = new DOMParser().parseFromString(page, 'text/html');
    var rightmenu = parsedDoc.getElementById("rightmenu");
    // var attd = rightmenu.querySelectorAll('button')[4];
    var attd = parsedDoc.querySelectorAll('button')[4];
    // var attd_txt = attd.innerHTML || "";
    var attd_txt = "";

    // var pos = string.indexOf(playerLinkStr, 15);
    var raw = "d61b8ea89b1332af6e13a2fd03238e9c";
    var decoded = btoa(raw);
    // var b = new Buffer(decoded, 'base64')
    // var s = b.toString();
    // console.log("player now", page, decoded, parsedDoc, rightmenu, attd, attd_txt);
    console.log("player now", parsedDoc, rightmenu, attd, attd_txt);

    attd.click();

    page = HttpIndiv.responseText;
    console.log("after click", page, parsedDoc, attd);



  }
  
  
  // if(page.length > 0 && runOnce){
  //   runOnce = false;
  //   var pos = page.indexOf(playerLinkStr) + playerLinkStr.length;
  //   var peek = page.slice(pos, 1000);
  //   var lastEnd = page.lastIndexOf(playerNameEnd);
  //   console.log("going into loop", pos, peek, page.length, lastEnd);
  //   console.log("page itself", page);
  //   while(pos){
  //     var start = page.indexOf(playerNameStart, pos) + playerNameStart.length;
  //     var end = page.indexOf(playerNameEnd, start);

  //     var link = page.slice(pos, pos+4);
  //     var name = page.slice(start, end);

      

  //     var obj = {name: name,
  //               id: link };

  //     playerList.push(obj);
  //     // last line
  //     var newpos = page.indexOf(playerLinkStr, end) + playerLinkStr.length;
  //     console.log("chop it up",pos,start,end,link,name, obj, newpos);
  //     pos = newpos;
  //     i+=1;
  //     if(i > 300 || end == lastEnd){
  //       break;
  //       pos = -1;
  //     }
  //   }
  }
  
}







