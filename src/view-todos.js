const fs = require('fs')
const readline = require('readline');
const chalk = require('chalk')

function addCommand(program, programOptions) {
  let entries = []

  program
    .command('todos')
    .description('Utility to view todos in agenda entries.')
    .action(async (options) => {
      let dirEntries = fs.readdirSync(programOptions.agendaEntriesDir)
      for (let entry of dirEntries) {
        if (entry.endsWith('.md')) {
          entries.push(entry)
        }
      }
      entries.sort((a, b) => {
        let dateA = new Date(`20${a.split('_')[0]}`)
        let dateB = new Date(`20${b.split('_')[0]}`)
        return dateB - dateA
      })

      for (let entry of entries.slice(0, 10).reverse()) {
        let fileName = programOptions.agendaEntriesDir + entry
        const file = readline.createInterface({
          input: fs.createReadStream(fileName),
          output: process.stdout,
          terminal: false
        });
        let print = false;
        file.on('line', (line) => {
          if (line.trim() === "## Next steps") {
            print = true;
            console.log()
            console.log()
            console.log(chalk.bold(entry))
          }
          if (print) console.log(line);
        });
        
      }
    })
}

module.exports = { addCommand }