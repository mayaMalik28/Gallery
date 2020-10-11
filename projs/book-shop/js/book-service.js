'use strict'

var gBooks;
var BOOKS_KEY = 'booksDB'
var gSortedBy;
var PAGE_SIZE = 4;
var gPageIdx = 0;

function setBooks() {
    var books = getFromLocalStorage(BOOKS_KEY);
    if (!books || books.length === 0) {
        books = [
            _createBook('The Alchemist', 100, './imgs/Badolina.png'),
            _createBook('Badolina', 80, './imgs/The Alchemist.png'),
            _createBook('The Da Vinci Code', 50, './imgs/The Da Vinci Code.png')
        ]
    }
    gBooks = books;
    _saveBooksToLocal();
}

function getBooks() {
    var fromIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(fromIdx, fromIdx + PAGE_SIZE)
}

function getPage() {
    return gPageIdx + 1
}

function movePage(num = 1) {
    gPageIdx += num;
    console.log(gPageIdx * PAGE_SIZE >= gBooks.length);
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
    if (gPageIdx * PAGE_SIZE < 0) gPageIdx = Math.ceil(gBooks.length / PAGE_SIZE) - 1
    console.log(gPageIdx);
}

function _createBook(name, price = 50, imgUrl = './imgs/books.jpg') {
    return {
        id: makeId(3),
        name,
        price,
        imgUrl,
        rate: 0,
        desc: 'description',
    }
}

function getBookById(bookId) {
    var book = gBooks.find(function(book) {
        return (book.id === bookId)
    })
    return book;
}

function addBook(name, price) {
    var book = _createBook(name, price);
    gBooks.unshift(book);
    _saveBooksToLocal()
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return (book.id === bookId)
    })
    if (bookIdx >= 0) {
        if (confirm('are you sure?')) gBooks.splice(bookIdx, 1);
        _saveBooksToLocal();
    }
}

function updateBook(bookId, propName, propVal) {
    var book = getBookById(bookId);
    book[propName] = propVal;
    _saveBooksToLocal();
}

function setSortBy(sortRefernce) {
    gSortedBy = sortRefernce;
}

function sortBy() {
    gBooks.sort(function(a, b) {
        console.log(a[gSortedBy], b[gSortedBy]);
        return (a[gSortedBy] > b[gSortedBy]) ? 1 : (a[gSortedBy] < b[gSortedBy]) ? -1 : 0;
    })
}

function _saveBooksToLocal() {
    saveInLocalStorage(BOOKS_KEY, gBooks);
}