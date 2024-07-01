import express from "express"
import dotenv from "dotenv"
const app = express();


dotenv.config();
const PORT=process.env.PORT||4000;

app.get('/', (req, res) => {
  res.send('Hii Arohi')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})