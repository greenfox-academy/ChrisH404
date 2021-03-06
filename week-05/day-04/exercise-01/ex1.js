'use strict';

// Define a Person class
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Define an Employee class which extends the Person
function Employee(name, age, salary, department, hiredAt) {
  Person.call(this, name, age);
  this.salary = salary;
  this.department = department ? department : 'unknown';
  this.hiredAt = hiredAt ? hiredAt : new Date();
  this.leftAt = null;
  this.status = 'active';
  this.maxSalaryMultiplier = 1;
  this.getInfo = function() {
    let result = this.name + " (" + this.age + ") works at " + this.department + " for " + this.salary + " usd ";
    if (this.leftAt) {
      return result + "from " + this.hiredAt + " to " + this.leftAt;
    }else {
      return result + "since " + this.hiredAt;
    }
  };
  this.quit = function(isFired) {
    if (this.status !== "active") {
      throw new Error("This employee has already left!");
    }
    this.leftAt = new Date();
    this.status = isFired ? "fired" : "quit";
    return true;
  };
  this.increaseSalaryBy = function(newSalary) {
    if (newSalary > this.salary * this.maxSalaryMultiplier) {
      throw new Error("Not allowed to increase this amount!");
    }
    this.salary = newSalary;
    return this.salary;
  };
  this.setDepartment = function(newDepartment) {
    this.department = newDepartment;
  }
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// Define a Developer class which extends the Employee
function Developer(name, age, salary, department, hiredAt, level) {
  Employee.call(this, name, age, salary, department, hiredAt);
  this.maxSalaryMultiplier = 1.05;
  this.level = level;
  this.changeLevel = function(newLevel) {
    this.level = newLevel;
  }
}

Developer.prototype = Object.create(Employee.prototype);
//Developer.prototype = Object.create(new Person());
//Developer.prototype = new Employee();
Developer.prototype.constructor = Developer;

// Define a Director class which extends the Employee
function Director(name, age, salary, department, hiredAt, level) {
  Developer.call(this, name, age, salary, department, hiredAt, level);
  this.maxSalaryMultiplier = 1.1;
  this.fireEmployee = function(employeToFire) {
    if (!(employeToFire instanceof Employee)) {
      throw new Error("You can't fire a non-employee!");
    }
    employeToFire.quit(true);
  };
  this.promoteDeveloper = function(developerToPromote, newLevel) {
    if (!(developerToPromote instanceof Developer)) {
      throw new Error("You can't promote a non-developer!");
    }
    if (newLevel === developerToPromote.level) {
      return false;
    }else {
      developerToPromote.changeLevel(newLevel);
      return true;
    }
  }
}

Director.prototype = Object.create(Developer.prototype);
//Director.prototype = new Developer;
//Director.prototype = new Developer();
Director.prototype.constructor = Director;

var chris = new Director('chris', 24, 100, 'dev', '2017.7.14', 1);
console.log(chris);
console.log(chris instanceof Person);
console.log(chris instanceof Director);
console.log(Object.getPrototypeOf(chris));