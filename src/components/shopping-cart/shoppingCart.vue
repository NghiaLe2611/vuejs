<template v-bind:title="title">
    <div id="shopping-cart">
        <div class="header">
            <h2>{{title}}</h2>
            <div class="cart" id="cart" @click="showCartModal" :class="{ open: showCart }">
                <span class="cart-count">{{getQuantity()}}</span>
                <i class="fa fa-shopping-cart"></i>
                <cartModal v-if="showCart"
                    :cartList = cartList
                    :number_format = number_format
                    :selectAmount = selectAmount
                    :totalPrice = totalPrice
                    v-on:clearCart = "clearCart"
                    v-on:removeCart = "removeCart"
                    v-on:checkout = "checkout"
                />
            </div>
        </div>

        <div class="container">
            <div class="content">
                <ul class="list">
                    <li class="item" v-for="(item, index) in productList" :key="index">
                        <div class="wrap-img">
                            <img :src="item.img" :alt="item.name">
                            <div class="overlay" @click="showGalleryModal(item)"><i class="fas fa-search-plus"></i></div>
                        </div>
                         <h3 class="name">{{item.name}}</h3>
                         <p class="desc">{{item.desc}}</p>
                         <p><span class="price">{{number_format(item.price)}} đ</span></p>
                         <div class="action">
                            <p class="qty">
                                <label for="qty">QTY</label>
                                <span class="qty-btn decrease" @click="selectAmount(item, 'decrease')">-</span>
                                <input type="text" class="quantity" ref="amount" :value="item.quantity" @keyup="changeQty(index, item)">
                                <span class="qty-btn increase" @click="selectAmount(item, 'increase')">+</span>
                            </p>
                            <button class="btn btn-cart" @click="addToCart($event, item)">Add to cart</button>
                         </div>
                    </li>
                </ul>
            </div>  
        </div>
        <galleryModal v-if="showGallery"
            :productList = productList
            :showGallery = showGallery
            :activeGallery = activeGallery
            v-on:showGalleryModal="showGalleryModal"
            v-on:closeGalleryModal="closeGalleryModal"
        />
    </div>
</template>


