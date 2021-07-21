import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class TopProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataTopProduct: []
        }
    }

    componentDidMount () {
      this.getData()
    };

    getData = async () => {
      fetch('http://192.168.1.3/shop/public/show-banner-api')
      .then((response) => response.json())
      .then((json) => 
      {
        //   console.log(json);
          this.setState({
            dataTopProduct: json,
          });
      })
      .catch((error) => {console.log(error);
      })
    }

    renderItem = ({item, index}) => {
        return (
            <View style={{paddingTop: 10}}>
                <Image source={{uri:'http://192.168.1.3/shop/public/source/image/product/' + item.image}} style={styles.images} ></Image>
                <Text>{item.title}</Text>
            </View>
        );
    }

    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    images: {
        height: 200,
        width: 200,
    }
})