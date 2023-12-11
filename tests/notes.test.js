import {jest} from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({
    insertNote: jest.fn(),
    getDB: jest.fn(),
    saveDB: jest.fn()
}))

const {insertNote, getDB, saveDB} = await import('../src/db.js');
const {newNotes, getAllNotes, removeNote,} = await import('../src/notes.js');

beforeEach(() => {
    insertNote.mockClear();
    getDB.mockClear();
    saveDB.mockClear();
})

test('newNotes should insert a note', async () => {
    const note = {
        id: 1,
        content: 'test note',
        tags : ['tag1', 'tag2']
    }

    insertNote.mockResolvedValue(note);
    
    const result = await newNotes(note.content, note.tags);
    
    expect(result.content).toEqual(note.content);
    expect(result.tags).toEqual(note.tags); 
})

test('getAllNotes should return all notes', async () => {
    const db = {
        notes: ['note1', 'note2']
    }

    getDB.mockResolvedValue(db);

    const results = await getAllNotes();

    expect(results).toEqual(db.notes);
})

test('removeNotes should do nothing if id not found', async () => {
    const notes = [
        {id: 1, content: 'note1'},
        {id: 2, content: 'note2'}
    ]

    saveDB.mockResolvedValue(notes)
    const idToBeRemoved = 1
    const results = await removeNote(idToBeRemoved);
    expect(results).toBeUndefined();
})