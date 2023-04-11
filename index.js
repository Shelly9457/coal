AOS.init()
const q = document.querySelector.bind(document)
const qall = document.querySelectorAll.bind(document)
anime({
    targets: '.how__box',
    translateX: '-100%',
    loop: true,
    easing: 'linear',
    duration: 10000
})

anime({
    targets: '.eat__imgbox',
    translateY: [8, -8],
    loop: true,
    duration: 3000,
    easing: 'easeInOutSine',
    direction: 'alternate',
})

const eat = qall('.eat')
const eat__img = qall('.eat__img')
const eat__h3 = qall('.eat>h3')
const eat__imgbox = q('.eat__imgbox>img')
eat.forEach((element, index) => {
    element.onclick = () => {
        eat__imgbox.classList.add('active')
        setTimeout(() => {
            eat__imgbox.classList.remove('active')
        }, 500);
        eat__imgbox.src = eat__img[index].src
        q('.eat__centerh1').innerText = eat__h3[index].innerText
        q('.eat__centerh4').innerText = EAT_DATA[index].text
    }
});
const work__contianer = q('.work__contianer')
WORK_DATA.forEach(data => {
    work__contianer.innerHTML += `
    <div class="item">
        <img src="${data.img}" class="item__img">
        <h3 class="text-center">${data.name}</h3>
        <h5 class="text-center">${data.text}</h5>
    </div>
    `
})
const item = qall('.item')
const item__length = item.length
let count = 0
function getindex(i) {
    if (i % item__length === 0) return 0
    if (Math.sign(i) > 0) {
        return i % item__length
    } else {
        return i % item__length + item__length
    }
}

function upclass(n) {
    count += n
    let index = getindex(count)
    let nextcount = Math.floor(item__length / 2)
    item.forEach(item => {
        item.classList = 'item'
    })
    item[index].classList.add('active')
    let i = getindex(index + 1)
    item[i].classList.add('next')
    while (nextcount > 1) {
        i = (i + 1) % item__length
        item[i].classList.add('next2')
        nextcount -= 1
    }
    Math.sign(n) === 1 && removetransition(i)
    i = getindex(index - 1)
    item[i].classList.add('prve')
    let lassindex = -1
    item.forEach((item, index) => {
        if (item.className == 'item') {
            item.classList.add('prve2')
            lassindex = index
        }
    })
    Math.sign(n) === 1 && removetransition(lassindex)
}

upclass(0)
function removetransition(index) {
    item[index].classList.add('nono')
    setTimeout(() => {
        item[index].classList.remove('nono')
    }, 0);
}
window.addEventListener('click', e => {
    e.target.classList.contains('next') && upclass(1)
    e.target.classList.contains('prve') && upclass(-1)
})
// order
const order__container = q('.order__container')
ORDER_DATA.forEach((data, index) => [
    order__container.innerHTML += `
    <div class="col-xl-6 col-sm-12 order__item">
        <div class="card my-3 flex-lg-row">
            <img src="${data.img}" class="order__img rounded-circle">
            <div class="card-body order__body text-dark">
                <h2>${data.name}</h2>
                <p class="fs-5">${data.text}</p>
                <h4><del>$${data.price2}</del></h4>
                <h2 class="colortwo fw">$${data.price}</h2>
                <div class="order__btnbox">
                    <button class="btn order__btn" onclick='reduce(${index})'>-</button>
                    <input type="text" class="order__amount" value="${data.amount}">
                    <button class="btn order__btn" onclick='add(${index})'>+</button>
                </div>
            </div>
        </div>
    </div>
    `
])
const order__amount = qall('.order__amount')
const order__div = q('.order__div')

let amount = 0
function reduce(index) {
    ORDER_DATA[index].amount = Math.max(0, ORDER_DATA[index].amount - 1)
    order__amount[index].value = ORDER_DATA[index].amount
    if (order__amount[index].value == 0) {
        return
    } else {
        amount = Math.max(0, amount - 1)
        order__div.innerText = amount
        console.log(amount);
    }
    uporder()
}

function add(index) {
    ORDER_DATA[index].amount += 1
    order__amount[index].value = ORDER_DATA[index].amount
    const order = q('.order')
    const order__img = qall('.order__img')
    const order_pos = order.getBoundingClientRect()
    const img_pos = order__img[index].getBoundingClientRect()
    const copy_img = order__img[index].cloneNode()
    document.body.appendChild(copy_img)
    copy_img.classList.add('copy__img')
    copy_img.style.top = `${img_pos.y + img_pos.height / 2}px`
    copy_img.style.left = `${img_pos.x + img_pos.width / 2}px`
    setTimeout(() => {
        copy_img.style.top = `${order_pos.y + order_pos.height / 2}px`
        copy_img.style.left = `${order_pos.x + order_pos.width / 2}px`
        setTimeout(() => {
            amount += 1
            order__div.innerText = amount
            copy_img.remove()
        }, 1000);
    }, 0);
    uporder()
}
const shop__body = q('.shop__body')
const shop__sum = q('.shop__sum')
function uporder() {
    shop__body.innerHTML = ''
    let sum = 0
    ORDER_DATA.forEach((data, index) => {
        if (order__amount[index].value > 0) {
            var price = data.amount * data.price
            sum += price
            shop__body.innerHTML += `
            <div class="card card-body flex-row shop__container">
                <img src="${data.img}" class="shop__img rounded-circle">
                <h2 class="mb-0">${data.name}</h2>
                <p class="mb-0 fs-5 mx-5">${data.amount}</p>
                <h2 class="mb-0 colortwo fw">$${price}</h2>
            </div>
            `
        }
    })
    shop__sum.innerText = `總計$${sum}`
}

