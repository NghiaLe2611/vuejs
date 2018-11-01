<template>
    <div id="advanced-todo">
        <h2>{{title}}</h2>
        <div class="content">
            <input class="add-input" type="text" placeholder="Enter task's name" v-on:keyup.enter="addTask" v-model="newTask"/>
            <ul class="todo-list">
                <li v-for="(task, index) in filteredTasks" :key="index" :class="{ completed: task.completed, editing: task == editedTask }">
                    <input type="checkbox" class="input-check" v-model="task.completed">
                    <label title="Double click to edit" v-on:dblclick="editTask(task)">
                        <span>{{task.name}}</span>
                        <input type="text" class="edit" 
                            v-model="task.name"
                            v-task-focus="task == editedTask"
                            v-on:blur="doneEdit(task)"
                            v-on:keyup.enter="doneEdit(task)"
                            v-on:keyup.esc="cancelEdit(task)"
                        >
                    </label>
                    <button class="btn-delete" v-on:click="deleteTask(index)" title="Delete task">&times;</button>
                </li>
            </ul>
            <div class="filter flexbox">
                <span class="count">{{countTasks()}}</span>
                <ul class="filter-task flexbox">
                    <li :class="{ active: filter == 'all' }" v-on:click="filterTask('all')"><span>All</span></li>
                    <li :class="{ active: filter == 'active' }" v-on:click="filterTask('active')"><span>Active</span></li>
                    <li :class="{ active: filter == 'completed' }" v-on:click="filterTask('completed')"><span>Completed</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
    import swal from 'sweetalert2'

    var STORAGE_KEY = 'todo-list';

    var tasks = [
        { name: 'Get up', completed: false },
        { name: 'Go to school', completed: false },
        { name: 'Hang out', completed: false }
    ];

    var myTasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || tasks;

    var todoStorage = {
        fetch: function () {
            return myTasks;
        },
        save: function (myTasks) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myTasks));
        }
    }


    var filters = {
        all: function(tasks){
            return tasks;
        },
        active: function(tasks){
            return tasks.filter(function(task){
                return !task.completed;
            })
        },
        completed: function(tasks){
            return tasks.filter(function(task){
                return task.completed;
            })
        }
    }
    
    export default {
       
        name: 'AdvancedTodo',
        data (){
            return {
                title: 'Advanced todo app',
                tasks: todoStorage.fetch(),
                newTask: '',
                editedTask: '',
                filter: 'all'
            }
        },
        computed: { 
            filteredTasks: function(){
                return filters[this.filter](this.tasks);
            }
        },
        watch: {
            tasks: {
                handler: function (tasks) {
                    todoStorage.save(tasks)
                },
                deep: true
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

            countTasks: function(){
                var text = this.filteredTasks.length <= 1 ? 'task left' : 'tasks left';
                var count = this.filteredTasks.length + ' ' + text;
                return count; 
            },

            addTask: function(){
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

                    this.newTask = '';
                } else{
                    this.checkTaskName();
                }
            },

            editTask: function(task){
                this.beforeEditCache = task.name;
                this.editedTask = task;
            },

            deleteTask: function(index){
                swal({
                    title: 'Are you sure?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    this.tasks.splice(index, 1);
                    swal(
                        'Deleted!',
                        'Your task has been deleted !',
                        'success'
                    )
                }
                })
            },

            doneEdit: function(task){
                if(task.name != ''){
                    this.editedTask = '';
                } else{
                    this.checkTaskName();
                }
            },

            cancelEdit: function(task){
                this.editedTask = '';
                task.name = this.beforeEditCache;
            },

            filterTask: function(filter){
                this.filter = filter;
            }
        },
        directives: {
        'task-focus': function (el, binding) {
                if (binding.value) {
                    el.focus()
                }
            }
        }
	
    } 

</script>

<style scoped>
    .content{
        max-width: 600px;
        margin: 0 auto;
        padding: 1rem 0;
        border-radius: 0.3rem;
        background: #fff;
        box-shadow: 0 0 2rem rgba(0,0,0,0.1), 0 0 3rem rgba(0,0,0,0.03);
    }
    .completed{
        text-decoration: line-through;
    }
    .add-input{
        width: 90%;
        display: block;
        padding: 10px 20px;
        margin: 0 auto;
        height: 40px;
        font-size: 18px;
        border-radius: 4px;
        border: 1px solid #e8e6e6;
        margin-bottom: 20px;
    }
    .add-input::placeholder{
        font-style: italic;
    }
    .todo-list{
        border-top: 1px solid #e8e6e6;
    }
    .todo-list li{
        padding: 15px 20px;
        border-bottom: 1px solid #e8e6e6;
        position: relative;
        display: flex;
        align-items: center;
    }
    .todo-list li:hover{
        background-color: #f7f7f7;
        transition: 0.3s ease;
    }
    .todo-list li:hover .btn-delete,
    .todo-list li:hover .btn-edit{
        display: flex;
        align-items: center;
    }
    .todo-list li .input-check{
        width: 20px;
        height: 20px;
        margin-right: 20px;
    }
    .todo-list li label{
        display: flex;
        align-items: center;
    }
    .btn-delete{
        position: absolute;
        top: 0;
        right: 12px;
        color: #d9534f;
        font-size: 30px;
        background-color: transparent;
        display: none;
        height: 100%;
    }
    .todo-list li button:hover{
        opacity: 0.7;
    }
    li .edit{
        font-size: 16px;
        border: 1px solid #ccc;
        padding: 10px;
        position: absolute;
        left: 49px;
        width: 90%;
        z-index: 9;
        display: none;
    }

    li.editing .edit{
        display: block;
    }
    li.complete span{
        text-decoration: line-through;
    }
    .filter{
        padding: 20px 20px 10px 20px;
        font-size: 14px;
        align-items: center;
        position: relative;
    }
    .filter .count{
        font-style: italic;
    }
    .filter-task{
        position: absolute;
        left: 0;
        width: 100%;
        justify-content: center;
    }
    .filter-task li{
        border: 1px solid  transparent;
        padding: 4px 6px;
    }
    .filter-task li.active,
    .filter-task li:hover{
        border-radius: 6px;
    }
    .filter-task li.active{
        border-color: #a9dab5;
    }
    .filter-task li:hover{
        cursor: pointer;
        border-color: #e8e6e6;
        transition: 0.3s ease;
    }
    .filter-task li:not(:last-child){
        margin-right: 15px;
    }
</style>