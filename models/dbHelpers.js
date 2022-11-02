// where we write knex quarries

// -----if we dont have db env setup------
// const knex = require("knex");
// const config = require("../knexfile");
// const db = knex(config.development);

// -------if we have db env setupp in dbConfig---------
const db = require("../dbConfig");

// add , find, findByID, remove, update
module.exports = {
  add,
  find,
  findById,
  remove,
  update,

  addMessage,
  findLessonMessages,
  removeMessage,
};

async function add(lesson) {
  const [id] = await db("lessons").insert(lesson);
  return id;
}

function find() {
  return db("lessons");
}

function findById(id) {
  return db("lessons").where({ id: id }).first();
}

function remove(id) {
  return db("lessons").where({ id: id }).del();
}

function update(id, changes) {
  return db("lessons")
    .where({ id: id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}
function findMessageById(id) {
  return db("messages").where({ id: id }).first();
}

async function addMessage(message, lesson_id) {
  const [id] = await db("messages")
    .where({ lesson_id: lesson_id })
    .insert(message);
  return findMessageById(id);
}

function findLessonMessages(lesson_id) {
  return db("lessons as l")
    .join("messages as m", "l.id", "m.lesson_id")
    .select(
      "l.id as LessonID",
      "l.name as LessonName",
      "m.id as MessageID",
      "m.sender",
      "m.text"
    )
    .where({ lesson_id: lesson_id });
}

function removeMessage(id) {
  return db("messages").where({ id: id }).del();
}
