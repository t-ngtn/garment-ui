import { Image, Stage, Rect, Layer, Line } from "react-konva"
import useImage from "use-image"
import { useState } from "react"
import body0 from "./images/body0.png"
import body1 from "./images/body1.png"
import body2 from "./images/body2.png"
import body3 from "./images/body3.png"
import body4 from "./images/body4.png"
import {
  Grid,
  Slider,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material"

function Home() {
  const bodyImages = [body0, body1, body2, body3, body4]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [image, status] = useImage(bodyImages[currentIndex])
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [kata, setKata] = useState(50)
  const [sode, setSode] = useState(150)
  const [hara, setHara] = useState(60)
  const [dou, setDou] = useState(150)

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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Tシャツサイズ調整アプリ
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item marginRight={10}>
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
                  points={[
                    stageWidth / 2 - kata,
                    130,
                    stageWidth / 2 + kata,
                    130,
                    stageWidth / 2 + hara,
                    130 + dou,
                    stageWidth / 2 - hara,
                    130 + dou,
                  ]}
                  closed={true}
                  stroke="red"
                  strokeWidth={4}
                />
                <Rect
                  stroke="red"
                  strokeWidth={4}
                  x={stageWidth / 2 - kata}
                  y={130}
                  width={50}
                  height={sode}
                  rotation={30}
                />
                <Rect
                  stroke="red"
                  strokeWidth={4}
                  x={stageWidth / 2 + kata}
                  y={130}
                  width={50}
                  height={sode}
                  rotation={-30}
                  offset={{ x: 50, y: 0 }}
                />
              </Layer>
            </Stage>
          </Grid>
          <Grid item>
            <span>肩幅</span>
            <Slider
              aria-label="Kata slider"
              defaultValue={kata}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={30}
              max={120}
              onChange={(_, newValue) => {
                if (Array.isArray(newValue)) {
                  setKata(newValue[0])
                } else {
                  setKata(newValue)
                }
              }}
            />
            <span>胴の長さ</span>
            <Slider
              aria-label="Dou slider"
              defaultValue={dou}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={100}
              max={200}
              onChange={(_, newValue) => {
                if (Array.isArray(newValue)) {
                  setDou(newValue[0])
                } else {
                  setDou(newValue)
                }
              }}
            />
            <span>お腹幅</span>
            <Slider
              aria-label="Hara slider"
              defaultValue={hara}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={30}
              max={120}
              onChange={(_, newValue) => {
                if (Array.isArray(newValue)) {
                  setHara(newValue[0])
                } else {
                  setHara(newValue)
                }
              }}
            />
            <span>袖丈</span>
            <Slider
              aria-label="Sode slider"
              defaultValue={sode}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={30}
              max={200}
              onChange={(_, newValue) => {
                if (Array.isArray(newValue)) {
                  setSode(newValue[0])
                } else {
                  setSode(newValue)
                }
              }}
            />
          </Grid>
        </Grid>
        <Box display="flex" sx={{ margin: "2rem" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={prevImage}
            sx={{ marginRight: "1rem" }}
          >
            前へ
          </Button>
          <Typography variant="h5">BODY {currentIndex}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={nextImage}
            sx={{ marginLeft: "1rem" }}
          >
            次へ
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default Home
