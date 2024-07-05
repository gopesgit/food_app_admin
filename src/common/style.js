import { StyleSheet } from "react-native"

export const globalStyle = StyleSheet.create({
    pageTitle: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1e2225",
        marginBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#EAF0F1",
    },
    submitBtn: {
        backgroundColor: "#2B2B52",
        height: 40,
        marginHorizontal: 25,
        borderRadius: 80,
        justifyContent: "center",

    },
    btnText: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 24,
        fontWeight: "400",
    },
    linkText: {
        textAlign: "center",
    },
    link: {
        color: "red",
    },
    inputBox: {
        height: 40,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginVertical: 5,
        paddingLeft: 10,
        color: "#af9f85",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    dropdown: {  
        width:'100%',    
        borderWidth:1,  
        borderColor:"#999",     
        paddingLeft:8,
        color: "#af9f85",
        paddingVertical:2,                
    },
    dorodownContainer:{
        flexDirection:'column',       
        paddingHorizontal:8,
        justifyContent:'center',
        marginVertical:2,
        gap:8,
        
    },
    boldfont:{
        fontSize:18,
        fontWeight:'bold'
    },
    boldfontW:{
        fontSize:20,
        fontWeight:'bold',
        color:"#fff",
    },
    redfontbold:{
        fontSize:14,
        fontWeight:'bold',
        color:"#ff0000",
    },
    redfont:{
        fontSize:14,
        color:"#ff0000",
    }


})