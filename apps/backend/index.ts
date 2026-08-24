import express from "express";

const app = express();

app.use(express.json());

app.post("api/v1/pre-interview", (req,res) => {

})
app.listen(3001);