<script>
    import swal from 'sweetalert2'
    import cartModal from './cartModal'
    import galleryModal from './galleryModal'
 
    var productList = [
        { 
            id: '1',
            name: 'Sony Xperia XZ1',
            img: 'src/assets/images/products/01.png',
            desc: 'Sony Xperia XZ1 là mẫu flagship kế tiếp của Sony tiếp nối sự thành công của chiếc Xperia XZs đã ra mắt trước đó với những nâng cấp nhẹ về mặt cấu hình và thiết kế.',
            price: 8990000,
            quantity: 1,
            gallery: [
                'src/assets/images/products/01-1.jpg' ,
                'src/assets/images/products/01-2.jpg',
                'src/assets/images/products/01-3.jpg',
                'src/assets/images/products/01-4.jpg'
            ]
        },
        { 
            id: '2',
            name: 'Sony Xperia XA2 Plus',
            img: 'src/assets/images/products/02.png',
            desc: 'Sony mới đây đã âm thầm ra mắt mẫu smartphone tầm trung mới - Xperia XA2 Plus với màn hình lớn với thiết kế viền bezel mỏng trông hiện đại hơn các model khác trong cùng phân khúc.',
            price: 6490000,
            quantity: 1,
            gallery: [
                'src/assets/images/products/02-1.jpg' ,
                'src/assets/images/products/02-2.jpg',
                'src/assets/images/products/02-3.jpg',
                'src/assets/images/products/02-4.jpg'
            ]
        },
        { 
            id: '3',
            name: 'Sony Xperia XZ Premium',
            img: 'src/assets/images/products/03.png',
            desc: 'Sony Xperia XZ Premium là flagship của Sony trong năm 2017 với vẻ ngoài hào nhoáng, màn hình cao cấp cũng nhiều trang bị hàng đầu khác.',
            price: 11490000,
            quantity: 1,
            gallery: [
                'src/assets/images/products/03-1.jpg' ,
                'src/assets/images/products/03-2.jpg',
                'src/assets/images/products/03-3.jpg',
                'src/assets/images/products/03-4.jpg'
            ]
        },
        { 
            id: '4',
            name: 'Sony Xperia XZ2',
            img: 'src/assets/images/products/04.png',
            desc: 'Xperia XZ2 là chiếc flagship mới được Sony giới thiệu tại MWC 2018 với sự thay đổi lớn về thiết kế so với những người tiền nhiệm.',
            price: 11990000,
            quantity: 1,
            gallery: [
                'src/assets/images/products/04-1.jpg' ,
                'src/assets/images/products/04-2.jpg',
                'src/assets/images/products/04-3.jpg',
                'src/assets/images/products/04-4.jpg'
            ]
        },
        { 
            id: '5',
            name: 'Sony Xperia XZ1',
            img: 'src/assets/images/products/01.png',
            desc: 'Sony Xperia XZ1 là mẫu flagship kế tiếp của Sony tiếp nối sự thành công của chiếc Xperia XZs đã ra mắt trước đó với những nâng cấp nhẹ về mặt cấu hình và thiết kế.',
            price: 8990000,
            quantity: 1,
            gallery: [
                'src/assets/images/products/01-1.jpg' ,
                'src/assets/images/products/01-2.jpg',
                'src/assets/images/products/01-3.jpg',
                'src/assets/images/products/01-4.jpg'
            ]
        },
        { 
            id: '6',
            name: 'Sony Xperia XA2 Plus',
            img: 'src/assets/images/products/02.png',
            desc: 'Sony mới đây đã âm thầm ra mắt mẫu smartphone tầm trung mới - Xperia XA2 Plus với màn hình lớn với thiết kế viền bezel mỏng trông hiện đại hơn các model khác trong cùng phân khúc.',
            price: 6490000,
            quantity: 1,
            gallery: [
                'src/assets/images/products/02-1.jpg' ,
                'src/assets/images/products/02-2.jpg',
                'src/assets/images/products/02-3.jpg',
                'src/assets/images/products/02-4.jpg'
            ]
        },
        { 
            id: '7',
            name: 'Sony Xperia XZ Premium',
            img: 'src/assets/images/products/03.png',
            desc: 'Sony Xperia XZ Premium là flagship của Sony trong năm 2017 với vẻ ngoài hào nhoáng, màn hình cao cấp cũng nhiều trang bị hàng đầu khác.',
            price: 11490000,
            quantity: 1,
            gallery: [
                'src/assets/images/products/03-1.jpg' ,
                'src/assets/images/products/03-2.jpg',
                'src/assets/images/products/03-3.jpg',
                'src/assets/images/products/03-4.jpg'
            ]
        },
        { 
            id: '8',
            name: 'Sony Xperia XZ2',
            img: 'src/assets/images/products/04.png',
            desc: 'Xperia XZ2 là chiếc flagship mới được Sony giới thiệu tại MWC 2018 với sự thay đổi lớn về thiết kế so với những người tiền nhiệm.',
            price: 11990000,
            quantity: 1,
            gallery: [
                'src/assets/images/products/04-1.jpg' ,
                'src/assets/images/products/04-2.jpg',
                'src/assets/images/products/04-3.jpg',
                'src/assets/images/products/04-4.jpg'
            ]
        }
    ];

    export default {
        
        name: 'mobileShoppingCart',
        
        data (){
            return {
                title: 'Mobile Shopping Cart',
                productList: productList,
                totalCart: 0,
                totalPrice: 0,
                showCart: false,
                cartList: [],
                showGallery: false,
                activeGallery: ''
            }
        },
        created: function() {
            document.addEventListener('click', this.documentClick);
        },
        updated: function() {
            var total = this.cartList.reduce(function (qty, item) {
                return qty + item.quantity*item.price; 
            }, 0);
           
           this.totalPrice = total;
        },
        methods: {
            documentClick(e){
                if (e.target.closest('.btn-cart, #cart, #cart-modal, .qty-btn') == null ) {
                    this.showCart = false;
                } 
            },
            showCartModal: function(){
                if(this.totalCart != 0){
                    this.showCart = true;
                } else{
                    this.showCart = false;
                }
            },
            number_format: function(number, decimals, dec_point, thousands_point){
                if (number == null || !isFinite(number)) {
                    //throw new TypeError("number is not valid");
                }

                if (!decimals) {
                    var len = number.toString().split('.').length;
                    decimals = len > 1 ? len : 0;
                }

                if (!dec_point) {
                    dec_point = '.';
                }

                if (!thousands_point) {
                    thousands_point = ',';
                }

                number = parseFloat(number).toFixed(decimals);

                number = number.replace(".", dec_point);

                var splitNum = number.split(dec_point);
                splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
                number = splitNum.join(dec_point);

                return number;
            },
            selectAmount: function(item, type){
                if(type == 'decrease'){
                    if(item.quantity > 1){
                        item.quantity -= 1;
                    }
                } else{
                    item.quantity += 1;
                }
            },
            changeQty: function(index, item){
                item.quantity = parseInt(this.$refs.amount[index].value);
            },
            getQuantity: function(){
                var total = 0;
                var _this = this;

                this.cartList.forEach(function(item){
                    total += item.quantity;
                    _this.totalCart = total;
                });
                return total;
            },
            getTotal: function(){
                var total = 0;
                var _this = this;

                this.cartList.forEach(function(item){
                    total += item.price*item.quantity;
                    _this.totalPrice = total;
                });
                return total;
            },
            addToCart: function(event, item){

                //Add item to cart
                var cartList = this.cartList;

                var cartItem = {
                    id: item.id,
                    name: item.name,
                    img: item.img,
                    desc: item.desc,
                    price: item.price,
                    quantity: item.quantity
                };

                var isExist = false;
                var total = 0;

                for(var i = 0; i < cartList.length; i++){
                    if(cartList[i].name === cartItem.name){
                        cartList[i].quantity += item.quantity;
                        //return false;
                        isExist = true; 
                        break;
                    }
                }   

                if(!isExist){
                    cartList.push(cartItem);
                } 

                this.totalCart = this.getQuantity;
                this.totalPrice = this.getTotal();

                //Fly to cart
                var el = $(event.target);
                var item = $(el).closest('.item');
                var img = item.find('img');

                var cartTopOffset = $('#cart').offset().top - item.offset().top;
                var cartLeftOffset = $('#cart').offset().left - item.offset().left;

                var flyingImg = $('<img class="flying">');

                flyingImg.attr('src', img.attr('src'));
                flyingImg.css({
                    'width': '200',
                    'height': '200',
                    'position': 'absolute',
                    'z-index': '20'
                });

                flyingImg.animate({
                    top: cartTopOffset,
                    left: cartLeftOffset,
                    width: 50,
                    height: 50,
                    opacity: 0.1
                }, 800, function () {
                    flyingImg.remove();
                });

                item.append(flyingImg);

                setTimeout(function () { 
                    $('#cart').addClass('shaking');
                }, 500);
               
				setTimeout(function () { 
                    $('#cart').removeClass('shaking');
                }, 1000);
            },
            clearCart: function(){
                swal({
                    title: 'Are you sure?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, remove all!'
                }).then((result) => {
                    if (result.value) {
                        this.cartList = [];
                        this.totalCart = 0;
                        swal(
                            'Deleted!',
                            'Your cart has been empty !',
                            'success'
                        )
                    }
                })
                
            },
            removeCart: function(item){
                swal({
                    title: 'Are you sure?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, remove it!'
                }).then((result) => {
                    if (result.value) {
                        var index = this.cartList.map(function(el) {
                            return el.id
                        }).indexOf(item.id);
                        
                        this.totalCart -= item.quantity;
                        this.cartList.splice(index, 1);
                       
                        swal(
                            'Deleted!',
                            'Item has been removed !',
                            'success'
                        )
                    }
                })
                
            },
            showGalleryModal: function(item){
                this.activeGallery = item;
                this.showGallery = true;
            },
            closeGalleryModal: function(){
                this.activeGallery = '';
                this.showGallery = false;
            },
            checkout: function(){
                 swal({
                    title: 'Are you sure?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, checkout it!'
                }).then((result) => {
                    if (result.value) {
                        
                        this.totalCart = 0;
                        this.cartList = [];
                       
                        swal(
                            'Checkout successful!',
                            'Thanks for your purchase !',
                            'success'
                        )
                    }
                })
            }
        },
        components: {
            cartModal: cartModal,
            galleryModal: galleryModal
        }
    } 

