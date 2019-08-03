import './like-btn.scss'

const $likeButtons = $('.like-btn');

const handleClick = function({ currentTarget }) {
  const $clickedBtn = $(currentTarget);
  const $likesCounter = $('.like-btn__count', currentTarget);
  const likesCount = $likesCounter.text();

  $(currentTarget).toggleClass('like-btn--clicked');

  const isClicked = $clickedBtn.hasClass('like-btn--clicked');
  $likesCounter.text((isClicked) ? +likesCount + 1 : +likesCount - 1); // Increment or decrement likes

  $('.like-btn__icon', currentTarget).text((isClicked) ? 'favorite' : 'favorite_border'); // Change icon
};

$likeButtons.click(handleClick);
