let exploreBtn = document.querySelector('.title .btn'),
    HadithSection = document.querySelector('.hadith');

exploreBtn.addEventListener('click', () => {
    HadithSection.scrollIntoView({
        behavior: 'smooth'
    })
})

// header
let fixedNav = document.querySelector('.header'),
    scrollBtn = document.querySelector('.scrollBtn');
window.addEventListener('scroll', () => {
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active')
    window.scrollY > 500 ? scrollBtn.classList.add('active') : scrollBtn.classList.remove('active')
})
scrollBtn.addEventListener('click' ,()=>{
   // window.scrollTo(0,0)
   window.scrollTo({
    top:0,
    behavior: 'smooth'
   })
})

///////////////////////////////////////////////////////////////////
// hadith  section
let hadithContainer = document.querySelector('.hadithContainer'),
    next = document.querySelector('.buttons .next'),
    number = document.querySelector('.buttons .number'),
    prev = document.querySelector('.buttons .prev');

let hadithIndex = 0;
HadithChange();
function HadithChange() {
    fetch("https://api.hadith.gading.dev/books/muslim?range=1-300")
        .then(response => response.json())
        .then(data => {
            let Hadith = data.data.hadiths;
            changeHadith();

            next.addEventListener('click', () => {
                hadithIndex === 299 ? hadithIndex = 0 : hadithIndex++;
                changeHadith()
            })

            prev.addEventListener('click', () => {
                hadithIndex === 0 ? hadithIndex = 299 : hadithIndex--;
                changeHadith()
            })


            function changeHadith() {
                hadithContainer.innerText = Hadith[hadithIndex].arab;
                number.innerText = `300 - ${hadithIndex + 1}`
            }
        })
}

/////////////////////////////////////////////////////////////////////
// link section
let sections = document.querySelectorAll("section"),
    links = document.querySelectorAll('.header ul li');

links.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active')
        let target = link.dataset.filter;
        sections.forEach(section => {
            if (section.classList.contains(target)) {
                section.scrollIntoView({
                    behavior: 'smooth'
                })
            }
        })
    })
})


/////////////////////////////////////////////////////////////////////
// Quran Section
let surahsContainer = document.querySelector('.surahsContainer');
getSurahs()
function getSurahs() {
    // fetch surahs meta data {Name of surahs}
   // fetch('http://api.alquran.cloud/v1/meta ')
   fetch('https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json')
        .then(response => response.json())
        .then(data => {
            let surahs = data;
            let number_of_surah = 114;
            surahsContainer.innerHTML = ""

            for (let i = 0; i < number_of_surah; i++) {
                surahsContainer.innerHTML +=
                    `   <div class="surah">
                            <p>${surahs[i].name_translations.ar}</p>
                            <p>${surahs[i].name}/p>
                           
                        </div>  `

            }
            /////////////////////////////////////////////////////////////////
            //pop up
            let SunahsTitels = document.querySelectorAll('.surah');
            let popup = document.querySelector('.surah-popup'),
                AyatContainer = document.querySelector('.ayat');

            SunahsTitels.forEach((title, index) => {
                title.addEventListener('click', () => {
                    //fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                    fetch(`https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${index+1}.json`)
                        .then(response => response.json())
                        .then(data => {
                            AyatContainer.innerHTML = ""
                            let Ayat = data.verses;
                            Ayat.forEach(aya => {
                                popup.classList.add('active');
                                AyatContainer.innerHTML +=
                                    `<p>(${aya.number}) - ${aya.text}</p>`
                            })
                        })
                })
            })
            let closePopup = document.querySelector('.close-popup')
            closePopup.addEventListener('click', () => {
                popup.classList.remove('active')
            })
        })
}

////////////////////////////////////////////////////////////////////////////////////
/** PrayTime Section */
let cards = document.querySelector('.cards')
getPrayTime()
function getPrayTime() {
    fetch('https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt%20Arab%20Emirates&method=8')
   // fetch('https://muslimsalat.com/egypt.json?key=api_key')
        .then(response => response.json())
        .then(data => {
            let times = data.data.timings;
            cards.innerHTML = ""
            for (let time in times) {
                cards.innerHTML +=
                    ` <div class="card">
                         <div class="circle">
                           <svg>
                              <Circle cx="100" cy="100" r="100"></Circle>
                           </svg>
                           <div class="prayTime">${times[time]}</div>
                        </div>
                        <p>${time}</p>
                     </div> `
            }
        })
}

////////////////////////////////////////////////////////////////////////////
//Active SideBar 
 let bars = document.querySelector('.bars'),
    sideBar = document.querySelector('.header ul');

bars.addEventListener('click' , ()=>{
    sideBar.classList.toggle('active')
})



//https://api.hadith.gading.dev/books/muslim?range=1-300
//http://api.alquran.cloud/v1/meta
//https://www.youtube.com/embed/watch?v=631L-aGzfAE
//http://api.aladhan.com/v1/timingsByCity/29-10-2023?city=cairo&country=Egypt&method=8



//https://api.quran.com/api/v4/quran/verses/indopak
//https://api.quran.com/api/v4/chapters
//https://dailyprayer.abdulrcs.repl.co/api/Egypt


//https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/1.json
//https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json
