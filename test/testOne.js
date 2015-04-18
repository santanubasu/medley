var assert = require("assert");
var splice = require("../splice.js");

/*
describe("Test harness for debugging a single test,", function() {

    it("should remove array of objects with identifiers from itself, returning empty array", function (done) {
        var a = [
            {
                id: 1,
                p1: 1
            },
            {
                id: 2,
                p1: 2
            }
        ];
        var result = splice({deleteEmptyObjects:true}).remove(a).from(a);
        try {
            assert.strictEqual(result, a);
            assert.deepEqual(result, a);
            assert.deepEqual(result, []);
            done();
        }
        catch (e) {
            done(e);
        }
    });

});
*/