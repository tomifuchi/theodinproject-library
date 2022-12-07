let myLibrary = [];

//ES5 style that means function as constructor
function Book(title, author, year, genre, read) {
    this.title = title;
    this.author = author;
    this.genre = genre; //Selected genre
    this.year = year; // Year published
    this.read = read; //Have you read the book ?
    this.id = Book.index++;//Simple but this will do for now
}

//Using index like this is fine, but to a certain point, because when we remove items,
//it will not fill the empty index but kept counting forward. So, this is not optimal.
//Ideally we want the index to be unique. And simple to maintain.
Book.index = 0;

//Create a new book push to myLibrary and associate it with the DOM element
//Create a DOM element then push to the DOM element list aswel
function addBookToLibrary(title, author, year, genre, read) {
    const new_book = new Book(title, author, year, genre, read);
    myLibrary.push(new_book);

    function pushToBookShelf(book) {
        const book_shelf = document.getElementById('book-shelf');
            /*
              li.book.not-read //Default is not read class is applied
                a
                  .book-cover-container
                    img(src="./img/bookcover_default.png", alt="", srcset="")#cover
                  h2.title Title goes here
                  h3.author Author goes here
                  p.year year goes here
                .book-operation-container
                  button.remove Remove item
                  button.read Read
            */
            const list_item_link = document.createElement('a');
            list_item_link.setAttribute('href','#');
            list_item_link.setAttribute('data-book-index',book.id);

            const list_item = document.createElement('li');
            list_item.classList.add('book');

            list_item.appendChild(list_item_link);
            //child 
            const book_cover_container = document.createElement('div');
            book_cover_container.classList.add('book-cover-container');

            const book_cover = document.createElement('img');
            book_cover.setAttribute('src','./img/bookcover_default.png');
            book_cover.setAttribute('alt',`${book.title} cover place holder`);

            book_cover_container.appendChild(book_cover);

            list_item_link.appendChild(book_cover_container);
            //child
            const title = document.createElement('h2');
            title.classList.add('title');
            title.textContent = book.title;

            list_item_link.appendChild(title);
            //child
            const author = document.createElement('h3');
            author.classList.add('author');
            author.textContent = book.author;

            list_item_link.appendChild(author);
            //child
            const year = document.createElement('p');
            year.classList.add('year');
            year.textContent = book.year;
            list_item_link.appendChild(year);


            //child
            const book_operation_container = document.createElement('div');
            book_operation_container.classList.add('book-operation-container');

            //subchild
            const remove_button = document.createElement('button');
            //This might not be a good way to do it, but this is ok I guess
            remove_button.innerHTML= 'Remove item ' + '<i class="fa-solid fa-trash-can"></i>';
            remove_button.addEventListener('click', () => {
                //As simple as it gets
                myLibrary.splice(myLibrary.indexOf(myLibrary.filter(item => item.id == book.id)[0]), 1);
                book_shelf.removeChild(list_item);
            });
            remove_button.classList.add('remove');
            book_operation_container.appendChild(remove_button);

            //subchild
            const read_button = document.createElement('button');
            //This too, might not be a good way to do it, but this is ok I guess
            read_button.innerHTML = 'Read ' + '<i class="fa-solid fa-book"></i>';
            read_button.addEventListener('click', () => {
                book.read = (book.read == true) ? false:true; 
                list_item.classList.toggle('did-read');
            });
            read_button.classList.add('read');
            book_operation_container.appendChild(read_button);

            list_item.appendChild(book_operation_container);

            //Read check mark if read
            if(book.read){
                list_item.classList.toggle('did-read');
            }
            
            //Push to bookshelf
            book_shelf.appendChild(list_item);
    }
    pushToBookShelf(new_book);
}

//Book form handling
const book_add_form = document.getElementById('book_add_form');
const book_add_btn = document.getElementById('book_add_btn');
book_add_btn.addEventListener('click', () => {
    if(book_add_form.reportValidity()){
        const title = document.getElementById('book_title').value;
        const author = document.getElementById('book_author').value;
        const year  = document.getElementById('book_year').value;
        const genre = document.getElementById('book_genre').value;
        const wasRead = (document.getElementById('book_not_read').checked == true) ? false:true;

        //If the work is unique to the library add the work
        /*
            Some idea how the title_id should comprise. Each work first to get it here
            the work must have an id. This id consists of author and title id
            attached together
            like say
            Friedrich Neitzsche has an id of #0103
            Thus Spoke Zarathustra has an id of #1011
            Then the author_title_id will be #0103#1011
            With this id the work will always be unique even with the same work
            published twice with different contents inside !

            Like say there's another Friedrich Neitzsche, but his id is #1004
            and the same Thus Spoke Zarathustra is #2033
            The work is #1004#2033

            The idea is, give everything and everyone a unique ID then we should have
            our own database of author ids, title ids. Anything put on here gets crosschecked
            with our own database then each of them will be unique. Or so I thought
            this might be flawed, but I'm just throwing out ideas that's all
            like so
            author_id = {
                friedrichNeitzsche: '#0103',
                aynRand: '#1234',
                ...,
            }

            title_id = {
                'thus spoke zarathustra': '#1011',
                'the gay science': '#1253',
                ...,
            }

            Associates the author id with title id when creating title. So that an author can
            have duplicate name work with no probem.

            Just an idea that's all.
        */
        if(!isDuplicate('')){
            book_add_form.reset(); //Reset the form after submit
            addBookToLibrary(title, author, year, genre, wasRead);
        }
    }
});

function isDuplicate(author_title_id) {
    //Look for tittle_id in the database
    //If it's already one then it's a duplicate
    //I'm not implementing the damn thing. For now
    //This will always return false
    return false;
}

function randomDate() {
    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    return `${randInt(1900, 1999)}-${randInt(1,12)}-${randInt(1,31)}`;
}

//Sample items
addBookToLibrary('Catcher in the Rye', 'JD Catlinger', randomDate(), 'drama', true);
addBookToLibrary('Thus spoke Zarathustra', 'Friedrich Neitzsche', randomDate(),'Philosophy', false);
addBookToLibrary('Intelligent Investor', 'Warrent Buffett', randomDate(), 'Finance', true);
addBookToLibrary('Something', 'Someone', randomDate(), 'Horror', false);
addBookToLibrary('Another', 'Someone', randomDate(), 'Scifi', false);
addBookToLibrary('Catcher in the Rye', 'JD Catlinger', randomDate(), 'drama', true);
addBookToLibrary('Thus spoke Zarathustra', 'Friedrich Neitzsche', randomDate(),'Philosophy', false);
addBookToLibrary('Catcher in the Rye', 'JD Catlinger', randomDate(), 'drama', true);
addBookToLibrary('Thus spoke Zarathustra', 'Friedrich Neitzsche', randomDate(),'Philosophy', false);
addBookToLibrary('Intelligent Investor', 'Warrent Buffett', randomDate(), 'Finance', true);
addBookToLibrary('Something', 'Someone', randomDate(), 'Horror', false);
addBookToLibrary('Another', 'Someone', randomDate(), 'Scifi', false);
addBookToLibrary('Catcher in the Rye', 'JD Catlinger', randomDate(), 'drama', true);
addBookToLibrary('Thus spoke Zarathustra', 'Friedrich Neitzsche', randomDate(),'Philosophy', false);