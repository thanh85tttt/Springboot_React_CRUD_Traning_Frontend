import axios from 'axios';

import { PREFIX_API_BASE_URL } from '../constants/http-constant'

/**
 * PrefixService
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
class PrefixService {

    /**
     * Get phone prefix service
     * @returns return axios get API
     */
    getPrefix() {
        return axios.get(PREFIX_API_BASE_URL);
    }

    /**
     * Check prefix title exist service
     * @param title to check exist title of phone prefix
     * @returns axios get API
     */
    checkPrefixTitleExist(title: string){
        return axios.get(PREFIX_API_BASE_URL + title);
    }
}

export default new PrefixService();