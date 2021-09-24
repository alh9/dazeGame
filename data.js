//functions must be short and just do onething
//prevent over-configurability
//do something specific about else position
//add good comments 
//use git to save the changes
var container = document.getElementById('transparentContainer');
var instuctions = document.getElementById('instruction');
var startBtn = document.getElementById('startButton');
var refreshBtn = document.getElementById('refreshButton');
var timeBox = document.getElementById('time');
var lastScore = document.getElementById('lastScore');
var looseWinBox = document.getElementById('looseOrWin');
var looseWinText = document.getElementById('LOWtxt');
var scoreBox = document.getElementById('score');
var backgroundColorOfQuestion = document.getElementById('textColor');
var textOfQuestion =document.getElementById('question');
var counter = document.getElementById('counter')
var options =document.getElementsByClassName('options')
var luckyBillboard = document.getElementById('billboard');
var result = document.getElementById('resultNav')
var answers = document.getElementById('answerContainer')
var errorBillboard = document.getElementById('error')
var intvl = null;
var intvl2 = null;
var colors = [{name:'red',id:'rgb(222, 34, 33)'},{name:'blue',id:'rgb(56, 69, 199)'},{name:'yellow',id:'rgb(228, 228, 38)'},{name:'green',id:'rgb(55, 225, 30)'},
{name:'orange',id:'rgb(230, 140, 25)'},{name:'purple',id:'rgb(131, 16, 104)'},{name:'pink',id:'rgb(234, 79, 197)'},{name:'white',id:'rgb(255, 255, 255)'},
{name:'black',id:'rgb(0, 0, 0)'},{name:'brown',id:'rgb(153, 107, 6)'}]
var textOfTextColor='red';// in esme chert chie?:)))
var levelTime=[{level:1,time:7},{level:2,time:6},{level:3,time:5},{level:4,time:4},{level:5,time:3}];
var decrease=0;
var score=0;
let randomBox=[];
var LOrW;
var b;
var timeAward;
var add;
var level = 0;
var add;
var time=[7,6,5,4,3,2];
var checkEnd=false;
var whatTime;

