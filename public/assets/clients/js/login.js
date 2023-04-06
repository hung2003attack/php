// // const $ = document.querySelector.bind(document)
// // const $$ = document.querySelector.bind(document)
// // const form = $('form')
$(document).ready(function () {
    $('.mx-md-4').on('submit', function (e) {
        e.preventDefault()
        const Email = $('input[name=email]').val()
        const password = $('input[name=password]').val()
        const url = $(this).attr('action')
        console.log(url);
        const token = $('#token').val()
        console.log(token);
        if (Email && password) {
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    _token: token,
                    email: Email,
                    password: password,
                },

                success: function (reponse) {
                    if (reponse && reponse.id && reponse.email) {

                       
                            localStorage.setItem('auth', JSON.stringify({ checked: true, name: reponse.name, id: reponse.id }));
                            window.location.href = '/'

                        
                    } else {
                        $('.check').text('Wrong account or password');
                        localStorage.setItem('auth', false);

                    }
                },
                err: function (err) {
                    console.log(err);
                }
            })
        }
        if (!Email) {
            $('.email').text('Please Enter');
        } else {
            $('.email').text('')
        }
        if (!password) {
            $('.password').text('Please Enter');

        } else {
            $('.password').text('')
        }

    })
})
