const GoogleReviews = function (element) {
  this.elem = element;
  this.button = this.elem.querySelector("button");

  const rightArrowElement = this.elem.querySelector(".arrow-container-right");
  const leftArrowElement = this.elem.querySelector(".arrow-container-left");
  this.reviewsContainer = this.elem.querySelector(".reviews");

  this.currentPosition = 0;

  const handleSlide = (evt) => {
    const skipAmount =
      window.innerWidth > 1400 ? 3 : window.innerWidth > 1024 ? 2 : 1;
    const cardWidth = this.elem
      .querySelector(".review")
      .getBoundingClientRect().width;
    const reviewsLength = Array.from(
      this.elem.querySelectorAll(".review")
    ).length;
    const direction = parseInt(evt.target.dataset.direction);
    let targetPosition = this.currentPosition + direction * skipAmount;

    //solo había que invertir el target position jaja
    // if (targetPosition < 0) targetPosition = 0;
    // if (targetPosition > reviewsLength - 1) targetPosition = reviewsLength - 1;
    if (targetPosition < 0) targetPosition = reviewsLength - 1;
    if (targetPosition > reviewsLength - 1) targetPosition = 0;

    this.reviewsContainer.scrollTo({
      behavior: "smooth",
      left: cardWidth * targetPosition,
    });
    this.currentPosition = targetPosition;

    //   console.log({
    //     direction,
    //     cardWidth,
    //     reviewsLength,
    //     currentPosition: this.currentPosition,
    //     targetPosition,
    //     skipAmount,
    //   });
  };
  rightArrowElement.addEventListener("click", handleSlide);
  leftArrowElement.addEventListener("click", handleSlide);

  this.init = function () {
    fetch("https://express.casiraghi.com.ar/reviews")
      .then((res) => res.json())
      .then(({ result }) => {
        const reviewsElement = this.elem.querySelector(".reviews");
        const starsElement = this.elem.querySelector(".total-rating-container");

        starsElement.innerHTML += `
                    <div class="total-rating">
                        <span class="total-rating-stars"> 
                            <svg class="starRating" viewBox="0 0 181 147" fill="#ffff00" xmlns="http://www.w3.org/2000/svg">
                            <path d="M90.8887 2.05473L115.135 47.0899L115.257 47.3147L115.51 47.3485L169.633 54.5577L130.5 89.5243L130.305 89.6989L130.337 89.959L137.261 145.506L91.1578 116.079L90.8887 115.907L90.6197 116.079L44.5165 145.506L51.4405 89.959L51.473 89.6989L51.2775 89.5243L12.1444 54.5577L66.2678 47.3485L66.5209 47.3147L66.642 47.0899L90.8887 2.05473Z" stroke="black" stroke-width="3px"/>
                            </svg>
                            
                            <svg class="starRating" viewBox="0 0 181 147" fill="#ffff00" xmlns="http://www.w3.org/2000/svg">
                            <path d="M90.8887 2.05473L115.135 47.0899L115.257 47.3147L115.51 47.3485L169.633 54.5577L130.5 89.5243L130.305 89.6989L130.337 89.959L137.261 145.506L91.1578 116.079L90.8887 115.907L90.6197 116.079L44.5165 145.506L51.4405 89.959L51.473 89.6989L51.2775 89.5243L12.1444 54.5577L66.2678 47.3485L66.5209 47.3147L66.642 47.0899L90.8887 2.05473Z" stroke="black" stroke-width="3px"/>
                            </svg>

                            <svg class="starRating" viewBox="0 0 181 147" fill="#ffff00" xmlns="http://www.w3.org/2000/svg">
                            <path d="M90.8887 2.05473L115.135 47.0899L115.257 47.3147L115.51 47.3485L169.633 54.5577L130.5 89.5243L130.305 89.6989L130.337 89.959L137.261 145.506L91.1578 116.079L90.8887 115.907L90.6197 116.079L44.5165 145.506L51.4405 89.959L51.473 89.6989L51.2775 89.5243L12.1444 54.5577L66.2678 47.3485L66.5209 47.3147L66.642 47.0899L90.8887 2.05473Z" stroke="black" stroke-width="3px"/>
                            </svg>

                            <svg class="starRating" viewBox="0 0 181 147" fill="#ffff00" xmlns="http://www.w3.org/2000/svg">
                            <path d="M90.8887 2.05473L115.135 47.0899L115.257 47.3147L115.51 47.3485L169.633 54.5577L130.5 89.5243L130.305 89.6989L130.337 89.959L137.261 145.506L91.1578 116.079L90.8887 115.907L90.6197 116.079L44.5165 145.506L51.4405 89.959L51.473 89.6989L51.2775 89.5243L12.1444 54.5577L66.2678 47.3485L66.5209 47.3147L66.642 47.0899L90.8887 2.05473Z" stroke="black" stroke-width="3px"/>
                            </svg>

                            <svg class="starRating" viewBox="0 0 181 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M83 2.26144L82.8887 2.05473L58.5209 47.3147L4.14441 54.5577L43.473 89.6989L36.5165 145.506L82.8887 115.907L83 115.978V2.26144Z" fill="#FFFF00"/>
                            <path d="M83 2.26145L83.1115 2.05473L107.524 47.3147L162 54.5577L122.599 89.6989L129.569 145.506L83.1115 115.907L83 115.978V2.26145Z" fill="#808080"/>
                            <path d="M82.8887 2.05473L107.135 47.0899L107.257 47.3147L107.51 47.3485L161.633 54.5577L122.5 89.5243L122.305 89.6989L122.337 89.959L129.261 145.506L83.1578 116.079L82.8887 115.907L82.6197 116.079L36.5165 145.506L43.4405 89.959L43.473 89.6989L43.2775 89.5243L4.14441 54.5577L58.2678 47.3485L58.5209 47.3147L58.642 47.0899L82.8887 2.05473Z" stroke="black" stroke-width="3"/>
                            </svg>
                        </span>
                        <span class="total-rating-number"> ${result.rating} </span>
                    </div>
                `;
        result.reviews.forEach((review) => {
          // Math.floor(review.rating)
          let starsRating = "";
          for (let i = 0; i < 5; i++) {
            let starColor =
              i + 1 <= Math.floor(review.rating) ? "#ffff00" : "gray";

            starsRating += `
                        <svg class="starRating" viewBox="0 0 181 147" fill="${starColor}" xmlns="http://www.w3.org/2000/svg">
                        <path d="M90.8887 2.05473L115.135 47.0899L115.257 47.3147L115.51 47.3485L169.633 54.5577L130.5 89.5243L130.305 89.6989L130.337 89.959L137.261 145.506L91.1578 116.079L90.8887 115.907L90.6197 116.079L44.5165 145.506L51.4405 89.959L51.473 89.6989L51.2775 89.5243L12.1444 54.5577L66.2678 47.3485L66.5209 47.3147L66.642 47.0899L90.8887 2.05473Z" stroke="black" stroke-width="3px"/>
                        </svg>
                    `;
          }

          reviewsElement.innerHTML += `
                <div class=" review ">
                    <a href="${
                      review.author_url
                    }" target="_blank" class="card-review-overlay-link"></a>
                    <div class="card-review">

                        <div class="card-review-header" >
                            <div class="card-info">
                                <div class="review-img"> <img src='${
                                  review.profile_photo_url
                                }' referrerpolicy="no-referrer"/> </div> 
                                <p class="review-name"> ${
                                  review.author_name
                                }                                         </p>
                            </div>
                            <div class="rating-container">
                                <div class="review-rating" > ${starsRating}                                </div> 
                            </div>
                        </div>

                        <div class="card-review-body"> 
                            <span class="review-text" > ${
                              review.text.length > 150
                                ? review.text.slice(0, 150) + "..."
                                : review.text
                            }                                                </span> 
                        </div>

                        <div class="card-review-footer">
                            <button class="btn-review-author_url">
                                <a class="review-author_url" href="${
                                  review.author_url
                                } "> Ver reseñas del usuario </a>
                            </button>
                        </div>

                    </div>
                </div>`;
        });
      });
    return this;
  };
};

export default {
  create: GoogleReviews,
  selector: ".js-google-reviews",
  key: "GoogleReviews",
};