window.addEventListener('load',function(){
  if(this.innerWidth<770){
    container.style.display='none'
    counter.style.display='none'
    instuctions.style.display='none'
    result.style.display='none'
    backgroundColorOfQuestion.style.display='none'
    answers.style.display='none'
    looseWinBox.style.display='none'
    errorBillboard.style.display='block'
  }
  else{
    startBtn.addEventListener('click' , start)
    refreshBtn.addEventListener('click',refresh)
    document.addEventListener('keyup',startWithEnter)
  }
})
function startWithEnter(event){
  console.log(event)
  if (event.keyCode === 13) {
    event.preventDefault();
    startBtn.click();
    document.removeEventListener('keyup',startWithEnter)
    startBtn.removeEventListener('click' , start)
  }
}
function start(){
  counter.innerHTML=''
  refreshBtn.removeEventListener('click',refresh)
  startBtn.removeEventListener('click' , start)
  b=0;
  instuctions.style.display = 'none'
  counter.style.display = 'block'
  intvl=setInterval(countDown,1000)
}
function countDown(){
  b++;
  if(b>4){
    clearInterval(intvl)
    container.style.display='none'
    counter.style.display='none'
    gameGoesOn()
  } else {
      if(b<4){
        counter.innerHTML=b;
      } else{
        counter.innerHTML='GO!';
      }
  }
}
function gameGoesOn(){
  textOfTextColor=newLevel()
  decrease = 0;
  time=[7,6,5,4,3,2];
  intvl2 = setInterval(timeDecrease,1000)
}
function isItCorrect(event){
  if(event.key === 'Shift'){
    event.preventDefault();
    document.removeEventListener('keydown',isItCorrect)
      if(event.code ==='ShiftLeft' && textOfTextColor.children[0].innerHTML=='left'){
        var x = timeDecrease(true,true,true)
        var timeAw = time[x];
        if(x==5){
         score = scoreHandlerer(true,score,0) 
         document.removeEventListener('keydown',isItCorrect)
         timeBox.innerHTML=''
         clearInterval(intvl2)
         checkLooseWin(score)
         lastScore.innerHTML=score
         score=0;
         scoreHandlerer(0,0,0)
        } 
        else{
          timeDecrease(true,true,false)
          score = scoreHandlerer(true,score,timeAw) 
          document.removeEventListener('keydown',isItCorrect)
          textOfTextColor=newLevel()  
        }  
      }  
      else if(event.code === 'ShiftRight' && textOfTextColor.children[0].innerHTML=='right'){
        var x = timeDecrease(true,true,true)
        var timeAw = time[x];
        if(x==5){
         score = scoreHandlerer(true,score,0) 
         document.removeEventListener('keydown',isItCorrect)
         timeBox.innerHTML=''
         clearInterval(intvl2)
         checkLooseWin(score)
         lastScore.innerHTML=score
         score=0;
         scoreHandlerer(0,0,0)
        } 
        else{
          timeDecrease(true,true,false)
          score = scoreHandlerer(true,score,timeAw)
          document.removeEventListener('keydown',isItCorrect)
          textOfTextColor=newLevel()
        }
      } 
      else {
        score=scoreHandlerer(false,score,0)
        var x = timeDecrease(true,true,true)
        var timeAw = time[x];
        //score=scoreHandlerer(false,score,0)
        if(x==5){
         document.removeEventListener('keydown',isItCorrect)
         timeBox.innerHTML=''
         clearInterval(intvl2)
         checkLooseWin(score)
         lastScore.innerHTML=score
         score=0;
         scoreHandlerer(0,0,0)
        } 
        else{
          document.removeEventListener('keydown',isItCorrect)
          textOfTextColor=newLevel()
          timeDecrease(true,true,false)    
        }
      }
  }
}
function timeDecrease(goUp,checkEnd,whatTime){
  if(!whatTime){
    if(decrease==5&&time[decrease]==-1){
      clearInterval(intvl2)
      checkend();
    }  
    if(goUp&&decrease<5){
      decrease++
    }
    timeBox.innerHTML=time[decrease]
    time[decrease]--
    if(time[decrease]<-1&&decrease!=5){
      decrease++;
      timeBox.innerHTML=''
    } 
    else{
        timeBox.style.color='black'
    }
     
    if(time[decrease]==-1&&decrease!=5){
      timeBox.style.color='red'
      score=scoreHandlerer(false,score,0)
      textOfTextColor=newLevel() 
    }
    if(time[decrease]==0&&decrease===5&&checkEnd){
      document.removeEventListener('keydown',isItCorrect)
      timeBox.innerHTML=''
      clearInterval(intvl2)
      score=scoreHandlerer(false,score,0)
      checkLooseWin(score)
      lastScore.innerHTML=score
      score=0;
      scoreHandlerer(0,0,0)
      document.removeEventListener('keydown',isItCorrect)
    }
    if(time[decrease]==-1&&decrease==5&&checkEnd){
      document.removeEventListener('keydown',isItCorrect)
      timeBox.innerHTML=''
      clearInterval(intvl2)
      score=scoreHandlerer(false,score,0)
      checkLooseWin(score)
      lastScore.innerHTML=score
      score=0;
      scoreHandlerer(0,0,0)
      document.removeEventListener('keydown',isItCorrect)
    }
      if(time[decrease]<-1&&decrease==5){
      timeBox.innerHTML=''
    }  
  }
  if(whatTime){
    return decrease  
  } 
}
function checkend(){
  document.removeEventListener('keydown',isItCorrect)
  clearInterval(intvl2)
  score=scoreHandlerer(false,score,0)
  checkLooseWin(score)
  lastScore.innerHTML=score;
  score=0;
  scoreHandlerer(0,0,0)
  timeBox.innerHTML=''
  document.removeEventListener('keydown',isItCorrect)
}
function checkLooseWin(score){
  document.removeEventListener('keydown',isItCorrect)
  container.style.display='block'
  looseWinBox.style.display='block'
  if(score>6){
    looseWinText.innerHTML ='it was too damn close!'
  } 
  if(score<=6){
    looseWinText.innerHTML ='you have to try more dude!'
  }
  if(score>=10){
    looseWinText.innerHTML ='finally you win a game in your life!'
  }
  refreshBtn.addEventListener('click',refresh)
}
function randomNum(max , min){
  let random = Math.floor((Math.random() * max) + min);
  random = Number(random)
  if(!randomBox.includes(random)){
    randomBox.push(random)
    randomNum(max,min)
  } else{
      if(randomBox.length<max){
        randomNum(max,min);
      } else{
          return false
      }
  }
  return randomBox
}
function scoreHandlerer(add,score,timeAward){
  document.removeEventListener('keydown',isItCorrect)
  if(add!==0){
    if(!add){
       score-=2;       
    }
    else if(add){
       score+=1           
    }  
  }  
  if(timeAward!=0){
    if(timeAward%3==0){
    var mustAdd = timeAward/3;
     score=score+mustAdd      
    } else{
       score=score+(timeAward-timeAward%3)/3
    }
  }      
  scoreBox.innerHTML=score
  return score
}
function newLevel(){
  level++
  var randomNumbers = randomNum(10,0);
  randomBox = [];
  var randomNumbers2 = randomNum(5,1);
  var randomNumbers3 =[];
  backgroundColorOfQuestion.style.backgroundColor = colors[randomNumbers[0]].id//for back of txt 
  textOfQuestion.innerHTML=colors[randomNumbers[1]].name//for text itself
  options[randomNumbers2[0]-1].style.backgroundColor = colors[randomNumbers[1]].id;
  document.addEventListener('keydown',isItCorrect)
  for(i=0;i<options.length;i++){
    document.getElementById('option'+randomNumbers2[i]).innerHTML=''
  }
  for(i=0;i<options.length;i++){
    var direction = document.createElement('p');
    if(i!=randomNumbers2[0]-1){
      options[i].style.backgroundColor = colors[randomNumbers[i+2]].id  
    }
    randomNumbers3.push(Math.floor((Math.random() * 2) + 0))
    if(randomNumbers3[i]==0){
      direction.innerHTML = 'left'
      document.getElementById('option'+randomNumbers2[i]).appendChild(direction)  
    }else{
        direction.innerHTML = 'right'
        document.getElementById('option'+randomNumbers2[i]).appendChild(direction)  
    }
  }
  if(!randomNumbers3.includes(0)||!randomNumbers3.includes(1)&&randomNumbers3.length!=0){
    luckyBillboard.style.display='block'
    // score = scoreHandlerer(true,score,0)
    // newLevel()
    // timeDecrease(true,true,false)///////////////////////
    
    document.addEventListener('keydown',isItCorrect)
  }
  return options[randomNumbers2[0]-1] 
}
function refresh(){
  var intvl = null;
  var intvl2 = null;
  var textOfTextColor='red';
  var decrease=0;
  var score=0;
  let randomBox=[];
  var LOrW;
  var b;
  var timeAward;
  var add;
  var level = 0;
  textOfQuestion.innerHTML=''
  backgroundColorOfQuestion.style.backgroundColor='white'
  for(j=1;j<options.length+1;j++){
    options[j-1].style.backgroundColor='white'
    document.getElementById("option"+j).innerHTML='';
  }
  scoreBox.innerHTML = 0
  timeBox.innerHTML=''
  looseWinBox.style.display='none'
  scoreHandlerer(0,0,0)
  refreshBtn.removeEventListener('click',refresh)
  startBtn.removeEventListener('click' , start)
  document.removeEventListener('keydown',isItCorrect)
  start()
}









