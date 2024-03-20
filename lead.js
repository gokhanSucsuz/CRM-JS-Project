const namep = document.querySelector("#name");
const surName = document.querySelector("#surname");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const notes = document.querySelectorAll(".note");
const addNewLead = document.querySelector("#addNewLead");
const addNewNote = document.querySelector("#addNewNote");
const formControlElements = document.querySelector("#formControlElements");
const tbody = document.querySelector("tbody");
const error = document.querySelector(".error");
let tbodyTrs = document.querySelectorAll(".record");

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
			tr.classList = "record";
			const th = document.createElement("th");
			th.setAttribute("scope", "row");
			th.textContent = lead[0];
			tr.appendChild(th);
			for (let i = 1; i < lead.length; i++) {
				const td = document.createElement("td");
				td.textContent = lead[i];
				tr.appendChild(td);
			}

			tbody.appendChild(tr);
		});
	}
}
function eventListeners() {
	load();
	addNewLead.addEventListener("click", addLead);
	addNewNote.addEventListener("click", addNote);
	tbodyTrs.forEach((tr) => {
		tr.addEventListener("click", leadDetail);
	});
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
	notes.forEach((note) => {
		newRecord.push(note.value);
	});
	console.log(newRecord);
	leads.push(newRecord);
	localStorage.setItem("leads", JSON.stringify(leads));
	tbody.innerHTML = "";
	load();
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
	label.textContent = "Note";
	div.appendChild(label);
	formControlElements.appendChild(div);
}
function leadDetail(e) {
	e.preventDefault();
	alert("olabilir");
}
