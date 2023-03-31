const access_key = "sLS-ySUsYyE_t5yIrHWOGzbqECligXLVrmie0P01vsU"
// const access_key = "kXCsOpq2WqH9iNUIvu6hdJw3HH8mlUArSnPIWAVrCYU"


let searchParam = location.search.split('=').pop();
let page = 1;
const perPage = 12;
// const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=12`

const gallery = document.querySelector('.gallery');

let currentImage = 0;
// stores all the images
let allImages;

const getImages =() =>{
    const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=${perPage}&page=${page}`;

    fetch(random_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        createImages(allImages);
    })
}
const searchImages = () => {
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&count=${perPage}&page=${page}`;

    fetch(search_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data.results;
        createImages(allImages);
    });
}




const createImages = (data) =>{
    console.log(data)
    let boxIndex = 0;
    let galleryBoxes = document.querySelectorAll('.gallery-box');

    data.forEach((elem,index)=> {
        if(index % 3 === 0){
            boxIndex++;
        }

        if(boxIndex > galleryBoxes.length){
            boxIndex = 1;
        }

        let img = document.createElement('img');
        img.src = elem.urls.regular;
        img.className = 'gallery-img';

        galleryBoxes[boxIndex-1].appendChild(img);

        img.addEventListener('click', ()=>{
            currentImage = index;
            showPopup(elem);

        })
    });

}

const showPopup = (item) => {
    let popup = document.querySelector('.popup-window')
    const downloadBtn = document.querySelector('.download-btn');
    const closeBtn = document.querySelector('.close-btn');
    const image = document.querySelector('.popup-img');

    popup.classList.remove('hide');
    downloadBtn.href = item.links.html;
    image.src = item.urls.regular;

    closeBtn.addEventListener('click', () => {
        popup.classList.add('hide');
    })


}

if(searchParam == ''){
    getImages();
} else{
    searchImages();
}



// controls button
const loadMoreBtn = document.getElementById('load-more-btn');
const prevBtns = document.querySelector('.prev-btn');
const nextBtns = document.querySelector('.next-btn');


const loadMore = () => {
    page++;
    getImages();
}

loadMoreBtn.addEventListener('click', loadMore);

prevBtns.addEventListener('click',()=>{
    if(currentImage > 0){
        currentImage--;
        showPopup(allImages[currentImage])
    }
})

nextBtns.addEventListener('click', () => {
    if(currentImage < allImages.length - 1){
        currentImage++;
        showPopup(allImages[currentImage]);
    }
})


// CSS Effects 

// logo effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelector("h1").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
}

// stars effect

let index = 0,
    interval_star = 1000;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 1000);
  }, index++ * (interval_star / 3))
}

