const serviceGetInput = document.getElementById("serviceGetInput");
const versionGetInput = document.getElementById("versionGetInput");
const serviceGetButton = document.getElementById("serviceGetButton");
const jsonGet = document.getElementById("jsonGET");

let configData = "";

async function getConfig() {
  const serviceInputData = serviceGetInput.value;
  const versionInputData = versionGetInput.value;
  const data = await axios
    .get(
      `http://localhost:3000/config/${serviceInputData}?version=${versionInputData}`
    )
    .then((res) => {
      return res;
    });
  configData = data.data;
  jsonGet.innerText = JSON.stringify(data.data, null, 4);
}

const servicePostInput = document.getElementById("servicePostInput");
const dataPostInput = document.getElementById("dataPostInput");
const servicePostButton = document.getElementById("servicePostButton");
const jsonPost = document.getElementById("jsonPOST");

async function createConfig() {
  const serviceInputData = servicePostInput.value;
  const dataInputData = JSON.parse(dataPostInput.value);
  const data = await axios
    .post("http://localhost:3000/config", {
      service: serviceInputData,
      data: dataInputData,
    })
    .then((res) => {
      return res;
    });
  jsonPost.innerText = JSON.stringify(data.data, null, 4);
}

const servicePutInput = document.getElementById("servicePutInput");
const dataPutInput = document.getElementById("dataPutInput");
const buttonPutInput = document.getElementById("servicePutButton");
const jsonPut = document.getElementById("jsonPUT");

async function updateConfig() {
    const serviceInputData = servicePutInput.value;
    const dataInputData = JSON.parse(dataPutInput.value);
    const data = await axios.put("http://localhost:3000/config", {
        service: serviceInputData,
        data: dataInputData,
    })
    .then((res) => {
        return res
    })
    jsonPut.innerText = JSON.stringify(data.data, null, 4);
}

const serviceDeleteInput = document.getElementById("serviceDeleteInput");
const versionDeleteInput = document.getElementById("versionDeleteInput");
const serviceDeleteButton = document.getElementById("serviceDeleteButton");
const jsonDelete = document.getElementById("jsonDELETE");

async function deleteConfig() {
    const serviceInputData = serviceDeleteInput.value;
    const versionInputData = versionDeleteInput.value;
    const data = await axios.delete("http://localhost:3000/config", {
        data: {
            service: serviceInputData,
            version: versionInputData,
        }
    })
    .then((res) => {
        return res
    })
    jsonDelete.innerText = JSON.stringify(data.data, null, 4);
}

serviceGetButton.addEventListener("click", (e) => {
  e.preventDefault();
  getConfig();
});

servicePostButton.addEventListener("click", (e) => {
    e.preventDefault();
    createConfig();
})

servicePutButton.addEventListener("click", (e) => {
    e.preventDefault();
    updateConfig();
})

serviceDeleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    deleteConfig();
})

const box = document.getElementById("box");
box.addEventListener("click", (e) => {
    const jsonKeys = Object.keys(configData.config.data);
    const jsonValues = Object.values(configData.config.data);
    let resString = ""
    
    for(let i = 0; i < jsonKeys.length; i++) {
        resString += `${jsonKeys[i]}: ${jsonValues[i]};`
    }
    if(!jsonKeys.includes("width")) {
        resString += "width: 10rem;"
    }
    if(!jsonKeys.includes("height")) {
        resString += "height: 10rem;"
    }
    if(!jsonKeys.includes("background-color")) {
        resString += "background-color: black";
    }
    box.setAttribute("style", resString);
})
