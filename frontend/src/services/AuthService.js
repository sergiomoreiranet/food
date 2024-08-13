export function doLogin(email, password) {
    return new Promise((response, reject) => {
        if (email === 'ser-moreira@hotmail.com'
            && password === '123456') {
            response(true);
        }
        reject(`Email e/ou senha estão inválidos!`);
    })
    
}

export function doLogout() {


}