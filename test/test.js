var assert = require("assert");
var splice = require("../splice.js");

describe("Basic tests,", function() {
    describe("tests simple merging,", function() {

        // Target of merge is undefined
        it("should merge undefined into undefined, returning undefined", function(done) {
            var a;
            var b;
            var result = splice.merge(a).into(b);
            (result===void 0)?done():done(new Error());
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
        it("should merge undefined into 2, returning undefined", function(done) {
            var a;
            var b = 2;
            var result = splice.merge(a).into(b);
            result===undefined?done():done(new Error());
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
        it("should append array into array, returning array", function(done) {
            var a = [1, 2];
            var b = [1, 3, 3];
            var result = splice({append:true}).merge(a).into(b);
            try {
                assert.notStrictEqual(result, a);
                assert.strictEqual(result, b);
                assert.deepEqual(result, [1, 3, 3, 1, 2]);
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
            (result===void 0)?done():done(new Error());
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
            (result===void 0)?done():done(new Error());
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
        it("should merge object with deep array into object with deep array, returning object with deep arrays appended", function(done) {
            var a = {
                p1:1,
                p2:3,
                a1:[
                    {
                        id:1,
                        a1:[
                            {
                                p1:1
                            }
                        ]
                    }
                ]
            };
            var b = {
                p1:1,
                p2:3,
                a1:[
                    {
                        id:1,
                        a1:[
                            {
                                p1:1
                            }
                        ]
                    }
                ]
            };
            var result = splice({append:true}).merge(a).into(b);
            try {
                assert.strictEqual(result, b);
                assert.deepEqual(result, {
                    p1:1,
                    p2:3,
                    a1:[
                        {
                            id:1,
                            a1:[
                                {
                                    p1:1
                                },
                                {
                                    p1:1
                                }
                            ]
                        }
                    ]
                });
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });











    describe("tests simple removal,", function() {

        // Target of remove is undefined
        it("should remove undefined from undefined, returning undefined", function(done) {
            var a;
            var b;
            var result = splice.remove(a).from(b);
            result===splice.defaultDeletionToken?done():done(new Error());
        });
        it("should remove 1 from undefined, returning undefined", function(done) {
            var a = 1;
            var b;
            var result = splice.remove(a).from(b);
            (result===null)?done():done(new Error());
        });
        it("should remove array from undefined, returning undefined", function(done) {
            var a = [1, 2];
            var b;
            var result = splice.remove(a).from(b);
            try {
                assert.equal(result, undefined);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should remove object from undefined, returning undefined", function(done) {
            var a = {
                p1:1,
                p2:2
            };
            var b;
            var result = splice.remove(a).from(b);
            try {
                assert.equal(result, undefined);
                done();
            }
            catch (e) {
                done(e);
            }
        });

        // Target of remove is a primitive
        it("should remove undefined from 2, returning 2", function(done) {
            var a;
            var b = 2;
            var result = splice.remove(a).from(b);
            result===splice.defaultDeletionToken?done():done(new Error());
        });
        it("should remove 1 from 2, returning 2", function(done) {
            var a = 1;
            var b = 2;
            var result = splice.remove(a).from(b);
            result===splice.defaultDeletionToken?done():done(new Error());
        });
        it("should remove array from 2, returning 2", function(done) {
            var a = [1, 2];
            var b = 2;
            var result = splice.remove(a).from(b);
            result===2?done():done(new Error());
        });
        it("should remove object from 2, returning 2", function(done) {
            var a = {
                p1:1,
                p2:2
            };
            var b = 2;
            var result = splice.remove(a).from(b);
            result===2?done():done(new Error());
        });

        // Target of remove is an array
        it("should remove undefined from array, returning array", function(done) {
            var a;
            var b = [1, 2];
            var result = splice.remove(a).from(b);
            try {
                assert.strictEqual(result, b);
                assert.deepEqual(result, b);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should remove 1 from array, returning array", function(done) {
            var a = 1;
            var b = [1, 2];
            var result = splice.remove(a).from(b);
            try {
                assert.deepEqual(result, b);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should remove array from array, returning array", function(done) {
            var a = [1, 2];
            var b = [1, 3, 3];
            var result = splice.remove(a).from(b);
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
        it("should remove object from array, returning array", function(done) {
            var a = {
                p1:1,
                p2:3
            };
            var b = [1, 2]
            var result = splice.remove(a).from(b);
            try {
                assert.strictEqual(result, b);
                assert.deepEqual(result, b);
                done();
            }
            catch (e) {
                done(e);
            }
        });

        // Target of remove is an object
        it("should remove undefined from object, returning object", function(done) {
            var a;
            var b = {
                p1:1,
                p2:2
            };
            var result = splice.remove(a).from(b);
            result===splice.defaultDeletionToken?done():done(new Error());
        });
        it("should remove 1 from object, returning object", function(done) {
            var a = 1;
            var b = {
                p1:1,
                p2:2
            };
            var result = splice.remove(a).from(b);
            result===splice.defaultDeletionToken?done():done(new Error());
        });
        it("should remove array from object, returning object", function(done) {
            var a = [1, 2];
            var b = {
                p1:1,
                p2:2
            };
            var result = splice.remove(a).from(b);
            result===splice.defaultDeletionToken?done():done(new Error());
        });
        it("should remove object from object, returning object", function(done) {
            var a = {
                p2:3
            };
            var b = {
                p1:1,
                p2:2
            };
            var result = splice.remove(a).from(b);
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
})