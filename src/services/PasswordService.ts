import axios from 'axios';
import { BASE_API_BASE_URL } from '../constants/http-constant'
import { IChangePassword } from '../interfaces/IChangePassword';
import { IResetPassword } from '../interfaces/IResetPassword';

/**
 * PasswordService
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
class PasswordService {

    /**
     * Forgot password service
     * @param email to send link and reset password token to email if exist
     * @returns axios post API
     */
    processForgotPassword(email: string) {
        return axios.post(BASE_API_BASE_URL + "/forgot_password/" + email);
    }

    /**
     * Reset password service
     * @param resetPassword contains reset password information
     * @param token to check token valid 
     * @returns axios post API
     */
    processResetPassword(resetPassword: IResetPassword, token: string){
        return axios.post(BASE_API_BASE_URL + "/reset_password/" + token, resetPassword);
    }

    /**
     * Change password service
     * @param changePassword contain change password information
     * @param email 
     * @returns axios post API
     */
    processChangePassword(changePassword: IChangePassword, email: string){
        return axios.post(BASE_API_BASE_URL + "/change_password/" + email, changePassword);
    }

}

export default new PasswordService();