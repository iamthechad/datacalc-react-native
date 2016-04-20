/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

const data = require('./data/data.json');

class DataCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = this.createInitialState();
    console.log('Constructor');
  }

  createInitialState() {
    var getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };

    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID + ':' + rowID];
    };

    return {
      dataSource: new ListView.DataSource({
          getSectionData: getSectionData,
          getRowData: getRowData,
          rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  })
  }
  }

  render() {
    return (
      <View style={styles.container}>
  <View style={styles.header}>
  <Text style={styles.headerText}>Data!</Text>
    </View>
    <ListView
    dataSource = {this.state.dataSource}
    style      = {styles.listview}
    renderRow  = {this.renderRow}
    renderSectionHeader = {this.renderSectionHeader}
  />
  </View>
  );
  }

  renderSectionHeader(sectionData, sectionID) {
    console.log('SECTION HEADER');
    return (
      <View style={styles.header}>
  <Text style={styles.headerText}>{sectionData}</Text>
    </View>
  );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View style={styles.rowStyle}>
  <Text style={styles.rowText}>{rowData.name}</Text>
    </View>
  );
  }

  componentDidMount() {
    console.log('Component did mount');
    var i;
    var j;
    var dataBlob = {};

    var sectionIds = [];
    var rowIds = [];

    console.log('Fancy data', { data: data });

    for (i = 0; i < data.categories.length; i++) {
      const category = data.categories[i];

      sectionIds.push(category.id);

      dataBlob[category.id] = category.name;

      rowIds[i] = [];

      for (j = 0; j < category.items.length; j++) {
        const item = category.items[j];
        rowIds[i].push(item.id);

        dataBlob[category.id + ':' + item.id] = item;
      }
    }

    console.log('Parsed data', { sections: sectionIds, rows: rowIds, dataBlob: dataBlob });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    flexDirection: 'column',
    paddingTop: 10
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  rowStyle: {
    paddingVertical: 20,
    paddingLeft: 16,
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: '#E0E0E0',
    borderWidth: 1
  },
  rowText: {
    color: '#212121',
    fontSize: 16
  }
});

AppRegistry.registerComponent('DataCalculator', () => DataCalculator);
