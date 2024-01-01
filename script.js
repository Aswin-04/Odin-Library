const bookGrid = document.querySelector(".book-grid")
const showBookBtn = document.querySelector(".addBook-btn > button");
const dialog = document.querySelector("dialog")
const submitBtn = document.querySelector(".submit")
const form = document.querySelector("form")
const closeBtn = document.querySelector(".close-btn")
const myLibrary = []

function Book(title, author, pageCount, checked) {
    this.title = title
    this.author = author
    this.pageCount = pageCount
    this.checked = checked ? "Read" : "Not read yet"
}

Book.prototype.toggleRead = function() {
    if(this.checked == "Read")  {
        this.checked = "Not read yet"
    }
    else {
        this.checked = "Read"
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)

}

function createCard(book, i) {

    const bookCard = document.createElement("div")
    const title = document.createElement("p")
    const author = document.createElement("p")
    const pageCount = document.createElement("p")
    const readBtn = document.createElement("button")
    const removeBtn = document.createElement("button")

    bookCard.classList.add("book-card")
    readBtn.classList.add("read-status")
    removeBtn.classList.add("remove-btn")
    readBtn.dataset.index = i
    removeBtn.dataset.index = i

    title.textContent = `${book.title}`
    author.textContent = `by ${book.author}`
    pageCount.textContent = `${book.pageCount} Pages`
    readBtn.textContent = `${book.checked}`
    removeBtn.textContent = "Remove"

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pageCount)
    bookCard.appendChild(readBtn)
    bookCard.appendChild(removeBtn)
    bookGrid.appendChild(bookCard)
}

function displayBooks() {

    bookGrid.innerHTML = ""
    let i = 0
    for (const book of myLibrary) {
        createCard(book, i)
        i++
    }
}

const handleSubmit = (event) => {
    const title = document.querySelector(".title").value
    const author = document.querySelector(".author").value
    const pages = document.querySelector(".pages").value
    const checked = document.querySelector("input[type = checkbox]").checked
    
    let newBook = new Book(title, author, pages, checked)
    addBookToLibrary(newBook)
    displayBooks()
    
    dialog.classList.remove("dialog")
    dialog.close()
    form.reset()
    event.preventDefault()
}

const handleRemove = (event) => {
    if(event.target.classList.contains("remove-btn")) {
        let index = event.target.dataset.index
        myLibrary.splice(index, 1)
        displayBooks()
    }
    
    else if(event.target.classList.contains("read-status")) {
        let index = event.target.dataset.index
        myLibrary[index].toggleRead()
        event.target.innerText = myLibrary[index].checked
    }
}

showBookBtn.addEventListener("click", () => {
    dialog.classList.add("dialog")
    dialog.showModal()
})

closeBtn.addEventListener("click", () => {
    dialog.classList.remove("dialog")
    form.reset()
    dialog.close()
})

submitBtn.addEventListener("click", handleSubmit)
bookGrid.addEventListener("click", handleRemove)

const book1 = new Book("Atomic Habits", "James Clear", "320", true)
addBookToLibrary(book1)
displayBooks()