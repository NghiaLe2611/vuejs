<template>
    <transition name="modal">
        <div id="gallery-modal">
            <div class="modal-container">
                <span class="closed" @click="closeModal">&times;</span>
                <div class="modal-content">
                    <div class="wrap-img">
                        <img :src="activeGallery.img" :alt="activeGallery.name">
                    </div>
                    <ul class="wrap-gallery">
                        <li v-for="(href, index) in activeGallery.gallery" :key="index" @click="changeImg($event)">
                            <img :src="href">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>

    export default {
        name: 'galleryModal',
        props: ["productList", "showGalleryModal", "closeGalleryModal", "showGallery", "activeGallery"],
        data (){
            return {
                
            }
        },
        created: function() {
            document.addEventListener('click', this.documentClick);
        },
        methods: {
            documentClick(e){
                if (e.target.closest('#gallery-modal') == null ) {
                    this.closeModal();
                } 
            },
            closeModal: function(){
                this.$emit('closeGalleryModal');
            },
            changeImg: function(event){
                var href = event.target.getAttribute('src');
                var mainImg = document.querySelector('.modal-content .wrap-img img');
                mainImg.setAttribute('src', href);
            }
        }
    } 

</script>

<style scoped>
    /* .modal-enter-active{
        animation: openUp 0.3s;
    }
    .modal-leave-active{
        animation: openUp 0.3s reverse;
    } */
    .modal-enter-active, .modal-leave-active {
        transition: opacity .3s;
    }
    .modal-enter, .modal-leave-to {
        opacity: 0;
    }
    @keyframes openUp {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    #gallery-modal{
        position: fixed;
        top: 50%;
        left: 50%;
        box-shadow: 0 3px 10px #4d4d4d;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 2.5em;
        text-align: center;
        width: 400px;
        max-height: calc(100% - 2em);
        z-index: 3;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    .closed{
        position: absolute;
        right: 10px;
        top: 5px;
        font-size: 40px;
        color: #adacac;
        cursor: pointer;
    }
    .wrap-img{
        margin: 0 auto 15px auto;
        border: 1px solid #dfdfdf;
        width: 320px;
        height: 410px;
        display: flex;
        align-items: center;
    }
    .wrap-img img{
        /* max-width: 100%;
        max-height: 100%;
        object-fit: contain; */
        width: 100%;
    }
    .wrap-gallery{
        display: flex;
        flex-wrap: wrap;
    }
    .wrap-gallery li{
        flex: 1;
        cursor: pointer;
        border: 1px solid #dfdfdf;
        border-radius: 4px;
        padding: 5px;
    }
    .wrap-gallery li img{
        width: 100%;
    }
    .wrap-gallery li:not(:last-child){
        margin-right: 3px;
    }
    .wrap-gallery li.active{
        border-color: #adacac;
    }
    .wrap-gallery li:hover{
        opacity: 0.8;
    }
</style>
