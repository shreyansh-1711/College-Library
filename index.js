console.log("Work in Progress");

// Constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// Display Constructor
function Display() {}

// Add methods to display prototype
Display.prototype.add = function (book) {
  let tableBody = document.getElementById("tableBody");
  let uiString = `<tr>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
</tr>`;
  tableBody.innerHTML += uiString;
};
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

Display.prototype.validate = function (book) {
  if (book.name.length < 3 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.show = function(type,displayMessage){
  document.getElementById('message').innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message : </strong> ${displayMessage}
  </div>`
  setTimeout(function() {
      document.getElementById('message').innerHTML = ``
  }, 2000);
};

// Add submit event listner to libraryForm.
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
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
    display.add(book);
    display.clear();
    display.show('success',"Book added sucessfully");
  } else {
    display.show('danger',"Sorry you cannot add this book.")
  }

  e.preventDefault(); // no default reload
}