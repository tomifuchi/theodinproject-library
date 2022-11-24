let myLibrary = [];

//ES5 style that means function as constructor
let id = 0;
function Book(title, author, year, genre) {
    this.id = id++;
    this.title = title;
    this.author = author;
    this.genre = genre; //Selected genre
    this.year = year; // Year published
}

function addBookToLibrary(title, author, year, genre) {
    const new_book = new Book(title, author, year, genre);
    myLibrary.push(new_book);

    function pushToBookShelf(book) {
        const book_shelf = document.getElementById('book-shelf');
            /*
            a
              li.book
                .book-cover-container
                  img(src="./img/bookcover_default.png", alt="", srcset="")#cover
                h2#title Title goes here
                h3#author Author goes here
                p#year year goes here
            */
            const list_item_link = document.createElement('a');
            list_item_link.setAttribute('href','#');

            const list_item = document.createElement('li');
            list_item.classList.add('book');


            list_item_link.appendChild(list_item);
            //child 
            const book_cover_container = document.createElement('div');
            book_cover_container.classList.add('book-cover-container');

            const book_cover = document.createElement('img');
            book_cover.setAttribute('src','./img/bookcover_default.png');
            book_cover.setAttribute('alt','Book cover place holder');

            book_cover_container.appendChild(book_cover);

            list_item.appendChild(book_cover_container);
            //child
            const title = document.createElement('h2');
            title.textContent = book.title;

            list_item.appendChild(title);
            //child
            const author = document.createElement('h3');
            author.textContent = book.author;

            list_item.appendChild(author);
            //child
            const year = document.createElement('p');
            year.textContent = book.year;

            list_item.appendChild(year);

            //Push to bookshelf
            book_shelf.appendChild(list_item_link);
    }
    pushToBookShelf(new_book);
}



document.getElementById('book_add').addEventListener('click', () => {
    const title = document.getElementById('book_title');
    const author = document.getElementById('book_author');
    const year  = document.getElementById('book_year');

    addBookToLibrary(title.value, author.value, year.value, 'any');
});