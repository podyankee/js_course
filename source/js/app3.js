// Function constructor

/* var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
}; 

var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = function () {
    console.log(2017 - this.yearOfBirth);
};

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge(); */

// Object.create

/* var personProto = {
    calculateAge: function () {
        console.log(2017 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, 
{
    name: {value: 'Jane'},
    yearOfBirth: {value: 1969},
    job: {value: 'designer'}
    });

jane.calculateAge(); 


// Primitives vs objects

var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b) {
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);
console.log(age);
console.log(obj.city); 

//Passing functions as arguments

var years = [1990, 1969, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2017 - el;
}
function isFullAge(el) {
    return el >= 18;
}
function maxHeartRate(el) {
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    }
    else {
        return -1;
    }
}
var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);
console.log(ages);
console.log(fullAges);
console.log(rates); 

// Functions returning functions

function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ' , can you please explain what UX design is ?');
        }
    }
    else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    }
    else {
        return function (name) {
            console.log('Hello ' + name + ', what do you do ?');
            
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

teacherQuestion('John');
designerQuestion('Hannah');
interviewQuestion('')('Mark'); */

// IIFE

/*
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}

game(); 

(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

//console.log(score);

(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5); 

// Closures

function retirement(retirementAge) {
    var a = ' years left until retierment.';
    return function (yearOfBirth) {
        var age = 2017 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);

// retirement(66)(1968);

var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementUS(1968);
retirementGermany(1968);
retirementIceland(1968); 

function interviewQuestion(job) {
    return function (name) {
        if (job === 'designer') {
                console.log(name + ' , can you please explain what UX design is ?');
        } else if (job === 'teacher') {
                console.log('What subject do you teach, ' + name + '?');
    
        } else {
                console.log('Hello ' + name + ', what do you do ?');

    }
    
    }
}

interviewQuestion('designer')('John'); 

// Bind, call and apply

var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function (style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and gentelmen! I\'m ' +
        this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age +' years old.');
        } else if (
            style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' +
                this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age 
                + ' years old . Have a nice ' + timeOfDay + ".");
            }
    }
}

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('formal', 'morning');
john.presentation.call(emily,'friendly', 'evening');
//john.presentation.apply(emily,['friendly', 'evening']);

var johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('morning');



var years = [1990, 1969, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2017 - el;
}
function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan); 

// Question quiz

(function () {
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function () {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function (ans) {
        if (ans === this.correct) {
            console.log('Correct answer !');
        } else {
            console.log('Wrongt answer. Try again :)')
        }
    }

    var q1 = new Question('Is Javascript the coolest programming language in the world ?',
        ['Yes', 'No'], 0);
    var q2 = new Question('What is the name of this course\'s teacher?',
        ['John', 'Micheal', 'Jonas'], 2);
    var q3 = new Question('What does best describe coding?',
        ['Boring', 'Hard', 'Fun', 'Tediuos'], 2);

    var questions = [q1, q2, q3];

    var n = Math.floor(Math.random() * questions.length);

    questions[n].displayQuestion();

    var answer = parseInt(prompt('Please select the correct answer.'));
    questions[n].checkAnswer(answer);
})(); */


(function () {
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function () {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function (ans, callback) {
        var sc; 
        if (ans === this.correct) {
            console.log('Correct answer !');
            sc = callback(true);
        } else {
            console.log('Wrongt answer. Try again :)');
            sc = callback(false);
        }
        this.displayScore(sc);
    }

    Question.prototype.displayScore = 
    function (score) {
        console.log('Your current score is: ' + score);
        console.log('______________________________________');
    }

    var q1 = new Question('Is Javascript the coolest programming language in the world ?',
        ['Yes', 'No'], 0);
    var q2 = new Question('What is the name of this course\'s teacher?',
        ['John', 'Micheal', 'Jonas'], 2);
    var q3 = new Question('What does best describe coding?',
        ['Boring', 'Hard', 'Fun', 'Tediuos'], 2);

    var questions = [q1, q2, q3];

    function score() {
        var sc = 0;
        return function (correct) {
            if (correct) {
                sc++;
            }
            return sc;
        }
    }

    var keepScore = score();

    function nextQuestion() {
        
        var n = Math.floor(Math.random() * questions.length);

        questions[n].displayQuestion();

        var answer = prompt('Please select the correct answer.');
        if (answer !== 'exit') {
            questions[n].checkAnswer(parseInt(answer), keepScore);
            nextQuestion();
        }
    }
    nextQuestion();
})();
