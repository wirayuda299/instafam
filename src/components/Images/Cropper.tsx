import { Cropper, getCroppedImg } from "react-cropper-custom";
import "react-cropper-custom/dist/index.css";
import { croppedImageState, imagesState } from "@/store/images";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { AiOutlineClose } from "react-icons/ai";
import { ImageInput } from "./Uploader";

export type Area = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export default function ImageCropper() {
  const [img, setImg] = useRecoilState(imagesState);
  const [zoom, setZoom] = useState(1);
  const [croppedImg, setCroppedImg] = useRecoilState(croppedImageState);

  const deleteImage = (e: any) => {
    e.preventDefault();
    setImg("");
  };
  async function onCropComplete(croppedArea: Area) {
    if (!img) return;
    try {
      const canvasSize = {
        width: 1200,
        height: 1200 * 1,
      };
      const image = await getCroppedImg(img, croppedArea, canvasSize);
      setCroppedImg(image);
      return;
    } catch (e: any) {
      console.error(e.message);
    }
  }
  return (
    <div className="h-full w-full">
      <ImageInput setPreviewUrl={setImg} img={img} />
      {img ? (
        <div className={`flex w-full items-center justify-center rounded-md`}>
          <div
            className={`relative h-full w-full ${
              img !== "" ? "block" : "hidden"
            } `}
          >
            <div className="wrapper relative flex h-full max-w-lg items-center justify-center rounded-sm">
              <Cropper
                src={img}
                zoom={zoom}
                aspect={1}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
              <button
                name="delete"
                title="delete"
                type="button"
                className="absolute -right-3 -top-3 text-black dark:text-white"
                onClick={(e) => deleteImage(e)}
              >
                <AiOutlineClose size={25} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
