import * as React from 'react'
import firebase from 'firebase'
import{Text, View, TouchableOpacity} from 'react-native'
import db from '../config'
import {Card} from 'react-native-elements'


export default class RecieverDetailsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
        UserID: firebase.auth().currentUser.email,
        UserName: "",
        RecieverID: this.props.navigation.getParam('details')["user_id"],
        RequestID: this.props.navigation.getParam('details')['request_id'],
        Reason: this.props.navigation.getParam('details')['reason_to_request'],
        BookName: this.props.navigation.getParam('details')['book_name'],
        RecieverName:"",
        RecieverContact:"",
        RecieverAddress:"",
        RecieverRequestDocID:"",

        }
    }
    getRecieverDetails=()=>{
    db.collection("UserDetails").where("email_id", "==", this.state.RecieverID).get()
    .then(text=>{
    text.forEach(doc=>{
        this.setState({
            RecieverName:doc.data().first_name + doc.data().last_name,
            RecieverContact: doc.data().contact,
            RecieverAddress:doc.data().address,

        })
    })
    })
    db.collection("Request").where("request_id", "==", this.state.RequestID).get()
    .then(text=>{
        text.forEach(doc=>{
            this.setState({
                RecieverRequestDocID: doc.id
            })
        })
    })
    }
    getUserDetails=()=>{
        db.collection("UserDetails").where("email_id","==",this.state.UserID).get()
        .then(text=>{
            text.forEach(doc=>{
                this.setState({
                    UserName:doc.data().first_name + " "+ doc.data().last_name
                })
            })
        })
    }
    componentDidMount(){
        this.getRecieverDetails()
        this.getUserDetails()
    }
    updateBookStatus=()=>{
    db.collection("Donations").add({BookName:this.state.BookName,
         RequestID:this.state.RequestID,
          RequestedBy:this.state.UserName, 
          DonorID:this.state.UserID, RequestStatus:'Donor Interested',})
}
addNotification=()=>{
    db.collection("Notifications").add({BookName:this.state.BookName,
    RecieverUserID:this.state.RecieverID,
    DonorID: this.state.UserID,
    RequestID:this.state.RequestID,
    Date:firebase.firestore.FieldValue.serverTimestamp(),
    NotificationStatus:"Unread",
    Message:this.state.UserName+" "+ "has shown interest in donating :)"
         })
}
    render(){
        return(
    <View>

    <View>
<Card title={"Book Information"} titleStyle={{fontSize:20, fontWeight:"bold"}}>
<Card>
<Text>
    Name: {this.state.BookName}
</Text>
</Card>
<Card>
    <Text>Reason: {this.state.Reason}</Text>
</Card>
</Card>


<Card title={"Reciever Information"} titleStyle={{fontSize:20, fontWeight:"bold"}}>
<Card>
<Text>
    Name: {this.state.RecieverName}
</Text>
</Card>
<Card>
    <Text>Address: {this.state.RecieverAddress}</Text>
</Card>
<Card>
    <Text>Contact: {this.state.RecieverContact}</Text>
</Card>
</Card>
    </View>
    {
        this.state.RecieverID!=this.state.UserID
        ?(
<TouchableOpacity style={{padding:20,
 justifyContent:'center',
 alignItems:'center',
  alignSelf:'center',
   backgroundColor:"Orange",
   borderRadius:5,
   borderWidth:10,
    borderBottomColor:"Black",
     borderColor:"orange"}}>
<Text   
onPress={()=>{
this.updateBookStatus();
this.addNotification();
alert("Success :)")
this.props.navigation.navigate('Donation')
}
}>I want To Donate!</Text>
</TouchableOpacity>
        ):(null)
        } 
    </View>
       
        )
    }
}