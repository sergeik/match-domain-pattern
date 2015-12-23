'use struct';

var assert = require('assert');
var urlMatch = require('../index');


describe('Url Match Patterns test', function () {
    describe('Method domainPatternValid', function () {

        // Validate pattern
        it('TRUE:  domainPatternValid(\'http://*.domain.com\')', function () {
            assert.equal(urlMatch.domainPatternValid('http://*.domain.com'), true);
        });

        it('TRUE:  domainPatternValid(\'http://*.subdomain.domain.com\')', function () {
            assert.equal(urlMatch.domainPatternValid('http://*.subdomain.domain.com'), true);
        });

        it('TRUE:  domainPatternValid(\'http://domain.com\')', function () {
            assert.equal(urlMatch.domainPatternValid('http://domain.com'), true);
        });

        it('FALSE: domainPatternValid(\'http://domain.com/\')', function () {
            assert.equal(urlMatch.domainPatternValid('http://domain.com/'), false);
        });

        it('FALSE: domainPatternValid(\'*.subdomain.domain.com\')', function () {
            assert.equal(urlMatch.domainPatternValid('*.subdomain.domain.com'), false);
        });

        it('FALSE: domainPatternValid(\'http://*domain.com\')', function () {
            assert.equal(urlMatch.domainPatternValid('http://*domain.com'), false);
        });

        it('FALSE: domainPatternValid(\'*.subdomain.domain.com\')', function () {
            assert.equal(urlMatch.domainPatternValid('*.subdomain.domain.com'), false);
        });

        it('FALSE: domainPatternValid(\'domain.com\')', function () {
            assert.equal(urlMatch.domainPatternValid('domain.com'), false);
        });

        it('FALSE: domainPatternValid(null)', function () {
            assert.equal(urlMatch.domainPatternValid(null), false);
        });
    });
});
