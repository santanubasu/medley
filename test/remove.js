var assert = require("assert");
var medley = require("../medley.js");

describe("Tests removal,", function() {

    describe("tests identity operations,", function() {
        it("should remove array of simple values from itself, returning empty array", function (done) {
            var a = [1, 2];
            var result = medley.remove(a).from(a);
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
            var result = medley({deleteEmptyObjects:true}).remove(a).from(a);
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
        it("should merge object into itself, returning object", function (done) {
            var a = {
                p1: 1,
                p2: 2
            };
            var result = medley.remove(a).from(a);
            try {
                assert.strictEqual(result, a);
                assert.deepEqual(result, a);
                assert.deepEqual(result, {
                });
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });

    describe("tests shallow operations,", function() {

        // Target of remove is undefined
        it("should remove undefined from undefined, returning deletion token", function(done) {
            var a;
            var b;
            var result = medley.remove(a).from(b);
            result===medley.defaultDeletionToken?done():done(new Error());
        });
        it("should remove 1 from undefined, returning deletion token", function(done) {
            var a = 1;
            var b;
            var result = medley.remove(a).from(b);
            result===medley.defaultDeletionToken?done():done(new Error());
        });
        it("should remove array from undefined, returning deletion token", function(done) {
            var a = [1, 2];
            var b;
            var result = medley.remove(a).from(b);
            result===medley.defaultDeletionToken?done():done(new Error());
        });
        it("should remove object from undefined, returning deletion token", function(done) {
            var a = {
                p1:1,
                p2:2
            };
            var b;
            var result = medley.remove(a).from(b);
            result===medley.defaultDeletionToken?done():done(new Error());
        });

        // Target of remove is a primitive
        it("should remove undefined from 2, returning deletion token", function(done) {
            var a;
            var b = 2;
            var result = medley.remove(a).from(b);
            result===medley.defaultDeletionToken?done():done(new Error());
        });
        it("should remove 1 from 2, returning deletion token", function(done) {
            var a = 1;
            var b = 2;
            var result = medley.remove(a).from(b);
            result===medley.defaultDeletionToken?done():done(new Error());
        });
        it("should remove array from 2, returning deletion token", function(done) {
            var a = [1, 2];
            var b = 2;
            var result = medley.remove(a).from(b);
            result===2?done():done(new Error());
        });
        it("should remove object from 2, returning deletion token", function(done) {
            var a = {
                p1:1,
                p2:2
            };
            var b = 2;
            var result = medley.remove(a).from(b);
            result===medley.defaultDeletionToken?done():done(new Error());
        });

        // Target of remove is an array
        it("should remove undefined from array, returning deletion token", function(done) {
            var a;
            var b = [1, 2];
            var result = medley.remove(a).from(b);
            result===medley.defaultDeletionToken?done():done(new Error());
        });
        it("should remove [undefined] from array, returning array", function(done) {
            var a = [undefined];
            var b = [1, 2];
            var result = medley.remove(a).from(b);
            try {
                assert.strictEqual(result, b);
                assert.deepEqual(result, b);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should remove 1 from array, returning deletion token", function(done) {
            var a = 1;
            var b = [1, 2];
            var result = medley.remove(a).from(b);
            result===medley.defaultDeletionToken?done():done(new Error());
        });
        it("should remove [3] from array, returning array", function(done) {
            var a = [3];
            var b = [1, 2];
            var result = medley.remove(a).from(b);
            try {
                assert.strictEqual(result, b);
                assert.deepEqual(result, b);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should remove [1] from array, returning modified array", function(done) {
            var a = [1];
            var b = [1, 2];
            var result = medley.remove(a).from(b);
            try {
                assert.strictEqual(result, b);
                assert.deepEqual(result, [2]);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should remove array from array, returning array", function(done) {
            var a = [1, 2];
            var b = [1, 3, 3];
            var result = medley.remove(a).from(b);
            try {
                assert.notStrictEqual(result, a);
                assert.strictEqual(result, b);
                assert.deepEqual(result, [3, 3]);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should remove object from array, returning deletion token", function(done) {
            var a = {
                p1:1,
                p2:3
            };
            var b = [1, 2]
            var result = medley.remove(a).from(b);
            result===medley.defaultDeletionToken?done():done(new Error());
        });

        // Target of remove is an object
        it("should remove undefined from object, returning object", function(done) {
            var a;
            var b = {
                p1:1,
                p2:2
            };
            var result = medley.remove(a).from(b);
            result===medley.defaultDeletionToken?done():done(new Error());
        });
        it("should remove 1 from object, returning object", function(done) {
            var a = 1;
            var b = {
                p1:1,
                p2:2
            };
            var result = medley.remove(a).from(b);
            result===medley.defaultDeletionToken?done():done(new Error());
        });
        it("should remove array from object, returning object", function(done) {
            var a = [1, 2];
            var b = {
                p1:1,
                p2:2
            };
            var result = medley.remove(a).from(b);
            result===medley.defaultDeletionToken?done():done(new Error());
        });
        it("should remove object from object, returning object", function(done) {
            var a = {
                p2:3
            };
            var b = {
                p1:1,
                p2:2
            };
            var result = medley.remove(a).from(b);
            try {
                assert.notStrictEqual(result, a);
                assert.strictEqual(result, b);
                assert.deepEqual(result, {
                    p1:1
                });
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });

    describe("tests deep operations,", function() {
        it("should remove [3] from array, returning array", function(done) {
            var a = [1];
            var b = [
                {
                    id:2,
                    p1:1
                },
                {
                    id:1,
                    p1:1
                }
            ];
            var result = medley.remove(a).from(b);
            try {
                assert.strictEqual(result, b);
                assert.deepEqual(result, [
                    {
                        id:2,
                        p1:1
                    }
                ]);
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });

    describe("tests diamond patterns,", function() {

        it("should remove edge from diamond, returning tree", function(done) {
            var a = {
                p1:1
            }
            var b = {
                p1:2
            }
            var c = {
                p1:3
            }
            var d = {
                p1:4
            }
            a.b = b;
            a.c = c;
            c.d = d;
            b.d = d;
            var result = medley
                .remove({
                    b:{
                        d:1
                    }
                })
                .from(a);
            try {
                assert.strictEqual(result, a);
                assert.deepEqual(result, {
                    p1:1,
                    b:{
                        p1:2
                    },
                    c:{
                        p1:3,
                        d:{
                            p1:4
                        }
                    }
                });
                done();
            }
            catch (e) {
                done(e);
            }
        });

    });

    describe("tests cyclic patterns,", function() {
        it("should remove parent reference from child, returning tree", function(done) {
            var a = {
                p1:1,
                b:{
                    p1:2
                }
            }
            a.b.a = a;
            var result = medley
                .remove({
                    b:{
                        a:1
                    }
                })
                .from(a);
            try {
                assert.strictEqual(result, a);
                assert.deepEqual(result, {
                    p1:1,
                    b:{
                        p1:2
                    }
                });
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });

});