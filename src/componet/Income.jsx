import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { Input, Icon, Button } from '@rneui/base'
import { globalStyle } from '../common/style'
import { DaliyExpenseContext } from '../context/dailyExpense'
import { addExpense } from '../common/daliyExpenseControl'
const Income = ({ navigation, currentDate }) => {
    const { fundType, userData, getUserData, incomeType } = useContext(DaliyExpenseContext)
    const [crfund, setCRFund] = useState()
    const [sourceincome, setSourceIncome] = useState()
    const [desIncome, setdesIncome] = useState();
    const [cost, setCost] = useState();
    const submitIncome = () => {
        //console.log({ crfund, currentDate, sourceincome, desIncome,cost });
        if (!crfund ||!desIncome || !cost || !currentDate || !sourceincome) {
            Alert.alert("Please fill all field")
            return
        }
        const data = {
            expense_type: "Income",
            date: currentDate,
            description: desIncome,
            ammout: cost,
            debit_by: null,
            credit_to: crfund
        }
        setCRFund()
        setSourceIncome()
        setdesIncome()
        setCost()
        //console.log(data);
        addExpense(data, userData.id, getUserData);
    }
    return (
        (fundType && incomeType) ?
            <View>
                <View style={{ marginVertical: 8 }}>
                    <Button
                        title={"Income"}
                        onPress={() => submitIncome()}
                        color="secondary"
                    />
                </View>

                <View style={globalStyle.dorodownContainer}>
                    <Text style={globalStyle.boldfont}>Income Source</Text>
                    <Dropdown
                        style={globalStyle.dropdown}
                        data={incomeType}
                        labelField="label"
                        valueField="value"
                        placeholder="Select"
                        value={sourceincome}
                        onChange={(item) => {
                            //console.log("=>", item)
                            setSourceIncome(item.value)
                        }}
                    />
                </View>
                <View style={globalStyle.dorodownContainer}>
                    <Text style={globalStyle.boldfont}>Cr. To</Text>
                    <Dropdown
                        style={globalStyle.dropdown}
                        data={fundType}
                        labelField="fundname"
                        valueField="fundname"
                        placeholder="Select"
                        value={crfund}
                        search
                        onChange={(item) => {
                            setCRFund(item.fundname)
                        }}
                    />

                </View>
                <View style={{ marginTop: 12 }}>
                    <Input
                        value={desIncome}
                        onChangeText={(text) => setdesIncome(text)}
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
                        placeholder='Rs.'
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
                        title={'Add Fund Type'}
                        size='sm'
                        style={{ marginVertical: 4 }}
                        onPress={() => navigation.navigate('Add Fund Type')}
                    />}
            </View>
    )
}
export default Income
const styles = StyleSheet.create({})