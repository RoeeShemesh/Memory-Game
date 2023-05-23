$(document).ready(function() {
    var pairs = 0;
    var cards = [];
    var flippedCards = [];
    var matches = 0;
    var gameStarted = false;
    var timerInterval;
  
    $('#start-form').submit(function(event) {
      event.preventDefault();
      var name = $('#name').val();
      pairs = parseInt($('#pairs').val());
  
      if (pairs < 1 || pairs > 30) {
        alert('Please enter a valid number of pairs (1-30).');
        return;
      }
  
      $('#player-name').text('Player: ' + name);
      startGame();
    });
  
    function startGame() {
      gameStarted = true;
      $('#start-form').addClass('hidden');
      $('#game-container').removeClass('hidden');
      cards = [];
      flippedCards = [];
      matches = 0;
      clearInterval(timerInterval);
      $('#timer').text('00:00');
      createCards();
      shuffleCards();
      renderCards();
      $('#pause-btn').removeClass('hidden');
      $('#blessing').addClass('hidden');
      $('#rematch-btn').addClass('hidden');
      $('#menu-btn').addClass('hidden');


  
      timerInterval = setInterval(updateTimer, 1000);
    }
  
    function createCards() {
      for (var i = 1; i <= pairs; i++) {
        cards.push({ id: i, flipped: false, matched: false });
        cards.push({ id: i, flipped: false, matched: false });
      }
    }
  
    function shuffleCards() {
      for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
      }
    }
  
    function renderCards() {
      var gameBoard = $('#game-board');
      gameBoard.empty();
      gameBoard.addClass('center');

  
      for (var i = 0; i < cards.length; i++) {
        var card = $('<div class="card bg-md-12"></div>');
        card.data('index', i);
  
        card.click(function() {
          if (!gameStarted) return;
  
          var index = $(this).data('index');
          if (!cards[index].flipped && flippedCards.length < 2) {
            flipCard(index);
          }
        });
  
        gameBoard.append(card);
      }
    }
  
    function flipCard(index) {
      cards[index].flipped = true;
      flippedCards.push(index);
      $('#game-board').find('.card').eq(index).text(cards[index].id);
  
      if (flippedCards.length === 2) {
        var card1 = flippedCards[0];
        var card2 = flippedCards[1];
  
        if (cards[card1].id === cards[card2].id) {
          cards[card1].matched = true;
          cards[card2].matched = true;
          flippedCards = [];
          matches++;
  
          if (matches === pairs) {
            endGame();
          }
        } else {
          setTimeout(function() {
            cards[card1].flipped = false;
            cards[card2].flipped = false;
            $('#game-board').find('.card').eq(card1).text('');
            $('#game-board').find('.card').eq(card2).text('');
            flippedCards = [];
          }, 1000);
        }
      }
    }
  
    function updateTimer() {
      var timer = $('#timer');
      var time = timer.text().split(':');
      var minutes = parseInt(time[0]);
      var seconds = parseInt(time[1]);
  
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }
  
      timer.text(('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2));
    }
  
    function endGame() {
      gameStarted = false;
      clearInterval(timerInterval);
      $('#blessing').removeClass('hidden');
      $('#pause-btn').addClass('hidden');
      $('#rematch-btn').removeClass('hidden');
      $('#menu-btn').removeClass('hidden');
    }
  
    $('#pause-btn').click(function() {
      clearInterval(timerInterval);
      $('#pause-btn').addClass('hidden');
      $('#resume-btn').removeClass('hidden');
      $('#rematch-btn').removeClass('hidden');
      $('#menu-btn').removeClass('hidden');
      $('#game-container').removeClass('hidden');

    });

    $('#resume-btn').click(function() {
      timerInterval = setInterval(updateTimer, 1000);
      $('#resume-btn').addClass('hidden');
      $('#pause-btn').removeClass('hidden');
      $('#rematch-btn').addClass('hidden');
      $('#menu-btn').addClass('hidden');
    });

    $('#rematch-btn').click(function() {
      $('#resume-btn').addClass('hidden');
      startGame();
    });

    $('#menu-btn').click(function() {
      $('#resume-btn').addClass('hidden');
      resetGame();
    });
  
    function resetGame() {
      pairs = 0;
      cards = [];
      flippedCards = [];
      matches = 0;
      gameStarted = false;
      clearInterval(timerInterval);
      $('#player-name').text('');
      $('#timer').text('00:00');
      $('#blessing').addClass('hidden');
      $('#pause-btn').addClass('hidden');
      $('#rematch-btn').addClass('hidden');
      $('#menu-btn').addClass('hidden');
      $('#game-container').addClass('hidden');
      $('#start-form').removeClass('hidden');
    }
  });
  