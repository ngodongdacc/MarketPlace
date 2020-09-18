const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("basic")
 .readOwn("users")
 .updateAny("users")

ac.grant("supervisor")
 .extend("basic")
 .readAny("users")
 .updateOwn("users")

ac.grant("admin")
 .extend("basic")
 .extend("supervisor")
//  .updateAny("users")
 .readAny("users")

return ac;
})();