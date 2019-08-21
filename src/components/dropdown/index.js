import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';
import './dropdown.scss';
import { getNoun } from './../../utils';

const getNounFromAttrs = function(count, $element) {
  const one = $element.attr('data-noun-one');
  const two = $element.attr('data-noun-two');
  const five = $element.attr('data-noun-five');
  return getNoun(count, one, two, five);
};

const showDefaultSelectionText = function($dropdown) {
  $('.iqdropdown-selection', $dropdown).text($dropdown.attr('data-initial-selection-text'));
};

const showSelection = function($dropdown, total) {
  const noun = getNounFromAttrs(total, $dropdown);
  $('.iqdropdown-selection', $dropdown).text(`${total} ${noun}`);
};

const showSeparateSelection = function($dropdown, itemId, count) {
  const countData = Object.assign($dropdown.data('count'), {[itemId]: count}); // Get refreshed count data
  $dropdown.data('count', countData); // Store new data

  let selectionArr = [];
  for (let item in countData) {
    const $item = $(`[data-id=${item}]`, $dropdown); // Find item
    const currentCount = countData[item] || 0; // Get count
    const noun = getNounFromAttrs(currentCount, $item); // Get noun
    selectionArr.push(`${currentCount} ${noun}`); // Push text in array
  }
  $('.iqdropdown-selection', $dropdown).text(selectionArr.join(', ')); // Set selection text
};

$('.dropdown').each(function() {
  const $dropdown = $(this);
  const $controls = $('.dropdown__controls', $dropdown);

  $dropdown.data('count', {}); // Init data object

  const isSeparate = $dropdown.hasClass('dropdown--separate');

  $('.iqdropdown', $dropdown).iqDropdown({
    onChange(itemId, count, total) {
      if (isSeparate) {
        showSeparateSelection($dropdown, itemId, count);
      } else {
        showSelection($dropdown, total);
      }

      if (total) {
        $('.dropdown__reset-btn', $dropdown).removeClass('hidden');
      } else {
        showDefaultSelectionText($dropdown);
        $('.dropdown__reset-btn', $dropdown).addClass('hidden');
      }
    },
  });

  // Prevent close if controls is clicked (click handler in item-quantity-dropdown)
  $controls.click((e) => e.stopPropagation());

  showDefaultSelectionText($dropdown);
});
