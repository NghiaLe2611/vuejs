<template>
    <div id="simple-todo">
        <h2>{{title}}</h2>
         <div class="content">
            <button class="btn btn-add-form" v-on:click="showAddForm=true">Add new task</button>
            <form class="form-task"  v-on:submit.prevent v-if="showAddForm">
                <input type="text" placeholder="Enter task's name" v-model="newTask"/>
                <button class="btn btn-add" type="submit" v-on:click="addTask">Add</button>
                <button class="btn btn-cancel" v-on:click="showAddForm = false">Cancel</button>
            </form>
            <table class="table">
                <thead>
                    <tr>
                        <th>Check done</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(task, index) in tasks" :key="index">
                        <td><input type="checkbox" class="input-check" v-model="task.complete"></td>
                        <td><span :class="{complete: task.complete}">{{task.name}}</span></td>
                        <td>
                            <button class="btn btn-edit" v-on:click="editTask(index, task)"><i class="far fa-edit"></i></button>
                            <button class="btn btn-delete" v-on:click="deleteTask(task)"><i class="far fa-trash-alt"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="edit-modal" v-show="showEditForm">
                <div class="modal-container no-animate">
                    <h2>Edit task</h2>
                    <form class="form-edit" v-on:submit.prevent>
                        <input type="text" v-model="newEditTask"/>
                        <div class="wrap-btn">
                            <button class="btn btn-cancel" v-on:click="cancelEdit">Cancel</button>
                            <button class="btn btn-add" v-on:click="submitEdit" type="submit">Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import swal from 'sweetalert2'
    export default {
       
        name: 'SimpleTodo',
        data (){
            return {
                title: 'Simple todo app',
                newTask: '',
                newEditTask: '',
                indexTask: '',
                tasks: [
                    { name: 'Get up', complete: false },
                    { name: 'Go to school', complete: false },
                    { name: 'Hang out', complete: false }
                ],
                showAddForm: false,
                showEditForm: false
            }
        },
        methods: {
            checkTaskName: function(){
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Task\'s name can\'t be empty !',
                });
            },
            showModal: function(status){
                var editModal = document.querySelector('.modal-container');
                if(status == true){
                    editModal.classList.remove('no-animate');
                    editModal.classList.add('zoomIn');
                } else{
                    editModal.classList.remove('zoomIn');
                }
            },
            addTask: function(e){
                e.preventDefault();
                if(this.newTask != ''){
                    this.tasks.push({
                        name: this.newTask,
                        complete: false
                    });
                    swal(
                        'Success',
                        'New task has been added !',
                        'success'
                    );

                    this.showAddForm = false;
                } else{
                    this.checkTaskName();
                    this.showAddForm = true;
                }
            },

            deleteTask: function(task){
                swal({
                    title: 'Are you sure?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    this.tasks.splice(this.tasks.indexOf(task), 1);
                    swal(
                        'Deleted!',
                        'Your task has been deleted !',
                        'success'
                    )
                }
                })
            },

            editTask: function(index, task){
                this.indexTask = index;
                this.newEditTask = task.name;
                this.showEditForm = true;
                this.showModal(true);
            },

            submitEdit: function(){
                if(this.newEditTask != ''){
                    swal(
                        'Success',
                        'Task has been updated !',
                        'success'
                    );
                    this.tasks[this.indexTask].name = this.newEditTask;
                    this.showEditForm = false;
                } else{
                this.checkTaskName();
                }
            },

            cancelEdit: function(){
                this.showModal();
                var _this = this;
                setTimeout(function(){
                    _this.showEditForm = false;      
                }, 400);
            }
        }
	
    } 

</script>

<style scoped>
    .content{
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 4rem;
        border-radius: 0.3rem;
        background: #fff;
        box-shadow: 0 0 2rem rgba(0,0,0,0.1), 0 0 3rem rgba(0,0,0,0.03);
    }
    .complete{
        text-decoration: line-through;
    }
    .btn{
        padding: 8px 14px;
        border-radius: 4px;
        font-size: 14px;
        transition: 0.3s ease;
        color: #fff;
    }
    .form-task{
        text-align: center;
        margin-top: 20px;
        display: flex;
    }
    form input{
        border-radius: 4px;
        border: 1px solid #ccc;
        padding-left: 20px;
    }
    .form-task input{
        flex: 1;
        margin-right: 10px;
    }
    .btn-add-form{
        margin: 0 auto;
        display: block;
        width: 100%;
        background-color: #337ab7;
        font-size: 20px;
    }
    .btn-add-form:hover{
        background-color: #3872a5;
    }
    .btn-add{
        background-color: #5cb85c;
        margin-right: 10px;
    }
    .btn-add:hover{
        background-color: #4c8e4c;
    }
    .table{
        width: 100%;
        margin-top: 20px;
    }
    .table, th, td{
        border: 1px solid #e8e6e6;
        border-collapse: collapse;
    }
    .table th:first-child,
    .table th:last-child{
        width: 150px;
    }
    .table th{
        padding: 15px 10px;
    }
    .table td{
        padding: 10px;
        text-align: center;
    }
    .table tbody tr:hover{
        background-color: #f7f7f7;
    }
    td button{
        background-color: transparent;
    }
    td button i{
        color: #000;
        font-size: 18px;
    }
    td .input-check{
        width: 20px;
        height: 20px;
    }
    .btn-delete i{
        color: #d9534f;
    }
    .btn-delete i:hover{
        color: #c9302c;
    }
    .btn-edit i{
        color: #f0ad4e;
    }
    .btn-edit i:hover{
        color: #ec971f;
    }
    .edit-modal{
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .edit-modal h2{
        text-align: center;
        margin-bottom: 20px;
    }
    .edit-modal .modal-container{
        width: 600px;
        height: 200px;
        border-radius: 4px;
        padding: 20px;
        background-color: #fff;
        animation-name: zoomOut;
        animation-duration: 0.5s;
        animation-fill-mode: both;
    }
    .edit-modal .form-task{
        flex-direction: column;
    }
    .edit-modal input{
        width: 100%;
        min-height: 40px;
    }
    .btn-cancel{
        color: #000;
    }
    .btn-cancel:hover{
        background-color: #ccc;
    }
    .wrap-btn{
        margin-top: 20px;
        text-align: center;
    }


    /*Effect*/
    .no-animate{
        animation: none;
    }
    .modal-container.zoomIn {
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
