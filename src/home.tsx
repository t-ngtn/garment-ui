import { Image, Stage, Rect, Layer, Line } from "react-konva"
import useImage from "use-image"
import { useState } from "react"
import body0 from "./images/body0.png"
import body1 from "./images/body1.png"
import body2 from "./images/body2.png"
import body3 from "./images/body3.png"
import body4 from "./images/body4.png"

function Home() {
  const bodyImages = [body0, body1, body2, body3, body4]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [image, status] = useImage(bodyImages[currentIndex])
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const nextImage = () =>
    setCurrentIndex((currentIndex + 1) % bodyImages.length)

  const prevImage = () =>
    setCurrentIndex((currentIndex - 1 + bodyImages.length) % bodyImages.length)

  const handleDragStart = (e: any) => {
    setPos({
      x: e.evt.clientX - e.target.attrs.x,
      y: e.evt.clientY - e.target.attrs.y,
    })
  }

  const handleDragMove = (e: any) => {
    setPos({
      x: e.evt.clientX - pos.x,
      y: e.evt.clientY - pos.y,
    })
  }

  const stageWidth = 600
  const stageHeight = 600
  const scaleFactor = 0.5

  if (status !== "loaded" || image === undefined) {
    return <div>Loading...</div>
  }

  const imageX = (stageWidth - image.width * scaleFactor) / 2
  const imageY = (stageHeight - image.height * scaleFactor) / 2

  return (
    <div>
      <p>BODY{currentIndex}</p>
      <button onClick={prevImage}>前へ</button>
      <button onClick={nextImage}>次へ</button>
      <Image image={image} />
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <Image
            image={image}
            x={imageX}
            y={imageY}
            scale={{ x: scaleFactor, y: scaleFactor }}
          />
          <Rect
            stroke="black"
            strokeWidth={4}
            x={5}
            y={5}
            width={stageWidth - 10}
            height={stageHeight - 10}
          />
        </Layer>
        <Layer
          x={pos.x}
          y={pos.y}
          onContentMouseDown={handleDragStart}
          onContentMouseMove={handleDragMove}
          draggable
        >
          <Line
            points={[245, 130, 345, 130, 345, 280, 245, 280]}
            closed={true}
            stroke="red"
            strokeWidth={4}
          />
          <Rect
            stroke="red"
            strokeWidth={4}
            x={245}
            y={130}
            width={50}
            height={150}
            rotation={30}
          />
          <Rect
            stroke="red"
            strokeWidth={4}
            x={345}
            y={130}
            width={50}
            height={150}
            rotation={-30}
            offset={{ x: 50, y: 0 }}
          />
        </Layer>
      </Stage>
    </div>
  )
}

export default Home
