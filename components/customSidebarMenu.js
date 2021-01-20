import * as React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import firebase from 'firebase'
import {DrawerItems} from 'react-navigation-drawer'
import WelcomeScreen from '../screens/WelcomeScreen'

export default class CustomSidebarMenu extends React.Component{
render(){
    return(
        <View style = {{flex:1}}>
            <View style = {{flex:0.8}}>
            <DrawerItems {...this.props}>

            </DrawerItems>
            </View>
            <View style={{flex:0.2, justifyContent:'flex-end', padding:40}}>
                <TouchableOpacity onPress={()=>{firebase.auth().signOut(); this.props.navigation.navigate("WelcomeScreen")}}>
            
                    <Text>Log Out</Text>
                </TouchableOpacity></View>
     </View>  
    )

}
    
}