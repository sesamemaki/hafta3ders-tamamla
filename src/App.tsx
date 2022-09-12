import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import AddUserForm from './components/AddUserForm'
import UserList from './components/UserList'
import TransactionForm from './components/TransactionForm'
import TradeForm from './components/TradeForm'
import UserProducts from './components/UserProducts'
import UserExtre from './components/UserExtre'
import AddProductFrom from './components/AddProductForm'
import ProductList from './components/ProductList'

type Mode = 'products' | 'extre'
type UserProduct = {
  id: string
  productName: string
  price: number
}
type User = {
  id: string
  adSoyad: string
  bakiye: number
  products: Array<UserProduct>
  extre: Array<string>
}
type Product = UserProduct & { quantity: number }

function App() {
  const [userList, setUserList] = useState<Array<User>>([
    { id: '1', adSoyad: 'Hakan Özoğlu', bakiye: 1000, products: [], extre: [] },
    {
      id: '2',
      adSoyad: 'Pelin Hangişi',
      bakiye: 2000,
      products: [],
      extre: [],
    },
    { id: '3', adSoyad: 'Burcu Yılmaz', bakiye: 500, products: [], extre: [] },
    {
      id: '4',
      adSoyad: 'İlayda Yurttakalan',
      bakiye: 1500,
      products: [],
      extre: [],
    },
  ])

  const [productList, setProductList] = useState<Array<Product>>([
    { id: '1', productName: 'Laptop', quantity: 4, price: 100 },
  ])

  const [currentUser, setCurrentUser] = useState<string>()
  const [currentMode, setCurrentMode] = useState<Mode>()

  const handleChangeCurrentUser = (userId: string, mode: Mode) => {
    setCurrentUser(userId)
    setCurrentMode(mode)
  }

  const handleAddUser = (user: any) => {
    const values = {
      adSoyad: user.adSoyad,
      bakiye: Number(user.bakiye),
      id: String(Math.round(Math.random() * 5000)),
      products: [],
      extre: [],
    }
    setUserList([...userList, values])
  }

  const handleAddProduct = (prod: any) => {
    const values = {
      productName: prod.productName,
      quantity: Number(prod.quantity),
      id: String(Math.round(Math.random() * 5000)),
      price: Number(prod.price),
    }
    setProductList([...productList, values])
  }

  const handleSellProduct = (prod: any) => {}
  return (
    <div className="container">
      <div className="left">
        <div className="addUserForm">
          <AddUserForm onAddUser={handleAddUser} />
        </div>
        <div className="userList">
          <UserList
            currentUser={currentUser}
            userListData={userList}
            onChangeCurrentUser={handleChangeCurrentUser}
          />
        </div>
      </div>
      <div className="center">
        <div className="transactionForm">
          <TransactionForm />
        </div>
        <div className="tradeForm">
          <TradeForm />
        </div>
        {currentUser ? (
          currentMode === 'products' ? (
            <div>
              <UserProducts userId={currentUser} />
            </div>
          ) : currentMode === 'extre' ? (
            <div>
              <UserExtre userId={currentUser} />
            </div>
          ) : null
        ) : null}
      </div>
      <div className="right">
        <div className="addProductForm">
          <AddProductFrom onAddProduct={handleAddProduct} />
        </div>
        <div className="productList">
          <ProductList
            isSellVisible={Boolean(currentUser)}
            onSellProduct={handleSellProduct}
            productListData={productList}
          />
        </div>
      </div>
    </div>
  )
}

export default App
