<template>
    <div id="check-out">
        <h2>{{title}}</h2>
        <div class="content">
            <h3>Our services</h3>
            <ul class="list">
                <li v-for="(item, index) in services" :key="index" @click="toggleActive(item)" :class="{active: item.active}">
                    <span class="num">{{index + 1}}.</span>
                    <span class="name">{{item.name}}</span>
                    <span class="price">${{item.price}}</span>
                </li>
            </ul>
            <div class="total">
                <span>Total</span>
                <span class="total-price">${{getTotal()}}</span>
            </div>
            <div class="checkout">
                <button class="btn-checkout" @click="onCheckout">Checkout</button>
            </div>
        </div>
    </div>
</template>


<script>
    import swal from 'sweetalert2'

    var services = [
        { name: 'Web Development', price: 300, active: false },
        { name: 'Design', price: 400, active: false },
        { name: 'Integration', price: 250, active: false },
        { name: 'Training', price: 220, active: false }
    ];

    export default {
        
        name: 'simpleCheckout',
        data (){
            return {
                title: 'Simple checkout',
                services: services,
                total: 0
            }
        },
        methods: {
            toggleActive: function(item){
                item.active = !item.active;
            },
            getTotal: function(item){
                var total = 0;
                var _this = this;

                this.services.forEach(function(item){
                    if(item.active){
                        total += item.price;
                    }
                    _this.total = total;
                });
                return total;
            },
            onCheckout: function(){
                if(this.total != 0){
                    swal(
                        'Success',
                        'Checkout success. Thanks for your purchase !',
                        'success'
                    );

                    this.services.forEach(function(item){
                        item.active = false;
                    });

                } else{
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Please choose one to checkout !',
                    });
                }
            }
        }
	
    } 

</script>

<style scoped>
    .content{
        max-width: 400px;
        margin: 20px auto;
        border: 1px solid #ccc;
        padding: 20px;
        box-shadow: 0 0 2rem rgba(0,0,0,0.1), 0 0 3rem rgba(0,0,0,0.03);
    }
    .content h3{
        margin-bottom: 30px;
        font-size: 24px;
        text-align: center;
    }
    .list li{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        padding: 10px;
        background: #f5f5f5;
    }
    .list li > *{
        color: #808787;
    }
    .list li:hover{
        background-color: #D1FFD7;
        transition: 0.3s ease;
    }
    .list li.active{
        background-color: #9ee095;
    }
    .list li.active > *{
        color: #000;
    }
    .num{
        margin-right: 30px;
    }
    .name{
        flex: 1;
    }
    .total{
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
        background-color: #073813;
        padding: 10px;
        font-weight: bold;
    }
    .total > *{
        color: #fff;
    }
    .btn-checkout{
        padding: 10px;
        width: 100%;
        background-color: rgb(32, 185, 109);
        color: #fff;
        border-radius: 6px;
    }
    .btn-checkout:hover{
        background-color: rgb(22, 138, 80);
    }
</style>
