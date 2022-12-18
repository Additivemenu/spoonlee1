```js
let star = {
    name: 'pink',
    age: 18,
    gender: 'male',
    sayHi: function(){
        alert('hi');
    }
}
```

# 对象的调用
## 对象属性的调用 
```js
console.log(star.name);

console.log(star['name']);
```

## 对象方法的调用

```js
console.log(star.sayHi());
```


# object destructing
#  Object Destructuring
Suppose you have a `person` object with two properties: `firstName` and `lastName`.
```js
const person = { firstName: 'John', lastName: 'Doe' };
```
when you want to assign properties of the `person` object to variables, you typically do it like this:
```js
const firstName = person.firstName; 
const lastName = person.lastName;
```
in ES6
```js
const {firstName, lastName} = person

// rename variable from destructure
```
## Destructuring a null object
```js
function getPerson() { return null; }

const { firstName, lastName } = getPerson() || {};
```
## Nested object destructuring
```js
const employee = { 
	id: 1001, 
	name: { 
		firstName: 'John', 
		lastName: 'Doe' 
	} 
};

const {id, name} = employee;
```
## Destructuring function arguments
```js
function display(person) {
	console.log(person.firstName + ' ' + person.lastName);
}

function addAgeAttributeToPerson(age, person) {
	return {
		firstName: person.firstName,
		lastName: person.lastName,
		age: age
	}
}
```