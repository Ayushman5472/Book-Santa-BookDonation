import * as React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import {MyHeader} from '../components/MyHeader'
import{Icon, ListItem} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'


export default class MyDonationScreen extends React.Component{
    constructor(){
        super()
        this.state={
        DonorID: firebase.auth().currentUser.email,
        DonorName:"",
        AllDonations:[],
        }
        this.requestRef= null
    }
    getDonorDetails=()=>{
    db.collection('UserDetails').where("email_id",'==',this.state.DonorID).get()
    .then(snapshot=>{
        snapshot.forEach(doc => {
        this.setState({
            DonorName:doc.data().first_name + " " + doc.data().last_name
        })
        });
    })
    }
    getDonations=()=>{
        this.requestRef= db.collection('Donations').where("DonorID",'==',this.state.DonorID)
        .onSnapshot(snapshot=>{
            var AllDonations=[]
            snapshot.docs.map(doc=>{
                var Donations= doc.data()
                Donations["docID"]=doc.id
                AllDonations.push(Donations)

            })
            this.setState({
                AllDonations:AllDonations
            })
        })
    }
    componentDidMount(){
      console.log("My Donation Screen")  
      this.getDonorDetails()
        this.getDonations()
        
    }
    componentWillUnmount(){
        this.requestRef
    }
    keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, i} ) =>{
      return (
        <ListItem
          key={i}
          title={item.BookName}
          subtitle={item.RequestedBy + item.RequestStatus}
          leftElement={
            <Icon name = "book"  type= "font-awesome" color="red"></Icon>
        }
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          rightElement={
            <TouchableOpacity onPress={()=>{
              this.sendBook(item)
          }}>
              <Text style={{color:'#ffff'}}>{item.RequestStatus=="Book Sent" ? "Book Sent": "Send Book"}</Text>
            </TouchableOpacity>
         
            }
           
          bottomDivider
        />
      )
    }
    sendBook=(data)=>{
if (data.RequestStatus==="Book Sent"){
    var RequestStatus="Donor Interested"
    db.collection("Donations").doc(data.docID).update({
        RequestStatus:"Donor Interested"
    }) 
    this.sendNotification(data,RequestStatus)
}else{
    var RequestStatus="Book Sent"
    db.collection("Donations").doc(data.docID).update({
        RequestStatus:"Book Sent"
    }) 
    this.sendNotification(data,RequestStatus)
}
    }
sendNotification=(BookDetails,RequestStatus)=>
{db.collection('Notifications').where("RequestID","==",this.state.requestID).where("DonorID","==",this.state.DonorID).get()
.then(snapshot=>{
snapshot.forEach(doc=>{
  var message
if (RequestStatus==="Book Sent"){
  message=this.state.DonorName + "Sent You a Book!"
}
else{
  message= this.state.DonorName + "Has Shown Interest In Donating A Book"
}
db.collection('Notifications').doc(doc.id).update({
  message:message,NotificationStatus:"Unread",date:firebase.firestore.FieldValue.serverTimestamp()
})
})
})}
    render(){
        return(
            <View style={{flex:1}} > 
            
            {//<MyHeader title="My Donations" navigation={this.props.navigation}></MyHeader>
    }
            <View style={{flex:1}}>
          {
            this.state.AllDonations.length === 0
            ?(
              <View >
                <Text style={{ fontSize: 20}}>List Of All Requested Books</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.AllDonations}
                renderItem={this.renderItem}
              />
            )
          }
          
        </View>
            </View>
            
        )
    }
  
}

/*const styles = StyleSheet.create
(
  {  button:{ width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    elevation : 16 },
  }
)*/
