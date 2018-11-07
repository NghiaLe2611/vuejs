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
        <div class="total">0 <small>đ</small></div>
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
        font-size: 12px;
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
    .total{
        padding: 10px 0;
        text-align: right;
        font-size: 25px;
        color: #fff;
        border-top: 1px solid #fff;
    }
    .total small{
        color: #fff;
    }

</style>
