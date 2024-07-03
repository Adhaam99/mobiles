

var phoneNameInput = document.getElementById("phoneName");
var boxInput = document.getElementById("box");
var companyInput = document.getElementById("company");
var productDescriptionInput = document.getElementById("productDescription");
var screenInput = document.getElementById("screen");
var myRow = document.getElementById("myRow");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var inputs = document.querySelector(".inputs")
var myIndex;

searchInput.addEventListener("click", function () {

    inputs.classList.add("d-none")
})

var productList;

if (localStorage.getItem("products") == null) {
    productList = [];
}
else {
    productList = JSON.parse(localStorage.getItem("products"));
    display(productList)
};

function addProduct() {

    if (phoneNameInput.classList.contains("is-valid") && boxInput.classList.contains("is-valid") && companyInput.classList.contains("is-valid")) {

        product = {
            phone: phoneNameInput.value,
            box: boxInput.value,
            company: companyInput.value,
            screen: screenInput.value,
            description: productDescriptionInput.value

        }

        productList.push(product);

        swal({
            text:"Item added successfully",
            icon: "success",
            timer:2000
        });

        display(productList)

        localStorage.setItem("products", JSON.stringify(productList))
        // clearinput()
    }
    else {
        alert("Not Vaild Data")
    }

}

function clearinput() {
    phoneNameInput.value = null;
    companyInput.value = null;
    productDescriptionInput.value = null;
    boxInput.value=null;
    screenInput.value=null;

}

function display(arr) {

    var cartona = "";

    for (var i = 0; i < arr.length; i++) {

        cartona += `<div class="col-md-3">
        <div class="item d-flex justify-content-center flex-column">
                    
                    <h5>phone: ${arr[i].phone}</h5>
                    <p>Company: ${arr[i].company}</p>
                    <h5>Screen: ${arr[i].screen}</h6>
                    <p>box: ${arr[i].box}</p>                   
                    <p>Description: ${arr[i].description}</p>
                    <div class="buttons d-flex gap-2 flex-nowrap">
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-50 my-1">Delete</button> 
                    <button onclick="setDataToInputs(${i})" class="btn btn-outline-warning btn-sm w-50 my-1">Update</button> 
</div>
                </div>
    </div>`;
    }

    myRow.innerHTML = cartona;
}

function deleteProduct(deletedindex) {

    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                productList.splice(deletedindex, 1)

                display(productList);

                localStorage.setItem("products", JSON.stringify(productList))
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                    timer:2000
                });
            } else {
                swal("Your imaginary file is safe!",{
                    timer:2000

                });
            }
        });




}



function search() {
    var cartona = "";
    var word = searchInput.value;
    var searchedProduct = [];
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].phone.toLowerCase().includes(word.toLowerCase())) {

            cartona += `<div class="col-md-3">
        <div class="item d-flex justify-content-center flex-column">
                    
                    <h5>Phone: ${productList[i].phone.toLowerCase().replaceAll(word.toLowerCase(), `<span class="bg-info rounded-1 shadow">${word.toLowerCase()}</span>`)}</h5>
                    <p>Company: ${productList[i].company}</p>
                    <h5>Screen: ${productList[i].screen}</h6>
                    <p>box: ${productList[i].box}</p>                   
                    <p>Description: ${productList[i].description}</p>
                           <div class="buttons d-flex gap-2 flex-nowrap">
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-50 my-1">Delete</button> 
                    <button onclick="setDataToInputs(${i})" class="btn btn-outline-warning btn-sm w-50 my-1">Update</button> 
                    </div>

                </div>
    </div>`;

            /*           searchedProduct.push(productList[i]);
                         console.log(searchedProduct);
                         searchedProduct[productList[i].phone.replaceAll(word.toLowerCase(), `<span class="bg-info rounded-1">${word.toLowerCase()}</span>`)]
             */

        }



    }
    //display(searchedProduct)
    myRow.innerHTML = cartona;
}

