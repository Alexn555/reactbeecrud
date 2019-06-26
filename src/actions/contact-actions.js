import { client } from './';
import md5 from 'md5';

const url = '/';
const developerName = 'Alex';

export function fetchContacts(){
  return dispatch => {
    dispatch({
      type: 'FETCH_CONTACTS',
      payload: client.get('/?developer='+developerName)
    })
  }
}

export function newContact() {
  return dispatch => {
    dispatch({
      type: 'NEW_CONTACT'
    })
  }
}

export function saveContact(contact) {
  const formData = new FormData();
  formData.append('username', contact.username);
  formData.append('email', contact.email);
  formData.append('text', contact.text);

  return dispatch => {
    return dispatch({
      type: 'SAVE_CONTACT',
      payload: client.post('/create?developer='+developerName, formData)
    })
  }
}

export function updateContact(contact) {
    const url = '/edit/id='+contact.id+'&developer='+developerName;
    const token = 'beejee';
    let rowSignature = 'status='+contact.status+'&text='+contact.text+'&token='+token;
    const signature = md5(rowSignature);
    const formData = new FormData();
    formData.append('text', contact.text);
    formData.append('status', contact.status);
    formData.append('token', token);
    formData.append('signature', signature);

    return dispatch => {
        return dispatch({
            type: 'UPDATE_CONTACT',
            //payload: client.put(url, formData)
            payload: client({
                method: 'put',
                url: url,
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
                .then(function (success) {
                    console.log(success);
                })
                .catch(function (error) {
                    console.log(error);
                })
        })
    }
}



