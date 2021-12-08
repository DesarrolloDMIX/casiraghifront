import { pubsub } from "./pubsub";

export default function (product, options = {}) {

    let { id, quantity, fraction, cents, name } = product;
    if (!Number.isInteger(+quantity) || +quantity <= 0) {
        return {
            success: false,
            error: 'invalid quantity',
        }
    }

    let result = {
        success: false,
        error: '',
    };

    let data = new FormData();
    data.append('product_id', id);
    data.append('quantity', quantity);
    let resultPromise = fetch(`${location.protocol}//${location.host}/carrito/add-to-cart`, {
        method: 'POST',
        headers: {
            'X-CSRF-Token': document.querySelector('[name="csrfToken"]').content
        },
        body: data
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json()
    }).then((response) => {
        if (response.product_added) {
            if (Boolean(options.redirect)) {
                location.href = `${location.protocol}//${location.host}/carrito`
            }
            pubsub.publish('productAddedToCart', { product, newTotal: response.new_total });
            result.success = true;

            gtag('event', 'add_to_cart', {
                value: parseInt(fraction.replace('.', '')) + (parseInt(cents) / 100),
                currency: 'ARS',
                items: [
                    {
                        item_id: id,
                        item_name: name,
                        price: parseInt(fraction.replace('.', '')) + (parseInt(cents) / 100),
                        quantity: quantity,
                    }
                ]
            })

            return result;
        }
    })

    return resultPromise;
}