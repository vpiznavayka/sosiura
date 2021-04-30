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
	new Question("1. Обрати вірш, який не належить В. Сосюрі:",
	[
		new Answer("А) \"Осінь\"", 0),
		new Answer("Б) \"Васильки\"", 0),
		new Answer("В) \"Ви знаєте, як липа шелестить\"", 1),
		new Answer("Г) \"Любіть Україну!\"\n", 0)
	]),
	new Question("2. Якого образу немає в поезії \"Любіть Україну!\"?",
		[
			new Answer("А) пісня", 0),
			new Answer("Б) дума", 0),
			new Answer("В) верби ", 0),
			new Answer("Г) земля", 1)
		]),
	new Question("3. Зі скількох строф складається вірш \"Любіть Україну!\"?",
	[
		new Answer("А) 8", 0),
		new Answer("Б) 12", 0),
		new Answer("В) 10", 1),
		new Answer("Г) 14", 0)
	]),

	new Question("4. Який художній засіб використано в поданих рядочках: В годину щасливу, і в радості мить, Любіть у годину негоди.",
	[
		new Answer("А) гіпербола", 0),
		new Answer("Б) антитеза", 1),
		new Answer("В) порівняння ", 0),
		new Answer("Г) метафора", 0)
	]),

	new Question("5. Якого кольору немає в образах поезії \"Любіть Україну!\"?",
	[
		new Answer("А) зелений ", 0),
		new Answer("Б) пурпуровий", 0),
		new Answer("В) ніжно-карий", 0),
		new Answer("Г) синій", 1)
	]),



	new Question("6. Який художній засіб використано в уривку\n" +
		" ...До весен, і світлих, і щирих",
	[
		new Answer("А) епітет", 1),
		new Answer("Б) метафора ", 0),
		new Answer("В) символ", 0),
		new Answer("Г) гіпербола", 0)
	]),



	new Question("7. Провідний мотив вірша \"Любіть Україну!\" ",
		[
			new Answer("А) високе й красиве почуття кохання;", 0),
			new Answer("Б) щира любов до рідної України;", 1),
			new Answer("В) роль поета в суспільстві;", 0),
			new Answer("Г) захоплення красою весняної природи.", 1)
		]),



	new Question("8. Який художній засіб використано в уривку: \n" +
		"Всім серцем любіть Україну свою",
	[
		new Answer("1. Порівняння", 0),
		new Answer("2. Метафора", 0),
		new Answer("В) інверсію", 1),
		new Answer("Г) персоніфікацію", 0)
	]),
	new Question("9. Установити відповідність між художніми образами з поезії \"Любіть Україну!\":\n (1. в дівочих...)",
		[
			new Answer("А. шумі", 0),
			new Answer("Б. очах", 1),
			new Answer("В. усмішці", 0),
			new Answer("Г. руках", 0),
			new Answer(" Д. тинах", 0)
		]),
	new Question("9. Установити відповідність між художніми образами з поезії \"Любіть Україну!\":\n (2. в дитячій...)" ,
		[
			new Answer("А. шумі", 0),
			new Answer("Б. очах", 0),
			new Answer("В. усмішці", 1),
			new Answer("Г. руках", 0),
			new Answer(" Д. тинах", 0)
		]),
	new Question("9. Установити відповідність між художніми образами з поезії \"Любіть Україну!\":\n (3. в кривеньких... )",
		[
			new Answer("А. шумі", 0),
			new Answer("Б. очах", 0),
			new Answer("В. усмішці", 0),
			new Answer("Г. руках", 0),
			new Answer(" Д. тинах", 1)
		]),
	new Question("9. Установити відповідність між художніми образами з поезії \"Любіть Україну!\":\n (4. в стягів багряному...) ",
		[
			new Answer("А. шумі", 1),
			new Answer("Б. очах", 0),
			new Answer("В. усмішці", 0),
			new Answer("Г. руках", 0),
			new Answer(" Д. тинах", 0)
		]),




	new Question("10. Установити відповідність  між художніми образами та епітетами до них за поезією \"Любіть Україну!\" (1. Україна)",
		[
			new Answer("А. вічно жива і нова", 0),
			new Answer("Б. пурпурові", 0),
			new Answer("В. вишнева", 1),
			new Answer("Г. зелена", 0),
			new Answer("Д. солов'їна", 0)
		]),
	new Question("10. Установити відповідність  між художніми образами та епітетами до них за поезією \"Любіть Україну!\" (2. мова)",
		[
			new Answer("А. вічно жива і нова", 0),
			new Answer(" Б. пурпурові", 0),
			new Answer("В. вишнева", 0),
			new Answer("Г. зелена", 0),
			new Answer("Д. солов'їна", 1)
		]),
	new Question("10. Установити відповідність  між художніми образами та епітетами до них за поезією \"Любіть Україну!\" (3. краса)",
		[
			new Answer("А. вічно жива і нова", 1),
			new Answer(" Б. пурпурові", 0),
			new Answer("В. вишнева", 0),
			new Answer("Г. зелена", 0),
			new Answer("Д. солов'їна", 0)
		]),
	new Question("10. Установити відповідність  між художніми образами та епітетами до них за поезією \"Любіть Україну!\" (4. хмари)",
		[
			new Answer("А. вічно жива і нова", 0),
			new Answer("Б. пурпурові", 1),
			new Answer("В. вишнева", 0),
			new Answer("Г. зелена", 0),
			new Answer("Д. солов'їна", 0)
		]),



	new Question("11. Установіть відповідність між художніми засобами та прикладами: (1. гіпербола)",
		[
			new Answer("А. Любіть Україну, як сонце любіть, як вітер, і трави, і води...", 0),
			new Answer("Б. Любіть Україну всім серцем своїм і всіми своїми ділами.", 0),
			new Answer("В. Так ніхто не кохав. Через тисячі літ лиш приходить подібне кохання.", 1),
			new Answer("Г. В годину щасливу, і в радості мить, любіть у годину негоди.", 0),
			new Answer("Д. В день такий на землі розцвітає весна і тремтить од солодкої муки...", 0)
		]),
	new Question("11. Установіть відповідність між художніми засобами та прикладами: (2. метафора)",
		[
			new Answer("А. Любіть Україну, як сонце любіть, як вітер, і трави, і води...", 0),
			new Answer("Б. Любіть Україну всім серцем своїм і всіми своїми ділами.", 0),
			new Answer("В. Так ніхто не кохав. Через тисячі літ лиш приходить подібне кохання.", 0),
			new Answer("Г. В годину щасливу, і в радості мить, любіть у годину негоди.", 0),
			new Answer("Д. В день такий на землі розцвітає весна і тремтить од солодкої муки...", 1)
		]),
	new Question("11. Установіть відповідність між художніми засобами та прикладами: (3. порівняння)",
		[
			new Answer("А. Любіть Україну, як сонце любіть, як вітер, і трави, і води...", 1),
			new Answer("Б. Любіть Україну всім серцем своїм і всіми своїми ділами.", 0),
			new Answer("В. Так ніхто не кохав. Через тисячі літ лиш приходить подібне кохання.", 0),
			new Answer("Г. В годину щасливу, і в радості мить, любіть у годину негоди.", 0),
			new Answer("Д. В день такий на землі розцвітає весна і тремтить од солодкої муки...", 0)
		]),
	new Question("11. Установіть відповідність між художніми засобами та прикладами: (4. антоніми)",
		[
			new Answer("А. Любіть Україну, як сонце любіть, як вітер, і трави, і води...", 0),
			new Answer("Б. Любіть Україну всім серцем своїм і всіми своїми ділами.", 0),
			new Answer("В. Так ніхто не кохав. Через тисячі літ лиш приходить подібне кохання.", 0),
			new Answer("Г. В годину щасливу, і в радості мить, любіть у годину негоди.", 1),
			new Answer("Д. В день такий на землі розцвітає весна і тремтить од солодкої муки...", 0)
		]),




	new Question("12. Установіть відповідність між символами та значеннями (за поезією \"Любіть Україну!\") (1. електровогні)",
		[
			new Answer("А. перемога над ворогами", 0),
			new Answer("Б. недосяжна мрія", 0),
			new Answer("В. радянська дійність", 0),
			new Answer("Г. українська природа", 0),
			new Answer("Д. індустріальні здобутки радянської влади", 1)
		]),
	new Question("12. Установіть відповідність між символами та значеннями (за поезією \"Любіть Україну!\") (2. грім канонад)",
		[
			new Answer("А. перемога над ворогами", 1),
			new Answer("Б. недосяжна мрія", 0),
			new Answer("В. радянська дійність", 0),
			new Answer("Г. українська природа", 0),
			new Answer("Д. індустріальні здобутки радянської влади", 0)
		]),
	new Question("12. Установіть відповідність між символами та значеннями (за поезією \"Любіть Україну!\") (3. верби)",
		[
			new Answer("А. перемога над ворогами", 0),
			new Answer("Б. недосяжна мрія", 0),
			new Answer("В. радянська дійність", 0),
			new Answer("Г. українська природа", 1),
			new Answer("Д. індустріальні здобутки радянської влади", 0)
		]),
	new Question("12. Установіть відповідність між символами та значеннями (за поезією \"Любіть Україну!\") (4. пурпурові хмари",
		[
			new Answer("А. перемога над ворогами", 0),
			new Answer("Б. недосяжна мрія", 0),
			new Answer("В. радянська дійність", 1),
			new Answer("Г. українська природа", 0),
			new Answer("Д. індустріальні здобутки радянської влади", 0)
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