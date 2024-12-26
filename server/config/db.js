import mongoose from 'mongoose';

const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/auth').then(() => {
        console.log('Database connected');
    }).catch((error)=>{
        console.log(error);
    })
};
export default connectDB;