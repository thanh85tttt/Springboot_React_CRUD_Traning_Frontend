/**
 * isAuth
 * <p>
 * Version 1.0
 * <p>
 * Date: 30-05-2021
 * <p>
 * Copyright By Thanh
 * <p>
 * Modification Logs:
 * DATE             AUTHOR              DESCRIPTION
 * -------------------------------------------------
 * 07-06-2021       ThanhBT11           Create
 */
export const isAuth = () => {
    //Access user save in localstorage
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
    } else {
        return false;
    }
};
