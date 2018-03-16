let books = [];
//let myBooks = JSON.parse(localStorage["myBooks"]);
let maxsize=0;
let page=0;
let tempbooks = [];

$(document).ready(() => {
    $.ajax({
        method: "GET",
        //url:"books.json",
        //url: "http://www.json-generator.com/api/json/get/ctNQWlNVMy?indent=2",
        url: "http://www.json-generator.com/api/json/get/cfUffYzlmG?indent=2",
        //dataType: "json",
        success: (data) => {
            books = data;
            for(let i = 0; i  < books.length; i++){
                books[i].id = (i+1);
            }            
            tempbooks = sortTable(books,sort);
            localStorage["books"] = JSON.stringify(books);
            books = JSON.parse(localStorage["books"]);
            filterTable(books);
            console.log(books);
        },
        error: (err) => {
            console.log(err);
        }
    });
 
    $("#getData").on("click", () => {
        populateTable(books);
    });

    $("#novel").on("click", () => {  
       page=0;
       tempbooks = filterTable(books, "novel");   
    });
    
    $("#anthology").on("click", () => {
        page=0;
        tempbooks = filterTable(books, "anthology");
        sortTable(data,sort);
    });

    $("#sort").on("change", () => {
        let sort=$("#sort").val();
       tempbooks = sortTable(tempbooks,sort);
    });

    $("#next").on("click", () => {
        if(maxsize > parseInt(page+10))
        {
           page +=10; 
           if(tempbooks.length == 0) {tempbooks=books;}
           filterTable(tempbooks);
        }
    }); 
    
    $("#prev").on("click", () => {
        if(page != 0)
         {
            page -=10;
            if(tempbooks.length == 0) {tempbooks=books;}
            filterTable(tempbooks);
        }    
    });

    $("#insert").on("click", (e) => {
        e.preventDefault();

        let newBook = new Object();
        newBook.id = books.length+1;
        newBook.kind = $("#kindAdd").val().toLowerCase();
        newBook.title =  $("#titleAdd").val().toLowerCase();  
        newBook.author = $("#authorAdd").val().toLowerCase();
        newBook.publisher = $("#publisherAdd").val().toLowerCase();
        newBook.year = $("#yearAdd").val();
        newBook.length= $("#lengthAdd").val();    
        books.push(newBook);    
        console.log(newBook);

//ova dole ke raboti bez reset button
        // resetForm();
        //  function resetForm(){
        // //    //document.contact-form.submit();
        // //     //document.contact-form.reset();
        //     document.form.reset();
        // }
        filterTable(books);
        console.log(books)        
    });

    $('#configreset').click(function(){
        document.form.reset();
    });
          
function filterTable(data, filter){
    switch(filter){
        case "novel": {
            data = data.filter(item => item.kind === "novel");
        }
            break;
        case "anthology": {
            data =  data.filter(item => item.kind === "anthology");
        }
            break;
        default: {
            break;
        }
    }
    maxsize = data.length;
    let tempdata = data.slice((0 + page), (10 + page));
    populateTable(tempdata);   
    return data;
}

function sortTable(data,sort){  
        switch(sort){        
            case '1': // Kind
                data = data.sort((a,b) => a.kind.localeCompare(b.kind));          
                break;
            case '2': // Title
                data = data.sort((a,b) => a.title.localeCompare(b.title));                
                break;
            case '3': // Author
                data.sort((a, b) => (a.author ? a.author.localeCompare(b.author) : a.editor.localeCompare(b.editor)));               
                break;           
            case '4': // Publisher
                data = data.sort((a,b) => a.publisher.localeCompare(b.publisher));                              
                break;    
            case '5': // Release Year
                data = data.sort((a,b) => (a.year - b.year));                
                break;
            case '6': // Length
                data = data.sort((a,b) => (a.length - b.length)); 
            // case '0':
            // data = books;  od mene e dodadeno                
            default:
                break;
        }
        populateTable(data);
        return data;
}
     

$("#console").click(function(){
    console.log(books);
});

$("#local_storage").click(function () {
    console.log(books);

});

function populateTable(data){{  
    $("#myBody").html("");
    for(let i = 0; i < data.length; i += 1){

        let serial = "";
		if(data[i].series != null) { serial = `${data[i].seriesNumber} #${data[i].series}`};
        $("#myBody").append(`
            <tr>
               <td id="id${i}">${data[i].id}</td>
                <td id="kind${i}">${data[i].kind}</td>
                <td id="title${i}">${data[i].title}</td>
                <td id="author${i}">${data[i].author || data[i].editor}</td>
                <td id="publisher${i}">${data[i].publisher}</td>
                <td id="year${i}">${data[i].year}</td>
                <td id="length${i}">${data[i].length}</td>
                <td id='series${i}'>${serial}</td>
                <td><button id="del${i}">xXx</button></td>
                <td><button id="edit${i}">Edit</button><button id="save${i}">Save</button></td>
                <td><button id="preview${i}">Preview<a id="href${i}" href="preview/preview.html">Read More</a></button></td>                
            </tr>`
        ); 
       
        $(`#save${i}`).hide();
        $(`#del${i}`).off("click").on("click", () => {
            books = books.filter(item => item.title !== $(`#title${i}`).text());
            localStorage["books"] = JSON.stringify(books);
            filterTable(books);    
        });

        $(`#edit${i}`).on("click", () => {
            let pl = $(`#kind${i}`).text();
            let pl1 = $(`#title${i}`).text();
            let pl2 = $(`#author${i}`).text();
            let pl3 = $(`#publisher${i}`).text();
            let pl4 = $(`#year${i}`).text();
            let pl5 = $(`#length${i}`).text();

            let pl6 =   $(`#series${i}`).text();
            
        
            $(`#kind${i}`).html(`<input type"text" value="${pl}"/>`);
            $(`#title${i}`).html(`<input type"text" value="${pl1}"/>`);
            $(`#author${i}`).html(`<input type"text" value="${pl2}"/>`);
            $(`#publisher${i}`).html(`<input type"text" value="${pl3}"/>`);
            $(`#year${i}`).html(`<input type"text" value="${pl4}"/>`);
            $(`#length${i}`).html(`<input type"text" value="${pl5}"/>`);  
            $(`#series${i}`).html(`<input type"text" value="${pl6}"/>`);

            $(`#edit${i}`).hide();
            $(`#save${i}`).show();
        });
        $(`#save${i}`).on("click", () => {
            
            let p = $(`#kind${i} input`).val()   //.toLowerCase();
            let p1 = $(`#title${i} input`).val()  //.toLowerCase();
            let p2 = $(`#author${i} input`).val();
            let p3 = $(`#publisher${i} input`).val();
            let p4 = $(`#year${i} input`).val();
            let p5 = $(`#length${i} input`).val();
            
            let p6 = $(`#series${i}`).val();

            $(`#kind${i}`).html(`${p}`);
            $(`#title${i}`).html(`${p1}`);
            $(`#author${i}`).html(`${p2}`);
            $(`#publisher${i}`).html(`${p3}`);
            $(`#year${i}`).html(`${p4}`);
            $(`#length${i}`).html(`${p5}`);

            $(`#series${i}`).html(`${p6}`);

             books[i].kind = p;
             books[i].title = p1;
             books[i].author = p2;
             books[i].publisher = p3;
             books[i].year = p4;
             books[i].length = p5;
             books[i].series = p6;
     

            $(`#save${i}`).hide();
            $(`#edit${i}`).show()
           
            localStorage["books"] = JSON.stringify(books);
            //books = JSON.parse(localStorage["books"]);
            filterTable(books);
        });

        $(".slide-down").click(function(){
            $(".box").slideDown();
            $("#content").css("display","block");
                
        });
        $(".slide-up").click(function(){
            $(".box").slideUp();
                
        });
    } 
}

}

});

