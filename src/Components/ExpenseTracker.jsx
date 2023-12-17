import React, { useState, useEffect } from 'react';
import './ExpenseTracker.css';
import {v4 as uuid4} from 'uuid'



const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  

  useEffect(() => {
    getExpenses().then((data) => setExpenses(data));
  }, []);
  

  async function getExpenses(){

    const url = 'http://localhost:4000/api/expenseList';
    const response = await fetch(url)
    return response.json()


  }



  const addExpense = () => {
    if (!description || !amount) {
      alert('Please enter both description and amount.');
      return;
    }
  
    const newExpense = {
      id: uuid4(), 
      description,
      amount: parseFloat(amount),
      timestamp: new Date().toLocaleString(),
    };
  
    
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setDescription('');
    setAmount('');
  
    const url = 'http://localhost:4000/api/expenses';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    };
  
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text().then(text => (text ? JSON.parse(text) : {}));
      })
      .catch(error => console.error('Fetch error:', error));
  };



  const removeExpense = async (id) => {
    
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  
   
    const url = `http://localhost:4000/api/expenseList/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log('Expense removed from the database');
    } catch (error) {
      console.error('Fetch error:', error);
      
    }
  };
  
  
  

  return (
    <div className="expense-tracker">
      <h2>Expense Tracker</h2>

      <div className="expense-form">
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addExpense}>Add Expense</button>
      </div>

      {expenses.length}

      <div className="expense-list">
        <div className="center-list">
          <h3>Expense List</h3>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                <strong>{expense.description}</strong> - ${expense.amount.toFixed(2)}
                <br />
                <small>{expense.timestamp}</small>
                <button onClick={async () => await removeExpense(expense.id)}>Remove</button>

              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default ExpenseTracker;