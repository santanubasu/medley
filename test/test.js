var assert = require("assert");
var splice = require("../splice.js");

describe("Basic tests,", function() {
    describe("tests simple merging,", function() {

        // Target of merge is undefined
        it("should merge undefined into undefined, returning undefined", function(done) {
            var a;
            var b;
            var result = splice.merge(a).into(b);
            result===undefined?done():done(new Error());
        });
        it("should merge 1 into undefined, returning 1", function(done) {
            var a = 1;
            var b;
            var result = splice.merge(a).into(b);
            result===1?done():done(new Error());
        });
        it("should merge array into undefined, returning array", function(done) {
            var a = [1, 2];
            var b;
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge object into undefined, returning object", function(done) {
            var a = {
                p1:1,
                p2:2
            };
            var b;
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });

        // Target of merge is a primitive
        it("should merge undefined into 2, returning 2", function(done) {
            var a;
            var b = 2;
            var result = splice.merge(a).into(b);
            result===2?done():done(new Error());
        });
        it("should merge 1 into 2, returning 1", function(done) {
            var a = 1;
            var b = 2;
            var result = splice.merge(a).into(b);
            result===1?done():done(new Error());
        });
        it("should merge array into 2, returning array", function(done) {
            var a = [1, 2];
            var b = 2;
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge object into 2, returning object", function(done) {
            var a = {
                p1:1,
                p2:2
            };
            var b = 2;
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });

        // Target of merge is an array
        it("should merge undefined into array, returning array", function(done) {
            var a;
            var b = [1, 2];
            var result = splice.merge(a).into(b);
            try {
                assert.strictEqual(result, b);
                assert.deepEqual(result, b);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge 1 into array, returning 1", function(done) {
            var a = 1;
            var b = [1, 2];
            var result = splice.merge(a).into(b);
            try {
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge array into array, returning array", function(done) {
            var a = [1, 2];
            var b = [1, 3, 3];
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.strictEqual(result, b);
                assert.deepEqual(result, [1, 2, 3]);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge object into array, returning object", function(done) {
            var a = {
                p1:1,
                p2:3
            };
            var b = [1, 2]
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });

        // Target of merge is an object
        it("should merge undefined into object, returning object", function(done) {
            var a;
            var b = {
                p1:1,
                p2:2
            };
            var result = splice.merge(a).into(b);
            try {
                assert.strictEqual(result, b);
                assert.deepEqual(result, b);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge 1 into object, returning 1", function(done) {
            var a = 1;
            var b = {
                p1:1,
                p2:2
            };
            var result = splice.merge(a).into(b);
            try {
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge array into object, returning array", function(done) {
            var a = [1, 2];
            var b = {
                p1:1,
                p2:2
            };
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge object into object, returning object", function(done) {
            var a = {
                p1:1,
                p2:3
            };
            var b = {
                p1:1,
                p2:2
            };
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.strictEqual(result, b);
                assert.deepEqual(result, {
                    p1:1,
                    p2:3

                });
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });

    describe("tests deep merging,", function() {

        it("should merge array into undefined, returning array", function(done) {
            var a = [
                {
                    p1:1,
                    p2:2
                },
                {
                    p1:1,
                    p2:2
                }
            ];
            var b;
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge object into undefined, returning object", function(done) {
            var a = {
                p1:1,
                p2:2,
                o1:{
                    p1:1,
                    p2:2
                }
            };
            var b;
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });

        // Target of merge is a primitive
        it("should merge array into 2, returning array", function(done) {
            var a = [
                {
                    p1:1,
                    p2:2
                },
                {
                    p1:1,
                    p2:2
                }
            ];
            var b = 2;
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge object into 2, returning object", function(done) {
            var a = {
                p1:1,
                p2:2,
                o1:{
                    p1:1,
                    p2:2
                }
            };
            var b = 2;
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });


        // Target of merge is an array
        it("should merge undefined into array, returning array", function(done) {
            var a;
            var b = [
                {
                    p1:1,
                    p2:2
                },
                {
                    p1:1,
                    p2:2
                }
            ];
            var result = splice.merge(a).into(b);
            try {
                assert.strictEqual(result, b);
                assert.deepEqual(result, b);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge 1 into array, returning 1", function(done) {
            var a = 1;
            var b = [
                {
                    p1:1,
                    p2:2
                },
                {
                    p1:1,
                    p2:2
                }
            ];
            var result = splice.merge(a).into(b);
            try {
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge array into array, returning array", function(done) {
            var a = [
                {
                    id:1,
                    p1:1
                },
                {
                    id:2,
                    p1:1,
                    p2:2
                }
            ];
            var b = [
                {
                    id:1,
                    p2:2
                },
                {
                    id:2,
                    p1:3,
                    p2:4
                }
            ];
            var result = splice.merge(a).into(b);
            try {
                assert.strictEqual(result, b);
                assert.deepEqual(result, [
                    {
                        id:1,
                        p1:1,
                        p2:2
                    },
                    {
                        id:2,
                        p1:1,
                        p2:2
                    }
                ]);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge object into array, returning object", function(done) {
            var a = {
                p1:1,
                p2:2,
                o1:{
                    p1:1,
                    p2:2
                }
            };
            var b = [
                {
                    id:1,
                    p2:2
                },
                {
                    id:2,
                    p1:3,
                    p2:4
                }
            ];
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });

        // Target of merge is an object
        it("should merge undefined into object, returning object", function(done) {
            var a;
            var b = {
                p1:1,
                p2:2,
                o1:{
                    p1:1,
                    p2:2
                }
            };
            var result = splice.merge(a).into(b);
            try {
                assert.strictEqual(result, b);
                assert.deepEqual(result, b);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge 1 into object, returning 1", function(done) {
            var a = 1;
            var b = {
                p1:1,
                p2:2,
                o1:{
                    p1:1,
                    p2:2
                }
            };
            var result = splice.merge(a).into(b);
            try {
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge array into object, returning array", function(done) {
            var a = [
                {
                    id:1,
                    p1:1
                },
                {
                    id:2,
                    p1:1,
                    p2:2
                }
            ];
            var b = {
                p1:1,
                p2:2,
                o1:{
                    p1:1,
                    p2:2
                }
            };
            var result = splice.merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.deepEqual(result, a);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge object into object, returning object", function(done) {
            var a = {
                p1:1,
                p2:3,
                o1:{
                    p1:1
                }
            };
            var b = {
                p2:2,
                o1:{
                    p2:2
                }
            };
            var result = splice.merge(a).into(b);
            try {
                assert.strictEqual(result, b);
                assert.deepEqual(result, {
                    p1:1,
                    p2:3,
                    o1:{
                        p1:1,
                        p2:2
                    }
                });
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });

})