//Opcii za validacija samo ne mi se dopraveni

// $('.needs-validation').focus(function(){
//     $(this).data('placeholder',$(this).attr('placeholder'))
//            .attr('placeholder','');
//  }).blur(function(){
//     $(this).attr('placeholder',$(this).data('placeholder'));
//  });

var isKindValid = false
var isTitleValid = false
var isAuthorValid = false
var isPublisherValid = false
$("#kindAdd").change(function(){
    if(this.value.length == 0 || this.value.length > 10){
        $(this).css("border","1px solid red");
        alert("Please enter a valid kind");
    }   
    else{
        $(this).css("border","1px solid green");
        isKindValid = true;
    }
    
});

$("#titleAdd").change(function(){
    if(this.value.length == 0 || this.value.length > 30){
        $(this).css("border","1px solid red");
        alert("Please enter a valid title");
    }   
    else{
        $(this).css("border","1px solid green");
        isTitleValid = true;
    }
    
});

$("#authorAdd").change(function(){
    //let str = typeOf(this.value) === "string"; 
    //let str = ($.type(this.value) === "string");
    //var stringOnly = /^[A-Za-z]+$/;
    if(this.value.length == 0 || this.value.length > 20){
        $(this).css("border","1px solid red");
        alert("Please enter a valid author");
        $(this).val("");
    }   
    else{
        $(this).css("border","1px solid green");
        isAuthorValid = true;
    }
    
});
$("#publisherAdd").change(function(){
    if(this.value.length == 0 || this.value.length > 20){
        $(this).css("border","1px solid red");
        alert("Please enter a valid publisher");
    }   
    else{
        $(this).css("border","1px solid green");
        isPublisherValid = true;
    }
    
});

