const inquirer = require('inquirer');
const inquirerPrompt = require('inquirer-autocomplete-prompt');
const fuzzy = require('fuzzy')
const fs = require('fs')
const os = require('os')
const child_process = require('child_process')

function addCommand(program, programOptions) {

  let names = []

  if (fs.existsSync(programOptions.namesFile)) {
    names = JSON.parse(fs.readFileSync(programOptions.namesFile))
    if (!names.includes('')) names = [''].concat(names)
  } 

  let participants = []

  program
      .command('create')
      .description('Utility to add an agenda entry.')
      .action(async (options) => {

        let title = (await inquirer.prompt([
            {
              type: 'input',
              name: 'title',
              message: 'Meeting title'
          }
        ])).title || "No title"
        
        console.log(`Add participants to entry: ${title}`)

        inquirer.registerPrompt('autocomplete', inquirerPrompt);

        let name;
        while (true) { 
          name = (await inquirer.prompt([
            {
              type: 'autocomplete',
              name: 'participant',
              message: 'Add meeting participant',
              source: searchNames
            }
          ])).participant
          if (name) {
            participants.push(name)
            console.log()
            console.log('participants:')
            console.log(participants)
          } else { 
            break
          }
        }
        console.log()
        console.log('############# participants #############')
        for (let participant of participants) {
          console.log(participant)
        }


        let dateString = new Date().toISOString().split('T')[0]
        let titleDateString = dateString.slice(2)
        let fileName = `${programOptions.agendaEntriesDir}${titleDateString}_${title.replaceAll(' ', '-')}.md`
        


        let contents = 
`# ${title}

## Date

${dateString}

## Attendees

${
  participants.map(p => `* ${p}`).join('\n')
}

## Agenda

* 

## Notes

* 

## Next steps

* 

`
      
        fs.writeFileSync(fileName, contents, {encoding: "utf-8"})   
        
        for (let participant of participants) {
          if (!names.includes(participant.trim())) {
            names = names.concat([participant.trim()])
          }  
        }

        fs.writeFileSync(programOptions.namesFile, JSON.stringify(names, null, 2), {encoding: "utf-8"})

        console.log(`Created new file at ${fileName}`)
        child_process.spawn('code', [fileName], {
          stdio: 'inherit'
        });

        

      })

  async function searchNames(answers, input = '') {
    return new Promise((resolve) => {
      const results = fuzzy.filter(input, names.filter(x => participants.indexOf(x) === -1)).map((el) => el.original);
      resolve( results.indexOf(input) === -1 ? results.concat(input) : results)
    });
  }
}

module.exports = { addCommand }