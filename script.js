const bookLibrary = (function() {

    //Variables
    let myLibrary = [];
    //Cache
    const book_shelf = document.getElementById('book-shelf');
    const book_add_form = document.getElementById('book_add_form');
  

    /* Private methods */
    /* ES5 constructor
    function _Book(title, author, year, genre, read) {
        this.title = title;
        this.author = author;
        this.genre = genre; 
        this.year = year; 
        this.read = read; 
        this.id = _Book.index++;
        this.domElement = _createItemFromTemplate(this);
        _bindItemEvents(this);
    }
    */

    //Factory pattern
    function _Book(title, author, year, genre, read){
        let book = {
            title, 
            author, 
            year, 
            genre, 
            read,
            id: _Book.index++,
        }
        book.domElement = _createItemFromTemplate(book);
        _bindItemEvents(book);

        return book;
    }
    _Book.index = 0;

    function _createItemFromTemplate(book){
        /* In pug 
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
        remove_button.classList.add('remove');
        book_operation_container.appendChild(remove_button);

        //subchild
        const read_button = document.createElement('button');
        //This too, might not be a good way to do it, but this is ok I guess
        read_button.innerHTML = 'Read ' + '<i class="fa-solid fa-book"></i>';
        read_button.classList.add('read');
        book_operation_container.appendChild(read_button);

        list_item.appendChild(book_operation_container);

        //Read check mark if read
        if(book.read){
            list_item.classList.toggle('did-read');
        }

        return list_item;
    }

    function _bindItemEvents(book){
        //Remove button 
        book.domElement.querySelector('.remove').addEventListener('click', () => {
            //As simple as it gets
            //Filter -> Get the index of it -> Splice.
            myLibrary.splice(myLibrary.indexOf(myLibrary.filter(item => item.id == book.id)[0]), 1);
            book_shelf.removeChild(book.domElement);
        });
        //Read button
        book.domElement.querySelector('.read').addEventListener('click', () => {
            book.read = (book.read == true) ? false:true; 
            book.domElement.classList.toggle('did-read');
        });
    }

    function _pushToDOM(book) {
        //Push to DOM 
        book_shelf.appendChild(book.domElement);
    }

    //Binding submit to add button form.
    const book_add_btn = _query_form('#book_add_btn');
    book_add_btn.addEventListener('click', (function _submit() {
        if(book_add_form.reportValidity()){
            if(!_isDuplicate('')){
                addBookToLibrary(
                    _query_form('#book_title').value,
                    _query_form('#book_author').value,
                    _query_form('#book_year').value,
                    _query_form('#book_genre').value,
                    (_query_form('#book_not_read').checked == true) ? false:true
                );
                book_add_form.reset(); //Reset the form after submit
            }
        }
    }));

    function _query_form(selector){
        return book_add_form.querySelector(selector);
    }

    function _isDuplicate(author_title_id) {
        //Look for tittle_id in the database
        //If it's already one then it's a duplicate
        //I'm not implementing the damn thing. For now
        //This will always return false
        return false;
    }

    /* Public methods */
    function addBookToLibrary(title, author, year, genre, read) {
        const new_book = _Book(
            title || 'Unknown title', 
            author || 'John Doe',
            year || 'Unknown',
            genre || 'Unknown',
            read || false
        );
        myLibrary.push(new_book);
        _pushToDOM(new_book);
    }
    
    function randomDate() {
        function randInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }
        return `${randInt(1900, 1999)}-${randInt(1,12)}-${randInt(1,31)}`;
    }

    function getLibrary() {
        //Create deep copy so they can't share the same reference point
        return JSON.parse(JSON.stringify(myLibrary));
        //This is a shallow copy
        //return myLibrary;
    }

    return {
        addBookToLibrary, randomDate, getLibrary
    };
})();

//Sample items
bookLibrary.addBookToLibrary('Catcher in the Rye', 'JD Catlinger', bookLibrary.randomDate(), 'drama', true);
bookLibrary.addBookToLibrary('Thus spoke Zarathustra', 'Friedrich Neitzsche', bookLibrary.randomDate(),'Philosophy', false);
bookLibrary.addBookToLibrary('Intelligent Investor', 'Warrent Buffett', bookLibrary.randomDate(), 'Finance', true);
bookLibrary.addBookToLibrary('Something', 'Someone', bookLibrary.randomDate(), 'Horror', false);
bookLibrary.addBookToLibrary('Another', 'Someone', bookLibrary.randomDate(), 'Scifi', false);
bookLibrary.addBookToLibrary('Catcher in the Rye', 'JD Catlinger', bookLibrary.randomDate(), 'drama', true);
bookLibrary.addBookToLibrary('Thus spoke Zarathustra', 'Friedrich Neitzsche', bookLibrary.randomDate(),'Philosophy', false);
bookLibrary.addBookToLibrary('Catcher in the Rye', 'JD Catlinger', bookLibrary.randomDate(), 'drama', true);
bookLibrary.addBookToLibrary('Thus spoke Zarathustra', 'Friedrich Neitzsche', bookLibrary.randomDate(),'Philosophy', false);
bookLibrary.addBookToLibrary('Intelligent Investor', 'Warrent Buffett', bookLibrary.randomDate(), 'Finance', true);
bookLibrary.addBookToLibrary('Something', 'Someone', bookLibrary.randomDate(), 'Horror', false);
bookLibrary.addBookToLibrary('Another', 'Someone', bookLibrary.randomDate(), 'Scifi', false);
bookLibrary.addBookToLibrary('Catcher in the Rye', 'JD Catlinger', bookLibrary.randomDate(), 'drama', true);
bookLibrary.addBookToLibrary('Thus spoke Zarathustra', 'Friedrich Neitzsche', bookLibrary.randomDate(),'Philosophy', false);