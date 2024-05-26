export default function getRating({course}) {
    const sum = course?.reviews
        .map((review) => review.stars)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return (sum / course?.reviews.length).toFixed(1);
}
