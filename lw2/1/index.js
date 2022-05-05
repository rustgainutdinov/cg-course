document.getElementById('picField').onchange = function (evt) {
	let tgt = evt.target || window.event.srcElement,
		files = tgt.files;

	if(FileReader && files && files.length) {
		let fr = new FileReader();
		fr.onload = function () {
			document.getElementById("loadedImage").src = fr.result;
		};
		fr.readAsDataURL(files[0]);
	}
};