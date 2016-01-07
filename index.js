/**
 * Test URL if it matches to template
 * @param template
 * @param url
 */
(function () {
    var matchDomainPattern = {};
    var root = this;

    var _ = require('lodash');
    var validator = require('validator');
    var URL = require('url');


    /**
     * Public method
     * @param patterns
     * @param url
     * @returns {boolean}
     */
    matchDomainPattern.testUrl = function testUrl(patterns, url) {
        var arr = [];
        if (!_.isArray(patterns)) {
            arr.push(patterns)
        } else {
            arr = patterns;
        }
        var result = false;
        _.forEach(arr, function (pattern) {
            result = result || _testUrl(pattern, url);
        });
        return result;
    };


    /**
     * Public method
     * @param pattern
     * @returns {*}
     */
    matchDomainPattern.domainPatternValid = _domainPatternValid;

    function _domainPatternValid(pattern) {
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
    function _testUrl(pattern, url) {
        if (!_domainPatternValid(pattern) || !isURL(url)) {
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

    ////////////////////////////////////
    // Define public API

    // Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = matchDomainPattern;
    }
    // AMD / RequireJS
    else if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return matchDomainPattern;
        });
    }
    // included directly via <script> tag
    else {
        root.matchDomainPattern = matchDomainPattern;
    }
})(this);