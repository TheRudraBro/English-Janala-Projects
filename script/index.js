const loadLessons=()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all') // promise return
    .then((res)=>res.json())
    .then((json)=>displayLessons(json.data))
      
}
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const removeActive=()=>{
    const lessonButtons= document.querySelectorAll('.lesson-btn');
  lessonButtons.forEach(btn=> btn.classList.remove('active'));
}

const manageSpinner=(status)=>{
    if(status===true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }else{
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('word-container').classList.remove('hidden');
    }
}

const loadLevelWord=(id)=>{
manageSpinner(true);
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        removeActive(); // remove active class from all buttons
        const clickBtn=document.getElementById(`lesson-btn-${id}`);
        // console.log(clickBtn);
        clickBtn.classList.add('active');// add active class to the clicked button
        displayLevelWord(data.data);
      
    });



}
// {
//     "word": "Friend",
//     "meaning": "বন্ধু",
//     "pronunciation": "ফ্রেন্ড",
//     "level": 2,
//     "sentence": "She is my best friend.",
//     "points": 2,
//     "partsOfSpeech": "noun",
//     "synonyms": [
//         "companion",
//         "buddy",
//         "pal"
//     ],
//     "id": 96
// }





const LoadWordDetail=async(id)=>{
    manageSpinner(true);
    const url=`
    https://openapi.programming-hero.com/api/word/${id}
    `;
    const res=await fetch(url);
    const details=await res.json();
    displayWordDetails(details.data);
}
const displayWordDetails=(word)=>{
console.log(word);
const detailsBox = document.getElementById('details-container');
detailsBox.innerHTML=`

<div class="">
<h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>    : ${word.pronunciation})</h2>
</div>

<div class="">
<h2 class="font-bold">Meaning</h2>
<p class="font-bangla">${word.meaning}</p>
</div>


<div class="">
<h2 class="font-bold">Example</h2>
<p class="">${word.sentence}</p>
</div>


<div class="">
<h2 class="font-bold">Synonyms</h2>
<span class="btn">${word.synonyms[0]}</span>
<span class="btn">${word.synonyms[1]}</span>
<span class="btn">${word.synonyms[2]}</span>
</div>


`;
manageSpinner(false);
document.getElementById('word_modal').showModal();
}
const displayLevelWord=(words)=>{
const wordContainer=document.getElementById('word-container');
wordContainer.innerHTML='';
if(words.length===0){
wordContainer.innerHTML=
` <div class="text-center col-span-full py-10 space-y-6">
        <img class='items-center mx-auto' src="Images/alert-error.png" alt="">
        <p class="font-bangla text-base font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bangla text-3xl font-bold">নেক্সট Lesson এ যান</h2>
       </div>`;
       manageSpinner(false);
    return;
}
// {
    
//     "id": 102,
//     "level": 2,
//     "word": "Night",
//     "meaning": "রাত্রি",
//     "pronunciation": "নাইট"

// }
words.forEach(word =>{
    // console.log(word);
    const card= document.createElement('div');
    card.innerHTML=`
    <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
<h2 class="font-bold text-xl sm:text-2xl">${word.word ? word.word :'শব্দ পাওয়া যায়নি।'}</h2>
<p class="font-semibold ">Meaning / Pronounciation</p>
<div class="font-bangla text-lg sm:text-xl font-medium break-words">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি।'} / ${word.pronunciation? word.pronunciation : 'Pronunciation পাওয়া যায়নি।'}"</div>
<div class="flex flex-col sm:flex-row justify-between items-center mt-5 gap-2">
    <button onclick="LoadWordDetail(${word.id})" class="btn btn-outline btn-primary w-full sm:w-auto"><i class="fa-solid fa-circle-info"></i></button>
    <button onclick="pronounceWord('${word.word}')" class="btn btn-outline btn-secondary w-full sm:w-auto"><i class="fa-solid fa-volume-high"></i></button>
</div>
</div>
    `;

    wordContainer.append(card);
})
 wordContainer.className = 'bg-gray-100 p-5 w-11/12 mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5';

manageSpinner(false);
}
const displayLessons=lessons=>{
    // 1. get the container and empty
    const levelContainer=document.getElementById('level-container');

    // 2. Get into every lesson
    for(let lesson of lessons){
    // 3. Create element
    console.log(lesson);
    const btnDiv=document.createElement('div');
    btnDiv.innerHTML=`
<button id='lesson-btn-${lesson.level_no}' 
onClick="loadLevelWord( ${lesson.level_no})" 
class="btn btn-outline btn-primary lesson-btn" href=""><i class="fa-solid fa-circle-question"></i> Lesson - ${lesson.level_no}</button>
    `;

    // 4. Append child to the container
    levelContainer.append(btnDiv);
}
}
loadLessons();


document.getElementById('btn-search').addEventListener('click',()=>{
    removeActive();
    const input=document.getElementById('input-search');
    const searchValue=input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch('https://openapi.programming-hero.com/api/words/all')
    .then((res)=>res.json())
    .then((data)=>
      {
          const allWords=data.data;
          const filteredWords=allWords.filter(word=>word.word.toLowerCase().includes(searchValue));
          displayLevelWord(filteredWords);
      });
    

})
