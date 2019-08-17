import 'air-datepicker/dist/js/datepicker.js';
import 'air-datepicker/dist/css/datepicker.css';

import './c-datepicker.scss';

$('.c-datepicker').each(function() {
  const $datepickerInput = $('.c-datepicker__input', this);
  const $outputFields = $('.c-datepicker__start, .c-datepicker__end', this);
  const $outputStart = $('.c-datepicker__start', this);
  const $outputEnd = $('.c-datepicker__end', this);

  const defaultValue = $datepickerInput.val();

  const datepicker = $datepickerInput.datepicker({
    range: $(this).data('twoFields'),
    onSelect(formattedDate, date, inst) {
      const separator = inst.views.days.opts.multipleDatesSeparator;
      const [ firstDate, secondDate ] = formattedDate.split(separator);
      $outputStart.val(firstDate);
      $outputEnd.val(secondDate);
    }
  }).data('datepicker');

  $outputFields.on('click focus', () => {
    if (!datepicker.visible) {
      datepicker.show();
  }});

  const $controls = $('.c-datepicker__controls', this).removeClass('hidden');
  datepicker.$content.append($controls);

  $controls
    .find('.c-datepicker__reset')
    .click(() => {
      datepicker.clear();

      $datepickerInput // Set default value
        .add($outputFields)
        .val(defaultValue);
    });

  $controls
    .find('.c-datepicker__apply')
    .click(() => datepicker.hide());
});

$('.datepicker--nav-action[data-action="prev"]').append('<i class="material-icons">arrow_back</i>');
$('.datepicker--nav-action[data-action="next"]').append('<i class="material-icons">arrow_forward</i>');
