
let books = [];
let myBooks = [];

if(localStorage["myBooks"])
{
    myBooks = JSON.parse(localStorage["myBooks"]);
}

if(myBooks){
    filterTable(myBooks);
}

    function getData(){
    $.ajax({
        method: "GET",
        url: "http://www.json-generator.com/api/json/get/cfUffYzlmG?indent=2",
        dataType: "text",
        success: (data) => {
            books = data;
            localStorage["books"] = JSON.stringify(books);
            myBooks = JSON.parse(localStorage["books"]);
           // books = JSON.parse(books);
           filterTable(myBooks);
            
        },
        error: (err) => {
            console.log(err);
        }
    });
};
getData();
console.log(myBooks);

    $("#novel").on("click", () => {
        filterTable(books, "novel");
    });
    
    $("#anthology").on("click", () => {
        filterTable(books, "anthology");
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
    populateTable(data);
}

function populateTable(data){
    $("#myBody").html("");
    for(let i = 0; i < data.length; i += 1){
        $("#myBody").append(`
            <tr>
                <td id="kind${i}">${data[i].kind}</td>
                <td id="author${i}">${data[i].author}</td>
                <td id="title${i}">${data[i].title}</td>
                <td><button id="del${i}">Del</button></td>
                <td><button id="edit${i}">Edit</button><button id="save${i}">Save</button></td>
            </tr>
        `);
        $(`#save${i}`).hide();
        
        $(`#del${i}`).off("click").on("click", () => {
            books = books.filter(item => item.title !== $(`#title${i}`).text());
            filterTable(books);
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
            $(`#edit${i}`).show();
        });
    }
}

