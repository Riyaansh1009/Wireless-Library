import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import{createBottomTabNavigator} from 'react-navigation-tabs';
import TransactionScreen from './screens/BookTransaction'
import SearchScreen from './screens/SearchScreen'


export default class App extends React.Component {
  render(){
  return (
    <AppContainer/>
  );
}}
const tabNavigator = createBottomTabNavigator({
  TransactionScreen: {screen:TransactionScreen},
  Search: {screen:SearchScreen},
})
const AppContainer = createAppContainer(tabNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
