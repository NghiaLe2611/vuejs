<template>
    <div id="tab-contents">
        <h2>{{title}}</h2>
        <div id="tab">
            <div class="tabs flexbox">
                <a href="#" v-for="(tab, index) in tabs" v-on:click="activeTab = index" :class="{active: activeTab === index}" :key="index">{{tab.tab}}</a>
            </div>
            <div class="content">
                <transition-group name="fade">
                    <div class="tabcontent" v-for="(tab, index) in tabs" v-show="activeTab == index" :key="index">
                        {{tab.content}}
                    </div>
                </transition-group>
                
            </div>
        </div>
    </div>
</template>


<script>

    export default {
       
        name: 'tabContents',
        data (){
            return {
                title: 'Tab contents',
                tabs: [
                    {
                        tab: 'Tab 1', content: 'Content for tab 1'
                    },
                    {
                        tab: 'Tab 2', content: 'Content for tab 2'
                    },
                    {
                        tab: 'Tab 3', content: 'Content for tab 3'
                    }
                ],
                activeTab: 0
            }
		},
	
    } 

</script>

<style scoped>
    #tab{
        max-width: 800px;
        margin: 0 auto;
    }
    .tabs{
        margin-left: 20px;
        margin-bottom: -2px;
    }
    .tabs a {
        padding: 12px 24px;
        transition: background-color 0.2s;
        border: 1px solid #ccc;
        border-right: none;
        background-color: #f1f1f1;
        border-radius: 10px 10px 0 0;
        font-weight: bold;
        color: #000;
    }
    .tabs a.active {
        background-color: #fff;
        color: #484848;
        border-bottom: 2px solid #fff;
        cursor: default;
    }
    .tabs a:last-child {
        border-right: 1px solid #ccc;
    }
    .tabs a:hover {
        background-color: #aaa;
        color: #fff;
    }
    .tabcontent {
        padding: 30px;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 3px 3px 6px #e1e1e1;
    }
    .btn{
        padding: 10px 20px;
    }
    .fade-enter-active {
        transition: opacity .4s ease;
    }
    .fade-enter, .fade-leave{
        opacity: 0;
    }
    .fade-enter-to,
    .fade-leave-to {
        opacity: 1;
    }

</style>
