import html2canvas from "html2canvas";

const download = async (
  container: HTMLDivElement,
  toggleScreenshotting: () => void,
) => {
  toggleScreenshotting();
  const blob = await new Promise<Blob>(async (res) => {
    setTimeout(async () => {
      const result = await html2canvas(container);
      toggleScreenshotting();
      const outputStr = result.toDataURL();
      const blob = await (await fetch(outputStr)).blob();
      res(blob);
    }, 200);
  });

  return blob;
};

export default download;
