"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test = require("./test");
// should encode an object implementing the interface
var mInterface = { aString: "a-string", aRepeatedString: ["a", "repeated", "string"], aBoolean: true };
var mInterfaceWriter = test.jspb.test.Simple1.encode(mInterface);
// should encode a message
var mMessage = test.jspb.test.Simple1.create(mInterface);
var mMessageWritter = test.jspb.test.Simple1.encode(mMessage);
// should allow to assign a message to an interface
mInterface = mMessage;
// should not allow to assign an interface to a message
// mMessage = mInterface;
// should always decode to a message, not an interface
var dMessage = test.jspb.test.Simple1.decode(mInterfaceWriter.finish());
