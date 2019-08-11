import './checkbox-list.scss';

$('.checkbox-list--expandable').each(function() {
  const $checkbox = $(this);
  const $checkboxListContent = $('.checkbox-list__list', $checkbox);
  const $checkboxListTitle = $('.checkbox-list__title', $checkbox);

  const toggleCheckbox = function() {
    const isExpanded = $checkbox.attr('aria-expanded') === 'true';
    console.log(isExpanded, !isExpanded);
    $checkbox.attr('aria-expanded', !isExpanded);
    $checkboxListContent.slideToggle();
  };

  $checkboxListTitle.click(toggleCheckbox);
  toggleCheckbox();
});
