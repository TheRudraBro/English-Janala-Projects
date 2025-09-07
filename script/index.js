const loadLessons=()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all') // promise return
    .then((res)=>res.json())
    .then((json)=>displayLessons(json.data))
      
}
const removeActive=()=>{
    const lessonButtons= document.querySelectorAll('.lesson-btn');
  lessonButtons.forEach(btn=> btn.classList.remove('active'));
}

const loadLevelWord=(id)=>{

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

const LoadWordDetail=async(id)=>{
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
// detailsBox.innerHTML=`

// `

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
    console.log(word);
    const card= document.createElement('div');
    card.innerHTML=`
    <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
<h2 class="font-bold text-xl">${word.word ? word.word :'শব্দ পাওয়া যায়নি।'}</h2>
<p class="font-semibold ">Meaning / Pronounciation</p>
<div class="font-bangla text-xl font-medium">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি।'} / ${word.pronunciation? word.pronunciation : 'Pronunciation পাওয়া যায়নি।'}"</div>
<div class="flex justify-between items-center mt-5">
    <button onclick="LoadWordDetail(${word.id})" class="btn btn-outline btn-primary"><i class="fa-solid fa-circle-info"></i></button>
    <button class="btn btn-outline btn-secondary"><i class="fa-solid fa-volume-high"></i></button>
</div>
</div>
    `;

    wordContainer.append(card);
})
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



