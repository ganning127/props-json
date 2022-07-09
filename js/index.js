function jsonToProps(event) {
  event.preventDefault();
  console.log("Converting JSON to props");
  let json = document.getElementById("json-input").value;
  let valueQuotes = document.getElementById("value-quotes").checked;
  let keyQuotes = document.getElementById("key-quotes").checked;

  try {
    if (json.substring(json.length - 1, json.length) === ",") {
      json = json.substring(0, json.length - 1);
    }
    let props = JSON.parse(json);

    let propsLst = [];

    for (let key in props) {
      if (valueQuotes && keyQuotes) {
        propsLst.push(`"${key}"="${props[key]}"`);
      } else if (keyQuotes) {
        propsLst.push(`"${key}"=${props[key]}`);
      } else if (valueQuotes) {
        propsLst.push(`${key}="${props[key]}"`);
      } else {
        propsLst.push(`${key}=${props[key]}`);
      }
    }

    document.getElementById("props-output").value = propsLst.join("\n");
  } catch (e) {
    console.log(e);
    document.getElementById("props-output").value = "Error parsing JSON";
  }
}
