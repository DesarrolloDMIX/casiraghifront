import debounce from "../utilities/debounce";
import { pubsub } from "../utilities/pubsub";

const CartItem = function (element) {
    this.elem = element
    this.qtyInput = this.elem.querySelector('.cart-item__qta-number');
    this.qtyAddButton = this.elem.querySelector('.cart-item__qty-add');
    this.qtyRemoveButton = this.elem.querySelector('.cart-item__qty-remove');
    this.currentQty = parseInt(this.qtyInput.value);

    this.init = () => {
        this.qtyAddButton.addEventListener('click', this.handleQtyAdd.bind(this))
        this.qtyRemoveButton.addEventListener('click', this.handleQtyRemove.bind(this))
        this.qtyInput.addEventListener('input', this.handleQtyInput.bind(this))

        return this
    }
}

CartItem.prototype.handleQtyInput = function (e) {
    e.target.value = !!e.target.value && Math.abs(e.target.value) > 0 ? Math.abs(e.target.value) : 1
    this.currentQty = e.target.value

    this.handleQuantityUpdated.bind(this)(e.target.value)
}

CartItem.prototype.handleQtyAdd = function (e) {
    let qty = parseInt(this.currentQty) + 1
    if (qty > 0) {
        this.currentQty = qty
        this.qtyInput.value = qty
        this.handleQuantityUpdated.bind(this)(qty)
    }

}

CartItem.prototype.handleQtyRemove = function (e) {
    let qty = parseInt(this.currentQty) - 1

    if (qty > 0) {
        this.currentQty = qty
        this.qtyInput.value = qty
        this.handleQuantityUpdated.bind(this)(qty)
    }

}

CartItem.prototype.handleQuantityUpdated = function (newQty) {
    document.body.classList.add('js-cart-total-updating')

    let totalFractionElement = this.elem.querySelector('.price__fraction')
    let totalCentsElement = this.elem.querySelector('.price__cents')
    let priceElement = this.elem.querySelector('.price')
    let unitFraction = parseInt(priceElement.dataset.unitPriceFraction.replace('.', ''))
    let unitCents = parseInt(priceElement.dataset.unitPriceCents)

    let newTotal = { f: unitFraction * newQty, c: unitCents * newQty }

    while (newTotal.c >= 100) {
        newTotal.f += 1
        newTotal.c -= 100
    }

    newTotal.f = window.dmixFormatMoney(newTotal.f, 0, ',', '.')
    newTotal.c = newTotal.c.toString()

    if (newTotal.c.length < 2) {
        newTotal.c = '0' + newTotal.c
    }

    priceElement.dataset.totalPriceFraction = newTotal.f
    totalFractionElement.innerHTML = newTotal.f
    priceElement.dataset.totalPriceCents = newTotal.c
    totalCentsElement.innerHTML = newTotal.c

    this.elem.dispatchEvent((new Event('quantityUpdated', { bubbles: true })))

    this.handleQuantityPersistance();
}

CartItem.prototype.handleQuantityPersistance = debounce(
    function (e) {
        let quantity = this.currentQty
        let productId = this.elem.dataset.productId

        let data = new FormData()
        data.append('product_id', productId)
        data.append('quantity', quantity)
        fetch(`${location.protocol}//${location.host}/carrito/update-product-quantity`, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': document.querySelector('[name="csrfToken"]').content
            },
            body: data,
        }).then((response) => {
            return response.json()
        }).then((response) => {
            if (response.success) {
                let newTotal = response.new_total
                pubsub.publish('cartAmountChanged', { newTotal })
                document.body.classList.remove('js-cart-total-updating')
            }
        }).catch((reason) => {
            console.log(reason);
        })
    }
    , 300)

export default {
    create: CartItem,
    selector: '.js-cart-item',
    key: 'CartItems',
    isArray: true,
}
