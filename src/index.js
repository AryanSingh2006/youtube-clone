import dotenv from "dotenv";
import connectDB from "./db/index.db.js";
import app from "./app.js"

const PORT = process.env.PORT || 8000;

dotenv.config({
  path : '/env'
})

connectDB()
  .then(() => {
    app.listen(PORT, ()=>{
      console.log(`server is live on http://localhost:${PORT}`);
    })
  })
  .catch((error) => {
    console.log("Error connecting DB:", error)
  });
