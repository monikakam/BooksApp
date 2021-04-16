{
    'use strict';

    const select = {
        templateOf: {
            bookCover: '#template-book',
        },
        containerOf: {
            booksList: '.books-list',
        },        
    };
  
    class BooksList {
        constructor(data){
            const thisBooksList = this;
            thisBooksList.data = data;
            thisBooksList.initData();
            thisBooksList.getElements();
            thisBooksList.render();
        }
        
        initData(){
            const thisBooksList = this;
            thisBooksList.data = dataSource.books;
        }

        render() {
            const thisBooksList = this;
            
            for (const elem of dataSource.books){

                const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCover).innerHTML);
                const generatedHTML = bookTemplate(elem);
                const element = utils.createDOMFromHTML(generatedHTML);
                const bookVisible = document.querySelector(select.containerOf.booksList);
                bookVisible.appendChild(element);                
            }
        }

        getElements(){
            const thisBooksList = this;
            thisBooksList.booksList = document.querySelector(select.containerOf.booksList);            
        }
    }

    const app = {
        initProject: function(){
            new BooksList();
        }
    };
    app.initProject();
}