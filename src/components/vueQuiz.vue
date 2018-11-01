<template>
    <div id="quiz">
        <h2>{{title}}</h2>

        <div class="content">
            <div class="question-row" v-for="(question, index) in questionList" :key="index">
                <p class="question">Câu {{question.id}}. {{question. question}}</p>
                <ol>
                    <li v-for="answer in question.answers" :key="answer.id">
                        <label>
                            <input ref="question" type="radio" v-bind:value="answer.correct" v-bind:name="index">{{answer.answer}}
                        </label>
                    </li>
                </ol>
            </div>
            <div class="score" v-if="flag"> 
                Your score is: {{score}} <span>({{scorePercentage}})</span>
            </div>
            
            <div class="result">
                <button class="btn-submit" @click="submitScore">Submit score</button>
                <button class="btn-result" @click="showResult" v-if="flag">Show result</button>
                <button class="btn-test" @click="testAgain" v-if="flag">Test again</button>
            </div>
        </div>
    </div>
</template>

<script>

    var questionList = [
        {
            "id": 1,
            "question": "CSS là từ viết tắt của:",
            "answers": [
                { "answer": "Creative Style Sheets", "correct": 0},
                { "answer": "Computer Style Sheets", "correct": 0},
                { "answer": "Cascading Style Sheets", "correct": 1},
                { "answer": "Cascade Style Sheets", "correct": 0}
            ]
        },
        {
            "id": 2,
            "question": "Phần nào của file HTML được đặt mã tới external style sheet",
            "answers": [
                { "answer": "Trong thẻ <body>", "correct": 0},
                { "answer": "Ở phía cuối của file HTML", "correct": 0},
                { "answer": "Ở phần đầu của file HTML", "correct": 0},
                { "answer": "Trong thẻ <head>", "correct": 1}
            ]
        },
        {
            "id": 3,
            "question": "Thẻ HTML nào được sử dụng để khởi tạo internal style sheet",
            "answers": [
                { "answer": "Css", "correct": 0},
                { "answer": "Text/style", "correct": 0},
                { "answer": "Style", "correct": 1},
                { "answer": "Script", "correct": 0}
            ]
        },
        {
            "id": 4,
            "question": "Thuộc tính HTML nào được sử dụng để khởi tạo inline style",
            "answers": [
                { "answer": "Font", "correct": 0},
                { "answer": "Styles", "correct": 0},
                { "answer": "Css", "correct": 0},
                { "answer": "Style", "correct": 1}
            ]
        },
        {
            "id": 5,
            "question": "Cú pháp CSS nào sau đây là chuẩn xác",
            "answers": [
                { "answer": "body {color:black}", "correct": 1},
                { "answer": "body:color=black", "correct": 0},
                { "answer": "{body:color=black(body}", "correct": 0},
                { "answer": "{body;color:black}", "correct": 0}
            ]
        },
        {
            "id": 6,
            "question": "Làm thế nào để chèn 1 đoạn chú thích vào file CSS",
            "answers": [
                { "answer": "/* đoạn chú thích */", "correct": 1},
                { "answer": "<!-- đoạn chú thích -->", "correct": 0},
                { "answer": "// đoạn chú thích //", "correct": 0},
                { "answer": "// đoạn chú thích", "correct": 0}
            ]
        },
        {
            "id": 7,
            "question": "Thuộc tính nào được sử dụng để thay đổi màu nền",
            "answers": [
                { "answer": "bgcolor", "correct": 0},
                { "answer": "background-color", "correct": 1},
                { "answer": "color", "correct": 0},
                { "answer": "backgroundColor", "correct": 0}
            ]
        },
        {
            "id": 8,
            "question": "Làm thế nào để gán màu nền vào tất cả các thẻ <h1>",
            "answers": [
                { "answer": "all.h1 {background-color: #FFFFFF}", "correct": 0},
                { "answer": "h1.all {background-color: #FFFFFF}", "correct": 0},
                { "answer": "h1 {background-color: #FFFFFF}", "correct": 1},
                { "answer": "h1 {backgroundColor: #FFFFFF}", "correct": 0}
            ]
        },
        {
            "id": 9,
            "question": "Làm thế nào để thay đổi màu text của thẻ bất kỳ",
            "answers": [
                { "answer": "text-color", "correct": 0},
                { "answer": "font-color", "correct": 0},
                { "answer": "color", "correct": 1},
                { "answer": "textColor", "correct": 0}
            ]
        },
        {
            "id": 10,
            "question": "Làm thế nào để hiển thị đường dẫn hyperlink không gạch dưới",
            "answers": [
                { "answer": "a {decoration: no-underline}", "correct": 0},
                { "answer": "a {text-decoration: no-underline}", "correct": 0},
                { "answer": "a {underline: none}", "correct": 0},
                { "answer": "a {text-decoration: none}", "correct": 1}
            ]
        }
    ];

    export default {
        name: 'vueQuiz',
        data: function(){
            return {
                title: 'Vue Quiz',
                questionList: questionList,
                score: 0,
                scorePercentage: '',
                flag: false
            }
        },
        methods: {
            submitScore: function() {
                var ans = this.$refs.question;
                var scoreArr = [];

                this.flag = true;
                
                if(this.score == 0){
                    this.scorePercentage = 0 + "/" + questionList.length;
                }
                for(var i = 0; i < ans.length; i++){
                    if(ans[i].checked == true && ans[i].value == 1){
                        scoreArr.push(ans[i].value);

                        this.score = scoreArr.length;
                        this.scorePercentage = scoreArr.length + "/" + questionList.length;
                        
                    } 

                    if(ans[i].checked == true && ans[i].value != 1){
                        ans[i].parentElement.style.color = "red";
                    }
                }
            },
            showResult: function() {
                var ans = this.$refs.question;
                var scoreArr = [];
                for(var i = 0; i < ans.length; i++){
                    if(ans[i].value == 1){
                        ans[i].parentElement.classList.add('true');
                    }
                }
            },
            testAgain: function(){
                var ans = this.$refs.question;
                
                for(var i = 0; i < ans.length; i++){
                    ans[i].parentElement.removeAttribute("style");
                    ans[i].parentElement.removeAttribute("class");
                    ans[i].checked = false;
                }
                this.score = 0;
                this.flag = false;
            },
            /*fetchData: function () { 
                var vm = this
                this.$http.get('api.openweathermap.org/data/2.5/weather?q=Normal&units=imperial&APPID=MYAPPID'),
                function (data) {
                    vm.getTemp = data.main.temp;
                }
            }*/
        }
} 
</script>


