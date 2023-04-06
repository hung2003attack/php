const background = query(".background");
const cart = query('.helloCartss')

$('.carts').on('click', () => {
    if (JSON.parse(localStorage.getItem('auth'))?.id) {
        background.classList.toggle("show", !checkBackground);
        cart.classList.add('resultCartsss')

    } else {
        window.location.href = 'auth/login'
    }
})
$('.background').on('click', function () {
    cart.classList.remove('resultCartsss')
    background.classList.remove("show");
    const checkout = query('.showProductCheckout')
    checkout.innerHTML = ''
    $('.resultsCheckout').removeClass('resultsCheckoutShow')
});
function display_ct7() {
    var x = new Date()
    var ampm = x.getHours() >= 12 ? ' PM' : ' AM';
    hours = x.getHours() % 12;
    hours = hours ? hours : 12;
    hours = hours.toString().length == 1 ? 0 + hours.toString() : hours;

    var minutes = x.getMinutes().toString()
    minutes = minutes.length == 1 ? 0 + minutes : minutes;

    var seconds = x.getSeconds().toString()
    seconds = seconds.length == 1 ? 0 + seconds : seconds;

    var month = (x.getMonth() + 1).toString();
    month = month.length == 1 ? 0 + month : month;

    var dt = x.getDate().toString();
    dt = dt.length == 1 ? 0 + dt : dt;

    var x1 = dt + "/" + month + "/" + x.getFullYear();
    x1 = hours + ":" + minutes + ":" + seconds + " " + ampm + "  " + x1;
    document.querySelector('.realTime').innerHTML = x1;
    display_c7();
}
function display_c7() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('display_ct7()', refresh)
}
display_c7()