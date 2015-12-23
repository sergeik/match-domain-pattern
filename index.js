/**
 * Test URL if it matches to template
 * @param template
 * @param url
 */
'use strict';

var _ = require('lodash');
var validator = require('validator');
var URL = require('url');


/**
 * Validate url pattern
 * @param {String} pattern
 * @returns {boolean} true if pattern is valid, otherwise false
 */
module.exports.domainPatternValid = domainPatternValid;


module.exports.testUrl = function (patterns, url) {
    var arr = [];
    if (!_.isArray(patterns)) {
        arr.push(patterns)
    } else {
        arr = patterns;
    }
    var result = false;
    _.forEach(arr, function (pattern) {
        result = result || testUrl(pattern, url);
    });
    return result;
};


function domainPatternValid(pattern) {
    if (!pattern) {
        return false;
    }

    var firstWildcardPosition = pattern.indexOf('*');
    var lastWildcardPosition = pattern.lastIndexOf('*');
    if (firstWildcardPosition != lastWildcardPosition) {
        return false;
    }

    if (firstWildcardPosition == 0) {
        return false;
    } else if (firstWildcardPosition == -1) {
        // If patter is simply url, then be sure that it contains only domain part
        return isDomain(pattern);
    } else {
        // If '*' symbol presents then be sure that goes after url prefix like 'http://'
        // And dot symbol should go after wildcard
        var urlPrefixPresent = _.indexOf(['http://', 'https://'], pattern.substr(0, firstWildcardPosition)) == -1;
        if (!urlPrefixPresent && pattern[firstWildcardPosition + 1] != '.') {
            return false;
        } else {
            // replace * on any string and validate
            var tempUrl = pattern.replace('*', 'subdomain');
            return (isDomain(tempUrl));
        }
    }
};


/**
 *
 */
function testUrl(pattern, url) {
    if (!domainPatternValid(pattern) || !isURL(url)) {
        return false;
    } else {

        var domain = getDomain(url);
        var wildcardPosition = pattern.indexOf('*');
        if (wildcardPosition == -1) {
            return (pattern === domain)
        } else {
            var patternHost = pattern.substr(wildcardPosition + 2);
            var urlObj = URL.parse(url);
            if (!urlObj.host) {
                return false;
            }
            if (urlObj.host.length == patternHost.length) {
                return (urlObj.host.endsWith(patternHost))
            } else {
                return (urlObj.host.endsWith('.' + patternHost))
            }
        }
    }
};

function isURL(url) {
    return validator.isURL(url, {
        require_protocol: true
    })
}


function getDomain(url) {
    // Be sure that patter contains only domain name, but not path
    var urlObj = URL.parse(url);
    urlObj.pathname = '';
    urlObj.hash = '';
    urlObj.search = '';
    return (URL.format(urlObj) );
}


function isDomain(url) {
    if (!isURL(url)) {
        return false;
    }
    return (getDomain(url) == url);
}
