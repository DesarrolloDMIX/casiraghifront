const GoogleReviews = function(element) {
    this.elem = element
    this.button = this.elem.querySelector("button")

    const rightArrowElement = this.elem.querySelector('.arrow-container-right')
    const leftArrowElement = this.elem.querySelector('.arrow-container-left')
    
    const handleSlide = ()=> {
        console.log('hice click')
    }
    rightArrowElement.addEventListener('click',handleSlide);
    leftArrowElement.addEventListener('click',handleSlide);


    this.init = function() {
        fetch("http://dev557.casiraghi.com.ar/reviews")
        .then(res => res.json())
        .then(({ result }) => {

            const reviewsElement = this.elem.querySelector('.reviews');
            const starsElement = this.elem.querySelector('.total-rating-container')

            

            let starsRating = '';
            for(let i = 0; i < 5 ; i++ ){
                    
                let starColor = i+1 <= Math.floor( result.rating) ? "#ffff00" : "gray";

                starsRating +=  `
                    <svg class="starRating" viewBox="0 0 181 147" fill="${starColor}" xmlns="http://www.w3.org/2000/svg">
                    <path d="M90.8887 2.05473L115.135 47.0899L115.257 47.3147L115.51 47.3485L169.633 54.5577L130.5 89.5243L130.305 89.6989L130.337 89.959L137.261 145.506L91.1578 116.079L90.8887 115.907L90.6197 116.079L44.5165 145.506L51.4405 89.959L51.473 89.6989L51.2775 89.5243L12.1444 54.5577L66.2678 47.3485L66.5209 47.3147L66.642 47.0899L90.8887 2.05473Z" stroke="black" stroke-width="3px"/>
                    </svg>
                    `
            }

            starsElement.innerHTML += `
                    <div class="total-rating">
                       <span class="total-rating-stars"> ${starsRating} </span>
                       <span class="total-rating-number"> ${result.rating} </span>
                    </div>
                `
            result.reviews.forEach(review => {
                // Math.floor(review.rating)
                let starsRating = '';
                for(let i = 0; i < 5 ; i++ ){
                    
                    let starColor = i+1 <= Math.floor(review.rating) ? "#ffff00" : "gray";

                    starsRating +=  `
                        <svg class="starRating" viewBox="0 0 181 147" fill="${starColor}" xmlns="http://www.w3.org/2000/svg">
                        <path d="M90.8887 2.05473L115.135 47.0899L115.257 47.3147L115.51 47.3485L169.633 54.5577L130.5 89.5243L130.305 89.6989L130.337 89.959L137.261 145.506L91.1578 116.079L90.8887 115.907L90.6197 116.079L44.5165 145.506L51.4405 89.959L51.473 89.6989L51.2775 89.5243L12.1444 54.5577L66.2678 47.3485L66.5209 47.3147L66.642 47.0899L90.8887 2.05473Z" stroke="black" stroke-width="3px"/>
                        </svg>
                     `
                }
                
                
                reviewsElement.innerHTML += `
                <div class=" review ">

                    <div class="card-review">

                        <div class="card-review-header" >
                            <div class="card-info">
                                <p class="review-img"> <img src='${ review.profile_photo_url }'/>                       </p> 
                                <p class="review-name"> ${ review.author_name }                                         </p>
                            </div>
                            <div class="rating-container">
                                <p class="review-rating" > ${starsRating}                                </p> 
                            </div>
                        </div>

                        <div class="card-review-body"> 
                            <span class="review-text" > ${  review.text.length > 220 ? review.text.slice(0,220) + '...' : review.text}                                                </span> 
                        </div>

                        <div class="card-review-footer">
                            <button class="btn-review-author_url">
                                <a class="review-author_url" href="${ review.author_url } "> Ver más </a>
                            </button>
                        </div>

                    </div>
                </div>`

            });

        })
        return this
    }



}

export default {
    create: GoogleReviews,
    selector: '.js-google-reviews',
    key: 'GoogleReviews',
}