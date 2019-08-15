 
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.parallax');
     M.Parallax.init(elems, options);
   
});

let posts;
const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    posts = data.posts;
    console.log(posts, 'from posts');
   const postWrapper =  document.querySelector('#posts');
   let newsPosted;
    Array.from(posts).forEach(post => {
        newsPosted += `<li class="collection-item  avatar">
           <img src='${post.imageUrl}' alt="" class="circle materialboxed">
               <span class="title">${post.title}</span>
               <p>${post.mainContent}</p>
                   <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
        </li>
        `
       });
       postWrapper.innerHTML= newsPosted;
    console.log(newsPosted)
      }  
      
const fetchEvents = async () => {
    const res = await fetch('/api/events');
    const data = await res.json();
    events = data.Events;
    console.log(events, 'from events');
    const postWrapper = document.querySelector('#events');
    let newEvent;
    Array.from(events).forEach(event => {
        newEvent += `<div class="col s12 m7">
            <h2 class="header">${event.name}</h2>
            <div class="card horizontal">
            <div class="card-image">
                <img src="${event.image}">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                <p>${event.description}</p>
                </div>
                <div class="card-action">
                <a href="${event.confirm}">please confirm your attendance</a>
                </div>
            </div>
            </div>
        </div>
        `
    });
    postWrapper.innerHTML = newEvent;
    console.log(newEvent)
}  
