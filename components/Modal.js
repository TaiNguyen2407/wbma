import React, { useState } from "react";
import { Text, Modal, View, Button } from "react-native";

const ModalTester = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  return (
    <View style={{flex:1}}>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  )
}

export default ModalTester;
