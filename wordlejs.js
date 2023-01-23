dictionary = ["which","there",  "their", "about", 
"would", "these", "world","paper", "given", "vowel", "taken",
"apple", "built", "horse", "heart", "shows", "third", "hours"]




class Wordle{
    constructor(){
        this.word = dictionary[Math.floor(Math.random()*dictionary.length)].toUpperCase();
        this.try = 0;
        this.count = 0;
        this.currentGuess = "";
        this.table = document.getElementById('table');
        this.keyboard = document.getElementById('keyboard');
        this.submit = document.getElementById('submit');
        this.delete = document.getElementById('delete'); 
        this.isPlaying = true;
        this.playAgain = document.getElementById('playAgain'); 



        this.keyboard.addEventListener('click',(ev) => {
            if (this.isPlaying){
                if (!ev.target.id){
                console.log(this.table.children[0].children[this.try].children[0]);
                this.writeLetters(ev.target.innerHTML);
                this.currentGuess += ev.target.innerHTML;
                }
            }
        });

        this.submit.addEventListener('click', (ev) =>{
            if (this.isPlaying){
                this.calculate();
            }
        });

        this.delete.addEventListener('click', (ev) => {
            if (this.isPlaying){
             this.remove();
            }
        });

        this.playAgain.addEventListener('click', (ev) => {
            if (!this.isPlaying){
                this.newGame();
            }
        });



    }
    writeLetters(char){
        if (this.count < 5)
        this.table.children[0].children[this.try].children[this.count].innerHTML = char;
        this.count++;
    }
    calculate(){
        if (this.count >= 5){
            if (this.currentGuess === this.word){
                for (let i =0; i < 5; i++){
                    this.table.children[0].children[this.try].children[i].style.backgroundColor = 'green';
                }
                document.getElementById('gameover').style.display = "block";
                document.getElementById('win').style.display = "block";
                this.isPlaying = false;
            }
            else{
                for (let i =0; i < 5; i++){
                    if (this.table.children[0].children[this.try].children[i].innerHTML === this.word[i]){
                        this.table.children[0].children[this.try].children[i].style.backgroundColor = 'green';
                    }
                    else if (this.word.includes(this.table.children[0].children[this.try].children[i].innerHTML)){
                        this.table.children[0].children[this.try].children[i].style.backgroundColor = 'gold';
                    }
                    else{
                        this.table.children[0].children[this.try].children[i].style.backgroundColor = 'red';
                    
                    }
                }
                if (this.try < 5){
                    this.try+=1;
                    this.count = 0;
                    this.currentGuess = "";
                }
            }

        }
        if (this.try >= 5){
            document.getElementById('gameover').style.display = "block";
            document.getElementById('endgame').style.display = "block";
            document.getElementById('endgame').innerHTML = `You lose! The word was ${this.word}`;
            this.isPlaying = false;
        }
    }
        remove(){
                this.count--;
                this.table.children[0].children[this.try].children[this.count].innerHTML = "";
                this.currentGuess = this.currentGuess.slice(0,-1);
                console.log('test',this.currentGuess);
                
            }
    
            newGame(){
                this.count = 0;
                this.currentGuess = "";
                this.try = 0;
                this.isPlaying = true;
                this.clear();
                document.getElementById('win').style.display = "none";
                document.getElementById('endgame').style.display = "none";
                document.getElementById('gameover').style.display = "none";
                this.word = dictionary[Math.floor(Math.random()*dictionary.length)].toUpperCase();
            }
            clear(){
                for (let i =0; i < 5; i++){
                    for (let j = 0; j < 5; j++){
                        this.table.children[0].children[i].children[j].innerHTML = "";
                        this.table.children[0].children[i].children[j].style.backgroundColor = '#222';
                    }
                }
            }


        }

    


let wordle = new Wordle();
console.log(wordle.word);
