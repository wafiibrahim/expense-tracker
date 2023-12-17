



import express from 'express';
import { ExpenseModel } from './models/ExpenseSchema.mjs';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json()); 

app.get('/api', (req, res) => {
  
});

app.post('/api/expenses', async (req, res) => {
  await mongoose.connect('mongodb+srv://wafi:tlJWitZkP2IX5tS2@cluster0.l0h9hkm.mongodb.net/');

  const { id, description, amount, timestamp } = req.body;

  try {
    const expense = await ExpenseModel.create({ id, description, amount, timestamp });
    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/api/expenseList', async(req, res) =>{


  await mongoose.connect('mongodb+srv://wafi:tlJWitZkP2IX5tS2@cluster0.l0h9hkm.mongodb.net/');
  
  const expenses = await ExpenseModel.find();
  res.json(expenses)
})

app.delete(`/api/expenseList/:id`, async (req, res) => {
  const expenseId = req.params.id;
  console.log(`Received request to delete expense with ID: ${expenseId}`);

  await mongoose.connect('mongodb+srv://wafi:tlJWitZkP2IX5tS2@cluster0.l0h9hkm.mongodb.net/');

  try {
    console.log('Connected To DB');

    
    const deletedExpense = await ExpenseModel.findOneAndDelete({ id: expenseId });

    if (!deletedExpense) {
      console.log('Expense not found');
      return res.status(404).json({ message: 'Expense not found' });
    }

    console.log('Expense deleted successfully');
    res.json(deletedExpense);
  } catch (error) {
    console.error("Error during deletion", error);
    res.status(500).json({ error: error.message });
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});