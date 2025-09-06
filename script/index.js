const loadLessons=()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all') // promise return
    .then(res=>res.json())
    .then(json=>console.log(json.data))
}
const displayLesson=(lessons)=>{
//    1. get the container & empty
const levelContainer=document.getElementById('level-container');
levelContainer.innerHTML="";
//   2. get into every lessons
for(let lesson of lessons){
// 3. create element

const btnDiv=document.createElement('div');
btnDiv.innerHTML=`
<button class="btn btn-outline btn-primary">
<i class="fa-solid fa-book-open"></i> Lesson
</button>
`;
// 4. append child to container
levelContainer.appendChild(btnDiv);


}
};
loadLessons();