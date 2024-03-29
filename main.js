function highlight([first, ...firstRes], ...reslast) {
    return reslast.reduce((init, currentValues) => [...init, `<span>${currentValues}</span>`, firstRes.shift()], [first]).join('');
}

var brand = 'F8';
var course = 'javascript';

const htmls = highlight `Học lập trình  ${course} tại ${brand} học kỳ 1`;
console.log(htmls);