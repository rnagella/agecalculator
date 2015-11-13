// import code we needed
var React = require('react-native');
var moment = require('moment');
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} = React;

// create a react component
var AgeCalculator = React.createClass({
  getDefaultProps: function () {
    let date = new Date();
    return {
      date: date,
      ageDay: date.getDate(),
      ageMonth: date.getMonth() + 1,
      ageYear: date.getFullYear()
    }
  },
  componentDidMount: function () {
    this.refs.birthMonth.focus();
  },
  getInitialState: function () {
    return {
      date: this.props.date,
      birthMonth: null,
      birthDay: null,
      birthYear: null,
      ageMonth: this.props.ageMonth,
      ageDay: this.props.ageDay,
      ageYear: this.props.ageYear,
      ageInYears: null,
      ageInMonths: null,
      ageInWeeks: null,
      ageInDays: null,
      ageInHours: null,
      ageInMinutes: null,
      ageInSeconds: null
    }
  },
  render: function () {
    return <View style={[styles.container]}>
      <View style={[styles.inputArea]}>
        {this.xLargeText('Age Calculator')}
        {this.mediumText('Enter date of birth')}
        <View style={styles.startdateView}>
          <TextInput ref='birthMonth' style={styles.textInput} 
          keyboardType={'number-pad'} placeholder={'MM'} 
          maxLength={2} value={this.state.birthMonth} 
          onChangeText={(text) => this.setState({birthMonth: text})}>
          </TextInput>
          <TextInput ref='birthDay' style={styles.textInput} keyboardType={'number-pad'} 
          placeholder={'DD'} maxLength={2}
          onChangeText={(text) => this.setState({birthDay: text})}>
          </TextInput>
          <TextInput ref='birthYear' style={styles.textInput} keyboardType={'number-pad'} 
          placeholder={'YYYY'} maxLength={4}
          onChangeText={(text) => this.setState({birthYear: text})}>
          </TextInput>
        </View>
        {this.mediumText('Age at the date of')}
        <View style={styles.startdateView}>
          <TextInput ref='ageMonth' keyboardType={'number-pad'} placeholder={'MM'} 
          maxLength={2} style={styles.textInput}
          defaultValue={this.state.ageMonth.toString()}
          onChangeText={(text) => this.setState({ageMonth: text})}>
          </TextInput>
          <TextInput ref='ageDay' keyboardType={'number-pad'} placeholder={'DD'} 
          maxLength={2} style={styles.textInput}
          defaultValue={this.state.ageDay.toString()}
          onChangeText={(text) => this.setState({ageDay: text})}>
          </TextInput>
          <TextInput ref='ageYear' keyboardType={'number-pad'}  
          maxLength={4} style={styles.textInput} 
          defaultValue={this.state.ageYear.toString()}
          value={this.state.ageYear} 
          onChangeText={(text) => this.setState({ageYear: text})}>
          </TextInput>
        </View>
        {this.calculateButton()}
      </View>

      <View style={[styles.outputArea]}>
        {this.ageText('Age in Years ', this.state.ageInYears)}
        {this.ageText('Age in Months ', this.state.ageInMonths)}
        {this.ageText('Age in Weeks ', this.state.ageInWeeks)}
        {this.ageText('Age in Days ', this.state.ageInDays)}
        {this.ageText('Age in Hours ', this.state.ageInHours)}
        {this.ageText('Age in Minutes ', this.state.ageInMinutes)}
        {this.ageText('Age in Seconds ', this.state.ageInSeconds)}
      </View>
    </View>
  },
  onDateChange: function (date) {
    this.setState({
      date: date
    });
  },
  ageText: function (lable, value) {
    return <View style={styles.ageText}>
      <Text style={styles.ageTextLabel}>
        {lable}
      </Text>
      <Text style={styles.ageTextValue}>
        {value}
      </Text>
    </View>
  },
  xLargeText: function (data) {
    return <Text style={[styles.xLargeText]}>
      {data}
    </Text>
  }, 
  mediumText: function (data) {
    return <Text style={styles.mediumText}>
      {data}
    </Text>
  },
  calculateButton: function () {
    return <TouchableHighlight onPress={this.onCalculateButton} underlayColor="gray" style={[styles.calculateButton]}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>
        Calculate
      </Text>
    </TouchableHighlight>
  },
  onTextChange: function (text) {
    console.log(text);
    this.setState({
      birthMonth: text
    });
  },
  onCalculateButton: function () {
    // Don't want to close the textfields individually. checkout 
    // the discussion https://github.com/facebook/react-native/issues/113
    this.refs.birthMonth.blur();
    this.refs.birthDay.blur();
    this.refs.birthYear.blur();
    this.refs.ageMonth.blur();
    this.refs.ageYear.blur();

    let ageYear = this.state.ageYear,
      ageMonth = this.state.ageMonth,
      ageDay = this.state.ageDay,
      birthYear = this.state.birthYear,
      birthMonth = this.state.birthMonth,
      birthDay = this.state.birthDay;

    let birthDate = moment([birthYear, birthMonth, birthDay]);
    let ageDate = moment([ageYear, ageMonth, ageDay]);

    let ageInYears = ageDate.diff(birthDate, 'years');
    let ageInMonths = ageDate.diff(birthDate, 'months');
    let ageInWeeks = ageDate.diff(birthDate, 'weeks');
    let ageInDays = ageDate.diff(birthDate, 'days');
    let ageInHours = ageDate.diff(birthDate, 'hours');
    let ageInMinutes = ageDate.diff(birthDate, 'minutes');
    let ageInSeconds = ageDate.diff(birthDate, 'seconds');

    this.setState({
      ageInYears : ageInYears,
      ageInMonths: ageInMonths,
      ageInWeeks: ageInWeeks,
      ageInDays: ageInDays,
      ageInHours: ageInHours,
      ageInMinutes: ageInMinutes,
      ageInSeconds: ageInSeconds
    });
  }
});

// style the reac component
var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  inputArea: {
    flex: 5,
    justifyContent: 'space-around'
  },
  outputArea: {
    flex: 6,
    justifyContent: 'space-around'
  },
  xLargeText: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mediumText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  textInput: {
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1
  },
  startdateView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  calculateButton: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 4,
    padding: 5
  },
  ageText: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ageTextLabel: {
    marginLeft: 10,
    fontSize: 20
  },
  ageTextValue: {
    fontWeight: 'bold',
    fontSize: 20
  }
});

// show the react component on the screen
AppRegistry.registerComponent('agecalculator', () => AgeCalculator);
