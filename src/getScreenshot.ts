import html2canvas from "html2canvas";

const getScreenshot = async (
  container: HTMLDivElement,
  toggleScreenshotting: () => void,
) => {
  toggleScreenshotting();
  const blob = await new Promise<Blob>(async (res) => {
    setTimeout(async () => {
      const result = await html2canvas(container);
      toggleScreenshotting();
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 200);
      const outputStr = result.toDataURL();
      const blob = await (await fetch(outputStr)).blob();
      res(blob);
    }, 200);
  });

  return blob;
};

export default getScreenshot;
