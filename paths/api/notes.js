const router = require("express").Router();
const fs = require("fs");

router.get("/", (req, res) => {

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).json(err)
        }
        const notes = JSON.parse(data)
        res.json(notes)

    })
})


router.post('/', (req, res) => {

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).json(err)
        }

        let newUpdate = [];

        newUpdate = JSON.parse(data)

        const { title, text } = req.body;

        if (title && text) {

            const newTask = {
                title,
                text,
                id: newUpdate.length + 1,
            };

            newUpdate.push(newTask);

            const reviewString = JSON.stringify(newUpdate, null, 4);

            fs.writeFile("./db/db.json", reviewString, (err) =>
                err
                    ? console.error(err)
                    : console.log(
                        `Review has been written to JSON file`
                    )
            );

            const response = {
                status: 'success',
                body: reviewString,
            };

            console.log(response);
            res.status(201).json(response);

        }

    })
});



module.exports = router;