function validate(element) {
    var regex = {
        phoneName: /^[a-zA-z0-9\s]{5,}$/,
        screen: /^[a-zA-z0-9\s]{3,}$/,
        box: /^[0-9]{1,5}$/,
                company: /(Samsung|Iphone|Xiaomi|Realme|infinix|Oppo|Huawei|Redmi|Other)/i,
    }

    regex[element.id];

    if (regex[element.id].test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.replace("d-block", "d-none")
    }
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.replace("d-none", "d-block")

    }

}

function setDataToInputs(index) {
    phoneNameInput.value = productList[index].phone;
    boxInput.value = productList[index].box;
    screenInput.value = productList[index].screen;
    companyInput.value = productList[index].company;
    productDescriptionInput.value = productList[index].description;

    inputs.classList.remove('d-none')


    phoneNameInput.classList.add("is-valid")
    boxInput.classList.add("is-valid")
    companyInput.classList.add("is-valid")

    myIndex = index;

    addBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')

}

function updateProduct() {



    if (phoneNameInput.classList.contains("is-valid")
        && boxInput.classList.contains("is-valid")
        && companyInput.classList.contains("is-valid")) {

        productList[myIndex].phone = phoneNameInput.value;
        productList[myIndex].box = boxInput.value;
        productList[myIndex].screen = screenInput.value;
        productList[myIndex].caregory = companyInput.value;
        productList[myIndex].description = productDescriptionInput.value;

        localStorage.setItem("products", JSON.stringify(productList))

        addBtn.classList.remove('d-none')
        updateBtn.classList.add('d-none')
        display(productList)

        clearinput()
    }
    else {
        alert("Not Vaild Data")
    }



}














/*
if (localStorage.getItem("products") == null) {
    productList = [];
}
else {
    productList = JSON.parse(localStorage.getItem("products"));
    display()
}


function addProduct() {
    var product = {
        phone: phoneNameInput.value,
        box: boxInput.value,
        company: companyInput.value,
        description: productDescriptionInput.value,
        image: "imgs/1.jpg",
    }

    productList.push(product)
    localStorage.setItem("products", JSON.stringify(productList))
    console.log(productList);

    //clearinput();
    display()
}

function deleteProduct(deletedindex) {
    productList.splice(deletedindex, 1)
    display()
    localStorage.setItem("products", JSON.stringify(productList))

}

function display() {

    var cartona = "";

    for (i = 0; i < productList.length; i++) {
        cartona += `<div class="col-md-3">
        <div class="item d-flex justify-content-center flex-column">
                    <div class="image overflow-hidden">
                        <img src="imgs/1.jpg" class="w-100 object-fit-contain" alt="person">
                    </div>
                    <h5>Name: ${productList[i].code}</h5>
                    <p>Price: ${productList[i].price}</p>
                    <p>Category: ${productList[i].category}</p>
                    <p>Description: ${productList[i].description}</p>
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-100">Delete</button> 
                </div>
    </div>`;
    }

    myRow.innerHTML = cartona;

};

function clearinput() {

    productNameInput.value = null;
    productPriceInput.value = null;
    productCategoryInput.value = null;
    productDescriptionInput.value = null;
    productImageInput.value = null;
};

function search(){
    var word=searchInput.value;
    var cartona="";
    
    for(var i=0;i<productList.length;i++){

        if(productList[i].code.toLowerCase().includes(word.toLowerCase())){

            cartona += `<div class="col-md-3">
            <div class="item d-flex justify-content-center flex-column">
                        <div class="image overflow-hidden">
                            <img src="imgs/1.jpg" class="w-100 object-fit-contain" alt="person">
                        </div>
                        <h5>Name: ${productList[i].code}</h5>
                        <p>Price: ${productList[i].price}</p>
                        <p>Category: ${productList[i].category}</p>
                        <p>Description: ${productList[i].description}</p>
                        <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-100">Delete</button> 
                    </div>
        </div>`;
        }
        else{
            cartona="<h2>Not Found</h2>"
        }
    }

    myRow.innerHTML=cartona;
};*/

































