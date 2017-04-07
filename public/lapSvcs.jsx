import {get, post} from './ajaxSvcs.jsx';

const optionTypes = ['unit', 'activity', 'kit', 'weather', 'temperature', 'effort'];

// call rest services
const getRefData = () => {
    return new Promise((resolve, reject) => {
        get('/api/svcs/selectOpts/' + optionTypes.toString())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                alert('Error retrieving data, please try later.');
            });
    });
};


const getLaps = () => {
    return new Promise((resolve, reject) => {
        get('/api/laps?_=1')
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                alert('Error retrieving data, please try later.');
            });
    });
};


const postNewLap = (body) => {
    return new Promise((resolve, reject) => {
        post('/api/laps', body)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                alert('Error saving data, please try later.');
                reject(error);
            });
    });
};


// helpers
const prepSelectOpts = (data) =>{
    return getKeys(prepDistanceMultiplier(data));
};


const getKeys = (map) => {
    let keys = [];
    const mapIter = map.keys();
    for (let k of mapIter) {
        keys.push(k);
    }

    return keys;
};


const prepDistanceMultiplier = (data) => {
    let multipliers = new Map();
    if (data !== undefined) {
        data['unit'].map((unit) => {
            multipliers.set(unit['desc'], unit['conversion']);
        });
    }
    return multipliers;
};


const calcTimes = (unitMult, distance, time) => {
    let hh = Number.parseInt(time.substr(0, 2)) * 60 * 60;
    let mm = Number.parseInt(time.substr(3, 2)) * 60;
    let ss = Number.parseInt(time.substr(6, 2));
    let miles = parseFloat(distance) * parseFloat(unitMult);
    let mph = Math.round(((miles / (hh + mm + ss)) * 60 * 60) * 100) / 100;

    let mins = '00:00';
    if (mph > 0) {
        let minsPM = 60 / mph;
        let secsPM = Math.round((((minsPM) - Number.parseInt(minsPM)) * 60));
        secsPM = (secsPM < 10) ? '0' + secsPM : secsPM;
        mins = Number.parseInt(minsPM) + ':' + secsPM;
    }
    return {mph: mph, mins: mins};
};


const splitRows = (data) => {
    let rows = [];
    let thisRow = [];
    for (let i = 0; i < data.length; i++) {
        thisRow.push(data[i]);
        if ((i + 1) % 3 == 0) {
            rows.push(thisRow);
            thisRow = [];
        }
    }
    if (thisRow.length > 0) {
        rows.push(thisRow);
    }

    return rows;
};


export {
    getLaps,
    getRefData,
    postNewLap,
    getKeys,
    prepSelectOpts,
    prepDistanceMultiplier,
    calcTimes,
    splitRows,
};
