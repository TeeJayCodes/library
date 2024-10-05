const myLibrary = [];
const bookShelf = document.querySelector(`.shelf`);

//event listeners for form buttons
let addBookButton = document.querySelector("form button:first-of-type");
addBookButton.addEventListener("click", function(event) {
	 		event.preventDefault(); 	
});
addBookButton.addEventListener("click", function() {
		addBookToLibrary();
 	});

let resetFormButton = document.querySelector("form button:last-of-type");
resetFormButton.addEventListener("click", function(event) {
	 		event.preventDefault(); 	
});
resetFormButton.addEventListener("click", function() {
		resetForm();
 	});


//book constructor
function Book(title, author, numOfPages, read) {
	this.title = title;
	this.author = author;
	this.numOfPages = numOfPages;
	this.read = read;
	if (this.read == true) {
		this.info = `${this.title} by ${this.author}, ${this.numOfPages}, has been read`;
	} else {
		this.info = `${this.title} by ${this.author}, ${this.numOfPages}, has NOT been read`;
	}
	return this.info;
}


function addBookToLibrary(title, author, numOfPages, read) {
	let titleInput = document.querySelector('textarea[name="title"]').value;
	let authorInput = document.querySelector('textarea[name="author"]').value;
	let numberOfPagesInput = document.querySelector('input[name="numberOfPages"]').value;
	let readStatusInput = document.querySelector('input[name="read-status"]:checked').value;
	
	if (titleInput == "" || authorInput == "" || numberOfPagesInput == "") {
		alert("Please complete all fields.");
	} else {
		const BOOK = new Book(titleInput, authorInput, numberOfPagesInput, readStatusInput);
		myLibrary.push(BOOK);
		clearShelf();
		displayBooks();
		resetForm();
	}
}

function resetForm() {
	let form = document.querySelector("form");
	form.reset();
}

function clearShelf() {
	let books = document.querySelectorAll(".shelf > .book");
	books.forEach(book => book.remove());
}

function displayBooks() {
	const bookList = myLibrary.map(bookToDisplay => {
		console.log(bookToDisplay);
		let book = document.createElement("div");
		book.classList.add("book");
		bookShelf.appendChild(book);

		let title = document.createElement("div");
		title.classList.add("title");
		let titleText = document.createTextNode("Title:");
		let titlePara = document.createElement("p");
		titlePara.append(titleText);
		title.appendChild(titlePara);
		let titleInfo = document.createTextNode(`${bookToDisplay.title}`)
		let titleInfoPara = document.createElement("p");
		titleInfoPara.append(titleInfo)
		title.appendChild(titleInfoPara);
		book.appendChild(title);

		let author = document.createElement("div");
		author.classList.add("author");
		let authorText = document.createTextNode("Author:");
		let authorPara = document.createElement("p");
		authorPara.append(authorText);
		author.appendChild(authorPara);
		let authorInfo = document.createTextNode(`${bookToDisplay.author}`)
		let authorInfoPara = document.createElement("p");
		authorInfoPara.append(authorInfo)
		author.appendChild(authorInfoPara);
		book.appendChild(author);

		let pages = document.createElement("div");
		pages.classList.add("numberOfPages");
		let pagesText = document.createTextNode("Number of Pages:");
		let pagesPara = document.createElement("p");
		pagesPara.append(pagesText);
		pages.appendChild(pagesPara);
		let pagesInfo = document.createTextNode(`${bookToDisplay.numOfPages}`)
		let pagesInfoPara = document.createElement("p");
		pagesInfoPara.append(pagesInfo)
		pages.appendChild(pagesInfoPara);
		book.appendChild(pages);

		let read = document.createElement("div");
		read.classList.add("readStatus");
		let readText = document.createTextNode("Read:");
		let readPara = document.createElement("p");
		readPara.append(readText);
		read.appendChild(readPara);
		let readInfo = document.createTextNode(`${bookToDisplay.read}`)
		let readInfoPara = document.createElement("p");
		readInfoPara.append(readInfo)
		read.appendChild(readInfoPara);
		book.appendChild(read);
		
		const BOOK_INFO = `Title: ${bookToDisplay.title} Author: ${bookToDisplay.author} Number of Pages: ${bookToDisplay.numOfPages} Read: ${bookToDisplay.read}`;
	});
}