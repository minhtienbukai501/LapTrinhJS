const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);





const heading = $('header h2')
const cbThumb = $('.cd-thumb')
const audio = $('#audio')
const cdRadius = $('.cd');
const playMusic = $('.btn-toggle-play');
const player = $('.player');
const sliderPlay = $('.progress');
const nextBtn = $('.btn-next');
const preBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');


const app = {
    currentIndex: 0,
    listMusic: [{
            name: 'Không Thấy Ngày Về',
            singer: 'Lã Phong Lâm',
            path: './assets/music/khongthayngayve.mp3',
            image: './assets/img/khongthayngayve.png'
        },

        {
            name: 'Con Bướm Xuân',
            singer: 'Hồ Quang Hiếu',
            path: './assets/music/conbuomxuan.mp3',
            image: './assets/img/conbuomxuan.png'
        },


        {
            name: 'Ba Kể Con Nghe',
            singer: 'Bấp Bênh Team',
            path: './assets/music/bakeconnghe.mp3',
            image: './assets/img/bakeconnghe.png'
        },


        {
            name: 'Dogs',
            singer: 'Hbov',
            path: './assets/music/dogs.mp3',
            image: './assets/img/dogs.png'
        },


        {
            name: 'Hoa Nở Không Màu',
            singer: 'Hoài Lâm',
            path: './assets/music/hoanokhongmau.mp3',
            image: './assets/img/hoanokhongmau.png'
        },


        {
            name: 'Đời Là Thế Thôi',
            singer: 'Phú Lê',
            path: './assets/music/doilathethoi.mp3',
            image: './assets/img/doilathethoi.png'
        },



    ],
    isPlaying: false,
    isActiveRandom: false,
    isActiveRepeat: false,
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.listMusic[this.currentIndex];
            }
        })
    },

    render: function() {
        const htmls = this.listMusic.map(song => {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>        
            `
        })

        $('.playlist').innerHTML = htmls.join('');

    },
    handleEvents: function() {

        // xứ lý rotate cd
        const animate = cbThumb.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 10000,
            iterations: Infinity
        })

        console.log(animate);
        animate.pause();


        const cdWidth = cdRadius.offsetWidth;
        // xử lý phóng to thu nhỏ
        document.onscroll = function() {
            const scrollTop = document.documentElement.scrollTop || window.scrollY;
            const newCdWidth = cdWidth - scrollTop;
            cdRadius.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cdRadius.style.opacity = newCdWidth / cdWidth;
        }

        // xử lý play/pause
        playMusic.onclick = function() {
            if (app.isPlaying) {
                audio.pause();

            } else {

                audio.play();

            }

        }

        // khi song play
        audio.onplay = function() {
            app.isPlaying = true;
            player.classList.add('playing');
            animate.play();
        }


        // khi song pause 
        audio.onpause = function() {
            app.isPlaying = false;
            player.classList.remove('playing');
            animate.pause();
        }

        audio.ontimeupdate = function() {
            if (audio.duration) {
                sliderPlay.value = audio.currentTime / audio.duration * 100;
            }

            if (audio.duration === audio.currentTime) {
                if (app.isActiveRandom) {
                    app.randomSong();
                } else if (app.isActiveRepeat) {
                    app.repeatSong();
                } else {
                    app.nextSong();
                }
                audio.play();
            }

        }


        // tua video 
        sliderPlay.onchange = function() {
            const time = (sliderPlay.value / 100);
            audio.currentTime = time * audio.duration;
        }


        // next bài hát
        nextBtn.onclick = function() {
            app.nextSong();
            audio.play();
        }

        preBtn.onclick = function() {
                app.preSong();
                audio.play();
            }
            // random bài hát
        randomBtn.onclick = function() {
            if (!app.isActiveRepeat) {
                app.isActiveRandom = !app.isActiveRandom;
                this.classList.toggle('active', app.isActiveRandom);
            }

        }

        repeatBtn.onclick = function() {
            if (!app.isActiveRandom) {
                app.isActiveRepeat = !app.isActiveRepeat;
                this.classList.toggle('active', app.isActiveRepeat);
            }

        }

    },
    preSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.listMusic.length - 1;
        }

        this.loadCurrenSong();
    },

    loadCurrenSong: function() {

        heading.textContent = this.currentSong.name;
        cbThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.listMusic.length) {
            this.currentIndex = 0;
        }
        this.loadCurrenSong();
    },

    randomSong: function() {

        let newindex = -1;
        do {
            newindex = Math.floor(Math.random() * this.listMusic.length);

        } while (newindex === this.currentIndex);
        this.currentIndex = newindex;

        this.loadCurrenSong();
    },
    repeatSong: function() {
        this.currentIndex = this.currentIndex;
        this.loadCurrenSong();
    },



    start: function() {

        // định nghĩa các thuộc tính cho object
        this.defineProperties();

        // lắng nghe và xứ lý các sự kiện
        this.handleEvents();

        //tải thông tin bài hát đầu tiên
        this.loadCurrenSong();

        this.render();

    }

}

app.start();