
const check = false
if (JSON.parse(localStorage.getItem('auth'))) {
  console.log(JSON.parse(localStorage.getItem('auth'))?.admin);
  if (JSON.parse(localStorage.getItem('auth'))?.checked == true) {
    $('#login').text(JSON.parse(localStorage.getItem('auth'))?.name)
    console.log('vol');
  }
}
if ($('#login').text() == JSON.parse(localStorage.getItem('auth'))?.name) {
  $('#login').addClass('hoverLogin')
  $('#logout').addClass('logout')
  $('#logout').text('Logout')
  $('.logout').on('click', function () {
    localStorage.setItem('auth', false)
    window.location.reload()
  })

} else {
  $('#login').removeClass('hoverLogin')
  $('#logout').removeClass('logout')
  $('#logout').text('')
}

scroll()
function scroll() {
  document.onscroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop
    if (scrollY >= 148) {
      $('.header').addClass('up')
      $('.down').addClass('pull');
      $('.down').text('Pull Down')
      $('.pull').on('click', function () {
        $('.header').css('top', '0px')
        $('.down1').addClass('check')
        $('.check').text('Pull Up')
        $('.down').removeClass('pull');
        $('.check').on('click', () => {
          $('.down').addClass('pull')
          $('.down1').removeClass('check');
          $('.header').css('top', '-148px')
        })
      })
    } else {
      $('.header').removeClass('up')
      $('.down').removeClass('pull');
      $('.down1').removeClass('check');
      $('.down1').text('')
      $('.header').css('top', '-148px')
      $('.down').text('')
    }
  }
}
$('.showUser').on('click', () => {
  if (JSON.parse(localStorage.getItem('auth')) == false || !localStorage.getItem('auth')) {
    window.location.href = 'auth/login';
  }
})
// productDetail.classList.remove("showDetails");
function setColor(typeProduct = '') {
  Array.from($('.children li a')).map(elm => {
    if (elm.getAttribute('type') == typeProduct) {
      elm.classList.add('activeOption')
    } else {
      elm.classList.remove('activeOption')

    }
  })
}

