import Chartist from 'chartist';
import './rating-circle.scss';

import { getNoun } from '../../utils';

$('.rating-circle').each(function() {
  const $ratingCircle = $(this);
  const $chartEl = $('.rating-circle__chart', this);
  const $votes = $('.rating-circle__votes', this);

  const { greatVotes, goodVotes, okVotes, badVotes } = $ratingCircle.data();

  const chart = new Chartist.Pie($chartEl[0], {
    series: [greatVotes, goodVotes, okVotes, badVotes],
  }, {
    donut: true,
    donutWidth: 4,
    startAngle: 180,
    showLabel: false
  });

  chart.on('created', () => {
    let lastTarget; // debounce
    const $slices = $('.ct-slice-donut', $ratingCircle);
    const $labels = $('.bullet-list__item', $ratingCircle);

    const $greatSlice = $('.ct-series-a .ct-slice-donut', $ratingCircle);
    const $goodSlice = $('.ct-series-b .ct-slice-donut', $ratingCircle);
    const $okSlice = $('.ct-series-c .ct-slice-donut', $ratingCircle);
    const $badSlice = $('.ct-series-d .ct-slice-donut', $ratingCircle);

    // Save data for usage on hover
    $greatSlice.add('.bullet-list__item:nth-child(1)', $ratingCircle)
      .data('vote-type', 'great')
      .data('votes', greatVotes);
    $goodSlice.add('.bullet-list__item:nth-child(2)', $ratingCircle)
      .data('vote-type', 'good')
      .data('votes', goodVotes);
    $okSlice.add('.bullet-list__item:nth-child(3)', $ratingCircle)
      .data('vote-type', 'ok')
      .data('votes', okVotes);
    $badSlice.add('.bullet-list__item:nth-child(4)', $ratingCircle)
      .data('vote-type', 'bad')
      .data('votes', badVotes);

    const showVotesCount = function({ target }) {
      if (lastTarget === target) return;
      lastTarget = target;

      const votes = $(target).data('votes');

      $votes.find('.rating-circle__votes-count').text(votes);
      $votes.find('.rating-circle__votes-noun').text(getNoun(votes, 'голос', 'голоса', 'голосов'));
    };

    const hoveredMod = 'ct-slice-donut--hovered';

    const addHoveredMod = function({ target }) { // TODO переключать через объект, хранить текущий элемент в аттрибуте главного контейнера
      switch ($(target).data('vote-type')) {
        case 'great':
          $greatSlice.addClass(hoveredMod);
          break;
        case 'good':
          $goodSlice.addClass(hoveredMod);
          break;
        case 'ok':
          $okSlice.addClass(hoveredMod);
          break;
        case 'bad':
          $badSlice.addClass(hoveredMod);
          break;
      }
    };

    const removeHoveredMod = function({ target }) {
      switch ($(target).data('vote-type')) {
        case 'great':
          $greatSlice.removeClass(hoveredMod);
          break;
        case 'good':
          $goodSlice.removeClass(hoveredMod);
          break;
        case 'ok':
          $okSlice.removeClass(hoveredMod);
          break;
        case 'bad':
          $badSlice.removeClass(hoveredMod);
          break;
      }
    };

    $slices.mouseover(showVotesCount);
    $labels.mouseover(showVotesCount);
    $slices.hover(addHoveredMod, removeHoveredMod);
    $labels.hover(addHoveredMod, removeHoveredMod);
  });
});

