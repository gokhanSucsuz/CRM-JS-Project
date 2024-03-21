const namep = document.querySelector("#name");
const surName = document.querySelector("#surname");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const addNewLead = document.querySelector("#addNewLead");
const addNewNote = document.querySelector("#addNewNote");
const formControlElements = document.querySelector("#formControlElements");
const tbody = document.querySelector("tbody");
let tbodyTrs = document.querySelectorAll(".record");
const error = document.querySelector(".error");
const modalTitle = document.querySelector(".modal-title");
const modalBodyUl = document.querySelector(".modal-body ul");
const closeModal = document.querySelector(".closeModal");
const search = document.querySelector("#txtSearch");
const form = document.querySelector("form");

let leads = localStorage.getItem("leads")
	? JSON.parse(localStorage.getItem("leads"))
	: [];

eventListeners();
function load() {
	if (leads.length < 1) {
		const h5 = document.createElement("h5");
		h5.classList = "fw-bold text-danger text-center";
		h5.innerHTML = "There is not any leads!";
		error.appendChild(h5);
		error.classList.remove("d-none");
	} else {
		error.classList.add("d-none");
		leads.forEach((lead) => {
			const tr = document.createElement("tr");
			tr.setAttribute("data-bs-toggle", "modal");
			tr.setAttribute("data-bs-target", "#staticBackdrop");
			tr.classList = "record";
			const th = document.createElement("th");
			th.setAttribute("scope", "row");
			th.textContent = lead[0];
			tr.appendChild(th);
			for (let i = 1; i < 5; i++) {
				const td = document.createElement("td");
				td.textContent = lead[i];
				tr.appendChild(td);
			}
			const td = document.createElement("td");
			td.innerHTML = `<button class="btn btn-sm btn-info">Edit</button><button class="btn btn-sm btn-danger">Delete</button> `;
			tr.appendChild(td);
			tbody.appendChild(tr);
		});
	}
}
function eventListeners() {
	load();
	addNewLead.addEventListener("click", addLead);
	addNewNote.addEventListener("click", addNote);
	tbody.addEventListener("click", leadDetail);
	closeModal.addEventListener("click", closeModalFunc);
	search.addEventListener("keyup", filterElement);
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
function leadDetail(e) {
	e.preventDefault();
	modalTitle.innerHTML =
		e.target.parentElement.children[1].value +
		" " +
		e.target.parentElement.children[2]?.value;

	leads
		.filter((item) => item[0] == e.target.parentElement.children[0].textContent)
		.forEach((lead) => {
			if (lead.length > 5) {
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
	const filterValue = search.value.trim().toLowerCase();
	filterFunc(filterValue);
	console.log(filterValue);
}
