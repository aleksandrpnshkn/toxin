import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';
import './dropdown.scss';

const getNoun = function(num, one, two, five) {
  let lastDigits = num % 100;

  if (lastDigits > 4 && lastDigits < 21) {
    return five;
  }

  lastDigits %= 10;

  if (lastDigits === 1) {
    return one;
  } else if (lastDigits > 4 || lastDigits === 0) {
    return five;
  } else {
    return two;
  }
};

const getNounFromAttrs = function(count, $element) {
  const one = $element.attr('data-noun-one');
  const two = $element.attr('data-noun-two');
  const five = $element.attr('data-noun-five');
  return getNoun(count, one, two, five);
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

$('.dropdown').each((idx, dropdown) => {
  const $dropdown = $(dropdown);
  $dropdown.data('count', {}); // Init data object

  const isSeparate = $dropdown.hasClass('dropdown--separate');

  $('.iqdropdown', dropdown).iqDropdown({
    onChange(itemId, count, total) {
      if (isSeparate) {
        showSeparateSelection($dropdown, itemId, count);
      } else {
        showSelection($dropdown, total);
      }
    },
  });

  // Show selection text
  $('.iqdropdown-selection', dropdown).text($dropdown.attr('data-initial-selection-text'));
});
