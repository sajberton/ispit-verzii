
let books =[];
//GetData()
let id = 1;
let sort;
let maxsize = 0;
let save_edit;
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
    id+=page
    for(let index = 0; index < books.length; index++){
      $("#myTable").append(
          "<tr>"+
            "<td >"+ id + "</td>" +
            "<td class ='td-kind'>"+ books[index].kind +"</td>"+
            "<td class='td-title'>"+ books[index].title +"</td>"+
            "<td class = 'td-author'>"+ (books[index].author || books[index].editor )+"</td>"+
            "<td class='td-publisher'>"+ books[index].publisher +"</td>"+
            "<td class = 'td-year'>"+ books[index].year +"</td>"+
            "<td class ='td-length'>"+ books[index].length +"</td>"+
            "<td class ='td-series'>"+ (books[index].series ? `${books[index].seriesNumber} #${books[index].series}` : ``) + "</td>"+
            "<td>"+"<button class='edit'>Edit</button> + <button class='del'>Delete</button>  <button class='save'>Save</button>"+"</td>"+
          "</tr>");
        id++
    }
  }

  let filterTable = function(books){
    $("#tBody").html("");
    id = 1;

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

    maxsize = books.length;
    books = books.slice((0 + page), (10 + page));
   
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
    if(maxsize > parseInt(page+10))
    {
    page +=10;
    filterTable(books);
    }
}); 

$("#prev").click(function(){
    if(page != 0)
     {
        page -=10;
        filterTable(books);
    }
});

$("#console").click(function(){
    console.log(books);
});

$(document).on('click','.del', function(event){

    var row = $(this).closest('tr');
    var _title = row.find('.td-title').text();
    var _year = row.find('.td-year').text();

    let index;
    index = books.findIndex(n => n.title == _title);
    books.splice(index, 1);
    console.log(index);
    $(event.target).parent().parent().remove();
});

$(document).on('click','.edit', function(event){
    
        var row = $(this).closest('tr');
        var _title = row.find('.td-title').text();
        var _year = row.find('.td-year').text();
    
        let index;
        index = books.findIndex(n => n.title == _title);
        save_edit = index;
        let myInputKind = "<input class='in_kind' type='text' value='"+books[index].kind+"'>";
        let myInputTitle= "<input class='in_title' type='text' value='"+books[index].title+"'>";
        let myInputAuthor = "<input class='in_author' type='text' value='"+books[index].author+"'>"
        let myInputPublisher = "<input class='in_publisher' type='text' value='"+books[index].publisher+"'>"
        let myInputYear = "<input class='in_year' type='text' value='"+books[index].year+"'>";
        let myInputLenght = "<input class='in_lenght' type='text' value='"+books[index].length+"'>";
        let myInputSeries = "<input class='in_series' type='text' value='"+books[index].series+"'>";

        row.find('.td-kind').html(myInputKind);
        row.find('.td-title').html(myInputTitle);
        row.find('.td-author').html(myInputAuthor);
        row.find('.td-publisher').html(myInputPublisher);
        row.find('.td-year').html(myInputYear);
        row.find('.td-length').html(myInputLenght);
        row.find('.td-series').html(myInputSeries);   

        let edit = row.find('.edit');
        let del = row.find('.del');
        let save = row.find('.save');

        edit.css('display','none');
        del.css('display','none');
        save.css('display','block');        
    });

    $(document).on('click','.save', function(event){
        
        var row = $(this).closest('tr');

        books[save_edit].kind = row.find('.in_kind').val();
        books[save_edit].title = row.find('.in_title').val();
        books[save_edit].author = row.find('.in_author').val();
        books[save_edit].publisher = row.find('.in_publisher').val();
        books[save_edit].year = row.find('.in_year').val();
        books[save_edit].length = row.find('.in_lenght').val();
        books[save_edit].series = row.find('.in_series').val();

        row.find('.td-kind').html(books[save_edit].kind);
        row.find('.td-title').html(books[save_edit].title);
        row.find('.td-author').html(books[save_edit].author);
        row.find('.td-publisher').html(books[save_edit].publisher);
        row.find('.td-year').html(books[save_edit].year);
        row.find('.td-length').html(books[save_edit].length);
        row.find('.td-series').html(books[save_edit].series);
                
        let edit = row.find('.edit');
        let del = row.find('.del');
        let save = row.find('.save');

        edit.css('display','inline');
        del.css('display','inline');
        save.css('display','none');
     
    });



