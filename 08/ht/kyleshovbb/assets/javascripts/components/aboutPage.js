"use strict";
function addAbout() {
    let about = document.querySelector("#aboutDiv");
    if (!about) {
        let aboutDiv = document.createElement("div");
        aboutDiv.setAttribute("id", "aboutDiv");
        document.body.appendChild(aboutDiv);
    }

    aboutDiv.innerHTML =
        `<h1><a href='https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB'>Игра «Жизнь»</a></h1>
<p>Место действия этой игры — «вселенная» — это размеченная на клетки поверхность или
плоскость — безграничная, ограниченная, или замкнутая (в пределе — бесконечная плоскость).</p>
<p>Каждая клетка на этой поверхности может находиться в двух состояниях: быть «живой» 
(заполненной) или быть «мёртвой» (пустой). Клетка имеет восемь соседей, окружающих её.</p>
<ul> Распределение живых клеток в начале игры называется первым поколением. Каждое следующее 
поколение рассчитывается на основе предыдущего по таким правилам:
<li>в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь;</li>
<li>если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; 
в противном случае, если соседей меньше двух или больше трёх, клетка умирает («от одиночества» 
или «от перенаселённости»)</li>
</ul>
<p>Игрок не принимает прямого участия в игре, а лишь расставляет или генерирует начальную 
конфигурацию «живых» клеток, которые затем взаимодействуют согласно правилам уже без его участия 
(он является наблюдателем).</p>
<p>Поле отображает текущее поколение. И позволяет пользователю взаимодействовать с игрой. 
Клик по полю вызывает инверсию состояния клетки, по которой пользователь кликнул ( живая - 
умирает, мертвая - оживает ).</p>`;
}

export default addAbout;