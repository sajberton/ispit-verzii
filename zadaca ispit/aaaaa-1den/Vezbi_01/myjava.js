
let books =[];
//GetData()
let id = 1;
let sort;

let pageSize = 0;
let page = 0;

function GetData(){
$.ajax({
    method: "GET",
    url: "http://www.json-generator.com/api/json/get/cfUffYzlmG?indent=2",
    success:function(data){
        books = data;
        console.log(books);
        filterTable(books);
    },
    error: function(error){
        console.log(error);
    }
})
}
  $("#Get_Data").click(function () {
      sort = "";
        GetData()
  })

  let makeMyTable = function(books)
  {
    for(let index = 0; index < books.length; index++){  
      $("#myTable").append(
          "<tr>"+
      "<td>"+id+"</td>" +
      "<td>"+books[index].kind+"</td>"+
      "<td>"+books[index].title+"</td>"+
      "<td>"+(books[index].author || books[index].editor )+"</td>"+
      "<td>"+books[index].publisher+"</td>"+
      "<td>"+books[index].year+"</td>"+
      "<td>"+books[index].length+"</td>"+
      "<td>"+(books[index].series ? `${books[index].series} #${books[index].seriesNumber} ` : ``)+ "</td>"+
      "</tr>");
        id ++;
    }
  }

  let filterTable = function(books){
    $("#tBody").html("");
    if(sort)
    {
        if(sort == "novel")
        {
            books = books.filter(n => n.kind === "novel");
        }
        else if (sort == "anthology")
        {
            books = books.filter(n => n.kind === "anthology");
        }
    }
    books = books.slice((0 + page), (10 + page));
    pageSize = books.length;
    makeMyTable(books);   
  }

  $("#novel").click(function(){
      sort = "novel";
      filterTable(books);
  });

  $("#anthology").click(function(){
      page = 0;
      sort = "anthology";
    filterTable(books);
});

$("#next").click(function(){
   // id = id;
    if(pageSize >= 9)
    {
    page +=10;
    filterTable(books);
    }   
}); 

$("#prev").click(function(){
   // id = id-10;
    if(page != 0)
     {
        page -=10; 
        filterTable(books);
    }    
});