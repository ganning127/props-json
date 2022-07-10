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

function propsToJson(event) {
  event.preventDefault();
  console.log("Converting props to JSON");
  let props = document.getElementById("props-input").value;

  try {
    let propsLst = props.split("\n");

    let propsObj = {};

    for (let i = 0; i < propsLst.length; i++) {
      let prop = propsLst[i].trim();
      let key = prop.split("=")[0];
      let value = prop.split("=")[1];

      value = value.substring(1, value.length - 1);

      propsObj[key] = value;
    }

    document.getElementById("json-output").value = JSON.stringify(
      propsObj,
      null,
      2
    );
  } catch (e) {
    console.log(e);
    document.getElementById("json-output").value = "Error parsing props";
  }
}

function copyJson() {
  console.log("Copying JSON to clipboard");
  let json = document.getElementById("json-output").value;
  navigator.clipboard.writeText(json);
  document.getElementById("copyJson").innerHTML = "Copied!";

  setTimeout(function () {
    document.getElementById("copyJson").innerHTML = "Copy";
  }, 2000);
}

function copyProps() {
  console.log("Copying props to clipboard");
  let props = document.getElementById("props-output").value;
  navigator.clipboard.writeText(props);
  document.getElementById("copyProps").innerHTML = "Copied!";

  setTimeout(function () {
    document.getElementById("copyProps").innerHTML = "Copy";
  }, 2000);
}