</script>

<style scoped>

    #shopping-cart *:not(i){
        font-family: 'Bitter', serif;
    }
    .header{
        position: relative;
        background: linear-gradient(to left, #16222A, #3A6073);
        background-size: cover;
        height: 15em;
        box-shadow: inset -1px -3px 5px rgba(0, 0, 0, 0.5), inset 1px 3px 5px rgba(0, 0, 0, 0.5);
        margin-bottom: 30px;
    }
    .header h2{
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        color: white;
        font-size: 3em;
        text-shadow: 1px 3px 5px rgba(0, 0, 0, 0.5), -1px -3px 5px rgba(0, 0, 0, 0.5);
    }
    .cart{
        position: fixed;
        right: 0;
        top: 300px;
        background-color: rgba(0, 0, 0, 0.85);   
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 10;
        transition: width 0.2s ease;
    }
    .cart.open{
        width: 450px;
        padding: 20px;
        justify-content: flex-end;
    }
    .cart .cart-count{
        font-size: 20px;
        margin-right: 5px;
    }
    .cart > *{
        color: #fff;
    }
    .list{
        display: flex;
        flex-wrap: wrap;
        margin-left: -40px;
    }
    .list .item{
        width: calc(100% * 1/4 - 40px);
        margin-left: 40px;
        margin-bottom: 40px;
        position: relative;
    }
    .list .item .name{
        text-align: center;
        margin-bottom: 20px;
    }
    .list .item .desc{
        line-height: 1.2;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 15px;
    }
    .list .item .price{
        color: red;
        font-weight: 600;
    }
    .list .item p{
        font-size: 15px;
        text-align: center;
    }
    .list .item img{
        width: 100%;
    }
    .btn{
        background-color: transparent;
        border: 1px solid #000;
    }
    .btn-cart{
        padding: 0.5em 3em;
    }
    .btn-cart:hover{
        background-color: #000;
        color: #fff;
        transition: 0.3s ease;
    }
    .action .qty-btn{
        border: 1px solid #ccc;
        padding: 5px;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
    .action{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        padding: 5px;
    }
    .action .qty{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .qty label{
        margin-right: 10px;
    }
    .qty input{
        width: 40px;
        height: 30px;
        margin: 0 5px;
        border: 1px solid #ccc;
        text-align: center;
    }
    .wrap-img{
        position: relative;
        cursor: pointer;
        margin-bottom: 20px;
    }
    .overlay{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transition: 0.3s ease;
        z-index: -1;
    }
    .overlay i{
        position: absolute;
        left: 50%;
        top: 200%;
        font-size: 60px;
        color: #fff;
        transform: translate(-50%, -50%);
        transition: 0.3s ease;
    }
    .wrap-img:hover{
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    }
    .wrap-img:hover .overlay{
        opacity: 1;
        visibility: visible;
        z-index: 1;
    }
    .wrap-img:hover .overlay i{
        top: 50%;
    }

    
</style>
