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
                <span class="price">{{item.price}} đ</span>
            </li>
        </ul>
    </div>
</template>


<script>

    export default {
        name: 'cartModal',
        props: ['cartList'],
        data (){
            return {
                
            }
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
    .cart-list li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }
    .cart-list li *{
        color: #fff;
    }
    .cart-list li .name{
        font-size: 16px;
    }
    .cart-list li .action{
        display: flex;
    }
    .action .qty-btn{
        background-color: #fff;
        padding: 3px;
        color: #000;
        cursor: pointer;
    }
    .thumb-imb{
        border: 1px solid #fff;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        margin: 15px;
   }
    .thumb-imb img{
        width: 50px;
    }

</style>
