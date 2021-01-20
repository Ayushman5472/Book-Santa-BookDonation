import * as React from 'react'
import firebase from 'firebase'
import db from '../config'
import {TextInput, View, TouchableOpacity, Text, StyleSheet} from 'react-native'

export default class SettingsScreen extends React.Component {
    constructor(){
        super()
        this.state={
            FirstName: "",
            LastName:"",
            Address:"",
            contact:"",
            emailID:"",
            docID:"",
        }
    }
    getDetails=()=>{
        var Email = firebase.auth().currentUser.email
    db.collection('UserDetails').where("email_id", "==", Email).get()
    .then(snapshot=>{
    snapshot.forEach(doc=>{
        var data = doc.data()
        this.setState(
{
        FirstName: data.first_name,
        LastName: data.last_name,
        emailID:data.email_id,
        contact:data.contact,
        Address:data.address,
        docID:doc.id
}

        )
    })
    })

    }
    componentDidMount(){
    this.getDetails()
    
    }

    updateDetails=()=>{
        console.log(this.state.docID)
    db.collection("UserDetails").doc(this.state.docID).update({
        first_name:this.state.FirstName,
        last_name:this.state.LastName,
        contact:this.state.contact,
        address:this.state.Address,
    })
    alert("Your Details Have Been Updated !")
    }
    render(){
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
<TextInput  style={Styles.TextInputStyle} value={this.state.FirstName} onChangeText={text=>{
    this.setState({
        FirstName:text
    })
}
}></TextInput>
<TextInput style={Styles.TextInputStyle}  value={this.state.LastName} onChangeText={text=>{
    this.setState({
        LastName:text
    })
}}></TextInput>
<TextInput style={Styles.TextInputStyle}  value={this.state.Address} onChangeText={text=>{
    this.setState({
        Address:text
    })
}}></TextInput>
<TextInput style={Styles.TextInputStyle}  value={this.state.emailID} onChangeText={text=>{
    this.setState({
        emailID:text
    })
}}></TextInput>
<TextInput style={Styles.TextInputStyle}  value={this.state.contact} onChangeText={text=>{
    this.setState({
        contact:text
    })
}}></TextInput>
<TouchableOpacity style={Styles.TouchableOpacityStyle} onPress={()=>{this.updateDetails()}}><Text>Update Details</Text></TouchableOpacity>
</View>

        )
    }
}
const Styles = StyleSheet.create={
    TextInputStyle:{
        padding:10,
        borderRadius:3,
        borderWidth: 5, 
        borderColor:'orange',
        alignItems:'center',
        height:40 , 
        width: "50%" ,
        alignSelf:'center',
    },
    TouchableOpacityStyle:{
        backgroundColor:'orange',
        width: "20%",
        height: 50,
        alignSelf:'center',
        borderColor:'black',
        borderRadius: 5,
    }
}
