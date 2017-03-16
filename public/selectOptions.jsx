import React from 'react';

let options = new Map();

let unit = ['metre',
    'yard',
    'km',
    'mile',
];
options.set('unit', unit);

let activity = ['commit',
    'fartlek',
    'off road',
    'track',
    'commute',
    'day out',
];
options.set('activity', activity);

let kit = ['everyday',
    'fast',
    'off road',
    'bluey',
    'trek',
];
options.set('kit', kit);

let weather = ['rainy',
    'humid',
    'dry',
    'bright',
];
options.set('weather', weather);

let temperature = ['freezing',
    'cold',
    'muggy',
    'hot',
];
options.set('temperature', temperature);

let effort = ['easy',
    'ok',
    'hard'];
options.set('effort', effort);

const SelectOpts = (props) => {
    let reactOptions = [];

    if (options.has(props['optType'])) {
        let curOptions = options.get(props['optType']);
        for (let i = 0; i < curOptions.length; i++) {
            reactOptions.push(<option key={i} value={curOptions[i]}>{curOptions[i]}</option>);
        }
    };

    return (
        <select onChange={(e) => props.onChange(e)}>{reactOptions}</select>
    );
};

export default SelectOpts;
