const log = (...params) => params.forEach(i => console.log(i));

function showPopup(timeout = 600) {
	const body = document.body;
	const popupLinks = Array.from(document.querySelectorAll('.popup-link'));
	const lockPadding = Array.from(document.querySelectorAll('.lock-padding')); // for fixed objects
	const popupCloseIcon = Array.from(document.querySelectorAll('.close-popup'));

	let unlock = true;
	let popupIsOpen = false;

	document.addEventListener('pointerup', function (e) {
		if (popupLinks.length > 0 && e.target.closest('.popup-link')) {
			const currentPopup = document.getElementById(e.target.getAttribute('href').replace('#', ''));
			popupOpen(currentPopup);
			e.preventDefault();
		}
		if (popupCloseIcon.length > 0 && e.target.closest('.close-popup')) {
			popupClose(e.target.closest('.popup'));
			e.preventDefault();
		}
		if (popupIsOpen && e.target.closest('.popup') && !e.target.closest('.popup__content')) {
			popupClose(e.target.closest('.popup'));
		}
	});

	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape' && document.querySelector('.popup.open')) {
			popupClose(document.querySelector('.popup.open'));
		}
	});

	function popupOpen(currentPopup) {
		if (currentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
			popupActive ? popupClose(popupActive, false) : bodyLock();

			currentPopup.classList.add('open');
			popupIsOpen = true;
		}
	}

	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			popupIsOpen = false;
		}
		if (unlock && doUnlock) {
			bodyUnLock();
		}
	}

	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

		if (lockPadding.length > 0) {
			lockPadding.forEach(i => (i.style.paddingRight = lockPaddingValue));
		}

		body.style.paddingRight = lockPaddingValue;
		body.classList.add('_lock');

		unlock = false;
		setTimeout(() => (unlock = true), timeout);
	}

	function bodyUnLock() {
		setTimeout(() => {
			if (lockPadding.length > 0) {
				lockPadding.forEach(i => (i.style.paddingRight = '0'));
			}
			body.style.paddingRight = '0';
			body.classList.remove('_lock');
		}, timeout);

		unlock = false;
		setTimeout(() => (unlock = true), timeout);
	}
}
showPopup();

// polifils
(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
	}
})();
