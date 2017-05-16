const exec = require('child_process').exec;

const getCode = async (shell) => {
    let child = exec('node ./start.js');
    child.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
    });
    child.stderr.on('data', function(data) {
        console.log('stdout: ' + data);
    });
    child.on('close', function(code) {
        console.log('closing code: ' + code);
    });
}

module.exports = {
    'GET /*': async (ctx, next) => {
        let shell = (ctx.query.code || 'ls -l').trim();
        let data = '';

        // data = await getCode(shell);
        ctx.render('index.html', {});
    }
}