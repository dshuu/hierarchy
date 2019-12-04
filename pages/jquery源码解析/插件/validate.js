Validator = {
    elementErrorClass: 'error',
    languages: {
        'en': {
            textbox: {
                required: 'This field is required',
                min: 'This field must contain at least {characters} characters',
                max: 'This field must not contain more than {characters} characters',
                email: 'Email is not valid',
                url: 'Website is not valid',
                number: 'Only numbers',
                digits: 'Only numbers'
            },
            password: {
                required: 'This field is required',
                min: 'This field must contain at least {characters} characters',
                max: 'This field must not contain more than {characters} characters',
                match: 'The passwords do not match'
            },
            radio: {},
            checkbox: {
                required: 'This checkbox is required'
            },
            select: {
                required: 'Choose a field from the list'
            },
            textarea: {
                required: 'This field is required',
                min: 'This field must contain at least {characters} characters',
                max: 'This field must not contain more than {characters} characters',
                url: 'Website is not valid'
            }
        }
    },
    showError: function (element, text) {
        if (!$(element).hasClass(Validator.elementErrorClass)) {
            var error = document.createElement('div');
            $(error).addClass('validator-error').html(text);
            if ($(element).attr('data-error-position') == undefined) {
                var errorPosition = 'before';
                if ($(this).is('input') && $(this).attr('type') == 'checkbox') {
                    errorPosition = 'before label';
                }
            } else {
                errorPosition = $(element).attr('data-error-position');
            }
            var attrValue = errorPosition.split(' ');
            var targetElementForError;
            if (attrValue[1] == undefined) {
                targetElementForError = element;
            } else {
                targetElementForError = $(element).closest(attrValue[1])[0];
            }
            if (attrValue[0] == 'before') {
                $(targetElementForError).before(error);
            } else if (attrValue[0] == 'after') {
                $(targetElementForError).after(error);
            }
            $(targetElementForError).addClass(Validator.elementErrorClass);
            if ($(element).attr('data-match') != undefined) {
                $('#' + $(element).attr('data-match')).addClass(Validator.elementErrorClass);
            }
        }
    },
    validate: function (form) {
        var hasErrors = false;
        var firstErrorElement = null;
        Validator.removeErrors(form);
        $(form).find('input, select, textarea').each(function () {
            var regex = null;
            if ($(this).is('input') && ($(this).attr('type') == 'text' || $(this).attr('type') ==
                    undefined)) {
                if ($(this).attr('data-required') != undefined && $(this).val() == '' && $(this).attr(
                        'data-required-if') == undefined) {
                    Validator.showError(this, Validator.languages[Validator.language].textbox.required);
                    hasErrors = true;
                }
                if ($(this).attr('data-required-if') != undefined && $(this).val() == '' && (($(this).attr(
                        'data-required-if-value') == undefined && $('#' + $(this).attr(
                        'data-required-if')).is(':checked')) || ($(this).attr(
                        'data-required-if-value') != undefined && $('#' + $(this).attr(
                        'data-required-if')).val() == $(this).attr('data-required-if-value')))) {
                    Validator.showError(this, Validator.languages[Validator.language].textbox.required);
                    hasErrors = true;
                }
                if ($(this).attr('data-min') != undefined && $(this).val().length < parseFloat($(this).attr(
                        'data-min')) && $(this).val().length != 0) {
                    Validator.showError(this, Validator.languages[Validator.language].textbox.min.replace(
                        '{characters}', $(this).attr('data-min')));
                    hasErrors = true;
                }
                if ($(this).attr('data-max') != undefined && $(this).val().length > parseFloat($(this).attr(
                        'data-max'))) {
                    Validator.showError(this, Validator.languages[Validator.language].textbox.max.replace(
                        '{characters}', $(this).attr('data-min')));
                    hasErrors = true;
                }
                if ($(this).attr('data-type') != undefined) {
                    switch ($(this).attr('data-type')) {
                        case 'email':
                            regex =
                                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test($(this).val()) && $(this).val() != '') {
                                Validator.showError(this, Validator.languages[Validator.language].textbox
                                    .email);
                                hasErrors = tr
                                ique;
                            }
                            break;
                        case 'url':
                            regex =
                                /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_{},.~+=-]*)?(\#[-a-z\d_]*)?$/i;
                            if (!regex.test($(this).val().replace('_', '')) && $(this).val() != '') {
                                Validator.showError(this, Validator.languages[Validator.language].textbox
                                    .url);
                                hasErrors = true;
                            }
                            break;
                        case 'number':
                            regex = /^\s*(\+|-)?((\d+([\.,]\d+)?)|([\.,]\d+))\s*$/;
                            if (!regex.test($(this).val()) && $(this).val() != '') {
                                Validator.showError(this, Validator.languages[Validator.language].textbox
                                    .number);
                                hasErrors = true;
                            }
                            break;
                        case 'digits':
                            regex = /^\s*\d+\s*$/;
                            if (!regex.test($(this).val()) && $(this).val() != '') {
                                Validator.showError(this, Validator.languages[Validator.language].textbox
                                    .digits);
                                hasErrors = true;
                            }
                            break;
                    }
                }
            }
            if ($(this).is('input') && $(this).attr('type') == 'password') {
                if ($(this).attr('data-required') != undefined && $(this).val() == '' && $(this).attr(
                        'data-required-if') == undefined) {
                    Validator.showError(this, Validator.languages[Validator.language].password.required);
                    hasErrors = true;
                }
                if ($(this).attr('data-required-if') != undefined && $(this).val() == '' && (($(this).attr(
                        'data-required-if-value') == undefined && $('#' + $(this).attr(
                        'data-required-if')).is(':checked')) || ($(this).attr(
                        'data-required-if-value') != undefined && $('#' + $(this).attr(
                        'data-required-if')).val() == $(this).attr('data-required-if-value')))) {
                    Validator.showError(this, Validator.languages[Validator.language].password.required);
                    hasErrors = true;
                }
                if ($(this).attr('data-min') != undefined && $(this).val().length < parseFloat($(this).attr(
                        'data-min')) && $(this).val().length != 0) {
                    Validator.showError(this, Validator.languages[Validator.language].password.min.replace(
                        '{characters}', $(this).attr('data-min')));
                    hasErrors = true;
                }
                if ($(this).attr('data-max') != undefined && $(this).val().length > parseFloat($(this).attr(
                        'data-max'))) {
                    Validator.showError(this, Validator.languages[Validator.language].password.max.replace(
                        '{characters}', $(this).attr('data-min')));
                    hasErrors = true;
                }
                if ($(this).attr('data-match') != undefined && $(this).val() != $('#' + $(this).attr(
                        'data-match')).val()) {
                    Validator.showError(this, Validator.languages[Validator.language].password.match);
                    hasErrors = true;
                }
            }
            if ($(this).is('input') && $(this).attr('type') == 'radio') {}
            if ($(this).is('input') && $(this).attr('type') == 'checkbox') {
                if ($(this).attr('data-required') != undefined && !$(this).is(':checked') && $(this).attr(
                        'data-required-if') == undefined) {
                    Validator.showError(this, Validator.languages[Validator.language].checkbox.required);
                    hasErrors = true;
                }
                if ($(this).attr('data-required-if') != undefined && $(this).val() == '' && (($(this).attr(
                        'data-required-if-value') == undefined && $('#' + $(this).attr(
                        'data-required-if')).is(':checked')) || ($(this).attr(
                        'data-required-if-value') != undefined && $('#' + $(this).attr(
                        'data-required-if')).val() == $(this).attr('data-required-if-value')))) {
                    Validator.showError(this, Validator.languages[Validator.language].checkbox.required);
                    hasErrors = true;
                }
            }
            if ($(this).is('select')) {
                if ($(this).attr('data-required') != undefined && $(this).val() == '' && $(this).attr(
                        'data-required-if') == undefined) {
                    Validator.showError(this, Validator.languages[Validator.language].select.required);
                    hasErrors = true;
                }
                if ($(this).attr('data-required-if') != undefined && $(this).val() == '' && (($(this).attr(
                        'data-required-if-value') == undefined && $('#' + $(this).attr(
                        'data-required-if')).is(':checked')) || ($(this).attr(
                        'data-required-if-value') != undefined && $('#' + $(this).attr(
                        'data-required-if')).val() == $(this).attr('data-required-if-value')))) {
                    Validator.showError(this, Validator.languages[Validator.language].select.required);
                    hasErrors = true;
                }
            }
            if ($(this).is('textarea')) {
                if ($(this).attr('data-required') != undefined && $(this).val() == '' && $(this).attr(
                        'data-required-if') == undefined) {
                    Validator.showError(this, Validator.languages[Validator.language].textarea.required);
                    hasErrors = true;
                }
                if ($(this).attr('data-required-if') != undefined && $(this).val() == '' && (($(this).attr(
                        'data-required-if-value') == undefined && $('#' + $(this).attr(
                        'data-required-if')).is(':checked')) || ($(this).attr(
                        'data-required-if-value') != undefined && $('#' + $(this).attr(
                        'data-required-if')).val() == $(this).attr('data-required-if-value')))) {
                    Validator.showError(this, Validator.languages[Validator.language].textarea.required);
                    hasErrors = true;
                }
                if ($(this).attr('data-min') != undefined && $(this).val().length < parseFloat($(this).attr(
                        'data-min')) && $(this).val().length != 0) {
                    Validator.showError(this, Validator.languages[Validator.language].textarea.min.replace(
                        '{characters}', $(this).attr('data-min')));
                    hasErrors = true;
                }
                if ($(this).attr('data-max') != undefined && $(this).val().length > parseFloat($(this).attr(
                        'data-max'))) {
                    Validator.showError(this, Validator.languages[Validator.language].textarea.max.replace(
                        '{characters}', $(this).attr('data-min')));
                    hasErrors = true;
                }
                if ($(this).attr('data-type') != undefined) {
                    switch ($(this).attr('data-type')) {
                        case 'url':
                            regex =
                                /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_{},.~+=-]*)?(\#[-a-z\d_]*)?$/i;
                            if (!regex.test($(this).val()) && $(this).val() != '') {
                                Validator.showError(this, Validator.languages[Validator.language].textarea
                                    .url);
                                hasErrors = true;
                            }
                            break;
                    }
                }
            }
            if (hasErrors && firstErrorElement == null) {
                firstErrorElement = this;
                $(this).focus();
            }
        });
        return !hasErrors;
    },
    removeErrors: function (form) {
        $(form).find('.validator-error').each(function () {
            $(this).remove();
        });
        $(form).find('.error').each(function () {
            $(this).removeClass('error');
        });
        $(form).find(
            'input[type=text], input[type=password], input[type=radio], input[type=checkbox], select, textarea'
        ).each(function () {
            if ($(this).attr('type') == 'radio' || $(this).attr('type') == 'checkbox') {
                $(this).closest('label').removeClass(Validator.elementErrorClass);
            } else {
                $(this).removeClass(Validator.elementErrorClass);
            }
        });
    }
};
$(function () {
    $('form.validator').each(function () {
        $(this).submit(function () {
            return Validator.validate(this);
        });
    });
});