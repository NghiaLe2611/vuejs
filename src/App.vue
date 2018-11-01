
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
    import imageGenerator from './components/imageGenerator'
    import vueQuiz from './components/vueQuiz'
    import tab from './components/tab'
    import todo from './components/todo'
    import advancedTodo from './components/advancedTodo'
    import filterSearch from './components/filterSearch'
    import checkOut from './components/checkOut'
    import shoppingCart from './components/shoppingCart'

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
                    { name: 'Mobile shopping cart', link: 'shoppingCart' }
                ]
            }
        },
        components: {
            imageGenerator: imageGenerator,
            vueQuiz: vueQuiz,
            tab: tab,
            todo: todo,
            advancedTodo: advancedTodo,
            filterSearch: filterSearch,
            checkOut: checkOut,
            shoppingCart: shoppingCart
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

</style>
