const crypto = require('crypto')
const URL = require('url-parse')
const qs = require('querystring')
const sortKeys = require('sort-keys')

/**
 * url签名计算,提供两个方法.用户签名计算.
 * @param url
 * @param secretKey
 * @returns {{getSign: getSign, getSignHref: getSignHref, valid: boolean}}
 * @constructor
 */
function Sign(url, secretKey) {
    url = new URL(url)
    _validHref = false

    init(url)

    function init(url) {
        if (url.query && url.query.startsWith('?')) {
            let queryString = qs.parse(url.query.substring(1)),
                _sign
            if (_sign = isSigned(queryString)) {
                delete queryString['sign']
            }
            let sortedQueryString = sortKeys(queryString)
            url.query = qs.stringify(sortedQueryString)
            if (_sign) {
                if (getSign() == _sign)
                    _validHref = true

            }
        }

        function isSigned(queryString) {
            if (queryString['sign'])
                return queryString['sign']
            return false
        }

    }

    function getSign() {
        return crypto.createHmac('sha256', secretKey).update(`${url.toString()}`).digest('hex')
    }

    function getSignHref() {
        let _url = url.toString()
        if (url.query) {
            _url += '&'
        } else {
            _url += '?'
        }
        return `${_url}sign=${this.getSign()}`
    }

    return {
        getSign,
        getSignHref,
        valid: _validHref
    }

}

module.exports = Sign