const createElement=(arr)=>{
const htmlElements= arr.map(el => `span class="btn">${el}</span>`).join(' ');
console.log(htmlElements);
}

const synonyms=['hello','hi','greetings'];
createElement(synonyms);