var assert = require("assert");
var splice = require("../splice.js");

describe("Tests merging,", function() {

    describe("tests identity operations,", function() {
        it("should merge array of simple values into itself, returning modified array", function (done) {
            var a = [1, 2];
            var result = splice.merge(a).into(a);
            try {
                assert.strictEqual(result, a);
                assert.deepEqual(result, a);
                assert.deepEqual(result, [1, 2, 1, 2]);
                done();
            }
            catch (e) {
                done(e);
            }
        });
        it("should merge array of objects with identifiers into itself, returning array", function (done) {
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
            var result = splice.merge(a).into(a);
            try {
                assert.strictEqual(result, a);
                assert.deepEqual(result, a);
                assert.deepEqual(result, [
                    {
                        id: 1,
                        p1: 1
                    },
                    {
                        id: 2,
                        p1: 2
                    }
                ]);
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
            var result = splice.merge(a).into(a);
            try {
                assert.strictEqual(result, a);
                assert.deepEqual(result, a);
                assert.deepEqual(result, {
                    p1: 1,
                    p2: 2
                });
                done();
            }
            catch (e) {
                done(e);
            }
        });
    });

    describe("tests shallow operations,", function() {

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
            (result===void 0)?done():done(new Error());
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
        it("should merge undefined into array, returning undefined", function(done) {
            var a;
            var b = [1, 2];
            var result = splice.merge(a).into(b);
            (result===void 0)?done():done(new Error());
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
                assert.deepEqual(result, [1, 3, 3, 1, 2]);
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

    describe("tests deep operations,", function() {

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
        it("should merge undefined into array, returning undefined", function(done) {
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
            (result===void 0)?done():done(new Error());
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

    describe("tests diamond patterns,", function() {
        it("should add edge to tree, returning diamond", function(done) {
            var a = {
            }
            var b = {
            }
            var c = {
            }
            var d = {
            }
            a.b = b;
            a.c = c;
            c.d = d;
            var result = splice
                .merge({
                    b:{
                        d:d
                    }
                })
                .into(a);
            try {
                assert.strictEqual(result, a);
                assert.deepEqual(result, {
                    b:{
                        d:d
                    },
                    c:{
                        d:d
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

        it("should add parent reference to child, returning graph", function(done) {
            var a = {
                p1:1,
                b:{
                    p1:2
                }
            }
            var c = {
                b:{}
            }
            c.b.a = c;

            var result = splice
                .merge(c)
                .into(a);
            try {
                assert.strictEqual(result, a);
                assert.strictEqual(result.b, a.b);
                assert.strictEqual(result.b.a, a);
                assert.notStrictEqual(c.b.a, a);
                assert.notStrictEqual(c.b, a.b);
                assert.deepEqual(result, {
                    p1:1,
                    b:{
                        p1:2,
                        a:a
                    }
                });
                done();
            }
            catch (e) {
                done(e);
            }
        });

        it("should add grandparent reference to grandchild, returning graph", function(done) {
            var a = {
                b:{
                    c:{}
                }
            }
            var d = {
                b:{
                    c:{}
                }
            }
            d.b.c.a = d;

            var result = splice
                .merge(d)
                .into(a);
            try {
                assert.strictEqual(result, a);
                assert.strictEqual(result.b, a.b);
                assert.strictEqual(result.b.c, a.b.c);
                assert.strictEqual(result.b.c.a, a);
                assert.notStrictEqual(d.b.c.a, a);
                assert.notStrictEqual(d.b.c, a.b.c);
                assert.notStrictEqual(d.b, a.b);
                assert.deepEqual(result, {
                    b:{
                        c:{
                            a:a
                        }
                    }
                });
                done();
            }
            catch (e) {
                done(e);
            }
        });

        it("should add parent references to collection of children, returning graph", function(done) {
            var a = {
                b:[
                    {
                        id:1
                    },
                    {
                        id:2
                    }
                ]
            }
            a.b[0].a = a;
            var c = {
                b:[
                    {
                        id:2
                    },
                    {
                        id:3
                    }
                ]
            }
            c.b[0].a = c;
            c.b[1].a = c;

            var result = splice
                .merge(c)
                .into(a);
            try {
                assert.strictEqual(result, a);
                assert.strictEqual(result.b[0], a.b[0]);
                assert.strictEqual(result.b[0].a, a);
                assert.deepEqual(result, {
                    b:[
                        {
                            id:1,
                            a:a
                        },
                        {
                            id:2,
                            a:a
                        },
                        {
                            id:3,
                            a:a
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

});