<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('assets/clients/css/bootstrap.min.css')}}" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
        integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>Document</title>
</head>

<body>
    <div class="container ">
        @error('messageR')
        <span class="alert alert-danger">{{messageR}}</span>
        @enderror

        <form class="mt-4" method="post" action="">
            @csrf
            <section class="vh-100" style="background-color: #eee;">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-12 col-xl-11">
                            <div class="card text-black" style="border-radius: 25px;">
                                <div class="card-body p-md-5">
                                    <div class="row justify-content-center">
                                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form class="mx-1 mx-md-4">

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" class="form-control"
                                                            placeholder="Your Name" name="name" />
                                                        @error('name')
                                                        <span style="color:red">{{$message}}</span>
                                                        @enderror
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fa-solid fa-phone" style="margin-right: 25px;"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <input type="number" id="form3Example3c" class="form-control"
                                                            name="phone" placeholder="Your Phone" />
                                                        @error('phone')
                                                        <span style="color:red">{{$message}}</span>
                                                        @enderror
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" class="form-control"
                                                            name="email" placeholder="Your Email" />
                                                        @error('email')
                                                        <span style="color:red">{{$message}}</span>
                                                        @enderror
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4c" class="form-control"
                                                            name="password" placeholder="Your Password" />
                                                        @error('password')
                                                        <span style="color:red">{{$message}}</span>
                                                        @enderror
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4cd" class="form-control"
                                                            name="retypePassword" placeholder="Repeat Password" />
                                                        @error('retypePassword')
                                                        <span style="color:red">{{$message}}</span>
                                                        @enderror
                                                    </div>
                                                </div>



                                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <input type="submit" class="btn btn-primary btn-lg"
                                                        value="Register" />
                                                </div>

                                            </form>

                                        </div>
                                        <div
                                            class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                class="img-fluid" alt="Sample image">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </form>
    </div>
    <script src="{{asset('assets/clients/js/bootstrap.min.js')}}"></script>

</body>

</html>