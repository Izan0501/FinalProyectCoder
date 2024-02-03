/**scrollReveal */
const scrollR = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
});

scrollR.reveal('.Cardscarousel', { delay: 250, origin: 'left' });
scrollR.reveal('.container', { delay: 250, origin: 'top' });
scrollR.reveal('.contentTxt', { delay: 100, origin: 'left' });
scrollR.reveal('.slider2', { delay: 400, origin: 'top' });
scrollR.reveal('.icons', { delay: 500, origin: 'left' });
scrollR.reveal('.sectionName', { delay: 500, origin: 'left' });
scrollR.reveal('.cardsSection', { delay: 750, origin: 'left' });
scrollR.reveal('.d-flex', { delay: 650, origin: 'top' });
scrollR.reveal('.footer', { delay: 700, origin: 'left' });

/**menuList-funcions */

const menu = document.querySelector('.list__icon');
const navList = document.querySelector('.navegation');

menu.addEventListener('click', (e) => {
    menu.classList.toggle('list__icon');
    navList.classList.toggle('open');
});

/**carousel1-functions */

document.querySelector("#next").onclick = function () {
    let lists = document.querySelectorAll(".item");
    document.querySelector("#slide").appendChild(lists[0]);
}

document.querySelector("#prev").onclick = function () {
    let lists = document.querySelectorAll(".item");
    document.querySelector("#slide").prepend(lists[lists.length - 1]);
}

/**carousel2-functions */

function App() { }
window.onload = function (event) {
    let app = new App();
    window.app = app;
}
App.prototype.processingButton = function (event) {
    const btn = event.currentTarget;
    const carruselList = event.currentTarget.parentNode;
    const track = event.currentTarget.parentNode.querySelector("#track");
    const carrusel = track.querySelectorAll(".carrusel");

    const carruselWidth = carrusel[0].offsetWidth;
    const trackWidth = track.offsetWidth;
    const listWidth = carruselList.offsetWidth;

    track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1)
    btn.dataset.button == "button-prev" ? prevAction(leftPosition, carruselWidth, track) : nextAction(leftPosition, trackWidth, listWidth, carruselWidth, track)


}

/*Next and Prev sliderProducts functions */ 
let prevAction = (leftPosition, carruselWidth, track) => {
    if (leftPosition > 0) {
        track.style.left = `${-1 * (leftPosition - carruselWidth)}px`;

    }
}

let nextAction = (leftPosition, trackWidth, listWidth, carruselWidth, track) => {
    if (leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + carruselWidth)}px`;
    }
}

/**cartProduct-functions */
const cart = document.querySelector('#cart');
const buttons = document.querySelectorAll('.btn-outline');
const template = document.querySelector('#template');
const footer = document.querySelector('#dFooter');
const templateFooter = document.querySelector('#templateFooter');
const countString = document.querySelector('#pill');
const fragment = document.createDocumentFragment();

let countProduct = 0
let cartProducts = [];

/**add Product to cart function */
const addCartProduct = (e) => {
    const product = {
        tittle: e.target.dataset.game,
        id: e.target.dataset.game,
        amount: 1,
        count: 0,
        price: parseInt(e.target.dataset.price),
        img: e.target.dataset.img,
    }

    const position = cartProducts.findIndex(item => {
        return item.tittle === product.tittle
    })

    if (position === -1) {
        cartProducts.push(product);
    } else {
        cartProducts[position].amount++
    }


    showCart()

};

/**save products to localStorage */
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cartProducts')) {
        cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        showCart();
    }
})

/**show cartProducts function */
const showCart = () => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

    cart.textContent = ''

    cartProducts.forEach(item => {
        countString.textContent = '';
        const clone = template.content.cloneNode(true)

        clone.querySelector('.img').src = item.img
        clone.querySelector('.badge').textContent = item.amount
        clone.querySelector('.lead').textContent = item.tittle
        clone.querySelector('.spanPrice').textContent = item.price * item.amount

        clone.querySelector('.btn-success').dataset.id = item.id
        clone.querySelector('.btn-danger').dataset.id = item.id
        clone.querySelector('.delete-button').dataset.id = item.id
        //clone.querySelector('.shopBtn').dataset.id = item.id
        //countString.textContent = cartProducts.length;


        fragment.appendChild(clone)

    });

    cart.appendChild(fragment)

    countProducts()

    showFooter()
}

/** product counter function*/
const countProducts = () => {
    countString.style.display = 'block'
    countString.innerText = cartProducts.length
}

/**show templateFooter */
const showFooter = () => {
    footer.textContent = '';


    const total = cartProducts.reduce((acc, current) => {
        return acc + current.amount * current.price
    }, 0);

    console.log(total)

    const clone = templateFooter.content.cloneNode(true)
    clone.querySelector('.spn').textContent = total;

    footer.appendChild(clone)
}

/**function of increasing quantity */
const btnAdd = (e) => {
    cartProducts = cartProducts.map((item) => {
        if (e.target.dataset.id === item.id) {
            item.amount++;
        } else {
            countProduct.textContent = '';
            countProduct++;
        }
        return item;
    });
    showCart();
};

/**quantity subtraction function */
const btnDelete = (e) => {
    cartProducts = cartProducts.filter(item => {
        if (e.target.dataset.id === item.id) {
            if (item.amount > 0) {
                item.amount--;
                if (item.amount === 0) return
            }
        } else {
            countProduct.textContent = '';
            countProduct--;
        };

        return item

    });

    showCart();
};

/**buttons events*/
document.addEventListener('click', (e) => {


    if (e.target.matches('.btn-outline')) {

        Swal.fire({
            icon: "success",
            title: "Congratulations!!",
            text: "we successfully save your purchase!",
        });

        addCartProduct(e);
        btnAdd(e)
        e.preventDefault();
    }

    if (e.target.matches('.btn-success')) {
        btnAdd(e)
        e.preventDefault()
    }

    if (e.target.matches('.btn-danger')) {
        btnDelete(e);
        e.preventDefault()
    }

    if (e.target.matches('.delete-button')) {
        btnDelete(e)
        e.preventDefault()
    }

    if(e.target.matches('.shopBtn')) {
        
        Swal.fire({
            icon: "success",
            title: "Your Purchase Has Been Completed Successfully 🥳🥳",
            text: "We appreciate your visit to our store, we hope you fly Soon!! 😁👍",
        });
        e.preventDefault()
    }
});

