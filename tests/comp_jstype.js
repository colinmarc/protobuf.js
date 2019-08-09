var tape = require("tape");
var protobuf  = require("..");

tape.test("jstype test proto", function(test) {
    var root = protobuf.Root.fromJSON({
        nested: {
            Test: {
                fields: {
                    foo: {
                      type: "int64",
                      id: 1,
                      options: {
                        jstype: "JS_STRING"
                      }
                    }
                }
            },
        }
    });

    var Test = root.lookup("Test"), msg = Test.create();
    test.equal(msg.foo, "0", "foo should be a string field");

    msg.foo = "123";
    var buf = Test.encode(msg).finish();
    test.same(Test.decode(buf), msg, "and encode/decode correctly");

    var obj = Test.toObject(msg);
    test.equal(obj.foo, "123", "toObject should preserve strings");
    test.same(Test.fromObject(obj), msg, "as should fromObject");

    var err = Test.verify({foo: "456"});
    if (err)
      return test.fail(err.message);

    test.end();
});

function traverse(ns) {
    ns.nestedArray.forEach(function(nested) {
        if (nested instanceof protobuf.Type)
            nested.setup();
        if (nested instanceof protobuf.Namespace)
            traverse(nested);
    });
}
