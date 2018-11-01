<template>
    <div id="image-generator">
        <h2>{{title}}</h2>

        <div class="wrap-img flexbox">
            <div id="image" class="item" :style="customStyles">
                <span v-bind:style="{ 'color': textColor }">{{text}}</span>
            </div>
        </div>
        <div class="main flexbox">
            <div class="img-input">
                <label for="bgColor">Background color</label>
                <input name="bgColor" type="text" v-model="bgColor">
            </div>
            <div class="img-input">
                <label for="width">Width</label>
                <input name="width" type="text" v-model="width">
            </div>
            <div class="img-input">
                <label for="height">Height</label>
                <input name="height" type="text" v-model="height">
            </div>
            <div class="img-input">
                <label for="text">Text</label>
                <input name="text" type="text" v-model="text">
            </div>
            <div class="img-input">
                <label for="textColor">Text color</label>
                <input name="textColor" type="text" v-model="textColor">
            </div>
        </div>
        <div class="wrap-btn">
            <button id="btnGenerate" @click="generateImage()">Generate image</button>
        </div>
        <div id="result" title="Save image" @click="saveImage()"></div>
    </div>
</template> 


<script>
	import base64 from '../assets/js/base64.js'
	import html2canvas from 'html2canvas'
    // import canvas2image from '../assets/js/canvas2image.js'
    import colorpicker from '../assets/js/colorpicker.js'
    import eye from '../assets/js/eye.js'
    import utils from '../assets/js/utils.js'
    import layout from '../assets/js/layout.js'
    
    export default {
       
        name: 'imageGenerator',
        data (){
            return {
                title: 'Image Generator',
                bgColor: '#808080',
                width: 200,
                height: 200,
                text: '',
                textColor: '#fff'
            }
		},
		mounted() {
			var _this = this;

			$('input[name="bgColor"').ColorPicker({
				onChange: function (hsb, hex, rgb) {
					 _this.bgColor = '#' + hex;
				}
			});

			$('input[name="textColor"').ColorPicker({
				onChange: function (hsb, hex, rgb) {
					 _this.textColor = '#' + hex;
				}
			});
		},
        computed: { 
            //Thực hiện như 1 function nhưng chỉ đc coi là properties
            customStyles: function(){
                return{
                    backgroundColor: this.bgColor,
                    width: this.width + 'px',
                    height: this.height + 'px'
                }
            }
        },
        methods: {
			generateImage: function(){
				html2canvas(document.querySelector("#image")).then(canvas => {
					document.body.appendChild(canvas);
					$("#result").append(canvas);

					if($('#result canvas').length > 1){
						$('#result >:first-child').remove();
					}
				});
			},
			saveImage: function(){
			
				html2canvas(document.querySelector("#image")).then(canvas => {
					Canvas2Image.saveAsJPEG(canvas); 
				});
			}
        }

    } 

</script>


<style scoped>
    .wrap-img{
        justify-content: center;
        margin-bottom: 50px;
    }
    .main{
        justify-content: center;
    }
    .img-input{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
    }
    .img-input label{
        font-size: 18px;
        margin-bottom: 5px;
        color: #808080;
    }
    .img-input input{
        font-size: 16px;
        padding: 2px;
    }
    #image{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;
        box-sizing: border-box;
    }
    #image span{
        word-break: break-all;
        font-size: 24px;
        line-height: 1.2;
        cursor: context-menu;
        user-select: none;
    }
    .wrap-btn{
        text-align: center;
        margin: 50px 0;
    }
    .wrap-btn button{
        padding: 8px 15px;
        border-radius: 4px;
        background-color: #2980B9;
        color: #fff;
        cursor: pointer;
        border: none;
    }
    #result{
        text-align: center;
        cursor: pointer;
    }
</style>


