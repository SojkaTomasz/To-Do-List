let addBtn;
let addInput;
let infoError;
let ul;
let li;
let popupBtn;
let popupCancel;
let popupAccept;
let popupInput;
let popupInfo;

const main = () => {
	elements();
	events();
};

const elements = () => {
	addBtn = document.querySelector('.add-btn');
	addInput = document.querySelector('.to-do-input');
	infoError = document.querySelector('.info-error');
	ul = document.querySelector('.to-do-list ul');
	popupBtn = document.querySelector('.pop-up');
	popupCancel = document.querySelector('.cancel');
	popupAccept = document.querySelector('.accept');
	popupInfo = document.querySelector('.pop-up-info');
	popupInput = document.querySelector('.pop-up-input');
};

const events = () => {
	addBtn.addEventListener('click', addToDO);
	ul.addEventListener('click', btn);
	popupCancel.addEventListener('click', cancel);
	popupAccept.addEventListener('click', changeTodo);
	addInput.addEventListener('keyup', clickEnter);
	popupInput.addEventListener('keyup', clickEnterPopup);
};

const addToDO = () => {
	if (addInput.value == '') {
		infoError.textContent = 'Musisz podajć wartość!';
		infoError.style.color = 'red';
	} else {
		li = document.createElement('li');
		li.textContent = addInput.value;
		ul.appendChild(li);

		infoError.textContent = '';
		infoError.style.color = '#0254a1';
		addInput.value = '';
		createTools();
	}
};

const createTools = () => {
	const div = document.createElement('div');
	const buttonComplit = document.createElement('button');
	const buttonEdit = document.createElement('button');
	const buttonDelet = document.createElement('button');

	li.appendChild(div);
	div.setAttribute('class', 'tools');
	div.appendChild(buttonComplit);
	buttonComplit.setAttribute('class', 'complete');
	buttonComplit.innerHTML = '<i class="fas fa-check"></i>';
	div.appendChild(buttonEdit);
	buttonEdit.setAttribute('class', 'edit');
	buttonEdit.textContent = 'EDIT';
	div.appendChild(buttonDelet);
	buttonDelet.setAttribute('class', 'delete');
	buttonDelet.innerHTML = '<i class="fas fa-times"></i>';
};

const btn = (e) => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		edit(e);
	} else if (e.target.matches('.delete')) {
		e.target.closest('li').remove();
		const todolist = document.querySelectorAll('li');
		if (todolist.length == 0) {
			infoError.textContent = 'Brak zadań na liście.';
		}
	}
};

const edit = (e) => {
	todoToEdit = e.target.closest('li');
	popupInput.value = todoToEdit.firstChild.textContent;
	popupBtn.style.display = 'flex';
};
const cancel = () => {
	popupBtn.style.display = 'none';
	popupInfo.textContent = '';
};

const changeTodo = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value;
		popupBtn.style.display = 'none';
		popupInfo.textContent = '';
	} else {
		popupInfo.textContent = 'Musisz podać wartość!';
		popupInfo.style.color = 'red';
	}
};

const clickEnter = (e) => {
	if (e.key == 'Enter') {
		addToDO();
	}
};
const clickEnterPopup = (e) => {
	if (e.key == 'Enter') {
		changeTodo();
	}
};

document.addEventListener('DOMContentLoaded', main);
