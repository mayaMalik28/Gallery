'use strict'

function onInit() {
    setBooks();
    renderBooks();
    renderPage();
}

function renderBooks() {
    var books = getBooks();
    var strHTML = books.reduce(function(str, book) {
        return str + `<tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td> &#8362 ${book.price}</td>
            <td><button class="read" onclick="onReadBook('${book.id}')">Read</button></td>
            <td><button class="update" onclick="onUpdatePrice('${book.id}')">Update</button></td>
            <td><button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`
    }, '')
    document.querySelector('tbody').innerHTML = strHTML;
}

function renderPage() {
    document.querySelector('.this-page').innerText = getPage();
}

function onNewBookOption() {
    toggleNewBooksection();
}
//change names

function toggleNewBooksection() {
    var elNewBookSection = document.querySelector('.add-book-modal');
    elNewBookSection.hidden = !elNewBookSection.hidden;
}

function onAddBook() {
    var elName = document.querySelector('.input[name=book-name]');
    var elPrice = document.querySelector('.input[name=book-price]');
    var name = elName.value;
    var price = elPrice.value
    if (!price || !name) return
    addBook(name, price);
    elName.value = '';
    elPrice.value = '';
    renderBooks();
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onUpdatePrice(bookId) {
    var newPrice = +prompt('What is the new price?');
    if (!newPrice) return;
    updateBook(bookId, 'price', newPrice);
    renderBooks();
}

function onReadBook(bookId) {
    document.querySelector('.modal').hidden = false;
    renderModal(bookId);
}

function renderModal(bookId) {
    var elModal = document.querySelector('.modal');
    var book = getBookById(bookId);
    var strHTML = `            
        <h3>${book.name}</h3>
        <p class="deacripton">${book.desc}</p>
        <img class="book-img" src="${book.imgUrl}" alt="">
        <div class="rate">
            <button onclick="onUpdateRate('${bookId}', -1)">-</button>
            <input name=rate type="number" size="2" class="input-rate" readonly value="${book.rate}">
            <button onclick="onUpdateRate('${bookId}', 1)">+</button>
        </div>
        <button onclick="onCloseModal('${bookId}')">Close</button>`
    elModal.innerHTML = strHTML;
}

function onCloseModal(bookId) {
    onUpdateRate(bookId);
    var elModal = document.querySelector('.modal');
    elModal.hidden = true;
}

function onUpdateRate(bookId, num = 0) {
    var elRate = document.querySelector('input[name=rate]');
    var newRate = +elRate.value + num
    var rate = (newRate >= 0 && newRate <= 10) ? newRate : +elRate.value;
    updateBook(bookId, 'rate', rate);
    renderModal(bookId);
}

function onSortBy(sortRefernce) {
    setSortBy(sortRefernce);
    sortBy();
    renderBooks();
}

function onPage(num) {
    movePage(num);
    renderPage();
    renderBooks();
}