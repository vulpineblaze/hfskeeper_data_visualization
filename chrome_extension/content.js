// content.js

 


if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',afterDOMLoaded);
} else {
  var url = location.href;

  // console.log("test page load", document.body);
  if(url.includes("player")){
    afterDOMLoaded();
  }
}

function afterDOMLoaded(){
  document.querySelectorAll('button')[4].addEventListener("click", function(){
    setTimeout(function() {

      currentData = {name: "", normal_text: "",theClass: "", credits: "", level: "", monster: "", reeved: ""};
      var name = ((document.getElementsByClassName("name"))[0]).innerHTML;
      var normal_text = ((document.getElementsByClassName("normal_text"))[0]).innerHTML;
      // console.log("get the other needed data: ", name, normal_text);


      var attd = document.getElementsByTagName("table");
      var page = attd.outerHTML;
      // console.log(" btn btn lol more attempts", attd, attd[0], page);
      for (var i = 0, row; row = (attd)[0].rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        // console.log("all dem rows", row);
        var date = (row.cells[0]).innerHTML;
        if(date.includes("Date")
              || date.includes("colspan")
              || date.includes("Attendance")
              || date.includes("Regular")
              ){
          continue;
        }
        // console.log("date passed", date);


        var theClass = (row.cells[1]).innerHTML;
        var credits = (row.cells[2]).innerHTML;
        var level = (row.cells[3]).innerHTML;
        var monster = (row.cells[4]).innerHTML;
        var reeved = (row.cells[5]).innerHTML;


        // console.log("show class", theClass, credits, level, monster, reeved);

        currentData.date = date;
        currentData.name = name.replace(/&nbsp;/g, " "); //var res = str.replace(/blue/g, "red");
        currentData.normal_text = normal_text.replace(/&nbsp;/g, " ");
        currentData.theClass = theClass;
        currentData.credits = credits;
        currentData.level = level;
        currentData.monster = monster;
        currentData.reeved = reeved;


        if(currentData.name.length < 1){
          currentData.name = currentData.normal_text+"(M)"
        }

        var theKey = JSON.stringify(currentData);
        // console.log("theKey", theKey); 
        theKey = window.btoa(theKey);
        // console.log("btoa(theKey)", theKey); 

        // console.log("check chrome ", chrome, chrome.storage);
        chrome.storage.local.set({[theKey]: currentData}, function() {
          // console.log('Value is set to ' + currentData);
        });


      }
    }, 1000)
  });
}

if(document.readyState !== 'complete') {
    window.addEventListener('load',afterWindowLoaded);
    // chrome.tabs.executeScript({
    //   code: 'var tbl=document.createElement("table"); document.body.appendChild(tbl); div.id="example";'
    // });
    var tbl=document.createElement("table"); 
    document.body.appendChild(tbl); 
    // tbl.id="example";
    tbl.id="tally";
} else {
    afterWindowLoaded();
}

function afterWindowLoaded(){
  // console.log("what href?", location.href);
  var url = location.href;

  // console.log("test page load", document.body);
  if(url.includes("player")){
    var btn = document.querySelectorAll('button')[4];
    // console.log("fins btn?", btn);
    btn.click();

    // var page = document.body.outerHTML;
    // var attd = document.getElementsByTagName("table");
    // var page = attd.outerHTML;
    // console.log("more attempts", attd, page);
  }else if(url.includes("kingdom")){
    // console.log("in kingdom", url);

    var ourData = [];
    chrome.storage.local.get(null, function(items) {
      // console.log('everything: ' + JSON.stringify(items));


      
      for (var key of Object.keys(items)) {
        // console.log(key + " -> " + p[key])
        var found=false;
        var item = items[key];
        // console.log("item in items:", item);
        for (var i = 0; i < ourData.length; i++) {
          console.log("ourData, i: ",i);
          if(ourData[i][0]==item.date){
            ourData[i][1] +=  ", ["+item.name +" | "+ item.theClass+"]";
            found = true;
          }
        }
        if(!found){
          ourData.push([item.date, "["+item.name +" | "+ item.theClass+"]"]);
        }
      }
      

      // console.log("final output for table, ourData:", ourData);

      $.fn.dataTable.moment( 'MM/DD/YYYY' );
 

      $('#tally').DataTable( {
          data: ourData,
          columns: [
              { title: "Date" },
              { title: "Name|Class , ..." }
          ],
          "order": [[ 0, "desc" ]],
      });
      
    });





  }
}



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      
      if(url.includes("kingdom")){
        // var firstHref = $("a[href^='http']").eq(10).attr("href");
        // console.log("firstHref", firstHref);
        // chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
        var btn = document.querySelectorAll('a')[4];
        // console.log("kigndom btn?", btn, btn.href);
        // btn.click();
        var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
        var URL = btn.href;
        // var win = window.open(URL, "_blank", strWindowFeatures);

        var allLinks = document.querySelectorAll('a');
        var linkArray = [];
        const override = 200;
        for(var i =0; i < allLinks.length ; i++){
          var link = allLinks[i];
          if(link && link.href && !isNaN(link.href.split("=").pop()) ){
            linkArray.push(link.href);
          }
          if(i > override){break;}
        }
        // console.log("linkArray:",linkArray);

        var i = 0;
        var timer = setInterval(function(){ 
          if(i >= linkArray.length){
            clearInterval(timer);
          }
          var temp = window.open(linkArray[i], "_blank", strWindowFeatures);
          temp.addEventListener('load', function() { 
            setTimeout(function(){
              temp.close(); 
            }, 3000);
          } , false);
          i += 1;
        }, 1500);
      }else if(url.includes("player")){
        var btn = document.querySelectorAll('button')[4];
        // console.log("fins btn?", btn);
        btn.click();
      }else{// someplace else
        // console.log("someplace else, no action");
      }


      // This line is new!
      

      var div=document.createElement("div"); 
      document.body.appendChild(div); 
      div.innerText="test123";
    }
  }
);

