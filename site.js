const namep = document.querySelector("#name");
const surName = document.querySelector("#surname");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const cancelBtn = document.querySelector("#cancelBtn");
const updateBtn = document.querySelector("#updateBtn");
const addNewLead = document.querySelector("#addNewLead");
const addNewNote = document.querySelector("#addNewNote");
const formControlElements = document.querySelector("#formControlElements");
const tbody = document.querySelector("tbody");
let tbodyTrs = document.querySelectorAll(".record");
const error = document.querySelector(".error");
const modalTitle = document.querySelector(".modal-title");
const modalBodyUl = document.querySelector(".modal-body ul");
const closeModal = document.querySelector(".closeModal");
const txtSearch = document.querySelector("#txtSearch");
const form = document.querySelector("form");
const updateDeleteBtn = document.querySelectorAll(".updateDeleteBtn");
let detailBtns = document.querySelectorAll(".detailBtn");
let editBtns = document.querySelectorAll(".editBtn");
let deleteBtns = document.querySelectorAll(".deleteBtn");
const leadID = document.querySelector("#leadID");

let leads = localStorage.getItem("leads")
	? JSON.parse(localStorage.getItem("leads"))
	: [];

load();
eventListeners();
function load() {
	tbody.innerHTML = "";
	leads = localStorage.getItem("leads")
		? JSON.parse(localStorage.getItem("leads"))
		: [];
	if (leads.length < 1) {
		const h5 = document.createElement("h5");
		h5.classList = "fw-bold text-danger text-center";
		h5.innerHTML = "There is not any leads!";
		error.appendChild(h5);
		error.classList.remove("d-none");
	} else {
		error.classList.add("d-none");
		leads.forEach((lead, index) => {
			const tr = document.createElement("tr");
			tr.classList = "record";
			const th = document.createElement("th");
			th.setAttribute("scope", "row");
			th.textContent = index + 1;
			tr.appendChild(th);
			for (let i = 1; i < 5; i++) {
				const td = document.createElement("td");
				td.textContent = lead[i];
				tr.appendChild(td);
			}
			const td = document.createElement("td");
			console.log(index);
			td.innerHTML = `
			<div class="d-flex justify-content-between flex-wrap flex-md-nowrap btns">
			<button onclick="leadDetail(${index})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="detailBtn btn btn-sm btn-primary w-100">Detail</button>
			<button onclick="leadEdit(${index})" class="editBtn btn btn-sm btn-info w-100">Edit</button>
			<button onclick="leadDelete(${index})" class="deleteBtn btn btn-sm btn-danger w-100">Delete</button>
			</div>`;
			tr.appendChild(td);
			tbody.appendChild(tr);
		});
	}
	detailBtns = document.querySelectorAll(".detailBtn");
	editBtns = document.querySelectorAll(".editBtn");
	deleteBtns = document.querySelectorAll(".deleteBtn");
}
function eventListeners() {
	addNewLead.addEventListener("click", addLead);
	addNewNote.addEventListener("click", addNote);

	updateBtn.addEventListener("click", leadUpdate);
	closeModal.addEventListener("click", closeModalFunc);
	txtSearch.addEventListener("keyup", filterElement);
	cancelBtn.addEventListener("click", cancelFunc);
}
function addLead(e) {
	e.preventDefault();
	const newRecord = [];
	const index = leads.length + 1;
	newRecord.push(index);
	newRecord.push(namep.value.trim());
	newRecord.push(surName.value.trim());
	newRecord.push(phone.value.trim());
	newRecord.push(email.value.trim());
	let notes = document.querySelectorAll(".note");
	notes.forEach((note) => {
		note.value.trim().length != 0 && newRecord.push(note.value.trim());
	});
	notes = notes.forEach((note, index) => {
		if (index > 0) note.parentElement.remove();
	});
	leads.push(newRecord);
	localStorage.setItem("leads", JSON.stringify(leads));
	tbody.innerHTML = "";
	load();
	tbodyTrs = document.querySelectorAll(".record");
	form.reset();
}
function addNote(e) {
	e.preventDefault();
	const div = document.createElement("div");
	div.classList = "col-md-12 form-floating mb-3";
	const text = document.createElement("textarea");
	text.setAttribute("maxlength", "512");
	text.setAttribute("placeholder", "Leave a note here");
	text.style.height = "100px";
	text.classList = "form-control note";
	div.appendChild(text);
	const label = document.createElement("label");
	label.setAttribute("for", "note");
	label.classList = "mx-2";
	const note = document.querySelectorAll(".note");
	label.textContent = `Note ${note.length + 1}`;
	div.appendChild(label);
	formControlElements.appendChild(div);
}
function leadDetail(index2) {
	console.log(index2);
	leads
		.filter((item, index) => index == index2)
		.forEach((lead) => {
			modalTitle.innerHTML = `ID= ${lead[0]} <br/> Name= ${lead[1]} <br/>Surname= ${lead[2]}`;
			console.log(lead);
			if (lead.length > 4) {
				for (let i = 5; i < lead.length; i++) {
					const li = document.createElement("li");
					li.classList = "list-group-item";
					li.innerHTML =
						`<span class="fw-bolder">Note ${i - 4}:</span> ` + lead[i];
					modalBodyUl.appendChild(li);
				}
			} else {
				const li = document.createElement("li");
				li.classList = "list-group-item";
				li.innerHTML = `<span class="fw-bolder text-danger">There is not any note...</span> `;
				modalBodyUl.appendChild(li);
			}
		});
}
function cancelFunc() {
	cancelBtn.classList.add("d-none");
	addNewNote.removeAttribute("disabled");
	addNewLead.classList.remove("d-none");
	updateBtn.classList.add("d-none");
	detailBtns.forEach((detail) => {
		detail.removeAttribute("disabled");
	});
	editBtns.forEach((detail) => {
		detail.removeAttribute("disabled");
	});
	deleteBtns.forEach((detail) => {
		detail.setAttribute("disabled", false);
	});
	let notes = document.querySelectorAll(".note");
	notes.forEach((note, index) => {
		if (index > 0) note.parentElement.remove();
	});
	form.reset();
	load();
}
function leadEdit(index2) {
	leads = localStorage.getItem("leads")
		? JSON.parse(localStorage.getItem("leads"))
		: [];
	leadID.value = "";
	cancelBtn.classList.remove("d-none");
	addNewNote.setAttribute("disabled", "true");
	addNewLead.classList.add("d-none");
	updateBtn.classList.remove("d-none");
	detailBtns.forEach((detail) => {
		detail.setAttribute("disabled", true);
	});
	editBtns.forEach((detail) => {
		detail.setAttribute("disabled", true);
	});
	deleteBtns.forEach((detail) => {
		detail.setAttribute("disabled", true);
	});

	leads
		.filter((item, index) => index == index2)
		.map((lead) => {
			leadID.value = lead[0];
			namep.value = lead[1].trim();
			surName.value = lead[2].trim();
			phone.value = lead[3].trim();
			email.value = lead[4].trim();
			let notes = document.querySelectorAll(".note");
			notes.forEach((note) => note.remove());
			if (lead.length > 5) {
				for (let i = 5; i < lead.length; i++) {
					let note = document.createElement("div");
					note.classList = "col-md-12 form-floating mb-3";
					let textarea = document.createElement("textarea");
					textarea.classList = "form-control note";
					textarea.setAttribute("maxlength", "512");
					textarea.style.height = "100px";
					textarea.value = lead[i];
					let label = document.createElement("label");
					label.classList = "mx-2";
					label.setAttribute("for", "note");
					label.innerHTML = `Note ${i - 4}`;
					note.appendChild(textarea);
					note.appendChild(label);
					formControlElements.appendChild(note);
				}
			}
		});
}
function leadUpdate() {
	leads
		.filter((lead) => lead[0] == leadID.value)
		.map((lead) => {
			lead[1] = namep.value.trim();
			lead[2] = surName.value.trim();
			lead[3] = phone.value.trim();
			lead[4] = email.value.trim();
			let notes = document.querySelectorAll(".note");
			console.log(notes);
			let index = 5;
			notes.forEach((note) => {
				console.log(note.value);
				lead[index] = note.value;
				index++;
			});
		});
	localStorage.setItem("leads", JSON.stringify(leads));
	tbody.innerHTML = "";
	cancelFunc();
}
function leadDelete(e, index) {
	leads = localStorage.getItem("leads")
		? JSON.parse(localStorage.getItem("leads"))
		: [];

	leads.splice(index - 1, 1);

	localStorage.setItem("leads", JSON.stringify(leads));
	tbody.innerHTML = "";
	load();
}
function closeModalFunc(e) {
	e.preventDefault();
	modalBodyUl.innerHTML = "";
}
const filterFunc = (filterValue) => {
	Array.from(tbody.children)
		.filter((todo) => !todo.textContent.toLowerCase().includes(filterValue))
		.forEach((todo) => todo.classList.add("filtered"));

	Array.from(tbody.children)
		.filter((todo) => todo.textContent.toLowerCase().includes(filterValue))
		.forEach((todo) => todo.classList.remove("filtered"));
};
function filterElement() {
	const filterValue = txtSearch.value.trim().toLowerCase();
	filterFunc(filterValue);
	console.log(filterValue);
}
