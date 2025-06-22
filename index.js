let library = []

class Book {
  constructor(title, author, numberOfPages, isRead) {
    this.id = crypto.randomUUID() // Generate random ID
    this.title = title
    this.author = author
    this.numberOfPages = numberOfPages
    this.isRead = isRead
  }

  toggleIsRead() {
    this.isRead = !this.isRead
  }
}

const displayBooks = library => {
  const libraryEl = document.getElementById('library')
  libraryEl.innerHTML = '' // Clear existing list items

  library.forEach(book => {
    const listEl = document.createElement('li')
    listEl.id = book.id

    const titleEl = document.createElement('h3')
    titleEl.textContent = book.title

    const authorEl = document.createElement('p')
    authorEl.textContent = `by ${book.author}`

    const pagesEl = document.createElement('p')
    pagesEl.textContent = `pages: ${book.numberOfPages}`

    const isReadEl = document.createElement('p')
    isReadEl.textContent = 'was read: '

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Remove'
    deleteBtn.addEventListener('click', () => {
      const bookEl = document.getElementById(book.id)
      bookEl.remove()
      const idxDelete = library.findIndex(b => b.id === book.id)
      library.splice(idxDelete, 1)
    })

    const deleteIconEl = document.createElement('i')
    deleteIconEl.className = 'fa-solid fa-trash'
    deleteBtn.prepend(deleteIconEl)

    const toggleIsReadBtn = document.createElement('button')
    toggleIsReadBtn.textContent = `${book.isRead ? ' read' : ' not read'}`
    const isReadIconEl = document.createElement('i')
    isReadIconEl.className = book.isRead
      ? 'fa-solid fa-circle-check'
      : 'fa-solid fa-circle-xmark'
    toggleIsReadBtn.prepend(isReadIconEl)
    toggleIsReadBtn.addEventListener('click', () => {
      book.toggleIsRead()
      displayBooks(library)
    })

    listEl.append(
      titleEl,
      authorEl,
      pagesEl,
      isReadEl,
      deleteBtn,
      toggleIsReadBtn
    )
    libraryEl.appendChild(listEl)
  })
}

const addBookToLibrary = bookData => {
  const newBook = new Book(
    bookData.title,
    bookData.author,
    bookData.numberOfPages,
    bookData.isRead
  )
  library.push(newBook)
  displayBooks(library)
}

// handle dialog
const dialog = document.querySelector('dialog')
const showButton = document.querySelector('dialog + button')
const closeButton = document.querySelector('dialog button')

showButton.addEventListener('click', () => dialog.showModal())
closeButton.addEventListener('click', () => dialog.close())

// Get the formData
const form = document.querySelector('form')

form.addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(form)

  const title = formData.get('title')
  const author = formData.get('author')
  const numberOfPages = Number(formData.get('numberOfPages'))
  const isRead = formData.get('isRead') === 'on'

  addBookToLibrary({ title, author, numberOfPages, isRead })
  form.reset()
  dialog.close()
})

displayBooks(library)
