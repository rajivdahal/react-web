export const redirection = (role, history) => {
    let reditectpath = ''
    switch (role) {
        case 1:
            reditectpath = 'admin'
            break;
        case 2:
            reditectpath = 'dashboard'
            break;

        default:
            break;
    }
    history.push(reditectpath)
}