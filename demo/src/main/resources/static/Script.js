var allGroups;
var currentLibrary;
var currentBook;

function LoadLibrary(id){
    $.ajax({
        url: "/library/getbyid/" + id,
        type: "GET"
    }).done((data) =>{
        currentLibrary.genre = data.genre;
        currentLibrary.books = data.books;
        UpdateTable(true);
        UpdateSelect(true);
    })
}

function UpdateSelect(selectCurrentLibrary = false) {
    let select = "";
    for(let i = 0; i < allGroups.length; i++){
        select += "<option value='" + allGroups[i].id +"'>" + allGroups[i].genre + "</option>";
    }
    $("#librarySelect").html(select);
    if(selectCurrentLibrary){
        $("#librarySelect").val(currentLibrary.id);
    }
    $("#librarySelect").trigger("change");
}

function SelectBook() {
    if(currentBook == undefined){
        $("#currentBookName").prop( "disabled", true );
        $("#currentBookAuthor").prop( "disabled", true );
        $("#currentBookButton").prop( "disabled", true );
    } else {
        $("#currentBookName").prop( "disabled", false );
        $("#currentBookAuthor").prop( "disabled", false );
        $("#currentBookButton").prop( "disabled", false );
        $("#currentBookName").val(currentBook.name);
        $("#currentBookAuthor").val(currentBook.author);
          }
}

function SelectLibrary() {
    if(currentLibrary == undefined){
        $("#currentLibraryGenre").prop( "disabled", true );
        $("#currentLibraryButton").prop( "disabled", true );
    } else {
        $("#currentLibraryGenre").prop( "disabled", false );
        $("#currentLibraryButton").prop( "disabled", false );
        $("#currentLibraryGenre").val(currentLibrary.genre);
    }
}

function DeleteBook(id) {
    $.ajax({
        url: "/book/deletebyid/" + id,
        type: "DELETE"
    }).done((data) =>{
        LoadLibrary(currentLibrary.id);
    })
}

function DeleteLibrary() {
    $.ajax({
        url: "/library/deletebyid/" + currentLibrary.id,
        type: "DELETE"
    }).done((data) =>{
        currentLibrary = undefined;
        GetAllGroups();
    })
}

function UpdateBook() {
    let book = {};
    book.id = currentBook.id;
    book.name = $("#currentBookName").val();
    book.author = $("#currentBookAuthor").val();
    book.library = currentBook.library;
    currentBook = book;
    $.ajax({
        url: "/book/update",
        data: JSON.stringify(book),
        type: "POST",
        contentType: "application/json"
    }).done((data) =>{
        LoadLibrary(currentLibrary.id);
    })
}

function UpdateLibrary() {
    let library = {};
    library.id = currentLibrary.id;
    library.genre = $("#currentLibraryGenre").val();
    $.ajax({
        url: "/library/update",
        data: JSON.stringify(library),
        type: "POST",
        contentType: "application/json"
    }).done((data) =>{
        LoadLibrary(currentLibrary.id);
    })
}

function AddBook() {
    let book = {};
    book.name = $("#newBookName").val();
    book.author = $("#newBookAuthor").val();
    book.library = currentLibrary;
    $.ajax({
        url: "/book/create",
        data: JSON.stringify(book),
        type: "POST",
        contentType: "application/json"
    }).done((data) =>{
        LoadLibrary(currentLibrary.id);
    })
}

function AddLibrary() {
    let library = {};
    library.genre = $("#newLibraryGenre").val();
    $.ajax({
        url: "/library/create",
        data: JSON.stringify(library),
        type: "POST",
        contentType: "application/json"
    }).done((data) =>{
        GetAllGroups();
    })
}

function UpdateTable(selectCurrentBook = false) {
    currentBook = undefined;
    if(currentLibrary != undefined ) {
        let tableBody = "";
        for (let i = 0; i < currentLibrary.books.length; i++) {
            tableBody += "<tr class='tableRow' id='" + currentLibrary.books[i].id + "'>" +
                "<th>" + currentLibrary.books[i].name + "</th>" +
                "<th>" + currentLibrary.books[i].author + "</th>" +
                "<th><button class='deleteButton'>X</button></th>" +
                "</tr>";
        }

        $("#tableBody").html(tableBody);

        $(".tableRow > th").unbind("click").bind("click", (e) => {
            let id = $(e.currentTarget.parentElement).attr("id");
            for (let i = 0; i < currentLibrary.books.length; i++) {
                if (currentLibrary.books[i].id == id) {
                    currentBook = currentLibrary.books[i];
                    SelectBook();
                    break;
                }
            }
        });
        $(".deleteButton").unbind("click").bind("click", (e) => {
            let id = $(e.currentTarget.parentElement.parentElement).attr("id");
            DeleteBook(id);
        });

        if (currentBook != undefined && selectCurrentBook) {
            for (let i = 0; i < currentLibrary.books.length; i++) {
                if (currentLibrary.books[i].id == currentLibrary.id) {
                    currentBook = currentLibrary.books[i];
                    break;
                }
            }
        } else if (currentLibrary.books.length > 0) {
            currentBook = currentLibrary.books[0];
        }
    } else {
        $("#tableBody").html("");
    }
    SelectBook();
}

function GetAllGroups(){
    $.ajax({
        url: "/library/getall"
    }).done((data) =>{
        allGroups = data;
        UpdateSelect()
    });
}


$(document).ready(() => {
    $("#librarySelect").unbind("change").bind("change", () => {
        let id = $("#librarySelect").val();
        for(let i = 0; i < allGroups.length; i++){
            if(allGroups[i].id == id){
                currentLibrary = allGroups[i];
                break;
            }
        }
        UpdateTable();
        SelectLibrary();
    });

    $("#libraryDelete").unbind("click").bind("click", (e) =>{
        DeleteLibrary();
    });

    $("#currentLibraryButton").unbind("click").bind("click", (e) =>{
        UpdateLibrary();
    });

    $("#newLibraryButton").unbind("click").bind("click", (e) =>{
        AddLibrary();
    });

    $("#currentBookButton").unbind("click").bind("click", (e) =>{
        UpdateBook();
    });

    $("#newBookButton").unbind("click").bind("click", (e) =>{
        AddBook();
    });

    GetAllGroups();
});