var maxCount = 99999;

function firstMethod() {
    function createPerson(first, last, born) {
        var person = { firstName:   first,
                       lastName:    last,
                       yearOfBirth: born };
        return person;
    }

    function computeAge(p, currentYear) {
        return currentYear - p.yearOfBirth;
    }

    function setLastName(p, newLastName) {
        p.lastName = newLastName;
    }

    for (var i = 0; i < maxCount; i++) {
        createPerson("Anne", "Hathaway", 1982);
    }
}

function secondMethod() {
    function createPerson(first, last, born) {
        var computeAgeMethod = function(p, currentYear) {
            return currentYear - p.yearOfBirth;
        }

        var setLastNameMethod = function(p, newLastName) {
            p.lastName = newLastName;
        }

        var person = { firstName:   first,
                       lastName:    last,
                       yearOfBirth: born,

                       computeAge:  computeAgeMethod,
                       setLastName: setLastNameMethod
                };
        return person;
    }

    for (var i = 0; i < maxCount; i++) {
        createPerson("Anne", "Hathaway", 1982);
    }
}

function thirdMethod() {
    function createPerson(first, last, born) {
        var computeAgeMethod = function(currentYear) {
            return currentYear - this.yearOfBirth;
        }

        var setLastNameMethod = function(newLastName) {
            this.lastName = newLastName;
        }

        var person = { firstName:   first,
                       lastName:    last,
                       yearOfBirth: born,

                       computeAge:  computeAgeMethod,
                       setLastName: setLastNameMethod
                };
        return person;
    }

    for (var i = 0; i < maxCount; i++) {
        createPerson("Anne", "Hathaway", 1982);
    }
}

function fourthMethod() {
    function createPerson(first, last, born) {
        var person = { firstName:   first,
                       lastName:    last,
                       yearOfBirth: born };
        person.__proto__ = personPrototype;
        return person;
    }

    var personPrototype = {
        "computeAge":   function(currentYear) {
                            return currentYear - this.yearOfBirth;
                        }, // обратите внимание на запятую

        "setLastName":  function(newLastName) {
                            this.lastName = newLastName;
                        }
    }

    for (var i = 0; i < maxCount; i++) {
        createPerson("Anne", "Hathaway", 1982);
    }
}

function fifthMethod() {
    function createPerson(first, last, born) {
        this.firstName   = first;
        this.lastName    = last;
        this.yearOfBirth = born;
    }

    createPerson.prototype = {
        "computeAge":   function(currentYear) {
                            return currentYear - this.yearOfBirth;
                        }, // обратите внимание на запятую

        "setLastName":  function(newLastName) {
                            this.lastName = newLastName;
                        }
    }

    for (var i = 0; i < maxCount; i++) {
        new createPerson("Anne", "Hathaway", 1982);
    }
}

var methodsArr = [firstMethod, secondMethod, thirdMethod, fourthMethod, fifthMethod];
for (methodIndex = 0; methodIndex < methodsArr.length; methodIndex++) {
    console.log("Start method: " + methodsArr[methodIndex].name);
    console.time();
    var startDate = Date.now();

    methodsArr[methodIndex]();

    var endDate = Date.now();
    var workTime = endDate - startDate;
    console.log("Work time: " + startDate + " - " + endDate + ": " + workTime);
    console.timeEnd();
    console.log("End method.");
}