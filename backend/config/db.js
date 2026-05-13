import mongoose from 'mongoose';

export const ConnectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://princerek17:vZFau1KAvYj93q7U@dim2door.1bus8cn.mongodb.net/Dim2Door?retryWrites=true&w=majority&tls=true',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("✅ Damn!! DB Connected.");
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
  }
};
