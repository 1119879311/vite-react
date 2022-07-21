import { useRef, useState } from "react";
import pdf from "../assets/keyboard-shortcuts-windows.pdf";
import { defaultOptions, renderAsync } from "docx-preview";
// import docx from "../assets/javascript.docx";

function blobFileTobase64(blobFile) {
  let reader = new FileReader();
  reader.readAsDataURL(blobFile);
  return new Promise((resolve, reject) => {
    reader.onload = function () {
      resolve(this.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
}
function base64ToBlob(data) {
  var arr = data.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
export default () => {
  const [src, setSrc] = useState(null);
  const divRef = useRef(null);
  const onChange = (e) => {
    console.dir(e.target.files);
    if (e.target?.files?.length) {
      let res = window.URL.createObjectURL(e.target?.files[0]);

      console.log("---", res);

      renderAsync(e.target?.files[0], divRef.current, null, {
        ...defaultOptions,
      }).then((x) => {
        // renderThumbnails(
        //   container,
        //   document.querySelector("#thumbnails-container")
        // );
        console.log(x);
      });

      setSrc(res);
      //   blobFileTobase64(e.target.files[0]).then((res) => {
      //     console.log("---", res);
      //     let result = base64ToBlob(res);
      //     console.log("---", result);
      //     setSrc(result);
      //     // base64ToBlob(res).then((ress) => {
      //     //   console.log("---", ress);
      //     //   setSrc(res);
      //     // });
      //   });
    }
  };
  //"http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=http://www.xdocin.com/demo/demo.docx"
  //   window.open("https://view.xdocin.com/view?src=" + encodeURIComponent("https://view.xdocin.com/demo/view.docx"));
  return (
    <>
      <input type="file" onChange={onChange} />
      {/* {src && (
        <iframe
          src={`https://view.xdocin.com/view?src=${src}`}
          style={{ width: "100%", height: "100vh" }}
        />
        // <a
        //   href={`https://view.xdocin.com/view?src=${encodeURIComponent(src)}`}
        //   target="_blank"
        // >
        //   预览pdf
        // </a>
      )} */}
      <a href={pdf}>a --pfd预览</a>
      <div
        ref={divRef}
        id="document-container"
        className="document-container"
        style={{
          position: "absolute",
          width: "100%",
          top: "30px",
          left: 0,
          bottom: 0,
          zIndex: 9999,
        }}
      ></div>
      {/* <a href={docx}>a-- docx预览</a> */}
    </>
  );
};
