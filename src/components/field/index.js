import 'jquery.maskedinput/src/jquery.maskedinput';
import './field.scss';

$('.field__input[data-masked]').each(function() {
  const $field = $(this);
  const maskType = $field.data('masked');

  if (maskType === 'date') {
    $field.mask('99.99.9999', {
      autoclear: false,
      placeholder: 'ДД.ММ.ГГГГ',
    });
  }
});
