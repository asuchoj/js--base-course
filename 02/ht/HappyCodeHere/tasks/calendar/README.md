### Реализовать виджет календаря
Задача состоит из двух частей

#### Реализовать виджет календаря
Создать скрипт, который будет отрисовывать календарь на текущий месяц (разметка должна быть основана на табличной верстке ). При этом календарь имеет контролы для изменения месяца, который отображается. При двойном клике по ячейке дня у пользователя запрашивается текст события, после чего событие отображается в списке внутри ячейки. Каждое событие из списка имеет контрол [x], который после подтверждения позволяет удалить событие из списка. Набор событий сохраняется между перезагрузками страницы. Должна предусматриваться одновременная работа (независимая ) нескольких календарей на одной странице.
#### Реализовать конфигурацию виджета
Конструктор виджета должен принимать параметры. Например:
- Отрисовывать ли кнопки для смены месяца
- Давать ли возможность создавать событий
- Давать ли возможность удалять события
- Заголовок календаря
- Класс главного элемента календаря (чтобы можно было кастомизировать внешний вид календаря)
На отдельной странице должна быть реализована форма, для отображения/настройки всех этих опций. На форме должен присутствовать textarea, который при каждом изменении будет содержать актуальный код для вставки виджета с заданными настройками.
**Опционально** можно на той же странице выводить календарь с выбранными настройками, чтобы было легче понимать что и как влияет на виджет
Пример кода после конфигурации:
```javascript
<script src="http://some_path_to_file"><script>
<script>
(function() {
    var id = "asdfqwra";
    document.write('<div id="' + id + '"></div>');
    new Calendar({
	    el: '#' + id,
	    showControls: true,
	    allowAddEvents: true,
	    allowRemoveEvents: false,
	    className: 'some-calendar-widget',
	    title: 'Мои планы'
	});
})();
</script>
```
Соответственно вставит этот код на страницу ( к примеру jsbin ) мы можем получить один или несколько виджетов