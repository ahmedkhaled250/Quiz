
import { Quiz } from "./quiz.js";
//https://opentdb.com/api.php?amount=3&category=27&difficulty=easy&type=multiple
export class Setting{
    constructor()
    {
        this.categoryInp = document.getElementById("category");
        this.numOfQInp = document.getElementById("numOfQ");
        this.difficultyInp = document.getElementsByName("difficulty");
        this.startBtnInp = document.getElementById("startBtn");
        this.startBtnInp.addEventListener("click" , this.startQuiz.bind(this))
    }
     async startQuiz()
    {
        let category = this.categoryInp.value;
        let number =  this.numOfQInp.value;
        let difficulty = [...this.difficultyInp].filter(el => el.checked)[0].value;
        let api = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple`

        let questionArray = await this.fetchUrl(api)
     
        if( questionArray.length > 0)
        {
            $("#setting").fadeOut(500 , ()=>
            $("#quiz").fadeIn(500))
        }   
        new Quiz(questionArray);   
    }


    async fetchUrl(API)
    {
        let api = await fetch(API)
        let response = await api.json()
       return response.results;
    }
}

