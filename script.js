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
}

//Book prototype function to toggle read status
Book.prototype.toggleReadStatus = function() {
	if (this.read == "No") {
		this.read = "Yes";
	} else {
		this.read = "No";
	}
};

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
		let book = document.createElement("div");
		book.classList.add("book");
		bookShelf.appendChild(book);
		//book title
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
		//book author
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
		//number of book pages
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
		//book read status
		let read = document.createElement("div");
		read.classList.add("readStatus");
		let readText = document.createTextNode("Read:");
		let readPara = document.createElement("p");
		readPara.append(readText);
		read.appendChild(readPara);
		let readInfo = document.createTextNode(`${bookToDisplay.read}`)
		let readInfoPara = document.createElement("p");
		readInfoPara.append(readInfo);
		read.appendChild(readInfoPara);
		book.appendChild(read);
		//add a button to toggle the read status of a book
		let toggleReadStatusButton = document.createElement("button");
		toggleReadStatusButton.textContent = "Toggle Read Status";
		book.append(toggleReadStatusButton);
		toggleReadStatusButton.addEventListener("click", function() {
			bookToDisplay.toggleReadStatus();
			readInfo.textContent = bookToDisplay.read;
		});
		//add a button to delete a book
		let deleteBookButton = document.createElement("button");
		deleteBookButton.textContent = "Delete Book";
		book.append(deleteBookButton);
		deleteBookButton.addEventListener("click", function() {
			let deletedBookIndex = myLibrary.indexOf(bookToDisplay);
			myLibrary.splice(deletedBookIndex, 1);
			book.remove();
		});
	});
}