import React, { useState, useEffect } from "react";
import SimpleOpenSeadragonViewer from "../../components/openSeadragonViewer/simple";
import Loading from "../../components/loader";
const slideUrl =
  "https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/info.json";
export default function SimpleViewer() {
  const [images, setImages] = useState([]);
  const [manifest, setManifest] = useState();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const response = await fetch(slideUrl);
    console.log(response.body)
    let image = await response?.json();
    console.log("image", image);
    setImages(image?.groups);
  };
  useEffect(() => {
    console.log("images.group[0]", images[0]?.slides);
    previewImage(images[0]?.slides[0]);
  }, images);
  // useEffect(() =>  previewImage(images[0]?.slides[0]), images)

  const previewImage = async (slide) => {
    setLoader(false);
    setManifest(slide?.slide);
    console.log(slide?.slide);
  };
  return (
    <div
      className="App"
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "30vh",
          top: "60%",
        }}
      >
        <div className="list-banel">
          <div className="thumbnailView">
            <ul className="panelListingThumbs">
              {images.map((group, index) => (
                <li
                  key={group?.name}
                  data-id={group?.name}
                  aria-label="Thumbnail"
                >
                  <div className="frame">
                    <div className="center">
                      <section className="todo-cmp">
                        <header className="todo-cmp__header">
                          <h2>{group?.name}</h2>
                        </header>
                        <ul className="todo-cmp__list">
                          {group?.slides.map((slide, index) => {
                            return (
                              <button
                                key={index}
                                onClick={() => {
                                  return previewImage(slide);
                                }}
                              >
                                {slide?.name}
                              </button>
                            );
                          })}
                        </ul>
                      </section>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {loader ? (
        <div className="loaderWrapper" style={{ margin: "0 auto" }}>
          <Loading active={loader} />
        </div>
      ) : (
        <div style={{ margin: "0 auto", width: "900px", height: "900px" }}>
          <SimpleOpenSeadragonViewer image={manifest} />
        </div>
      )}
    </div>
  );
}
