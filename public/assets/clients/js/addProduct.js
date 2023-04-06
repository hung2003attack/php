const query = document.querySelector.bind(document);
const querys = document.querySelectorAll.bind(document);
let tabProduct = false;
const reader = new FileReader();
const ulTab = query(".showResults");
const angle = query(".tabTitle i");
const resultMenu = query(".resultMenu");
const container = querys(".classify li");
const submit = query("#addProduct");
let currentType = "";
actionColor();
function actionColor() {
    Array.from(container).map((elm) => {
        elm.classList.remove("activeOption");
        elm.onclick = (e) => {
            Array.from(container).map((elm) => {
                if (elm.getAttribute("type") == e.target.getAttribute("type")) {
                    elm.classList.add("activeOption");
                } else {
                    elm.classList.remove("activeOption");
                }
            });

            dataInitial(e.target.type);
        };
    });
}
dataInitial();
function dataInitial(data = "BirthDay") {
    currentType = data;
    resultMenu.innerHTML = "";
    if (data == "BirthDay") $("li[type=BirthDay]").addClass("activeOption");
    $.ajax({
        url: "/getProductType",
        type: "GET",
        data: {
            typeProduct: data,
        },
        success: function (data) {
            console.log(data);
            data.map((val) => {
                const div = `
                            <div  class="parent">
                                    <label class="labelC"><input type="checkbox" name="check" data-index="${ val.id }"/></label>
                                    
                                    <div class="product" data-index="${ val.id }">
                                        <div class="image"><img
                                                src="/assets/upLoad/${ val.image }" />
                                        </div>
                                        <div class="detailProduct">
                                            <h3 class="name">${ val.name }</h3>
                                            <p class="price">price: ${ val.currentPrice }<sup>$</sup></p>
                                            <p class="inventoryNumber">inventoryNumber: ${ val.inventoryNumber }</p>
                                        </div>
                                    </div>
                            </div>
                `;
                resultMenu.insertAdjacentHTML("beforeend", div);
            });
        },
    });
}
submit.onsubmit = function (e) {
    e.preventDefault();
    console.log("no ok");
    const name = $("input[name=name]").val();
    const currentPrice = $("input[name=currentPrice]").val();
    const inventory = $("input[name=inventory]").val();
    const description = $("textarea[name=description]").val();
    const type = $("select[name=type]").val();
    const image = query("input[name=image]").files[0];
    console.log(image);
    if (
        !name ||
        !currentPrice ||
        !inventory ||
        !description ||
        !image ||
        !type
    ) {
        submit.classList.add("borderE");
    } else {
        console.log("kook");
        submit.classList.remove("borderE");
        const datas = new FormData(this);
        console.log(datas);
        $.ajax({
            url: "/addProduct",
            type: "POST",
            headers: {
                "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
            },
            data: datas,
            success: function (data) {
                console.log(data);
                if (data) {
                    alert("Created Successfully");
                } else {
                    alert("Created Failed");
                }
            },
            processData: false, // Important!
            contentType: false,
        });
    }
};

$('input[type="file"]').on("change", function (e) {
    console.log(e.target.files[0].name);

    const file = e.target.files[0];
    reader.readAsDataURL(file);

    // Once loaded, do something with the string
    reader.addEventListener("load", (event) => {
        // Here we are creating an image tag and adding
        // an image to it.

        $(".images img").attr("src", event.target.result);
    });
});
let tabsFeature = [];
Array.from($(".showResults li")).map((elm) => {
    elm.onclick = (e) => {
        if (tabsFeature?.length > 0) {
            tabsFeature.map((el) => {
                el.classList.remove("activeOption");
                tabsFeature = [];
            });
        }
        tabsFeature.push(e.target);
        e.target.classList.add("activeOption");
    };
});
$(".tabTitle").on("click", () => {
    tabProduct = !tabProduct;
    ulTab.classList.toggle("show", tabProduct);
    angle.classList.toggle("angle", tabProduct);
});
$(".CreateProduct").on("click", () => {
    $(".addProduct").addClass("addProductShow");
    $(".classify").addClass("classifyShow");
    $(".update").removeClass("actionUpDate");
    $('.infoUserBuy').removeClass("infoUserBuyShow");

});
$(".ProductList").on("click", () => {
    actionColor();
    dataInitial();
    $('.infoUserBuy').removeClass("infoUserBuyShow");

    $(".addProduct").removeClass("addProductShow");
    $(".classify").removeClass("classifyShow");
    $(".update").removeClass("actionUpDate");
});
let update = [];
$(".UpdateProduct").on("click", () => {
    $('.infoUserBuy').removeClass("infoUserBuyShow");

    $(".addProduct").removeClass("addProductShow");
    $(".classify").removeClass("classifyShow");
    $(".labelC").addClass("labelBlock");
    $("input[type=submit]").attr("type", "button");
    $(".update").addClass("actionUpDate");
    $(".update button").attr("type", "update");
    $(".update button").text("Up Date");

    Array.from($(".labelC input")).map((elm) => {
        elm.onchange = function (e) {
            if (elm.checked) {
                update.push(e.target.dataset.index);
            } else {
                update = update.filter(
                    (val) => !val.includes(e.target.dataset.index)
                );
            }
        };
    });
});
let deleteProduct = [];