// chart

const mycanvas = q('.mycanvas')
Chart.defaults.font.size = 18
const chart = new Chart(mycanvas, {
    type: 'line',
    data: {
        labels: ['2012', '2014', '2016', '2018'],
        datasets: [{
            label: '排放量',
            data: [287070, 290592, 293250, 296546],
            backgroundColor: [
                'rgb(125, 131, 255)'
            ],
            fill: false,
            pointRadius: 7,
            borderWidth: 9
        }]
    },
    position: {}
})
// footer
const footer__input = qall('.footer__input')
const name__input = q('.name__input')
const email__input = q('.email__input')
const message__input = q('.message__input')
const borad__container = q('.borad__container')
function footer_send() {
    window.event.preventDefault()
    borad__container.innerHTML += `
    <div class="borad__box">
        <p class="mb-1">${name__input.value}</p>
        <p class="mb-1">${email__input.value}</p>
    </div>
    <p class="fs-4 mb-5 borad__message position-relative ps-2">${message__input.value}</p>
    `
    footer__input.forEach(data => {
        data.value = ''
    })
}
// robot
const robot__container = q('.robot__container')
const robot__input = q('.robot__input')
const robot__body = q('.robot__body')
function robot() {
    robot__container.classList.toggle('active')
}
function close_robot() {
    robot__container.classList.remove('active')
}
function robot_btn(e) {
    robot__input.value = ROBOT_BTN[e]
    robot_send()
}
function inkey(e) {
    e.keyCode == 13 && robot_send()
}
function robot_send() {
    if (robot__input.value == '') {
        return
    } else {
        robot__body.innerHTML += `
        <p>
            <span class="admin__message float-end">${robot__input.value}</span>
        </p>
        `
        ans = '您好，我是本網站的聊天機器人，很高興為您服務，有任何問題都可以向我詢問，或留下聯絡方式以便客服人員後續解答。'
        x = Object.keys(ROBOT_ANS).filter(k => robot__input.value.includes(k)).at(-1)
        if (x) {
            ans = ROBOT_ANS[x]
        }
        setTimeout(() => {
            robot__body.innerHTML += `
            <p>
                <span class="admin__message float-end">${ans}</span>
            </p>
            `
        }, 700);
        robot__input.value = ''
    }
}

// three
const threecontainer = q('.threecontainer')
const scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
const renderer = new THREE.WebGLRenderer({
    alpha: true
})
renderer.setSize(document.body.clientWidth * 0.4, 400)
threecontainer.appendChild(renderer.domElement)
const control = new THREE.OrbitControls(camera, renderer.domElement)
const geometry = new THREE.SphereGeometry(1, 32, 32)
const textureloader = new THREE.TextureLoader()
const texture = textureloader.load('images/9.jpg')
const material = new THREE.MeshBasicMaterial({
    map: texture
})
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)
camera.position.z = 2
function animate() {
    requestAnimationFrame(animate)
    control.update()
    control.autoRotate = true
    control.autoRotateSpeed = 5
    control.enableZoom = false
    renderer.render(scene, camera)
}
animate()

const THEMES = {
    light: {
        '--colorfirst': '#5d9b84',
        '--colortwo': '#f59b55',
        '--bs-body-bg': '#fff',
        '--bs-body-color': 'rgb(33, 37, 41)',
    },
    dark: {
        '--colorfirst': '#f59b55',
        '--colortwo': '#5d9b84',
        '--bs-body-bg': '#5d5d5d',
        '--bs-body-color': '#fff',
    },
}
let c = 'light'
const dark = q('.moon')
const pen = q('.pen')
const wave = q('.wave')
function moon() {
    if (c === 'light') {
        wave.style.backgroundImage = 'url(./images/wave2.png)'
        pen.src = './images/pen2.png'

        dark.src = './images/moon.png'
        c = 'dark'
    } else {
        dark.src = './images/sun.png'
        wave.style.backgroundImage = 'url(./images/wave.png)'
        pen.src = './images/pen.png'

        c = 'light'
    }
    set(THEMES[c])
}

function set(theme) {
    for (let key in theme) {
        document.documentElement.style.setProperty(key, theme[key])
    }
}