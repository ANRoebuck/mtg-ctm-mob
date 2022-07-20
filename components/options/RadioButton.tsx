import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";


// https://stackoverflow.com/questions/31889921/how-to-implement-radio-button-in-react-native


interface iRadioButtonProps {
    onSelect: Function,
    isSelected: boolean,
    additionalStyles: {},
}

const RadioButton = ({ onSelect, isSelected }: iRadioButtonProps) => {  
    return (
        <TouchableWithoutFeedback onPress={() => onSelect()}>
            <View style={[{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                }]}>
                {
                    isSelected ?
                    <View style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000',
                    }}/>
                    : null
                }
            </View>
        </TouchableWithoutFeedback>
    );
  }

  export default RadioButton;