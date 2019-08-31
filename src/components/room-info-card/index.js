import 'slick-carousel';
import 'slick-carousel/slick/slick.scss';

import './room-info-card.scss';

$('.room-info-card__carousel').slick({
  dots: true,
  arrows: false,
  infinite: false,
});

// Prevent default if user clicked on dots
$('.room-info-card__link').click((e) => {
  const clickOnDots = $('.slick-dots', e.currentTarget).find(e.target).length > 0;

  if (clickOnDots) {
    e.preventDefault();
  }
});
