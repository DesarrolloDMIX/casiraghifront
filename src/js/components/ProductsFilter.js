const ProductsFilter = function (element) {
    this.elem = element
    this.filterOptions = Array.from(this.elem.querySelectorAll('[data-filter-option]'))
    this.inputs = Array.from(this.elem.querySelectorAll('input'))
    this.timeout = null

    this.init = () => {
        this.inputs.forEach(input => {
            input.oninput = this.handleInput.bind(this)
        }, this)

        return this
    }
}

ProductsFilter.prototype.handleInput = async function (e) {
    if (this.timeout) {
        clearTimeout(this.timeout)
    }
    this.elem.querySelector('.filter-loading').style.opacity = 1

    let formData = new FormData(this.elem)
    let params = new URLSearchParams(formData.entries())

    const url = `${location.protocol}//${location.host}/categorias/filtered-products-list?${params.toString()}`

    let response = await (await fetch(url)).json()

    document.querySelector('.products-list').innerHTML = ''

    let products = response.data

    products.slice(0, 8).forEach(html => {
        document.querySelector('.products-list').innerHTML += html
    })

    this.elem.querySelector('.filter-loading').style.opacity = 0

    this.timeout = setTimeout(() => {
        products.slice(15).forEach(html => {
            document.querySelector('.products-list').innerHTML += html
        })
    }, 1000)
}

export default {
    create: ProductsFilter,
    selector: '.js-products-filter',
    key: 'ProductsFilter',
}
