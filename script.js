document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    login();
});

document.getElementById('guest-login').addEventListener('click', function() {
    login(true);
});

document.getElementById('review-form').addEventListener('submit', function(e) {
    e.preventDefault();
    submitReview();
});

document.getElementById('logout').addEventListener('click', logout);

function login(isGuest = false) {
    if (isGuest) {
        localStorage.setItem('user', 'Guest');
    } else {
        const username = document.getElementById('username').value;
        localStorage.setItem('user', username);
    }
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('review-section').style.display = 'block';
    loadReviews();
}

function logout() {
    localStorage.removeItem('user');
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('review-section').style.display = 'none';
    document.getElementById('reviews').innerHTML = '';
}

function submitReview() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const duration = document.getElementById('duration').value;
    const reviewText = document.getElementById('review-text').value;
    const user = localStorage.getItem('user') || 'Guest';

    const review = {
        user,
        name,
        address,
        duration,
        reviewText,
        timestamp: new Date().toISOString()
    };

    let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    document.getElementById('review-form').reset();
    loadReviews();
}

function loadReviews() {
    const reviewsList = document.getElementById('reviews');
    reviewsList.innerHTML = '';
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.forEach(review => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${review.name}</strong> (${review.user}) at ${review.address} for ${review.duration}:<br>${review.reviewText}<br><small>${new Date(review.timestamp).toLocaleString()}</small>`;
        reviewsList.appendChild(li);
    });
}