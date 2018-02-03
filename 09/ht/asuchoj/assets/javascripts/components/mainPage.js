//создаем страниц
function  mainPage (id, classN){
    let elem = document.createElement('div');
    elem.id = id;
    elem.className = classN;
    elem.innerHTML = `
        <h1> Добро пожаловать в мою аркаду </h1>
        <p class="main_character"> Это ваш персонаж. Вы можете переместить его с помощью
            стрелок клавиатуры. Ваша цель - избегать пересечения с
            врагами. </p>
        <p class="main_first_enemy"> Это первый тип ваших врагов. Он появляется в случайном положении и
            может перемещаться в случайном направлении. Когда он достигает
            вашего персонажа, игра останавливается. </p>
        <p class="main_second_enemy"> Это другой тип врага. Он начинается после вашего
            персонажа, когда он достаточно близко. Когда он достигает
            вашего персонажа, игра останавливается. </p>
        <p class="main_bonuses"> Кроме того, появятсяб бонусы. Если вы их возьмете,
           один из врагов исчезнет, ​​и вы получите +10 очков.  </p>         
        <button class="main_start_game" id="main_start_game"> Начать </button>
`;
    document.body.appendChild(elem);
    document.querySelector('#main_start_game').addEventListener('click',()=>location.hash = 'play');
}

function  playPage (id, classN){
    let elem = document.createElement('div');
    elem.id = id;
    elem.className = classN;

    elem.innerHTML = `
        <canvas></canvas>
        <button class="play_game" id="play_game"> 1 </button>
`;

    setTimeout(()=>newEventBus.trigger('showCanvas'), 4);

    document.body.appendChild(elem);
    document.querySelector('#play_game').addEventListener('click',()=>location.hash = '#replay');
}


function  replayPage (id, classN){
    let elem = document.createElement('div');
    elem.id = id;
    elem.className = classN;
    elem.innerHTML = `
        <p>возобновить игру</p>
        <button class="replay_game" id="replay_game"> 1 </button>
        
        <p>главная</p>
        <button class="get_main_page" id="get_main_page"> 1 </button>
`;

    document.body.appendChild(elem);
    document.querySelector('#replay_game').addEventListener('click',()=>location.hash = 'play');
    document.querySelector('#get_main_page').addEventListener('click',()=>location.hash = '#');
}

let router = new Router({
    routes: [{
        name: 'index',
        match: '',
        onBeforeEnter: () => document.body.innerHTML = '',
        onEnter: () => mainPage('mainPage', 'main_page')
    }, {
        name: 'play_game',
        match: (text) => text === 'play',
        onBeforeEnter: () => document.body.innerHTML = '',
        onEnter: () => playPage('playPage', 'play_page')

    }, {
        name: 'replay_game',
        match: (text) => text === 'replay',
        onBeforeEnter: () => document.body.innerHTML = '',
        onEnter: () => replayPage('replayPage', 'replay_page')
    },]
});

