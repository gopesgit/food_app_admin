import { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { DaliyExpenseContext } from '../context/dailyExpense'
import { delExpense } from '../common/daliyExpenseControl'
import TansactionItem from '../componet/TansactionItem'
import { Button, Icon, Input } from '@rneui/base'
import { globalStyle } from '../common/style'
import { Dropdown } from 'react-native-element-dropdown'
import { balanceCalculationTransaction, formatDate } from '../common/commonFunction'
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
const ExpenseScreen = () => {
    const { expens, userData, getUserData } = useContext(DaliyExpenseContext)
    const [showdatePicker1, setShowDatePicker1] = useState(false);
    const [showdatePicker2, setShowDatePicker2] = useState(false);
    const [fdate, setFdate] = useState(new Date());
    let premonth = new Date();
    premonth.setDate((new Date()).getDate() - 30);
    const [fromdate, setFromdate] = useState(formatDate(premonth));
    const [todate, setTodate] = useState(formatDate(new Date()));
    const [filterItem, setFilterItem] = useState([]);
    const deleteExpense = (item) => {
        //console.log("delete",item);
        delExpense(item, userData.id, getUserData)

    }
    const showDatePicker = (data) => {
        if (data === "from") {
            setShowDatePicker1(true)
        }
        if (data === "to") {
            setShowDatePicker2(true)
        }
    }

    //console.log(filteredData);
    //console.log({ fromdate, todate,startDate });
    const [uniqueTran, setuniqueTran] = useState([])
    const [tran, setTrantype] = useState("")
    useEffect(() => {
        setuniqueTran()
        if (expens) {
            const uniqueTran = [...new Set(expens.map(item => item.expense_type))].map(item => ({ label: item, value: item }));
            uniqueTran.unshift({ label: "All", value: "all" });
            setuniqueTran(uniqueTran)
            const startDate = moment(fromdate, 'DD/MM/YYYY');
            const endDate = moment(todate, 'DD/MM/YYYY');
            setFilterItem(expens.filter(item => {
                const itemDate = moment(item.date, 'DD/MM/YYYY');
                return itemDate.isBetween(startDate, endDate, 'day', '[]');
            }))
        }
    }, [expens, fromdate, todate])
    //console.log(expens.filter((item)=>item.expense_type===tran));    
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                {expens &&
                    <View style={globalStyle.dorodownContainer}>
                        <Dropdown
                            style={globalStyle.dropdown}
                            data={uniqueTran}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Transaction Type"
                            onChange={(item) => {
                                console.log("=>", item)
                                setTrantype(item.value)
                            }}
                        />
                    </View>
                }
                <View style={[styles.balnceContainer, { backgroundColor: "#fff",marginTop:8}]}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Icon
                            size={30}
                            type="font-awesome"
                            name="calendar"
                            onPress={() => showDatePicker("from")} />
                        <Text style={globalStyle.boldfont}>{fromdate}</Text>
                        {showdatePicker1 && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={fdate}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowDatePicker1(false)
                                    setFdate(selectedDate)
                                    setFromdate(formatDate(selectedDate))
                                }}
                            />
                        )}
                        {showdatePicker2 && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={fdate}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowDatePicker2(false)
                                    setFdate(selectedDate)
                                    setTodate(formatDate(selectedDate))
                                }}
                            />
                        )}

                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Text style={globalStyle.boldfont}>{todate}</Text>
                        <Icon
                            type="font-awesome"
                            name="calendar"
                            onPress={() => showDatePicker("to")}
                            size={30}
                            />
                    </View>

                </View>
            </KeyboardAvoidingView>
            <ScrollView style={{ padding: 8 }}>
                {expens &&
                    tran &&
                    tran === "all" ?
                    <View style={styles.balnceContainer}>
                        <Text>Total:Rs. {Math.max(0, balanceCalculationTransaction(filterItem).balance)}</Text>
                        <Text>Cr.:Rs. {Math.max(0, balanceCalculationTransaction(filterItem).cr_blance)}</Text>
                        <Text>Dr.:Rs. {Math.max(0, balanceCalculationTransaction(filterItem).dr_blance)}</Text>
                    </View>
                    :
                    <View style={styles.balnceContainer}>
                        <Text>Total:Rs. {Math.max(0, balanceCalculationTransaction(filterItem.filter((item) => item.expense_type === tran)).balance)}</Text>
                        <Text>Cr.:Rs. {Math.max(0, balanceCalculationTransaction(filterItem.filter((item) => item.expense_type === tran)).cr_blance)}</Text>
                        <Text>Dr.:Rs. {Math.max(0, balanceCalculationTransaction(filterItem.filter((item) => item.expense_type === tran)).dr_blance)}</Text>
                    </View>
                }
                {expens &&
                    tran &&
                    tran === "all" ?
                    (filterItem).map((item, index) =>
                        <View>
                            <TansactionItem item={item} key={index} deleteExpense={deleteExpense} />
                        </View>
                    ).reverse() :
                    (filterItem.filter((item) => item.expense_type === tran)).map((item, index) =>
                        <View>
                            <TansactionItem item={item} key={index} deleteExpense={deleteExpense} />
                        </View>
                    ).reverse()
                }

            </ScrollView>
            <StatusBar style='auto' />
        </View>
    )
}
export default ExpenseScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 8,
        justifyContent: 'center',
    },
    balnceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
        paddingHorizontal: 8,
        backgroundColor: "#ddd",
        paddingVertical: 2,
    }
})

