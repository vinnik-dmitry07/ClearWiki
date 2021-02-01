window.onload = function() {
	function editPage(change) {
		for (let a of as) {
			a.style.display = change['links'] ? 'none' : '';
			let linkSpan = a.previousSibling;
			if (linkSpan !== null && linkSpan.className === 'instead-of-link')
				linkSpan.style.display = change['links'] ? '' : 'none';
		}
		if (toc !== null) toc.style.display = change['maintenance'] ? 'none' : 'table';
		
		for (let header 	of headers)		header.style.cssText 	= change['horizontal-lines'] 		? 'border-bottom: 0' 	: '';
		for (let image 		of images)		image.style.display 	= change['all-images'] 				? 'none' 				: '';
		for (let infobox 	of infoboxes) 	infobox.style.display 	= change['info'] 					? 'none' 				: '';		
		for (let thumb 		of thumbs) 		thumb.style.display 	= change['thumbs'] 					? 'none' 				: '';
		for (let section 	of sections) 	section.style.display 	= change['edit-section-buttons']	? 'none' 				: '';
		for (let sup 		of sups) 		sup.style.display 		= change['footnotes-external']		? 'none' 				: '';
		for (let box 		of boxes) 		box.style.display 		= change['boxes']					? 'none' 				: '';
	}

	let content = document.getElementById('bodyContent');
	let toc = document.getElementById('toc');
	
	let as 			= Array.from(content.getElementsByTagName('a'));
	let headers 	= Array.from(content.getElementsByTagName('h2'));
	let images 		= Array.from(content.getElementsByTagName('img'));
	let sup1 		= Array.from(content.getElementsByTagName('sup'));
	let infoboxes 	= Array.from(content.getElementsByClassName('infobox'));
	let thumbs 		= Array.from(content.getElementsByClassName('thumb'));
	let sections 	= Array.from(content.getElementsByClassName('mw-editsection'));
	let sup2 		= Array.from(content.getElementsByClassName('external'));
	let boxes 		= Array.from(content.getElementsByClassName('ambox'));
	
	let sups = [].concat(sup1, sup2);
	
	for (let a of as) {
		let linkSpan = document.createElement('span');
		linkSpan.className = 'instead-of-link';
		linkSpan.innerHTML = a.innerHTML;
		linkSpan.style.display = 'none';
		a.parentNode.insertBefore(linkSpan, a);
	}

	new Promise(function(resolve) {
		chrome.storage.local.get(null, _status => resolve(_status));
	}).then(function(status) {
		editPage(status);

		chrome.storage.onChanged.addListener(function(changes, areaName) {
			if (areaName === 'local') {
				let first = Object.keys(changes)[0];
				status[first] = changes[first]['newValue'];
				editPage(status);
			}
		});
	});
}