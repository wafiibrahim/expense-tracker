
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ExpenseSchema = new Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true }, 
  timestamp: { type: Date, required: true }
});

const ExpenseModel = model('Expense', ExpenseSchema);

export { ExpenseModel }; 
