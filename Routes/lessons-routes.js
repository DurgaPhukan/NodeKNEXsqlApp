const express = require("express");
const Lessons = require("../models/dbHelpers");

const router = express.Router();

router.post("/", (req, res) => {
  const newPost = req.body;
  Lessons.add(newPost)
    .then((lesson) => {
      res.status(200).json(lesson);
    })
    .catch((err) => {
      res.status(500).json({ messsage: "Could not add lesson" });
      console.log(err);
    });
});

router.get("/", (req, res) => {
  Lessons.find()
    .then((lessons) => {
      res.status(200).json(lessons);
    })
    .catch((err) => {
      res.status(500).json({ message: "Unabble to retrive lessons" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Lessons.findById(id)
    .then((lesson) => {
      if (lesson) {
        res.status(200).json(lesson);
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Unable to perform operation" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Lessons.remove(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Successfully deleted ${count} lesson` });
      } else {
        res.status(404).json({ message: "Lesson does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Unable to delete" });
    });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  // console.log(id, changes);
  Lessons.update(id, changes)
    // .then((lesson) => {
    //   if (lesson.length > 0) {
    //     res.status(200).json(lesson);
    //   } else {
    //     res.status(404).json({ message: "Record not found" });
    //   }
    // })
    .then((lesson) => {
      if (lesson) {
        // console.log(lesson);
        res.status(200).json(lesson);
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating record" });
    });
});

// ------Messages routes-------------------------
// {
//   "sender" : 'Brett',
//   "text":"I like js codes",
// }

router.post("/:id/messages", (req, res) => {
  const { id } = req.params;
  const msg = req.body;

  if (!msg.lesson_id) {
    msg["lesson_id"] = parseInt(id, 10);
  }
  Lessons.findById(id)
    .then((lesson) => {
      if (!lesson) {
        res.status(404).json({ message: "Invalid id" });
      }
      // check for all required fields
      if (!msg.sender || !msg.text) {
        res
          .status(400)
          .json({ message: "Must provide both sender and Text vallues" });
      }

      Lessons.addMessage(msg, id)
        .then((message) => {
          if (message) {
            res.status(200).json(message);
          }
        })
        .catch((error) => {
          res.status(500).json({ message: "Failed to add message" });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error finding lesson" });
    });
});

router.get("/:id/messages", (req, res) => {
  const { id } = req.params;
  Lessons.findLessonMessages(id)
    .then((lessons) => {
      res.status(200).json(lessons);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retriving messages" });
    });
});

module.exports = router;
