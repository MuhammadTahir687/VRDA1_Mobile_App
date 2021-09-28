import Colors from "./Colors";
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Theme = {
    text_input_container: { flexDirection: 'row', alignItems: 'center', borderColor: "transparent", borderBottomColor: Colors.secondary, borderWidth: 1, paddingHorizontal: 5 },
    Container: {
        flex: 1,
    },

    bg_image: {
        height: '100%',
        width: '100%'
    },
    logo_image: {
        height: deviceHeight / 3,
        width: deviceWidth / 1.8,
        alignSelf: 'center'
    },

    horizontal_container: {
        margin: 20,
        flex: 1
    },

    combine_t_container: { flexDirection: 'row', alignItems: 'center' },
    combine_text: { fontWeight: 'bold', fontSize: 18 },

    get_btn_container: {
        backgroundColor: Colors.white, padding: 10, marginHorizontal: 20, borderRadius: 25, alignItems: 'center'
    },

    get_btn_txt: {
        fontWeight: 'bold', color: Colors.secondary
    },

    combine_t_t_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },

    social_btn_main_container: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
    social_btn_container: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.secondary, borderRadius: 15, flex: 1, },
    social_icon: { borderTopLeftRadius: 15, borderBottomLeftRadius: 15, textAlign: 'center', flex: 0.4 },
    social_text_container: { alignItems: 'center', backgroundColor: Colors.white, flex: 1, borderTopRightRadius: 20, borderBottomRightRadius: 20, paddingVertical: 3 },
    social_text1: { fontSize: 8, includeFontPadding: false },
    social_text2: { includeFontPadding: false }
}

export default Theme
