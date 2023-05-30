//Задаєм рандомні позиції для мішені
const main = document.querySelector('.main');
const mainWidth = main.clientWidth;
const mainHeight = main.clientHeight;
const bat = document.querySelector('.main__bat');
const duck = document.querySelector('.main__duck');

const targets = [bat, duck];

function changePositionTarget(element) {
    const leftPos = Math.random() * (mainWidth - 70);
    const topPos = Math.random() * (mainHeight - 70);
    const rightPos = Math.random() * (mainWidth - 70);
    const bottomPos = Math.random() * (mainHeight - 70);
    element.style.left = leftPos + 'px';
    element.style.top = topPos + 'px';
    element.style.right = rightPos + 'px';
    element.style.bottom = bottomPos + 'px';
}

//Звук при попаданні на мішень
const soundHit = document.querySelector('.sound-hit');
for (const item of targets) {
    item.addEventListener('click', function () {
        soundHit.play();
    })
}

//Меню // Появлення прицілу при наведенні мишкою
//Фонова музика//додаємо паралакс фон //додаткова кнопка
const additionallyButton = document.querySelector('.additionally__button');
const mainContainer = document.querySelector('.main__container');
const buttonRestart = document.querySelector('.button-restart');
const wrapper = document.querySelector('.wrapper');
const menu = document.querySelector('.menu__container');
const music = document.querySelector('.music');
const additionally = document.querySelector('.additionally');
const loss = document.querySelector('.loss');
const button = document.querySelector('.menu__button');
const reticle = document.querySelector('.main__reticle');

const buttons = [button, additionallyButton];

window.addEventListener('load', function () {
    wrapper.style.opacity = 0.3;
})

function updatePosition(event) {
    const containerRect = mainContainer.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;

    reticle.style.cssText = `left: ${mouseX}px; top: ${mouseY}px;`;

    let x = mouseX / containerWidth;
    let y = mouseY / containerHeight;

    mainContainer.style.transform = 'translate(-' + x * 60 + 'px, -' + y * 60 + 'px)';
}
for (const item of buttons) {
    item.addEventListener('click', function () {
        wrapper.style.opacity = 1;
        menu.style.display = 'none';
        additionally.style.display = 'none';

        setInterval(() => {
            changePositionTarget(bat);
        }, 1000);
        setInterval(() => {
            changePositionTarget(duck);
        }, 1000);

        main.addEventListener('mousemove', function (event) {
            updatePosition(event);
        });

        music.play();
    })
}

// Регулювання рівня звуку
const volumeSlider = document.querySelector('#volumeSlider');
volumeSlider.addEventListener('input', function () {
    music.volume = volumeSlider.value;
});

//кліки на налаштування і правила 
const settings = document.querySelector('.settings');
const rules = document.querySelector('.rules');
const rulesButton1 = document.querySelector('.menu__rules');
const rulesButton2 = document.querySelector('.settings__rules');
const settingsButton1 = document.querySelector('.menu__settings');
const settingsButton2 = document.querySelector('.header__settings');
const back = document.querySelectorAll('.back');

const settingsButtons = [settingsButton1, settingsButton2];
const rulesButtons = [rulesButton1, rulesButton2];

settingsButtons.forEach(function (el) {
    el.addEventListener('click', function () {
        menu.style.display = 'none';
        settings.style.display = 'block';
        rules.style.display = 'none';
    })
})

rulesButtons.forEach(function (el) {
    el.addEventListener('click', function () {
        menu.style.display = 'none';
        rules.style.display = 'block';
        settings.style.display = 'none';
    })
})

back.forEach(function (el) {
    el.addEventListener('click', function () {
        settings.style.display = 'none';
        rules.style.display = 'none';
        menu.style.display = 'block';
    })
})

const removeButSet = document.getElementById('back-settings');
const removeButRul = document.getElementById('back-rules');
const closed = document.querySelectorAll('.close');

const rulesSettingsHeader = [settingsButton2, rulesButton2];

rulesSettingsHeader.forEach(function (elem) {
    elem.addEventListener('click', function () {
        removeButSet.remove(settings);
        removeButRul.remove(rules);
    })
})

rulesButton2.onclick = () => {
    rules.style.paddingTop = '30px';
}

closed.forEach(function (el) {
    el.onclick = () => {
        settings.style.display = 'none';
        rules.style.display = 'none';
    }
})

// налаштування швидкості //кількість балів  в залежності від швидкості
const scoresNumbers = document.querySelector('.scores__numbers');
const speed = document.querySelector('.speed');
const speedContainer = document.querySelector('.speed__settings');
const difficulties = document.querySelector('.difficulties');
const difficultiesContainer = document.querySelector('.difficulties__settings');
const difficultiesItem = document.querySelectorAll('.difficulties__item');

speed.addEventListener('click', function () {
    speedContainer.classList.toggle('active');
})
difficulties.addEventListener('click', function () {
    difficultiesContainer.classList.toggle('active');
})

for (const item of difficultiesItem) {
    item.addEventListener('click', function () {
        difficultiesContainer.classList.toggle('active');
    })
}

let selectedSpeed = 1;

const speedItem = document.querySelectorAll('.speed__item');
for (const item of speedItem) {
    item.addEventListener('click', function () {
        const number = parseFloat(item.textContent);
        if (number === 0.5) {
            bat.style.transitionDuration = '2.8s';
            duck.style.transitionDuration = '2.8s';
            selectedSpeed = 0.5;
        } else if (number === 1) {
            bat.style.transitionDuration = '1.9s';
            duck.style.transitionDuration = '1.9s';
            selectedSpeed = 1;
        } else if (number === 2) {
            bat.style.transitionDuration = '1s';
            duck.style.transitionDuration = '1s';
            selectedSpeed = 2;
        }

        speedContainer.classList.toggle('active');
    });
}

