{
  'use strict';

  const select = {
    templateOf: {
      bookCover: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      form: '.filters',
    },
    book: {
      image: 'book__image',
    }        
  };

  const templates = {
    bookCover: Handlebars.compile(document.querySelector(select.templateOf.bookCover).innerHTML)};

  const classNames = {
    favoriteBook: 'favorite',
    hidden: 'hidden',
  };
  
  class BooksList {
    constructor(data){
      const thisBooksList = this;
      thisBooksList.data = data;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }
        
    initData(){
      this.data = dataSource.books;
      //const thisBooksList = this;
      //thisBooksList.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;
      thisBooksList.menuContainer = document.querySelector(select.containerOf.booksList);
      thisBooksList.formHtmlFiltered = document.querySelector(select.containerOf.form);
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    render() {
      const thisBooksList = this;
            
      for (let element of dataSource.books){
        element.ratingBgc = thisBooksList.determineRatingBgc(element.rating);        
        element.ratingWidth = element.rating * 10;        
        const generatedHTML = templates.bookCover(element);
        const elementMain = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.menuContainer.appendChild(elementMain);                
      }
    }

    filterBooks() {
      const thisBooksList = this;
      for (let element of dataSource.books) {
        let shouldBeHidden = false;
        for (let filter of thisBooksList.filters){
          if(!element.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const book = document.querySelector('.book__image[data-id="' + element.id + '"]');
        if (shouldBeHidden) {          
          book.classList.add(classNames.hidden);            
        } else {          
          book.classList.remove(classNames.hidden);            
        }        
      }
    }

    determineRatingBgc(rating){
        const thisBooksList = this;

        if(rating <6){
            thisBooksList.background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';            
        } else if (rating > 6 && rating <=8){
            thisBooksList.background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
        } else if (rating > 8 && rating <=9){
            thisBooksList.background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        } else if (rating > 9){
            thisBooksList.background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        }
        return thisBooksList.background;

    }

    

    initActions(){
      const thisBooksList = this;

      thisBooksList.menuContainer.addEventListener('dblclick', function(event) {
        event.preventDefault();

        const element = event.target.offsetParent;
        if(element.classList.conatins(select.book.image)){
          const id = element.getAttribute('data-id');
          if(thisBooksList.favoriteBooks.includes(id)) {
            const bookIndex = thisBooksList.favoriteBooks.indexOf(id);
            element.classList.remove(classNames.favoriteBook);
            thisBooksList.favoriteBooks.splice(bookIndex, 1);
          }
          else {
            element.classList.add(classNames.favoriteBook);
            thisBooksList.favoriteBooks.push(id);
          }
        }
      });

      thisBooksList.formHtmlFiltered.addEventListener('change', function(event){
        event.preventDefault();
        const element = event.target;
        if (element.type === 'checkbox'){
          if(element.checked){
            thisBooksList.filters.push(element.value);

          } else {
            const filterIndex = thisBooksList.filters.indexOf(element.value);
            thisBooksList.filters.splice(filterIndex, 1);
          }
        }
        thisBooksList.filterBooks();
      });
    }
  }

  const app = {
    initProject: function(){
      new BooksList();
    }
  };
  app.initProject();
}