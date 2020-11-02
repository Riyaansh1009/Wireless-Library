import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native';
import * as Permisssions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';


export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCamPermissions: null,
      scanned: false,
      ScannedBookID: '',
      ScannedStudentID:'',
      buttonClicked: 'normal'
     } }

     getCamPermissions = async(id) =>{
       const {status} = await Permisssions.askAsync(Permisssions.CAMERA)
       this.setState({hasCamPermissions: status === "granted", buttonClicked: id, scanned: false})
     }
     handleBarcodeScanned = async({type,data}) =>{
       const {buttonClicked} = this.state
      if(buttonClicked === "BookID"){
        this.setState({
          scanned: true,
          ScannedBookID: data,
          buttonClicked: "normal"
        })
      }
      else if(buttonClicked === "StudentID"){
        this.setState({
          scanned: true,
          ScannedStudentID: data,
          buttonClicked: "normal"
        })
      }
      
     }
     render() {
       const hasCamPermissions = this.state.hasCamPermissions
       const scanned = this.state.scanned
       const buttonClicked = this.state.buttonClicked
       if(buttonClicked !== "normal" && hasCamPermissions) {
         return(
           <BarCodeScanner onBarCodeScanned ={scanned ? undefined : this.handleBarcodeScanned}/> 
         )
       }
       else if(buttonClicked === "normal"){

       
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Image source = {require ("../assets/booklogo.jpg")} style = {{
              width:200,
              height: 200
            }}/> 
            <Text style = {{
              textAlign: "center",
              fontSize: 30
              }}> Wireless Library</Text>
          </View>
          <View style = {styles.inputView}>
              <TextInput style = {styles.inputBox} placeholder = "BookID" value = {this.state.ScannedBookID}/> 
              <TouchableOpacity style = {styles.scanButton} onPress = {()=>{this.getCamPermissions("BookID")}}>
                <Text style = {styles.buttonText}> Scan</Text>
                 </TouchableOpacity>
          </View>
          <View style = {styles.inputView}>
              <TextInput style = {styles.inputBox} placeholder = "StudentID" value = {this.state.ScannedStudentID}/> 
              <TouchableOpacity style = {styles.scanButton} onPress = {()=>{this.getCamPermissions("StudentID")}}>
                <Text style = {styles.buttonText}> Scan</Text>
                 </TouchableOpacity>
          </View>
          
        </View>
      )};
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    }
  });
  