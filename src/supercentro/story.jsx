// Mandatory
import { useEffect, useState, useRef } from "react";

// Chapters
import * as chapterDiv from "./components/chapters";

// Scroll and animation  stuff
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//style css
import "./style.css";
import { isMobile } from "react-device-detect";
import { LoadingSuperCentro } from "./loading";

gsap.registerPlugin(ScrollTrigger);

export default function SuperCentro() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imageUrls = [];

  for (let i = 1; i <= 1000; i++) {
    imageUrls.push(
      `https://storage.googleapis.com/rj-escritorio-dev-public/dataviz/supercentro/frames/${i}.jpg`
    );
  }

  useEffect(() => {
    const preloadImages = async () => {
      const promises = imageUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
        });
      });
      await Promise.all(promises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, [imageUrls]);

  useEffect(() => {
    if (!imagesLoaded) return;

    gsap.defaults({ ease: "none" });
    ScrollTrigger.defaults({
      start: "top center",
      end: "bottom center",
      markers: false,
      scrub: true,
      toggleActions: "play reverse play reverse",
    });

    ScrollTrigger.create({
      trigger: "#quadro",
      onUpdate: (self) => {
        const video = document.getElementById("quadro_video_um");
        let frameNumber = Math.floor(self.progress * 2833) + 1;
        if (frameNumber > 2833) {
          frameNumber = 2833;
        }

        const imageUrl = `https://storage.googleapis.com/rj-escritorio-dev-public/dataviz/supercentro/frames/${frameNumber}.jpg`;
        video.src = imageUrl;
      },
    });
  }, [imagesLoaded]);

  if (!imagesLoaded) {
    return <LoadingSuperCentro />;
  }

  return (
    <>
      <div className="containerr" style={{ backgroundColor: "#dce0ea" }}>
        <chapterDiv.Capa id={"capa"} />
        {/* ******************************** Video Scrolling ********************************  */}

        <div className="flex flex-col h-[6200vh] w-full items-center lg:items-start lg:justify-center">
          <img
            id={"quadro_video_um"}
            src={
              "https://storage.googleapis.com/rj-escritorio-dev-public/dataviz/supercentro/frames/1.jpg"
            }
            className="sticky top-[50%] -translate-y-[50%] w-screen max-w-[600px] h-auto lg:min-h-screen lg:h-screen lg:w-auto lg:max-h-screen lg:max-w-none lg:ml-10 xl:ml-20 3x:ml-40"
          ></img>
          <chapterDiv.QuadroUm id={"quadro"} />
        </div>
        <chapterDiv.ParteUm id={"parteum"} />
        <chapterDiv.Creditos id={"creditos"} />
      </div>
    </>
  );
}
