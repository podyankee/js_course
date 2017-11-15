//BUDGET CONTROLLER

var budgetController = (function () {
    /* var x = 23;
    var add = function (a) {
        return x + a;
    }
    return {
        publicTest: function (b) {
            return add(b);
        }
    } */
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;  
    };
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;  
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum +=  cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        persentage: -1
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            // Create the new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            // Create the new element based on 'inc', or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
               newItem = new Income(ID, des, val);
            }
            // Push it into a data structure
            data.allItems[type].push(newItem);
            // Return the new element
            return newItem;
        },
        deleteItem: function (type, id) {
            var ids, index;
            ids = data.allItems[type].map(function (current) {
                return current.id;
            });
            index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function () {
            //calculate total income and expences
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget: income - expences
            data.budget = data.totals.inc - data.totals.exp;
            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.persentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.persentage = -1;
            }
            
        },
        getBudget: function name(params) {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.persentage
            };
        },
        testing: function() {
            console.log(data);
        }
    };

})(); 

// UI CONTROLLER

var UIController = (function() {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentagesLabel: '.budget__expenses--percentage',
        container:        '.container'
    };
    return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //Will be inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
             
        },
        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
        if (type === 'inc') {
            element = DOMstrings.incomeContainer;
            html = '<div class="item clearfix" id="inc-%id%" > <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                
        } else if (type === 'exp'){
            element = DOMstrings.expensesContainer;
            html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
           
            // Replace the placeholder text with the actual data
        newHtml = html.replace('%id%', obj.id);   
        newHtml = newHtml.replace('%description%', obj.description);   
        newHtml = newHtml.replace('%value%', obj.value);   
            // Insert the HTML in to the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function (selectorID) {
            var el = document.getElementById(selectorID);
           el.parentNode.removeChild(el);
        }, 

        clearFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
             fieldsArr[0].focus();
        },
        displayBudget: function (obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            if (obj.percentage >0) {
                document.querySelector(DOMstrings.percentagesLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentagesLabel).textContent = '---';
            }
            
        },
        getDomstrings: function() {
            return DOMstrings;
        }
    };
})();

// GLOBAL APP CONTROLLER

var controller = (function (budgetCtrl, UICtrl) {
   /*var z = budgetCtrl.publicTest(5);
   return {
       anotherPublic: function () {
           console.log(z);
       }
   } */
   var setupEventListeners = function() {
    var DOM = UICtrl.getDomstrings();
     document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

     document.addEventListener('keypress', function (event) {
         if (event.keyCode === 13 || event.which === 13) {
             ctrlAddItem();
         }

     });
     document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
   };

   var updateBudget = function () {
       // 1. Calculate the budget
       budgetCtrl.calculateBudget();
       // 2. Return the budget
       var budget = budgetCtrl.getBudget();
       // 3. Display the budget on the UI
       UICtrl.displayBudget(budget);
   };
   
   var ctrlAddItem = function(){
       var input, newItem;
       // 1. Get the field input data
       input = UICtrl.getinput();
       if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            // 4. Clear the fields
            UICtrl.clearFields();
            // 5. Calculate and update budget
            updateBudget();
       }
       
   };

   var ctrlDeleteItem = function () {
       var itemID, splitID, type, ID;
       itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
       if(itemID) {
        //inc-1
        splitID = itemID.split('-');
        type = splitID[0];
        ID = parseInt(splitID[1]);
        // 1. delete the item from the data structure
        budgetCtrl.deleteItem(type, ID);
        // 2. delete the item from the UI
        UICtrl.deleteListItem(itemID);
        // 3. update and show the new budget
        updateBudget();
       }
   };

   return {
       init: function() {
           console.log('Started.');
           UICtrl.displayBudget({
               budget: 0,
               totalInc: 0,
               totalExp: 0,
               percentage: -1
           });
           setupEventListeners();
       }
   };

   
})(budgetController, UIController);

controller.init();