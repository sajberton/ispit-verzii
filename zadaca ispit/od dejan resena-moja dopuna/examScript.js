let books = [];
let ID = 1;
let page = 0;
$(document).ready(() => {
    $.ajax({
        method: "GET",
        url: "http://www.json-generator.com/api/json/get/cfUffYzlmG?indent=2",
        dataType: "text",
        success: (data) => {
            books = JSON.parse(data);
            filterTable(books);
        },
        error: (err) => {
            console.log(err);
        }
    });
    $("#novel").on("click", () => {
        filterTable(books, "novel");
    });
    
    $("#anthology").on("click", () => {
        filterTable(books, "anthology");
    });
});

function filterTable(data, sort){
    switch(sort){
        case "novel": {
            data = data.filter(item => item.kind === "novel");
        }
            break;
        case "anthology": {
            data =  data.filter(item => item.kind === "anthology");
        }
            break;
        default:
            break;
    }
    data = data.slice((0 + page), (10+page) );
    populateTable(data);
}

function populateTable(data){
    $("#myBody").html("");
    
    for(let i = 0; i < data.length; i += 1){
        
        $("#myBody").append(`
            <tr id="row${i}">
                <td id="id${i}">${ID++}</td>
                <td id="kind${i}">${data[i].kind}</td>
                <td id="author${i}">${data[i].author}</td>
                <td id="author${i}">${data[i].title}</td>
                <td id="title${i}">${data[i].publisher}</td>
                <td id="title${i}">${data[i].year}</td>
                <td id="title${i}">${data[i].length}</td>
                <td id="title${i}"> ${data[i].series ? data[i].seriesNumber + "#"+data[i].series : ''}</td>
                <td><button id="del${i}">Del</button><button id="edit${i}">Edit</button><button id="save${i}">Save</button></td>
                <td></td>
            </tr>
        `);
        $(`#save${i}`).hide();
        $(`#del${i}`).off("click").on("click", () => {

            $(`#row${i}`).remove();
            // books = books.filter(item => item.title !== $(`#title${i}`).text());
            // filterTable(books);
        });
        $(`#edit${i}`).on("click", () => {
            let placeHolder = $(`#title${i}`).text();
            $(`#title${i}`).html(`<input type"text" value="${placeHolder}"/>`);
            $(`#edit${i}`).hide();
            $(`#save${i}`).show();
        });
        $(`#save${i}`).on("click", () => {
            let placeHolder = $(`#title${i} input`).val();
            $(`#title${i}`).html(`${placeHolder}`);
            $(`#save${i}`).hide();
            $(`#edit${i}`).show()
        });
    }
}

$("#next").click(function(){
    page +=10;
    filterTable(books);   
}); 

$("#prev").click(function(){ 
        page -=10;
        filterTable(books);  
});
