import html2canvas from "html2canvas";

function formatAMPM(date: Date) {
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const screenshot = async (container: HTMLDivElement) => {
  const childNode = document.createElement("div");
  childNode.style.textAlign = "center";
  childNode.style.margin = "12px auto";
  childNode.style.fontSize = "22px";
  const dateNow = new Date();
  const longTime = dateNow.toDateString();
  const shortTime = formatAMPM(dateNow);
  childNode.innerHTML = longTime + " | " + shortTime;
  container.appendChild(childNode);
  const result = await html2canvas(container);
  container.removeChild(childNode);
  const outputStr = result.toDataURL();
  const blob = await (await fetch(outputStr)).blob();
  return blob;
};

export default screenshot;
