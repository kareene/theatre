const layout = [
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2],
    [0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3]
];
const priceMap = {
    1: 25,
    2: 20,
    3: 15
}
var gSeats = _createSeats();

function getSeats() {
    return JSON.parse(JSON.stringify(gSeats));
}

function loadSeats() {
    gSeats = _loadSeats();
    return getSeats();
}

function setSeatsStatus(seatIds, status) {
    seatIds.forEach(seatId => {
        const seat = gSeats.find(seat => seat && seat.id === seatId);
        seat.status = status;
    });
    _saveSeats(gSeats);
}

export default {
    getSeats,
    loadSeats,
    setSeatsStatus
};

function _createSeats() {
    let seats = _loadSeats();
    if (!seats) {
        let rowNum = 0;
        seats = layout.map(row => {
            if (row.some(isSeat => isSeat)) rowNum++;
            let seatNum = 0;
            return row.map(key => {
                if (!key) return null;
                seatNum++;
                return _createSeat(rowNum, seatNum, priceMap[key]);
            });
        }).flat();
        _saveSeats(seats);
    }
    return seats;
}

function _createSeat(rowNum, seatNum, price) {
    return {
        id: `Row${rowNum}-Seat${seatNum}`,
        price,
        status: 'available'
    }
}

function _loadSeats() {
    return JSON.parse(localStorage.getItem('theatre-seats'));
}

function _saveSeats(seats) {
    localStorage.setItem('theatre-seats', JSON.stringify(seats));
}