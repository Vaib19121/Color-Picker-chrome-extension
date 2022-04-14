const btn = document.querySelector(".changecolorbtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorvalue");

btn.addEventListener("click", async () => {
    const color = chrome.storage.sync.get('color',({color})=>{
        console.log(color);
    })
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: PickColor,
    },
    async (result) => {
      const [data] = result;
      if (data.result) {
        const color = data.result.sRGBHex;
        colorValue.innerText = color;
        colorGrid.style.backgroundColor = color;
        try {
          await navigator.clipboard.writeText(color);
        } catch (error) {
          console.log(error);
        }
      }
    }
  );
});

async function PickColor() {
  try {
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
  } catch (error) {
    console.log(error);
  }
}
