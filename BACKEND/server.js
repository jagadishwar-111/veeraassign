const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")

const app = express();
const port = 3001;

app.use(cors())
app.use(bodyParser.json());

app.post('/api/interest-calculation', (req, res) => {
    
  const { principal, interest, time } = req.body;
 

  if (principal == "" || interest == "" || time == ""){
    res.status(400).json({errorMsg:'Enter all the Data'} );
  }

  else if ((isNaN(principal) === false ) || (isNaN(interest) === false ) || (isNaN(time) === false )) {
    const simpleInterest = (parseFloat(principal) * parseFloat(interest) * parseFloat(time)) / 100;
    
    res.json({ simpleInterest });
    
  }
  else {
    res.status(400).json({errorMsg:'Enter all the Data'} );
  }
  
 
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