const query = document.querySelector.bind(document);
const querys = document.querySelectorAll.bind(document);
const resultsCart = query('.helloCart')
const checkBackground = false;
let dataP;
const idUser = JSON.parse(localStorage.getItem('auth'))?.id
const productDetail = query(".productDetail");
const body = query('#body');
function Parent() {
  const div = ` 
                <div style="width: 100%" class="slide" id="home"></div>
                <div style="padding: 25px;background: rgb(42 0 135 / 40%); margin-bottom: 20px; position: relative;    height: 157px;" id="parent">
                  <div style="text-align: center; margin-bottom: 25px" id="product"><h3 style="color: aliceblue;text-shadow: 0 0 15px rgb(255 0 0);">Products List</h3></div>
                  
                  <div class=backgroundI></div>
                </div>
                <div class="allResults">
                
                </div>
         `
  body.insertAdjacentHTML('beforeend', div)
}
function UpdataCart(idUsers = false) {
  $.ajax({
    url: '/getCart',
    type: "GET",
    data: { idUser: idUsers || idUser },
    success: function (data) {
      console.log('ok2', data);
      $('.cartsNumber').text(data.length);
    }
  })
}
const Callback = (call, type = '') => {
  resultsCart.innerHTML = ''


  $.ajax({
    url: '/getProductAll',
    type: "GET",
    success: function (data) {
      if (call) {
        if (type) {
          call(data, type)
        } else {
          call(data)
        }
        dataP = data
      }
      if (idUser) {
        $.ajax({
          url: '/getCart',
          type: "GET",
          data: {
            idUser: idUser
          },
          success: function (data2) {
            if (data2.length > 0) {
              $('.cartsNumber').text(data2.length);
            } else {
              $('.cartsNumber').text(0);

            }
            handleCart(data, data2)
            let dl = []

            Array.from($('.btnCheckout')).map(elm => {
              elm.onchange = function (e) {
                if (elm.checked) {
                  dl.push(e.target.dataset.index);

                } else {
                  dl = dl.filter(
                    (valD) => {
                      if (![valD].includes(e.target.dataset.index)) {
                        return valD
                      }
                    }
                  );

                }


              };

            })
            const checkout = query('.showProductCheckout')


            $('.checkout').on('click', function (e) {
              console.log(dl);
              let totalPrices = 0
              let quantity = []
              if (dl?.length > 0) {
                $('.resultsCheckout').addClass('resultsCheckoutShow')

                dl.map(valdl => {
                  data.map((dts, index) => {
                    if (valdl == dts.id) {
                      $.ajax({
                        url: '/getCart',
                        type: "GET",
                        data: {
                          idUser: idUser
                        },
                        success: function (data2) {
                          if (data2?.length > 0) {

                            data2.map((dt => {
                              if (dt.idProduct == dts.id) {
                                quantity.push(dt)
                                totalPrices += parseFloat(dt.price)
                                console.log(dt, valdl);
                                const div = `
                                      <div class="resultCart">
                                      <div style="width: 100%;display: flex; align-items: unset;">
                                        <div class="imageCart">
                                          <img src="assets/upLoad/${ dts.image }" alt="${ dts.name }">
                                        </div>
                                        <div class="nameCart">
                                            <p style="font-size: 18px">${ dt.name } </p>
                                            <p style="font-size: 14px" class="cartPrice"  ><sup style="color: #333">$</sup><span class="cartPriceSpan" data-index="${ dt.idProduct }">${ dt.price }</span></p>
                                        </div>
                                      </div>
                                      <div class="quantityCart" ><div class="backgroundI"><div class="so" data-index="${ dt.idProduct }">-- ${ dt.quantity } --</div></div></div>
                                      <div class="backgroundI"></div>
                                    </div>
                                                  
                                      `
                                checkout.insertAdjacentHTML('beforeend', div)

                              }
                            }))
                          }
                          $('#totalPrice').html(`${ totalPrices }<sup>$</sup>`)
                        }
                      })

                    }
                  })

                })


              }
              console.log('no ok');
              $('#userBuyProduct').on('submit', function (e) {
                console.log(quantity);
                console.log('ok', e.target);
                e.preventDefault();
                const phone = $('#userBuyProduct input[name=phone]').val()
                const note = $('#userBuyProduct textarea[name=note]').val()
                const adress = $('#userBuyProduct input[name=adress]').val()
                console.log(phone,
                  note,
                  adress);
                if (phone && adress) {
                  if (localStorage.getItem('auth') && idUser) {

                    $.ajax({
                      url: $(e.target).attr('action'),
                      type: 'POST',
                      headers: {
                        "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
                      },
                      data: {
                        id: JSON.stringify(dl),
                        name: JSON.parse(localStorage.getItem('auth')).name,
                        phone: phone,
                        adress: adress,
                        note: note,
                        price: totalPrices,
                        quantitySold: JSON.stringify(quantity)
                      },

                      success: function (data) {
                        console.log(data);
                        if (data == 1) {
                          alert('Sended Successfully')
                          window.location.href = '/'

                        }
                      }
                    })
                  } else {
                    window.location.href = 'auth/login'
                  }
                }
              })

            })

            function handleCart(data, data2) {
              resultsCart.innerHTML = ''
              data.map(one => {
                data2.map((two, index) => {
                  if (two.idProduct == one.id && two.idUser == idUser) {
                    const div = `
                    <div class="resultCart" data-index="${ two.idProduct }">
                    <input type="checkbox" class="btnCheckout"  data-index="${ two.idProduct }" />
                      <div style="width: 100%;display: flex; align-items: unset;">
                        <div class="imageCart">
                          <img src="assets/upLoad/${ one.image }" alt="${ one.name }">
                        </div>
                        <div class="nameCart">
                            <p style="font-size: 18px">${ one.name } </p>
                            <p style="font-size: 14px" class="cartPrice"  ><sup style="color: #333">$</sup><span class="cartPriceSpan" data-index="${ two.idProduct }">${ two.price }</span></p>
                        </div>
                      </div>
                      <div class="deleteCart" data-index="${ two.idProduct }"><i class="fa-solid fa-circle-xmark" data-index="${ two.idProduct }"></i></div>
                      <div class="quantityCart" ><div class='btn-minusQuan' data-index="${ two.idProduct }"><i class="fa-solid fa-minus" data-index="${ two.idProduct }"></i></div><div class="backgroundI"><div class="so" data-index="${ two.idProduct }">-- ${ two.quantity } --</div></div><div class='btn-addQuan' data-index="${ two.idProduct }"><i class="fa-solid fa-plus" data-index="${ two.idProduct }"></i></div></div>
                      <div class="backgroundI"></div>
                    </div>
                    
                `
                    resultsCart.insertAdjacentHTML("beforeend", div)



                  }


                })



              })


            }
            $('.deleteCart').on('click', (e) => {
              console.log(e.target.dataset.index);
              if (e.target.dataset.index) {
                $.ajax({
                  url: '/deleteCart',
                  type: "DELETE",
                  headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                  },
                  data: {
                    idProduct: e.target.dataset.index,
                    idUser: idUser
                  },
                  success: function (data3) {
                    if (data3) {
                      $(`.resultCart[data-index=${ e.target.dataset.index }]`).remove()
                      $('.cartsNumber').text(Array.from($('.resultCart'))?.length)
                    }
                  }
                })
              }

            })
            console.log($('.btn-minusQuan'));
            $('.btn-minusQuan').on('click', (e) => {
              console.log($('.backgroundI').text().includes(1), $('.backgroundI').text());
              if (!$(`.backgroundI[data-index=${ e.target.dataset.index }]`).text().includes(1)) {
                $.ajax({
                  url: '/checkCart',
                  type: "GET",
                  data: {
                    id: e.target.dataset.index,
                    idUser: idUser
                  },
                  success: function (data2) {
                    $.ajax({
                      url: '/updateCart',
                      type: "PATCH",
                      headers: {
                        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                      },
                      data: {
                        id: e.target.dataset.index,
                        quantity: data2.quantity,
                        idUser: idUser,
                        type: '-'
                      },
                      success: function (data) {
                        console.log(data, 'here');
                        $(`.cartPriceSpan[data-index=${ data.idProduct }]`).text(data.price);
                        $(`.so[data-index=${ data.idProduct }]`).text(data.quantity)

                      }
                    })
                  }
                })

              }

            })
            $('.btn-addQuan').on('click', (e) => {
              $.ajax({
                url: '/checkCart',
                type: "GET",
                data: {
                  id: e.target.dataset.index,
                  idUser: idUser
                },
                success: function (data2) {
                  $.ajax({
                    url: '/updateCart',
                    type: "PATCH",
                    headers: {
                      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                    },
                    data: {
                      id: e.target.dataset.index,
                      quantity: 1,
                      idUser: idUser,
                      type: '+'
                    },
                    success: function (data) {
                      console.log(data, $('.cartPrice'));
                      $(`.cartPriceSpan[data-index=${ data.idProduct }]`).text(data.price);
                      $(`.so[data-index=${ data.idProduct }]`).text(data.quantity)
                    }
                  })
                }
              })
            })


          }
        })
      }
    }
  })
}
function HandleCarts(data) {
  $('.addCart').on('click', (e) => {

    const idUser = JSON.parse(localStorage.getItem('auth'))?.id
    if (idUser) {
      if (e.target.getAttribute('addCart')) {
        data.map(cart => {
          if (cart.id == e.target.getAttribute('addCart')) {

            $.ajax({
              url: '/checkCart',
              type: "GET",
              data: {
                id: e.target.getAttribute('addCart'),
                idUser: idUser
              },
              success: function (data2) {
                console.log(data2);
                if (data2) {
                  $.ajax({
                    url: '/updateCart',
                    type: "PATCH",
                    headers: {
                      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                    },

                    data: {
                      id: e.target.getAttribute('addCart'),
                      quantity: 1,
                      idUser: idUser,
                      type: '+'
                    },
                    success: function (data) {
                      resultsCart.innerHTML = ''
                      Callback()
                    }
                  })
                } else {
                  $.ajax({
                    url: '/addCart',
                    type: "POST",
                    headers: {
                      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                    },
                    data: {
                      id: e.target.getAttribute('addCart'),
                      name: cart.name,
                      price: cart.currentPrice,
                      quantity: 1,
                      idUser: idUser,
                    },
                    success: function (data) {
                      console.log(data, 'ehllo');
                      Callback()
                      UpdataCart(idUser)
                    }
                  })
                }
              }
            })


          }

        })

      }
    } else {
      window.location.href = 'auth/login'
    }


  })
  $('.buyProduct').on('click', function () {
    alert('Buy Successfully')
  })

}

