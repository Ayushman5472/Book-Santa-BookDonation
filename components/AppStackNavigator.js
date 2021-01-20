import * as React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import BookDonateScreen from '../screens/BookDonateScreen'
import RecieverDetailsScreen from '../screens/RecieverDetailsScreen'

export const AppStackNavigator = createStackNavigator({
    BookDonate: {screen:BookDonateScreen},
    RecieverDetails : {screen:RecieverDetailsScreen}

},
{
    initialRouteName:'BookDonate'
}
)