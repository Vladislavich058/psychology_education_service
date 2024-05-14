export default function getRating({course}) {
    console.log(course.reviews);
    const sum = course?.reviews
        .map((review) => review.stars)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(sum);
    return (sum / course?.reviews.length).toFixed(1);
}
