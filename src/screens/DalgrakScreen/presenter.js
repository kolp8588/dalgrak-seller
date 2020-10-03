import React from "react";
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
} from "react-native";
import FadeIn from "react-native-fade-in-image";
import CountDown from "react-native-countdown-component";

import DalgrakDetail from "../../components/DalgrakDetail";
import { COLORS, COMMON_STYLES, FONTS } from "../../constants";

const { height, width } = Dimensions.get("window");

const DargrakScreen = (props) => {
    var dalgrak = props.feed[props.route.params.id];

    return (
        <View style={styles.container}>
            <View style={{ flex: 10 }}>
                <DalgrakDetail  {...dalgrak} />
            </View>
            <View style={{ flex: 1, flexDirection: "row", marginVertical: 10 }}>
                <TouchableOpacity style={[styles.button, { flex: 2, backgroundColor: COLORS.MINOR }]} >
                    <Text style={{ textAlign: "center", color: "white" }}>거절</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { flex: 3, backgroundColor: COLORS.DALGRAK }]} >
                    <Text style={{ textAlign: "center", color: "white" }}>입찰하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    button: {
        borderRadius: 5,
        marginHorizontal: 10,
        alignContent: "center",
        justifyContent: "center"
    },
});

DargrakScreen.propTypes = {};

export default DargrakScreen;
