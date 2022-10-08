console.log("ES6 version of College Library")
showBooks()
class Book{
    constructor(name, author, type){
        this.name= name ;
        this.author = author ;
        this.type = type ;
    }
}

class Display{
    add(book) {
        let tableBody=document.getElementById("tableBody");
        let uiString = `<tr>
          <td>${book.name}</td>
          <td>${book.author}</td>
          <td>${book.type}</td>
      </tr>`;
        tableBody.innerHTML += uiString;
      };

      clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
      };

      validate(book) {
        if (book.name.length < 3 || book.author.length < 2) {
          return false;
        } else {
          return true;
        }
      };

      show(type,displayMessage){
          let boldText;
        if (type ==='success'){
            boldText = "Success";
        }else {
            boldText = "Error";
        }
        document.getElementById('message').innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
          <strong>${boldText} : </strong> ${displayMessage}
        </div>`;
        setTimeout(function() {
            document.getElementById('message').innerHTML = ``
        }, 2000);
      };     
}

// Add submit event listner to libraryForm.
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {

  // For storage in local Storage.
  let books = localStorage.getItem("books");
  if (books== null){
    booksObj = [];
  }else{
    booksObj = JSON.parse(books);
  }
  
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");
  let type;
  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }
  let book = new Book(name, author, type);
  console.log(book);
  
  
  

  let display = new Display();
  if (display.validate(book)) {
    booksObj.push(book);
    localStorage.setItem("books",JSON.stringify(booksObj));
    display.add(book);
    display.clear();
    display.show('success',"Book added sucessfully");
  } else {
    display.show('danger',"Sorry you cannot add this book.")
  }
  showBooks();
  e.preventDefault(); // no default reload
}

function showBooks(){
  let books = localStorage.getItem("books");
  if (books== null){
    booksObj = [];
  }else{
    booksObj = JSON.parse(books);
  }
  let html = "";
  booksObj.forEach(function(element,index){
    html+= `<tr class ="bookbook">
    <td>${element.name}</td>
    <td>${element.author}</td>
    <td>${element.type}</td>
    <td><button type="button" id = "${index}" onclick = "deleteBook(this.id)" class="btn btn-outline-danger">Remove book</button></td>
</tr>`
  })
  let bookElem = document.getElementById("tableBody");
  if (booksObj.length != 0){
    bookElem.innerHTML= html;
  }else{
    bookElem.innerHTML= `<div class = "container my-3" ><h4>No books available . Use add book option to add books</h4><div>`
  }
}

function deleteBook(index){
  if (confirm("Do you want to delete book permanently ?") == true) {
    let books = localStorage.getItem("books");
    if (books == null) {
      booksObj = [];
    } else {
      booksObj = JSON.parse(books);
    }
    booksObj.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(booksObj));
    showBooks();
  } else {
    showBooks();
  }
}

function clearAll(){
  if (confirm("Do you want to delete all books ?") == true){
    localStorage.removeItem('books')
    showBooks();
  }else {
    showBooks();
  }
}


let search = document.getElementById("searchTxt");
search.addEventListener('input',function(){
  alert("Search button under mantainance");
  search.value = "";
//   let inpVal = search.value.toLowerCase();
//   let allBooks = document.getElementsByClassName("bookbook");
//   Array.from(allBooks).forEach(function(element,index){
//     let nameTxt = element.getElementsByTagName('td')[0].innerText;
//     if (nameTxt.toLowerCase().includes(inpVal)){
//       element.style.display = "block";
//     }
//     else {
//       element.style.display= "none";
//     }
//   });
});