# Parcel 2: Typescript public contstructor params bug

When compiling the `Test` class in [app.ts](src/app.ts) Parcel 2 has a regression in how public constructor params are handled. With the Typescript compiler you can access the public param locally in the constructor, but with Parcel 2 it is renamed leading to the param being incorrect.

To run this:

1. `yarn install`
2. `yarn start`
3. open http://localhost:1234
4. the page will show the values of `name` and `this.name` within the `Test` constructor for parcel@2.0.0 (or try the "feature/parcel1" branch to see it on parcel 1)

## Compiled code comparison

### parcel-bundler@1.12.5

```javascript
var Test =
  /** @class */
  (function () {
    function Test(name) {
      this.name = name;
      var msgs = [];
      msgs.push(
        "local `name` is: " + JSON.stringify(name) + " (" + _typeof(name) + ")"
      );
      msgs.push(
        "`this.name` is: " +
          JSON.stringify(this.name) +
          " (" +
          _typeof(this.name) +
          ")"
      );
      var msgsElts = document.getElementById("msgs");
      msgs.forEach(function (msg) {
        var msgElt = document.createElement("p");
        msgElt.textContent = msg;
        msgsElts.appendChild(msgElt);
      });
    }

    return Test;
  })();
```

### parcel@2.0.0

```javascript
class Test {
  constructor(name1) {
    this.name = name1;
    let msgs = [];
    msgs.push(`local \`name\` is: ${JSON.stringify(name)} (${typeof name})`);
    msgs.push(
      `\`this.name\` is: ${JSON.stringify(this.name)} (${typeof this.name})`
    );
    const msgsElts = document.getElementById("msgs");
    msgs.forEach((msg) => {
      const msgElt = document.createElement("p");
      msgElt.textContent = msg;
      msgsElts.appendChild(msgElt);
    });
  }
}
```

## Test page results

### parcel-bundler@1.12.5

> Parcel 2 - class constructor test...
>
> local `name` is: "" (string)
> `this.name` is: "test_name" (string)

### parcel@2.0.0

> Parcel 2 - class constructor test...
>
> local `name` is: "" (string)
> `this.name` is: "test_name" (string)

\***NOTE:** the value is an empty string instead of `undefined` since it's accessing window.name!!
