<template>
    <div id="clash-royale">
        <h2>{{title}}</h2>
        <div class="wrap">
            <div class="header">
                <a href="#" class="logo"><img src="../../assets/images/cr/cr.png" alt="logo"/></a>
            </div>
            <div class="container">
                <div class="main">
                    <div class="col">
                        <form class="cr-form">
                            <div class="form-group">
                                <label class="label" for="name">Name: </label>
                                <input type="text" placeholder="Enter Name" id="name" class="form-control" v-model="name">
                            </div>
                            <div class="form-group">
                                <label class="label" for="rarity">Rarity: </label>
                                <select name="rarity" id="rarity" class="form-control" v-model="selectedRarity">
                                    <option v-for="(prop, index) in rarity" :key="index" :value="prop">{{prop}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="label" for="level">Level: </label>
                                <select name="level" id="level" class="form-control" v-model="selectedLevel">
                                    <option v-for="(prop, index) in level" :key="index" :value="prop">{{prop}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="label" for="type">Type: </label>
                                <select name="type" id="type" class="form-control" v-model="selectedType">
                                    <option v-for="(prop, index) in types" :key="index" :value="prop">{{prop}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="label" for="type">Elixir cost: </label>
                                <select name="Elixir" id="Elixir" class="form-control" v-model="selectedEli">
                                    <option v-for="(prop, index) in eli" :key="index" :value="prop">{{prop}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="label" for="type">Description: </label>
                                <textarea placeholder="Enter description..." rows="5" id="description" class="form-control" v-model="description"></textarea>
                            </div>
                            <div class="form-group">
                                <label class="label">Image: </label>
                                <label for="image">
                                    <span class="filename">
                                        ...<input type="file" id="image" accept="image/*" v-on:change="chooseImage" />
                                    </span>
                                </label>
                                <p class="form-control" id="filename"></p>
                                <p class="note">Select an image that represents your card.</p> 
                            </div>
                            <div class="form-group">
                                <label for="properties">Properties: </label>
                                <table class="properties">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Value</th>
                                            <th>Icon</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                    <div class="col">
                        <div class="cr-result">
                            <div class="card-block">
                                <h2 class="level">{{name}} Level {{selectedLevel}}</h2>
                                <span class="close-btn">&times;</span> 
                                <div class="card-info">
                                    <div class="name-info">
                                        <!-- <div :class="{'card-img': true, 'card-image-hexagon': this.selectedRarity == 'Legendary',  'card-image': this.selectedRarity != 'Legendary'}">
                                            <img id="card-image" src=""/>
                                            <div class="elixir">
                                                <span>{{selectedEli}}</span>
                                            </div>
                                        </div> -->
                                        
                                        <div v-if="this.selectedRarity != 'Legendary'" class="card-img card-image">
                                            <img id="card-image" src=""/>
                                            <div class="elixir">
                                                <span>{{selectedEli}}</span>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <svg class="clip-svg">
                                                <defs>
                                                    <clipPath id="clip-hexagon" clipPathUnits="objectBoundingBox">
                                                        <polygon points="0.5 0, 1 0.25, 1 0.75, 0.5 1, 0 0.75, 0 0.25" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            <div class="polygon-wrap card-image-hexagon">
                                                <img id="card-image" src="" class="hexagon">
                                            </div>    
                                        </div>
                                        

                                        <div class="card-name-container">
                                            <div class="card-name-wrapper" :style="getStyles">
                                                <div class="rarity">
                                                    <span>Rarity:</span>
                                                    <span class="stat">{{selectedRarity}}</span>
                                                </div>
                                                <div class="card-name">
                                                    <span>Type:</span>
                                                    <span class="stat">{{selectedType}}</span>
                                                </div>
                                            </div>
                                            
                                            <p class="description">{{description}}</p>
                                        </div>
                                    </div>
                                    <div class="stats-info">

                                    </div>
                                </div>
                            </div>
                            <div class="save">
                                <button class="btn-yellow save-btn">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

    export default {
        name: 'clashRoyaleMaker',
        data (){
            return {
                title: 'Clash Royale Maker',
                level: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                rarity: ['Common', 'Rare', 'Epic', 'Legendary'],
                types: ['Troop', 'Building', 'Spell'],
                eli: ['?', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                propList: [
                    { id: 1, name: 'Hitpoints', url: 'src/assets/images/cr/prop/hp.png'},
                    { id: 2, name: 'Damage', url: 'src/assets/images/cr/prop/damage.png'},
                    { id: 3, name: 'DPS', url: 'src/assets/images/cr/prop/dps.png'},
                    { id: 4, name: 'Area Damage', url: 'src/assets/images/cr/prop/area.png'},
                    { id: 5, name: 'Tower Damage', url: 'src/assets/images/cr/prop/tower.png'},
                    { id: 6, name: 'Hit Speed', url: 'src/assets/images/cr/prop/hit.png'},
                    { id: 7, name: 'Targets', url: 'src/assets/images/cr/prop/target.png'},
                    { id: 8, name: 'Speed', url: 'src/assets/images/cr/prop/speed.png'},
                    { id: 9, name: 'Range', url: 'src/assets/images/cr/prop/range.png'}
                ],
                name: '',
                selectedLevel: 1,
                selectedRarity: 'Common',
                selectedType: 'Troop',
                selectedEli: '?',
                description: '',
                image: '',
            }
        },
        computed: {
            getStyles: function(){
                let style = {};
                if(this.selectedRarity === 'Common'){
                    style = {
                        backgroundColor: '#666'
                    };
                }
                if(this.selectedRarity === 'Rare'){
                    style = {
                        backgroundColor: '#FDA03C'
                    };
                }
                if(this.selectedRarity === 'Epic'){
                    style = {
                        backgroundColor: '#CC33FF'
                    };
                } 
                if(this.selectedRarity === 'Legendary'){
                    style = {
                        backgroundColor: '#65BABA'
                    };
                }

                return style;
            }
        },
        methods: {
            readURL: function(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    
                    reader.onload = function (e) {
                        var img = document.getElementById('card-image');
                        img.setAttribute("src", e.target.result)
                    }
                    
                    reader.readAsDataURL(input.files[0]);
                }
            },
            chooseImage: function(e){
                this.readURL(e.target);
            }
        }
	
    } 

</script>

<style scoped>
    .wrap{
        background: url('../../assets/images/bg.jpg') repeat;
        background-size: 97px 100px;
        padding-bottom: 100px;
    }
    .wrap *{
        font-size: 13px;
        color: #fff;
        text-shadow: -1px 2px 0 #000, 0 2px 0 #000, 1px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }
    ::-webkit-input-placeholder { 
        font-family: SuperCell;
        text-shadow: none;
        font-size: 11px;
    }
    .wrap select, .wrap option{
        color: #555;
        text-shadow: none;
        font-size: 11px;
    }
    .header{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        background: rgba(0,30,70,.4);
        border: 1px solid rgba(100,100,100,.4);
    }
    .logo img{
        height: 40px;
    }
    .main{
       display: flex;
       padding: 50px 0;
    }
    .col{
        width: 50%;
        padding: 0 30px;
    }
    .form-group{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 20px;
    }
    .form-group .label{
        margin-right: 20px;
        min-width: 120px;
        text-align: right;
    }
    .form-control{
        display: block;
        flex: 1;
        padding: 6px 12px;
        font-size: 12px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        text-shadow: none;
    }
    input.form-control{
        height: 34px;
    }
    .properties{
        width: 100%;
        margin: 20px 0 0 20px;
    }
    .properties thead {
        border-bottom: 2px solid #fff;
    }
    .properties thead th{
        padding-bottom: 10px;
        text-align: left;
    }
    .cr-form input[type="file"] {
        display: none;
    }
    .note{
        width: 100%;
        margin: 10px 0 10px 155px;
        font-size: 11px;
        color: #737373;
    }
    #filename{
        height: 34px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .filename{
        color: #fff;
        background-color: #31b0d5;
        border-color: #269abc;
        padding: 6px 12px;
        border: 1px solid transparent;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        cursor: pointer;
        height: 100%;
    }
    label[for="image"]{
        height: 34px;
        display: flex;
        align-items: center;
    }
    .card-block {
        background: #636A7C;
        padding: 10px;
        border-radius: 6px;
        border: 2px solid #333;
        width: 510px;
        margin: 0 auto;
        position: relative;
    }
    .level {
        font-size: 16px;
        word-break: break-all;
        margin: 10px 35px 15px 0;
        text-align: center;
        color: #fff;
        text-shadow: -1px 2px 0 #000, 0 2px 0 #000, 1px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }
    .name-info {
        display: flex;
        height: 240px;
        background: #F9FBFC;
        padding: 30px 20px;
        border-radius: 4px 4px 0 0;
    }
    .stats-info {
        height: 300px;
        background: #DEEBF1;
        padding: 20px;
        border-radius: 0 0 4px 4px;
    }
    .card-img{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .card-image {
        border: 3px solid #2C2E34;
        border-radius: 10px;
        width: 30%;
        height: 170px;
        float: left;
        position: relative;
    }
    .card-image-hexagon {
        margin-top: -15px;
        position: relative;
        width: 135px;
        height: 200px;
        background: url('../../assets/images/cr/hexagon.png') no-repeat;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .card-image-hexagon img{
        width: 127px;
        height: 100%;
        max-width: initial;
    }
    .clip-svg {
        width: 0;
        height: 0;
    }
    .hexagon {
        -webkit-clip-path: polygon(50% 4%, 106% 24%, 102% 78%, 50% 97%, 0% 78%, -5% 25%);
        clip-path: polygon(50% 4%, 106% 24%, 102% 78%, 50% 97%, 0% 78%, -5% 25%);
        /* -webkit-clip-path: url("#clip-hexagon");
        clip-path: url("#clip-hexagon"); */
    }
    .card-name-container {
        float: left;
        width: 65%;
        height: auto;
        margin-left: 5%;
        color: #fff;
    }
    .card-name-wrapper {
        display: flex;
        padding: 8px;
        border-radius: 4px;
    }
    .card-name-wrapper > div {
        width: 50%;
    }
    .elixir {
        z-index: 999;
        position: absolute;
        top: -5px;
        left: -16px;
        background: -webkit-gradient(linear, left top, left bottom, color-stop(38%, #AE14BF),to(#ef017c));
        background: -webkit-linear-gradient(top, #AE14BF 38%,#ef017c 100%);
        background: -o-linear-gradient(top, #AE14BF 38%,#ef017c 100%);
        background: linear-gradient(to bottom, #AE14BF 38%,#ef017c 100%);
        width: 35px;
        height: 35px;
        border-top-left-radius: 0;
        border-top-right-radius: 75px;
        border-bottom-right-radius: 75px;
        border-bottom-left-radius: 75px;
        transform: rotate(60deg);
        box-shadow: 1px 1px 7px #1a1a1a;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .card-image-hexagon .elixir{
        top: 15px;
    }
    .elixir span {
        transform: rotate(-60deg);
        color: #fff;
        font-size: 16px;
    }
    .card-name-container span.stat {
        display: block;
        margin-top: 5px;
        text-shadow: -1px 2px 0 #000, 0 2px 0 #000, 1px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }
    .card-name-container .description {
        margin-top: 30px;
        color: #333;
        word-wrap: break-word;
        text-shadow: none;
        line-height: 1.4;
    }
    .btn-yellow {
        border: none;
        outline: none;
        background-color: #FFD053;
        background: -webkit-gradient(linear,left top, left bottom,color-stop(5%, #FFD053),to(#FFBC2B));
        background: -webkit-linear-gradient(top,#FFD053 5%,#FFBC2B 100%);
        background: -o-linear-gradient(top,#FFD053 5%,#FFBC2B 100%);
        background: linear-gradient(to bottom,#FFD053 5%,#FFBC2B 100%);
        -webkit-box-shadow: 0 2px 3px 0 #FF8907, 0 0 0 4px #FFA80C, 0 1px 0 4px #FFA80C, 0 -1px 2px 4px #FFD525, 0 -2px 0 5px #F4E684, 0 6px 0 4px #B06904, 0 3px 0 5px #F4E684, 0 -2px 0 7px #202020, 0 5px 0 7px #202020, 0 7px 0 7px #333;
        box-shadow: 0 2px 3px 0 #FF8907, 0 0 0 4px #FFA80C, 0 1px 0 4px #FFA80C, 0 -1px 2px 4px #FFD525, 0 -2px 0 5px #F4E684, 0 6px 0 4px #B06904, 0 3px 0 5px #F4E684, 0 -2px 0 7px #202020, 0 5px 0 7px #202020, 0 7px 0 7px #333;
        color: #FFC;
        text-shadow: -1px 2px 0 #582d00, 0 2px 0 #582d00, 1px 2px 0 #582d00, -1px -1px 0 #582d00, 1px -1px 0 #582d00, -1px 1px 0 #582d00, 1px 1px 0 #582d00;
    }
    .btn-yellow:hover, 
    .btn-yellow:focus, 
    .btn-yellow:active {
        border-color: transparent !important;
        outline: none !important;
        color: #fff !important;
        background-color: #FFD053 !important;
        -webkit-box-shadow: 0 2px 3px 0 #FF8907, 0 0 0 4px #FFA80C, 0 1px 0 4px #FFA80C, 0 -1px 2px 4px #FFD525, 0 -2px 0 5px #F4E684, 0 6px 0 4px #B06904, 0 3px 0 5px #F4E684, 0 -2px 0 7px #202020, 0 5px 0 7px #202020, 0 7px 0 7px #333;
        box-shadow: 0 2px 3px 0 #FF8907, 0 0 0 4px #FFA80C, 0 1px 0 4px #FFA80C, 0 -1px 2px 4px #FFD525, 0 -2px 0 5px #F4E684, 0 6px 0 4px #B06904, 0 3px 0 5px #F4E684, 0 -2px 0 7px #202020, 0 5px 0 7px #202020, 0 7px 0 7px #333;
    }
    .btn-yellow:active{
        position: relative;
        top: 2px;
    }
    .close-btn {
        font-size: 18px;
        padding: 5px 8px;
        position: absolute;
        right: 16px;
        top: 15px;
        height: 13px;
        width: 17px;
        border-radius: 3px;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        background: -webkit-gradient(linear, left top, left bottom, from(#FF0808), to(#FF584D));
        background: -webkit-linear-gradient(top, #FF0808 0%, #FF584D 100%);
        background: -o-linear-gradient(top, #FF0808 0%, #FF584D 100%);
        background: linear-gradient(to bottom, #FF0808 0%, #FF584D 100%);
        -webkit-box-shadow: 0 0 3px 0 #FC4144, 0 0 0 4px #E72424, 0 1px 0 4px #E72424, 0 -1px 2px 4px #FE4A5D, 0 -2px 0 5px #EC8A95, 0 6px 0 4px #9C1414, 0 3px 0 5px #9C1414, 0 -2px 0 7px #202020, 0 5px 0 7px #202020, 0 7px 0 7px #333;
        box-shadow: 0 0 3px 0 #FC4144, 0 0 0 4px #E72424, 0 1px 0 4px #E72424, 0 -1px 2px 4px #FE4A5D, 0 -2px 0 5px #EC8A95, 0 6px 0 4px #9C1414, 0 3px 0 5px #9C1414, 0 -2px 0 7px #202020, 0 5px 0 7px #202020, 0 7px 0 7px #333;
        text-shadow: -1px 2px 0 #000, 0 2px 0 #000, 1px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }
    .save{
        text-align: center;
        margin-top: 40px;
    }
    .save-btn{
        padding: 10px 30px;
        border-radius: 4px;
    }
</style>