$(".DeleteProduct").on("click", () => {
    console.log($(".labelC"));

    $(".addProduct").removeClass("addProductShow");
    $(".classify").removeClass("classifyShow");
    $('.infoUserBuy').removeClass("infoUserBuyShow");
    $("input[type=submit]").attr("type", "button");

    $(".labelC").addClass("labelBlock");
    $(".update button").attr("type", "delete");
    $(".update").addClass("actionUpDate");
    $(".update button").text("Delete");
    $(".addProduct").removeClass("addProductShow");
    $(".classify").removeClass("classifyShow");
    Array.from($(".labelC input")).map((elm) => {
        elm.onchange = function (e) {
            if (elm.checked) {
                deleteProduct.push(e.target.dataset.index);
            } else {
                deleteProduct = deleteProduct.filter(
                    (val) => {
                        if (![val].includes(e.target.dataset.index)) {
                            return val;
                        }
                    }
                );
            }
        };
    });
});
$(".update button").on("click", (e) => {
    $("input[name=name]").val();
    $("input[name=currentPrice]").val();
    $("input[name=inventory]").val();
    $("textarea[name=description]").val();
    $("select[name=type]").val();
    $("input[name=image]").val();

    if (e.target.getAttribute("type") == "update") {
        if (update.length > 0) {
            resultMenu.innerHTML = "";
            update.map((value) => {
                console.log(value);
                $.ajax({
                    url: "/getProductOne",
                    type: "GET",
                    data: {
                        id: value,
                    },
                    success: function (data) {
                        upDateProduct(data);
                    },
                });
            });
        }
    } else if (e.target.getAttribute("type") == "delete") {
        let checkDelete = false;
        const resultMenus = query(".resultMenus");
        console.log(deleteProduct);
        if (deleteProduct.length > 0) {
            const confirms = confirm("Do you delete this product?");
            console.log(confirms);
            if (confirms == true) {
                deleteProduct.map((value) => {
                    console.log(value);
                    let rel = false
                    const d = $.ajax({
                        url: "/deleteProducts",
                        type: "DELETE",
                        headers: {
                            "X-CSRF-Token": $('meta[name="csrf-token"]').attr(
                                "content"
                            ),
                        },
                        data: {
                            id: value,
                        },
                        success: function (data) {
                            if (data) {

                                resultMenu.innerHTML = "";
                                checkDelete = true;
                                const div = `
                                        <div class="statusDelete" style="background-color: #64e296; ">Delete SuccessFully</div>
                                `;
                                resultMenus.insertAdjacentHTML(
                                    "beforeend",
                                    div
                                );
                                setTimeout(() => {
                                    $(".statusDelete").remove();
                                }, 2000);
                                dataInitial(currentType);
                                return true
                            } else {
                                ref = false
                                const div = `
                                        <div class="statusDelete" style="background-color: red;">Delete Faild</div>
                                `;
                                resultMenus.insertAdjacentHTML(
                                    "beforeend",
                                    div
                                );
                                setTimeout(() => {
                                    $(".statusDelete").remove();
                                }, 2000);
                            }
                        },
                    });
                });
                console.log(checkDelete);
            }
        }
    }

    function upDateProduct(data) {
        const div = `
                                        <h3 style="width:100%;text-align: center; font-size:17px; margin-top: 20px; border-top: 1px solid #ccc;padding-top: 17px;">${ data.name
            }</h3>
                                        <div class="upDateProduct">
                                                <form id="upDateProduct" method="PATCH" action="/upDateProduct" enctype="multipart/form-data" data-index="${ data.id
            }">
                                                    <div class="insert"><input type="text" value="${ data.name
            }"p laceholder="Name Product *" name="name" data-index="${ data.id
            }"/>
                                                    </div>
                                                    <div class="insert">
                                                        <input type="number" value="${ data.currentPrice
            }" placeholder="Current Price Product *" step="0.01" name="currentPrice" data-index="${ data.id
            }"/>
                                                    </div>
                                                    <div class="insert"><input type="number" step="0.01" value="${ data.priceBefore
                ? data.priceBefore
                : ""
            }" placeholder="Price Before" name="priceBefore"data-index="${ data.id
            }" />
                                                    </div>
                                                    <div class="insert ">
                                                        <select name="type"  data-index="${ data.id
            }">
                                                            <option value="">Type</option>
                                                            <option value="BirthDay">BirthDay</option>
                                                            <option value="Anniversary">Anniversary</option>
                                                            <option value="Friendship">Friendship</option>
                                                            <option value="BirthDay">BirthDay</option>
                                                            <option value="MotherDay">MotherDay</option>
                                                        </select>
                                                    </div>
                                                    <div class="insert"><input type="number" value="${ data.inventoryNumber
            }" placeholder="inventory Number *" name="inventory" data-index="${ data.id
            }"/>
                                                    </div>
                                                    <div class="insert"><input type="text" value="${ data?.sale
                ? data.sale
                : ""
            }" placeholder="sale" name="sale" data-index="${ data.id
            }"/>
                                                    </div>

                                                    <div class="insert"><textarea type="text" placeholder="Description *" name="description" data-index="${ data.id
            }">${ data.description
            }</textarea>
                                                    </div>
                                                    <div class="Image">
                                                        <div class="upLoad"><input type="file" value="${ data.image
            }" name="image" data-index="${ data.id
            }"/>
                                                        </div>
                                                        <div class="images">
                                                            <img
                                                                src="/assets/upLoad/${ data.image
            }" data-index="${ data.id
            }" name="previewImage"/>
                                                        </div>
                                                    </div>
                                                    <input type="submit" value="Up Date" style="margin-top: 10px;" />
                                                    <input type="hidden" id="_token" value="{{ csrf_token() }}">
                                                </form>
                                            </div>

    `;
        resultMenu.insertAdjacentHTML("beforeend", div);
        $(`select[name=type][data-index="${ data.id }"]`).val(data.type);
        const previewImage = querys(
            `input[type="file"][data-index="${ data.id }"]`
        );
        Array.from(previewImage).map((elm) => {
            elm.addEventListener("change", (e) => {
                if (e.target.files.length) {
                    const src = URL.createObjectURL(e.target.files[0]);
                    $(
                        `.images img[name=previewImage][data-index="${ e.target.dataset.index }"]`
                    ).attr("src", src);
                }
            });
        });
        Array.from($(".upDateProduct #upDateProduct")).map((elm) => {
            elm.onsubmit = (e) => {
                e.preventDefault();
                const name = $(
                    `input[name="name"][data-index="${ e.target.dataset.index }"]`
                ).val();
                const currentPrice = $(
                    `input[name="currentPrice"][data-index="${ e.target.dataset.index }"]`
                ).val();
                const inventory = $(
                    `input[name="inventory"][data-index="${ e.target.dataset.index }"]`
                ).val();
                const description = $(
                    `textarea[name="description"][data-index="${ e.target.dataset.index }"]`
                ).val();
                const type = $(
                    `select[name="type"][data-index="${ e.target.dataset.index }"]`
                ).val();
                const datassd = new FormData(e.target);
                datassd.append("id", e.target.dataset.index);
                if (name && currentPrice && inventory && description && type) {
                    $.ajax({
                        url: "/upDateProduct",
                        type: "post",
                        processData: false,
                        contentType: false,
                        headers: {
                            "X-CSRF-Token": $('meta[name="csrf-token"]').attr(
                                "content"
                            ),
                        },
                        data: datassd,
                        success: function (data) {
                            if (data == 1) {
                                alert("Up Date Successful");
                            } else {
                                alert("Let enter orther Data!");
                            }
                        },
                    });
                }
            };
        });
    }
});

