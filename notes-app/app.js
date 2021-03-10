const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// add, remove, read, list

// add command
yargs.command({
    command: 'add',
    description: 'add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string',
        }, body: {
            describe: 'note body',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

// remove command
yargs.command({
    command: 'remove',
    description: 'remove an existing note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

// list command
yargs.command({
    command: 'list',
    description: 'list the existing notes',
    handler() {
        notes.listNotes();
    }
})

// read command
yargs.command({
    command: 'read',
    description: 'read an existing note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

yargs.parse()