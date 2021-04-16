//constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

//display constructor
function Display() {}
//Add methods to display prototype
Display.prototype.add = function (book) {
  console.log("Adding to UI");
  let tableBody = document.getElementById("tableBody");
  let uiString = `
                        <tr>

                             <td>${book.name}</td>
                             <td>${book.author}</td>
                             <td>${book.type}</td>
                        </tr>`;
  tableBody.innerHTML += uiString;
};

//Clear the form
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");

  libraryForm.reset();
};
//Implement the Validate Function
Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById("displayMessage");
  let boldText;
  if (type === "success") {
    boldText = "Sucess";
  } else {
    boldText = "Error";
  }
  message.innerHTML = `
     <div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>${boldText} :</strong> ${displayMessage}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
  setTimeout(function () {
    message.innerHTML = "";
  }, 4000);
};

Display.prototype.keep = function () {
  let books = localStorage.getItem("books");
};
//Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log(`You've submitted the form`);
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;

  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let nonFiction = document.getElementById("nonFiction");

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (nonFiction.checked) {
    type = nonFiction.value;
  }

  let book = new Book(name, author, type);
  console.log(book);

  let books = localStorage.getItem("books");
  let booksObj;
  if (books == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(books);
  }
  let myBooksObj = {
    bookName: book.name,
    bookAuthor: book.author,
    bookType: book.type,
  };
  booksObj.push(myBooksObj);
  localStorage.setItem("books", JSON.stringify(booksObj));

  let display = new Display();
  display.validate(book);
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", ` Your book has been succesfully added!!`);
  } else {
    display.show("danger", ` Sorry you can't add this Book!`);
  }
  display.keep();
  e.preventDefault();
}
