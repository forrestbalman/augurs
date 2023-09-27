const resizeElements = () => {
    const container = document.querySelector('.container')
    const main = document.querySelector('main')
    const beats = document.querySelectorAll('.beat')
    const stars = document.querySelectorAll('.fa-asterisk')

    main.style.width = container.offsetWidth + 'px'

    beats.forEach(beat => {
        beat.style.width = container.offsetWidth / 8 - 20 + 'px'
        beat.style.height = container.offsetWidth / 8 - 20 + 'px'
    })

    stars.forEach(star => {
        if (window.innerWidth >= 1200) {
            if (!star.classList.contains('fa-2x')) {
                star.classList.add('fa-2x')
            }
        } else {
            if (star.classList.contains('fa-2x')) {
                star.classList.remove('fa-2x')
            }
        }
    })
}

resizeElements()

window.addEventListener('resize', resizeElements)

const grooveDecider = obj => {
    let mod = Math.random()

    while (mod < 0.4 || mod > 0.7) {
        mod = Math.random()
    }

    for (const beat in obj) {
        const random = Math.random()

        random >= mod ? obj[beat] = true : obj[beat] = false
    }
}

const beatClearer = () => {
    const beats = document.querySelectorAll('.beat')

    beats.forEach(beat => {
        if (beat.children.length !== 0) {
            beat.children[0].style.color = 'black'
        }
        beat.style.backgroundColor = 'white'
    })
}

const beatFiller = (el, obj) => {
    for (let i = 0; i < el.children.length; i++) {
        if (obj[i] === true) {
            el.children[i].innerHTML = '<i class="fas fa-asterisk"></i>'
        } else {
            el.children[i].innerHTML = ''
        }
    }

    resizeElements()
}

const beatColor = (num, el) => {
    if (el.children[num].children.length !== 0) {
        el.children[num].children[0].style.color = 'white'
    }

    el.children[num].style.backgroundColor = 'black'
}

const beatAnimator = () => {
    const beatsContainer = document.querySelector('.beats')
    const beatsLookaheadContainer = document.querySelector('.beats-lookahead')
    const startIterationsText = document.querySelector('.start-counter')
    const buttons = document.querySelectorAll('button')
    const bpm = 232
    const tempo = 60000 / bpm
    const startTime = Date.now()
    let startIterations = 3
    let beatCounter = 0
    let groove = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false
    }
    let nextGroove = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false
    }

    buttons.forEach(button => {
        button.setAttribute('disabled', 'true')
    })

    grooveDecider(nextGroove)

    const interval = setInterval(() => {
        beatClearer()

        beatFiller(beatsContainer, groove)

        beatFiller(beatsLookaheadContainer, nextGroove)

        beatColor(beatCounter, beatsContainer)

        const currentTime = Date.now()

        console.log(startTime, currentTime)

        if (currentTime > startTime + 300000) {
            document.body.style.animation = 'fade-out 3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'
            setTimeout(() => location.reload(), 3500)
        }

        if (startIterations > 0) {
            startIterationsText.textContent = startIterations + 1
            startIterationsText.style.opacity = 1

            if (beatCounter === 7) {
                beatCounter = 0
                startIterations--
            } else {
                beatCounter++
            }
        } else {
            startIterationsText.textContent = startIterations + 1

            if (beatCounter === 7) {
                startIterationsText.style.opacity = 0

                beatCounter = 0
    
                for (let i = 0; i < Object.keys(nextGroove).length; i++) {
                    groove[i] = nextGroove[i]
                }
    
                grooveDecider(nextGroove)
            } else {
                beatCounter++
            }
        }
    }, tempo)
}

const startPiece = () => {
    setTimeout(beatAnimator, 2000)
}




