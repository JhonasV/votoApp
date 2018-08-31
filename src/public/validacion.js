$(document).ready(() => {

    /**Validamos el formulario**/
    const monitor_btn = $(".monitor-btn")
    const formulario = ("#votacion_form")
    const inputSelector = ':input[required]:visible';

    function checkForm() {
        let isValidForm = true;
        $(this.form).find(inputSelector).each(function () {
            if (!this.value.trim()) {
                isValidForm = false;
            }
        })
        $(this.form).find('.monitor-btn').prop('disabled', !isValidForm);
        return isValidForm;
    }

    monitor_btn.closest('form')
        .submit(function () {
            return checkForm.apply($(this).find(':input')[0]);
        })
        .find(inputSelector).keyup(checkForm).keyup();


})
