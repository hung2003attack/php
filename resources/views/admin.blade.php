<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <link rel="stylesheet" href="{{asset('assets/clients/css/admin.css')}}" />
    <link rel="stylesheet" href="{{asset('assets/clients/css/bootstrap.min.css')}}" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
        integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="{{asset('assets/clients/js/jquery-3.6.0.min.js')}}">
    </script>
    <title>Document</title>
</head>

<body>
    <div class="d-flex">
        <div class="rowTabs"></div>
        <div class="tabs">
            <div class="tabProduct">
                <h3 class="tabTitle">Product<i class="fa-solid fa-chevron-up"></i></h3>
                <ul class="showResults">
                    <li class="ProductList">Product List</li>
                    <li class="CreateProduct">Create Product</li>
                    <li class="UpdateProduct">Update Product</li>
                    <li class="DeleteProduct">Delete Product</li>
                </ul>
            </div>
            <div class="tabCart" style="margin: 5px 0">
                <p>Information User Buy</p>
            </div>
        </div>
        <div class="classify">
            <ul>
                <li type="BirthDay">Birth Day</li>
                <li type="Anniversary">Anniversary</li>
                <li type="Friendship">Friendship</li>
                <li type="NewYear">New Year</li>
                <li type="MotherDay">Mother's Day</li>
                <li type="Giftitems">Gift Items</li>
            </ul>
            <div class="resultMenus">
                <div class="update"><button type="update">Up Date</button></div>
                <div class="resultMenu">

                </div>
            </div>
        </div>
        <div class="addProduct">
            <form id="addProduct" method="POST" action="/addProduct" enctype="multipart/form-data">
                @csrf
                <div class="insert"><input type="text" placeholder="Name Product *" name="name" />
                    @error('name')
                    <span style="color:red">{{$message}}</span>
                    @enderror
                </div>
                <div class="insert">
                    <input type="number" placeholder="Current Price Product *" step="0.01" name="currentPrice" />

                    @error('currentPrice')
                    <span style="color:red">{{$message}}</span>
                    @enderror
                </div>
                <div class="insert"><input type="number" placeholder="Price Before" step="0.01" name="priceBefore" />
                    @error('priceBefore')
                    <span style="color:red">{{$message}}</span>
                    @enderror
                </div>
                <div class="insert ">
                    <select name="type">
                        <option value="">Type</option>

                        <option value="BirthDay">BirthDay</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Friendship">Friendship</option>
                        <option value="BirthDay">BirthDay</option>
                        <option value="MotherDay">MotherDay</option>
                        <option value="GiftItems">Gift Items</option>
                    </select>
                    @error('type')
                    <span style="color:red">{{$message}}</span>
                    @enderror
                </div>
                <div class="insert"><input type="number" placeholder="inventory Number *" name="inventory" />
                    @error('inventory')
                    <span style="color:red">{{$message}}</span>
                    @enderror
                </div>


                <div class="insert"><input type="text" placeholder="sale" name="sale" />
                    @error('sale')
                    <span style="color:red">{{$message}}</span>
                    @enderror
                </div>

                <div class="insert"><textarea type="text" placeholder="Description *" name="description"></textarea>
                    @error('description')
                    <span style="color:red">{{$message}}</span>
                    @enderror
                </div>
                <div class="Image">
                    <div class="upLoad"><input type="file" name="image" />
                        @error('image')
                        <span style="color:red">{{$message}}</span>
                        @enderror
                    </div>
                    <div class="images">
                        <img
                            src="https://thuvienvector.com/upload/images/items/vector-chu-happy-birthday-trang-tri-mung-ngay-sinh-nhat-1692.webp" />
                    </div>
                </div>
                <input type="submit" value="Create" style="margin-top: 10px;" />
                <input type="hidden" id="_token" value="{{ csrf_token() }}">
            </form>

        </div>
        <div class="infoUserBuy">
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Adress</th>
                        <th scope="col">Note</th>
                        <th scope="col">Information Product</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Total Quantity</th>

                    </tr>
                </thead>
                <tbody>


                </tbody>
            </table>
        </div>

    </div>
</body>

<script src="{{asset('assets/clients/js/addProduct.js')}}"></script>

</html>