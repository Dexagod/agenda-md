## Installation

```
git clone https://github.com/Dexagod/agenda-md.git
```
In the installation folder
```
npm install
npm run build
```
In your .bashrc
```
alias agenda="node <install location>/bin/agenda.js"
```

## Options

### Create
Creates an agenda entry at `~/.agenda/entries`
Allows you to add participants. Any added participants are stored at `~/.agenda/agenda-manager/config/names.json`, and will be searchable for the next time you create an entry.

### Todos
Opens the todo lists of the last entries for a quick overview.

### Open 

Opens the agenda directory with your default editor.
Use the ```--editor``` option to choose a specific editor.

