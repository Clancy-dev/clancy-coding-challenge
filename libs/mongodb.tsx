import mongoose from 'mongoose';

// This function connects to MongoDB
export default async function mongoDBConnect(): Promise<void> {
  try {
    // Ensure that the environment variable exists and is a string
    const mongoDBUrl = process.env.MONGODB_URL as string;
    
    await mongoose.connect(mongoDBUrl);
    console.log("Connection successful");

  } catch (error: unknown) {
    // Type the error explicitly
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('An unknown error occurred');
    }
  }
}
