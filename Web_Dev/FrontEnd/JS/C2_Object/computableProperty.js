// 采用变量作为属性名
const nameKey = 'name';
const ageKey = 'age';
const jobKey = 'job';

let person = {
    [nameKey]: 'Matt',
    [ageKey]: 27,
    [jobKey]: 'Software engineer'
};

console.log(person);        // { name: 'Matt', age: 27, job: 'Software engineer' }

// e.g.2 -------------------------------------------------
let uniqueToken = 0;
function getUniqueKey(key){
    return `${key}_${uniqueToken++}`;
}

let person2 = {
    [getUniqueKey(nameKey)]: 'Matt',
    [getUniqueKey(ageKey)]: 27,
    [getUniqueKey(jobKey)]: 'Software Engineer'
};

console.log(person2);   //{ name_0: 'Matt', age_1: 27, job_2: 'Software Engineer' }