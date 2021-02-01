let checkboxes = document.getElementsByClassName('checkbox');

function updateDataOf(checkbox) {
	d = {};
	d[checkbox.id] = checkbox.checked;
	chrome.storage.local.set(d);
}

function setAllStates(checked) {
	for (let checkbox of checkboxes) {
		if (checkbox.checked != checked) checkbox.click();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	chrome.storage.local.get(null, extData => {
		for (let checkbox of checkboxes) {
			checkbox.checked = extData[checkbox.id] === undefined ? false : extData[checkbox.id];
			checkbox.onchange = () => updateDataOf(checkbox);
		}
		document.getElementById('all-on').onclick = () => setAllStates(true);
		document.getElementById('all-off').onclick = () => setAllStates(false);
	});
});
