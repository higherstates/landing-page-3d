import React, { Suspense, useRef, useEffect } from 'react'
import './App.css';
import Header from './components/Header'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, ScrollControls, Scroll, useProgress } from '@react-three/drei'

// React spring
import { a, useTransition } from '@react-spring/web'

// Intersection observer
import { useInView } from 'react-intersection-observer'


const Model = ({ modelPath }) => {
  const gltf = useGLTF(modelPath, true)
  return <primitive object={gltf.scene} dispose={null} />

}

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 15]} intensity={0.2} />
      <spotLight intensity={1} position={[0, 50, 10]} />
    </>
  )
}


const Mesh = ({ children, scale }) => {
  const ref = useRef()
  useFrame(() => (ref.current).rotation.y += 0.01)
  return (
    <mesh ref={ref} position={[0, 0, 0]} scale={scale}>
      {children}
    </mesh>
  )
}


function Page({ positionY, modelPath, scale }) {
  return (
    <group position={[0, positionY, 0]}>
      <Mesh scale={scale}>
        <Model modelPath={modelPath} />
      </Mesh>
    </group>
  )
}

const HTMLContent = ({ title, button, bgColor }) => {
  const [refItem, inView] = useInView({
    threshold: 1,
    initialInView: true
  })

  useEffect(() => {
    inView && (document.body.style.background = bgColor)
  }, [inView])

  return (
    <>
      <div className="home__container">
        <div className="container-sm d-flex flex-column justify-content-center align-items-center text-center"  ref={refItem}>
          <h1 className="title">{title}</h1>
          <button className="btn btn-primary">{button}</button>
        </div>
      </div> 
    </>
  )
}

// Loader:
function Loader() {
  const { active, progress } = useProgress();
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0 },
    update: { progress },
  });
  const progressNum = `${Math.floor(progress)}%`
  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className='loading' style={{ opacity }}>
          <div className='loading-text'>Loading something amazing ...</div>
          <div className='loading-bar-container'>
            <a.div className='loading-bar' style={{ width: progress }}>
              <span>{progressNum}</span>
            </a.div>
          </div>
        </a.div>
      )
  );
}


function App() {
  return (
    <>
      <Header />
      <Canvas
        colorManagement
        camera={{position: [0, 0, 120], fov: 70}}
      >
        <Lights />
        <Suspense fallback={null}>
          <ScrollControls pages={3} distance={1} damping={100}>
              <Scroll>
                <Page positionY={-35} scale={1.1} modelPath="/armchairGreen.gltf" />
                <Page positionY={-200} scale={1.1} modelPath="/armchairYellow.gltf" />
                <Page positionY={-375} scale={1.1} modelPath="/armchairGray.gltf" />
              </Scroll>
              <Scroll html>
                <HTMLContent title="Finest Classic Collection — Armchairs" button="VIEW GALLERY" bgColor={'linear-gradient(#ba3535, #3a0505)'} />
                <HTMLContent title="Elegant Design In Different Colors" button="SHOP NOW" bgColor={'linear-gradient(#be60e9,#b111de)'} />
                <HTMLContent title="Completion to your living space" button="BOOK A DEMO" bgColor={'linear-gradient(#111, #222)'} />
              </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

export default App
