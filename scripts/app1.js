const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам потрібно краще ознайомитись з творами письменника", 0),
	new Result("Вже не так погано", 5),
	new Result("Гарний рівень знань", 10),
	new Result("Ви досконало знаєте тему", 15)
];

//Массив с вопросами
const questions = 
[
	new Question("Які серед запропонованих творів належать до патріотичної лірики? ",
	[
		new Answer("А. \"Як не любити рідну мову\" ", 1),
		new Answer("Б. \"Я знаю силу слова\"\n", 0),
		new Answer("В. \"Сині трави\"", 0),
		new Answer("Г. \"Білі акції будуть цвісти\"", 0)
	]),
	new Question("Які серед запропонованих творів належать до патріотичної лірики? ",
		[
			new Answer("А. \"Любіть Україну!\"", 1),
			new Answer("Б. \"Білі акції будуть цвісти\"", 0),
			new Answer("В. \"Я знаю силу слова\"\n", 0),
			new Answer("Г. \"Сині трави\"", 0)
		]),
	new Question("До якої збірки належить вірш \"Я знаю силу слова\"?",
	[
		new Answer("А. \"Нові поезії\"", 0),
		new Answer("Б. \"Зелений світ\"", 0),
		new Answer("В. \"Поезія не спить\"", 1),
		new Answer("Г. \"Журавлі прилетіли\"", 0)
	]),

	new Question("В якому році була надрукована збірка поезій \"Щоб сади шуміли\"?",
	[
		new Answer("А. 1947 ", 1),
		new Answer("Б. 1935", 0),
		new Answer("В. 1961", 0),
		new Answer("Г. 1960", 0)
	]),

	new Question("До якого жанру лірики належить вірш \"Васильки\"?",
	[
		new Answer("А. Інтимної", 1),
		new Answer("Б. Пейзажної", 0),
		new Answer("В. Громадянської ", 0),
		new Answer("Г.  Патріотична", 0)
	]),



	new Question("В яких віршах темою є зображення поетичного образу України, її краси, її величі?",
	[
		new Answer("А. \"Україна\" ", 1),
		new Answer("Б. \"Як не любить той край\"", 0),
		new Answer("В. \"Як не любити рідну мову\"", 0)
	]),



	new Question("В яких віршах темою є зображення поетичного образу України, її краси, її величі?",
		[
			new Answer("Б. \"Як не любить той край\"", 0),
			new Answer("В. \"Як не любити рідну мову\"", 0),
			new Answer("Г.  \"Любіть Україну!\"", 1),
		]),



	new Question("Установіть відповідність між художніми засобами та поданими уривками\n" +
		"\"Любіть Україну (З вірша \"Любіть Україну!\")\"",
	[
		new Answer("1. Порівняння", 0),
		new Answer("2. Метафора", 0),
		new Answer("3. Рефрен", 1),
		new Answer("4. Епітет ", 0),
		new Answer("5. Оксиморон ", 0)
	]),
	new Question("Установіть відповідність між художніми засобами та поданими уривками\n" +
		"\"А у тебе, мила, васильки з-під вій (З вірша \"Васильки\")\"",
		[
			new Answer("1. Порівняння", 0),
			new Answer("2. Метафора", 1),
			new Answer("3. Рефрен", 0),
			new Answer("4. Епітет ", 0),
			new Answer("5. Оксиморон ", 0)
		]),
	new Question("Установіть відповідність між художніми засобами та поданими уривками\n" +
		 "   \"Тихий місяць (З вірша Так ніхто не кохав\")   \"",
		[
			new Answer("1. Порівняння", 0),
			new Answer("2. Метафора", 0),
			new Answer("3. Рефрен", 0),
			new Answer("4. Епітет ", 1),
			new Answer("5. Оксиморон ", 0)
		]),
	new Question("Установіть відповідність між художніми засобами та поданими уривками\n" +
		"\"Коли життя цвіте, як пишний сад (З вірша \"Люблю весну, та хто її не любить\")\"",
		[
			new Answer("1. Порівняння", 1),
			new Answer("2. Метафора", 0),
			new Answer("3. Рефрен", 0),
			new Answer("4. Епітет ", 0),
			new Answer("5. Оксиморон ", 0)
		]),




	new Question("А. Установити відповідність між уривками та творами, до яких вони належать: Коли  пливуть  вечірні тіні й  п’янить  повітря, як  вино, а  небеса,  як  очі  сині, які  люблю  я  так  давно. ...",
		[
			new Answer("1. \"Вода десь точить білий камінь...\" ", 0),
			new Answer("2. \"Як не любить той край\"", 0),
			new Answer("3. \"Україна\" ", 0),
			new Answer("4. \"Сині трави\" ", 0),
			new Answer("5. \"Люблю я слухати у полі\" ", 1)
		]),
	new Question("Б. Установити відповідність між уривками та творами, до яких вони належать: Дзвін  шабель,  пісні,  походи, воля  соколина, ...",
		[
			new Answer("1. \"Вода десь точить білий камінь...\" ", 0),
			new Answer("2. \"Як не любить той край\"", 0),
			new Answer("3. \"Україна\" ", 1),
			new Answer("4. \"Сині трави\" ", 0),
			new Answer("5. \"Люблю я слухати у полі\" ", 0)
		]),
	new Question("В. Установити відповідність між уривками та творами, до яких вони належать: Шумлять сади над берегами Вмаєї юності краю Де б я не був, а все ж думками лечу в Донеччину свою.",
		[
			new Answer("1. \"Вода десь точить білий камінь...\" ", 1),
			new Answer("2. \"Як не любить той край\"", 0),
			new Answer("3. \"Україна\" ", 0),
			new Answer("4. \"Сині трави\" ", 0),
			new Answer("5. \"Люблю я слухати у полі\" ", 0)
		]),
	new Question("Г. Установити відповідність між уривками та творами, до яких вони належать: Там мій дім і та шипшина, що колись я рвав. Кароока та дівчина, що любив — не взяв. ",
		[
			new Answer("1. \"Вода десь точить білий камінь...\" ", 0),
			new Answer("2. \"Як не любить той край\"", 0),
			new Answer("3. \"Україна\" ", 0),
			new Answer("4. \"Сині трави\" ", 1),
			new Answer("5. \"Люблю я слухати у полі\" ", 0)
		])
	]

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}