<style scoped>
    .content{
        max-width: 1024px;
        width: 100%;
        margin: 0 auto;
        text-align: left;
    }

    .content .question-row{
        color: #000;
        margin-bottom: 40px;
        font-size: 16px;
    }
    .question-row .question{
        font-size: 24px;
        margin-bottom: 10px;
        font-weight: bold;
    }
    .question-row ol{
        list-style: upper-alpha;
        padding-left: 22px;
    }
    .question-row ol li{
        max-width: 500px;
        font-size: 18px;
        margin-bottom: 5px;  
    }
    .question-row ol li label{
        display: flex;
        align-items: center;
    }
    .question-row ol li label input{
        margin-right: 5px;
    }
    label.true{
        position: relative;
    }
    label.true:after{
        position: absolute;
        content: '';
        right: 0;
        top: -2px;
        width: 18px;
        height: 18px;
        background-size: 100%;
        background-image: url('../assets/images/check-true.png');
    }
    .result{
        margin-top: 30px;
    }
    .result button{
        padding: 5px 20px;
        border-radius: 6px;
        color: #fff;
        font-size: 18px;
        margin-right: 20px;
    }
    .result button:hover{
        opacity: 0.9;
    }
    .btn-submit{
        background-color: #449D44;
    }
    .btn-result{
        background-color: #337ab7;
    }
    .btn-test{
        background-color: #F1886B;
    }
    .score{
        color: red;
        font-size: 20px;
        border: 1px solid red;
        padding: 5px 10px;
    }
</style>
