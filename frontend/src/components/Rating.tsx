import React from "react";

type Props = {
  rating: number;
  numReviews: number;
};

export default function Rating({ rating, numReviews }: Props) {
  const classes = [];

  const FULL_STAR = "fa fa-star";
  const HALF_STAR = "fas fa-star-half-alt";
  const EMPTY_STAR = "far fa-star";

  const [star, halfStar] = String(rating).split(".");
  for (let i = 0; i < Number(star); i++) {
    classes.push(FULL_STAR);
  }
  if (Number(star) !== 5) {
    for (let i = 0; i < 5 - Number(star); i++) {
      if (halfStar && i === 0) classes.push(HALF_STAR);
      else classes.push(EMPTY_STAR);
    }
  }
  return (
    <div className="rating">
      {classes.map((cls, index) => (
        <span key={index}>
          <i className={cls} />
        </span>
      ))}
      <span>{`${numReviews} reviews`}</span>
    </div>
  );
}
