const child_process = require('child_process')

function addCommand(program, programOptions) {

  program
    .command('open')
    .option('-e, --editor <editor>')
    .description('Open the agenda folder.') 
    .action(async (options) => {

      console.log(`Opening agenda`)
      child_process.spawn(options.editor || "$EDITOR", [programOptions.agendaEntriesDir], {
        stdio: 'inherit'
      });
    })
}

module.exports = { addCommand }