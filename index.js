import menuArray from './data.js'

const itemsEl = document.getElementById('items-column')
const cartEl = document.getElementById('cart-items')
const totalCartPrice = document.getElementById('total-cart-price')
const completeOrderBtn = document.getElementById('complete-order')
let cartItems = []

function renderItems(arr) {
    let itemsHtml = ''
    arr.forEach((item)=>{
        itemsHtml += `
            <div class="item">
                <p class="emoji">${item.emoji}</p>
                <div class="description">
                    <h3 id="">${item.name}</h3>
                    <p class="ingredients">${item.ingredients}</p>
                    <p class="price">$${item.price}</p>
                </div>
                <button class="add-item" type="button" id="${item.id}">+</button>
            </div>`
    })
    itemsEl.innerHTML = itemsHtml
}
renderItems(menuArray)

document.addEventListener('click', (e)=>{
    if (e.target.className === "add-item"){
        cartItems.push(menuArray.filter(item => {return item.id === Number(e.target.id)})[0])
        renderCart()
    } else if (e.target.className === "remove") {
        let updateCartItems = []
        let i = 0
        for (let item of cartItems){
            if (item.id === Number(e.target.id) && i === 0){
                i++
                continue
            } else {
                updateCartItems.push(item)
            }
        }
        cartItems = updateCartItems
        renderCart()
    }
})

function renderCart() {
    completeOrderBtn.innerText = 'Complete order'
    cartEl.innerHTML = cartItems.map( item => {
        return `
        <div class="cart-item">
            <h3>${item.name}</h3>
            <button class="remove" id="${item.id}">remove</button>
            <p class="price">$${item.price}</p>
        </div>`
    }).join('')
    totalCartPrice.innerText = `$${cartItems.reduce((total, current)=>{return total + current.price},0)}`
}

const paymentPopup = document.getElementById('payment-popup')

completeOrderBtn.addEventListener('click', ()=>{
    if (cartItems.reduce((total, current)=>{return total + current.price},0) === 0){
        completeOrderBtn.innerText = 'Please add something to cart first'
    } else {
        paymentPopup.classList.toggle('hidden')
    }
})

document.addEventListener('submit', (e)=>{
    e.preventDefault()
    paymentPopup.classList.toggle('hidden')
    document.getElementById('cart').innerHTML = `
    <h3 class="thanks">Thanks! Your order is on it's way</h3>
    `
})

