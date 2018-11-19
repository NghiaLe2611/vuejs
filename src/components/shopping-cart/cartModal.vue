<template>
    <div id="cart-modal">
        <ul class="cart-list">
            <li v-for="(item, index) in cartList" :key="index">
                <div class="thumb-imb"><img :src="item.img" :alt="item.name"></div>
                <h3 class="name">{{item.name}}</h3>
                <div class="action">
                    <span class="qty-btn increase" @click="selectAmount(item, 'increase')">+</span>
                    <span class="quantity">{{item.quantity}}</span>
                    <span class="qty-btn decrease" @click="selectAmount(item, 'decrease')">-</span>
                </div>
                <span class="price">{{number_format(item.price)}} đ</span>
                <span class="remove" @click="onRemoveCart(item)">&times;</span>
            </li>
        </ul>
        <div class="wrap-cart">
            <div class="wrap-btn">
                <button class="btn btn-clear" @click="onClearCart">Remove all</button>
                <button class="btn btn-checkout" @click="onCheckout">Check out</button>
            </div>
            <div class="total">{{number_format(totalPrice)}} <small>đ</small></div>
        </div>
    </div>
</template>


<script>

    export default {
        name: 'cartModal',
        props: [ 'cartList', 'number_format', "clearCart", "removeCart", "selectAmount", "totalPrice" ],

        methods: {
            onClearCart: function() {
                this.$emit('clearCart');
            },
            onRemoveCart: function(item) {
                this.$emit('removeCart', { 'id': item.id, 'quantity': item.quantity } );
            },
            onCheckout: function() {
                this.$emit('checkout');
            }
        }
	
    } 

</script>

<style scoped>
    .btn{
        background-color: #fff;
        border: 1px solid #000;
        padding: 0.5em 1.5em;
    }
    .btn:hover{
        opacity: 0.7;
        transition: 0.3s ease;
    }
    #cart-modal{
        position: absolute;
        top: 70px;
        right: 0;
        z-index: 10;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.85);   
        padding: 0 20px;
        cursor: auto;
    }
    .cart-list{
        margin-bottom: 20px;
    }
    .cart-list li{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    .cart-list li *{
        color: #fff;
    }
    .cart-list li .name{
        font-size: 14px;
    }
    .cart-list li .price{
        font-size: 14px;
        margin-right: 10px;
        width: 22%;
        text-align: right;
    }
    .cart-list li .action{
        display: flex;
        margin-right: 10px;
        width: 15%;
    }
    .cart-list li .name{
        width: 35%;
        line-height: 1.2;
    }
    .cart-list li .remove{
        font-size: 30px;
        cursor: pointer;
    }
    .action .qty-btn{
        background-color: #fff;
        padding: 3px;
        color: #000;
        cursor: pointer;
    }
    .action .qty-btn:hover{
        opacity: 0.7;
    }
    .action span{
        width: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .thumb-imb{
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        width: 40px;
        margin-right: 10px;
    }
    .thumb-imb img{
        width: 100%;
    }
    .wrap-cart{
        border-top: 1px solid #fff;
        padding: 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .total{
        text-align: right;
        font-size: 25px;
        color: #fff;  
    }
    .total small{
        color: #fff;
    }

</style>