$("#yearAdd").change(function(){
    var number = parseInt(this.value);
    if(this.value.length == 0 || this.value.length != 4 || this.value == isNaN(number)){
        $(this).css("border","1px solid red");
        alert("Please enter a valid year");
    }   
    else{
        $(this).css("border","1px solid green");
        isPublisherValid = true;
    }
    
});

//var isEmailValid = false;
//var isPasswordValid = false;
//var isMaticenValiden = false;
//var isPhoneNumberValid = false;
//var isAddressValid = false;
//var isAddressNumValid = false;
// $("#email").change(function(){
//     if(!this.value.includes("@")){
//         $(this).css("border","1px solid red");
//     }
//     else{
//         $(this).css("border","1px solid black");
//         isEmailValid = true;
//     }
    
// });

// $("#password").change(function(){
//     if(this.value.length < 10){
//         $(this).css("border","1px solid red");
//     }
//     else{
//         $(this).css("border","1px solid black");
//         isPasswordValid = true;
        
//     }
    
// });

// $("#maticen").focusout(function(){
//     var number = parseInt(this.value);

//     if(this.value.length == 12  || isNaN(number)){
//         $(this).css("border","1px solid red");
//     }
//     else{
//         $(this).css("border","1px solid black");
//         isMaticenValiden = true;
//     }
// });

// $("#telefon").on("input", function(){
//         if(this.value.length === 4){
//             $(this).val(this.value + "-");
//         }
//     var numberArray = this.value.split("-");
//     var firstNumber = parseInt(numberArray[0]);
//     var secondNumber = parseInt(numberArray[1]);

//     if(numberArray.length != 2 || this.value.length != 8  || isNaN(firstNumber) || isNaN(secondNumber)){
//         $(this).css("border","1px solid red");
//     }
//     else{
//         $(this).css("border","1px solid black");
//         isPhoneNumberValid = true;
//     }

// });
// $("#adresa").focusout(function(){
//     if(this.value.length == 0){
//         $(this).css("border","1px solid red");
//     }
//     else{
//         $(this).css("border","1px solid black");
//         isAddressValid = true;
//     }
// });

// $("#adresaBr").focusout(function(){
//     if(this.value.length == 0){
//         $(this).css("border","1px solid red");
//     }
//     else{
//         $(this).css("border","1px solid black");
//         isAddressNumValid = true;
//     }
// });
// $("#next").click(function(){

//     var currentElement = $(".active");
//     var nextElement = currentElement.next();
//     var idCurrentElement = currentElement.attr("id");
//     var isValid = validateAndSetLocalStorage(idCurrentElement);
//     if(nextElement.attr("id") === "three"){
//         showInfo();
//     }
//     if(nextElement.is("div") === true){
//         if(isValid){
//         currentElement.removeClass("active");
//         nextElement.addClass("active");
//         }
//     }
// });

// $("#prev").click(function(){
//     var currentElement = $(".active");
//     var prevElement = currentElement.prev();
//     if(prevElement.is("div") === true){

//     currentElement.removeClass("active");
//     prevElement.addClass("active");
//     }
// });

// function validateAndSetLocalStorage(id){
//     var isValid = false;
//     switch(id){
//         case "one":
//             isValid = isEmailValid && isPasswordValid;

//             if(isValid){
//                 localStorage.setItem("email",$("#email").val());
//                 localStorage.setItem("password",$("#password").val());
//             }
//         break;
//         case "two":
//             isValid = isMaticenValiden && isPhoneNumberValid && isAddressValid && isAddressNumValid;
//             if(isValid){
//                 localStorage.setItem("maticen",$("#maticen").val());
//                 localStorage.setItem("telefon",$("#telefon").val());
//                 localStorage.setItem("adresa",$("#adresa").val());
//                 localStorage.setItem("adresaBr",$("#adresaBr").val());
//             }
//         break;
//         default:
//         break;

//     }

//     return isValid;
   
// }

// function showInfo(){
//     $("#email_val").text(localStorage.getItem("email"));
//     $("#password_val").text(localStorage.getItem("password"));
//     $("#embg_val").text(localStorage.getItem("maticen"));
//     $("#phone_val").text(localStorage.getItem("telefon"));
//     $("#address_val").text(localStorage.getItem("adresa"));
//     $("#addressNum_val").text(localStorage.getItem("adresaBr"));
// }
