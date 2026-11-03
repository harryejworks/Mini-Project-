 let currentTopic = 'addition';
        let correctAnswer = 0;
        let score = 0;
 
        const operatorSymbols = {
            addition: '+',
            subtraction: '\u2212',
            multiplication: '\u00D7',
            division: '\u00F7'
        };
 
        function goToTopic(topic) {
            currentTopic = topic;
 
            document.getElementById('hero').classList.add('hidden');
            document.getElementById('topics').classList.add('hidden');
            document.getElementById('practice').classList.add('visible');
 
            document.getElementById('practice-title').textContent = topic;
 
            generateProblem();
        }
 
        function backToTopics() {
            document.getElementById('hero').classList.remove('hidden');
            document.getElementById('topics').classList.remove('hidden');
            document.getElementById('practice').classList.remove('visible');
 
            document.getElementById('feedback').textContent = '';
            document.getElementById('feedback').className = '';
        }
 
        function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
 
        function generateProblem() {
            let a, b, answer;
 
            switch (currentTopic) {
                case 'addition':
                    a = randomInt(1, 20);
                    b = randomInt(1, 20);
                    answer = a + b;
                    break;
 
                case 'subtraction':
                    a = randomInt(1, 20);
                    b = randomInt(1, a); // keep result >= 0 for kids
                    answer = a - b;
                    break;
 
                case 'multiplication':
                    a = randomInt(1, 10);
                    b = randomInt(1, 10);
                    answer = a * b;
                    break;
 
                case 'division':
                    b = randomInt(1, 10);
                    answer = randomInt(1, 10);
                    a = b * answer; 
                    break;
            }
 
            correctAnswer = answer;
 
            document.getElementById('num1').textContent = a;
            document.getElementById('num2').textContent = b;
            document.getElementById('operator').textContent = operatorSymbols[currentTopic];
 
            const input = document.getElementById('answer-input');
            input.value = '';
            input.focus();
 
            const feedback = document.getElementById('feedback');
            feedback.textContent = '';
            feedback.className = '';
        }
 
        function checkAnswer() {
            const input = document.getElementById('answer-input');
            const userAnswer = parseInt(input.value, 10);
            const feedback = document.getElementById('feedback');
 
            if (isNaN(userAnswer)) {
                feedback.textContent = 'Type a number first!';
                feedback.className = 'incorrect';
                return;
            }
 
            if (userAnswer === correctAnswer) {
                feedback.textContent = 'Correct! Great job! \uD83C\uDF89';
                feedback.className = 'correct';
                score++;
                document.getElementById('score-value').textContent = score;
                setTimeout(generateProblem, 1000); // next question after a short pause
            } else {
                feedback.textContent = 'Not quite, try again!';
                feedback.className = 'incorrect';
            }
        }
 
        // allow pressing Enter to check the answer
        document.getElementById('answer-input').addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });