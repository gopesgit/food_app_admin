import { Icon, ListItem, Button } from '@rneui/base'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyle } from '../common/style'
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native'
const TansactionItem = ({ item, deleteExpense }) => {
    const [expan, setExpan] = useState(false)
    return (
        <Collapse style={styles.collapscontainer} onToggle={()=> setExpan(!expan)} >
            <CollapseHeader>
                <View style={styles.collaps}>
                    <View>
                    <Text style={globalStyle.boldfont}>{item.expense_type}</Text>
                    <Text>{item.date}</Text>
                    </View>
                    {item.expense_type === 'Opening Blance' ?
                       null
                        :
                        expan &&
                        <Icon
                            color="#ff0000"
                            type="material-community"
                            name="delete"
                            size={30}
                            onPress={() => deleteExpense(item)}
                        />

                    }
                </View>
                
            </CollapseHeader>
            <CollapseBody>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{item.description}</Text>
                    <Text>Rs. {item.ammout}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{item.debit_by && `Debit from:${item.debit_by}`}</Text>
                    <Text>{item.credit_to && `Credit To:${item.credit_to}`}</Text>
                </View>
            </CollapseBody>
        </Collapse>
    )
}
export default TansactionItem
const styles = StyleSheet.create({
    collaps:{ 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems:'center',
      
    },
    collapscontainer:{
        borderBottomColor:"#ddd",
        borderBottomWidth:1,
        borderTopColor:"#ddd",
        borderTopWidth:1,
        marginVertical:2
    }
})

