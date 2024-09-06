export function errorHandling(errorCode: number) {
    switch (errorCode) {
        case 1:
        return 'Error occured, Invalid Column name';
        case 2:
        return 'Internal server error occured, please try again';
        case 3:
        return 'Please fill all the form fields';
          default:
        return 'Error occured, please contact helpdesk@benify.com'
      }
}


