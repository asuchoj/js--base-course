


function ShowCalender (id, year, month, a, b, c, d,) {
    var calender = CreateElement ( id, 'div', 'calendar', 'calendar' );
    var rowInformation = CreateElement ( id, 'div', 'rowinformation', 'rowinformation' );

    var butPrev = CreateElement ( id, 'button', 'prev__button', 'prev_button' );
    var butnext = CreateElement ( id, 'button', 'next__button', 'next_button' );

    createCalendar("calendar", year, month);

    if ( !d ){
        document.querySelector('h2').style.display = 'none';
    }

    if ( !a ){
        butPrev.style.display = 'none';
        butnext.style.display = 'none';
    }

    butPrev.innerHTML = '<';
    butnext.innerHTML = '>';

    butPrev.addEventListener('click', function() {
        createCalendar("calendar", year, --month);
      if ( !d ){
        document.querySelector('h2').style.display = 'none';
      }
    });

    butnext.addEventListener('click', function() {

        createCalendar("calendar", year, ++month);
      if ( !d ){
        document.querySelector('h2').style.display = 'none';
      }
    });

    calender.addEventListener('click', addNewDescriptionDate, false);
    rowInformation.addEventListener('click', deleteDescription, false);

    /*создание календаря*/

    function createCalendar(id, year, month, d) {
        let daysOfLastMonth = '', daysOfThisMonth = '', daysNextMonth = '';
        let elem = document.getElementById(id);
        let dataInCalenderNow = new Date(year, month);
        const THISMONTH = dataInCalenderNow.getMonth();



        /*шапка календаря*/
        let calenderHead = '<thead><tr><td></td><td colspan="5"><h2>' + addNameMonth(THISMONTH) + ' ' + dataInCalenderNow.getFullYear() + '</h2></td><td></td></tr></thead>';


        /*тело календаря*/
        let nameDays = '<tbody><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th>' +
            '<th>вс</th></tr><tr>';

        // заполнить первый ряд от понедельника и до дня, с которого начинается месяц * * * | 1  2  3  4
        for (let i = 0; i < getNumDay(dataInCalenderNow); i++) {
            daysOfLastMonth += '<td></td>';
        }

        // ячейки календаря с датами
        while (dataInCalenderNow.getMonth() === THISMONTH) {
            daysOfThisMonth += '<td>' + dataInCalenderNow.getDate() + '</td>';
            if (getNumDay(dataInCalenderNow) % 7 === 6) { // вс, последний день - перевод строки
                daysOfThisMonth += '</tr><tr>';
            }
            dataInCalenderNow.setDate(dataInCalenderNow.getDate() + 1);
        }

        // добить таблицу пустыми ячейками, если нужно
        if (getNumDay(dataInCalenderNow) !== 0) {
            for (let i = getNumDay(dataInCalenderNow); i < 7; i++) {
                daysNextMonth += '<td></td>';
            }
        }
        //собираем таблицу
        elem.innerHTML = '<table>' + calenderHead + nameDays + daysOfLastMonth + daysOfThisMonth + daysNextMonth + '</tr></tbody></table>';



        let allTd = document.querySelectorAll('td');
        addClassTd ( allTd, 'days_Of_Last_Month', 'days_Of_This_Month', 'days_name' );
        rowInformation.innerHTML = localStorage.getItem('noteList') || null;
    }

    /*функция получения номера дня недели от 0(пн) до 6(вс)*/
    /* по стандарту 0(вс) до 6(сб)*/
    function getNumDay(date) {
        let day = date.getDay();
        if (day === 0) {
            day = 7; //если вс = 0 - по стандарту, приравниваем к 7, возвращаем =6!
        }
        return day - 1; // если пн = 1 - по стандарту, становиться 0 по функции
    }

    /*функция добавления классов в ячейки*/
    function addClassTd(arrTD, className1, className2, className3, ) {
        arrTD.forEach(function(a) {
            if (a.innerHTML.valueOf() > 0 && a.innerHTML.valueOf() < 32) {
                a.className = className2
            } else if (isNaN(a.innerHTML.valueOf())) {
                a.className = className3
            } else {
                a.className = className1
            }
        })
    }

    /*функция получения названия месяца*/
    function addNameMonth(month) {

        let nameMonth = '';
        let arrNameMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        arrNameMonth.forEach(function(item, i) {
            if (month === i) {
                nameMonth += item;
            }
        });
        return nameMonth;
    }

    /*конструктор элементов помещаемых на страницу*/
    function CreateElement (id, nameElem, classNameEl, idNameEl) {
        var element = document.createElement(nameElem);
        element.className = classNameEl;
        element.id = idNameEl;
        return document.querySelector(id).appendChild(element);
    }

    // добавить коментарий
    function addNewDescriptionDate() {

        if(!b) return;

        let daysOfThisMonth = document.querySelectorAll('.days_Of_This_Month');
        let nameMonth = document.querySelector('.calendar table h2');
        let target = event.target;

        [].forEach.call(daysOfThisMonth, function(clickDate) {
            if (target === clickDate) {
                createNewDescriptionDate(clickDate, nameMonth);
                localStorage.noteList = rowInformation.innerHTML;
            }
        })
    }

    // создать коментарий
    function createNewDescriptionDate(date, month) {

        let boxDescription = document.createElement('div');
        boxDescription.className = 'box_description';

        let newDescription = document.createElement('div');
        newDescription.className = 'new_description';

        let deleteButton = document.createElement('div');
        deleteButton.className = 'delete_description';
        deleteButton.innerHTML = "Х";

        let userDescription = prompt('Отметить день', 'коментарий к дате');

        newDescription.innerHTML = '<h2>' + date.innerHTML + ' ' + month.innerHTML + '</h2> <p>' + userDescription + '</p>';

        if (userDescription) {
            rowInformation.appendChild(boxDescription);
            boxDescription.appendChild(newDescription);
            boxDescription.appendChild(deleteButton);
        }
    }

    // удаление коментария
    function deleteDescription() {
        if(!c) return;

        let delDescriptionButton = document.getElementsByClassName('delete_description');
        let target = event.target;

        [].forEach.call(delDescriptionButton, function(clickDate) {
            if (target === clickDate) {
                clickDate.closest('.box_description').remove();
            }
        });
        localStorage.noteList = rowInformation.innerHTML;
    }
}























