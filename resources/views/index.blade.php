<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
        integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('assets/clients/css/style.css')}}" />
    <link rel="stylesheet" href="{{asset('assets/clients/css/styleFooter.css')}}" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{asset('assets/clients/css/index.css')}}" />
    <link rel="stylesheet" href="{{asset('assets/clients/css/mediaResponsive.css')}}" />
    <link rel="stylesheet" href="{{asset('assets/clients/css/body.css')}}" />
    <link rel="stylesheet" href="{{asset('assets/clients/css/product.css')}}" />
    <link rel="stylesheet" href="{{asset('assets/clients/css/searchFeedback.css')}}" />
    <link rel="preconnect" href="https://fonts.gstatic.com">

    <script src="{{asset('assets/clients/js/jquery-3.6.0.min.js')}}">
    </script>
    <script src="{{asset('assets/clients/js/bootstrap.min.js')}}"></script>
    <link rel="stylesheet" href="{{asset('assets/clients/css/bootstrap.min.css')}}" />
    <style>
    .carousel-item img {
        width: 100%;
        background-size: cover;
    }
    </style>
    <title>Document</title>
</head>

<body>
    <div class="header">
        <a href="/" class="logo"><img src="/assets/clients/images/logo1.png" alt="papyrus"
                style="    width: 100%;height: 100%;object-fit: cover;" /></a>
        <div class="auth">
            <a href="auth/login" id="login">Login</a><a href="auth/register">Register</a>
            <p id="logout"></p>
        </div>

        <div class="menu">
            <div class="home">Home</div>
            <div class="product10">Products
                <ul class="children">
                    <li><a href="#product" type="all">All</a></li>
                    <li><a href="#product" type="BirthDay">Birth Date</a></li>
                    <li><a href="#product" type="Anniversary"> Anniversary</a></li>
                    <li><a href="#product" type="Friendship">Friendship</a></li>
                    <li><a href="#product" type="Newyear">New year</a></li>
                    <li><a href="#product" type="MotherDay">Mother's Day</a></li>
                </ul>
            </div>
            <div class="top">Top Selling Section</div>
            <div class="sale">Sales</div>
            <div class="gift">Gift Items</div>
            <div class="contact">Contact us</div>
            <div class="about"><a href="#about" style="color:#333; ">About us</a></div>
        </div>
        <details class="MenuRes">
            <summary>Menu</summary>
            <div class="menuDetails">
                <div class="home">Home</div>
                <div class="product10">Products
                    <ul class="children">
                        <li><a href="#product" type="all">All</a></li>
                        <li><a href="#product" type="BirthDay">Birth Date</a></li>
                        <li><a href="#product" type="Anniversary"> Anniversary</a></li>
                        <li><a href="#product" type="Friendship">Friendship</a></li>
                        <li><a href="#product" type="Newyear">New year</a></li>
                        <li><a href="#product" type="MotherDay">Mother's Day</a></li>
                    </ul>
                </div>
                <div class="top">Top Selling Section</div>
                <div class="sale">Sales</div>
                <div class="gift">Gift Items</div>
                <div class="contact">Contact us</div>
                <div class="about"><a href="#about" style="color:#333; ">About us</a></div>
            </div>
        </details>
        <div class="carts"><img src="/assets/clients/images/cart.webp" alt="Cart" />
            <p class="cartsNumber"></p>
            <div class=" helloCartss">
                <div class="helloCart resultCarts"></div>
                <button class="btn btn-primary checkout" style="display: flex; margin: 10px auto">Check out</button>
            </div>


        </div>
        <div class="showUser"><img src="/assets/clients/images/user.png" alt="User" />
            <p>5</p>
        </div>
        <div class="down"></div>
        <div class="down1"></div>
    </div>
    <div id="body">
    </div>
    <div class='addProductBar'>
        <div class="productDetail">
        </div>
    </div>
    <div class="background"></div>
    <footer id="about">
        <div class="container">
            <div class="aboutUs">
                <div style="display: flex; ">
                    <div style="width: 50px"><img src="/assets/clients/images/logo1.png" alt="" align="left"
                            style="object-fit: cover; width: 100%; height:100%"></div>
                    <h2>About Us</h2>
                </div>
                <p>Papyrus is a company specializing in providing Birthday, Anniversary, Friendship, Gift. We guarantee
                    the quality of the product, if you have any problems, please contact info.</p>
                <ul class="social-icon">
                    <li><a href=""><i class="fa fa-facebook"></i></a></li>
                    <li><a href=""><i class="fa fa-twitter"></i></a></li>
                    <li><a href=""><i class="fa fa-instagram"></i></a></li>
                    <li><a href=""><i class="fa fa-youtube"></i></a></li>
                </ul>
            </div>
            <div class="linksAbout">
                <h2>Paprus</h2>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Product</a></li>
                    <li class="contact" style="display: inline"><a href="#">Contact us</a></li>
                </ul>
            </div>
            <div class="contactAbout">
                <h2>Contact Info</h2>
                <ul class="infoAboute">
                    <li style="margin-bottom: 8px;">
                        <span><i class="fa fa-map-marker"></i></span>
                        <span>285 Doi Can, Lieu dai, Ba Dinh, Ha Noi</span>
                    </li>
                    <li style="display: flex;">
                        <span style="margin-right: 7px;"><i class="fa fa-phone"></i></span>
                        <p><a href="#">0123456789</a></p>
                    </li>
                    <li style="display: flex;margin-bottom: 5px;">
                        <span style="margin-right: 7px;"><i class="fa fa-envelope"></i></span>
                        <p><a href="#">diachiemail@gmail.com</a></p>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
    <div class="resultsCheckout">
        <div class="showProductCheckout"></div>
        <div class="informationUser">
            <form action="{{route('info')}}" id="userBuyProduct" method="post">


                <!-- Email input -->
                <div class="form-outline mb-4">
                    <input type="number" id="form3Example3" class="form-control form-control-lg" name="phone"
                        placeholder="Phone" />
                </div>

                <!-- Password input -->
                <div class="form-outline mb-3">
                    <input type="text" id="form3Example4" class="form-control form-control-lg" placeholder="Adress"
                        name="adress" />
                </div>

                <div class="form-outline mb-3">
                    <textarea type="text" id="form3Example4" class="form-control form-control-lg" placeholder="Note"
                        name="note"></textarea>
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                    <input type="submit" class="btn btn-primary btn-lg"
                        style="padding-left: 2.5rem; padding-right: 2.5rem;" value="Buy" />
                    <input type="hidden" name="_token" id="token" value="{{ csrf_token() }}">

                </div>
            </form>
            <div class="total">
                <div>Total Price:
                    <span id="totalPrice"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="realTime"></div>
</body>
<script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>

<!-- Initialize Swiper -->
<script>

</script>
<script src="{{asset('assets/clients/js/main.js')}}">
</script>

<script src="{{asset('assets/clients/js/carts.js')}}"></script>

</script>

</html>