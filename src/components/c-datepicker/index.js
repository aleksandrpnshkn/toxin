import './c-datepicker.scss';
import 'air-datepicker/dist/js/datepicker.js';
import 'air-datepicker/dist/css/datepicker.css';

// const showDatepicker = function() {
//   $datepicker.show();
// };


$('.c-datepicker').each(function() {
  console.log($(this));
  const $datepickerEl = $('.c-datepicker__input', this);
  const $outputFields = $('.c-datepicker__start, .c-datepicker__end', this);
  const $outputStart = $('.c-datepicker__start', this);
  const $outputEnd = $('.c-datepicker__end', this);

  const datepicker = $datepickerEl.datepicker({
    range: true,
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
});
//
//
//
// const $datepicker = $('.c-datepicker__input').datepicker({
//   range: true,
//   onSelect(formattedDate, date, inst) {
//     const separator = inst.views.days.opts.multipleDatesSeparator;
//     const [ firstDate, secondDate ] = formattedDate.split(separator);
//     $outputStart.val(firstDate);
//     $outputEnd.val(secondDate);
//   }
// }).data('datepicker');
//
// const showDatepicker = function() {
//   $datepicker.show();
// };
// $outputFields.on('click focus', showDatepicker);