for (const item of targets) {
    item.addEventListener('click', function () {

        let scoreIncrement = 0;

        if (selectedSpeed === 0.5) {
            scoreIncrement = 5;
        } else if (selectedSpeed === 1) {
            scoreIncrement = 10;
        } else if (selectedSpeed === 2) {
            scoreIncrement = 20;
        }

        const currentScore = parseInt(scoresNumbers.textContent);
        scoresNumbers.textContent = currentScore + scoreIncrement;
    });
}

//кількість життів//Відлік життів//гра заново
const livesNumbers = document.querySelector('.lives__numbers');
const notClick = [menu, settings, rules, bat, duck];

notClick.forEach(function (el) {
    el.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});

const livesContainer = document.querySelector('.lives');
const scoresContainer = document.querySelector('.scores');
const soundLoss = document.querySelector('.sound-loss');

const buttonsActive = [button, additionallyButton];

for (const item of buttonsActive) {
    item.addEventListener('click', function () {
        main.addEventListener('click', function (event) {
            let clickedNotClickable = false;
            for (let i = 0; i < notClick.length; i++) {
                if (notClick[i].contains(event.target)) {
                    clickedNotClickable = true;
                    break;
                }
            }
            if (!clickedNotClickable) {
                livesNumbers.textContent--;
                soundLoss.play();
            }
            if (livesNumbers.textContent == 0) {
                loss.style.display = 'block';
            }
        });
        livesContainer.style.display = 'block';
        scoresContainer.style.display = 'block';
    })
}

// Рівні складності
const oneTarget = document.querySelector('.one-target');
const twoTargets = document.querySelector('.two-targets');
const disappearingTarget = document.querySelector('.disappearing-target');

function targetsDisappear(element) {
    const randomTimeout = Math.random() * 3000 + 2000;
    setTimeout(() => {
        element.style.display = 'none';

        const showTimeout = Math.random() * 2000 + 1000;
        setTimeout(() => {
            element.style.display = 'block';
        }, showTimeout);
    }, randomTimeout);
}
let intervalBat;
let intervalDuck;

function handleClick() {
    intervalBat = setInterval(function () {
        targetsDisappear(bat);
    }, 1000);

    intervalDuck = setInterval(function () {
        targetsDisappear(duck);
    }, 2000);
}

disappearingTarget.addEventListener('click', handleClick);

oneTarget.onclick = function () {
    duck.style.display = 'none';
    clearInterval(intervalDuck);
    clearInterval(intervalBat);
}
twoTargets.onclick = function () {
    duck.style.display = 'block';
    clearInterval(intervalDuck);
    clearInterval(intervalBat);
}

// зникання прицілу
const header = document.querySelector('.header');
const elements = [header, settings, rules, livesNumbers, scoresNumbers, loss, additionally];

for (const item of elements) {
    item.addEventListener('mouseenter', function () {
        reticle.style.display = 'none';
    })
}

//оновлення рахунків
buttonRestart.addEventListener('click', function () {
    livesNumbers.textContent = 20;
    scoresNumbers.textContent = 0;
    loss.style.display = 'none';
})

// поялення додаткової кнопки
const closeOne = document.querySelectorAll('.close-one');

const buttonsOne = [settingsButton1, rulesButton1];

for (const item of buttonsOne) {
    item.addEventListener('click', function () {
        closed.forEach(function (el) {
            el.style.display = 'none';
        })
        closeOne.forEach(function (el) {
            el.style.display = 'block';

        })
    })
}

const buttonsTwo = [settingsButton2, rulesButton2];
for (const item of buttonsTwo) {
    item.addEventListener('click', function () {
        closed.forEach(function (el) {
            el.style.display = 'block';
        })
        closeOne.forEach(function (el) {
            el.style.display = 'none';
        })
    })
}

closeOne.forEach(function (el) {
    el.addEventListener('click', function () {
        settings.style.display = 'none';
        rules.style.display = 'none';
        additionally.style.display = 'block';
    })

})

// налаштування музики та звуків // звук в шапці
const musicIncluded = document.querySelector('.music-included');
const musicExcluded = document.querySelector('.music-excluded');
const soundIncluded = document.querySelector('.sound-included');
const soundExcluded = document.querySelector('.sound-excluded');
const soundOnHeader = document.querySelector('.header__sound-on');
const soundOffHeader = document.querySelector('.header__sound-off');
const includedSounds = [musicExcluded, soundOnHeader];
const excludedSounds = [musicIncluded, soundOffHeader];

for (const item of includedSounds) {
    item.addEventListener('click', function () {
        soundOnHeader.style.display = 'none';
        soundOffHeader.style.display = 'block';
        music.pause();
        musicExcluded.setAttribute('checked', 'checked');
        musicIncluded.removeAttribute('checked');
    })
}

for (const item of excludedSounds) {
    item.addEventListener('click', function () {
        soundOffHeader.style.display = 'none';
        soundOnHeader.style.display = 'block';
        music.play();
        musicIncluded.setAttribute('checked', 'checked');
        musicExcluded.removeAttribute('checked');
    })
}

soundIncluded.onclick = () => {
    for (const item of targets) {
        item.onclick = () => {
            soundHit.play();
        }
    }
    main.onclick = () => {
        soundLoss.play();
    }
}

soundExcluded.onclick = () => {
    for (const item of targets) {
        item.onclick = () => {
            soundHit.pause();
        }
    }
    main.onclick = () => {
        soundLoss.pause();
    }
}

// вихід з ігри
const exit = document.querySelectorAll('.seettings__exit');
exit.forEach(function (el) {
    el.onclick = () => {
        window.location.href = 'https://www.google.com';
    }
})
