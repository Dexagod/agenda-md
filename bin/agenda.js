const fs = require('fs')
const os = require('os')

const createAgenda = require('../src/create-agenda')
const viewTodos = require('../src/view-todos')
const openAgenda = require('../src/open')

const { Command } = require('commander');
let program = new Command();

let agendaDir = `${os.homedir()}/.agenda/`
let namesFile =`${agendaDir}agenda-manager/config/names.json`
let agendaEntriesDir = `${agendaDir}entries/`

let programOptions = {
  agendaDir,
  namesFile,
  agendaEntriesDir,
}



if (!fs.existsSync(agendaDir)) {
  fs.mkdirSync(agendaDir)
} 

if (!fs.existsSync(agendaEntriesDir)) {
  fs.mkdirSync(agendaEntriesDir)
} 



program
  .name('agenda')
  .description('Agenda management tool')
  .version('0.1.0')
  .enablePositionalOptions()

createAgenda.addCommand(program, programOptions);
viewTodos.addCommand(program, programOptions);
openAgenda.addCommand(program, programOptions)

program
  .parse(process.argv);