global.WebSocket = require('ws');
const qz = require("qz-tray");

qz.websocket.connect().then(() => {
    return qz.printers.find();
}).then((printers) => {
    console.log(printers);
    let config = qz.configs.create('Epson');

    var data = [
        '\x1B' + '\x40',          // init
        '\x1B' + '\x61' + '\x31', // center align
        'Beverly Hills, CA  90210' + '\x0A',
        '\x0A',                   // line break
        'www.qz.io' + '\x0A',     // text and line break
        '\x0A',                   // line break
        '\x0A',                   // line break
        'May 18, 2016 10:30 AM' + '\x0A',
        '\x0A',                   // line break
        '\x0A',                   // line break
        '\x0A',
        'Transaction # 123456 Register: 3' + '\x0A',
        '\x0A',
        '\x0A',
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        'Baklava (Qty 4)       9.00' + '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
        '\x0A',
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' + '\x0A',
        '\x1B' + '\x45' + '\x0D', // bold on
        'Here\'s some bold text!',
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A' + '\x0A',
        '\x1B' + '\x61' + '\x32', // right align
        '\x1B' + '\x21' + '\x30', // em mode on
        'DRINK ME',
        '\x1B' + '\x21' + '\x0A' + '\x1B' + '\x45' + '\x0A', // em mode off
        '\x0A' + '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        '------------------------------------------' + '\x0A',
        '\x1B' + '\x4D' + '\x31', // small text
        'EAT ME' + '\x0A',
        '\x1B' + '\x4D' + '\x30', // normal text
        '------------------------------------------' + '\x0A',
        'normal text',
        '\x1B' + '\x61' + '\x30', // left align
        '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
    ]
    return qz.print(config, data)
    // return qz.print(config, [{
    //     type: 'pixel',
    //     format: 'html',
    //     flavor: 'plain',
    //     data: '<h1>Hello JavaScript!</h1>'
    // }]);
}).then(() => {
    return qz.websocket.disconnect();
}).then(() => {
    // process.exit(0);
}).catch((err) => {
    console.error(err);
    // process.exit(1);
});
