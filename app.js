const form = document.querySelector("#book-form");
const Bookslist = document.querySelector(".collection");
const BooksInput = document.querySelector("#book");
const filterInput = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-books");

loadventListeners();

function loadventListeners(){
    //load tasks frol local storag, if there are any
    document.addEventListener('DOMContentLoaded', getBooks);
    //add a task event
    form.addEventListener('submit', addBooks);
    //Remove task
    Bookslist.addEventListener('click', removeBooks);
    //clear all tasks
    clearBtn.addEventListener('click', clearBooks);
    //filter tesks
    filterInput.addEventListener('keyup', filterBooks)
}

//get tasks from local storage
function getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    }else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach(function(book){
        //create an li element
        const li = document.createElement('li');
        //add class name to the li element
        li.className = 'collection-item';
        //create a textnode and append it to the li
        li.appendChild(document.createTextNode(book));

        const link = document.createElement('a');
        //add a class to the a element 
        link.className = 'delete-item secondary-content';
        link.innerHTML = 'X';
        li.appendChild(link);
        Bookslist.appendChild(li);

    });

}

function addBooks(event){
    //check for empty input
    if(BooksInput.value === ''){
        alert('Enter a book')
    }
    //crate an li element to add to the ul
    const li = document.createElement('li');
    //add a class name to the li element
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(BooksInput.value));
    //create a new anchor element
    const link = document.createElement('a');
    //add a class to the a element 
    link.className = 'delete-item secondary-content';
    link.innerHTML = 'X';
    li.appendChild(link);
    Bookslist.appendChild(li);

    //store in LocalStorage
    storeInLocalStorage(BooksInput.value);
    BooksInput.value = '';

    event.preventDefault();
}

function storeInLocalStorage(book) {
    //declare an array to read from the local storage
    console.log(BooksInput.value);
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    }else{
        books = JSON.parse(localStorage.getItem('books'));
    }

    //add a task to the tasks array
    books.push(book);
    localStorage.BooksItem('books', JSON.stringify(books));

}
function removeTask(event){

    if(event.target.classList.contains('delete-item')){

        if(confirm('Are you sure you want to delete the book')){
            event.target.parentElement.remove();


            //Remove from local storag
            removeBookFromLocalStorage(event.target.parentElement);
        }
    }
}

function removeBookFromLocalStorage(bookItem){
    let books;

    if(localStorage.getItem('books') ===null){
        books = [];
    }else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach(function(book,index){
        if(bookItem.textContent.slice(0, -1) === book){
            books.splice(index, 1);
        }
    });
    localStorage.setItem('books', JSON.stringify(books));

}

function clearBooks(){
    if(confirm('Are you sure you want to delete the book')){
    while(booklist.firstChild){
        booklist.removeChild(booklist.firstChild);
        }
    }
}

function filterBooks(event){
    const userFilter = event.target.value.toLowerCase();
    
    document.querySelectorAll(".collection-item").forEach(function(book){
        const item = book.firstChild.textContent;
        if(item.toLowerCase().indexOf(userFilter) != -1){
            book.style.display = 'block';
        }else{
            book.style.display = 'none';
        }
    });
}