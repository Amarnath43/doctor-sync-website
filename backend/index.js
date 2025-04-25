require("dotenv").config(); 
const config=require("./config")

const app=require("./app")

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`)
})

