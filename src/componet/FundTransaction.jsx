import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Header, ListItem } from '@rneui/base'
import { globalStyle } from '../common/style'
import { balanceCalculation } from '../common/commonFunction'
import { DaliyExpenseContext } from '../context/dailyExpense'
import { delExpense } from '../common/daliyExpenseControl'
import TansactionItem from './TansactionItem'
const FundTransaction = ({ item }) => {
  const { expens, userData, getUserData } = useContext(DaliyExpenseContext)
  const [showmodal, setShowModal] = useState(false)
  const deleteExpense = (item) => {
    //console.log("delete",item);
    delExpense(item, userData.id, getUserData)

  }
  //console.log(expens.filter((eitem)=>eitem.credit_to===item.fundname||eitem.debit_by===item.fundname).reverse());


  return (
    <View>
      <ListItem bottomDivider onPress={() => setShowModal(!showmodal)}>
        <ListItem.Content>
          <ListItem.Title style={globalStyle.boldfont}>
            Fund Name: {item.fundname}
          </ListItem.Title>
          <ListItem.Subtitle>
            <View>
              <Text>Fund Type: {item.fundtype}</Text>
              <Text>Blance Rs. {balanceCalculation(item.fundname, expens).balance}

              </Text>
            </View>

          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <Modal visible={showmodal}>
        <Header color="secondary" />
        <Button color="secondary" title={item.fundname} />
        <View style={styles.balnceContainer}>          
          <Text>Cr. Rs. {balanceCalculation(item.fundname, expens).cr_blance}</Text>
          <Text>Dr. Rs. {balanceCalculation(item.fundname, expens).dr_blance}</Text>
          <Text>Rs. {balanceCalculation(item.fundname, expens).balance}</Text>
        </View>
        <ScrollView style={{ paddingHorizontal: 8 }}>
          {
            expens.filter((eitem) => eitem.credit_to === item.fundname || eitem.debit_by === item.fundname).reverse().map((item, index) =>
              <View >
                <TansactionItem item={item} key={index} deleteExpense={deleteExpense} />

              </View>
            )
          }
        </ScrollView>
        <Button title={"Close"} onPress={() => setShowModal(!showmodal)} />

      </Modal>
    </View>

  )
}

export default FundTransaction

const styles = StyleSheet.create({
  balnceContainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginVertical:2,
    paddingHorizontal:4,
    backgroundColor:"#ddd",
    paddingVertical:2, 
  }

})