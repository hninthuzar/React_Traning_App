const colors = ['red', 'green', 'blue']


const result = colors.map(function(color){
    return '<li>' + color + '</li>';
});



const result = colors.map(color => `<li>${color}</li>`);
console.log(result);