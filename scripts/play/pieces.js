const getPieceClasses = cell => getClasses(getPieceInCell(cell));
const getPieceInCell = cell => getCell('piece' + cell);
const pieceInCell = cell => getClasses(getPieceInCell(cell)).length > 0;
const getPieceColour = cell => getPieceClasses(cell)[0];

function selectPiece(cell) {
	window.selectedCell = cell;
	$.id(cell)?.classList.add('selected');
	if (hasRules) {
		findAllMoves(cell).forEach(cell => getCell(cell).classList.add('valid'));
	}
	console.log('S', selectedCell);
}

function createPiece(name, colour, cell) {
	if (!name) return;
	let piece = document.createElement('img');
	piece.src = '/images/transparent.gif';
	piece.setAttribute('data-piece', true);
	piece.classList.add(colour);
	piece.classList.add(name);
	if (cell) {
		piece.alt = cell;
		piece.id = 'piece' + cell;
		piece.setAttribute('draggable', true);
	}
	return piece;
}

function addPiece(name, colour, cell) {
	clearCell(cell);
	getCell(cell).appendChild(createPiece(name, colour, cell));
}

function swapPiece(startCell, endCell) {
	const startClasses = getPieceClasses(startCell);
	const endClasses = getPieceClasses(endCell);
	if (startClasses.length) {
		addPiece(startClasses[1], startClasses[0], endCell);
		if (!endClasses.length) resetCell(startCell);
	}
	if (endClasses.length) {
		addPiece(endClasses[1], endClasses[0], startCell);
		if (!startClasses.length) resetCell(endCell);
	}
}

function movePiece(startCell, endCell) {
	if (startCell === endCell) return;
	const startClasses = getPieceClasses(startCell);
	addPiece(startClasses[1], startClasses[0], endCell);
	resetCell(startCell);
}

function setPromotion(elem) {
	// used in play.html
	const [colour, piece] = elem.classList;
	$$('#promotion img').forEach(elem => elem.classList.remove('selected'));
	elem.classList.add('selected');
	window.promotionPiece = piece;
}

function getPieceID(piece) {
	return {pawn: '', knight: 'N'}[piece] || piece[0].toUpperCase();
}

function getPointsEquivalent(piece) {
	return {
		pawn: 1,
		knight: 3,
		bishop: 3,
		rook: 5,
		queen: 9,
		king: Infinity,
	}[piece];
}
