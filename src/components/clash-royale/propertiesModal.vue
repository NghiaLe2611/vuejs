<template>
    <transition name="fade">
        <div class="modal-overlay" v-show="showModal">
            <div id="modal">
                <div class="modal-container">
                    <div class="modal-header">
                        <h4 class="modal-title">Add card property</h4>
                        <span class="close" @click="$emit('closeModal')"><i class="fas fa-times"></i></span>
                    </div>
                    <div class="modal-body">
                        <form class="add-prop-form">
                            <div class="form-group">
                                <label class="label" for="name">Name: </label>
                                <input type="text" placeholder="Enter propety name" class="form-control" v-model="nameProp">
                            </div>
                            <div class="form-group">
                                <label class="label" for="value">Value: </label>
                                <input type="text" placeholder="Enter propety value" class="form-control" v-model="valueProp">
                            </div>
                            <div class="form-group">
                                <label class="label" for="prop">Icon: </label>
                                <div class="stat-list">
                                    <div class="stat-name" @click="show = !show">
                                        <span class="select-stat">
                                            <img :src="selectedIcon" />
                                            {{selectedStat}}
                                        </span>
                                        <span class="arrow">
                                            <i class="fas fa-caret-down"></i>
                                        </span>
                                    </div>
                                    <transition name="slide">
                                        <ul class="stat-dropdown" v-show="show">
                                            <li v-for="(prop, index) in propList" :key="index" @click="changeProp(prop)">
                                                <span class="prop-icon">
                                                    <img :src="prop.url" :alt="prop.name"/>
                                                    {{prop.name}}
                                                </span>
                                            </li>
                                        </ul>
                                    </transition>  
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="btn-toolbar">  
                                    <button type="submit" class="btn-yellow confirm btn" @click="onAddProp">Add</button>
                                    <button type="button" class="btn-red cancel btn" @click="onCloseModal">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

    export default {
        name: 'propertiesModal',
        props: [ "showModal" ],
        data() {
            return{
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
                selectedStat: 'Hitpoints',
                selectedIcon : 'src/assets/images/cr/prop/hp.png',
                nameProp: '',
                valueProp: '',
                iconProp : '',
                AddPropList: [],
                show: false
            }
        },
        methods: {
            onCloseModal: function(){
                this.$emit('closeModal');
                this.nameProp = '';
                this.valueProp = '';
            },
            onAddProp: function(e){
                e.preventDefault();
                
                var propItem = {
                    name: this.nameProp,
                    value: this.valueProp,
                    icon: this.selectedIcon
                };  

                let items = this.AddPropList;
                let isExist = false;
            
                if(isExist === false){
                    if(this.nameProp === '' || this.valueProp === ''){
                        alert('Input mustn\'t be empty');
                        return false;
                    } else items.push(propItem);

                    this.$emit('closeModal');
                    this.nameProp = '';
                    this.valueProp = '';
                }

                this.$emit('addProp', this.AddPropList );
            },
            changeProp: function(prop){
                this.selectedIcon = prop.url;
                this.selectedStat = prop.name;
                this.show = false;
            }
        }
	
    } 

</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .bounce-enter-active {
        animation: zoom-in .3s;
    }
    .bounce-leave-active {
        animation: zoom-in .3s reverse;
    }
    @keyframes zoom-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(0.5);
        }
        100% {
            transform: scale(1);
        }
    }
    @keyframes slideDown {
        0% {
            visibility: hidden;
            height: 0;
        }
        50% {
            height: 60px;
        }
        100% {
            visibility: visible;
            height: 120px;
        }
    }
    .slide-enter-active {
        animation: slideDown .2s;
    }
    .slide-leave-active {
        animation: slideDown .2s reverse;
    }
    *{
        font-family: SuperCell;
    }
    ::-webkit-input-placeholder { 
        font-family: SuperCell;
        font-size: 10px;
    }
    .modal-overlay{
        background-color: rgba(33, 32, 32, 0.36);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    #modal{
        position: absolute;
        top: 30%;
        left: 30%;
        width: 300px;
        background-color: #fff;
        box-shadow: 0 5px 15px rgba(0,0,0,.5);
        border-radius: 6px;
    }
    .modal-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        border-bottom: 1px solid #e5e5e5;
    }
    .modal-title{
        font-size: 14px;
    }
    .close{
        font-size: 20px;
        color: #ccc;
        cursor: pointer;
    }
    .modal-body{
        padding: 15px 0;
    }
    .form-control{
        display: block;
        width: 70%;
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
    .form-group{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 10px;
    }
    .form-group:not(:last-child){
        margin-left: 15px;
        margin-right: 15px;
    }
    .form-group .label{
        width: 30%;
        font-size: 12px;
    }
    .stat-list{
        flex: 1;
        position: relative;
    }
    .stat-dropdown{
        background: #fff;
        position: absolute;
        border: 1px solid #ccc;
        height: 120px;
        width: 100%;
        overflow-y: scroll;
        /* display: none; */
    }
    .stat-dropdown li{
        padding: 5px;
        border-bottom: 1px solid #ccc;
    }
    .stat-dropdown li:hover{
        background: #E5E6E7;
    }
    .stat-dropdown li:hover{
        cursor: pointer;
    }
    .stat-name{
        border: 1px solid #ccc;
        border-radius: 6px;
        height: 30px;
        position: relative;
        display: flex;
        background: #e5e6e7;
    }
    .stat-name:hover{
        cursor: pointer;
    }
    .select-stat{
        display: flex;
        align-items: center;
        height: 100%;
        width: 85%;
        padding-left: 5px;
        border-right: 1px solid #ccc;
        font-size: 10px;
    }
    span.arrow {
        position: absolute;
        top: 0;
        right: 0;
        width: 15%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    span.arrow i:hover {
        color: #4382ba;
    }
    .stat-name img, .prop-icon img {
        width: 25px;
        padding-right: 5px;
    }
    .prop-icon{
        font-size: 10px;
    }
    .btn-toolbar {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .btn-toolbar .btn{
        padding: 5px 10px;
    }
    .confirm{
        margin-right: 20px;
    }
    
</style>
