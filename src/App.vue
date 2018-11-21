
<template>
    <div id="app">
        <h1>{{msg}}</h1>
        <div class="examples-list">
            <ul class="list flexbox">
                <li v-for="(example, index) in examples" :key="index">
                    <router-link :to="{path: example.link}">{{index + 1}}. {{example.name}}</router-link>
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
   
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Learn VueJS',
                examples: [
                    { name: 'Image generator', link: 'imageGenerator' },
                    { name: 'Vue Quiz', link: 'quiz' },
                    { name: 'Tab contents', link: 'tab' },
                    { name: 'Simple todo app', link: 'todo' },
                    { name: 'Advanced todo app', link: 'advancedTodo' },
                    { name: 'Filter search', link: 'filterSearch' },
                    { name: 'Simple checkout', link: 'checkout' },
                    { name: 'Mobile shopping cart', link: 'shoppingCart' },
                    { name: 'Clash Royale Maker', link: 'clashRoyale' }
                ]
            }
        }
    }

    
</script>


<style>
    body{
        padding-bottom: 50px;
    }
    h1{
        text-align: center;
        font-size: 50px;
        margin: 40px 0;
    }
    h2{
        text-align: center;
        font-size: 40px;
        margin-bottom: 30px;
    }
    .flexbox{
        display: flex;
    }
    .examples-list{
        margin-bottom: 40px;
    }
    .examples-list .list{
        flex-direction: column;
        width: 500px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f7f7f7;
    }
    .examples-list .list li{
        min-width: 240px;
        margin: 5px auto;
    }
    .examples-list .list li a{
        font-size: 20px;
    }
    .examples-list .list li a:hover{
        opacity: 0.7;
        transition: 0.3s ease;
    }
    .router-link-active{
        color: #50cf30;
    }
    
    .flying {
        -webkit-animation: fly 0.8s 1;
        animation: fly 0.8s 1;
    }
    .shaking {
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
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

    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }
        
        20%, 80% {
            transform: translate3d(2px, 0, 0);
        }

        30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
        }

        40%, 60% {
            transform: translate3d(4px, 0, 0);
        }
    }


</style>
