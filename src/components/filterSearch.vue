<template>
    <div id="filter-search">
        <h2>{{title}}</h2>
        <div class="content">
            <div class="wrap-filter flexbox">
                <input type="text" class="search-input" placeholder="Search..." v-model="keyword" v-on:keyup="search">
                <div class="filter flexbox">
                    <span class="label">Sort by: {{filterName}}</span>
                    <ul class="sort-menu">
                        <li v-for="sort in sortName" :key="sort.name" :class="sort.class" @click="sortByName(sort.class); filterLibraries(sort)">
                            {{sort.name.capitalize()}}
                        </li>
                        <li v-for="sort in sortDownloads" :key="sort.name" :class="sort.class" @click="sortByDownloads(sort.class); filterLibraries(sort)">
                            {{sort.name.capitalize()}}
                        </li>
                    </ul>
                </div>
            </div>
            <ul class="list" v-if="filteredList.length">
                <li v-for="(item, index) in filteredList" :key="index">
                    <span class="name">{{item.name}}</span>
                    <a :href="item.url" target="_blank">{{item.url}}</a>
                    <span class="downloads">{{item.downloads}} downloads</span>
                </li>
            </ul>
            <p v-else>Nothing found, please try again !</p>
        </div>
    </div>
</template>


<script>
    var libraries = [
        { name: 'Backbone.js', url: 'http://backbonejs.org/', downloads: '1150' },
        { name: 'AngularJS', url: 'https://angularjs.org/', downloads: '6647' },
        { name: 'jQuery', url: 'http://jquery.com/', downloads: '2852' },
        { name: 'Prototype', url: 'http://www.prototypejs.org/', downloads: '950' },
        { name: 'React', url: 'http://facebook.github.io/react/', downloads: '9631' },
        { name: 'Ember', url: 'http://emberjs.com/', downloads: '1095' },
        { name: 'Knockout.js', url: 'http://knockoutjs.com/', downloads: '968' },
        { name: 'Dojo', url: 'http://dojotoolkit.org/', downloads: '855' },
        { name: 'Mootools', url: 'http://mootools.net/', downloads: '795' },
        { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/', downloads: '780' },
        { name: 'Lodash', url: 'http://lodash.com/', downloads: '1232' },
        { name: 'Moment', url: 'http://momentjs.com/', downloads: '1010' },
        { name: 'Express', url: 'http://expressjs.com/', downloads: '1277' },
        { name: 'Koa', url: 'http://koajs.com/', downloads: '654' },
        { name: 'NodeJS', url: 'https://nodejs.org/en/', downloads: '8547' },
        { name: 'Vue', url: 'https://vuejs.org/', downloads: '9525' }
    ];

    function compareName(a, b){
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();

        if (nameA < nameB)
            return -1;
        if (nameA > nameB)
            return 1;
        return 0;
    }

    function compareDownloads(a, b){
        return a.downloads - b.downloads;
    }

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    var sortName = [
        { name: 'name ascending', class: 'asc' },
        { name: 'name descending', class: 'desc' }
    ];

    var sortDownloads = [
        { name: 'downloads ascending', class: 'asc' },
        { name: 'downloads descending', class: 'desc' }
    ];

    var filters = {
        nameAscending: function(libraries){
            return libraries.filter(function(){
                return libraries.sort(compareName);  
            })
        },
        nameDescending: function(libraries){
            return libraries.filter(function(){
                return libraries.sort(compareName).reverse();  
            })
        },
        downloadsAscending: function(libraries){
            return libraries.filter(function(){
                return libraries.sort(compareDownloads);  
            })
        },
        downloadsDescending: function(libraries){
            return libraries.filter(function(){
                return libraries.sort(compareDownloads).reverse();  
            })
        },
    }


    export default {
        name: 'filterSearch',
        data (){
            return {
                title: 'Filter search',
                libraries: libraries,
                keyword: '',
                filterName: 'name ascending',
                sortName: sortName,
                sortDownloads: sortDownloads
            }
        },
        created: function() {
            document.addEventListener('click', this.documentClick);
        },
        beforeMount: function(){
            var filterType = this.filterName.split(" ")[1].capitalize();
            var filter = this.filterName.split(" ")[0].concat(filterType);
            return filters[filter](this.libraries);
        },
        destroyed: function () {
            document.removeEventListener('click', this.documentClick);
        },
        computed: {
            filteredList: function(){
                var searchString = this.keyword.trim().toLowerCase();
                if(searchString.length > 0){
                    return this.libraries.filter((item) => {
                        //Convert name in list to lowercase to filter 
                        return item.name.toLowerCase().match(searchString);
                    })
                } else{
                    return this.libraries;
                }
            }
        },
        methods: {
            documentClick(e){
                let el = document.querySelector('.filter');

                if (e.target.closest('.filter')) {
                    el.classList.toggle('active');
                } else if(e.target.closest('.sort-menu')){
                    el.classList.remove('active');
                } else{
                    el.classList.remove('active');
                }
            },
            search: function(e){
                this.keyword = e.target.value;
            },
            sortByName: function(type){
                if(type == 'asc'){
                    this.libraries.sort(compareName);  
                } else if (type == 'desc'){
                    this.libraries.sort(compareName).reverse();
                }
            },
            sortByDownloads: function(type){
                if(type == 'asc'){
                    this.libraries.sort(compareDownloads);  
                } else if (type == 'desc'){
                    this.libraries.sort(compareDownloads).reverse();
                }
            },
            filterLibraries: function(sort){
                this.filterName = sort.name;
            }
        }
    } 

</script>

<style scoped>
    .content{
        max-width: 800px;
        margin: 0 auto;
        padding: 1.2rem;
        border-radius: 0.3rem;
        background: #fff;
        box-shadow: 0 0 2rem rgba(0,0,0,0.1), 0 0 3rem rgba(0,0,0,0.03);
        background-color: #73b0d6;
    }
    .list{
        background-color: #fff;
    }
    .list li{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        background-color: #f8f8f8;
        padding: 12px 20px;
        font-size: 13px;
    }
    .list li .name{
        width: 30%;
    }
    .list li a{
        color: #337ab7;
        width: 50%;
    }
    .list li .downloads{
        font-size: 11px;
        color: #888;
    }
    .list li:hover{
        background-color: #d8f2f1;
    }
    .list li:not(:last-child){
        margin-bottom: 5px;
    }
    .wrap-filter{
        margin-bottom: 20px;
    }
    .search-input{
        width: 100%;
        padding: 10px 15px;
        border-radius: 6px;
        border: none;
        max-width: 400px;
        margin-right: 20px;
    }
    .filter{
        position: relative;
        align-items: center;
        justify-content: center;
        padding: 10px 15px;
        flex: 1;
        background-color: #fff;
        border-radius: 6px;
        font-size: 15px;
        cursor: pointer;
    }
    .sort-menu { 
        border-radius: 6px;
        background-color: #fff;
        visibility: hidden;
        opacity: 0;
        position: absolute;
        top: 100%;
        left: 0;
        width: 80%;
        height: 0;
        padding: 15px;
        z-index: -1;
        transition: all 0.3s;
        box-shadow: 0 3px 10px #4d4d4d;
    }
    .filter.active .sort-menu{
        visibility: visible;
        opacity: 1;
        z-index: 1;
        height: inherit;
        transition: all 0.3s;
    }
    .sort-menu li{
        margin-bottom: 10px;
        cursor: pointer;
        font-size: 14px;
    }
    .sort-menu li:hover{
        opacity: 0.8;
    }
    /* .asc::after,
    .desc::after{
        position: relative;
        top: -1px;
    }
    .asc::after{
        content: '\2193';
    }
    .desc::after{
        content: '\2191';
    } */
    .filter .label{
        position: relative;
    }
    .filter .label::after{
        position: absolute;
        content: '';
        right: -18px;
        top: 5px;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 8px solid #000;
        clear: both;
    }

</style>
