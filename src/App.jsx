import { useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import './App.css'
import MyImage from './assets/MyImage.png'
import Image from './assets/Image.png'
import { Themecontext } from './themecontext'

function App() {
  // localstorage
function getinitialtransaction(){
  const savedtransaction = localStorage.getItem("transaction")
  return savedtransaction ?
  JSON.parse(savedtransaction) :[]
}
// transaction reducer
function transactionReducer(state,action){
  switch(action.type){
    case "ADD" :
      return [...state,action.payload]

    case "Delete":
      return state.filter(item=> item.id !== action.payload
      )
    case "Edit" :
      return state.map(item=> item.id === action.payload.id 
        ?
        action.payload 
        :item
      )
    default:
      return state    
  }

}
// use ref
const amountref =useRef (null);
const categoryref =useRef(null)
 const[amount,setamount]=useState('')
 const[category,setcategory]=useState('')
 const[description,setdescription]=useState('')
const[transaction,dispatch]=useReducer(
  transactionReducer ,[],
  getinitialtransaction
)
const[income,setincome]=useState('')
const incomeref=useRef(null)
const[search,setsearch]=useState('')
const[selectcategory,setselectcategory]=useState('')
const[editid,seteditid]=useState(null)
// for income focus
function alerted(){
  incomeref.current.focus()
}
function alertedamount(){
  amountref.current.focus()
}
function alertedcategory(){
  categoryref.current.focus()
}

// use context
const {mode ,setmode} =useContext(Themecontext)



// display or add expensese 
function handlertransaction(){
 if(!amount){
    amountref.current.focus()
    
    return
  }

  if(!category){
    categoryref.current.focus()
    return
  } 
if(editid !== null){
const updatetransaction = {
  id :editid,
  amount: parseFloat(amount),
  category: category,
  description :description

}
dispatch({
  type : "Edit",
  payload :updatetransaction
})
}
else{
const newtransactions = {
  id : Date.now(),
  amount: parseFloat(amount),
  category,
  description
}
dispatch({
  type :"ADD",
  payload :newtransactions
})

}

setamount('')
setcategory('')
setdescription('')
seteditid(null)
}

// Delete button
const deletetransaction = useCallback((id) => {
  dispatch({
    type: "Delete",
    payload: id
  })
}, [])
// edit button
const edittransaction = useCallback((id) => {
  const edittransactions = transaction.find(
    item => item.id === id
  )

  setamount(edittransactions.amount)
  setcategory(edittransactions.category)
  setdescription(edittransactions.description)
amountref.current.focus()
  seteditid(id)
}, [transaction])
// search 
const filteredtransaction= transaction.filter((item)=>{
const matchsearch = item.category.toLowerCase().includes(search.toLowerCase())
const matchcategory = selectcategory === ''|| item.category === selectcategory

return matchcategory && matchsearch
})

// total expense
const expensesummary=useMemo(()=>{
const totalexpense = transaction.reduce(
  (total, item) =>total +item.amount ,
  0 
)
const foodexpense = transaction.filter(
  (item)=>item.category === 'food').reduce((total,item)=>total+item.amount ,0)
const transpotexpense = transaction.filter(
  (item)=>item.category === 'transport').reduce((total,item)=>total+item.amount ,0)
const shoppingexpense = transaction.filter(
  (item)=>item.category === 'shopping').reduce((total,item)=>total+item.amount ,0)
const billexpense = transaction.filter(
  (item)=>item.category === 'bills').reduce((total,item)=>total+item.amount ,0)
  return{
   totalexpense,
   foodexpense,
    transpotexpense,
  shoppingexpense,
   billexpense
}

},[transaction])

// useeffect for saved item 
useEffect(()=>{
localStorage.setItem("transaction",JSON.stringify(transaction) )
},[transaction])
// setsaving
const saving = Math.max( 0,Number(income || 0) - expensesummary.totalexpense)


  return (
    <div className={mode ? "dark-app" : "app"}>
    {/* header */}
      <header>
     {/* <h1>Expense Tracker</h1> */}
   <img
    id="img1"
    src={MyImage}
    alt="Expense Tracker Logo"
   />

     <div className="header-actions">
      <span>
       Dashboard
      </span>
      <button className='btn-style' onClick={()=>setmode(!mode) }>{mode ? "☀️ Light Mode" : "🌙 Dark Mode"}   </button>
     </div>
      </header>
        < hr/>
      {/*section */}
      <section className='summary'>
        <div className='summary-card'><h2>Income💰</h2>
        <p>${income||0} </p>
        </div>
        <div className='summary-card'><h2>Expense💸</h2>
        <p>${expensesummary.totalexpense}</p>
        </div>
        <div className='summary-card'><h2> Saving🏦 </h2>
        <p>${saving}</p>
        </div>
      </section>
       <hr></hr>
      {/* {/* Add expense */}
      <div className='expense_area'>
      <section id='Add_expense'>
        <div><h2>ADD EXPENSE</h2>
        <h3 onClick={alerted}>Income</h3>
        <input type="Number" ref={incomeref} id="number" placeholder='Enter your income e.g $70000' value={income} onChange={(e)=>setincome(e.target.value)} />
      
        <h3 onClick={alertedamount}>Amount</h3>
        <input type="text" name="" id="amount" placeholder='$ 500' value={amount} ref={amountref} onChange={(e)=>setamount(e.target.value)}/>
        <h3 onClick={alertedcategory}>Category</h3>
        <select id='select_expense'value={category} ref={categoryref} onChange={(e)=>setcategory(e.target.value)}>
          <option value="all">Select Category ▼</option>
          <option value="food">🍔 food</option>
          <option value="transport">🚗 Transport</option>
          <option value="shopping">🛒 Shopping</option>
          <option value="bills">💡 Bills</option>
        </select>
        <h3>
          Description
        </h3>
        <textarea  id="textarea" rows={8} cols={30} placeholder='write description about your expense' value={description} onChange={(e)=>setdescription(e.target.value)} ></textarea>
        </div>
        <button className='btn_style2' onClick={handlertransaction}>{editid !==null ? "Update Expense" :"+ Add Expense"}</button>
      </section>
 
      {/* add summary */}
      <section id='add_summary'>
  <h2>EXPENSE SUMMARY</h2>

  <h3>
    Total: ${expensesummary.totalexpense}
  </h3>

  <h4>
    Food: ${expensesummary.foodexpense}
  </h4>

  <h4>
    Transport: ${expensesummary.transpotexpense}
  </h4>

  <h4>
    Shopping: ${expensesummary.shoppingexpense}
  </h4>

  <h4>
    Bills: ${expensesummary.billexpense}
  </h4>
 <img
  className="summary-img"
  src={Image}
  alt="Expense illustration"
/>

</section>
      
</div>
     <hr></hr>
{/* transaction */}
<div>
  <h2 id='heading1'>TRANSACTIONS</h2>



  <div id='transaction-control'>
    <div>
    <label>Search :</label>  
     <input type="text" id="sreach" placeholder=' Sreach Expense' value={search} onChange={(e)=>setsearch(e.target.value)}/> 
    </div>
   <div>
     <label>Category:</label>
     <select  id="Select_category" value={selectcategory} onChange={(e)=>setselectcategory(e.target.value)}>
    <option value="">Select Category</option>
<option value="food">🍔 Food</option>
<option value="transport">🚗 Transport</option>
<option value="shopping">🛒 Shopping</option>
<option value="bills">💡 Bills</option>
</select>
   </div>
   </div> 


 <div className="table-container">
<table border={1} id='table1'>
  <thead>
    <tr>  
      <th>Id</th>
    <th>Category</th>
    <th>price</th>
    <th colSpan={2}>Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredtransaction.map((item)=>(
    <tr key={item.id}>
 <td>{item.id}</td>     
<td>{item.category}</td>
<td>{item.amount}</td>
<td><button id='btn_style4' onClick={()=>edittransaction(item.id)}>
 Edit ✏️
</button>
 </td>
<td >
  <button
    onClick={()=>deletetransaction(item.id)} id='btn_style3'>Delete 🗑️
  </button>
</td>
    </tr>
    ))}
  
    </tbody>
   </table>
     </div>
   </div>

    </div>
  )
}

export default App
