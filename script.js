
/* =========================
   MOBILE NAVIGATION
========================= */

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", function () {
    navbar.classList.toggle("active");
});

// Close mobile menu after clicking a link

document.querySelectorAll("#navbar a").forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("active");
    });
});


/* =========================
   CUSTOMER REVIEWS
========================= */

const reviews = [
    {
        name: "Rahul Sharma",
        rating: "★★★★★",
        text: "Nice product presentation and a convenient addition to my nutrition routine.",
        image: "https://i.pravatar.cc/100?img=12"
    },
    {
        name: "Aman Verma",
        rating: "★★★★★",
        text: "Good experience exploring the product and its details.",
        image: "https://i.pravatar.cc/100?img=13"
    },
    {
        name: "Rohit Kumar",
        rating: "★★★★☆",
        text: "The website is easy to navigate and product information is clear.",
        image: "https://i.pravatar.cc/100?img=14"
    },
    {
        name: "Vikash Singh",
        rating: "★★★★★",
        text: "A clean and convenient product browsing experience.",
        image: "https://i.pravatar.cc/100?img=15"
    },
    {
        name: "Arjun Mehta",
        rating: "★★★★★",
        text: "Nice design and an easy-to-understand product section.",
        image: "https://i.pravatar.cc/100?img=16"
    },
    {
        name: "Karan Patel",
        rating: "★★★★☆",
        text: "The product details are presented in a simple format.",
        image: "https://i.pravatar.cc/100?img=17"
    },
    {
        name: "Sahil Gupta",
        rating: "★★★★★",
        text: "A modern fitness product website with a smooth layout.",
        image: "https://i.pravatar.cc/100?img=18"
    },
    {
        name: "Deepak Yadav",
        rating: "★★★★★",
        text: "The product and fitness sections are easy to explore.",
        image: "https://i.pravatar.cc/100?img=19"
    }
];

const reviewTrack = document.getElementById("review-track");
const reviewDots = document.getElementById("review-dots");

const reviewPrev = document.getElementById("review-prev");
const reviewNext = document.getElementById("review-next");

let reviewIndex = 0;

function getReviewsPerPage() {
    return window.innerWidth <= 600 ? 1 : 3;
}

function getTotalReviewPages() {
    return Math.ceil(reviews.length / getReviewsPerPage());
}

function renderReviews() {

    reviewTrack.innerHTML = "";
    reviewDots.innerHTML = "";

    const reviewsPerPage = getReviewsPerPage();
    const totalPages = getTotalReviewPages();

    reviewIndex = reviewIndex % totalPages;

    const start = reviewIndex * reviewsPerPage;

    const visibleReviews = reviews.slice(
        start,
        start + reviewsPerPage
    );

    visibleReviews.forEach(function (review) {

        const reviewCard = document.createElement("div");

        reviewCard.className = "review-card";

        reviewCard.innerHTML = `
            <div class="review-user">

                <img src="${review.image}" alt="Demo reviewer">

                <div>
                    <h3>${review.name}</h3>
                    <span>${review.rating}</span>
                </div>

            </div>

            <p>${review.text}</p>
        `;

        reviewTrack.appendChild(reviewCard);
    });

    // Create review pagination dots

    for (let i = 0; i < totalPages; i++) {

        const dot = document.createElement("button");

        dot.className = "review-dot";

        if (i === reviewIndex) {
            dot.classList.add("active");
        }

        dot.setAttribute("aria-label", "Review page " + (i + 1));

        dot.addEventListener("click", function () {
            reviewIndex = i;
            renderReviews();
        });

        reviewDots.appendChild(dot);
    }
}

reviewNext.addEventListener("click", function () {

    reviewIndex++;

    if (reviewIndex >= getTotalReviewPages()) {
        reviewIndex = 0;
    }

    renderReviews();
});

reviewPrev.addEventListener("click", function () {

    reviewIndex--;

    if (reviewIndex < 0) {
        reviewIndex = getTotalReviewPages() - 1;
    }

    renderReviews();
});

// Automatic review slider

let reviewAutoSlide = setInterval(function () {

    reviewIndex++;

    if (reviewIndex >= getTotalReviewPages()) {
        reviewIndex = 0;
    }

    renderReviews();

}, 4000);

// Recalculate reviews when screen size changes

window.addEventListener("resize", renderReviews);

renderReviews();

