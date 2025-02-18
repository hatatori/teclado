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
    // num = num-4

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
    const scale = parseInt(num / 12) + 1
    div.setAttribute('note', Notes[(num) % Notes.length] + '' + scale)
    div.setAttribute('n', num)

    div.className = 'key ' + ColorKey[num % 12]

    div.down = () => {
        div.classList.add('pressed')
        new Audio('audios/' + (num + 4) + '.mp3').play()
    }

    div.up = () => {
        div.classList.remove('pressed')
    }

    div.play = () => {
        div.classList.add('pressed')
        new Audio('audios/' + (num + 4) + '.mp3').play()
        setTimeout(() => {
            div.classList.remove('pressed')
        }, 300)
    }



    div.onmousedown = () => {
        div.classList.add('pressed')
        new Audio('audios/' + (num + 4) + '.mp3').play()
        console.log(div)
    }

    div.onmouseover = (e) => {
        if (e.buttons) {

            new Audio('audios/' + (num + 4) + '.mp3').play()
            // keyboardKeys[num].classList.add('pressed')
            div.classList.add('pressed')
        }
    }

    div.onmouseout = (e) => {
        div.classList.remove('pressed')
    }

    div.onmouseup = (e) => {
        div.classList.remove('pressed')
    }

    keys.appendChild(div)
}


function getElementByNote(note) {
    // note = 'd#4'
    if (note.includes("#")) note = note.replace("#", "\\#")
    note = note.toUpperCase()
    const sel = '[note="' + note + '"]'
    return document.querySelector(sel);
}

// getElementByNote('b5')
// for(let i=28;i<=63;i++){
//     createKey(i)
// }

// const escala = 23
// const tamanho = 12 * 4 // limite 88
// for (let i = escala; i < escala + tamanho; i++) {
//     createKey(i)
// }

function createKeyboard(escala = 29, tamanho = 50) {
    // const escala = 23
    // const tamanho = 12 * 4 // limite 88
    document.querySelector(".keys").innerHTML = ''
    for (let i = escala; i < escala + tamanho; i++) {
        createKey(i)
    }
}
createKeyboard()


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
    new Audio('audios/' + (n + 4) + '.mp3').play()

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

function acordeNotas(arr) {
    
    arr = arr.map(e=>e.toUpperCase())

    for (let i = 0; i < document.querySelector('.keys').childElementCount; i++) {
        up(i)
    }
    arr.map(e => getElementByNote(e).play())
}

// acordeNotas(['f4', 'a4', 'c5'])


// F4, A4, C5

// acorde([1,5,6])
let musica = []

// parte 3

const tag_position = document.querySelector('.tag_position')
let historia = -1

// window.addEventListener('keyup', e => {
//     if (e.key == "1") {
//         historia = -1
//         tag_position.innerHTML = historia
//     }
//     if (e.key == '3') {
//         ++historia
//         if (historia == 10) historia = -1
//         tag_position.innerHTML = historia
//     }
//     if (e.key == '2') {
//         --historia
//         if (historia < -1) historia = -1
//         tag_position.innerHTML = historia
//     }
// })

// parte 4
// const mus = `B4 E5 D#5 E5 F#5 G5 F#5 G5 A5 A#5 B5 E5 B4 E5 D#5`.trim().split(' ').map(e=>e.trim())
const mus = `E5 B4 C5 D5 C5 B4 A4 A4 C5 E5 D5 C5 B4 C5 D5 E5 C5 A4 A4 D5 F5 A5 G5 F5 E5 C5 E5 D5 C5 B4 B4 B4 C5 D5 E5 C5 A4 A4 E4 C4 D4 E4 B4 C4 A4 A4 B4 B4 E4 C4 D4 B4 C4 E4 A4 A4`.split(' ').filter(e=>e!='').map(e=>e.split(','))
// const mus = `E5 B4 C5 D5 C5 B4 A4 A4 C5 E5 D5 C5 B4 C5 D5 E5 C5 A4 A4 D5 F5 A5`.split(' ').filter(e=>e!='').map(e=>e.split(','))

console.log(mus)


// acordeNotas(['f4', 'a4', 'c5'])

// console.log(mus)

window.addEventListener('keydown', e => {
    if (e.key == "1") {
        historia = -1
        
        // getElementByNote(mus[historia]).play()
        // console.log(historia)
    }
    // if (e.key == '3' || e.key == 'z' || e.key == 'x' ){
    if ('qwe3'.includes(e.key) ){
        ++historia
        if (historia == mus.length) historia = -1
        console.log(historia)
        if(historia > -1)
        acordeNotas(mus[historia])
    }
    if (e.key == '2') {
        --historia
        if (historia <= -1) historia = -1
        console.log(historia)
        if(historia > 0)
        acordeNotas(mus[historia])
    }
})
