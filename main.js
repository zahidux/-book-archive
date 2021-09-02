
const searchBooklist = () => {
    const inputField = document.getElementById('search_text');
    const searchText = inputField.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBookDetails(data.docs));


    // clear input value
    inputField.value = '';

    fetch(url)
        .then(res => res.json())
        .then(data => showResultNumber(data.numFound));
}




// show result number
const showResultNumber = resultNumber => {
    const resultLocation = document.getElementById('num_found');
    const numFound = resultNumber;
    if (numFound !== 0) {
        resultLocation.innerHTML = `
        <span class="text-center">${resultNumber}</span>
        `;
    } else {
        resultLocation.innerHTML = `
        <h1 class="text-danger">Result Not Found</h1>
        `;
    }
}



// Display Book Details
const displayBookDetails = data => {
    const showBook = document.getElementById('show_book_details');

    data.forEach(bookData => {

        // Author Name
        let authorName = bookData.author_name;
        if (authorName === undefined) {
            authorName = 'Out of memory';
        } else {
            authorName = bookData.author_name[0];
        }

        // publisher name
        let publisherName = bookData.publisher;
        if (publisherName === undefined) {
            publisherName = 'Out of memory';
        } else {
            publisherName = bookData.publisher;
        }

        // first publish year
        let publishYear = bookData.first_publish_year;
        if (publishYear === undefined) {
            publishYear = 'Out of memory';
        } else {
            publishYear = bookData.first_publish_year;
        }

        const divBox = document.createElement('div');
        divBox.classList.add('card');
        divBox.innerHTML = `
            <img src="https://covers.openlibrary.org/b/id/${bookData.cover_i}-M.jpg" class="card-img-top">
            <div class="card-body">
                <h4 class="card-title">${bookData.title}</h4>
                <span class="card-title text-danger">Author: ${authorName}</span>
                <h5 class="card-title">Publisher: ${publisherName}</h5>
                <p class="card-text">First published in : ${publishYear}</p>
                <a href="https://openlibrary.org/${bookData.key}" class="btn btn-primary">See more info</a>
            </div>
        `
        showBook.appendChild(divBox);
    });
}