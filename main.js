const myLibrary = [
    new Book("Cutting for Stone", "Abraham Verghese", 500, true),
    new Book("The Bible", "Jesus", 1000, true),
    new Book("Everyone Poops", "Taro Gomi", 32, true)
];

// BOOK CONSTRUCTOR
function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.getInfo = function() {
        console.log(`${title} by ${author} has ${pages} pages. Have read?  ${haveRead}`)
    };
}

Book.prototype.toggleReadStatus = function() {
    this.haveRead = !this.haveRead;
};

function displayBooks() {
    const booksIndex = document.getElementById('books-index');
    booksIndex.innerHTML = ''; // Clear the list before displaying

    myLibrary.forEach((book, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} by ${book.author}, ${book.pages} pages. Have read? ${book.haveRead}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.setAttribute('data-index', index);
        deleteButton.addEventListener('click', (e) => {
            const bookIndex = e.target.getAttribute('data-index');
            removeBook(bookIndex);
        });
        
        // Create toggle read status button
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle Read Status';
        toggleButton.setAttribute('data-index', index);
        toggleButton.addEventListener('click', (e) => {
            const bookIndex = e.target.getAttribute('data-index');
            myLibrary[bookIndex].toggleReadStatus();
            displayBooks();
        });

        listItem.appendChild(deleteButton);
        listItem.appendChild(toggleButton);
        booksIndex.appendChild(listItem);
    });
}

// GLOBAL VARIABLES
const form = document.getElementById('book-form');

// USER ADD BOOK TO LIBRARY
function addBookToLibrary(book) {
    myLibrary.push(book)
    displayBooks();
    form.style.display = 'none';
}

// USER REMOVE BOOK FROM LIBRARY
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

document.addEventListener('DOMContentLoaded', () => {
    displayBooks();

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const haveRead = document.getElementById('haveRead').checked;

        const newBook = new Book(title, author, pages, haveRead);
        addBookToLibrary(newBook);

        form.reset(); // Reset the form after submission
    });

    // TOGGLING THE NEW BOOK FORM
    const newBookBtn = document.getElementById('new-book-btn');

    // Hide form initially
    form.style.display = 'none';

    // Toggle form visibility when "NEW BOOK" button is clicked
    newBookBtn.addEventListener('click', () => {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });
});

