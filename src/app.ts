class Test {
  constructor(public name: string) {
    let msgs: string[] = [];
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

function doTest() {
  new Test("test_name");
}

//

doTest();
