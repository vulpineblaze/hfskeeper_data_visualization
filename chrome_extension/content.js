// content.js
var dataSet = [
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
    [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
    [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
    [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
    [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
    [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
    [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
    [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
    [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
    [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
    [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
    [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
    [ "Doris Wilder", "Sales Assistant", "Sydney", "3023", "2010/09/20", "$85,600" ],
    [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
    [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
    [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
    [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
    [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
    [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
    [ "Michelle House", "Integration Specialist", "Sydney", "2769", "2011/06/02", "$95,400" ],
    [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
    [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
    [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
    [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
    [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
];
 


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
      console.log("get the other needed data: ", name, normal_text);


      var attd = document.getElementsByTagName("table");
      var page = attd.outerHTML;
      console.log(" btn btn lol more attempts", attd, attd[0], page);
      for (var i = 0, row; row = (attd)[0].rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        console.log("all dem rows", row);
        var date = (row.cells[0]).innerHTML;
        if(date.includes("Date")
              || date.includes("colspan")
              || date.includes("Attendance")
              || date.includes("Regular")
              ){
          continue;
        }
        console.log("date passed", date);


        var theClass = (row.cells[1]).innerHTML;
        var credits = (row.cells[2]).innerHTML;
        var level = (row.cells[3]).innerHTML;
        var monster = (row.cells[4]).innerHTML;
        var reeved = (row.cells[5]).innerHTML;


        console.log("show class", theClass, credits, level, monster, reeved);

        currentData.date = date;
        currentData.name = name.replace(/&nbsp;/g, " "); //var res = str.replace(/blue/g, "red");
        currentData.normal_text = normal_text.replace(/&nbsp;/g, " ");
        currentData.theClass = theClass;
        currentData.credits = credits;
        currentData.level = level;
        currentData.monster = monster;
        currentData.reeved = reeved;

        var theKey = JSON.stringify(currentData);
        console.log("theKey", theKey); 
        theKey = window.btoa(theKey);
        console.log("btoa(theKey)", theKey); 

        console.log("check chrome ", chrome, chrome.storage);
        chrome.storage.local.set({[theKey]: currentData}, function() {
          console.log('Value is set to ' + currentData);
        });

        // for (var j = 0, col; col = row.cells[j]; j++) {
        //  //iterate through columns
        //  //columns would be accessed using the "col" variable assigned in the for loop
        //   var x = col.innerHTML; 
        //   console.log("all dem cols", col, x); 
        //   if(x.includes("Date")
        //       || x.includes("colspan")
        //       || x.includes("Attendance")
        //       ){
        //     break;
        //   }
        // }  
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
    console.log("in kingdom", url);

    var ourData = [];
    chrome.storage.local.get(null, function(items) {
      console.log('everything: ' + JSON.stringify(items));
      // obj["key3"] = "value3";

      // const entries = Object.entries(items)
      // for (const [item, count] of entries) {
      //   console.log(`There are ${count} ${item}s`);
      //   if(data[item.date]){
      //     data[item.date] += ", "+item.name +"|"+ item.theClass;
      //   }else{
      //     data[item.date] = item.name +"|"+ item.theClass;
      //   }
      // }

      
      for (var key of Object.keys(items)) {
        // console.log(key + " -> " + p[key])
        var found=false;
        var item = items[key];
        console.log("item in items:", item);
        for (var i = 0; i < ourData.length; i++) {
          console.log("ourData, i: ",i);
          if(ourData[i][0]==item.date){
            ourData[i][1] +=  ", "+item.name +"|"+ item.theClass;
            found = true;
          }
        }
        if(!found){
          ourData.push([item.date,item.name +"|"+ item.theClass]);
        }
      }
      

      console.log("final output for table, ourData:", ourData);

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



    // $(document).ready(function() {
    //   $('#example').DataTable( {
    //       data: dataSet,
    //       columns: [
    //           { title: "Name" },
    //           { title: "Position" },
    //           { title: "Office" },
    //           { title: "Extn." },
    //           { title: "Start date" },
    //           { title: "Salary" }
    //       ]
    //   });
    // });




  }
}

// $(document).ready(function(){
//   console.log("what href?", location.href);
//   var url = location.href;

//   console.log("test page load", document.body);
//   if(url.includes("player")){
//     var btn = document.querySelectorAll('button')[4];
//     console.log("fins btn?", btn);
//     btn.click();

//     // var table = document.getElementById("mytab1");
//     // var x = document.getElementsByClassName("example");
//     // var attd = document.getElementsByTagName("table");
//     // var attd = document.getElementsByClassName("attendance");
//     // console.log("attd i hope", attd, (attd)[1], attd.length);
//     // for (var i = 0, row; row = (attd)[1].rows[i]; i++) {
//     //   //iterate through rows
//     //   //rows would be accessed using the "row" variable assigned in the for loop
//     //   console.log("all dem rows", row);

//     //   for (var j = 0, col; col = row.cells[j]; j++) {
//     //    //iterate through columns
//     //    //columns would be accessed using the "col" variable assigned in the for loop
//     //     console.log("all dem cols", col); 
//     //   }  
//     // }
//     // var rows = [];

//     // $('table tr').each(function() {
//     //   $tr = $(this);
//     //   var row = [];
//     //   console.log("tr found", $tr);
//     //   $tr.find("td").each(function(){
//     //     row.push($(this).text());
//     //     console.log("td found", $(this));
//     //   });
//     // });


//     // $('td').each(function() {
//     //   $td = $(this);
//     //   console.log("?td found", $td);
//     // });

//     // console.log("test post jquery");

//     // var page = document.body.outerHTML;
//     var attd = document.getElementsByTagName("table");
//     var page = attd.outerHTML;
//     console.log("more attempts", attd, page);


//     // var tdIndex = page.indexOf("td");
//     // console.log("traverse by td", page, tdIndex);

//   }
// });
  
  



// chrome.storage.local.set({key: value}, function() {
//           console.log('Value is set to ' + value);
//         });
      
//         chrome.storage.local.get(['key'], function(result) {
//           console.log('Value currently is ' + result.key);
//         });




chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      
      if(url.includes("kingdom")){
        // var firstHref = $("a[href^='http']").eq(10).attr("href");
        // console.log("firstHref", firstHref);
        // chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
        var btn = document.querySelectorAll('a')[4];
        console.log("kigndom btn?", btn);
        btn.click();
      }else if(url.includes("player")){
        var btn = document.querySelectorAll('button')[4];
        console.log("fins btn?", btn);
        btn.click();
      }else{// someplace else
        console.log("someplace else, no action");
      }


      // This line is new!
      

      var div=document.createElement("div"); 
      document.body.appendChild(div); 
      div.innerText="test123";
    }
  }
);

