import {Modal} from './Modal';
export * from './components';
export * from './types';

export default Modal;

// Example

//Alert center modal in Screen
// const showCenteredModal = () => {
//   Modal.show({
//     children: (
//       <BaseCenterModalContainer>
//         <Text>Center modal</Text>
//       </BaseCenterModalContainer>
//     ),
//     dismissable: true,
//     position: 'center',
//   });
// };

//Alert bottom modal in Screen
// const showBottomModal = () => {
//   Modal.show({
//     children: (
//       <BaseBottomModalContainer>
//         <Text>Bottom modal</Text>
//       </BaseBottomModalContainer>
//     ),
//     dismissable: true,
//     position: 'bottom',
//   });
// };
