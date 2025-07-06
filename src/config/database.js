const mongoose = require('mongoose');


const connectDB = async ()=> {
  await mongoose.connect("mongodb+srv://sgore1362:Ho2y8li50hDWxQd7@nodepractice.eir954w.mongodb.net/?retryWrites=true&w=majority&appName=NodePractice/Nodep");
};



module.exports={connectDB};

