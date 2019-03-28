(function(){
  "use strict";

  //Constructor Author
  var Author = function(name){
    this.name = name || "Anonymous";
    this.articles = [];
  };

  //member function
  Author.prototype.writeArticle = function(title){
    this.articles.push(title);
  };

  //member function
  Author.prototype.listArticles = function(){
    return this.name + " has written: " + this.articles.join(", ");
  };

  //make available
  exports.Author = Author;

  //create an object
  var peter = new Author("Peter");
  peter.writeArticle("A Beginners Guide to npm");
  peter.writeArticle("Using npm as a build tool");
  peter.listArticles();
})();
