import { useContext } from 'react';
import  UserProvider  from '../../providers/UserProvider';
import Swal from 'sweetalert2';


const AlertMessage = () => {
    const {errorType} = useContext(UserProvider);
  const showErrorAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
    });
  };

  const handleErrorMessage = () => {
    switch (errorType) {
      case 'userNotFound':
        showErrorAlert('Error', 'Usuario o contraseña incorrectos.', 'error');
        break;
      case 'missingData':
        showErrorAlert('Error', 'Debes completar todos los campos.', 'error');
        break;
      case 'noRegisteredUsers':
        showErrorAlert('Error', 'No hay usuarios registrados.', 'error');
        break;
      default:
        break;
    }
  };

  if (errorType) {
    handleErrorMessage();
  }

  return null;
};

export default AlertMessage;