$('.tabCart').on('click', () => {
    $('.infoUserBuy').addClass("infoUserBuyShow");
    $(".addProduct").removeClass("addProductShow");
    $(".classify").addClass("classifyShow");
    const elmCustemer = query(".infoUserBuy tbody")
    elmCustemer.innerHTML = ''
    $.ajax({
        url: '/getInfoBuyUser',
        type: "GET",
        success: function (data) {
            console.log(data);
            if (data?.length > 0) {
                data.map(((vl, index) => {
                    const allData = []
                    let quantity = 0
                    if (vl?.customer) {
                        vl?.customer.map(l => {
                            const customer = `
                                    <div class="tableCustemer">
                                                           <p style="width: 50px;margin: 0 ; margin-right: 5px"> <img src="/assets/upLoad/${ l.image }"/></p>
                                                           <div class="infoTable">
                                                                <p>${ l.name }</p>
                                                                <p style="font-size:12px">${ l.currentPrice }<sup>$</sup></p>
                                                            </div>
                                    </div>
                               
                    `
                            allData.push(customer)
                        })
                    }
                    if (vl.quantity) {
                        quantity = JSON.parse(vl.quantity)[0].quantity
                    }
                    console.log(allData);
                    const div = `
                            <tr>
                                <th scope="row">${ index + 1 }</th>
                                <td>${ vl.name }</td>
                                <td>${ vl.phone }</td>
                                <td>${ vl.address }</td>
                                <td>${ vl.note ? vl.note : 'No Thing' }</td>
                                <td>
                                ${ allData ? allData.join() : 'No Thing' }
                                </td>
                                <td>${ vl.price }<sup>$</sup></td>
                                <td>${ quantity }</td>
                            </tr>

                    `
                    elmCustemer.insertAdjacentHTML('beforeend', div)
                }))
            }
        }
    })
})