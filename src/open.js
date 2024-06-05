const child_process = require('child_process')

function addCommand(program, programOptions) {

  program
    .command('open')
    .description('Open the agenda folder.')
    .action(async (options) => {

      console.log(`Open agenda`)
      child_process.spawn('code', [programOptions.agendaEntriesDir], {
        stdio: 'inherit'
      });
    })
}

module.exports = { addCommand }