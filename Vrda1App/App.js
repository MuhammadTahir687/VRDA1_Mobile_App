// import React, {Fragment, useState} from 'react';
// import SearchableDropdown from 'react-native-searchable-dropdown';
//
// var items = [
//     {
//         id: 1,
//         name: 'JavaScript',
//     },
//     {
//         id: 2,
//         name: 'Java',
//     },
//     {
//         id: 3,
//         name: 'Ruby',
//     },
//     {
//         id: 4,
//         name: 'React Native',
//     },
//     {
//         id: 5,
//         name: 'PHP',
//     },
//     {
//         id: 6,
//         name: 'Python',
//     },
//     {
//         id: 7,
//         name: 'Go',
//     },
//     {
//         id: 8,
//         name: 'Swift',
//     },
// ];
// const App=()=>  {
//     const [selectedItems,setSelectedItems]= useState([])
//     return (
//         <Fragment>
//             {/* Single */}
//             <SearchableDropdown
//                 onItemSelect={(item) => {
//                     const items = selectedItems;
//                     items.push(item)
//                     setSelectedItems(item) ;
//                 }}
//                 containerStyle={{ padding: 5 }}
//                 onRemoveItem={(item, index) => {
//                     const items = selectedItems.filter((sitem) => sitem.id !== item.id);
//                     setSelectedItems(items);
//                 }}
//                 itemStyle={{
//                     padding: 10,
//                     marginTop: 2,
//                     backgroundColor: '#ddd',
//                     borderColor: '#bbb',
//                     borderWidth: 1,
//                     borderRadius: 5,
//                 }}
//                 // itemTextStyle={{ color: '#222' }}
//                 // itemsContainerStyle={{ maxHeight: 140 }}
//                 items={items}
//                 defaultIndex={2}
//                 resetValue={false}
//                 textInputProps={
//                     {
//                         placeholder: "placeholder",
//                         underlineColorAndroid: "transparent",
//                         style: {
//                             padding: 12,
//                             borderWidth: 1,
//                             borderColor: '#ccc',
//                             borderRadius: 5,
//                         },
//                         onTextChange: text => setSelectedItems(text)
//                     }
//                 }
//                 listProps={
//                     {
//                         nestedScrollEnabled: true,
//                     }
//                 }
//             />
//         </Fragment>
//     );
// }
//
// export default App
import React from "react";
import Stacks from "./src/Routes/Stack_route";

const App = () => {
    return (
        <Stacks/>
    );
};
export default App;
