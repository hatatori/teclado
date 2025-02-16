// const black_key = Array.from(document.querySelectorAll('.black_key'))
// const white_key = Array.from(document.querySelectorAll('.white_key'))

// tecla individual
const keyboardKeys = document.querySelector(".keys").children



window.onload = function () {
    for (let i = 28; i <= 63; i++) {
        const aud = new Audio()
        aud.src = 'audios/' + i + '.mp3'
        document.body.appendChild(aud)
        aud.muted = true
        aud.play()
        // aud.remove()
    }
}


// const black_key = Array.from(document.querySelectorAll('.black_key'))
// const white_key = Array.from(document.querySelectorAll('.white_key'))

// CRIAÇÃO DE NOTAS

function createKey(num) {
    num = num-4
    const keys = document.querySelector('.keys')

    const Notes = 'C C# D D# E F F# G G# A A# B'.split(' ')

    const ColorKey = [
        'white_key',
        'black_key',
        'white_key',
        'black_key',
        'white_key',
        'white_key',
        'black_key',
        'white_key',
        'black_key',
        'white_key',
        'black_key',
        'white_key',
    ]

    // const num = 28
    const div = document.createElement('div')
    div.setAttribute('note', Notes[(num) % Notes.length])
    div.setAttribute('n', num)

    div.className = 'key ' + ColorKey[num % 12]

    div.onmousedown = () => {
        div.classList.add('pressed')
        new Audio('audios/' + (num+4) + '.mp3').play()
    }

    div.onmouseover = (e) => {
        if (e.buttons) {
            new Audio('audios/' + (num+4) + '.mp3').play()
            // keyboardKeys[num].classList.add('pressed')
            div.classList.add('pressed')
        }
    }

    div.onmouseout = (e) => {
        console.log('saiu')
        div.classList.remove('pressed')
    }

    div.onmouseup = (e) => {
        div.classList.remove('pressed')
    }

    keys.appendChild(div)
}

// for(let i=28;i<=63;i++){
//     createKey(i)
// }

const escala = 28
const tamanho = 12*3 // limite 88

for (let i = escala; i < escala + tamanho; i++) {
    createKey(i)
}


// parte 2

// eventos

const keys = 'asdfghjkl'.split('')
// const keyboardKeys = document.querySelector(".keys").children
keys.map(e => {
    const pos = keys.indexOf(e)

    window.addEventListener('keydown', e => {
        if (e.key == keys[pos]) keypress(pos)
    })

    window.addEventListener('keyup', e => {
        if (e.key == keys[pos]) keyrelease(pos)
    })
})

function down(position) {
    
    const n = Number(keyboardKeys[position].getAttribute('n'))
    new Audio('audios/' + (n+4) + '.mp3').play()
    
    keyboardKeys[position].classList.add('pressed')
}

function up(position) {
    const keyboardKeys = document.querySelector(".keys").children
    keyboardKeys[position].classList.remove('pressed')
}


let keysPressed = [1, 4]
function keypress(key) {
    if (!keysPressed.includes(key)) {
        keysPressed.push(key)
        down(key)
    }
}

function keyrelease(key) {
    keysPressed = keysPressed.filter(e => e != key)
    up(key)
}

// parte 3
function acorde(arr) {
    for (let i = 0; i < document.querySelector('.keys').childElementCount; i++) {
        up(i)
    }
    arr.map(e => down(e))
}

// acorde([1,5,6])
let musica = [
    [1,5,6],
    [7,8,10],
]