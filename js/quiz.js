  // parameterized constructor
export class Quiz
{
    constructor(questionArray)
    {       
        this.questionArray = questionArray;
        this.total = this.questionArray.length;
        this.nextBtn = document.getElementById("next")
        this.nextBtn.addEventListener("click" , this.nextQ.bind(this) );
        this.tryBtn = document.getElementById("tryBtn").addEventListener("click" , this.tyAgain)
        this.current = 0;
        this.score =0;
        this.isCorrect=false;
        this.showQ()
    }
    showQ()
    {
        document.getElementById("question").innerHTML = this.questionArray[this.current].question;
        document.getElementById("currentQuestion").innerHTML=  this.current+1;
        document.getElementById("totalNumOfQ").innerHTML = this.total;
        this.showA()
    
    }
    showA()
    {
        this.answers = [this.questionArray[this.current].correct_answer , 
        ...this.questionArray[this.current].incorrect_answers] ;
        console.log(this.answers);

        let currentIndex = this.answers.length,  randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [this.answers[currentIndex], this.answers[randomIndex]] = [
            this.answers[randomIndex], this.answers[currentIndex]];
        }
        console.log(this.answers);
        this.cartona=``
        for( let i =0 ; i < this.answers.length ; i++)
        {
            this.cartona +=`
            <div class="form-check">
            <input type="radio" class="form-check-input" name="answer" id=${i}>
            ${this.answers[i]}
        </div>
            `
        }
        document.getElementById("AnsRow").innerHTML = this.cartona;
       
      
    }
    nextQ()
    {

        this.checkA();
        (this.isCorrect) ? 
        $("#correct").fadeIn(500 , ()=>
        {
            $("#correct").fadeOut(500)
        })
        :
        $("#inCorrect").fadeIn(500 , ()=>
        {
            $("#inCorrect").fadeOut(500)
        })


        this.current++;
        if(this.current < this.total)
        {
            this.showQ()

        }
        else{
            this.finish()
        }
    }
    checkA()
    {
        this.userAnswer = document.getElementsByName("answer");
        this.userAnswer = [...this.userAnswer].filter(el => el.checked)[0].value;
        this.correctAnswer = this.questionArray[this.current].correct_answer;
        if(this.userAnswer ==  this.correctAnswer)
        {
            this.score++;
            this.isCorrect=true;

        }
        else
        {
            this.isCorrect=false;
        }
        console.log( this.userAnswer);
    }
    finish()
    {
        $("#quiz").fadeOut(500 , ()=>
        {
            $("#finish").fadeIn(500)
        })
        document.getElementById("score").innerHTML = this.score;
    }
    tyAgain()
    {
        $("#finish").fadeOut(500 , ()=>
        {
            $("#setting").fadeIn(500)
        })
    }
}



