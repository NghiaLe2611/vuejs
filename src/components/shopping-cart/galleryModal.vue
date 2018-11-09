<template>
    <div id="gallery-modal" class="animate">
        <div class="modal-container">
            <span class="closed" @click="closeModal">&times;</span>
            <div class="modal-content" v-for="(item, index) in productList" :key="index">
                <div class="wrap-img">
                    <img :src="item.img" :alt="item.name">
                </div>
                <ul class="wrap-gallery">
                    <li v-for="(img, index) in item.gallery" :key="index">
                        <img :src="img">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>

    export default {
        name: 'galleryModal',
        props: ["productList", "closeGalleryModal"],
        data (){
            return {
                
            }
        },
        methods: {
            
            closeModal: function(){
                this.$emit('closeGalleryModal');
            }
        }
	
    } 

</script>

<style scoped>
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
    @keyframes closeUp {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
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
        padding: 2em;
        text-align: center;
        max-height: calc(100% - 2em);
        z-index: 3;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    .animate{
        animation: openUp 0.3s;
    }
    .closed{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 40px;
        cursor: pointer;
    }
    .wrap-img{
        width: 300px;
        height: 300px;
        margin: 0 auto;
        border: 1px solid #ccc;
    }
    .wrap-img img{
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
    .wrap-gallery{
        display: flex;
    }
    .wrap-gallery li{
        flex: 1;
    }

    .no-animate{
        animation: none;
    }
    #gallery-modal.zoomIn {
        -webkit-animation-name: zoomIn;
        animation-name: zoomIn;
    }
    @keyframes zoomIn {
        from {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }
        50% {
            opacity: 1;
        }
    }

    @-webkit-keyframes zoomOut {
        from {
            opacity: 1;
        }
        50% {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }
        to {
            opacity: 0;
        }
    }

    @keyframes zoomOut {
        from {
            opacity: 1;
        }
        50% {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }
        to {
            opacity: 0;
        }
    }

    .zoomOut {
        -webkit-animation-name: zoomOut;
        animation-name: zoomOut;
    }
</style>
