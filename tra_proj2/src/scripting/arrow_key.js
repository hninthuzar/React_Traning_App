const f1 = function (value) {
  return value * 2;
};

const f1 = (value) => value * 2;

console.log(f1(2));

//----------------------------- //

const books = [
  { id: 1, favorite: true },
  { id: 2, favorite: false },
];

const myFavorite = books.filter(function (book) {
  return book.favorite;
});


const myFavorite = books.filter((book) => book.favorite );
