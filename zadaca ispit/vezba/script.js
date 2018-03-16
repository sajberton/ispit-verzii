$(document).ready(function () {

    $("#pull").on("click", function () {
        function TableData(data) {

            let booksArray = [];
            let tbody = $("#tbody");
           

            
            console.log(data.items)
            for (let i = 0; i < data.items.length; i++) {
                let row = $("<tr>").appendTo(tbody);
                $("<td>").text(data.items[i].volumeInfo.title).appendTo(row);
                $("<td>").text(data.items[i].volumeInfo.authors).appendTo(row);
                $("<td>").text(data.items[i].volumeInfo.publisher).appendTo(row);
                $("<td>").text(data.items[i].volumeInfo.publishedDate).appendTo(row);
                $("<td>").text(data.items[i].volumeInfo.pageCount).appendTo(row);
                $("<img>").attr("src", data.items[i].volumeInfo.imageLinks.smallThumbnail).appendTo(row);

            };

        };

        


        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: 'https://www.googleapis.com/books/v1/volumes?q=subject+anthology',

            success: function (data) {
                
                TableData(data);

            }


        });

    })
});

