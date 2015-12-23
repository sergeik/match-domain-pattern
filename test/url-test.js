'use struct';

var assert = require('assert');
var urlMatch = require('../index');


describe('Url Match Patterns test', function () {
    describe('Method domainPatternValid', function () {
        // Test URL
        it('TRUE:  testUrl(\'http://*.domain.com\', \'http://subdomain.domain.com\')', function () {
            assert.equal(urlMatch.testUrl('http://*.domain.com', 'http://subdomain.domain.com'), true);
        });

        it('TRUE:  testUrl(\'http://*.domain.com\', \'http://subdomain.domain.com/index.html\')', function () {
            assert.equal(urlMatch.testUrl('http://*.domain.com', 'http://subdomain.domain.com/index.html'), true);
        });

        it('TRUE: testUrl(\'http://*.domain.com\', \'http://subdomain.domain.com/\')', function () {
            assert.equal(urlMatch.testUrl('http://*.domain.com', 'http://subdomain.domain.com/'), true);
        });

        it('TRUE: testUrl(\'http://*.domain.com\', \'http://subdomain.domain.com\')', function () {
            assert.equal(urlMatch.testUrl('http://*.domain.com', 'http://subdomain.domain.com'), true);
        });


        it('FALSE:  testUrl(\'http://*.domain.com\', \'http://baddomain.com/index.html\')', function () {
            assert.equal(urlMatch.testUrl('http://*.domain.com', 'http://baddomain.com/index.html'), false);
        });

        it('FALSE:  testUrl(\'http://*.domain.com\', \'domain.com\')', function () {
            assert.equal(urlMatch.testUrl('http://*.domain.com', 'domain.com'), false);
        });

        it('FALSE:  testUrl(\'http://*.domain.com\', null)', function () {
            assert.equal(urlMatch.testUrl('http://*.domain.com', null), false);
        });
    });
});
