#!/usr/bin/env node
const { spawn } = require('child_process')
const fs = require('fs');

const log = (data,reason) => {
    fs.appendFile('log.txt', `${reason} ${(new Date()).toString()} ~ ${data}`, function () {})
}

let EYSSServer = spawn('npm',['start'])

EYSSServer.stdout.on('data', (chunk) => {
    let data = chunk.toString()
    log(data,'STDIN_MSG')
})
EYSSServer.stderr.on('data', (chunk) => {
    let data = chunk.toString()
    log(data,'STDERR_MSG')
})

EYSSServer.on('exit', function (code, signal) {
    EYSSServer = spawn('npm',['start'])
    log('Server crashed. Restarting.','RESET_MSG')

})
reactServer.on('error', (err) => {
	log('Failed to start subprocess.','INIT_ERROR')
})

reactServer.on('warning', (warning) => {
    log(warning.name + ' - ' + warning.message,'WARNING_MSG')
})

process.on('exit',()=>{
	EYSSServer.kill('SIGHUP')
})