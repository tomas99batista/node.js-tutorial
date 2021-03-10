const chalk = require('chalk');
const fs = require('fs');

const getNotes = () => {
    return "Your notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes();

    // const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log(chalk.green.inverse.bold('new note added'));
    } else {
        console.log(chalk.red.inverse.bold('note title taken'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => note.title !== title);

    // console.log(notesToKeep);
    if (notes.length === notesToKeep.length){
        console.log(chalk.red.inverse.bold('no note found'));
    } else {
        console.log(chalk.green.inverse.bold('note removed'));
        saveNotes(notesToKeep);
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.bold('--YOUR NOTES---'))
    notes.forEach((note) => console.log(`\t${note.title}`));
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    
    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log(chalk.yellow.inverse.bold(`\t${note.title}`));
        console.log(`\t${note.body}`);
    } else {
        console.log(chalk.red.inverse.bold('no note found'));
    }
}

module.exports = {
    getNotes: getNotes, 
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}