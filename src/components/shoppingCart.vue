<template>
    <div id="shopping-cart">
        <div class="header">
            <h2>{{title}}</h2>
            <div class="cart" id="cart">
                <span class="cart-count">{{totalCart}}</span>
                <i class="fa fa-shopping-cart"></i>
            </div>
        </div>
        <div class="container">
            <div class="content">
                <ul class="list">
                    <li class="item" v-for="(item, index) in productList" :key="index">
                        <div class="wrap-img">
                            <img :src="item.img" :alt="item.name">
                            <div class="overlay"><i class="fas fa-search-plus"></i></div>
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
                            <button class="btn-cart" @click="addToCart($event, item)">Add to cart</button>
                         </div>
                    </li>
                </ul>
            </div>  
        </div>
    </div>
</template>


<script>
    import swal from 'sweetalert2'

    var productList = [
        { 
            name: 'Sony Xperia XZ1',
            img: 'src/assets/images/products/01.png',
            desc: 'Sony Xperia XZ1 là mẫu flagship kế tiếp của Sony tiếp nối sự thành công của chiếc Xperia XZs đã ra mắt trước đó với những nâng cấp nhẹ về mặt cấu hình và thiết kế.',
            price: 8990000,
            quantity: 1,
        },
        { 
            name: 'Sony Xperia XA2 Plus',
            img: 'src/assets/images/products/02.png',
            desc: 'Sony mới đây đã âm thầm ra mắt mẫu smartphone tầm trung mới - Xperia XA2 Plus với màn hình lớn với thiết kế viền bezel mỏng trông hiện đại hơn các model khác trong cùng phân khúc.',
            price: 6490000,
            quantity: 1,
        },
        { 
            name: 'Sony Xperia XZ Premium',
            img: 'src/assets/images/products/03.png',
            desc: 'Sony Xperia XZ Premium là flagship của Sony trong năm 2017 với vẻ ngoài hào nhoáng, màn hình cao cấp cũng nhiều trang bị hàng đầu khác.',
            price: 11490000,
            quantity: 1,
        },
        { 
            name: 'Sony Xperia XZ2',
            img: 'src/assets/images/products/04.png',
            desc: 'Xperia XZ2 là chiếc flagship mới được Sony giới thiệu tại MWC 2018 với sự thay đổi lớn về thiết kế so với những người tiền nhiệm.',
            price: 11990000,
            quantity: 1,
        },
        { 
            name: 'Sony Xperia XZ1',
            img: 'src/assets/images/products/01.png',
            desc: 'Sony Xperia XZ1 là mẫu flagship kế tiếp của Sony tiếp nối sự thành công của chiếc Xperia XZs đã ra mắt trước đó với những nâng cấp nhẹ về mặt cấu hình và thiết kế.',
            price: 8990000,
            quantity: 1,
        },
        { 
            name: 'Sony Xperia XA2 Plus',
            img: 'src/assets/images/products/02.png',
            desc: 'Sony mới đây đã âm thầm ra mắt mẫu smartphone tầm trung mới - Xperia XA2 Plus với màn hình lớn với thiết kế viền bezel mỏng trông hiện đại hơn các model khác trong cùng phân khúc.',
            price: 6490000,
            quantity: 1,
        },
        { 
            name: 'Sony Xperia XZ Premium',
            img: 'src/assets/images/products/03.png',
            desc: 'Sony Xperia XZ Premium là flagship của Sony trong năm 2017 với vẻ ngoài hào nhoáng, màn hình cao cấp cũng nhiều trang bị hàng đầu khác.',
            price: 11490000,
            quantity: 1,
        },
        { 
            name: 'Sony Xperia XZ2',
            img: 'src/assets/images/products/04.png',
            desc: 'Xperia XZ2 là chiếc flagship mới được Sony giới thiệu tại MWC 2018 với sự thay đổi lớn về thiết kế so với những người tiền nhiệm.',
            price: 11990000,
            quantity: 1,
        }
    ];

    export default {
        
        name: 'mobileShoppingCart',
        data (){
            return {
                title: 'Mobile Shopping Cart',
                productList: productList,
                totalCart: 0,
                cartList: []
            }
        },
        methods: {
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

            addToCart: function(event, item){
                this.cartList.push(item);
                this.totalCart += item.quantity;

                //Fly to cart
                var el = $(event.target);
                var item = $(el).closest('.item');
                var img = item.find('img');

                var cartTopOffset = $('#cart').offset().top - item.offset().top;
                var cartLeftOffset = $('#cart').offset().left - item.offset().left;

                console.log($('#cart').offset().top);
                console.log($('#cart').offset().left);

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
            }
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
        top: 450px;
        background-color: #000;   
        padding: 25px 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 10;
    }
    .cart .cart-count{
        font-size: 20px;
        margin-right: 5px;
    }
    .cart > *{
        color: #fff;
    }
    .cart:hover{
        opacity: 0.7;
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
    .btn-cart{
        padding: 0.5em 3em;
        background-color: transparent;
        border: 1px solid #000;
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
    .flying {
        width: 200px;
        height: 200px;
        top: 0;
        left: 0;
        animation: fly 0.8s 1;
        -webkit-animation: fly 0.8s 1;
        -webkit-backface-visibility: hidden;
    }

    @keyframes fly {
        0% {
            -moz-transform: rotate(0deg); 
            -ms-transform: rotate(0deg); 
            -o-transform: rotate(0deg); 
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -moz-transform: rotate(360deg); 
            -ms-transform: rotate(360deg); 
            -o-transform: rotate(360deg); 
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes fly {
        0% {
            -webkit-transform: rotate(0deg); 
        }
        100% {
            -webkit-transform: rotate(360deg); 
        }
    }
</style>