function detail(valProduct, productDetail) {
  const stars = [];
  console.log(valProduct);
  for (let i = 1; i <= valProduct.star; i++) {
    stars.push('<i class="fa-regular fa-star"></i>')
  }
  const divStar = ` <div class='star'>${ valProduct.star }.0<span>${ stars.join('') }</span></div>`
  const div = `<div class='image'><img id="src"
                    src=' assets/upLoad/${ valProduct.image }'
                        alt='${ valProduct.name }'
                        /></div>
                        <div class='order'>
                          ${ valProduct.star ? divStar : '<p style="color: red">There are no reviews yet</p>' }
                          <p class='productName' >
                            ${ valProduct.name }
                          </p>
                        
                      <div class='saleProduct'>${ valProduct.sale }</div>
                      <div class='quantityBuy'><div class='btn-minus'><i class="fa-solid fa-minus"></i></div><div class='showQuantity'>1</div><div class='btn-add'><i class="fa-solid fa-plus"></i></div></div>
                      <div class="sumCurrentPrice">
                      <span style="color: #939393;">Sum Current Price:</span>
                        <sup>$</sup><span class="sumPrice"> ${ valProduct.currentPrice }</span>

                      </div>
                      <div>Quantity Sold: <span>${ valProduct.quantitySold ? valProduct.quantitySold : '' }</span></div>
                      <div class="requierBuy">
                          <button class="btn-buy">Buy</button>
                      </div>
                    </div>
                    <div class="introducts">
                      <div class="description"><h3>Description</h3><p>${ valProduct.description }</p></div>
                    </div>
                   `;
  productDetail.insertAdjacentHTML("beforeend", div);
  $('.btn-minus').on('click', (e) => {
    if ($('.showQuantity').text() > 1) {
      $('.showQuantity').text($('.showQuantity').text() - 1);
      $('.sumPrice').html(`${ Number($('.sumPrice').text()) - Number(valProduct.currentPrice) }`)

    }
  })
  $('.btn-add').on('click', (e) => {
    $('.showQuantity').text(Number($('.showQuantity').text()) + 1);
    $('.sumPrice').html(`${ Number($('.sumPrice').text()) + Number(valProduct.currentPrice) }`)


  })
  $('.btn-buy').on('click', function () {
    alert('Buy Successfully')
  })
}
Parent()
let elmSearch = query('#parent');
ShowSlide()
Callback(defaultHome)
function defaultHome(data) {
  $('.home').addClass('activeOption')
  setColor('all')
  const resultsProducts = query('.allResults')
  let checkProduct = []
  if (data) {
    console.log(data);
    data.map((val) => {
      let checkProduct2 = []
      const t = data.map(valC => {
        if (valC.type == val.type) {
          console.log(valC.type, val.type);
          checkProduct2.push(`<img  style="height:100% src="${ valC.image }" alt="${ valC.name }" data-index='${ valC.id }' data-index2='${ val.id }'/>`)
          return `<img style="height:100%" src="assets/upLoad/${ valC.image }" alt="${ valC.name }" data-indexs='${ valC.id }' data-index2='${ val.id }'/>`
        }
      })
      if (!checkProduct.includes(val.type)) {
        const divM = `
                  <div class="moreIcon" data-indexs='${ val.id }'> 
                    <div class='more' type= "${ val.type }" data-indexs='${ val.id }'>
                        ${ t.join('') }
                    </div>
                    <p data-indexs='${ val.id }'>more...</p>
                    <i data-indexs='${ val.id }' class="fa-solid fa-caret-down"></i>
                  </div>
              `
        let div = `
            <div class='padding'>
                        <div class='results' data-index='${ val.id }'type= "${ val.type }">
              ${ checkProduct2.length > 1 ? divM : '' }
                         <span class='hoverTitle'> ${ val.name } </span>
                         <span class="saleProductHome" data-index='${ val.id }'>${ val.sale ? val.sale : '' } </span>
                          <div class='productAvatar' data-index='${ val.id }'type = "${ val.type }">
                            <img data-index='${ val.id }' src='assets/upLoad/${ val.image }'type = "${ val.type }"/>
                            </div>
                          <div class="productOverview" data-index='${ val.id }'type = "${ val.type }">
                            <div class="information" data-index='${ val.id }'type = "${ val.type }">
                              <div class='productName' data-index='${ val.id }'type = "${ val.type }">
                                 ${ val.name }         
                              </div>
                              <div class="PP">
                                <div class="currentPrice" data-index='${ val.id }' type = "${ val.type }">
                                <sup>$</sup> ${ val.currentPrice }
                                </div>
                                <sup>
                                   <div class="price" data-index='${ val.id }' type = "${ val.type }" >${ val.priceBefore ? val.priceBefore : '' }</div>
                                </sup>
                              </div>
                            </div>
                              <div class='submitProduct'>
                                </div>
                                <div class="statuss">
                                  <div class="addCart" addCart='${ val.id }' >Add cart</div>
                                  <div class="buyProduct" >Buy</div>
                                </div>
                              </div>
                          </div>
                        </div></div></div>`;
        resultsProducts.insertAdjacentHTML('beforeend', div)
        checkProduct.push(val.type)
      }
    })
  }
  const background = query(".background");
  const product = $('.results')

  product.on('click', (e) => {
    if (e.target.dataset.index) {
      console.log(e.target.dataset.index);
      $.ajax({
        url: '/getProductOne',
        type: "GET",
        data: {
          id: e.target.dataset.index
        },
        success: function (data) {
          background.classList.toggle("show", !checkBackground);
          productDetail.classList.add("showDetails");
          detail(data, productDetail)
        }
      })
    }
  })
  background.onclick = function () {
    background.classList.remove("show");
    productDetail.classList.remove("showDetails");
    productDetail.innerHTML = "";
  };
  const viewMore = $('.moreIcon')
  const hover = $('.more img')

  Array.from(viewMore).map(mo => {
    mo.onmouseover = (e) => {
      console.log(e.target.dataset.indexs);
      const moreClass = query(`.more[data-indexs="${ e.target.dataset.indexs }"]`)
      moreClass.classList.toggle('more2');

      if (e.target.dataset.indexs) {
        Array.from(hover).map(elm => {
          elm.onmouseover =
            (e2) => {
              console.log(e.target.dataset.indexs, e2.target.dataset.indexs);
              if (e2.target.dataset.indexs && e2.target.dataset.indexs != e.target.dataset.indexs) {

                const image = query(`.productAvatar img[data-index="${ e.target.dataset.indexs }"]`)
                const moreIcon = query(`.moreIcon[data-indexs="${ e.target.dataset.indexs }"]`)
                const moreP = query(`.moreIcon p[data-indexs="${ e.target.dataset.indexs }"]`)
                const moreI = query(`.moreIcon i[data-indexs="${ e.target.dataset.indexs }"]`)
                const moreIconBar = query(`.more[data-indexs="${ e.target.dataset.indexs }"]`)
                const name = query(`.information .productName[data-index="${ e.target.dataset.indexs }"]`)
                const price = query(`.information .price[data-index="${ e.target.dataset.indexs }"]`)
                const currentPrice = query(`.information .currentPrice[data-index="${ e.target.dataset.indexs }"]`)
                const sale = query(`.padding .results .saleProductHome[data-index="${ e.target.dataset.indexs }"]`)

                dataP.map(valAt => {
                  if (valAt.id == e2.target.dataset.indexs) {
                    if (moreP) {
                      moreP.setAttribute('data-indexs', valAt.id)
                    } if (moreI) {
                      moreI.setAttribute('data-indexs', valAt.id)
                    }
                    if (moreIconBar) {
                      moreIconBar.setAttribute('data-indexs', valAt.id)
                    }
                    if (moreIcon) {
                      moreIcon.setAttribute('data-indexs', valAt.id)
                    }
                    mo.setAttribute('data-index', valAt.id)
                    if (image) {
                      image.setAttribute('data-index', valAt.id)
                    }
                    if (name) {
                      name.setAttribute('data-index', valAt.id)
                      name.innerText = valAt.name
                    }
                    if (sale) {
                      sale.setAttribute('data-index', valAt.id)
                      sale.innerText = valAt.sale
                    }
                    if (price) {
                      price.setAttribute('data-index', valAt.id)
                      price.innerHTML = valAt.priceBefore ? `<sup>$</sup>${ valAt.priceBefore }` : ''
                    }
                    if (currentPrice) {
                      currentPrice.setAttribute('data-index', valAt.id)
                      currentPrice.innerHTML = `<sup>$</sup>${ valAt.currentPrice }`
                    }
                  }
                })
                if (image) {
                  image.setAttribute('src', e2.target.getAttribute('src'))
                }
              }
            }
        })
      }
    }
    mo.onmouseout = (e) => {
      console.log(e.target.dataset.indexs, 'r');

      const moreClass = query(`.more[data-indexs="${ e.target.dataset.indexs }"]`)
      moreClass.classList.remove('more2');
    }
  })
  HandleCarts(data)

}
function ShowSlide() {
  const slide = query('.slide')
  slide.innerHTML = ''
  const div = ` 

                      <div class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" alt="BirthDay">
          <img src="assets/clients/images/image.jpg" alt="BirthDay"/>
        </div>
        <div class="swiper-slide"  alt="Anniversary">
          <img src="assets/clients/images/anniversary.jpg" alt="Anniversary"/>
        </div>
        <div class="swiper-slide" alt="Friendship">
          <img src="assets/clients/images/friendship.jpg" alt="Friendship"/>
        </div>
        <div class="swiper-slide" alt="NewYear">
          <img src="assets/clients/images/happyNewYear.jpg" alt="NewYear" / >
        </div>
        <div class="swiper-slide" alt="Mother'sDay">
          <img src="assets/clients/images/motherDay.jpg"   alt="Mother'sDay"/>
        </div>
        
      </div>
      <div class="swiper-pagination"></div>
    </div>

                    
    `
  console.log(slide);
  slide.insertAdjacentHTML('beforeend', div)
  console.log('sd');
  new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    centeredSlidesBounds: true,
    coverflowEffect: {
      rotate: 40,
      stretch: 0,
      depth: 0,
      modifier: 1,
      slideShadows: false,
    }, autoplay: {
      delay: 2000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  const swiperSlide = $('.swiper-slide');
  Array.from(swiperSlide).map(elmSwiper => {
    console.log(elmSwiper);
    elmSwiper.onclick = (e) => {
      setColor(e.target.alt)

      SearchProducts(e.target.alt, elmSearch)
      $.ajax({
        url: '/getProductType',
        type: "GET",
        data: {
          typeProduct: e.target.alt
        },
        success: function (data) {
          console.log(data);
          ShowProducts(data, e.target.alt)


        }
      })
    }
  })
}
function ShowProducts(data = [], typeProduct = 'all') {
  const resultsProducts = query('.allResults')
  setColor(typeProduct)
  if (resultsProducts) {
    resultsProducts.innerHTML = ''
  }
  if (typeProduct == 'all') {
    console.log('homes');
    Callback(defaultHome)
    return
  }
  else if (data.length > 0) {
    data.map((val) => {
      if (val.type == typeProduct || typeProduct == 'quantitySold') {
        let div = `
            <div class='padding'>
                        <div class='results' data-index='${ val.id }' >
                        <div class='more'></div>
                        <span class="saleProductHome">${ val.sale ? val.sale : '' } </span>
                         <span class='hoverTitle' > ${ val.name } </span>
                          <div class='productAvatar'  data-index='${ val.id }'>
                            <img data-index='${ val.id }' src='assets/upLoad/${ val.image }' />
                            </div>
                          <div class="productOverview" data-index='${ val.id }' >
                            <div class="information" data-index='${ val.id }' >
                              <div class='productName' data-index='${ val.id }' >
                                 ${ val.name }         
                              </div>
                              <div class="PP">
                                <div class="currentPrice" data-index='${ val.id }' type = "${ val.type }">
                                    <sup>$</sup> ${ val.currentPrice }
                                </div>
                                <sup>
                                  <div class="price" data-index='${ val.id }'>
                                     ${ val.priceBefore ? `<sup>$</sup>${ val.priceBefore }` : '' }
                                  </div>
                                </sup>
                              </div>
                            </div>
                              <div class='submitProduct'>
                                </div>
                                <div class="statuss">
                                  <div class="addCart" addCart='${ val.id }'>Add cart</div>
                                  <div class="buyProduct">Buy</div>
                                </div>
                              </div>
                          </div>
                        </div></div></div>`;
        resultsProducts.insertAdjacentHTML('beforeend', div)
      }
    })
  }
  else {
    resultsProducts.innerHTML = '<p style="color: red; font-size: 30px;">Hiện tại đã Hết Hàng</p>'
    return
  }

  const background = query(".background");
  const product = $('.results');

  product.on('click', (e) => {
    if (e.target.dataset.index) {
      $.ajax({
        url: '/getProductOne',
        type: "GET",
        data: {
          id: e.target.dataset.index
        },
        success: function (data) {
          background.classList.toggle("show", !checkBackground);
          productDetail.classList.add("showDetails");
          detail(data, productDetail)
        }
      })
    }
  })
  background.onclick = function () {
    background.classList.remove("show");
    productDetail.classList.remove("showDetails");
    productDetail.innerHTML = "";
  };
  HandleCarts(data)
  $('.btn-buy').on('click', function () {
    alert('Buy Successfully')
  })
}
function SearchProducts(type, elm) {
  elm.innerHTML = "";
  const div = `
             <div style="text-align: center; margin-bottom: 25px" id="product"><h3 style="color: aliceblue;text-shadow: 0 0 15px rgb(255 0 0);">List Products</h3></div>
            <div class="searchProducts">
               <div class="childrenS"><input type="text" id="search" placeholder="Search products"/></div>
             </div>
             <div class=backgroundI></div>
             `
  elm.insertAdjacentHTML('beforeend', div)
  $('.searchProducts #search').on('input', (e2) => {


    if (e2.target.value != '' && e2.target.value[0] != ' ') {
      $.ajax({
        url: '/searchProduct',
        type: 'GET',
        data: {
          value: encodeURIComponent(e2.target.value)
        },
        success: function (data) {
          ShowProducts(data, type)
        }
      })

    } else {
      $.ajax({
        url: '/getProductType',
        type: "GET",
        data: {
          typeProduct: type
        },
        success: function (data) {
          ShowProducts(data, type)
        }
      })
    }
  })
}
const type = querys('.children a[type]')
Array.from(type).map(type => {
  type.onclick = (e) => {

    $('#body').text('')
    Parent()
    ShowSlide()
    const searchProduct = query('#parent')

    SearchProducts(e.target.type, searchProduct)
    $.ajax({
      url: '/getProductType',
      type: "GET",
      data: {
        typeProduct: e.target.type
      },
      success: function (data) {
        console.log(data, e.target.type);
        ShowProducts(data, e.target.type)
      }
    })
  }
})
$(document).ready(function () {
  $('.home').on('click', function (e) {
    e.target.classList.add('activeOption')
    $('.top').removeClass('activeOption')
    $('.sale').removeClass('activeOption')
    $('.gift').removeClass('activeOption')
    $('.contact').removeClass('activeOption')
    $('.about').removeClass('activeOption')
    $('.children a[type=all]').removeClass('activeOption')


    $('#body').text('')
    Parent()
    ShowSlide()
    Callback(defaultHome)
  })
  $('.top').on('click', function (e) {
    setColor()
    console.log('ok');
    e.target.classList.add('activeOption')
    $('.home').removeClass('activeOption')
    $('.sale').removeClass('activeOption')
    $('.gift').removeClass('activeOption')
    $('.contact').removeClass('activeOption')
    $('.about a').removeClass('activeOption')
    $('.children a[type=all]').removeClass('activeOption')

    $('#body').text('')
    Parent()
    ShowSlide()
    $.ajax({
      url: '/quantitySold',
      type: "GET",
      success: function (data) {
        ShowProducts(data, 'quantitySold')

      }
    })
    // const div = '<div style="width: 100%; text-align: center; color: red; font-size: 19px;">Incomplete</div>'
    // body.insertAdjacentHTML('beforeend', div)
  })
  $('.sale').on('click', function (e) {
    setColor()

    e.target.classList.add('activeOption')
    $('.home').removeClass('activeOption')
    $('.top').removeClass('activeOption')
    $('.gift').removeClass('activeOption')
    $('.contact').removeClass('activeOption')
    $('.about a').removeClass('activeOption')
    $('.children a[type=all]').removeClass('activeOption')

    $('#body').text('')
    const div = '<div style="width: 100%; text-align: center; color: red; font-size: 19px;">Incomplete</div>'
    body.insertAdjacentHTML('beforeend', div)
  })
  $('.gift').on('click', function (e) {
    setColor()

    e.target.classList.add('activeOption')
    $('.home').removeClass('activeOption')
    $('.top').removeClass('activeOption')
    $('.sale').removeClass('activeOption')
    $('.contact').removeClass('activeOption')
    $('.about a').removeClass('activeOption')
    $('.children a[type=all]').removeClass('activeOption')
    $('#body').text('')
    Parent()
    ShowSlide()
    Callback(ShowProducts, 'GiftItems')
  })
  $('.contact').on('click', function (e) {
    setColor()

    e.target.classList.add('activeOption')
    $('.home').removeClass('activeOption')
    $('.top').removeClass('activeOption')
    $('.gift').removeClass('activeOption')
    $('.sale').removeClass('activeOption')
    $('.about a').removeClass('activeOption')
    $('.children a[type=all]').removeClass('activeOption')

    $('#body').text('')
    const div = `
       <div id="main_wrapper" style="height: 700px">

        <div id="main_content" style="display: flex">
            <div id="left_sidebar">
                <section>
                    <div class="container">
                        <div class="containerinfo">
                            <div>
                                <ul class="info">

                                    <span><i class="fa fa-map-marker" aria-hidden="true"></i></span>
                                    <span>285 Ba Đinh<br />
                                        Đoi Can<br />
                                        Ha NoI
                                    </span><br />


                                    <span><i class="fa fa-envelope" aria-hidden="true"></i></span>
                                    <span>aptech@gmail.com</span><br />


                                    <span><i class="fa fa-phone-square" aria-hidden="true"></i></span>
                                    <span>012-345-6789</span><br />

                                </ul>
                                <div class="formBox">
                                    <form action="" id="form1">
                                        <h2>contact</h2>
                                        <input type="text" id="fname" name="name"
                                            placeholder="first and last name"><br>
                                        <input type="text" id="femail" name="email" placeholder="email"><br>
                                        <input type="text" id="femail" name="phone" placeholder="phone number"><br>
                                        <input type="text" id="fcontent" name="content" placeholder=" content"><br>
                                        <input type="submit" value="submit">
                                    </form>
                                </div>
                            </div>
                        </div>
                </section>
            </div>
            <div id="right_sidebar">
                <div id="map" style="width:900px;height:300px;">
                    <iframe src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        width="750" height="550" frameborder="0" style="border:0;height: 100%;" allowfullscreen></iframe>
                </div>
            </div>
          </div>
        </div>
    
    `
    body.insertAdjacentHTML('beforeend', div)
    $('#form1').on('submit', (e) => {
      e.preventDefault();
      const name = $('input[name="name"]').val();
      const email = $('input[name="email"]').val();
      const phone = $('input[name="phone"]').val();
      const content = $('input[name="content"]').val();
      if (name, email, phone, content) {
        $.ajax({
          url: '/contact',
          type: 'POST',
          headers: {
            "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
          },
          data: {
            name: name,
            email: email,
            phone: phone,
            content: content
          },
          success: function (data) {
            if (data) {

              alert('Send request successfully')
              e.target.reset();
            }
          }
        })
      } else {
        alert('Please Enter content content');
      }
    })
  })
  $('.about').on('click', function (e) {
    setColor()

    e.target.classList.add('activeOption')
    $('.home').removeClass('activeOption')
    $('.top').removeClass('activeOption')
    $('.gift').removeClass('activeOption')
    $('.sale').removeClass('activeOption')
    $('.children a[type=all]').removeClass('activeOption')

    $('.contact').removeClass('activeOption')
  })
})
