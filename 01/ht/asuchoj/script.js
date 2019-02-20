/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Функция вывода строк для работы в fizzBuzz
 * @param {*} a
 */
function log(a) {
  console.log(a);
}

/* Раместите ваш код ниже */

/**
 * реализовать фукнцию `fizzBuzz`
 * которая выводит числа от 1 до 100.
 * Если число кратно 3 - вместо числа вывести `Fizz`.
 * Если кратно 5 - вывести вместо числа `Buzz`.
 * Если число кратно и 3 и 5 - вывести вместо числа `FizzBuzz`.
 * Для вывода использовать фукнцию `log` (аналогично заданию в классе).
 * В теле функции нельзя использовать  `if`, `switch`, тернарный оператор `? :`
 *
 * @param{number} num - число от 1 до 100
 */
function fizzBuzz(num) {
  /* Ваше решение */
  var meseges = ['fizzBuzz', 'Fizz', 'Buzz', 'Default'];
  var config = [num % 5 && num % 3, num % 3, num % 5, 'Default'];
  var resCount = [];

  for(var i = 0; i < config.length; i++) {
    resCount.push(config[i])
  }
}


/**
 * реализовать фукнцию  `isPolindrom`,
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {
  /* Ваше решение */

  /* Решение 1 */

  // return textString.split('').reverse().join('') === textString;

  /* Решение 2 */
  for(var i = 0; i < Math.floor(textString.length / 2); i++ ){
    if(textString[i] !== textString[textString.length - 1 - i]) return false;
  }
  return true;
}

/**
 * Реализовать фукнцию `drawCalendar` ,
 * которая принимает три аргумента - год, месяц, htmlElement
 * и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).
 * @param {number} year
 * @param {number} month - номер месяца, начиная с 1
 * @param {external:HTMLElement} htmlEl
 */
function drawCalendar(year, month, htmlEl) {
  /* Ваше решение */
}


/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA
 * @param {*} objB
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual(objA, objB) {
  if(JSON.stringify(objA) === JSON.stringify(objB)) return true;

  if(Object.prototype.toString.call(objA) === "[object Object]" && Object.prototype.toString.call(objB) === "[object Object]"){
    for(let itemA in objA){
      for(let itemB in objB){
        if(JSON.stringify(objA[itemA]) !== JSON.stringify(objB[itemA]) || JSON.stringify(objA[itemB]) !== JSON.stringify(objB[itemB])) return false;
      }
    }

    return true;
  }

  return false;
}
