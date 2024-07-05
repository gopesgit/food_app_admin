import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../common/style'
import { Dropdown } from 'react-native-element-dropdown'
import { Input, Icon, Button } from '@rneui/base'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { firebaseapp } from '../firebase/configurFirebase'
const AddExpenseType = () => {
  const expseType = [
    { label: "Fixed Expenses", value: "Fixed Expenses" },
    { label: "Variable Expenses", value: "Variable Expenses" },
    { label: "Savings and Investments", value: "Savings and Investments" },
    { label: "Debt Repayment", value: "Debt Repayment" },
    { label: "Discretionary Spending", value: "Discretionary Spending" },
    { label: "Irregular Expenses", value: "Irregular Expenses" },
    { label: "Financial Goals", value: "Financial Goals" },
    { label: "Miscellaneous", value: "Miscellaneous" },
  ]
  const [expenseType,setExpenseType]=useState()
  const [expenseCata,setexpenseCata]=useState()
  const db=getFirestore(firebaseapp);
  const sendToFireBase=async ()=>{
    try {
      const docRef=await addDoc(collection(db,"expenseTypes"),{"category":expenseCata,"label":expenseType,"value":expenseType})   
      console.log("Done=>",docRef.id);
    } catch (error) {
      console.log(error);
    }
   
    //console.log({"category":expenseCata,"label":expenseType,"value":expenseType});
  }
  return (
    <View style={styles.container}>
      <View style={globalStyle.dorodownContainer}>
        <Text style={globalStyle.boldfont}>Category</Text>
        <Dropdown
          style={globalStyle.dropdown}
          data={expseType}
          labelField="label"
          valueField="value"
          placeholder="Select"
          onChange={(item) => {
            console.log("=>", item)
            setexpenseCata(item.label)
          }}
        />
      </View>
      <View>
        <Input
          placeholder='Add Expense Type'
          onChangeText={(text)=>setExpenseType(text)}
          value={expenseType}
        />
      </View>
      <View>
        <Button title={"Add Expense Type"} onPress={()=>sendToFireBase()}/>
      </View>
      <StatusBar style='auto' />
    </View>
  )
}

export default AddExpenseType

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})