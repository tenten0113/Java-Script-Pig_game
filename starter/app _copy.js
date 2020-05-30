/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/



//
var scores, roundScore,activePlayer,gamePlaying,lastDice;
init();




//Roll（プレイ）ボタンをクリックしたときの処理を実装
document.querySelector('.btn-roll').addEventListener('click',() => {
  if(gamePlaying){
      // 1. Random number
      var dice = Math.floor(Math.random()* 6) + 1;
      var diceSecond = Math.floor(Math.random()* 6) + 1;
      var diceTotal;
    
      //2.Display the result
      var diceDOM = document.querySelector('#dice-1');
      var diceSecondDOM = document.querySelector('#second');
      diceDOM.style.display = 'block';
      diceSecondDOM.style.display = 'block';

      diceDOM.src = 'dice-' + dice +'.png';
      diceSecondDOM.src = 'dice-' + diceSecond +'.png';

      // var diceTOTAL = dice + diceSecond;
      
      
      //3.Update the round score IF the rolled number was NOT a 1
      if(dice === 6 && lastDice === 6){
        //Player looses score
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = 0;
        nextPlayer();
      }else if(dice !== 1 && diceSecond !== 1){
        //Add score
        diceTotal = dice + diceSecond;
        roundScore += diceTotal;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;        
    }else{
      //Next player
      nextPlayer();
    }
    lastDice = dice;
  }
});

//次のプレイヤーに渡す処理を関数にまとめる
function nextPlayer () {
  activePlayer === 0 ? activePlayer = 1: activePlayer =0;
  roundScore = 0 ;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#second').style.display = 'none';
}


//holdをクリックしたときの処理
document.querySelector('.btn-hold').addEventListener('click',() =>{
  if(gamePlaying){
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    
    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    var input = document.querySelector('.final-score').value;
    var winningScore;
    // console.log(input);

    // undefined,0,null or "" are COERCED to false
    // Anything else is COERCED to true

    if(input){
      winningScore = input;
    } else {
      winningScore = 100;
    }




    // Check if player won the game
    if(scores[activePlayer] >= winningScore){
      gamePlaying = false;
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('#dice-1').style.display = 'none';
      document.querySelector('#second').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  
    } else {
      //next player
      nextPlayer();
    }
  }
});
//new gameを押したときにも初期化する
document.querySelector('.btn-new').addEventListener('click',init);

function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  previousScore = 0;

  //スコアはサイコロの目を初期化する
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#second').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice  + '</em>';
// var x = document.querySelector('#score-0').textContent;
