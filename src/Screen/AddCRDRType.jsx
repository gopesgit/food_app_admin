import { Alert, KeyboardAvoidingView, Modal, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { globalStyle } from '../common/style'
import { Dropdown } from 'react-native-element-dropdown'
import { Button, Input, Icon, ListItem, Header } from '@rneui/base'
import { DaliyExpenseContext } from '../context/dailyExpense'
import { addFund } from '../common/daliyExpenseControl'
import { balanceCalculation } from '../common/commonFunction'
import FundTransaction from '../componet/FundTransaction'
const AddCRDRType = () => {
  const accountType = [
    { label: "Saving Account", value: "Saving Account" },
    { label: "Current Account", value: "Current Account" },
    { label: "Other", value: "Other" },
  ]
  const [fundname, setFundName] = useState();
  const [initval, setInitVal] = useState();
  const [fundtype, setFundtype] = useState();
  const [showModal, setShowModal] = useState(false)
  const { expens, fundType, userData, getUserData } = useContext(DaliyExpenseContext)
  const submitFund = () => {
    if (!fundname || !initval || !fundtype) {
      Alert.alert("Please fill all field")
      return
    }
    console.log({ fundname, initval, fundtype, id: userData.id });
    addFund({ fundname, initval, fundtype }, userData.id, getUserData)
    setFundName()
    setInitVal()
    setFundtype()
    setShowModal(false)
  }

  //console.log(expens);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ marginBottom: 2 }}>
        <Button title={"Add New Fund"} onPress={() => setShowModal(!showModal)} color="secondary" />
      </View>
      <Modal visible={showModal}>
        <Header />
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={{ marginBottom: 8 }}>
            <Button title={"Add New Fund"} onPress={() => submitFund()} color="secondary" />
          </View>
          <KeyboardAvoidingView>
            <View style={globalStyle.dorodownContainer}>
              <Text style={globalStyle.boldfont}>Account Type</Text>
              <Dropdown
                style={globalStyle.dropdown}
                data={accountType}
                labelField="label"
                valueField="value"
                placeholder="Select Fund Type"
                value={fundtype}
                onChange={(item) => {
                  //console.log("=>", item)
                  setFundtype(item.value)
                }}
              />
            </View>
            <View style={{ marginTop: 12 }}>
              <Input
                placeholder='fund like ICICI,SBI,PNB,cash....'
                value={fundname}
                onChangeText={(text) => setFundName(text)}
                leftIcon={
                  <Icon
                    type="material-community"
                    name="piggy-bank"
                    size={30}
                  />
                }
              />
            </View>
            <View>
              <Input
                placeholder='initial blance....'
                inputMode='numeric'
                value={initval}
                onChangeText={(text) => setInitVal(text)}
                leftIcon={
                  <Icon
                    type="font-awesome"
                    name="rupee"

                  />
                }
              />
            </View>

            <View style={{ marginBottom: 2 }}>
              <Button title={"Close"} onPress={() => setShowModal(!showModal)} color="secondary" />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {fundType &&
            fundType.map((item, index) =>
              <>
                <FundTransaction key={index} item={item} />
              </>
            )
          }
        </ScrollView>
      </View>
      <StatusBar style='auto' />
    </View>
  )
}

export default AddCRDRType

const styles = StyleSheet.create({})