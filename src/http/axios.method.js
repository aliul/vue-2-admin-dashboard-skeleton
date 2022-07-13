import axios from "axios";

export const baseUrl = process.env.VUE_APP_HALKHATA_BASE_API;

export const globalHeaders = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }

};

/**
 * axios header.
 *
 * @param config
 * @returns {{headers: {"Access-Control-Allow-Origin": string}}}
 */
export const createConfig = (config) => {
    let headerConfig = globalHeaders;

    if (config) {
        headerConfig.headers = Object.assign(headerConfig.headers, config);
    }

    return headerConfig;
}

/**
 * build query for parameter.
 *
 * @param object
 * @returns {string}
 */
export const buildQueryString = (object) => {
    let array = [];

    Object.entries(object).forEach(([key, value]) => {
        array.push(`${key}=${value}`);
    });

    return array.join('&');
}

/**
 * Axios send request.
 *
 * @param method_type
 * @param url
 * @param data
 * @param config
 * @returns {Promise<{status_code: *, data: *, success: *, message: *} | {status_code: *, data: *, success: boolean, message: *} | {status_code: *, data: *, success: boolean, message: *}>}
 */
export const sendRequest = (method_type, url, data = {}, config = null) => {
    let result;

    if (method_type === 'get') {
        let query_string = Object.keys(data).length !== 0 && data.constructor === Object
            ? buildQueryString(data)
            : '';

        let final_url = query_string.length ? url + '?' + query_string : url;

        result = get(final_url, config);

    } else if (method_type === 'post') {
        result = post(url, data, config)
    } else if (method_type === 'update') {
        result = update(url, data, config)
    } else {
        result = destroy(url, config)
    }
    return result;
}

/**
 * Axios for get.
 *
 * @param url
 * @param config
 * @returns {Promise<{status_code: *, data: *, success: *, message: *} | {status_code: *, data: *, success: boolean, message: *} | {status_code: *, data: *, success: boolean, message: *}>}
 */
export const get = (url, config = null) => {
    return axios.get(baseUrl + url, createConfig(config))
        .then(response => {
            return successData(response.data);
        })
        .catch(error => {
            return errorData(error);
        })
};

/**
 * Axios for post.
 *
 * @param url
 * @param data
 * @param config
 * @returns {Promise<{status_code: *, data: *, success: *, message: *} | {status_code: *, data: *, success: boolean, message: *} | {status_code: *, data: *, success: boolean, message: *}>}
 */
export const post = (url, data, config = null) => {
    return axios.post(baseUrl + url, data, createConfig(config))
        .then(response => {
            return successData(response.data);
        })
        .catch(error => {
            return errorData(error);
        })
};

/**
 * Axios for update.
 *
 * @param url
 * @param data
 * @param config
 * @returns {Promise<{status_code: *, data: *, success: *, message: *} | {status_code: *, data: *, success: boolean, message: *} | {status_code: *, data: *, success: boolean, message: *}>}
 */
export const update = (url, data, config = null,) => {
    return axios.put(baseUrl + url, data, createConfig(config))
        .then(response => {
            return successData(response.data);
        })
        .catch(error => {
            return errorData(error);
        })
};

/**
 * Axios for destroy.
 *
 * @param url
 * @param config
 * @returns {Promise<{status_code: *, data: *, success: *, message: *} | {status_code: *, data: *, success: boolean, message: *} | {status_code: *, data: *, success: boolean, message: *}>}
 */
export const destroy = (url, config = null) => {

    return axios.delete(baseUrl + url, createConfig(config))
        .then(response => {
            return successData(response.data);
        })
        .catch(error => {
            return errorData(error);
        })
};

/**
 * Success message response.
 *
 * @param data
 * @returns {{status_code: *, data, success: (boolean|Event|*), message}}
 */
export const successData = (data) => {
    return {
        status_code: data.status_code,
        success: data.success,
        message: data.message,
        data: data.data
    }
}

/**
 * Error Message response.
 *
 * @param error
 * @returns {{status_code: number | ((code: number) => any), data: T, success: boolean, message}|{status_code: number | ((code: number) => any), data: T, success: boolean, message: string}}
 */
export const errorData = (error) => {
    if (error.response.status === 401) {
        return {
            status_code: error.response.status,
            success: false,
            message: error.response.statusText,
            data: error.response.data
        }
    }
    if (error.response.status === 422) {
        return {
            status_code: error.response.status,
            success: false,
            message: error.response.statusText,
            data: error.response.data
        }
    }
    return {
        status_code: error.response.status,
        success: false,
        message: error.message,
        data: error.response.data
    }
}
