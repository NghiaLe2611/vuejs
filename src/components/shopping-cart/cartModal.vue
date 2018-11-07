<template>
    <div id="cart-modal">
        <ul class="cart-list">
            <li v-for="(item, index) in cartList" :key="index">
                <div class="thumb-imb"><img :src="item.img" :alt="item.name"></div>
                <h3 class="name">{{item.name}}</h3>
                <div class="action">
                    <span class="qty-btn decrease">+</span>
                    <span class="quantity">{{item.quantity}}</span>
                    <span class="qty-btn decrease">-</span>
                </div>
                <span class="price">{{number_format(item.price)}} đ</span>
                <span class="remove">&times;</span>
            </li>
        </ul>
        <div class="wrap-cart">
            <div class="wrap-btn">
                <button class="btn btn-clear">Remove all</button>
                <button class="btn btn-checkout">Check out</button>
            </div>
            <div class="total">0 <small>đ</small></div>
        </div>
    </div>
</template>


<script>

    export default {
        name: 'cartModal',
        props: [ 'cartList', 'number_format' ],
        data (){
            return {
                
            }
        },
        updated() {
            
        },
        computed: {

        },
        methods: {
            
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
        background-color: #000;
        color: #fff;
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
    }
    .cart-list li .action{
        display: flex;
        margin-right: 10px;
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
