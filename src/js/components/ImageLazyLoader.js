let ImageLazyLoader = function (element) {
    this.element = element
    this.images = Array.from(element.querySelectorAll('[data-src]'));
    this.iO = null;
    this.iOOptions = {
        root: null,
        rootMargin: "100px",
        threshold: 0.0
    }

    this.iOCallBack = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let elem = entry.target
                let imgUrl = elem.dataset.src
                elem.src = imgUrl

                observer.unobserve(elem);
            }
        });
    }

    this.init = () => {
        this.iO = new IntersectionObserver(this.iOCallBack, this.iOOptions);

        this.images.forEach(image => {
            this.iO.observe(image);
        });

        return this
    }
}

export default {
    create: ImageLazyLoader,
    selector: '.js-image-lazy-loader',
    key: 'imageLazyLoader',
}
