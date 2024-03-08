import express from "express";
import weatherData from "./data.json" with { type: "json" }
import fs, { writeFileSync } from "fs"


const app = express();
const port = 4000;
app.use(express.json())
app.get('/', (req, res) => {
    res.send(data);
});

app.get('/:location', (req, res) => {
    const city = req.params.location
    const myData = weatherData.find(item => item.name.toLowerCase() === city.toLowerCase())
    if (myData)
        res.json({ data: myData, status: 200, message: "success" })
    else
        res.json({ data: null, status: 404, message: "Not found" })
})

app.post('/write',(req,res)=>{
    weatherData.push(req.body)
    fs.writeFileSync("data.json",JSON.stringify(weatherData))
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
