import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { Input, Icon, Button } from '@rneui/base';
import { globalStyle } from '../common/style';
import { DaliyExpenseContext } from '../context/dailyExpense';
import { addExpense } from '../common/daliyExpenseControl';
import { balanceCalculation } from '../common/commonFunction';
const BankTransfer = ({ navigation, currentDate }) => {
    const { fundType, userData, getUserData,expens } = useContext(DaliyExpenseContext)
    const [drfund, setDRFund] = useState("Dr fund")
    const [crfund, setCRFund] = useState("Cr Fund")
    const [cost, setCost] = useState();
    const [desExpense, setdesExpense] = useState();
    const submitTransfer = () => {
        if (!drfund || !crfund || !desExpense || !cost || !currentDate) {
            Alert.alert("Please fill all field")
            return
        }
        //console.log({ fund, expense, currentDate, desExpense,cost,id:userData.id });
        const data = {
            expense_type: "Transfer",
            date: currentDate,
            description: desExpense,
            ammout: cost,
            debit_by: drfund,
            credit_to: crfund
        }
        setCost()
        setCRFund()
        setDRFund()
        setdesExpense()
        //console.log(data);
        addExpense(data, userData.id, getUserData);

    }
    return (
        fundType ?
            <View>
                <View style={{ marginVertical: 8 }}>
                <Button
                    title={"Transfer"}                    
                    onPress={() => submitTransfer()}
                    color="secondary"
                />
                </View>
                <View style={globalStyle.dorodownContainer}>
                    <Text style={globalStyle.boldfont}>From </Text>
                    <Dropdown
                        style={globalStyle.dropdown}
                        data={fundType}
                        labelField="fundname"
                        valueField="fundname"
                        placeholder="Select"
                        value={drfund}
                        search
                        onChange={(item) => {
                            setDRFund(item.fundname)
                        }}
                    />
                </View>
                {
                    fundType.filter((item) => item.fundname !== drfund).length ?
                        <View style={globalStyle.dorodownContainer}>
                            <Text style={globalStyle.boldfont}>To </Text>
                            <Dropdown
                                style={globalStyle.dropdown}
                                data={fundType.filter((item) => item.fundname !== drfund)}
                                labelField="fundname"
                                valueField="fundname"
                                placeholder="Select"
                                value={crfund}
                                search
                                onChange={(item) => {
                                    setCRFund(item.fundname)
                                }}
                            />

                        </View> :
                        <View>
                            <Button
                                title={"Add Fund Type"}
                                size='sm'
                                onPress={() => navigation.navigate('Add Fund Type')}
                            />
                        </View>
                }
                <View style={{marginTop:12}}>
                    <Input
                        value={desExpense}
                        onChangeText={(text) => setdesExpense(text)}
                        placeholder='Description of Transfer'
                        leftIcon={
                            <Icon
                                type="material-community"
                                name="note-text-outline"
                            />
                        }
                    />
                </View>
                <View >
                    <Input
                        value={cost}
                        onChangeText={(text) => setCost(text)}
                        inputMode='numeric'
                        placeholder={`${drfund} (Rs. ${balanceCalculation(drfund,expens).balance}) to ${crfund} (Rs. ${balanceCalculation(crfund,expens).balance})`}
                        leftIcon={
                            <Icon
                                type="font-awesome"
                                name="rupee"
                            />
                        }

                    />
                </View>
                
                
            </View> :
            <View>
                {!fundType &&
                    <Button
                        title={"Add Fund Type"}
                        size='sm'
                        onPress={() => navigation.navigate('Add Fund Type')}
                    />

                }
            </View>
    )
}

export default BankTransfer

const styles = StyleSheet.create({})