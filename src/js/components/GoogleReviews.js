const GoogleReviews = function(element) {
    this.elem = element
    this.button = this.elem.querySelector("button")
    this.init = function() {
        fetch("http://dev557.casiraghi.com.ar/reviews")
        .then(res => res.json())
        .then(({ result }) => {
            // Capturo this.elem.rating
            const ratingElement = this.elem.querySelector('.rating');
            console.log(ratingElement);

            ratingElement.innerHTML = `<p>${result.rating}</p>`

            const user_ratings_total = this.elem.querySelector('.user_ratings_total');
            console.log(user_ratings_total);

            user_ratings_total.innerHTML = `<p> ${result.user_ratings_total} </p>`

            const reviewsElement = this.elem.querySelector('.reviews');

            result.reviews.forEach(review => {

                reviewsElement.innerHTML += `
                <div class=" review "> 
                <p> ${ review.author_name }             </p> 
                <p> ${ review.author_url }              </p> 
                <p> ${ review.language   }              </p> 
                <p> ${ review.profile_photo_url }       </p> 
                <p> ${ review.rating }                  </p> 
                <p> ${ review.relative_time_description }</p> 
                <p> ${ review.text }                     </p> 
                <p> ${ review.time }                     </p> 
                
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