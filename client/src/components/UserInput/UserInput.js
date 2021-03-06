import React from 'react';
import './UserInput.css'
import Step1 from './Step1'
import Step2EZ from './Step2EZ'
import Step3EZ from './Step3EZ'
import Step2Detailed from './Step2Detailed'
import Step3Detailed from './Step3Detailed'
import Step4Detailed from './Step4Detailed'
import Step5Detailed from './Step5Detailed'
import Step6Detailed from './Step6Detailed'
import WrongPage from './WrongPage'
import API from "../../utils/api";

export default class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      totalPeople: '',
      EZcost: '',
      EZtotal: '',
      subtotal: 0,
      tax: '',
      taxPercent: 0,
      total: 0,
      names: [{number: `Person 1`, name: '', id: null, check: false, found: false, subtotal: 0, tax: 0, total: 0}],
      orders: [{number: `Order #1`, quantity: '', order: '', cost: '', association: []}],
      ownerID: this.props.ownerID,
      isAuthenticated: this.props.isAuthenticated,
      latitude: null,
      longitude: null,
      address: null,
    };
  }

  wrongStep = () => {
    this.setState({
      currentStep: 1
    });
  };

  nextStep = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1
    });
  };

  prevStep = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1
    });
  };

  nextJump = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1 + 100
    });
  };

  prevJump = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1 -100
    });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  changeEZTotal = (newTotal) => {
    this.setState({EZtotal: newTotal});
  }

  changeSubtotal = (newValue) => {
    this.setState({subtotal: newValue});
  }

  changeTax = (newValue) => {
    this.setState({tax: newValue});
  }

  setTax = () => {
    if(this.state.tax === ''){
      this.setState({tax: 0});
    }
  }

  changeTaxPercent = (subtotal,tax) => {
    var taxPercent = tax/subtotal;
    this.setState({taxPercent: taxPercent});
  }

  changeTotal = (newValue) => {
    this.setState({total: newValue});
  }

  changeOrderQuantity = (index) => e => {
    var newState = Object.assign({}, this.state);
    newState.orders[index].quantity = e.target.value;
    this.setState(newState);
  }

  checkOrderQuantity = () => {
    var size = this.state.orders.length;
    for (var i = 0; i < size; i++){
      if(this.state.orders[i].quantity === '' || this.state.orders[i].quantity <= 0){
        return true;
      }
    }
  }

  changeOrders = (index) => e => {
    var newState = Object.assign({}, this.state);
    newState.orders[index].order = e.target.value;
    this.setState(newState);
  }

  setOrders = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.orders.length;
    for (var i = 0; i < size; i++){
      if(newState.orders[i].order === ''){
        newState.orders[i].order = newState.orders[i].number;
        this.setState(newState);
      }
    }
  }

  changeOrderCost = (index) => e => {
    var newState = Object.assign({}, this.state);
    newState.orders[index].cost = e.target.value;
    this.setState(newState);
  }

  checkOrderCost = () => {
    var size = this.state.orders.length;
    for (var i = 0; i < size; i++){
      if(this.state.orders[i].cost === '' || this.state.orders[i].cost < 0){
        return true;
      }
    }
  }

  removeOrderSpecificRow = (index) => () => {
    var newState = Object.assign({}, this.state);
    newState.orders.splice(index,1);
    var size = newState.orders.length;
    for (var i = 0; i < size; i++){
      newState.orders[i].number = `Order #${i + 1}`;
    }
    this.setState(newState);
  }

  addOrderRow = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.orders.length;
    newState.orders.push({number: `Order #${size + 1}`, quantity: '', order: '', cost: '', association: []});
    this.setState(newState);
  }

  changeNames = (index) => e => {
    var newState = Object.assign({}, this.state);
    newState.names[index].name = e.target.value;
    this.setState(newState);
    if(newState.names[index].check && e.target.value !== '') {
      this.userSearch(index);
    }
  }

  changeEZNames = (index) => e => {
    var newState = Object.assign({}, this.state);
    newState.names[index].name = e.target.value;
    this.setState(newState);
    if(e.target.value !== '') {
      this.userSearch(index);
    }
  }

  setNames = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    for (var i = 0; i < size; i++){
      if(newState.names[i].name === ''){
        newState.names[i].name = newState.names[i].number;
        this.setState(newState);
      }
    }
  }

  changeCheck = (index) => e => {
    var newState = Object.assign({}, this.state);
    newState.names[index].check = e.target.checked;
    this.setState(newState);
    if(newState.names[index].check && newState.names[index].name !== '') {
      this.userSearch(index);
    }
  }

  userSearch = (index) => {
    var newState = Object.assign({}, this.state);
    var username = this.state.names[index].name;
    API.searchByUsername(username)
      .then((res) => {
      if (res.data !== null) {
        // console.log("found");
        newState.names[index].found = true;
        newState.names[index].id = res.data.userID;
      }
      else {
        // console.log("not found");
        newState.names[index].found = false;
      }
    })
    this.setState(newState);
  }

  checkUsers = () => {
    var size = this.state.names.length;
    for(var i = 0; i < size; i++){
      if(this.state.names[i].check === true && this.state.names[i].found === false){
        alert(this.state.names[i].name + " Is Not A User!");
        return false;
      }
    }
    return true;
  }

  checkEZUsers = () => {
    var size = this.state.names.length;
    for(var i = 0; i < size; i++){
      if(this.state.names[i].found === false){
        alert(this.state.names[i].name + " Is Not A User!");
        return false;
      }
    }
    return true;
  }

  removeNameSpecificRow = (index) => () => {
    var newState = Object.assign({}, this.state);
    newState.names.splice(index,1);
    var size = newState.names.length;
    for (var i = 0; i < size; i++){
      newState.names[i].number = `Person ${i + 1}`;
    }
    this.setState(newState);
  }
  
  addNameRow = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    newState.names.push({number: `Person ${size + 1}`, name: '', id: null, check: false, found: false, subtotal: 0, tax: 0, total: 0});
    this.setState(newState);
  }

  changeAssociation = (index,value) => {
    var newState = Object.assign({}, this.state);
    newState.orders[index].association = value;
    this.setState(newState);
  }

  checkAssociation = () => {
    var size = this.state.orders.length;
    for (var i = 0; i < size; i++){
      if(this.state.orders[i].association.length === 0){
        return true;
      }
    }
  }

  resetAssociation = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.orders.length;
    for (var i = 0; i < size; i++){
      newState.orders[i].association = [];
      this.setState(newState);
    }
  }

  setNameSubtotal = (name, total) => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    for (var i = 0; i < size; i++){
      if(newState.names[i].name === name){
        newState.names[i].subtotal += total;
        this.setState(newState);
      }
    }
  }

  setNamePayment = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    for (var i = 0; i < size; i++){
      var subtotal = newState.names[i].subtotal;
      var tax = Math.ceil(subtotal * this.state.taxPercent * 100) / 100;
      var total = (Math.round((+subtotal + +tax) *1e12)/1e12);
      newState.names[i].tax = tax;
      newState.names[i].total = total;
      this.setState(newState);
    }
  }

  resetNamePayment = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    for (var i = 0; i < size; i++){
      newState.names[i].subtotal = 0;
      newState.names[i].tax = 0;
      newState.names[i].total = 0;
      this.setState(newState);
    }
  }

  setNameTotal = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    var subtotal = 0;
    var tax = 0;
    var total = 0;
    for(var i = 0; i < size; i++){
      subtotal = (Math.round((+subtotal + +newState.names[i].subtotal) *1e12)/1e12);
      tax = (Math.round((+tax + +newState.names[i].tax) *1e12)/1e12);
      total = (Math.round((+total + +newState.names[i].total) *1e12)/1e12);
    }
    newState.names.push({number: `Total`, name: 'Total', check: false, found: false, subtotal: subtotal, tax: tax, total: total});
    this.setState(newState);
  }

  resetNameTotal = () => {
    var newState = Object.assign({}, this.state);
    newState.names.pop();
    this.setState(newState);
  }

  saveLocation = (latitude,longitude,address) => {
    this.setState({
      latitude: latitude,
      longitude: longitude,
      address: address,
    })
  }

  render() {
    const { currentStep , totalPeople } = this.state;
    const { EZcost, EZtotal } = this.state;
    const { subtotal, tax, taxPercent, total, names, orders} = this.state;
    const { ownerID, isAuthenticated, latitude, longitude, address } = this.state;
    const EZSplit = { totalPeople, EZcost, EZtotal, names };
    const DetailedSplit = { subtotal, tax, taxPercent, total, names, orders};
    const Owner = { ownerID, isAuthenticated, latitude, longitude, address };

    switch (currentStep){
      case 1:
        return(
          <div className = "container">
            <Step1
              nextStep = {this.nextStep}
              nextJump = {this.nextJump}
            />
          </div>
        );
      case 2:
        return(
          <div className = "container">
            <Step2EZ
              nextStep = {this.nextStep}
              prevStep = {this.prevStep}
              changeEZTotal = {this.changeEZTotal}
              handleChange = {this.handleChange}
              EZSplit = {EZSplit}
            />
          </div>
        );
      case 3:
        return(
          <div className = "container">
            <Step3EZ
              prevStep = {this.prevStep}
              changeEZNames = {this.changeEZNames}
              removeNameSpecificRow = {this.removeNameSpecificRow}
              addNameRow = {this.addNameRow}
              setNames = {this.setNames}
              checkEZUsers = {this.checkEZUsers}
              EZSplit = {EZSplit}
              Owner = {Owner}
            />
          </div>
        );
      case 102:
        return(
          <div className = "container">
            <Step2Detailed
              nextStep = {this.nextStep}
              prevJump = {this.prevJump}
              handleChange = {this.handleChange}
              changeSubtotal = {this.changeSubtotal}
              changeTotal = {this.changeTotal}
              setTax = {this.setTax}
              changeTaxPercent = {this.changeTaxPercent}
              changeOrderQuantity = {this.changeOrderQuantity}
              changeOrders = {this.changeOrders}
              changeOrderCost = {this.changeOrderCost}
              checkOrderQuantity = {this.checkOrderQuantity}
              setOrders = {this.setOrders}
              checkOrderCost = {this.checkOrderCost}
              removeOrderSpecificRow = {this.removeOrderSpecificRow}
              addOrderRow = {this.addOrderRow}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
      case 103:
        return(
          <div className = "container">
            <Step3Detailed
              nextStep = {this.nextStep}
              prevStep = {this.prevStep}
              changeNames = {this.changeNames}
              changeCheck = {this.changeCheck}
              removeNameSpecificRow = {this.removeNameSpecificRow}
              addNameRow = {this.addNameRow}
              setNames = {this.setNames}
              checkUsers = {this.checkUsers}
              DetailedSplit = {DetailedSplit}
              Owner = {Owner}
            />
          </div>
        );
      case 104:
        return(
          <div className = "container">
            <Step4Detailed
              nextStep = {this.nextStep}
              prevStep = {this.prevStep}
              changeAssociation = {this.changeAssociation}
              checkAssociation = {this.checkAssociation}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
      case 105:
        return(
          <div className = "container">
            <Step5Detailed
              nextStep = {this.nextStep}
              prevStep = {this.prevStep}
              resetAssociation = {this.resetAssociation}
              setNameSubtotal = {this.setNameSubtotal}
              setNamePayment = {this.setNamePayment}
              setNameTotal = {this.setNameTotal}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
      case 106:
        return(
          <div className = "container">
            <Step6Detailed
              prevStep = {this.prevStep}
              resetNameTotal = {this.resetNameTotal}
              resetNamePayment = {this.resetNamePayment}
              saveLocation = {this.saveLocation}
              DetailedSplit = {DetailedSplit}
              Owner = {Owner}
            />
          </div>
        );
      default:
        return(
          <div className = "container">
            <WrongPage
              wrongStep = {this.wrongStep}
            />
          </div>
        );
    }
  }
}
